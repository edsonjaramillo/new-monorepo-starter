import { paginationSchema } from '@repo/http/paginate';
import { createUsersOptions } from '@repo/query/users';
import { Skeleton } from '@repo/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
  validateSearch: paginationSchema,
});

const routeApi = getRouteApi('/admin/users');

function RouteComponent() {
  const { page, limit } = routeApi.useSearch();
  const { data, isLoading, isSuccess } = useQuery(createUsersOptions(page, limit));

  if (isLoading) {
    // 10 times loop
    return (
      <div className="mx-auto flex w-responsive flex-col gap-4">
        {Array.from({ length: 10 }, (_, i) => i).map(key => (
          <Skeleton key={key} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isSuccess && data.status === 'success') {
    return (
      <div className="mx-auto flex w-responsive flex-col gap-4">
        {data.payload.map(user => (
          <div key={user.id}>
            {user.firstName}
            {' '}
            {user.lastName}
          </div>
        ))}
        <pre>{JSON.stringify(data.pagination, null, 2)}</pre>
      </div>
    );
  }
}
