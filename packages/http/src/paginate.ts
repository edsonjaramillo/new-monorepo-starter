import * as v from 'valibot';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 25;

export const paginationSchema = v.object({
  page: v.optional(
    v.pipe(
      v.number(),
      v.transform(v => v ?? DEFAULT_PAGE),
    ),
  ),
  limit: v.optional(
    v.pipe(
      v.number(),
      v.transform(v => v ?? DEFAULT_LIMIT),
    ),
  ),
});

export interface Pagination {
  numberOfPages: number;
  currentPage: number;
}

export interface PaginationVariable {
  limit: number;
  offset: number;
  page: number;
}

export function paginationMetadata(page: number, rows: number, limit: number): Pagination {
  return { currentPage: page, numberOfPages: Math.ceil(rows / limit) };
}
