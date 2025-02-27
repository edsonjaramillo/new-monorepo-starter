import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from './lib/cn';

type ButtonVariants = VariantProps<typeof buttonVariants>;
type RequiredButtonProps = {
  type: React.ComponentProps<'button'>['type'];
};

export type ButtonProps = React.ComponentProps<'button'> & RequiredButtonProps & ButtonVariants;

export const buttonVariants = cva(
  'block h-9 cursor-pointer items-center justify-center gap-2 rounded-base px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-base focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      color: {
        primary:
          'bg-primary text-white hover:bg-primary-hover focus:bg-primary-hover active:bg-primary-pressed',
        secondary:
          'bg-secondary text-white hover:bg-secondary-hover focus:bg-secondary-hover active:bg-secondary-pressed',
        success:
          'bg-success text-white hover:bg-success-hover focus:bg-success-hover active:bg-success-pressed',
        info: 'bg-info text-white hover:bg-info-hover focus:bg-info-hover active:bg-info-pressed',
        danger:
          'bg-danger text-white hover:bg-danger-hover focus:bg-danger-hover active:bg-danger-pressed',
        warning:
          'bg-warning text-white hover:bg-warning-hover focus:bg-warning-hover active:bg-warning-pressed',
        neutral:
          'bg-neutral text-black hover:bg-neutral-hover focus:bg-neutral-hover active:bg-neutral-pressed',
        none: 'bg-white text-black',
      },
      disabled: {
        true: 'cursor-not-allowed bg-white text-gray',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full',
      },
    },
    defaultVariants: { color: 'none', width: 'fit', disabled: false },
  },
);

export function Button({ className, children, color, disabled, width, ...props }: ButtonProps) {
  const style = buttonVariants({ color, disabled, width });
  return (
    <button className={cn(style, className)} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
