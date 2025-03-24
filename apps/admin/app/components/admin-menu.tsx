import { BlurBackground } from '@repo/ui/blur-background';
import { cn } from '@repo/ui/cn';
import { Logo } from '@repo/ui/logo';
import { Link } from '@tanstack/react-router';
import { useAdminNavigationMenu } from '../admin.context';
import { navigationLinks } from '../utils/links';
import { NavigationLinkItem } from './navigation-links';

export function AdminMenu() {
  const { isOpen, close } = useAdminNavigationMenu();
  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 z-modal h-full w-64 rounded-tr-base rounded-br-base bg-white p-2 transition-transform duration-base',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mx-auto mt-2 grid w-[95%] gap-2">
          <div className="mb-6 flex items-center justify-between">
            <Link to="/" onClick={close}>
              <Logo className="size-5" />
            </Link>
            <AdminCloseButton />
          </div>
          {navigationLinks.map(link => (
            <NavigationLinkItem key={link.href} link={link} />
          ))}
        </div>
      </div>
      <BlurBackground active={isOpen} ariaLabel="Close admin navigation menu" onClick={close} />
    </>
  );
}

function AdminCloseButton() {
  const { close } = useAdminNavigationMenu();
  return (
    <button type="button" onClick={close} className="ml-auto w-fit cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
