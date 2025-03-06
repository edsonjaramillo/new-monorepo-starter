import { Avatar } from './avatar';

export function DesktopNavigation() {
  return (
    <nav className="shadow-base">
      <div className="mx-auto flex h-14 w-responsive items-center justify-between">
        <span>Logo</span>
        <Avatar />
      </div>
    </nav>
  );
}
