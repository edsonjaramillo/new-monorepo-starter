import type { CookieOptions } from '@repo/http/cookies';

import { apiEnv } from './api.env';

const isProduction = apiEnv.NODE_ENV === 'production';

export function createCookie(httpOnly: boolean, expires: Date) {
  return {
    ...(isProduction && { domain: '.example.com' }),
    httpOnly,
    expires,
    path: '/',
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  } satisfies CookieOptions;
}
