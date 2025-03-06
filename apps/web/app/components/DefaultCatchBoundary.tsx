import { ErrorComponent, rootRouteId, useMatch, useRouter } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';

import { Button } from '@repo/ui/button';
import { H1, H2 } from '@repo/ui/text';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error('DefaultCatchBoundary Error:', error);

  return (
    <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <H1>Oops! Something went wrong.</H1>
      <Button color="warning" type="button" onClick={() => router.invalidate()}>
        Try Again
      </Button>
      <ErrorComponent error={error} />
      {isRoot && <H2>Is root.</H2>}
    </div>
  );
}
