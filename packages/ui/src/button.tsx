import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from './lib/cn';

type ButtonVariants = VariantProps<typeof buttonVariants>;
type RequiredButtonProps = {
  type: React.ComponentProps<'button'>['type'];
};

export type ButtonProps = React.ComponentProps<'button'> & RequiredButtonProps & ButtonVariants;

export const buttonVariants = cva(
  'duration-base rounded-base inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      color: {
        primary: 'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white',
        secondary: 'bg-secondary hover:bg-secondary-hover active:bg-secondary-pressed text-white',
        success: 'bg-success hover:bg-success-hover active:bg-success-pressed text-white',
        info: 'bg-info hover:bg-info-hover active:bg-info-pressed text-white',
        danger: 'bg-danger hover:bg-danger-hover active:bg-danger-pressed text-white',
        warning: 'bg-warning hover:bg-warning-hover active:bg-warning-pressed text-white',
        neutral: 'bg-neutral hover:bg-neutral-hover active:bg-neutral-pressed text-black',
        none: 'bg-white text-black',
      },
      disabled: {
        true: 'text-gray cursor-not-allowed bg-white',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full',
      },
    },
    defaultVariants: { color: 'none', width: 'fit', disabled: false },
  },
);

export function Button({ children, color, disabled, width, ...props }: ButtonProps) {
  const style = buttonVariants({ color, disabled, width });
  return (
    <button {...props} className={cn(style)} disabled={disabled}>
      {children}
    </button>
  );
}
