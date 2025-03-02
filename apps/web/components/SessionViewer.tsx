'use client';

import { useSession } from '../app/context/web.context';

export function SessionViewer() {
  const { session } = useSession();

  if (!session) return <span>Not signed in</span>;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
