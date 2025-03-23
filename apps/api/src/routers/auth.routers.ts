import { Password } from '../utils/Password';
import { createCookie } from '../utils/cookies';
import { jwt } from '../utils/jwt';
import { usersQueries } from '../utils/queries';
import { sValidator } from '@hono/standard-validator';
import { Datetime } from '@repo/datetime';
import { JSend } from '@repo/http/JSend';
import type {
  AutoSignInResponse,
  SignInResponse,
  SignOutResponse,
  SignUpResponse,
} from '@repo/http/response/auth';
import { Logger } from '@repo/logger';
import { signInSchema, signUpSchema } from '@repo/validation/auth';
import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';

export const publicAuthRouter = new Hono();

publicAuthRouter.post('/sign-up', sValidator('json', signUpSchema), async (c) => {
  const body = c.req.valid('json');

  const user = await usersQueries.getUserCredentials(body.email);
  if (user) {
    return c.json<SignUpResponse>(
      JSend.redirect('/sign-in', 'User already exists. Please sign in.'),
      400,
    );
  }

  const birthday = transformBirthday(body.birthday);
  const password = await Password.hash(body.password);

  await usersQueries.createUser({ ...body, password, birthday });

  return c.json<SignUpResponse>(JSend.success(undefined, 'User created successfully'));
});

publicAuthRouter.post('/sign-in', sValidator('json', signInSchema), async (c) => {
  const body = c.req.valid('json');

  const credentials = await usersQueries.getUserCredentials(body.email);
  if (!credentials) {
    Logger.error('Credentials not found');
    return c.json<SignInResponse>(JSend.error('Invalid credentials'), 400);
  }

  const isVerified = await Password.verify(credentials.password, body.password);
  if (!isVerified) {
    Logger.error('Password not verified');
    return c.json<SignInResponse>(JSend.error('Invalid credentials'), 400);
  }

  const userSession = await usersQueries.getUserSession(credentials.id);
  if (!userSession) {
    Logger.error('User session not found');
    return c.json<SignInResponse>(JSend.error('Invalid credentials'), 400);
  }

  const expiresAt = Datetime().add(30, 'days').toDate();
  const token = await jwt.sign(userSession, expiresAt);

  const sessionCookie = createCookie(true, expiresAt);
  const autoSignInCookie = createCookie(false, expiresAt);
  setCookie(c, 'session', token, sessionCookie);
  setCookie(c, 'auto-sign-in', 'true', autoSignInCookie);
  return c.json<SignInResponse>(JSend.success(userSession, 'User signed in successfully'));
});

export const userAuthRouter = new Hono();

userAuthRouter.get('/sign-out', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json<SignOutResponse>(JSend.error('Not signed in.'), 401);
  }

  deleteCookie(c, 'session');
  deleteCookie(c, 'auto-sign-in');
  return c.json<SignOutResponse>(JSend.success(undefined, 'Successfully signed out'));
});

userAuthRouter.get('/auto-sign-in', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json<AutoSignInResponse>(JSend.error('Invalid session'), 400);
  }

  return c.json<AutoSignInResponse>(JSend.success(session, 'Session refreshed successfully'));
});

function transformBirthday(value: string) {
  const dateSplit = value.split('-');
  const month = dateSplit.at(1);
  const day = dateSplit.at(2);
  return `${month}-${day}`;
}
