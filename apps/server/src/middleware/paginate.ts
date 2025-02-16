import { createMiddleware } from 'hono/factory';
import * as v from 'valibot';

import { JSend } from '@repo/http/JSend';

const positiveNonZeroInteger = /^[1-9]\d*$/;

const nonZeroSchema = v.optional(
  v.pipe(
    v.string('NON_ZERO_INTEGER'),
    v.regex(positiveNonZeroInteger, 'REGEX WRONG'),
    v.transform(Number),
  ),
);

const PaginationSchema = v.object({
  limit: nonZeroSchema,
  page: nonZeroSchema,
});

const DEFAULT_LIMIT = 25;
const DEFAULT_PAGE = 1;

export function paginate(forced_limit?: number) {
  return createMiddleware(async (c, next) => {
    const query = c.req.query();

    const { output: pagination, success } = v.safeParse(PaginationSchema, query);

    if (!success) {
      return c.json(JSend.error('Invalid pagination parameters'), 400);
    }

    const defaultLimit = forced_limit ?? DEFAULT_LIMIT;

    // All values are guarateeed to be positive integers and non-zero
    const limit = pagination.limit ?? defaultLimit;
    const page = pagination.page ?? DEFAULT_PAGE;

    if (page <= 1) {
      c.set('pagination', { limit, offset: 0, page: 1 });
    } else {
      c.set('pagination', { limit, offset: limit * (page - 1), page });
    }

    await next();
  });
}
