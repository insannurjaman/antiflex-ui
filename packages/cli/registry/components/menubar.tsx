'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  type MenuContentProps,
  type MenuRootProps,
} from './menu';
import { type ButtonProps } from './button';
import { useControllable } from './interaction-utils';
import { cx } from './utils';
interface State {
  root: RefObject<HTMLDivElement | null>;
  value: string;
  setValue: (v: string) => void;
  active: string;
  setActive: (v: string) => void;
  move: (from: string, step: number, open: boolean) => void;
}
const Context = createContext<State | null>(null),
  ItemContext = createContext('');
const SubContext = createContext(false);
function useBar() {
  const c = useContext(Context);
  if (!c) throw Error('Menubar parts require Menubar.');
  return c;
}
const triggers = (node: HTMLElement | null) =>
  node
    ? [...node.querySelectorAll<HTMLButtonElement>('[data-af-menubar-trigger]')].filter(
        (n) =>
          n.closest('[role="menubar"]') === node &&
          !n.matches(':disabled') &&
          n.getClientRects().length > 0,
      )
    : [];
export interface MenubarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(function Menubar(
  { value, defaultValue = '', onValueChange, className, onKeyDown, children, ...props },
  ref,
) {
  const [current, setValue] = useControllable(value, defaultValue, onValueChange),
    [active, setActive] = useState(''),
    root = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => root.current!);
  const latest = useRef(active);
  latest.current = active;
  useLayoutEffect(() => {
    const node = root.current!;
    const sync = () => {
      const list = triggers(node);
      if (!list.some((n) => n.dataset.afMenubarTrigger === latest.current))
        setActive(list[0]?.dataset.afMenubarTrigger ?? '');
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(node, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
    });
    return () => observer.disconnect();
  }, []);
  const move = (from: string, step: number, open: boolean) => {
    const list = triggers(root.current),
      index = list.findIndex((n) => n.dataset.afMenubarTrigger === from),
      next = list[(index + step + list.length) % list.length];
    if (!next) return;
    const key = next.dataset.afMenubarTrigger!;
    setActive(key);
    next.focus();
    if (open) setValue(key);
  };
  const type = useRef(''),
    time = useRef(0);
  return (
    <Context.Provider value={{ root, value: current, setValue, active, setActive, move }}>
      <div
        {...props}
        ref={root}
        role="menubar"
        aria-orientation="horizontal"
        className={cx('af-menubar', className)}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          const target = e.target as HTMLElement;
          if (e.defaultPrevented || !target.matches('[data-af-menubar-trigger]')) return;
          const own = target.dataset.afMenubarTrigger!,
            list = triggers(root.current),
            rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
            e.preventDefault();
            let step = e.key === 'ArrowRight' ? (rtl ? -1 : 1) : rtl ? 1 : -1;
            if (e.key === 'Home') step = -list.indexOf(target as HTMLButtonElement);
            if (e.key === 'End') step = list.length - 1 - list.indexOf(target as HTMLButtonElement);
            move(own, step, !!current);
          } else if (
            e.key.length === 1 &&
            e.key !== ' ' &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.altKey &&
            !e.nativeEvent.isComposing
          ) {
            const now = Date.now();
            type.current =
              (now - time.current < 700 ? type.current : '') + e.key.toLocaleLowerCase();
            time.current = now;
            const q = [...type.current].every((c) => c === type.current[0])
              ? type.current[0]
              : type.current;
            const start = list.indexOf(target as HTMLButtonElement);
            const next = [...list.slice(start + 1), ...list.slice(0, start + 1)].find((n) =>
              n.textContent?.trim().toLocaleLowerCase().startsWith(q),
            );
            if (next) {
              e.preventDefault();
              next.focus();
              setActive(next.dataset.afMenubarTrigger!);
            }
          }
        }}
      >
        {children}
      </div>
    </Context.Provider>
  );
});
export interface MenubarMenuProps {
  value: string;
  children: ReactNode;
}
export function MenubarMenu({ value, children }: MenubarMenuProps) {
  const c = useBar();
  return (
    <ItemContext.Provider value={value}>
      <MenuRoot
        kind="dropdown"
        open={c.value === value}
        onOpenChange={(open) => c.setValue(open ? value : '')}
      >
        <div role="presentation">{children}</div>
      </MenuRoot>
    </ItemContext.Provider>
  );
}
export const MenubarTrigger = forwardRef<HTMLButtonElement, ButtonProps>(function MenubarTrigger(
  { className, onFocus, onPointerEnter, variant = 'ghost', ...props },
  ref,
) {
  const c = useBar(),
    value = useContext(ItemContext);
  return (
    <MenuTrigger
      {...props}
      ref={ref}
      variant={variant}
      role="menuitem"
      data-af-menubar-trigger={value}
      tabIndex={c.active === value ? 0 : -1}
      className={cx('af-menubar__trigger', className)}
      onFocus={(e) => {
        onFocus?.(e);
        c.setActive(value);
      }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (
          !e.defaultPrevented &&
          e.pointerType !== 'touch' &&
          c.value &&
          c.value !== value &&
          !e.currentTarget.disabled
        ) {
          c.setActive(value);
          e.currentTarget.focus();
          c.setValue(value);
        }
      }}
    />
  );
});
export const MenubarContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenubarContent(
  { onKeyDown, ...props },
  ref,
) {
  const c = useBar(),
    value = useContext(ItemContext),
    sub = useContext(SubContext);
  return (
    <MenuContent
      {...props}
      ref={ref}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (
          sub ||
          e.defaultPrevented ||
          (e.target as HTMLElement).closest('[role="menu"]') !== e.currentTarget
        )
          return;
        const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          e.stopPropagation();
          c.move(value, e.key === 'ArrowRight' ? (rtl ? -1 : 1) : rtl ? 1 : -1, true);
        }
      }}
    />
  );
});
export function MenubarSub(props: MenuRootProps) {
  return (
    <SubContext.Provider value={true}>
      <MenuRoot {...props} kind="sub" />
    </SubContext.Provider>
  );
}
export {
  MenuItem as MenubarItem,
  MenuLink as MenubarLink,
  MenuCheckboxItem as MenubarCheckboxItem,
  MenuRadioGroup as MenubarRadioGroup,
  MenuRadioItem as MenubarRadioItem,
  MenuSubTrigger as MenubarSubTrigger,
  MenuGroup as MenubarGroup,
  MenuLabel as MenubarLabel,
  MenuSeparator as MenubarSeparator,
  MenuShortcut as MenubarShortcut,
} from './menu';
export type {
  MenuItemProps as MenubarItemProps,
  MenuLinkProps as MenubarLinkProps,
  MenuCheckboxItemProps as MenubarCheckboxItemProps,
  MenuRadioGroupProps as MenubarRadioGroupProps,
  MenuRadioItemProps as MenubarRadioItemProps,
  MenuContentProps as MenubarContentProps,
} from './menu';
