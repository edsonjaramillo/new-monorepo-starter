import { seo } from '@repo/start-utils/seo';
import { createFileRoute } from '@tanstack/react-router';

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
