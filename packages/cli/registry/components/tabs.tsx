'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  useRef,
  useImperativeHandle,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import {
  collectionItems,
  moveCollectionFocus,
  useControllable,
  useRenderedCollection,
} from './interaction-utils';
import { cx } from './utils';
interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  tabStop?: string;
  setFocused: (value: string | undefined) => void;
  id: string;
  orientation: 'horizontal' | 'vertical';
  activationMode: 'automatic' | 'manual';
}
const TabsContext = createContext<TabsContextValue | null>(null);
function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw Error('Tabs parts must be inside Tabs.');
  return ctx;
}
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
}
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function TabsRoot(
  {
    value,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    activationMode = 'automatic',
    id,
    children,
    className,
    ...props
  },
  ref,
) {
  const generated = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => rootRef.current!);
  const items = useRenderedCollection(
    rootRef,
    '[role="tab"][data-af-value]',
    '[data-af-tabs]',
    collectionItems(children, TabsTrigger, Tabs).filter((item) => !item.disabled),
  );
  const [state, setValue] = useControllable(
    value,
    defaultValue ?? items[0]?.value ?? '',
    onValueChange,
  );
  const selected =
    state || (value === undefined && defaultValue === undefined ? (items[0]?.value ?? '') : '');
  const [focused, setFocused] = useState<string>();
  const candidate = focused ?? selected;
  const tabStop = items.some((item) => item.value === candidate) ? candidate : items[0]?.value;
  return (
    <TabsContext.Provider
      value={{
        value: selected,
        setValue,
        tabStop,
        setFocused,
        id: id ?? generated,
        orientation,
        activationMode,
      }}
    >
      <div
        {...props}
        id={id}
        ref={rootRef}
        data-af-tabs=""
        data-orientation={orientation}
        className={cx('af-tabs', className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});
export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function TabsList({ className, onKeyDown, onBlur, ...props }, ref) {
    const ctx = useTabs();
    return (
      <div
        {...props}
        ref={ref}
        role="tablist"
        aria-orientation={ctx.orientation}
        className={cx('af-tabs__list', className)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented)
            moveCollectionFocus(event, '[role="tab"]', '[role="tablist"]', ctx.orientation);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.currentTarget.contains(event.relatedTarget)) ctx.setFocused(undefined);
        }}
      />
    );
  },
);
export interface TabsTriggerProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'id'
> {
  value: string;
}
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, type = 'button', className, disabled, onClick, onFocus, ...props },
  ref,
) {
  const ctx = useTabs();
  const key = encodeURIComponent(value);
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      id={`${ctx.id}-tab-${key}`}
      role="tab"
      data-af-value={value}
      aria-selected={ctx.value === value}
      aria-controls={`${ctx.id}-panel-${key}`}
      tabIndex={!disabled && ctx.tabStop === value ? 0 : -1}
      className={cx('af-tabs__trigger', className)}
      onFocus={(event) => {
        onFocus?.(event);
        if (!event.defaultPrevented) {
          ctx.setFocused(value);
          if (ctx.activationMode === 'automatic') ctx.setValue(value);
        }
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) ctx.setValue(value);
      }}
    />
  );
});
export interface TabsContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  value: string;
}
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, className, tabIndex = 0, ...props },
  ref,
) {
  const ctx = useTabs();
  const key = encodeURIComponent(value);
  return (
    <div
      {...props}
      ref={ref}
      id={`${ctx.id}-panel-${key}`}
      role="tabpanel"
      aria-labelledby={`${ctx.id}-tab-${key}`}
      hidden={ctx.value !== value}
      tabIndex={tabIndex}
      className={cx('af-tabs__content', className)}
    />
  );
});
