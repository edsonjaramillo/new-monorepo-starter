'use client';

import cookies from 'js-cookie';
import { useEffect } from 'react';

import type { AuthPopupContext } from '@repo/context/auth-popup';
import type { SessionContext } from '@repo/context/session';
import type { AutoSignInResponse } from '@repo/http/response/auth';

import { AuthPopup } from './auth-popup';

type AvatarProps = {
  useSession: SessionContext;
  useAuthPopup: AuthPopupContext;
  autoSignInAction: () => Promise<AutoSignInResponse>;
};

export function Avatar({ useSession, useAuthPopup, autoSignInAction }: AvatarProps) {
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

  return (
    <div className="relative flex items-center">
      {session ? (
        <PersonIcon useAuthPopup={useAuthPopup} />
      ) : (
        <PersonIcon useAuthPopup={useAuthPopup} />
      )}
      <AuthPopup useAuthPopup={useAuthPopup} useSession={useSession} />
    </div>
  );
}

type PersonIconProps = {
  useAuthPopup: AuthPopupContext;
};

function PersonIcon({ useAuthPopup }: PersonIconProps) {
  const { toggle } = useAuthPopup();

  return (
    <button type="button" className="cursor-pointer" onClick={() => toggle()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8 text-black">
        <path
          fillRule="evenodd"
          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
