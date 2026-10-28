'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  type RefObject,
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
const Context = createContext<{ value: string; setValue: (v: string) => void } | null>(null);
interface Item {
  id: string;
  value: string;
  trigger: RefObject<HTMLButtonElement | null>;
  content: RefObject<HTMLDivElement | null>;
  entry: RefObject<'first' | 'last' | null>;
  reason: RefObject<'escape' | null>;
}
const ItemContext = createContext<Item | null>(null);
function useNav() {
  const c = useContext(Context);
  if (!c) throw Error('NavigationMenu parts require NavigationMenu.');
  return c;
}
function useItem() {
  const c = useContext(ItemContext);
  if (!c) throw Error('NavigationMenu trigger/content require NavigationMenuItem.');
  return c;
}
export interface NavigationMenuProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'defaultValue' | 'onChange'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(function NavigationMenu(
  {
    value,
    defaultValue = '',
    onValueChange,
    className,
    'aria-label': label = 'Main navigation',
    ...props
  },
  ref,
) {
  const [current, setValue] = useControllable(value, defaultValue, onValueChange);
  return (
    <Context.Provider value={{ value: current, setValue }}>
      <nav
        {...props}
        ref={ref}
        aria-label={label}
        className={cx('af-navigation-menu', className)}
      />
    </Context.Provider>
  );
});
export const NavigationMenuList = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  function NavigationMenuList({ className, ...props }, ref) {
    return <ul {...props} ref={ref} className={cx('af-navigation-menu__list', className)} />;
  },
);
export interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  value: string;
  children?: ReactNode;
}
export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  function NavigationMenuItem({ value, ...props }, ref) {
    const id = useId(),
      trigger = useRef<HTMLButtonElement>(null),
      content = useRef<HTMLDivElement>(null),
      entry = useRef<Item['entry']['current']>(null),
      reason = useRef<Item['reason']['current']>(null);
    return (
      <ItemContext.Provider value={{ id, value, trigger, content, entry, reason }}>
        <li {...props} ref={ref} />
      </ItemContext.Provider>
    );
  },
);
export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, ButtonProps>(
  function NavigationMenuTrigger(
    { onClick, onKeyDown, variant = 'ghost', children, className, ...props },
    ref,
  ) {
    const nav = useNav(),
      item = useItem();
    useImperativeHandle(ref, () => item.trigger.current!);
    return (
      <Button
        {...props}
        ref={item.trigger}
        id={`${item.id}-trigger`}
        variant={variant}
        aria-expanded={nav.value === item.value}
        aria-controls={item.id}
        className={cx('af-navigation-menu__trigger', className)}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) nav.setValue(nav.value === item.value ? '' : item.value);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (!e.defaultPrevented && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
            e.preventDefault();
            item.entry.current = e.key === 'ArrowDown' ? 'first' : 'last';
            nav.setValue(item.value);
            if (nav.value === item.value) {
              const list = item.content.current ? focusableIn(item.content.current) : [];
              (item.entry.current === 'last' ? list.at(-1) : list[0])?.focus();
              item.entry.current = null;
            }
          }
        }}
      >
        {children}
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Button>
    );
  },
);
export interface NavigationMenuContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'popover'>, FloatingPositionProps {}
export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  function NavigationMenuContent(
    { side = 'bottom', align = 'start', sideOffset = 8, collisionPadding = 8, className, ...props },
    ref,
  ) {
    const nav = useNav(),
      item = useItem(),
      open = nav.value === item.value,
      latest = useRef(nav);
    latest.current = nav;
    useImperativeHandle(ref, () => item.content.current!);
    useLayoutEffect(() => {
      const node = item.content.current!;
      if (open) {
        if (!node.matches(':popover-open')) node.showPopover();
        if (item.entry.current) {
          const list = focusableIn(node);
          (item.entry.current === 'last' ? list.at(-1) : list[0])?.focus();
          item.entry.current = null;
        }
      } else if (node.matches(':popover-open')) {
        const held = node.contains(node.ownerDocument.activeElement);
        node.hidePopover();
        if (held && item.reason.current === 'escape' && canFocus(item.trigger.current))
          item.trigger.current.focus();
        item.reason.current = null;
      }
    }, [open, item.content, item.trigger, item.entry, item.reason]);
    useLayoutEffect(() => {
      if (!open) return;
      const node = item.content.current!,
        doc = node.ownerDocument;
      const inside = (t: EventTarget | null) =>
        t instanceof Node && (node.contains(t) || !!item.trigger.current?.contains(t));
      const close = () => latest.current.setValue('');
      const key = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !e.defaultPrevented && isTopFloatingLayer(node)) {
          e.preventDefault();
          e.stopPropagation();
          item.reason.current = 'escape';
          close();
        }
      };
      const pointer = (e: PointerEvent) => {
        if (!inside(e.target) && isTopFloatingLayer(node)) close();
      };
      const focus = (e: FocusEvent) => {
        if (!inside(e.target) && isTopFloatingLayer(node)) close();
      };
      const unregister = registerFloatingLayer({ element: node, kind: 'popover', dismiss: close });
      doc.addEventListener('keydown', key, true);
      doc.addEventListener('pointerdown', pointer, true);
      doc.addEventListener('focusin', focus);
      return () => {
        unregister();
        doc.removeEventListener('keydown', key, true);
        doc.removeEventListener('pointerdown', pointer, true);
        doc.removeEventListener('focusin', focus);
      };
    }, [open, item.content, item.trigger, item.reason]);
    useLayoutEffect(() => {
      const node = item.content.current!;
      return () => {
        const held = node.contains(node.ownerDocument.activeElement);
        if (node.matches(':popover-open')) node.hidePopover();
        if (held)
          queueMicrotask(() => {
            if (
              node.ownerDocument.activeElement === node.ownerDocument.body &&
              canFocus(item.trigger.current)
            )
              item.trigger.current.focus();
          });
      };
    }, []);
    useFloatingPosition(
      open,
      item.trigger,
      item.content,
      { side, align, sideOffset, collisionPadding },
      () => latest.current.setValue(''),
    );
    return (
      <div
        {...props}
        ref={item.content}
        id={item.id}
        popover="manual"
        className={cx('af-navigation-menu__content', className)}
      />
    );
  },
);
export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(function NavigationMenuLink({ onClick, className, ...props }, ref) {
  const nav = useNav();
  return (
    <a
      {...props}
      ref={ref}
      className={cx('af-navigation-menu__link', className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) nav.setValue('');
      }}
    />
  );
});
