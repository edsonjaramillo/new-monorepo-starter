import { cn } from './lib/cn';

type SeparatorProps = React.ComponentPropsWithoutRef<'div'> & {
  orientation?: 'horizontal' | 'vertical';
};

export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  const style = cn(
    'my-2 shrink-0 bg-muted',
    orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
    className,
  );
  return <div className={style} {...props} />;
}
