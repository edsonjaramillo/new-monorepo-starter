'use client';

import { Avatar } from '@repo/ui/avatar';

import { autoSignInAction } from '../../actions/auto-sign-in.actions';
import { useSession } from '../../app/context/web.context';

export function DesktopNavigation() {
  return (
    <nav className="shadow-base">
      <div className="mx-auto flex h-14 w-responsive items-center justify-between">
        <span>Logo</span>
        <Avatar useSession={useSession} autoSignInAction={autoSignInAction} />
      </div>
    </nav>
  );
}
