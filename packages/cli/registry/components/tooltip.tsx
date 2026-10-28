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
  type RefObject,
  type HTMLAttributes,
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
interface TooltipContextValue {
  open: boolean;
  id: string;
  trigger: RefObject<HTMLButtonElement | null>;
  content: RefObject<HTMLDivElement | null>;
  enter: (part: 'trigger' | 'content') => void;
  leave: (part: 'trigger' | 'content') => void;
  focus: () => void;
  blur: () => void;
  dismiss: () => void;
}
const TooltipContext = createContext<TooltipContextValue | null>(null);
function useTooltip() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw Error('Tooltip parts must be inside Tooltip.');
  return ctx;
}
export interface TooltipProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  id?: string;
}
export function Tooltip({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  delayDuration = 500,
  id,
}: TooltipProps) {
  const generated = useId();
  const [visible, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const latest = useRef(setOpen);
  latest.current = setOpen;
  const trigger = useRef<HTMLButtonElement>(null),
    content = useRef<HTMLDivElement>(null);
  const state = useRef({ trigger: false, content: false, focused: false, suppressed: false });
  const opening = useRef<ReturnType<typeof setTimeout> | null>(null),
    closing = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (opening.current !== null) clearTimeout(opening.current);
    if (closing.current !== null) clearTimeout(closing.current);
    opening.current = null;
    closing.current = null;
  };
  useLayoutEffect(() => () => clear(), []);
  const requestClose = () => {
    clear();
    closing.current = setTimeout(() => {
      const s = state.current;
      if (!s.trigger && !s.content && !s.focused) latest.current(false);
    }, 180);
  };
  const dismiss = () => {
    clear();
    state.current.suppressed = true;
    latest.current(false);
  };
  return (
    <TooltipContext.Provider
      value={{
        open: visible,
        id: id ?? generated,
        trigger,
        content,
        dismiss,
        enter: (part) => {
          clear();
          state.current[part] = true;
          if (part === 'trigger') {
            state.current.suppressed = false;
            opening.current = setTimeout(
              () => {
                if (!state.current.suppressed && state.current.trigger) latest.current(true);
              },
              Math.max(0, Number.isFinite(delayDuration) ? delayDuration : 500),
            );
          }
        },
        leave: (part) => {
          state.current[part] = false;
          requestClose();
        },
        focus: () => {
          clear();
          state.current.focused = true;
          state.current.suppressed = false;
          latest.current(true);
        },
        blur: () => {
          state.current.focused = false;
          requestClose();
        },
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}
export const TooltipTrigger = forwardRef<HTMLButtonElement, ButtonProps>(function TooltipTrigger(
  {
    variant = 'secondary',
    className,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    onClick,
    'aria-describedby': describedBy,
    ...props
  },
  ref,
) {
  const ctx = useTooltip();
  useImperativeHandle(ref, () => ctx.trigger.current!);
  const description = [
    ...new Set([...(describedBy?.split(/\s+/).filter(Boolean) ?? []), ctx.id]),
  ].join(' ');
  return (
    <Button
      {...props}
      ref={ctx.trigger}
      variant={variant}
      aria-describedby={description}
      className={cx('af-tooltip-trigger', className)}
      data-tooltip-open={ctx.open ? '' : undefined}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (!event.defaultPrevented && event.pointerType !== 'touch') ctx.enter('trigger');
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (!event.defaultPrevented && event.pointerType !== 'touch') ctx.leave('trigger');
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (!event.defaultPrevented) ctx.focus();
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.defaultPrevented) ctx.blur();
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.dismiss();
      }}
    />
  );
});
export interface TooltipContentProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'role' | 'popover' | 'children' | 'tabIndex'>,
    FloatingPositionProps {
  children: string;
}
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    {
      children,
      side = 'top',
      align = 'center',
      sideOffset = 8,
      collisionPadding = 8,
      className,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref,
  ) {
    const ctx = useTooltip();
    useImperativeHandle(ref, () => ctx.content.current!);
    const latest = useRef(ctx);
    latest.current = ctx;
    useLayoutEffect(() => {
      const node = ctx.content.current!;
      if (ctx.open) {
        if (!node.matches(':popover-open')) node.showPopover();
      } else if (node.matches(':popover-open')) node.hidePopover();
    }, [ctx.open]);
    useLayoutEffect(() => {
      if (!ctx.open) return;
      const node = ctx.content.current!,
        doc = node.ownerDocument;
      const unregister = registerFloatingLayer({
        element: node,
        kind: 'tooltip',
        dismiss: () => latest.current.dismiss(),
      });
      const key = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !event.defaultPrevented && isTopFloatingLayer(node)) {
          event.preventDefault();
          event.stopPropagation();
          latest.current.dismiss();
        }
      };
      doc.addEventListener('keydown', key, true);
      return () => {
        unregister();
        doc.removeEventListener('keydown', key, true);
      };
    }, [ctx.open, ctx.content]);
    useLayoutEffect(() => {
      const node = ctx.content.current!;
      return () => {
        if (node.matches(':popover-open')) node.hidePopover();
      };
    }, []);
    useFloatingPosition(
      ctx.open,
      ctx.trigger,
      ctx.content,
      { side, align, sideOffset, collisionPadding },
      () => latest.current.dismiss(),
    );
    return (
      <div
        {...props}
        ref={ctx.content}
        id={ctx.id}
        popover="manual"
        role="tooltip"
        className={cx('af-tooltip', className)}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (!event.defaultPrevented && event.pointerType !== 'touch') ctx.enter('content');
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          if (!event.defaultPrevented && event.pointerType !== 'touch') ctx.leave('content');
        }}
      >
        {children}
      </div>
    );
  },
);
