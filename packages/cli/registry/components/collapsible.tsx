'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { useControllable } from './interaction-utils';
import { cx } from './utils';
interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  disabled?: boolean;
}
const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);
function useCollapsible() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw Error('Collapsible parts must be inside Collapsible.');
  return ctx;
}
export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}
export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  { open, defaultOpen = false, onOpenChange, disabled, id, className, children, ...props },
  ref,
) {
  const generated = useId();
  const [visible, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  return (
    <CollapsibleContext.Provider value={{ open: visible, setOpen, disabled, id: id ?? generated }}>
      <div
        {...props}
        ref={ref}
        id={id}
        className={cx('af-collapsible', className)}
        data-state={visible ? 'open' : 'closed'}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
});
export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'>
>(function CollapsibleTrigger({ className, onClick, disabled, type = 'button', ...props }, ref) {
  const ctx = useCollapsible();
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      id={`${ctx.id}-trigger`}
      aria-expanded={ctx.open}
      aria-controls={`${ctx.id}-content`}
      disabled={ctx.disabled || disabled}
      className={cx('af-collapsible__trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !ctx.disabled && !disabled) ctx.setOpen(!ctx.open);
      }}
    />
  );
});
export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  Omit<HTMLAttributes<HTMLDivElement>, 'id'>
>(function CollapsibleContent({ className, onFocusCapture, onBlurCapture, ...props }, ref) {
  const ctx = useCollapsible();
  const content = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<Element | null>(null);
  useImperativeHandle(ref, () => content.current!, []);
  useLayoutEffect(() => {
    if (!ctx.open) {
      const active = document.activeElement;
      // WebKit may move focus to body as soon as hidden is committed.
      const lostInside =
        active === document.body &&
        lastFocused.current &&
        content.current?.contains(lastFocused.current);
      if (content.current?.contains(active) || lostInside)
        document.getElementById(`${ctx.id}-trigger`)?.focus();
      lastFocused.current = null;
    }
  }, [ctx.open, ctx.id]);
  return (
    <div
      {...props}
      ref={content}
      onFocusCapture={(event) => {
        onFocusCapture?.(event);
        lastFocused.current = event.target;
      }}
      onBlurCapture={(event) => {
        onBlurCapture?.(event);
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
          lastFocused.current = null;
      }}
      id={`${ctx.id}-content`}
      hidden={!ctx.open}
      className={cx('af-collapsible__content', className)}
    />
  );
});
