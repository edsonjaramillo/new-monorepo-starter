import { createMiddleware } from 'hono/factory';
import * as v from 'valibot';

import { JSend } from '@repo/http/JSend';

const positiveNonZeroInteger = /^[1-9]\d*$/;

const nonZeroSchema = v.optional(
  v.pipe(
    v.string(),
    v.regex(positiveNonZeroInteger, 'Value must be a positive non-zero integer'),
    v.transform(Number),
  ),
);

const PaginationSchema = v.object({
  limit: nonZeroSchema,
  page: nonZeroSchema,
});

const DEFAULT_LIMIT = 25;
const DEFAULT_PAGE = 1;

export function paginate(forcedLimit?: number) {
  return createMiddleware(async (c, next) => {
    const query = c.req.query();

    const { output: pagination, success } = v.safeParse(PaginationSchema, query);

    if (!success) {
      return c.json(JSend.error('Invalid pagination parameters'), 400);
    }

    // All values are guarateeed to be positive integers and non-zero
    const limit = pagination.limit ?? forcedLimit ?? DEFAULT_LIMIT;
    const page = pagination.page ?? DEFAULT_PAGE;

    const normalizedPage = Math.max(1, page);
    c.set('pagination', { limit, offset: limit * (normalizedPage - 1), page: normalizedPage });

    await next();
  });
}
