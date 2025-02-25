import { SessionWithUser } from '@repo/database/types';
import { PaginationVariable } from '@repo/http/paginate';

declare module 'hono' {
  interface ContextVariableMap {
    session: SessionWithUser;
    pagination: PaginationVariable;
  }
}
