import { PaginationVariable } from '@repo/http/paginate';

declare module 'hono' {
  interface ContextVariableMap {
    pagination: PaginationVariable;
  }
}
