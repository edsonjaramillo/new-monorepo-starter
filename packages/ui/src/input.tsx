import { cn } from './lib/cn';
import { Span } from './text';

type InputProps = React.ComponentProps<'input'>;
export function Input({ className, ...props }: InputProps) {
  const style = cn(
    'h-9 w-full rounded-base border border-muted bg-transparent px-3 py-2 text-sm text-black shadow-base placeholder:text-gray focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:outline-0 disabled:cursor-not-allowed disabled:text-muted disabled:placeholder:text-muted',
    className,
  );
  return <input className={style} {...props} />;
}

export function InputGroup({ children, ...props }: InputProps) {
  return (
    <div className="grid w-full max-w-form items-center gap-2" {...props}>
      {children}
    </div>
  );
}

type InputDescriptionProps = React.ComponentProps<'span'>;
export function InputDescription({ className, children, ...props }: InputDescriptionProps) {
  return (
    <Span size="sm" textColor="gray" className={cn(className)} {...props}>
      {children}
    </Span>
  );
}
