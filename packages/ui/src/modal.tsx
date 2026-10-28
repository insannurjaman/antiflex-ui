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
  type DialogHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import { Button, type ButtonProps } from './button';
import { useControllable } from './interaction-utils';
import { cx } from './utils';

export interface ModalRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}
interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  kind: 'dialog' | 'alertdialog';
  invoker: RefObject<HTMLButtonElement | null>;
  descriptions: number;
  setDescriptions: React.Dispatch<React.SetStateAction<number>>;
}
const ModalContext = createContext<ModalContextValue | null>(null);
function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw Error('Modal parts must be inside Dialog, AlertDialog, Sheet, or Drawer.');
  return ctx;
}
export function ModalRoot({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  id,
  kind,
}: ModalRootProps & { kind: ModalContextValue['kind'] }) {
  const generated = useId();
  const [visible, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const [descriptions, setDescriptions] = useState(0);
  const invoker = useRef<HTMLButtonElement>(null);
  return (
    <ModalContext.Provider
      value={{
        open: visible,
        setOpen,
        id: id ?? generated,
        kind,
        invoker,
        descriptions,
        setDescriptions,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// Count per owner document: nested modals retain the original inline scroll setting.
const scrollLocks = new WeakMap<Document, { count: number; value: string; priority: string }>();
function lockScroll(doc: Document) {
  const style = doc.documentElement.style;
  let state = scrollLocks.get(doc);
  if (!state) {
    state = {
      count: 0,
      value: style.getPropertyValue('overflow'),
      priority: style.getPropertyPriority('overflow'),
    };
    scrollLocks.set(doc, state);
    style.setProperty('overflow', 'hidden');
  }
  state.count++;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--state.count === 0) {
      if (state.value) style.setProperty('overflow', state.value, state.priority);
      else style.removeProperty('overflow');
      scrollLocks.delete(doc);
    }
  };
}
function canFocus(node: HTMLElement | null): node is HTMLElement {
  return (
    !!node &&
    node.isConnected &&
    !node.matches(':disabled') &&
    !node.closest('[inert]') &&
    node.getClientRects().length > 0 &&
    getComputedStyle(node).visibility !== 'hidden'
  );
}
function tabStops(root: HTMLDialogElement) {
  return [
    ...root.querySelectorAll<HTMLElement>(
      'button,input,select,textarea,a[href],area[href],[tabindex],audio[controls],video[controls],summary,iframe,[contenteditable="true"]',
    ),
  ]
    .filter((node) => node.closest('dialog') === root && node.tabIndex >= 0 && canFocus(node))
    .filter((node) => {
      if (!(node instanceof HTMLInputElement) || node.type !== 'radio' || !node.name) return true;
      const radios = [...root.querySelectorAll<HTMLInputElement>('input[type="radio"]')].filter(
        (r) => r.name === node.name && r.form === node.form && canFocus(r),
      );
      return node === (radios.find((r) => r.checked) ?? radios[0]);
    });
}
export interface ModalContentProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'open' | 'id' | 'role' | 'aria-modal'
> {
  size?: 'sm' | 'md' | 'lg';
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  dismissOnOutside?: boolean;
}
export const ModalContent = forwardRef<HTMLDialogElement, ModalContentProps>(function ModalContent(
  {
    size = 'md',
    initialFocusRef,
    returnFocusRef,
    dismissOnOutside = true,
    className,
    children,
    onCancel,
    onClose,
    onKeyDown,
    onPointerDown,
    onPointerUp,
    'aria-label': ariaLabel,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
    ...props
  },
  forwardedRef,
) {
  const ctx = useModal();
  const ref = useRef<HTMLDialogElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current!);
  const release = useRef<(() => void) | null>(null);
  const restore = useRef<HTMLElement | null>(null);
  const ignoreClose = useRef(0);
  const outsideDown = useRef<number | null>(null);
  const [nativeRevision, setNativeRevision] = useState(0);
  function restoreFocus() {
    const previous = restore.current;
    restore.current = null;
    ctx.invoker.current = null;
    // A workflow target may mount later in this same commit (for example Restore).
    queueMicrotask(() => {
      const target = returnFocusRef?.current ?? previous;
      if (canFocus(target)) target.focus({ preventScroll: true });
    });
  }
  useLayoutEffect(() => {
    const node = ref.current!;
    if (ctx.open && !node.open) {
      const active = node.ownerDocument.activeElement;
      restore.current = ctx.invoker.current ?? (active instanceof HTMLElement ? active : null);
      node.showModal();
      release.current ??= lockScroll(node.ownerDocument);
      const initial =
        initialFocusRef?.current ??
        (ctx.kind === 'alertdialog'
          ? node.querySelector<HTMLElement>('[data-af-dialog-cancel]:not(:disabled)')
          : null);
      if (initial && node.contains(initial) && canFocus(initial))
        initial.focus({ preventScroll: true });
      else if (
        node.ownerDocument.activeElement === node ||
        !node.contains(node.ownerDocument.activeElement)
      )
        (tabStops(node)[0] ?? node.querySelector<HTMLElement>('[data-af-dialog-title]'))?.focus({
          preventScroll: true,
        });
    } else if (!ctx.open) {
      if (node.open) {
        ignoreClose.current++;
        node.close();
      }
      release.current?.();
      release.current = null;
      restoreFocus();
    }
  }, [ctx.open, ctx.kind, nativeRevision, initialFocusRef, returnFocusRef]);
  useLayoutEffect(() => {
    const node = ref.current!;
    return () => {
      if (node.open) {
        ignoreClose.current++;
        node.close();
      }
      release.current?.();
      release.current = null;
      restoreFocus();
    };
  }, []);
  function isOutside(event: React.PointerEvent<HTMLDialogElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return (
      event.target === event.currentTarget &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    );
  }
  return (
    <dialog
      {...props}
      ref={ref}
      id={ctx.id}
      role={ctx.kind}
      aria-modal="true"
      aria-label={ariaLabel}
      aria-labelledby={labelledBy ?? (ariaLabel ? undefined : `${ctx.id}-title`)}
      aria-describedby={describedBy ?? (ctx.descriptions > 0 ? `${ctx.id}-description` : undefined)}
      className={cx('af-dialog', `af-dialog--${size}`, className)}
      data-kind={ctx.kind}
      onCancel={(event) => {
        if (event.target !== event.currentTarget) return;
        onCancel?.(event);
        const prevented = event.defaultPrevented;
        event.preventDefault();
        if (!prevented) ctx.setOpen(false);
      }}
      onClose={(event) => {
        if (event.target !== event.currentTarget) return;
        onClose?.(event);
        if (ignoreClose.current > 0) {
          ignoreClose.current--;
          return;
        }
        release.current?.();
        release.current = null;
        restoreFocus();
        ctx.setOpen(false);
        setNativeRevision((n) => n + 1);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          event.key !== 'Tab' ||
          (event.target as HTMLElement).closest('dialog') !== event.currentTarget
        )
          return;
        const items = tabStops(event.currentTarget);
        const first = items[0];
        const last = items.at(-1);
        const active = event.currentTarget.ownerDocument.activeElement;
        if (!first) {
          event.preventDefault();
          event.currentTarget.querySelector<HTMLElement>('[data-af-dialog-title]')?.focus();
        } else if (event.shiftKey && (active === first || !items.includes(active as HTMLElement))) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        outsideDown.current = !event.defaultPrevented && isOutside(event) ? event.pointerId : null;
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        const dismiss = outsideDown.current === event.pointerId && isOutside(event);
        outsideDown.current = null;
        if (!event.defaultPrevented && dismiss && ctx.kind === 'dialog' && dismissOnOutside)
          ctx.setOpen(false);
      }}
    >
      {children}
    </dialog>
  );
});
export const ModalTrigger = forwardRef<HTMLButtonElement, ButtonProps>(function ModalTrigger(
  { onClick, ...props },
  ref,
) {
  const ctx = useModal();
  return (
    <Button
      {...props}
      ref={ref}
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      aria-controls={ctx.id}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          ctx.invoker.current = event.currentTarget;
          ctx.setOpen(true);
        }
      }}
    />
  );
});
export const ModalClose = forwardRef<HTMLButtonElement, ButtonProps>(function ModalClose(
  { onClick, variant = 'secondary', ...props },
  ref,
) {
  const ctx = useModal();
  return (
    <Button
      {...props}
      variant={variant}
      ref={ref}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.setOpen(false);
      }}
    />
  );
});
export const ModalCancel = forwardRef<HTMLButtonElement, ButtonProps>(
  function ModalCancel(props, ref) {
    return <ModalClose {...props} ref={ref} data-af-dialog-cancel="" />;
  },
);
export const ModalAction = forwardRef<HTMLButtonElement, ButtonProps>(function ModalAction(
  { variant = 'danger', ...props },
  ref,
) {
  return <ModalClose {...props} variant={variant} ref={ref} />;
});
export const ModalTitle = forwardRef<
  HTMLHeadingElement,
  Omit<HTMLAttributes<HTMLHeadingElement>, 'id'>
>(function ModalTitle({ className, tabIndex = -1, ...props }, ref) {
  const ctx = useModal();
  return (
    <h2
      {...props}
      ref={ref}
      tabIndex={tabIndex}
      id={`${ctx.id}-title`}
      data-af-dialog-title=""
      className={cx('af-dialog__title', className)}
    />
  );
});
export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  Omit<HTMLAttributes<HTMLParagraphElement>, 'id'>
>(function ModalDescription({ className, ...props }, ref) {
  const ctx = useModal();
  const setDescriptions = ctx.setDescriptions;
  useLayoutEffect(() => {
    setDescriptions((n) => n + 1);
    return () => setDescriptions((n) => n - 1);
  }, [setDescriptions]);
  return (
    <p
      {...props}
      ref={ref}
      id={`${ctx.id}-description`}
      className={cx('af-dialog__description', className)}
    />
  );
});
export const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ModalHeader({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={cx('af-dialog__header', className)} />;
  },
);
export const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ModalBody({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={cx('af-dialog__body', className)} />;
  },
);
export const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ModalFooter({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={cx('af-dialog__footer', className)} />;
  },
);
