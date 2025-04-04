import type { UsersResponse } from '@repo/http/response/users';
import { $api } from '@repo/http/fetcher';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@repo/http/paginate';
import { queryOptions } from '@tanstack/react-query';

// eslint-disable-next-line ts/explicit-function-return-type
export function createUsersOptions(page?: number, limit?: number) {
  const p = page ?? DEFAULT_PAGE;
  const l = limit ?? DEFAULT_LIMIT;
  return queryOptions({
    queryKey: [`users:bulk:p:${p}:l:${l}`],
    queryFn: () => getUsers(p, l),
  });
}

async function getUsers(page: number, limit: number): Promise<UsersResponse> {
  return await $api.get<UsersResponse>(`/admin/users?page=${page}&limit=${limit}`);
}
