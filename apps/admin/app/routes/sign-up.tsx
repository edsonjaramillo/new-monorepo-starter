import { seo } from '@repo/start-utils/seo';
import { createFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '../pages/sign-up.page';

export const Route = createFileRoute('/sign-up')({
  head: () => ({
    meta: [...seo({ title: 'Sign Up', description: 'Sign Up to the Monorepo Admin' })],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpPage />;
}
