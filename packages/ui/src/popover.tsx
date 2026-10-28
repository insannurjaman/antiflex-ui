'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
  type HTMLAttributes,
} from 'react';
import { Button, type ButtonProps } from './button';
import { useControllable } from './interaction-utils';
import {
  canFocus,
  focusableIn,
  isTopFloatingLayer,
  registerFloatingLayer,
  useFloatingPosition,
  type FloatingPositionProps,
} from './floating-utils';
import { cx } from './utils';
interface PopoverContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  id: string;
  trigger: RefObject<HTMLButtonElement | null>;
  content: RefObject<HTMLDivElement | null>;
  reason: RefObject<'close' | 'escape' | 'outside' | 'focus' | 'hidden' | null>;
  descriptions: number;
  setDescriptions: React.Dispatch<React.SetStateAction<number>>;
}
const PopoverContext = createContext<PopoverContextValue | null>(null);
function usePopover() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw Error('Popover parts must be inside Popover.');
  return ctx;
}
export interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}
export function Popover({ children, open, defaultOpen = false, onOpenChange, id }: PopoverProps) {
  const generated = useId();
  const [visible, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const trigger = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const reason = useRef<PopoverContextValue['reason']['current']>(null);
  const [descriptions, setDescriptions] = useState(0);
  return (
    <PopoverContext.Provider
      value={{
        open: visible,
        setOpen,
        id: id ?? generated,
        trigger,
        content,
        reason,
        descriptions,
        setDescriptions,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}
export const PopoverTrigger = forwardRef<HTMLButtonElement, ButtonProps>(function PopoverTrigger(
  { onClick, variant = 'secondary', ...props },
  ref,
) {
  const ctx = usePopover();
  useImperativeHandle(ref, () => ctx.trigger.current!);
  return (
    <Button
      {...props}
      ref={ctx.trigger}
      variant={variant}
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      aria-controls={ctx.id}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          ctx.reason.current = 'close';
          ctx.setOpen(!ctx.open);
        }
      }}
    />
  );
});
export interface PopoverContentProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'role' | 'popover' | 'aria-modal'>,
    FloatingPositionProps {
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      side = 'bottom',
      align = 'start',
      sideOffset = 8,
      collisionPadding = 8,
      initialFocusRef,
      returnFocusRef,
      className,
      children,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
      ...props
    },
    ref,
  ) {
    const ctx = usePopover();
    useImperativeHandle(ref, () => ctx.content.current!);
    const latest = useRef(ctx);
    latest.current = ctx;
    const restoreRef = useRef(returnFocusRef);
    restoreRef.current = returnFocusRef;
    const dismiss = (reason: NonNullable<PopoverContextValue['reason']['current']>) => {
      latest.current.reason.current = reason;
      latest.current.setOpen(false);
    };
    useLayoutEffect(() => {
      const node = ctx.content.current!;
      if (ctx.open) {
        if (!node.matches(':popover-open')) {
          node.showPopover();
          ctx.reason.current = null;
          const target = initialFocusRef?.current ?? focusableIn(node)[0] ?? node;
          if (node.contains(target) && canFocus(target)) target.focus({ preventScroll: true });
        }
      } else if (node.matches(':popover-open')) {
        const held = node.contains(node.ownerDocument.activeElement);
        node.hidePopover();
        const reason = ctx.reason.current;
        if (held || reason === 'escape' || reason === 'close')
          queueMicrotask(() => {
            const target = restoreRef.current?.current ?? ctx.trigger.current;
            if (canFocus(target)) target.focus({ preventScroll: true });
          });
        ctx.reason.current = null;
      }
    }, [ctx.open, initialFocusRef]);
    useLayoutEffect(() => {
      if (!ctx.open) return;
      const node = ctx.content.current!;
      const doc = node.ownerDocument;
      const unregister = registerFloatingLayer({
        element: node,
        kind: 'popover',
        dismiss: () => dismiss('escape'),
      });
      let down: number | null = null;
      const inside = (target: EventTarget | null) =>
        target instanceof Node &&
        (node.contains(target) || !!ctx.trigger.current?.contains(target));
      const key = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !event.defaultPrevented && isTopFloatingLayer(node)) {
          event.preventDefault();
          event.stopPropagation();
          dismiss('escape');
        }
      };
      const pointerDown = (event: PointerEvent) => {
        down =
          event.button === 0 && isTopFloatingLayer(node) && !inside(event.target)
            ? event.pointerId
            : null;
      };
      const pointerUp = (event: PointerEvent) => {
        if (down === event.pointerId && !inside(event.target) && isTopFloatingLayer(node))
          dismiss('outside');
        down = null;
      };
      const focus = (event: FocusEvent) => {
        if (isTopFloatingLayer(node) && !inside(event.target)) dismiss('focus');
      };
      doc.addEventListener('keydown', key, true);
      doc.addEventListener('pointerdown', pointerDown, true);
      doc.addEventListener('pointerup', pointerUp, true);
      doc.addEventListener('focusin', focus);
      return () => {
        unregister();
        doc.removeEventListener('keydown', key, true);
        doc.removeEventListener('pointerdown', pointerDown, true);
        doc.removeEventListener('pointerup', pointerUp, true);
        doc.removeEventListener('focusin', focus);
      };
    }, [ctx.open, ctx.trigger, ctx.content]);
    useLayoutEffect(() => {
      const node = ctx.content.current!;
      return () => {
        const held = node.contains(node.ownerDocument.activeElement);
        if (node.matches(':popover-open')) node.hidePopover();
        if (held)
          queueMicrotask(() => {
            const target = restoreRef.current?.current ?? ctx.trigger.current;
            if (canFocus(target)) target.focus({ preventScroll: true });
          });
      };
    }, []);
    useFloatingPosition(
      ctx.open,
      ctx.trigger,
      ctx.content,
      { side, align, sideOffset, collisionPadding },
      () => dismiss('hidden'),
    );
    return (
      <div
        {...props}
        ref={ctx.content}
        id={ctx.id}
        popover="manual"
        role="dialog"
        aria-modal="false"
        tabIndex={-1}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy ?? (ariaLabel ? undefined : `${ctx.id}-title`)}
        aria-describedby={describedBy ?? (ctx.descriptions ? `${ctx.id}-description` : undefined)}
        className={cx('af-popover', className)}
        onBlur={(event) => onBlur?.(event)}
      >
        {children}
      </div>
    );
  },
);
export const PopoverTitle = forwardRef<
  HTMLHeadingElement,
  Omit<HTMLAttributes<HTMLHeadingElement>, 'id'>
>(function PopoverTitle({ className, ...props }, ref) {
  const ctx = usePopover();
  return (
    <h3
      {...props}
      ref={ref}
      id={`${ctx.id}-title`}
      className={cx('af-popover__title', className)}
    />
  );
});
export const PopoverDescription = forwardRef<
  HTMLParagraphElement,
  Omit<HTMLAttributes<HTMLParagraphElement>, 'id'>
>(function PopoverDescription({ className, ...props }, ref) {
  const ctx = usePopover();
  const setter = ctx.setDescriptions;
  useLayoutEffect(() => {
    setter((n) => n + 1);
    return () => setter((n) => n - 1);
  }, [setter]);
  return (
    <p
      {...props}
      ref={ref}
      id={`${ctx.id}-description`}
      className={cx('af-popover__description', className)}
    />
  );
});
export const PopoverClose = forwardRef<HTMLButtonElement, ButtonProps>(function PopoverClose(
  { onClick, variant = 'secondary', ...props },
  ref,
) {
  const ctx = usePopover();
  return (
    <Button
      {...props}
      ref={ref}
      variant={variant}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          ctx.reason.current = 'close';
          ctx.setOpen(false);
        }
      }}
    />
  );
});
