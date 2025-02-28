import Link from 'next/link';

import { buttonVariants } from '@repo/ui/button';
import { H1, Span } from '@repo/ui/text';

export default function ServerFailurePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <H1 size="4xl" textColor="danger" className="lg:text-8xl">
        503
      </H1>
      <Span size="2xl">Service Unavailable. Please try again later.</Span>
      <Span size="2xl"></Span>
      <Link className={buttonVariants({ color: 'primary' })} href="/">
        Go to Home
      </Link>
    </div>
  );
}
