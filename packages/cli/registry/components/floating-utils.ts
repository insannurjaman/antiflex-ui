'use client';
import { useLayoutEffect, useRef, type RefObject } from 'react';
export type FloatingSide = 'top' | 'right' | 'bottom' | 'left';
export type FloatingAlign = 'start' | 'center' | 'end';
export interface FloatingPositionProps {
  side?: FloatingSide;
  align?: FloatingAlign;
  sideOffset?: number;
  collisionPadding?: number;
}
export function focusableIn(root: HTMLElement) {
  return [
    ...root.querySelectorAll<HTMLElement>(
      'button,input,select,textarea,a[href],[tabindex],summary,[contenteditable="true"]',
    ),
  ].filter((node) => node.tabIndex >= 0 && canFocus(node));
}
export function canFocus(node: HTMLElement | null): node is HTMLElement {
  return (
    !!node &&
    node.isConnected &&
    !node.matches(':disabled') &&
    !node.closest('[inert]') &&
    node.getClientRects().length > 0 &&
    getComputedStyle(node).visibility !== 'hidden'
  );
}
interface FloatingLayer {
  element: HTMLElement;
  dismiss: () => void;
  kind: 'popover' | 'tooltip';
}
const layers = new WeakMap<Document, FloatingLayer[]>();
export function registerFloatingLayer(layer: FloatingLayer) {
  const doc = layer.element.ownerDocument;
  const stack = layers.get(doc) ?? [];
  stack.push(layer);
  layers.set(doc, stack);
  return () => {
    const index = stack.indexOf(layer);
    if (index >= 0) stack.splice(index, 1);
    if (!stack.length) layers.delete(doc);
  };
}
export function isTopFloatingLayer(node: HTMLElement) {
  const doc = node.ownerDocument;
  const modal = [...doc.querySelectorAll<HTMLDialogElement>('dialog:modal')].at(-1);
  const stack = (layers.get(doc) ?? []).filter(
    (layer) => layer.element.isConnected && (!modal || modal.contains(layer.element)),
  );
  return stack.at(-1)?.element === node;
}
const opposite: Record<FloatingSide, FloatingSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};
function anchorVisible(
  anchor: HTMLElement,
  bounds: { left: number; top: number; right: number; bottom: number },
) {
  let rect = anchor.getBoundingClientRect();
  let left = Math.max(rect.left, bounds.left),
    right = Math.min(rect.right, bounds.right),
    top = Math.max(rect.top, bounds.top),
    bottom = Math.min(rect.bottom, bounds.bottom);
  for (let parent = anchor.parentElement; parent; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    const box = parent.getBoundingClientRect();
    if (/auto|scroll|hidden|clip/.test(style.overflowX)) {
      left = Math.max(left, box.left);
      right = Math.min(right, box.right);
    }
    if (/auto|scroll|hidden|clip/.test(style.overflowY)) {
      top = Math.max(top, box.top);
      bottom = Math.min(bottom, box.bottom);
    }
    // Native top-layer ancestors escape clipping by their DOM ancestors.
    if (parent.matches(':popover-open, :modal')) break;
  }
  return right > left && bottom > top && getComputedStyle(anchor).visibility !== 'hidden';
}
/** Native top-layer content; collision math stays in layout viewport coordinates. */
export function useFloatingPosition(
  open: boolean,
  anchorRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  { side = 'bottom', align = 'start', sideOffset = 8, collisionPadding = 8 }: FloatingPositionProps,
  onAnchorHidden: () => void,
  anchorPoint?: { x: number; y: number },
) {
  const hiddenCallback = useRef(onAnchorHidden);
  hiddenCallback.current = onAnchorHidden;
  useLayoutEffect(() => {
    const anchor = anchorRef.current,
      node = contentRef.current;
    if (!open || !anchor || !node) return;
    const win = node.ownerDocument.defaultView!;
    let frame = 0;
    let hidden = false;
    const update = () => {
      const vv = win.visualViewport;
      const padding = Math.max(0, Number.isFinite(collisionPadding) ? collisionPadding : 8);
      const offset = Math.max(0, Number.isFinite(sideOffset) ? sideOffset : 8);
      const viewport = {
        left: (vv?.offsetLeft ?? 0) + padding,
        top: (vv?.offsetTop ?? 0) + padding,
        right: (vv?.offsetLeft ?? 0) + (vv?.width ?? win.innerWidth) - padding,
        bottom: (vv?.offsetTop ?? 0) + (vv?.height ?? win.innerHeight) - padding,
      };
      if (!anchorVisible(anchor, viewport)) {
        node.style.visibility = 'hidden';
        if (!hidden) hiddenCallback.current();
        hidden = true;
        return;
      }
      hidden = false;
      node.style.visibility = 'visible';
      node.style.maxWidth =
        'min(var(--af-floating-max-width, 100vw), ' +
        Math.max(0, viewport.right - viewport.left) +
        'px)';
      node.style.maxHeight = Math.max(0, viewport.bottom - viewport.top) + 'px';
      const rect = anchorPoint
        ? {
            left: anchorPoint.x,
            right: anchorPoint.x + 1,
            top: anchorPoint.y,
            bottom: anchorPoint.y + 1,
            width: 1,
            height: 1,
          }
        : anchor.getBoundingClientRect();
      const available: Record<FloatingSide, number> = {
        top: rect.top - viewport.top - offset,
        bottom: viewport.bottom - rect.bottom - offset,
        left: rect.left - viewport.left - offset,
        right: viewport.right - rect.right - offset,
      };
      const candidates = [
        side,
        opposite[side],
        ...(['top', 'bottom', 'right', 'left'] as const).filter(
          (s) => s !== side && s !== opposite[side],
        ),
      ];
      const width = node.offsetWidth,
        height = node.offsetHeight;
      const fits = (s: FloatingSide) =>
        available[s] >= (s === 'top' || s === 'bottom' ? height : width);
      const actual =
        candidates.find(fits) ??
        candidates.reduce((best, next) => (available[next] > available[best] ? next : best));
      if (actual === 'top' || actual === 'bottom')
        node.style.maxHeight = Math.max(0, available[actual]) + 'px';
      else
        node.style.maxWidth =
          'min(var(--af-floating-max-width, 100vw), ' + Math.max(0, available[actual]) + 'px)';
      const w = node.offsetWidth,
        h = node.offsetHeight;
      const rtl = getComputedStyle(anchor).direction === 'rtl';
      let x = rect.left,
        y = rect.bottom + offset;
      if (actual === 'top' || actual === 'bottom') {
        x =
          align === 'center'
            ? rect.left + (rect.width - w) / 2
            : (align === 'start') !== rtl
              ? rect.left
              : rect.right - w;
        y = actual === 'top' ? rect.top - h - offset : rect.bottom + offset;
      } else {
        x = actual === 'left' ? rect.left - w - offset : rect.right + offset;
        y =
          align === 'center'
            ? rect.top + (rect.height - h) / 2
            : align === 'start'
              ? rect.top
              : rect.bottom - h;
      }
      x = Math.max(viewport.left, Math.min(x, viewport.right - w));
      y = Math.max(viewport.top, Math.min(y, viewport.bottom - h));
      node.style.left = x + 'px';
      node.style.top = y + 'px';
      node.dataset.side = actual;
      node.dataset.align = align;
      anchor.dataset.floatingSide = actual;
      anchor.style.setProperty('--af-floating-offset', offset + 'px');
    };
    const schedule = () => {
      win.cancelAnimationFrame(frame);
      frame = win.requestAnimationFrame(update);
    };
    update();
    const observer = new ResizeObserver(schedule);
    observer.observe(anchor);
    observer.observe(node);
    win.addEventListener('resize', schedule);
    win.addEventListener('scroll', schedule, true);
    win.visualViewport?.addEventListener('resize', schedule);
    win.visualViewport?.addEventListener('scroll', schedule);
    return () => {
      observer.disconnect();
      win.cancelAnimationFrame(frame);
      win.removeEventListener('resize', schedule);
      win.removeEventListener('scroll', schedule, true);
      win.visualViewport?.removeEventListener('resize', schedule);
      win.visualViewport?.removeEventListener('scroll', schedule);
      delete anchor.dataset.floatingSide;
      anchor.style.removeProperty('--af-floating-offset');
    };
  }, [
    open,
    anchorRef,
    contentRef,
    side,
    align,
    sideOffset,
    collisionPadding,
    anchorPoint?.x,
    anchorPoint?.y,
  ]);
}
