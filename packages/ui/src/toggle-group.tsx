'use client';
import {
  createContext,
  forwardRef,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
  type HTMLAttributes,
} from 'react';
import { Toggle, type ToggleProps } from './toggle';
import {
  collectionItems,
  moveCollectionFocus,
  useControllable,
  useRenderedCollection,
} from './interaction-utils';
import { cx, type Size } from './utils';
interface ToggleGroupContextValue {
  values: string[];
  change: (value: string, pressed: boolean) => void;
  tabStop?: string;
  setFocused: (value: string | undefined) => void;
  disabled?: boolean;
  size: Size;
  variant: 'default' | 'outline';
}
const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);
export interface ToggleGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  type?: 'single' | 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  loop?: boolean;
  size?: Size;
  variant?: 'default' | 'outline';
}
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroupRoot(
  {
    type = 'single',
    value,
    defaultValue = [],
    onValueChange,
    orientation = 'horizontal',
    disabled,
    loop = true,
    size = 'md',
    variant = 'outline',
    children,
    className,
    onKeyDown,
    onBlur,
    ...props
  },
  ref,
) {
  const [state, setState] = useControllable(value, defaultValue, onValueChange);
  const values = type === 'single' ? state.slice(0, 1) : state;
  const [focused, setFocused] = useState<string>();
  const rootRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => rootRef.current!);
  const items = useRenderedCollection(
    rootRef,
    '[data-af-toggle-item][data-af-value]',
    '[data-af-toggle-group]',
    collectionItems(children, ToggleGroupItem, ToggleGroup).filter((item) => !item.disabled),
  );
  const candidate = focused ?? values[0];
  const tabStop = items.some((item) => item.value === candidate) ? candidate : items[0]?.value;
  const change = (item: string, pressed: boolean) =>
    setState(
      type === 'single'
        ? pressed
          ? [item]
          : []
        : pressed
          ? [...new Set([...values, item])]
          : values.filter((v) => v !== item),
    );
  return (
    <ToggleGroupContext.Provider
      value={{ values, change, tabStop, setFocused, disabled, size, variant }}
    >
      <div
        {...props}
        ref={rootRef}
        role="group"
        data-af-toggle-group=""
        data-orientation={orientation}
        aria-disabled={disabled || undefined}
        className={cx('af-toggle-group', className)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented)
            moveCollectionFocus(
              event,
              '[data-af-toggle-item]',
              '[data-af-toggle-group]',
              orientation,
              loop,
            );
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(undefined);
        }}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
});
export interface ToggleGroupItemProps extends Omit<
  ToggleProps,
  'value' | 'pressed' | 'defaultPressed' | 'onPressedChange'
> {
  value: string;
}
export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  function ToggleGroupItem({ value, disabled, size, variant, onFocus, ...props }, ref) {
    const ctx = useContext(ToggleGroupContext);
    if (!ctx) throw Error('ToggleGroupItem must be inside ToggleGroup.');
    return (
      <Toggle
        {...props}
        ref={ref}
        value={value}
        data-af-toggle-item=""
        data-af-value={value}
        size={size ?? ctx.size}
        variant={variant ?? ctx.variant}
        disabled={ctx.disabled || disabled}
        pressed={ctx.values.includes(value)}
        tabIndex={!ctx.disabled && !disabled && ctx.tabStop === value ? 0 : -1}
        onPressedChange={(pressed) => ctx.change(value, pressed)}
        onFocus={(event) => {
          onFocus?.(event);
          if (!event.defaultPrevented) ctx.setFocused(value);
        }}
      />
    );
  },
);
