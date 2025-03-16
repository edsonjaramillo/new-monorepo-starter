import { Link } from '@tanstack/react-router';

import { Logo } from '@repo/ui/logo';

import { AdminHamburger } from '../../admin-hamburger';
import { AdminMenu } from '../../admin-menu';
import { Avatar } from './avatar';

export function DesktopNavigation() {
  return (
    <nav className="shadow-base">
      <div className="mx-auto flex h-14 w-responsive items-center justify-between">
        <AdminHamburger />
        <Link to="/">
          <Logo />
        </Link>
        <Avatar />
      </div>
      <AdminMenu />
    </nav>
  );
}
