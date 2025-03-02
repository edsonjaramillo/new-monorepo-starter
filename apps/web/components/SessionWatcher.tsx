'use client';

import cookie from 'js-cookie';
import { useEffect } from 'react';

import type { AutoSignInResponse } from '@repo/http/response/auth';

import { useSession } from '../app/context/web.context';
import { $apiClientSide } from '../app/web.connections';

export function SessionWatcher() {
  const { signIn } = useSession();

  useEffect(() => {
    (async () => {
      const sessionCookie = cookie.get('session');
      if (!sessionCookie) {
        return;
      }

      const session = await $apiClientSide.get<AutoSignInResponse>('/user/auth/auto-sign-in');
      if (session.status === 'error') {
        return;
      }

      signIn(session.data);
    })();
  }, [signIn]);

  return undefined;
}
