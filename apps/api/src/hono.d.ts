import type { SessionWithUser } from '@repo/database/types';
import type { PaginationVariable } from '@repo/http/paginate';

declare module 'hono' {
  interface ContextVariableMap {
    session: SessionWithUser;
    pagination: PaginationVariable;
  }
}
