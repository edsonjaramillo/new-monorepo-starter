import { Link } from '@tanstack/react-router';

import { $api } from '@repo/http/fetcher';
import type { SignOutResponse } from '@repo/http/response/auth';
import { Button, buttonVariants } from '@repo/ui/button';
import { cn } from '@repo/ui/cn';
import { Separator } from '@repo/ui/seperator';
import { Span } from '@repo/ui/text';
import { toast } from '@repo/ui/toast';

import { useAuthPopup, useSession } from '../../../admin.context';

export function AuthPopup() {
  const { open, toggle } = useAuthPopup();
  const { session, clearSession } = useSession();

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
              {session.firstName} {session.lastName}
            </Span>
            <Span className="text-sm" size="sm">
              {session.role}
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
              to="/sign-in"
              className={cn(buttonVariants({ color: 'info', width: 'full' }))}
              onClick={() => toggle()}>
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className={cn(buttonVariants({ color: 'success', width: 'full' }))}
              onClick={() => toggle()}>
              Sign Up
            </Link>
          </div>
        )}
        {session && (
          <Button
            type="button"
            color="danger"
            className={cn(buttonVariants({ color: 'danger', width: 'full' }))}
            onClick={() => {
              toggle();
              signOut();
              clearSession();
            }}>
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}

async function signOut() {
  const { status, message } = await $api.get<SignOutResponse>('/user/auth/sign-out');

  if (status === 'success') {
    toast({ status, title: message });
    return;
  }

  if (status === 'error') {
    toast({ status, title: message });
    return;
  }
}
