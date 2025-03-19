import { Link } from '@tanstack/react-router';

import { useAdminNavigationMenu } from '../admin.context';
import type { NavigationLink } from '../utils/links';

type NavigationLinkProps = {
  link: NavigationLink;
};

export function NavigationLinkItem({ link }: NavigationLinkProps) {
  const { close } = useAdminNavigationMenu();
  return (
    <Link
      to={link.href}
      onClick={close}
      className="group/nav-link flex items-center gap-3 rounded-base px-4 py-2 transition-colors duration-base hover:bg-muted">
      {link.icon}
      <span className="text-xs font-semibold transition-colors duration-base group-hover/nav-link:text-primary">
        {link.label}
      </span>
    </Link>
  );
}
