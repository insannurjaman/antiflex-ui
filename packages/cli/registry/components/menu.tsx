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
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
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
type Reason = 'escape' | 'select' | 'outside' | 'focus' | 'tab' | 'trigger' | 'hidden';
type Branch = { trigger: RefObject<HTMLElement | null>; close: () => void };
interface MenuState {
  kind: 'dropdown' | 'context' | 'sub';
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  trigger: RefObject<HTMLElement | null>;
  content: RefObject<HTMLDivElement | null>;
  reason: RefObject<Reason | null>;
  entry: RefObject<'first' | 'last'>;
  parent: MenuState | null;
  branches: RefObject<Set<Branch>>;
  point: { x: number; y: number } | undefined;
  setPoint: (point: { x: number; y: number }) => void;
}
const MenuContext = createContext<MenuState | null>(null);
function useMenu() {
  const menu = useContext(MenuContext);
  if (!menu) throw Error('Menu parts require a DropdownMenu or ContextMenu root.');
  return menu;
}
export interface MenuRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}
export function MenuRoot({
  kind,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  id,
}: MenuRootProps & { kind: MenuState['kind'] }) {
  const owner = useContext(MenuContext);
  const parent = kind === 'sub' ? owner : null;
  if (kind === 'sub' && !parent) throw Error('Submenus require a parent menu.');
  const generated = useId();
  const [visible, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const trigger = useRef<HTMLElement>(null),
    content = useRef<HTMLDivElement>(null);
  const reason = useRef<Reason | null>(null),
    entry = useRef<'first' | 'last'>('first');
  const branches = useRef(new Set<Branch>());
  const [point, setPoint] = useState<{ x: number; y: number }>();
  const latest = useRef(setOpen);
  latest.current = setOpen;
  useLayoutEffect(() => {
    if (!parent) return;
    const branch = {
      trigger,
      close: () => {
        reason.current = 'focus';
        latest.current(false);
      },
    };
    parent.branches.current.add(branch);
    return () => {
      parent.branches.current.delete(branch);
    };
  }, [parent?.branches]);
  const parentOpen = parent?.open;
  useLayoutEffect(() => {
    if (parentOpen === false) latest.current(false);
  }, [parentOpen]);
  return (
    <MenuContext.Provider
      value={{
        kind,
        open: visible && (!parent || parent.open),
        setOpen,
        id: id ?? generated,
        trigger,
        content,
        reason,
        entry,
        parent,
        branches,
        point,
        setPoint,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
function requestClose(menu: MenuState, reason: Reason, all = false) {
  if (all && menu.parent) return requestClose(menu.parent, reason, true);
  menu.reason.current = reason;
  menu.setOpen(false);
}
function rootOf(menu: MenuState): MenuState {
  return menu.parent ? rootOf(menu.parent) : menu;
}
function openAt(menu: MenuState, entry: 'first' | 'last' = 'first') {
  menu.entry.current = entry;
  menu.reason.current = null;
  menu.setOpen(true);
  if (menu.open && menu.content.current) focusItem(menu.content.current, entry);
}
const itemSelector = '[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]';
function itemsIn(node: HTMLElement) {
  return [...node.querySelectorAll<HTMLElement>(itemSelector)].filter(
    (item) =>
      item.closest('[role="menu"]') === node &&
      item.getClientRects().length > 0 &&
      getComputedStyle(item).visibility !== 'hidden',
  );
}
function focusItem(node: HTMLElement, entry: 'first' | 'last') {
  const items = itemsIn(node);
  const target = entry === 'last' ? items.at(-1) : items[0];
  if (target) {
    target.tabIndex = 0;
    target.focus({ preventScroll: true });
  }
  if (!items.length) node.focus({ preventScroll: true });
}
export const MenuTrigger = forwardRef<HTMLButtonElement, ButtonProps>(function MenuTrigger(
  { onClick, onKeyDown, variant = 'secondary', ...props },
  ref,
) {
  const menu = useMenu();
  useImperativeHandle(ref, () => menu.trigger.current as HTMLButtonElement);
  return (
    <Button
      {...props}
      id={`${menu.id}-trigger`}
      variant={variant}
      ref={menu.trigger as RefObject<HTMLButtonElement | null>}
      aria-haspopup="menu"
      aria-expanded={menu.open}
      aria-controls={menu.id}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          if (menu.open) requestClose(menu, 'trigger');
          else openAt(menu);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
          event.preventDefault();
          openAt(menu, event.key === 'ArrowUp' ? 'last' : 'first');
        }
      }}
    />
  );
});
export const MenuContextTrigger = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function MenuContextTrigger(
    { onContextMenu, onKeyDown, className, tabIndex = 0, ...props },
    ref,
  ) {
    const menu = useMenu();
    useImperativeHandle(ref, () => menu.trigger.current as HTMLDivElement);
    return (
      <div
        {...props}
        id={`${menu.id}-trigger`}
        tabIndex={tabIndex}
        ref={menu.trigger as RefObject<HTMLDivElement | null>}
        className={cx('af-context-trigger', className)}
        aria-haspopup="menu"
        aria-expanded={menu.open}
        aria-controls={menu.id}
        onContextMenu={(event) => {
          onContextMenu?.(event);
          if (!event.defaultPrevented) {
            event.preventDefault();
            event.stopPropagation();
            menu.setPoint({ x: event.clientX, y: event.clientY });
            openAt(menu);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey))
          ) {
            event.preventDefault();
            event.stopPropagation();
            const rect = event.currentTarget.getBoundingClientRect();
            menu.setPoint({ x: rect.left + 8, y: rect.bottom - 8 });
            openAt(menu);
          }
        }}
      />
    );
  },
);
export interface MenuContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'role' | 'popover'>, FloatingPositionProps {
  size?: 'sm' | 'md' | 'lg';
}
export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  {
    side,
    align = 'start',
    sideOffset,
    collisionPadding = 8,
    size = 'md',
    className,
    children,
    onKeyDown,
    onFocus,
    'aria-label': label,
    'aria-labelledby': labelledBy,
    ...props
  },
  ref,
) {
  const menu = useMenu();
  useImperativeHandle(ref, () => menu.content.current!);
  const latest = useRef(menu);
  latest.current = menu;
  const buffer = useRef(''),
    lastType = useRef(0);
  const [rtl, setRtl] = useState(false);
  useLayoutEffect(() => {
    if (menu.open && menu.trigger.current)
      setRtl(getComputedStyle(menu.trigger.current).direction === 'rtl');
  }, [menu.open, menu.trigger]);
  useLayoutEffect(() => {
    const node = menu.content.current!;
    if (menu.open) {
      if (!node.matches(':popover-open')) {
        node.showPopover();
        menu.reason.current = null;
        buffer.current = '';
        focusItem(node, menu.entry.current);
      }
    } else if (node.matches(':popover-open')) {
      const doc = node.ownerDocument,
        held = node.contains(doc.activeElement);
      node.hidePopover();
      const reason = menu.reason.current;
      if (held && reason !== 'tab' && reason !== 'focus' && reason !== 'hidden')
        queueMicrotask(() => {
          const target = latest.current.trigger.current;
          const active = doc.activeElement;
          if ((active === doc.body || active === node || node.contains(active)) && canFocus(target))
            target.focus({ preventScroll: true });
        });
      menu.reason.current = null;
    }
  }, [menu.open]);
  useLayoutEffect(() => {
    if (!menu.open) return;
    const node = menu.content.current!,
      doc = node.ownerDocument;
    const close = (reason: Reason) => requestClose(latest.current, reason);
    const unregister = registerFloatingLayer({
      element: node,
      kind: 'popover',
      dismiss: () => close('escape'),
    });
    const inside = (target: EventTarget | null) =>
      target instanceof Node && (node.contains(target) || !!menu.trigger.current?.contains(target));
    let down: number | null = null;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented && isTopFloatingLayer(node)) {
        event.preventDefault();
        event.stopPropagation();
        close('escape');
      }
    };
    const pointerDown = (event: PointerEvent) => {
      down = isTopFloatingLayer(node) && !inside(event.target) ? event.pointerId : null;
    };
    const pointerUp = (event: PointerEvent) => {
      if (down === event.pointerId && !inside(event.target) && isTopFloatingLayer(node))
        close('outside');
      down = null;
    };
    const focus = (event: FocusEvent) => {
      if (isTopFloatingLayer(node) && !inside(event.target))
        requestClose(latest.current, 'focus', true);
    };
    // Revealing the invoker can queue a scroll notification before the menu opens.
    const origin = menu.trigger.current?.getBoundingClientRect();
    const scrollX = doc.defaultView?.scrollX,
      scrollY = doc.defaultView?.scrollY;
    const scroll = (event: Event) => {
      if (menu.kind !== 'context' || event.target === node || node.contains(event.target as Node))
        return;
      const current = menu.trigger.current?.getBoundingClientRect();
      if (
        !current ||
        !origin ||
        Math.abs(current.left - origin.left) > 0.5 ||
        Math.abs(current.top - origin.top) > 0.5 ||
        doc.defaultView?.scrollX !== scrollX ||
        doc.defaultView?.scrollY !== scrollY
      )
        close('hidden');
    };
    doc.addEventListener('keydown', key, true);
    doc.addEventListener('pointerdown', pointerDown, true);
    doc.addEventListener('pointerup', pointerUp, true);
    doc.addEventListener('focusin', focus);
    doc.addEventListener('scroll', scroll, true);
    return () => {
      unregister();
      doc.removeEventListener('keydown', key, true);
      doc.removeEventListener('pointerdown', pointerDown, true);
      doc.removeEventListener('pointerup', pointerUp, true);
      doc.removeEventListener('focusin', focus);
      doc.removeEventListener('scroll', scroll, true);
    };
  }, [menu.open, menu.content, menu.trigger]);
  useLayoutEffect(() => {
    const node = menu.content.current!;
    return () => {
      const doc = node.ownerDocument,
        held = node.contains(doc.activeElement);
      if (node.matches(':popover-open')) node.hidePopover();
      if (held)
        queueMicrotask(() => {
          const target = latest.current.trigger.current;
          if (doc.activeElement === doc.body && canFocus(target))
            target.focus({ preventScroll: true });
        });
    };
  }, []);
  useFloatingPosition(
    menu.open,
    menu.trigger,
    menu.content,
    {
      side: side ?? (menu.kind === 'sub' ? (rtl ? 'left' : 'right') : 'bottom'),
      align,
      sideOffset: sideOffset ?? (menu.kind === 'context' ? 0 : 4),
      collisionPadding,
    },
    () => requestClose(latest.current, 'hidden'),
    menu.kind === 'context' ? menu.point : undefined,
  );
  return (
    <div
      {...props}
      id={menu.id}
      ref={menu.content}
      popover="manual"
      role="menu"
      tabIndex={-1}
      aria-orientation="vertical"
      aria-label={label}
      aria-labelledby={labelledBy ?? (label ? undefined : `${menu.id}-trigger`)}
      className={cx('af-menu', `af-menu--${size}`, className)}
      onFocus={(event) => {
        onFocus?.(event);
        if ((event.target as HTMLElement).closest('[role="menu"]') === event.currentTarget) {
          for (const item of itemsIn(event.currentTarget))
            item.tabIndex = item === event.target ? 0 : -1;
        }
        if ((event.target as HTMLElement).closest('[role="menu"]') === event.currentTarget)
          for (const branch of menu.branches.current)
            if (branch.trigger.current !== event.target) branch.close();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          event.defaultPrevented ||
          (event.target as HTMLElement).closest('[role="menu"]') !== event.currentTarget
        )
          return;
        const node = event.currentTarget,
          items = itemsIn(node),
          target = event.target as HTMLElement,
          index = items.indexOf(target);
        if (event.key === 'Tab') {
          event.preventDefault();
          event.stopPropagation();
          const root = rootOf(menu),
            invoker = root.trigger.current;
          const outside = focusableIn(node.ownerDocument.body).filter(
            (item) => !item.closest('[role="menu"]'),
          );
          const origin = invoker ? outside.indexOf(invoker) : -1;
          const next = outside[origin + (event.shiftKey ? -1 : 1)];
          requestClose(menu, 'tab', true);
          if (next) next.focus();
          else invoker?.focus();
          return;
        }
        if (
          menu.parent &&
          event.key === (getComputedStyle(node).direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft')
        ) {
          event.preventDefault();
          event.stopPropagation();
          requestClose(menu, 'escape');
          return;
        }
        let next: number | undefined;
        if (event.key === 'ArrowDown') next = (index + 1) % items.length;
        if (event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = items.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          event.stopPropagation();
          items[next]?.focus();
          buffer.current = '';
          return;
        }
        if (
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey &&
          !event.nativeEvent.isComposing &&
          event.key !== ' '
        ) {
          event.preventDefault();
          const now = Date.now();
          buffer.current =
            (now - lastType.current < 700 ? buffer.current : '') + event.key.toLocaleLowerCase();
          lastType.current = now;
          const repeated = [...buffer.current].every((char) => char === buffer.current[0]);
          const query = repeated ? buffer.current[0] : buffer.current;
          const ordered = [...items.slice(index + 1), ...items.slice(0, index + 1)];
          ordered
            .find((item) =>
              (
                item.dataset.afTextValue ??
                item.getAttribute('aria-label') ??
                item.textContent ??
                ''
              )
                .trim()
                .toLocaleLowerCase()
                .startsWith(query),
            )
            ?.focus();
        }
      }}
    >
      {children}
    </div>
  );
});
export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  onSelect?: (event: Event) => void;
  closeOnSelect?: boolean;
  textValue?: string;
  variant?: 'default' | 'danger';
  inset?: boolean;
}
function Indicator({ radio = false }: { radio?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="af-menu__indicator">
      {radio ? (
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      ) : (
        <path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}
function itemSelection(menu: MenuState, callback: MenuItemProps['onSelect'], close: boolean) {
  const event = new Event('antiflex.menu.select', { cancelable: true });
  callback?.(event);
  if (!event.defaultPrevented && close) requestClose(menu, 'select', true);
  return !event.defaultPrevented;
}
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  {
    onSelect,
    closeOnSelect = true,
    textValue,
    variant = 'default',
    inset = false,
    disabled = false,
    role = 'menuitem',
    onClick,
    onPointerMove,
    className,
    type = 'button',
    ...props
  },
  ref,
) {
  const menu = useMenu();
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      role={role}
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      data-af-text-value={textValue}
      data-inset={inset || undefined}
      className={cx('af-menu__item', variant === 'danger' && 'af-menu__item--danger', className)}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && event.pointerType !== 'touch')
          event.currentTarget.focus({ preventScroll: true });
      }}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
        if (!event.defaultPrevented) itemSelection(menu, onSelect, closeOnSelect);
      }}
    />
  );
});
export interface MenuLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onSelect'> {
  onSelect?: (event: Event) => void;
  disabled?: boolean;
  textValue?: string;
}
export const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>(function MenuLink(
  { onSelect, disabled = false, href, textValue, className, onClick, onPointerMove, ...props },
  ref,
) {
  const menu = useMenu();
  return (
    <a
      {...props}
      ref={ref}
      role="menuitem"
      href={disabled ? undefined : href}
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      data-af-text-value={textValue}
      className={cx('af-menu__item', className)}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && event.pointerType !== 'touch')
          event.currentTarget.focus({ preventScroll: true });
      }}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
        if (!event.defaultPrevented && !itemSelection(menu, onSelect, true)) event.preventDefault();
      }}
    />
  );
});
export interface MenuCheckboxItemProps extends Omit<MenuItemProps, 'role' | 'aria-checked'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export const MenuCheckboxItem = forwardRef<HTMLButtonElement, MenuCheckboxItemProps>(
  function MenuCheckboxItem(
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      onSelect,
      closeOnSelect = false,
      children,
      ...props
    },
    ref,
  ) {
    const [value, setValue] = useControllable(checked, defaultChecked, onCheckedChange);
    return (
      <MenuItem
        {...props}
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={value}
        closeOnSelect={closeOnSelect}
        onSelect={(event) => {
          onSelect?.(event);
          if (!event.defaultPrevented) setValue(!value);
        }}
      >
        <span className="af-menu__check">{value && <Indicator />}</span>
        {children}
      </MenuItem>
    );
  },
);
interface RadioValue {
  value: string;
  setValue: (value: string) => void;
}
const RadioContext = createContext<RadioValue | null>(null);
export interface MenuRadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export const MenuRadioGroup = forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  function MenuRadioGroup({ value, defaultValue = '', onValueChange, ...props }, ref) {
    const [current, setValue] = useControllable(value, defaultValue, onValueChange);
    return (
      <RadioContext.Provider value={{ value: current, setValue }}>
        <div {...props} ref={ref} role="group" />
      </RadioContext.Provider>
    );
  },
);
export interface MenuRadioItemProps extends Omit<MenuItemProps, 'role' | 'aria-checked' | 'value'> {
  value: string;
}
export const MenuRadioItem = forwardRef<HTMLButtonElement, MenuRadioItemProps>(
  function MenuRadioItem({ value, children, onSelect, closeOnSelect = false, ...props }, ref) {
    const group = useContext(RadioContext);
    if (!group) throw Error('RadioItem requires a menu RadioGroup.');
    return (
      <MenuItem
        {...props}
        ref={ref}
        role="menuitemradio"
        aria-checked={group.value === value}
        closeOnSelect={closeOnSelect}
        onSelect={(event) => {
          onSelect?.(event);
          if (!event.defaultPrevented) group.setValue(value);
        }}
      >
        <span className="af-menu__check">{group.value === value && <Indicator radio />}</span>
        {children}
      </MenuItem>
    );
  },
);
export const MenuSubTrigger = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuSubTrigger(
  { children, disabled = false, onKeyDown, onClick, onSelect, ...props },
  ref,
) {
  const menu = useMenu();
  useImperativeHandle(ref, () => menu.trigger.current as HTMLButtonElement);
  return (
    <MenuItem
      {...props}
      ref={menu.trigger as RefObject<HTMLButtonElement | null>}
      id={`${menu.id}-trigger`}
      disabled={disabled}
      aria-haspopup="menu"
      aria-expanded={menu.open}
      aria-controls={menu.id}
      closeOnSelect={false}
      onClick={(event) => {
        onClick?.(event);
      }}
      onSelect={(event) => {
        onSelect?.(event);
        if (!event.defaultPrevented) openAt(menu);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          !event.defaultPrevented &&
          !disabled &&
          event.key ===
            (getComputedStyle(event.currentTarget).direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight')
        ) {
          event.preventDefault();
          event.stopPropagation();
          openAt(menu);
        }
      }}
    >
      {children}
      <svg className="af-menu__chevron" viewBox="0 0 16 16" aria-hidden="true">
        <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </MenuItem>
  );
});
export const MenuGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function MenuGroup(props, ref) {
    return <div {...props} ref={ref} role="group" />;
  },
);
export const MenuLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function MenuLabel({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={cx('af-menu__label', className)} />;
  },
);
export const MenuSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function MenuSeparator({ className, ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cx('af-menu__separator', className)}
      />
    );
  },
);
export const MenuShortcut = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function MenuShortcut({ className, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        aria-hidden="true"
        className={cx('af-menu__shortcut', className)}
      />
    );
  },
);
