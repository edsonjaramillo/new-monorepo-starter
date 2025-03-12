import { createFileRoute } from '@tanstack/react-router';

import { seo } from '@repo/start-utils/seo';

import { SignInPage } from '../pages/sign-in.page';

export const Route = createFileRoute('/sign-in')({
  head: () => ({
    meta: [...seo({ title: 'Sign In', description: 'Sign In to the Monorepo Admin' })],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <SignInPage />;
}
