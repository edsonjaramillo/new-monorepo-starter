import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { uuidv7 } from 'uuidv7';

import { JSend } from '@repo/http/JSend';
import { signinSchema, signupSchema } from '@repo/validation/auth';

import { Password } from '../utils/Password';
import { cookieOptions } from '../utils/cookies';
import { sessionsQueries, usersQueries } from '../utils/queries';

export const publicAuthRouter = new Hono();

publicAuthRouter.post('/sign-up', sValidator('json', signupSchema), async (c) => {
  const body = c.req.valid('json');

  const user = await usersQueries.getUserCredentials(body.email);
  if (user) {
    return c.json(JSend.info(undefined, 'User already exists. Please sign in.'));
  }

  const password = await Password.hash(body.password);

  await usersQueries.createUser({ ...body, password });

  return c.json(JSend.success(undefined, 'User created successfully'));
});

publicAuthRouter.post('/sign-in', sValidator('json', signinSchema), async (c) => {
  const body = c.req.valid('json');

  const credentials = await usersQueries.getUserCredentials(body.email);
  if (!credentials) {
    return c.json(JSend.error('Invalid credentials'));
  }

  const isVerified = await Password.verify(credentials.password, body.password);
  if (!isVerified) {
    return c.json(JSend.error('Invalid credentials'));
  }

  const uuid = uuidv7();
  // add 1 month to current date
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await sessionsQueries.createSession({ id: uuid, userId: credentials.id, expiresAt });

  const session = await sessionsQueries.getSessionById(uuid);
  if (!session) {
    return c.json(JSend.error('Invalid credentials'));
  }

  setCookie(c, 'session', session.id, cookieOptions(false, expiresAt));
  return c.json(JSend.success(session, 'Users fetched successfully'));
});

export const userAuthRouter = new Hono();

userAuthRouter.get('/sign-out', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json(JSend.error('Invalid session'), 400);
  }

  await sessionsQueries.deleteSession(session.id);
  deleteCookie(c, 'session');
  return c.json(JSend.success(undefined, 'Successfully signed out'));
});
