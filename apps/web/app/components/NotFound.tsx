import { Link } from '@tanstack/react-router';

import { buttonVariants } from '@repo/ui/button';
import { H1, Span } from '@repo/ui/text';

type NotFoundProps = { children?: React.ReactNode };
export function NotFound({ children }: NotFoundProps) {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
      <H1 size="4xl" textColor="danger">
        404
      </H1>
      {children ? children : <Span size="2xl">The page you are looking for does not exist.</Span>}
      <div className="flex gap-4">
        <Link className={buttonVariants({ color: 'info' })} to="/">
          Home
        </Link>
      </div>
    </div>
  );
}
