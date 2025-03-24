import type { JSX } from 'react';
import { createContext, use, useMemo, useRef, useState } from 'react';
import { cn } from './lib/cn';

// ***** Context *****
interface AccordionContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  headerRef: React.RefObject<HTMLDivElement | null> | null;
  contentRef: React.RefObject<HTMLDivElement | null> | null;
}

const AccordionContext = createContext<AccordionContextType>({
  isOpen: false,
  setIsOpen: () => { },
  headerRef: null,
  contentRef: null,
});

export const accordionStyle = cn(
  'cursor-pointer overflow-hidden border-b border-muted text-left transition-[height] duration-base first:border-t [&>:last-child]:pb-4',
);

// ***** Components *****
type AccordionProps = React.ComponentProps<'button'>;
export function Accordion({ children, ...props }: AccordionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const values = useMemo(
    () => ({ isOpen, setIsOpen, headerRef, contentRef }),
    [isOpen, setIsOpen, headerRef, contentRef],
  );

  return (
    <AccordionContext value={values}>
      <button
        aria-expanded={isOpen}
        className={accordionStyle}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{ height: calculateHeight({ isOpen, headerRef, contentRef }) }}
        type="button"
        {...props}
      >
        {children}
      </button>
    </AccordionContext>
  );
}

type AccordionHeaderProps = React.ComponentProps<'div'> & {
  header?: React.ComponentProps<'span'>;
};
export const headerStyle = cn('w-full text-sm font-medium transition-colors duration-base');
export function AccordionHeader({
  children,
  className,
  header,
  ...props
}: AccordionHeaderProps): JSX.Element {
  const { headerRef } = use(AccordionContext);
  const divClass = cn('flex justify-between py-4 hover:underline', className);
  const headerClass = cn(headerStyle, header?.className);
  return (
    <div className={divClass} ref={headerRef} {...props}>
      <span className={headerClass} ref={headerRef} {...header}>
        {children}
      </span>
      <AccordionIcon />
    </div>
  );
}

type AccordionIconProps = React.ComponentProps<'svg'>;
export function AccordionIcon({ className, ...props }: AccordionIconProps): JSX.Element {
  const { isOpen } = use(AccordionContext);
  return (
    <svg
      className={cn(
        'size-5 rotate-0 transition-all duration-base',
        isOpen && 'rotate-180',
        className,
      )}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

type AccordionContentProps = React.ComponentProps<'div'>;
export function AccordionContent({ children, ...props }: AccordionContentProps): JSX.Element {
  const { contentRef } = use(AccordionContext);
  return (
    <div className="grid overflow-hidden transition-all duration-base" ref={contentRef} {...props}>
      {children}
    </div>
  );
}

/**
 * Calculates the height of an accordion element based on its open state
 *
 * @param isOpen - Whether the accordion is currently open
 * @param headerRef - React ref to the accordion header span element
 * @param contentRef - React ref to the accordion content div element
 * @returns The calculated height as a CSS pixel value
 *
 * When closed, returns a fixed height of 45px
 * When open, returns the content scroll height + 45px
 * If header or content ref is not available, defaults to closed height
 */

interface CalculateHeightProps {
  isOpen: boolean;
  headerRef: React.RefObject<HTMLSpanElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

function calculateHeight({ isOpen, headerRef, contentRef }: CalculateHeightProps): number {
  if (!headerRef.current || !contentRef.current) {
    return 52;
  }

  if (isOpen) {
    const headerHeight = headerRef.current.offsetHeight;
    const contentHeight = contentRef.current.offsetHeight;
    return headerHeight + contentHeight;
  }

  return headerRef.current.offsetHeight;
}
