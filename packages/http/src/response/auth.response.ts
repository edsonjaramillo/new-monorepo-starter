import type { UserSession } from '@repo/database/types';

import type { JSendError, JSendRedirect, JSendSuccess } from '../JSend';

export type SignUpResponse = JSendError | JSendRedirect | JSendSuccess<undefined>;
export type SignInResponse = JSendError | JSendSuccess<UserSession>;
export type SignOutResponse = JSendError | JSendSuccess<undefined>;
export type AutoSignInResponse = JSendError | JSendSuccess<UserSession>;
