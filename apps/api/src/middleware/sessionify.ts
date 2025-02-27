import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

import type { UserRoles } from '@repo/database/types';
import { JSend } from '@repo/http/JSend';
import { Logger } from '@repo/logger';

import { apiEnv } from '../utils/api.env';
import { sessionsQueries } from '../utils/queries';

const isDevelopment = apiEnv.NODE_ENV === 'development';

export function sessionify(allowedRoles: UserRoles[]) {
  return createMiddleware(async (c, next) => {
    const sessionId = getCookie(c, 'session');
    if (!sessionId) {
      if (isDevelopment) {
        Logger.error('No session id in cookie');
      }

      return c.json(JSend.error('Unauthenticated'), 401);
    }

    const session = await sessionsQueries.getSessionById(sessionId);
    if (!session) {
      if (isDevelopment) {
        Logger.error('No session found');
      }

      return c.json(JSend.error('Unauthenticated'), 401);
    }

    if (!allowedRoles.includes(session.user.role)) {
      if (isDevelopment) {
        Logger.error('Unauthorized');
      }

      return c.json(JSend.error('Unauthorized'), 403);
    }

    c.set('session', session);
    await next();
  });
}
