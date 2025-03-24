import type { CookieOptions } from '@repo/http/cookies';
import { apiEnv } from './api.env';

const isProduction = apiEnv.NODE_ENV === 'production';

export function createCookie(httpOnly: boolean, expires: Date) {
  return {
    domain: isProduction ? '.example.com' : 'localhost',
    httpOnly,
    expires,
    path: '/',
    secure: isProduction,
    sameSite: 'strict',
  } satisfies CookieOptions;
}
