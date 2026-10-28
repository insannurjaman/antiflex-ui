'use client';
import {
  Children,
  isValidElement,
  useState,
  useLayoutEffect,
  type RefObject,
  type ReactNode,
  type ElementType,
  type KeyboardEvent,
} from 'react';

export function collectionItems(
  children: ReactNode,
  itemType: ElementType,
  ownerType: ElementType,
): { value: string; disabled?: boolean }[] {
  const result: { value: string; disabled?: boolean }[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement<{ value: string; disabled?: boolean; children?: ReactNode }>(child)) return;
    if (child.type === itemType)
      result.push({ value: child.props.value, disabled: child.props.disabled });
    else if (child.type !== ownerType)
      result.push(...collectionItems(child.props.children, itemType, ownerType));
  });
  return result;
}

/** Read rendered descendants too: custom React wrappers are opaque during SSR. */
export function useRenderedCollection(
  rootRef: RefObject<HTMLElement | null>,
  selector: string,
  owner: string,
  initial: { value: string; disabled?: boolean }[],
) {
  const [items, setItems] = useState(initial);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const read = () => {
      const next = [...root.querySelectorAll<HTMLButtonElement>(selector)]
        .filter((node) => node.closest(owner) === root && !node.disabled)
        .map((node) => ({ value: node.dataset.afValue ?? '' }));
      setItems((previous) =>
        previous.length === next.length &&
        previous.every((item, index) => item.value === next[index]?.value)
          ? previous
          : next,
      );
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['disabled', 'data-af-value'],
    });
    return () => observer.disconnect();
  }, [rootRef, selector, owner]);
  return items;
}

/** Controlled values remain consumer-owned; defaults initialize only once. */
export function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value === undefined ? internal : value;
  const update = (next: T) => {
    if (Object.is(current, next)) return;
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };
  return [current, update] as const;
}

/** Scope keyboard collections so nested widgets never join their parent's focus order. */
export function moveCollectionFocus(
  event: KeyboardEvent<HTMLElement>,
  selector: string,
  owner: string,
  orientation: 'horizontal' | 'vertical',
  loop = true,
) {
  const root = event.currentTarget;
  const target = event.target as HTMLElement;
  if (target.closest(owner) !== root || !target.matches(selector)) return;
  const items = [...root.querySelectorAll<HTMLElement>(selector)].filter(
    (item) => item.closest(owner) === root && !item.matches(':disabled'),
  );
  if (!items.length) return;
  const rtl = getComputedStyle(root).direction === 'rtl';
  let delta = 0;
  if (orientation === 'horizontal') {
    if (event.key === 'ArrowRight') delta = rtl ? -1 : 1;
    if (event.key === 'ArrowLeft') delta = rtl ? 1 : -1;
  } else {
    if (event.key === 'ArrowDown') delta = 1;
    if (event.key === 'ArrowUp') delta = -1;
  }
  let index = items.indexOf(target);
  if (event.key === 'Home') index = 0;
  else if (event.key === 'End') index = items.length - 1;
  else if (delta)
    index = loop
      ? (index + delta + items.length) % items.length
      : Math.max(0, Math.min(items.length - 1, index + delta));
  else return;
  event.preventDefault();
  items[index]?.focus();
}
