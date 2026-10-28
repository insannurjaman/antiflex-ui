'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type RefObject,
} from 'react';
import { Button, type ButtonProps } from './button';
import { useControllable } from './interaction-utils';
import {
  isTopFloatingLayer,
  registerFloatingLayer,
  useFloatingPosition,
  type FloatingPositionProps,
} from './floating-utils';
import { cx } from './utils';
interface State {
  open: boolean;
  setOpen: (v: boolean) => void;
  id: string;
  anchor: RefObject<HTMLAnchorElement | null>;
  panel: RefObject<HTMLDivElement | null>;
  schedule: (open: boolean, delay?: number) => void;
  cancel: () => void;
  openDelay: number;
  closeDelay: number;
}
const Context = createContext<State | null>(null);
function useCard() {
  const c = useContext(Context);
  if (!c) throw Error('HoverCard parts require HoverCard.');
  return c;
}
export interface HoverCardProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  id?: string;
}
export function HoverCard({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  openDelay = 600,
  closeDelay = 300,
  id,
}: HoverCardProps) {
  const [visible, setOpen] = useControllable(open, defaultOpen, onOpenChange),
    generated = useId();
  const anchor = useRef<HTMLAnchorElement>(null),
    panel = useRef<HTMLDivElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined),
    latest = useRef(setOpen);
  latest.current = setOpen;
  const cancel = () => {
    clearTimeout(timer.current);
    timer.current = undefined;
  };
  const schedule = (next: boolean, delay = next ? openDelay : closeDelay) => {
    cancel();
    if (delay <= 0) latest.current(next);
    else
      timer.current = setTimeout(
        () => latest.current(next),
        Number.isFinite(delay) ? Math.min(delay, 60000) : 0,
      );
  };
  useLayoutEffect(() => () => clearTimeout(timer.current), []);
  return (
    <Context.Provider
      value={{
        open: visible,
        setOpen,
        id: id ?? generated,
        anchor,
        panel,
        schedule,
        cancel,
        openDelay,
        closeDelay,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const HoverCardTrigger = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(function HoverCardTrigger(
  { onPointerEnter, onPointerLeave, onFocus, onBlur, onClick, className, ...props },
  ref,
) {
  const c = useCard();
  useImperativeHandle(ref, () => c.anchor.current!);
  return (
    <a
      {...props}
      ref={c.anchor}
      className={cx('af-hover-card__trigger', className)}
      aria-controls={c.id}
      aria-expanded={c.open}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (!e.defaultPrevented && e.pointerType !== 'touch') c.schedule(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        if (!e.defaultPrevented && e.currentTarget.ownerDocument.activeElement !== e.currentTarget)
          c.schedule(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        if (!e.defaultPrevented) c.schedule(true, 0);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.defaultPrevented && !c.panel.current?.contains(e.relatedTarget as Node))
          c.schedule(false);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          c.cancel();
          c.setOpen(false);
        }
      }}
    />
  );
});
export const HoverCardToggle = forwardRef<HTMLButtonElement, ButtonProps>(function HoverCardToggle(
  { onClick, variant = 'ghost', ...props },
  ref,
) {
  const c = useCard();
  return (
    <Button
      {...props}
      ref={ref}
      variant={variant}
      aria-controls={c.id}
      aria-expanded={c.open}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          c.cancel();
          c.setOpen(!c.open);
        }
      }}
    />
  );
});
export interface HoverCardContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'popover' | 'role'>, FloatingPositionProps {}
export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  function HoverCardContent(
    {
      side = 'bottom',
      align = 'start',
      sideOffset = 8,
      collisionPadding = 8,
      className,
      onPointerEnter,
      onPointerLeave,
      'aria-label': label,
      'aria-labelledby': labelledBy,
      ...props
    },
    ref,
  ) {
    const c = useCard(),
      latest = useRef(c);
    latest.current = c;
    useImperativeHandle(ref, () => c.panel.current!);
    useLayoutEffect(() => {
      const node = c.panel.current!;
      if (c.open && !node.matches(':popover-open')) node.showPopover();
      if (!c.open && node.matches(':popover-open')) node.hidePopover();
    }, [c.open]);
    useLayoutEffect(() => {
      if (!c.open) return;
      const node = c.panel.current!,
        doc = node.ownerDocument;
      const inside = (t: EventTarget | null) =>
        t instanceof Node &&
        (node.contains(t) ||
          !!c.anchor.current?.contains(t) ||
          (t instanceof Element && t.closest(`[aria-controls="${CSS.escape(c.id)}"]`)));
      const close = () => {
        latest.current.cancel();
        latest.current.setOpen(false);
      };
      const key = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !e.defaultPrevented && isTopFloatingLayer(node)) {
          e.preventDefault();
          e.stopPropagation();
          close();
        }
      };
      const pointer = (e: PointerEvent) => {
        if (!inside(e.target) && isTopFloatingLayer(node)) close();
      };
      const focus = (e: FocusEvent) => {
        if (!inside(e.target) && isTopFloatingLayer(node)) close();
      };
      const cleanup = registerFloatingLayer({ element: node, kind: 'popover', dismiss: close });
      doc.addEventListener('keydown', key, true);
      doc.addEventListener('pointerdown', pointer, true);
      doc.addEventListener('focusin', focus);
      return () => {
        cleanup();
        doc.removeEventListener('keydown', key, true);
        doc.removeEventListener('pointerdown', pointer, true);
        doc.removeEventListener('focusin', focus);
      };
    }, [c.open, c.anchor, c.id]);
    useLayoutEffect(() => {
      const node = c.panel.current!;
      return () => {
        if (node.matches(':popover-open')) node.hidePopover();
      };
    }, []);
    useFloatingPosition(
      c.open,
      c.anchor,
      c.panel,
      { side, align, sideOffset, collisionPadding },
      () => latest.current.setOpen(false),
    );
    return (
      <div
        {...props}
        ref={c.panel}
        id={c.id}
        popover="manual"
        role="region"
        tabIndex={props.tabIndex ?? 0}
        aria-label={label}
        aria-labelledby={labelledBy ?? (label ? undefined : `${c.id}-title`)}
        className={cx('af-hover-card', className)}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          if (!e.defaultPrevented) c.cancel();
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          if (
            !e.defaultPrevented &&
            c.anchor.current !== e.currentTarget.ownerDocument.activeElement
          )
            c.schedule(false);
        }}
      />
    );
  },
);
export const HoverCardTitle = forwardRef<
  HTMLHeadingElement,
  Omit<HTMLAttributes<HTMLHeadingElement>, 'id'>
>(function HoverCardTitle({ className, ...props }, ref) {
  const c = useCard();
  return (
    <h3
      {...props}
      id={`${c.id}-title`}
      ref={ref}
      className={cx('af-hover-card__title', className)}
    />
  );
});
