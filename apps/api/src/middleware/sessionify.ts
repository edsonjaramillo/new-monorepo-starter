import { apiEnv } from '../utils/api.env';
import { jwt } from '../utils/jwt';
import type { UserRoles } from '@repo/database/types';
import { JSend } from '@repo/http/JSend';
import { Logger } from '@repo/logger';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

const isDevelopment = apiEnv.NODE_ENV === 'development';

export function sessionify(allowedRoles: UserRoles[]) {
  return createMiddleware(async (c, next) => {
    const sessionToken = getCookie(c, 'session');

    if (!sessionToken) {
      if (isDevelopment) {
        Logger.error('No session id in cookie');
      }

      return c.json(JSend.error('Unauthenticated'), 401);
    }

    const payload = await jwt.verify(sessionToken);

    if (!allowedRoles.includes(payload.role)) {
      if (isDevelopment) {
        Logger.error('Unauthorized');
      }

      return c.json(JSend.error('Unauthorized'), 403);
    }

    c.set('session', payload);
    await next();
  });
}
