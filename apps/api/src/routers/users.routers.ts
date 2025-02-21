import { Hono } from 'hono';

import { JSend } from '@repo/http/JSend';
import { paginationMetadata } from '@repo/http/paginate';

import { paginate } from '../middleware/paginate';
import { usersQueries } from '../utils/queries';

export const adminUsersRouter = new Hono();

adminUsersRouter.get('/', paginate(), async (c) => {
  const { limit, offset, page } = c.get('pagination');

  const users = await usersQueries.getUsers(limit, offset);
  const { amountOfRows } = await usersQueries.getUserCounts();
  const pagination = paginationMetadata(page, amountOfRows, limit);

  return c.json(JSend.pagination(users, pagination, 'Users fetched successfully'));
});
