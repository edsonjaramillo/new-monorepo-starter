import { createFileRoute } from '@tanstack/react-router';

import { seo } from '@repo/start-utils/seo';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Monorepo Admin Homepage',
        description: 'This is the homepage for the Monorepo Admin',
      }),
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
    </div>
  );
}
