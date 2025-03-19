import { createContext, createRef, use, useRef, useState } from 'react';

import { cn } from './lib/cn';

// ***** Context *****
type AccordionContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  headerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const AccordionContext = createContext<AccordionContextType>({
  isOpen: false,
  setIsOpen: () => {},
  headerRef: createRef<HTMLDivElement>(),
  contentRef: createRef<HTMLDivElement>(),
});

export const accordionStyle = cn(
  'cursor-pointer overflow-hidden border-b border-muted text-left transition-[height] duration-base first:border-t [&>:last-child]:pb-4',
);

// ***** Components *****
type AccordionProps = React.ComponentProps<'button'>;
export function Accordion({ children, ...props }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <AccordionContext.Provider value={{ isOpen, setIsOpen, headerRef, contentRef }}>
      <button
        type="button"
        aria-expanded={isOpen}
        className={accordionStyle}
        style={{ height: calculateHeight({ isOpen, headerRef, contentRef }) }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        {...props}>
        {children}
      </button>
    </AccordionContext.Provider>
  );
}

type AccordionHeaderProps = React.ComponentProps<'div'> & {
  header?: React.ComponentProps<'span'>;
};
export const headerStyle = cn('w-full text-sm font-medium transition-colors duration-base');
export function AccordionHeader({ header, className, children, ...props }: AccordionHeaderProps) {
  const { headerRef } = use(AccordionContext);
  const divClass = cn('flex justify-between py-4 hover:underline', className);
  const headerClass = cn(headerStyle, header?.className);
  return (
    <div ref={headerRef} className={divClass} {...props}>
      <span ref={headerRef} className={headerClass} {...header}>
        {children}
      </span>
      <AccordionIcon />
    </div>
  );
}

type AccordionIconProps = React.ComponentProps<'svg'>;
export function AccordionIcon({ className, ...props }: AccordionIconProps) {
  const { isOpen } = use(AccordionContext);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(
        'size-5 rotate-0 transition-all duration-base',
        isOpen && 'rotate-180',
        className,
      )}
      {...props}>
      <path
        fillRule="evenodd"
        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type AccordionContentProps = React.ComponentProps<'div'>;
export function AccordionContent({ children, ...props }: AccordionContentProps) {
  const { contentRef } = use(AccordionContext);
  return (
    <div ref={contentRef} className="grid overflow-hidden transition-all duration-base" {...props}>
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

type CalculateHeightProps = {
  isOpen: boolean;
  headerRef: React.RefObject<HTMLSpanElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

function calculateHeight({ isOpen, headerRef, contentRef }: CalculateHeightProps) {
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
