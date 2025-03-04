import { useFormContext } from 'react-hook-form';

import { cn } from './lib/cn';
import { Span } from './text';

type InputRequiredProps = {
  id: string;
  type: React.ComponentProps<'input'>['type'];
  field: string;
  autoComplete: React.ComponentProps<'input'>['autoComplete'];
};

type InputProps = React.ComponentProps<'input'> & InputRequiredProps;
export function Input({
  id,
  type,
  field,
  autoComplete,
  required,
  className,
  ...props
}: InputProps) {
  const { register } = useFormContext();
  const style = cn(
    'h-9 w-full rounded-base border border-muted bg-transparent px-3 py-2 text-sm text-black shadow-base placeholder:text-gray focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:outline-0 disabled:cursor-not-allowed disabled:text-muted disabled:placeholder:text-muted',
    className,
  );
  return (
    <input
      id={id}
      type={type}
      autoComplete={autoComplete}
      className={style}
      {...register(field, { required })}
      {...props}
    />
  );
}

type InputGroupProps = React.ComponentProps<'div'>;
export function InputGroup({ children, className, ...props }: InputGroupProps) {
  const style = cn('grid w-full max-w-form items-center gap-2', className);
  return (
    <div className={style} {...props}>
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

type InputErrorRequiredProps = { field: string };
type InputErrorProps = React.ComponentProps<'span'> & InputErrorRequiredProps;
export function InputError({ className, field, ...props }: InputErrorProps) {
  const { formState } = useFormContext();
  const { errors } = formState;
  const error = errors?.[field];

  if (!error || !error.message) return undefined;

  return (
    <Span size="sm" textColor="danger" className={cn('font-semibold', className)} {...props}>
      {error.message.toString()}
    </Span>
  );
}
