import { cva } from 'class-variance-authority';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

import type { ResponseStatus } from '@repo/http/JSend';

import { cn } from './lib/cn';
import { Span } from './text';

export function Toaster() {
  return <SonnerToaster position="top-right" richColors />;
}

export function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast id={id} status={toast.status} title={toast.title} description={toast.description} />
  ));
}

export const toastVariants = cva('', {
  variants: {
    backgroundColor: {
      success: 'bg-success-accent',
      error: 'bg-danger-accent',
      info: 'bg-info-accent',
      warning: 'bg-warning-accent',
    },
    textColor: {
      success: 'text-success-hover',
      error: 'text-danger-hover',
      info: 'text-info-hover',
      warning: 'text-warning-hover',
    },
    ring: {
      success: 'inset-ring-success/5',
      error: 'inset-ring-danger/5',
      info: 'inset-ring-info/5',
      warning: 'inset-ring-warning/5',
    },
  },
  compoundVariants: [
    {
      ring: ['success', 'error', 'info', 'warning'],
      className: 'inset-ring-2',
    },
  ],
  defaultVariants: {},
});

export function Toast(props: ToastProps) {
  const { id, title, description } = props;
  const backgroundStyle = toastVariants({ backgroundColor: props.status });
  const textColor = toastVariants({ textColor: props.status });
  const ring = toastVariants({ ring: props.status });

  return (
    <button
      type="button"
      onClick={() => sonnerToast.dismiss(id)}
      className={cn(
        backgroundStyle,
        ring,
        'group/toast relative min-w-toast cursor-pointer appearance-none rounded-base p-4',
      )}>
      <div className="flex items-center gap-2">
        {getIcon(props.status, textColor)}
        <div className="flex flex-col gap-2">
          <Span size="xs" className={cn(textColor, 'text-left font-semibold')}>
            {title}
          </Span>
          {description && (
            <Span size="xs" className={cn(textColor, 'text-left')}>
              {description}
            </Span>
          )}
        </div>
      </div>
      <ToastCloseButton backgroundStyle={backgroundStyle} textColor={textColor} ring={ring} />
    </button>
  );
}

interface ToastProps {
  id: string | number;
  status: ResponseStatus;
  title: string;
  description?: string;
}

type ToastCloseButtonProps = {
  backgroundStyle: string;
  textColor: string;
  ring: string;
};
function ToastCloseButton({ backgroundStyle, textColor, ring }: ToastCloseButtonProps) {
  return (
    <div
      className={cn(
        'absolute -top-1 -left-1 rounded-full p-1 opacity-0 transition-opacity duration-base group-hover/toast:opacity-100',
        backgroundStyle,
        ring,
      )}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={cn('size-3 fill-white', textColor)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </div>
  );
}

type IconProps = { textColor: string };
type ToastIcon = React.ComponentProps<'svg'> & IconProps;

function ToastIcon({ textColor, children, ...props }: ToastIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('size-5 shrink-0', textColor)}
      {...props}>
      {children}
    </svg>
  );
}

function SuccessIcon({ textColor }: IconProps) {
  return (
    <ToastIcon textColor={textColor}>
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </ToastIcon>
  );
}

function InfoIcon({ textColor }: IconProps) {
  return (
    <ToastIcon textColor={textColor}>
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    </ToastIcon>
  );
}

function WarningIcon({ textColor }: IconProps) {
  return (
    <ToastIcon textColor={textColor}>
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    </ToastIcon>
  );
}

function ErrorIcon({ textColor }: IconProps) {
  return (
    <ToastIcon textColor={textColor}>
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    </ToastIcon>
  );
}

function getIcon(status: ResponseStatus, textColor: string) {
  switch (status) {
    case 'success':
      return <SuccessIcon textColor={textColor} />;
    case 'info':
      return <InfoIcon textColor={textColor} />;
    case 'warning':
      return <WarningIcon textColor={textColor} />;
    case 'error':
      return <ErrorIcon textColor={textColor} />;
  }
}
