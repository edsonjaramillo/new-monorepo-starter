import type { CookieOptions } from 'hono/utils/cookie';

import { apiEnv } from './api.env';

const isProduction = apiEnv.NODE_ENV === 'production';

export function cookieOptions(httpOnly: boolean, expires: Date) {
  return {
    ...(isProduction && { domain: '.example.com' }),
    httpOnly,
    expires,
    path: '/',
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  } satisfies CookieOptions;
}
