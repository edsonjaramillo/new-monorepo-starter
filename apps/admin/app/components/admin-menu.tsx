import { BlurBackground } from '@repo/ui/blur-background';
import { cn } from '@repo/ui/cn';

import { useAdminNavigationMenu } from '../admin.context';

export function AdminMenu() {
  const { open, setOpen } = useAdminNavigationMenu();
  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 z-modal h-full w-64 rounded-tr-base rounded-br-base bg-muted p-2 transition-transform duration-base',
          open ? 'translate-x-0' : '-translate-x-full',
        )}>
        <div className="mx-auto grid w-[95%]">
          <AdminCloseButton />
          <span>Hello</span>
        </div>
      </div>
      <BlurBackground
        active={open}
        ariaLabel="Close admin navigation menu"
        onClick={() => setOpen(false)}
      />
    </>
  );
}

function AdminCloseButton() {
  const { setOpen } = useAdminNavigationMenu();
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="mt-2 ml-auto w-fit cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
