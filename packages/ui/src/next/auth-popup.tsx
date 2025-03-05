import Link from 'next/link';

import type { AuthPopupContext } from '@repo/context/auth-popup';
import type { SessionContext } from '@repo/context/session';

import { Button, buttonVariants } from '../button';
import { cn } from '../lib/cn';
import { Separator } from '../seperator';
import { Span } from '../text';

type AuthPopupProps = {
  useAuthPopup: AuthPopupContext;
  useSession: SessionContext;
};

export function AuthPopup({ useAuthPopup, useSession }: AuthPopupProps) {
  const { open, toggle } = useAuthPopup();
  const { session } = useSession();

  return (
    <div
      className={cn(
        'pointer-events-none absolute top-8 right-8 z-modal w-36 rounded-base bg-white p-2 opacity-0 shadow-base transition-opacity duration-base',
        open && 'pointer-events-auto opacity-100',
      )}>
      <div>
        {session && (
          <div className="flex flex-col">
            <Span className="font-semibold whitespace-nowrap" size="sm">
              {session.user.firstName} {session.user.lastName}
            </Span>
            <Span className="text-sm" size="sm">
              {session.user.role}
            </Span>
            <Separator />
          </div>
        )}
        {!session && (
          <div className="flex flex-col">
            <Span className="font-semibold whitespace-nowrap" size="sm">
              Not signed in
            </Span>
            <Separator />
          </div>
        )}
        {!session && (
          <div className="flex flex-col gap-2">
            <Link
              href="/auth/sign-in"
              className={cn(buttonVariants({ color: 'info', width: 'full' }))}
              onClick={() => toggle()}>
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className={cn(buttonVariants({ color: 'success', width: 'full' }))}
              onClick={() => toggle()}>
              Sign Up
            </Link>
          </div>
        )}
        {session && (
          <Button type="button" color="danger" width="full">
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}
