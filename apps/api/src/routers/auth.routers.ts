import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { uuidv7 } from 'uuidv7';

import { JSend } from '@repo/http/JSend';
import type { SignInResponse, SignOutResponse, SignUpResponse } from '@repo/http/response/auth';
import { signInSchema, signUpSchema } from '@repo/validation/auth';

import { Password } from '../utils/Password';
import { cookieOptions } from '../utils/cookies';
import { sessionsQueries, usersQueries } from '../utils/queries';

export const publicAuthRouter = new Hono();

publicAuthRouter.post('/sign-up', sValidator('json', signUpSchema), async (c) => {
  const body = c.req.valid('json');

  const user = await usersQueries.getUserCredentials(body.email);
  if (user) {
    return c.json<SignUpResponse>(
      JSend.redirect('/auth/sign-in', 'User already exists. Please sign in.'),
      400,
    );
  }

  const password = await Password.hash(body.password);

  await usersQueries.createUser({ ...body, password });

  return c.json<SignUpResponse>(JSend.success(undefined, 'User created successfully'));
});

publicAuthRouter.post('/sign-in', sValidator('json', signInSchema), async (c) => {
  const body = c.req.valid('json');

  const credentials = await usersQueries.getUserCredentials(body.email);
  if (!credentials) {
    return c.json<SignInResponse>(JSend.error('Invalid credentials'), 400);
  }

  const isVerified = await Password.verify(credentials.password, body.password);
  if (!isVerified) {
    return c.json<SignInResponse>(JSend.error('Invalid credentials'), 400);
  }

  const uuid = uuidv7();
  // add 1 month to current date
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await sessionsQueries.createSession({ id: uuid, userId: credentials.id, expiresAt });

  const session = await sessionsQueries.getSessionById(uuid);
  if (!session) {
    return c.json<SignInResponse>(JSend.error('Invalid session'), 400);
  }

  setCookie(c, 'session', session.id, cookieOptions(false, expiresAt));
  return c.json<SignInResponse>(JSend.success(session, 'User signed in successfully'));
});

export const userAuthRouter = new Hono();

userAuthRouter.get('/sign-out', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json<SignOutResponse>(JSend.error('Not signed in.'), 401);
  }

  await sessionsQueries.deleteSession(session.id);
  deleteCookie(c, 'session');
  return c.json<SignOutResponse>(JSend.success(undefined, 'Successfully signed out'));
});
