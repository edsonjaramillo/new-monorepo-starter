import type { User } from '@repo/database/types';
import type { JSendError, JSendPagination } from '../JSend';

export type UsersResponse = JSendError | JSendPagination<User[]>;
