import type { UserSession } from '@repo/database/types';
import type { PaginationVariable } from '@repo/http/paginate';

declare module 'hono' {
  interface ContextVariableMap {
    session: UserSession;
    pagination: PaginationVariable;
  }
}
