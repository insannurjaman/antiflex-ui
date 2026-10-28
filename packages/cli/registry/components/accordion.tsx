'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { moveCollectionFocus, useControllable } from './interaction-utils';
import { cx } from './utils';
interface AccordionContextValue {
  values: string[];
  toggle: (value: string) => void;
  disabled?: boolean;
  collapsible: boolean;
  headingLevel: 2 | 3 | 4 | 5 | 6;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
const ItemContext = createContext<{ id: string; value: string; disabled?: boolean } | null>(null);
function useAccordionItem() {
  const root = useContext(AccordionContext);
  const item = useContext(ItemContext);
  if (!root || !item) throw Error('Accordion parts must be inside AccordionItem and Accordion.');
  return {
    ...root,
    ...item,
    disabled: root.disabled || item.disabled,
    open: root.values.includes(item.value),
  };
}
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  type?: 'single' | 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    type = 'single',
    value,
    defaultValue = [],
    onValueChange,
    collapsible = true,
    disabled,
    headingLevel = 3,
    className,
    onKeyDown,
    children,
    ...props
  },
  ref,
) {
  const [state, setState] = useControllable(value, defaultValue, onValueChange);
  const values = type === 'single' ? state.slice(0, 1) : state;
  const toggle = (item: string) => {
    if (values.includes(item)) {
      if (collapsible || values.length > 1) setState(values.filter((v) => v !== item));
    } else setState(type === 'single' ? [item] : [...values, item]);
  };
  return (
    <AccordionContext.Provider value={{ values, toggle, disabled, collapsible, headingLevel }}>
      <div
        role="group"
        {...props}
        ref={ref}
        data-af-accordion=""
        className={cx('af-accordion', className)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented)
            moveCollectionFocus(
              event,
              '[data-af-accordion-trigger]',
              '[data-af-accordion]',
              'vertical',
            );
        }}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, disabled, id, className, children, ...props },
  ref,
) {
  const generated = useId();
  return (
    <ItemContext.Provider value={{ value, disabled, id: id ?? generated }}>
      <div {...props} id={id} ref={ref} className={cx('af-accordion__item', className)}>
        {children}
      </div>
    </ItemContext.Provider>
  );
});
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'>
>(function AccordionTrigger(
  { children, className, onClick, disabled, type = 'button', ...props },
  ref,
) {
  const ctx = useAccordionItem();
  const Heading = `h${ctx.headingLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Heading className="af-accordion__heading">
      <button
        {...props}
        ref={ref}
        type={type}
        id={`${ctx.id}-trigger`}
        data-af-accordion-trigger=""
        aria-controls={`${ctx.id}-content`}
        aria-expanded={ctx.open}
        aria-disabled={(ctx.open && !ctx.collapsible && ctx.values.length === 1) || undefined}
        disabled={ctx.disabled || disabled}
        className={cx('af-accordion__trigger', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !ctx.disabled && !disabled) ctx.toggle(ctx.value);
        }}
      >
        <span>{children}</span>
        <svg
          className="af-disclosure-chevron"
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </Heading>
  );
});
export const AccordionContent = forwardRef<
  HTMLDivElement,
  Omit<HTMLAttributes<HTMLDivElement>, 'id'>
>(function AccordionContent({ className, ...props }, ref) {
  const ctx = useAccordionItem();
  return (
    <div
      {...props}
      ref={ref}
      id={`${ctx.id}-content`}
      hidden={!ctx.open}
      className={cx('af-accordion__content', className)}
    />
  );
});
