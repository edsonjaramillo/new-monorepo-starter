'use client';

import cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect } from 'react';

import type { SessionContext } from '@repo/context/session';
import type { AutoSignInResponse } from '@repo/http/response/auth';

import { buttonVariants } from '../button';
import { cn } from '../lib/cn';
import { Span } from '../text';

type AvatarProps = {
  useSession: SessionContext;
  autoSignInAction: () => Promise<AutoSignInResponse>;
};

export function Avatar({ useSession, autoSignInAction }: AvatarProps) {
  const { session, signIn } = useSession();

  useEffect(() => {
    (async () => {
      const autoSignInCookie = cookies.get('auto-sign-in');
      if (!autoSignInCookie) {
        return;
      }

      const response = await autoSignInAction();
      if (response.status === 'error') {
        return;
      }

      signIn(response.data);
    })();
  }, [autoSignInAction, signIn]);

  if (!session) {
    return (
      <Link className={cn(buttonVariants({ color: 'primary' }))} href="/auth/sign-in">
        Sign In
      </Link>
    );
  }

  return <Span>{session.user.firstName.at(0)?.toUpperCase()}</Span>;
}
