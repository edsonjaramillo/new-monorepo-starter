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
}: BlurBackgroundProps) {
  const style = cn(
    'fixed top-0 left-0 h-full w-full transition-all duration-base',
    active ? 'cursor-pointer backdrop-blur-base' : 'pointer-events-none backdrop-blur-none',
    className,
  );

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-expanded={active}
      onClick={onClick}
      className={style}
      {...props}
    />
  );
}
