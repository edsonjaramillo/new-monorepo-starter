import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { createAutoSignInOptions } from '@repo/query/auth';
import { Skeleton } from '@repo/ui/skeleton';
import { Span } from '@repo/ui/text';

import { useAuthPopup, useSession } from '../../../admin.context';
import { AuthPopup } from './auth-popup';

export function Avatar() {
  const { session, setSession } = useSession();
  const [autoSignInEnabled, setAutoSignInEnabled] = useState<boolean>(false);
  const { data, isSuccess, isLoading } = useQuery(createAutoSignInOptions(autoSignInEnabled));

  useEffect(() => {
    // check if auto-sign-in cookie is set
    if (Cookies.get('auto-sign-in')) {
      setAutoSignInEnabled(true);
    }

    // if auto-sign-in is enabled, sign in the user
    if (autoSignInEnabled) {
      if (isSuccess) {
        if (data.status === 'success') {
          setSession(data.payload);
        }
      }
    }
  }, [isSuccess, data, autoSignInEnabled, setSession]);

  return (
    <div className="relative flex items-center">
      {isLoading ? (
        <Skeleton className="size-8 rounded-full" />
      ) : session ? (
        <UserIcon />
      ) : (
        <PersonIcon />
      )}
      <AuthPopup />
    </div>
  );
}

function PersonIcon() {
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

function UserIcon() {
  const { toggle } = useAuthPopup();
  const { session } = useSession();

  return (
    <button
      type="button"
      className="size-8 cursor-pointer rounded-full bg-secondary"
      onClick={() => toggle()}>
      <Span textColor="white" className="font-semibold">
        {session?.firstName.charAt(0)}
      </Span>
    </button>
  );
}
