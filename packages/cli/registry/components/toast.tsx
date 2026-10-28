'use client';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Button } from './button';
import { Spinner } from './spinner';
import { canFocus, focusableIn } from './floating-utils';
import { cx } from './utils';
export type ToastVariant = 'neutral' | 'success' | 'warning' | 'danger';
export type ToastDismissReason = 'dismiss' | 'timeout' | 'action' | 'clear' | 'programmatic';
export interface ToastActionOptions {
  label: string;
  onAction: () => void | false | Promise<void | false>;
  errorMessage?: string;
}
export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Zero persists. Omitted actions/warnings/errors persist; other messages use the provider default. */
  duration?: number;
  priority?: 'polite' | 'assertive';
  action?: ToastActionOptions | null;
  onDismiss?: (reason: ToastDismissReason) => void;
}
export type ToastUpdate = Partial<Omit<ToastOptions, 'id'>>;
export interface ToastApi {
  toast: (options: ToastOptions) => string | null;
  update: (id: string, options: ToastUpdate) => boolean;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
interface Record extends ToastOptions {
  id: string;
  revision: number;
  timeout: number;
}
interface Timer {
  remaining: number;
  started: number;
  handle?: ReturnType<typeof setTimeout>;
  revision: number;
}
interface ToastContextValue extends ToastApi {
  visible: Record[];
  queued: number;
  pending: Set<string>;
  attach: (node: HTMLDivElement | null) => void;
  pause: (reason: string, value: boolean) => void;
  rememberFocus: (node: EventTarget | null) => void;
  close: (id: string, reason: ToastDismissReason) => void;
  runAction: (record: Record) => Promise<void>;
}
const ToastContext = createContext<ToastContextValue | null>(null);
function useToastContext() {
  const value = useContext(ToastContext);
  if (!value) throw Error('ToastViewport and useToast require ToastProvider.');
  return value;
}
export function useToast(): ToastApi {
  const { toast, update, dismiss, dismissAll } = useToastContext();
  return { toast, update, dismiss, dismissAll };
}
const bounded = (value: number, fallback: number, max: number) =>
  Number.isFinite(value) && value > 0 ? Math.max(1, Math.min(max, Math.floor(value))) : fallback;
function message(record: Record) {
  return [
    record.title,
    record.description,
    record.action ? `Action available: ${record.action.label}.` : '',
  ]
    .filter(Boolean)
    .join(' ');
}
export interface ToastProviderProps {
  children: ReactNode;
  defaultDuration?: number;
  maxVisible?: number;
  maxToasts?: number;
  initialToasts?: ToastOptions[];
}
export function ToastProvider({
  children,
  defaultDuration = 6000,
  maxVisible = 3,
  maxToasts = 50,
  initialToasts = [],
}: ToastProviderProps) {
  const prefix = useId(),
    sequence = useRef(0),
    revision = useRef(initialToasts.length);
  const limit = bounded(maxVisible, 3, 5),
    capacity = Math.max(limit, bounded(maxToasts, 50, 100));
  const normalize = useCallback(
    (options: ToastOptions, id: string, revision: number): Record | null => {
      if (
        typeof options.title !== 'string' ||
        !options.title.trim() ||
        (options.action != null && !options.action.label.trim()) ||
        (options.duration !== undefined &&
          (!Number.isFinite(options.duration) || options.duration < 0))
      )
        return null;
      const duration =
        options.duration ??
        (options.action || options.variant === 'warning' || options.variant === 'danger'
          ? 0
          : defaultDuration);
      return {
        ...options,
        id,
        revision,
        timeout: Number.isFinite(duration) && duration > 0 ? Math.min(duration, 2147483647) : 0,
      };
    },
    [defaultDuration],
  );
  const [records, setRecords] = useState<Record[]>(() => {
    const initial = new Map<string, Record>();
    initialToasts.slice(0, capacity).forEach((options, index) => {
      const record = normalize(options, options.id ?? `${prefix}-${index + 1}`, index + 1);
      if (record) initial.set(record.id, record);
    });
    return [...initial.values()];
  });
  const current = useRef(records);
  current.current = records;
  const viewport = useRef<HTMLDivElement>(null),
    origin = useRef<HTMLElement>(null);
  const focusAfterCommit = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    // Async actions may finish outside a discrete event. Wait until React removes
    // the row before choosing a remaining control, otherwise focus lands back in it.
    const restore = focusAfterCommit.current;
    focusAfterCommit.current = null;
    restore?.();
  }, [records]);
  const mounted = useRef(true),
    timers = useRef(new Map<string, Timer>()),
    paused = useRef(new Set<string>());
  const [pauseVersion, setPauseVersion] = useState(0),
    [viewportVersion, setViewportVersion] = useState(0),
    [pending, setPending] = useState(new Set<string>());
  const busy = useRef(new Set<string>());
  const commit = useCallback((next: Record[]) => {
    if (mounted.current) {
      current.current = next;
      setRecords(next);
    }
  }, []);
  const attach = useCallback((node: HTMLDivElement | null) => {
    if (node && viewport.current && viewport.current !== node)
      throw Error('Use one ToastViewport per ToastProvider.');
    viewport.current = node;
    setViewportVersion((n) => n + 1);
  }, []);
  const pause = useCallback((reason: string, value: boolean) => {
    const changed = value ? !paused.current.has(reason) : paused.current.has(reason);
    if (value) paused.current.add(reason);
    else paused.current.delete(reason);
    if (changed && mounted.current) setPauseVersion((n) => n + 1);
  }, []);
  const rememberFocus = useCallback((target: EventTarget | null) => {
    if (
      target instanceof HTMLElement &&
      target !== target.ownerDocument.body &&
      !viewport.current?.contains(target)
    )
      origin.current = target;
  }, []);
  const close = useCallback(
    (id: string, reason: ToastDismissReason) => {
      if (!mounted.current) return;
      const record = current.current.find((item) => item.id === id);
      if (!record) return;
      const node = viewport.current,
        doc = node?.ownerDocument;
      const removed = node
        ? [...node.querySelectorAll<HTMLElement>('[data-af-toast-id]')].find(
            (item) => item.dataset.afToastId === id,
          )
        : undefined;
      const held = !!removed?.contains(doc?.activeElement ?? null);
      if (held && doc)
        focusAfterCommit.current = () => {
          if (doc.activeElement !== doc.body && !removed?.contains(doc.activeElement)) return;
          const target = (node ? focusableIn(node)[0] : null) ?? origin.current;
          if (canFocus(target)) target.focus({ preventScroll: true });
        };
      commit(current.current.filter((item) => item.id !== id));
      record.onDismiss?.(reason);
    },
    [commit],
  );
  const toast = useCallback(
    (options: ToastOptions) => {
      if (!mounted.current) return null;
      const existing = options.id
        ? current.current.find((item) => item.id === options.id)
        : undefined;
      if (!existing && current.current.length >= capacity) return null;
      // Generated IDs are independent of initial user-supplied IDs and never reused.
      let id = options.id;
      if (!id) {
        do {
          id = `${prefix}-new-${++sequence.current}`;
        } while (current.current.some((item) => item.id === id));
      }
      const record = normalize(options, id, ++revision.current);
      if (!record) return null;
      rememberFocus(
        viewport.current?.ownerDocument.activeElement ??
          (typeof document === 'undefined' ? null : document.activeElement),
      );
      commit(
        existing
          ? current.current.map((item) => (item.id === id ? record : item))
          : [...current.current, record],
      );
      return id;
    },
    [capacity, normalize, prefix, rememberFocus, commit],
  );
  const update = useCallback(
    (id: string, patch: ToastUpdate) => {
      if (!mounted.current) return false;
      const previous = current.current.find((item) => item.id === id);
      if (!previous) return false;
      const next = normalize({ ...previous, ...patch }, id, ++revision.current);
      if (!next) return false;
      commit(current.current.map((item) => (item.id === id ? next : item)));
      return true;
    },
    [commit, normalize],
  );
  const dismiss = useCallback((id: string) => close(id, 'programmatic'), [close]);
  const dismissAll = useCallback(() => {
    if (!mounted.current) return;
    const all = [...current.current],
      node = viewport.current,
      doc = node?.ownerDocument,
      held = !!node?.contains(doc?.activeElement ?? null);
    if (held && doc)
      focusAfterCommit.current = () => {
        if (doc.activeElement === doc.body && canFocus(origin.current))
          origin.current.focus({ preventScroll: true });
      };
    commit([]);
    for (const record of all) record.onDismiss?.('clear');
  }, [commit]);
  const runAction = useCallback(
    async (record: Record) => {
      if (!record.action || busy.current.has(record.id)) return;
      busy.current.add(record.id);
      setPending(new Set(busy.current));
      try {
        const result = await record.action.onAction();
        if (
          mounted.current &&
          current.current.find((item) => item.id === record.id)?.revision === record.revision &&
          result !== false
        )
          close(record.id, 'action');
      } catch {
        if (
          mounted.current &&
          current.current.find((item) => item.id === record.id)?.revision === record.revision
        )
          update(record.id, {
            variant: 'danger',
            description: record.action.errorMessage ?? 'Action failed. Try again.',
            duration: 0,
          });
      } finally {
        busy.current.delete(record.id);
        if (mounted.current) setPending(new Set(busy.current));
      }
    },
    [close, update],
  );
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      for (const timer of timers.current.values()) clearTimeout(timer.handle);
    };
  }, []);
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const doc = node.ownerDocument,
      win = doc.defaultView!;
    const visibility = () => pause('hidden', doc.hidden),
      blur = () => pause('window', true),
      focus = () => pause('window', false);
    visibility();
    doc.addEventListener('visibilitychange', visibility);
    win.addEventListener('blur', blur);
    win.addEventListener('focus', focus);
    return () => {
      doc.removeEventListener('visibilitychange', visibility);
      win.removeEventListener('blur', blur);
      win.removeEventListener('focus', focus);
    };
  }, [viewportVersion, pause]);
  useEffect(() => {
    const visible = records.slice(0, limit),
      now = performance.now();
    for (const [id, timer] of timers.current) {
      clearTimeout(timer.handle);
      if (timer.handle !== undefined)
        timer.remaining = Math.max(0, timer.remaining - (now - timer.started));
      timer.handle = undefined;
      if (!visible.some((item) => item.id === id)) timers.current.delete(id);
    }
    for (const record of visible) {
      if (!record.timeout) {
        timers.current.delete(record.id);
        continue;
      }
      let timer = timers.current.get(record.id);
      if (!timer || timer.revision !== record.revision) {
        timer = { remaining: record.timeout, started: now, revision: record.revision };
        timers.current.set(record.id, timer);
      }
      if (viewport.current && !paused.current.size && !pending.has(record.id)) {
        timer.started = now;
        timer.handle = setTimeout(() => close(record.id, 'timeout'), timer.remaining);
      }
    }
    return () => {
      const stopped = performance.now();
      for (const timer of timers.current.values()) {
        clearTimeout(timer.handle);
        if (timer.handle !== undefined)
          timer.remaining = Math.max(0, timer.remaining - (stopped - timer.started));
        timer.handle = undefined;
      }
    };
  }, [records, limit, pauseVersion, pending, viewportVersion, close]);
  const [polite, setPolite] = useState(''),
    [assertive, setAssertive] = useState('');
  const announced = useRef(new Map<string, number>());
  useEffect(() => {
    for (const id of announced.current.keys())
      if (!records.some((item) => item.id === id)) announced.current.delete(id);
    const fresh = records
      .slice(0, limit)
      .filter((item) => announced.current.get(item.id) !== item.revision);
    if (!fresh.length || !viewport.current) return;
    const ordinary = fresh.filter((item) => item.priority !== 'assertive'),
      urgent = fresh.filter((item) => item.priority === 'assertive');
    if (ordinary.length) setPolite('');
    if (urgent.length) setAssertive('');
    const handle = setTimeout(() => {
      for (const record of fresh) announced.current.set(record.id, record.revision);
      for (const id of announced.current.keys())
        if (!current.current.some((item) => item.id === id)) announced.current.delete(id);
      if (ordinary.length) setPolite(ordinary.map(message).join(' '));
      if (urgent.length) setAssertive(urgent.map(message).join(' '));
    }, 60);
    return () => clearTimeout(handle);
  }, [records, limit, viewportVersion]);
  return (
    <ToastContext.Provider
      value={{
        toast,
        update,
        dismiss,
        dismissAll,
        visible: records.slice(0, limit),
        queued: Math.max(0, records.length - limit),
        pending,
        attach,
        pause,
        rememberFocus,
        close,
        runAction,
      }}
    >
      {children}
      <div
        className="af-sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-af-toast-announcer="polite"
      >
        {polite}
      </div>
      <div
        className="af-sr-only"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-af-toast-announcer="assertive"
      >
        {assertive}
      </div>
    </ToastContext.Provider>
  );
}
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    title,
    description,
    variant = 'neutral',
    action,
    onDismiss,
    dismissLabel = 'Dismiss notification',
    className,
    id,
    ...props
  },
  ref,
) {
  const generated = useId(),
    ownId = id ?? generated;
  return (
    <div
      {...props}
      id={ownId}
      ref={ref}
      role="group"
      aria-labelledby={`${ownId}-title`}
      aria-describedby={description ? `${ownId}-description` : undefined}
      className={cx('af-toast', `af-toast--${variant}`, className)}
    >
      <svg
        className="af-toast__icon"
        viewBox="0 0 20 20"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {variant === 'success' ? (
          <>
            <circle cx="10" cy="10" r="7.25" />
            <path d="m6.5 10 2.5 2.5 4.5-5" />
          </>
        ) : variant === 'warning' ? (
          <>
            <path d="m10 2 8 15H2Z" />
            <path d="M10 7v4m0 2v1" />
          </>
        ) : variant === 'danger' ? (
          <>
            <circle cx="10" cy="10" r="7.25" />
            <path d="m7.5 7.5 5 5m0-5-5 5" />
          </>
        ) : (
          <>
            <circle cx="10" cy="10" r="7.25" />
            <path d="M10 9v5m0-9v1" />
          </>
        )}
      </svg>
      <div className="af-toast__body">
        <div className="af-toast__title" id={`${ownId}-title`}>
          {title}
        </div>
        {description && (
          <div className="af-toast__description" id={`${ownId}-description`}>
            {description}
          </div>
        )}
        {action && <div className="af-toast__action">{action}</div>}
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          aria-label={dismissLabel}
          className="af-toast__close"
          onClick={onDismiss}
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m4 4 8 8m0-8-8 8" />
          </svg>
        </Button>
      )}
    </div>
  );
});
export interface ToastViewportProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'role' | 'popover' | 'aria-live'
> {
  position?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  layout?: 'fixed' | 'inline';
  label?: string;
}
export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(function ToastViewport(
  {
    position = 'bottom-end',
    layout = 'fixed',
    label = 'Notifications',
    className,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    onKeyDown,
    ...props
  },
  ref,
) {
  const ctx = useToastContext(),
    nodeRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => nodeRef.current!);
  useLayoutEffect(() => {
    ctx.attach(nodeRef.current);
    return () => ctx.attach(null);
  }, [ctx.attach]);
  const count = ctx.visible.length;
  useLayoutEffect(() => {
    const node = nodeRef.current!;
    if (!count) {
      ctx.pause('pointer', false);
      ctx.pause('focus', false);
    }
    if (layout === 'fixed' && count > 0) {
      if (!node.matches(':popover-open')) node.showPopover();
    } else if (node.matches(':popover-open')) node.hidePopover();
  }, [layout, count]);
  useLayoutEffect(
    () => () => {
      const node = nodeRef.current;
      if (node?.matches(':popover-open')) node.hidePopover();
    },
    [],
  );
  return (
    <div
      {...props}
      ref={nodeRef}
      popover={layout === 'fixed' ? 'manual' : undefined}
      role="region"
      aria-label={label}
      tabIndex={-1}
      data-position={position}
      data-empty={!count || undefined}
      className={cx(
        'af-toast-viewport',
        layout === 'inline' && 'af-toast-viewport--inline',
        className,
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (event.pointerType !== 'touch') ctx.pause('pointer', true);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        ctx.pause('pointer', false);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        ctx.rememberFocus(event.relatedTarget);
        ctx.pause('focus', true);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          ctx.pause('focus', false);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.key !== 'Escape') return;
        const target = (event.target as HTMLElement).closest<HTMLElement>('[data-af-toast-id]');
        const id = target?.dataset.afToastId ?? ctx.visible.at(-1)?.id;
        if (id) {
          event.preventDefault();
          event.stopPropagation();
          ctx.close(id, 'dismiss');
        }
      }}
    >
      {ctx.visible.map((record) => (
        <Toast
          key={record.id}
          data-af-toast-id={record.id}
          title={record.title}
          description={record.description}
          variant={record.variant}
          dismissLabel={`Dismiss ${record.title}`}
          onDismiss={() => ctx.close(record.id, 'dismiss')}
          action={
            record.action ? (
              <button
                type="button"
                className="af-button af-button--secondary af-button--sm af-toast__action-button"
                // Keep focus through async work; runAction guards repeated activation.
                aria-disabled={ctx.pending.has(record.id) || undefined}
                aria-busy={ctx.pending.has(record.id) || undefined}
                onClick={() => void ctx.runAction(record)}
              >
                {ctx.pending.has(record.id) && <Spinner />}
                {record.action.label}
              </button>
            ) : undefined
          }
        />
      ))}
      {ctx.queued > 0 && (
        <div className="af-toast-viewport__queue">
          {ctx.queued} more {ctx.queued === 1 ? 'notification' : 'notifications'} waiting
        </div>
      )}
    </div>
  );
});
