import type { UsersResponse } from '@repo/http/response/users';
import { JSend } from '@repo/http/JSend';
import { paginationMetadata } from '@repo/http/paginate';
import { Hono } from 'hono';
import { paginate } from '../middleware/paginate';
import { usersQueries } from '../utils/queries';

export const adminUsersRouter = new Hono();

adminUsersRouter.get('/', paginate(), async (c) => {
  const { limit, offset, page } = c.get('pagination');

  const users = await usersQueries.getUsers(limit, offset);
  const { amountOfRows } = await usersQueries.getUserCounts();
  const pagination = paginationMetadata(page, amountOfRows, limit);

  return c.json<UsersResponse>(JSend.pagination(users, pagination, 'Users fetched successfully'));
});

adminUsersRouter.get('/birthday/:birthday', async (c) => {
  const { birthday } = c.req.param();
  const users = await usersQueries.getUsersByBirthday(birthday);
  return c.json(JSend.success(users, 'Users fetched successfully'));
});
