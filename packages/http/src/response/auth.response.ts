import type { SessionWithUser } from '@repo/database/types';

import type { JSendError, JSendRedirect, JSendSuccess } from '../JSend';
import type { CookieOptions } from '../cookies.type';

export type SignUpResponse = JSendError | JSendRedirect | JSendSuccess<undefined>;
export type SignInResponse =
  | JSendError
  | JSendSuccess<{ options: CookieOptions; session: SessionWithUser }>;
export type SignOutResponse = JSendError | JSendSuccess<undefined>;
export type AutoSignInResponse = JSendError | JSendSuccess<SessionWithUser>;
