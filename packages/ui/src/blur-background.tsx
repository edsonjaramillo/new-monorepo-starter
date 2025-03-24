import type { JSX } from 'react';
import { cn } from './lib/cn';

export type BlurBackgroundProps = React.ComponentProps<'button'> & {
  active: boolean;
  ariaLabel: string;
  onClick: () => void;
  className?: string;
};

export function BlurBackground({
  active,
  ariaLabel,
  onClick,
  className,
  ...props
}: BlurBackgroundProps): JSX.Element {
  const style = cn(
    'fixed top-0 left-0 h-full w-full transition-all duration-base',
    active ? 'cursor-pointer backdrop-blur-base' : 'pointer-events-none backdrop-blur-none',
    className,
  );

  return (
    <button
      aria-expanded={active}
      aria-label={ariaLabel}
      className={style}
      onClick={onClick}
      type="button"
      {...props}
    />
  );
}
