'use client';
import {
  useId,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  type Ref,
  type InputHTMLAttributes,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { useControllable } from './interaction-utils';
import { useFieldControl } from './form-utils';
import { isTopFloatingLayer, registerFloatingLayer, useFloatingPosition } from './floating-utils';
import { cx, type Size } from './utils';
export interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
  keywords?: string[];
}
export interface ChoiceCommonProps {
  options: ChoiceOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  size?: Size;
  name?: string;
  form?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  loadingMessage?: string;
  id?: string;
}
export function normalizeSearch(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase();
}
interface Props extends ChoiceCommonProps {
  editable?: boolean;
  inline?: boolean;
  command?: boolean;
  onInputChange?: (value: string) => void;
  controlRef?: Ref<HTMLInputElement | HTMLButtonElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}
function assign<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') return ref(node);
  if (ref) ref.current = node;
}
export function ChoiceControl({
  options,
  value,
  defaultValue = '',
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = 'Choose an option',
  size = 'md',
  name,
  form,
  required: requiredProp,
  disabled = false,
  readOnly = false,
  emptyMessage = 'No options found.',
  loading = false,
  loadingMessage = 'Loading options…',
  id,
  editable = false,
  inline = false,
  command = false,
  onInputChange,
  controlRef,
  inputProps = {},
  buttonProps = {},
}: Props) {
  const nativeProps = editable ? inputProps : buttonProps;
  const field = useFieldControl({ ...nativeProps, id, required: requiredProp });
  const required = field.required ?? false;
  const generated = useId(),
    ownId = field.id ?? generated,
    listId = `${ownId}-list`,
    feedbackId = `${ownId}-validation`;
  const unique = [
    ...new Map(options.filter((o) => o.value && o.label.trim()).map((o) => [o.value, o])).values(),
  ];
  const [selected, setSelected] = useControllable(value, defaultValue, onValueChange),
    [visible, setVisible] = useControllable(open, defaultOpen, onOpenChange);
  const label = unique.find((o) => o.value === selected)?.label ?? '';
  const [query, setQuery] = useState(label),
    [active, setActive] = useState(''),
    [invalid, setInvalid] = useState(false),
    [editing, setEditing] = useState(false);
  const control = useRef<HTMLInputElement | HTMLButtonElement>(null),
    panel = useRef<HTMLDivElement>(null),
    native = useRef<HTMLSelectElement>(null);
  const expanded = (inline || visible) && !disabled && !readOnly;
  const filtered =
    editable && (command || editing)
      ? unique.filter((o) =>
          normalizeSearch([o.label, ...(o.keywords ?? [])].join(' ')).includes(
            normalizeSearch(query),
          ),
        )
      : unique;
  const enabled = loading ? [] : filtered.filter((o) => !o.disabled);
  const activeValue = enabled.some((o) => o.value === active)
    ? active
    : (enabled.find((o) => o.value === selected)?.value ?? enabled[0]?.value ?? '');
  const activeId =
    expanded && activeValue
      ? `${ownId}-option-${unique.findIndex((o) => o.value === activeValue)}`
      : undefined;
  const latest = useRef({
    setVisible,
    setSelected,
    label,
    disabled,
    readOnly,
    selected,
    value,
    defaultValue,
    unique,
  });
  latest.current = {
    setVisible,
    setSelected,
    label,
    disabled,
    readOnly,
    selected,
    value,
    defaultValue,
    unique,
  };
  const setText = (text: string) => {
    setQuery(text);
    onInputChange?.(text);
  };
  const close = (restore = true) => {
    latest.current.setVisible(false);
    if (restore) {
      setQuery(latest.current.label);
      setEditing(false);
    }
  };
  useEffect(() => {
    setQuery(label);
    setEditing(false);
  }, [selected, label]);
  useLayoutEffect(() => {
    const node = panel.current!;
    if (inline) return;
    if (expanded && !node.matches(':popover-open')) node.showPopover();
    if (!expanded && node.matches(':popover-open')) node.hidePopover();
  }, [expanded, inline]);
  useLayoutEffect(() => {
    if (!expanded || inline) return;
    const node = panel.current!,
      doc = node.ownerDocument;
    const inside = (target: EventTarget | null) =>
      target instanceof Node && (node.contains(target) || !!control.current?.contains(target));
    const dismiss = () => {
      latest.current.setVisible(false);
      setQuery(latest.current.label);
      setEditing(false);
    };
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && !e.defaultPrevented && isTopFloatingLayer(node)) {
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      }
    };
    const outside = (e: Event) => {
      if (!inside(e.target) && isTopFloatingLayer(node)) dismiss();
    };
    const unregister = registerFloatingLayer({ element: node, kind: 'popover', dismiss });
    doc.addEventListener('keydown', key, true);
    doc.addEventListener('pointerdown', outside, true);
    doc.addEventListener('focusin', outside);
    return () => {
      unregister();
      doc.removeEventListener('keydown', key, true);
      doc.removeEventListener('pointerdown', outside, true);
      doc.removeEventListener('focusin', outside);
    };
  }, [expanded, inline]);
  useLayoutEffect(() => {
    const node = panel.current!;
    return () => {
      if (!inline && node.matches(':popover-open')) node.hidePopover();
    };
  }, [inline]);
  useFloatingPosition(
    expanded && !inline,
    control,
    panel,
    { side: 'bottom', align: 'start', sideOffset: 4, collisionPadding: 8 },
    () => close(),
  );
  useLayoutEffect(() => {
    if (!expanded || !activeValue) return;
    const option = panel.current?.querySelector<HTMLElement>(`[id="${CSS.escape(activeId!)}"]`);
    const list = panel.current?.querySelector<HTMLElement>('[role="listbox"]');
    if (!option || !list) return;
    // Scroll only the popup, keeping the anchor and the document stationary.
    const row = option.getBoundingClientRect(),
      viewport = list.getBoundingClientRect();
    if (row.top < viewport.top) list.scrollTop -= viewport.top - row.top;
    else if (row.bottom > viewport.bottom) list.scrollTop += row.bottom - viewport.bottom;
  }, [expanded, activeValue, activeId]);
  useEffect(() => {
    const owner = native.current?.form;
    if (!owner) return;
    const reset = (e: Event) =>
      queueMicrotask(() => {
        if (e.defaultPrevented) return;
        const c = latest.current;
        const restored = c.value ?? c.defaultValue;
        if (c.value === undefined) c.setSelected(restored);
        // The browser resets the hidden select before React reconciles its value.
        if (native.current) native.current.value = restored;
        setQuery(c.unique.find((o) => o.value === restored)?.label ?? '');
        setActive(restored);
        setEditing(false);
        setInvalid(false);
        c.setVisible(false);
      });
    owner.addEventListener('reset', reset);
    return () => owner.removeEventListener('reset', reset);
  }, [form, name]);
  // Let the native element keep its reset baseline; mirror the public value after render.
  useLayoutEffect(() => {
    if (native.current)
      native.current.value = unique.some((o) => o.value === selected) ? selected : '';
  });
  const choose = (option: ChoiceOption) => {
    if (option.disabled || disabled || readOnly || loading) return;
    setSelected(option.value);
    setInvalid(false);
    setActive(option.value);
    setText(command ? '' : value === undefined ? option.label : label);
    setEditing(false);
    if (!inline) setVisible(false);
  };
  const buffer = useRef(''),
    last = useRef(0);
  const keyboard = (e: KeyboardEvent<HTMLElement>) => {
    if (e.defaultPrevented || e.nativeEvent.isComposing || disabled || readOnly) return;
    if (e.key === 'Tab') {
      close();
      return;
    }
    if (e.key === 'Escape' && inline) {
      setText('');
      return;
    }
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      if (e.altKey && e.key === 'ArrowUp') {
        close();
        return;
      }
      const i = enabled.findIndex((o) => o.value === activeValue);
      if (!expanded) {
        setVisible(true);
        setActive(
          selected || (e.key === 'ArrowUp' ? enabled.at(-1)?.value : enabled[0]?.value) || '',
        );
      } else if (enabled.length)
        setActive(
          enabled[(i + (e.key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length].value,
        );
      return;
    }
    if (!editable && expanded && ['Home', 'End'].includes(e.key)) {
      e.preventDefault();
      setActive((e.key === 'Home' ? enabled[0] : enabled.at(-1))?.value ?? '');
      return;
    }
    if (e.key === 'Enter' || (!editable && e.key === ' ')) {
      e.preventDefault();
      if (expanded) {
        const o = enabled.find((o) => o.value === activeValue);
        if (o) choose(o);
      } else setVisible(true);
      return;
    }
    if (!editable && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const now = Date.now();
      buffer.current = (now - last.current < 700 ? buffer.current : '') + e.key;
      last.current = now;
      const allSame = [...buffer.current].every(
          (c) => c.toLocaleLowerCase() === buffer.current[0].toLocaleLowerCase(),
        ),
        q = normalizeSearch(allSame ? buffer.current[0] : buffer.current);
      const i = unique.findIndex((o) => o.value === activeValue);
      const ordered = [...unique.slice(i + 1), ...unique.slice(0, i + 1)];
      const o = ordered.find((o) => !o.disabled && normalizeSearch(o.label).startsWith(q));
      if (o) {
        e.preventDefault();
        setActive(o.value);
        setVisible(true);
      }
    }
  };
  const describedBy =
    [field['aria-describedby'], invalid ? feedbackId : null].filter(Boolean).join(' ') || undefined;
  const common = {
    id: ownId,
    role: 'combobox',
    'aria-expanded': expanded,
    'aria-controls': listId,
    'aria-haspopup': 'listbox' as const,
    'aria-activedescendant': activeId,
    'aria-required': required || undefined,
    'aria-invalid': invalid || field['aria-invalid'],
    'aria-describedby': describedBy,
    disabled,
  };
  return (
    <div className={cx('af-selection', inline && 'af-selection--inline')} data-size={size}>
      {editable ? (
        <input
          {...inputProps}
          {...common}
          ref={(node) => {
            control.current = node;
            assign(controlRef, node);
          }}
          type="text"
          readOnly={readOnly}
          value={query}
          autoComplete={inputProps.autoComplete ?? 'off'}
          placeholder={placeholder}
          aria-autocomplete="list"
          className={cx(
            'af-input',
            `af-input--${size}`,
            'af-selection__control',
            inputProps.className,
          )}
          onChange={(e) => {
            setText(e.target.value);
            setEditing(true);
            setActive('');
            setVisible(true);
            if (!e.target.value && !command) setSelected('');
          }}
          onKeyDown={(e) => {
            inputProps.onKeyDown?.(e);
            keyboard(e);
          }}
          onClick={(e) => {
            inputProps.onClick?.(e);
            if (!e.defaultPrevented && !readOnly) setVisible(true);
          }}
          onBlur={(e) => {
            inputProps.onBlur?.(e);
            if (!inline && !panel.current?.contains(e.relatedTarget as Node)) {
              setQuery(label);
              setEditing(false);
              setVisible(false);
            }
          }}
        />
      ) : (
        <button
          {...buttonProps}
          {...common}
          ref={(node) => {
            control.current = node;
            assign(controlRef, node);
          }}
          type={buttonProps.type ?? 'button'}
          aria-readonly={readOnly || undefined}
          className={cx(
            'af-selection__control',
            `af-selection__control--${size}`,
            buttonProps.className,
          )}
          onClick={(e) => {
            buttonProps.onClick?.(e);
            if (!e.defaultPrevented && !readOnly) {
              control.current?.focus({ preventScroll: true });
              setVisible(!visible);
            }
          }}
          onKeyDown={(e) => {
            buttonProps.onKeyDown?.(e);
            keyboard(e);
          }}
        >
          <span data-placeholder={!label || undefined}>{label || placeholder}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      )}
      <div
        ref={panel}
        popover={inline ? undefined : 'manual'}
        className={cx('af-selection__popup', inline && 'af-selection__popup--inline')}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div
          role="listbox"
          id={listId}
          aria-label={nativeProps['aria-label'] ?? 'Available options'}
          aria-labelledby={nativeProps['aria-labelledby']}
          aria-busy={loading || undefined}
        >
          {loading || !filtered.length ? (
            <div
              role="option"
              aria-disabled="true"
              aria-selected="false"
              className="af-selection__empty"
            >
              {loading ? loadingMessage : emptyMessage}
            </div>
          ) : (
            filtered.map((o, i) => (
              <div key={o.value}>
                {o.group && o.group !== filtered[i - 1]?.group && (
                  <div className="af-selection__group">{o.group}</div>
                )}
                <div
                  id={`${ownId}-option-${unique.findIndex((item) => item.value === o.value)}`}
                  role="option"
                  aria-selected={command ? activeValue === o.value : selected === o.value}
                  aria-disabled={o.disabled || undefined}
                  data-active={activeValue === o.value || undefined}
                  className="af-selection__option"
                  onPointerMove={(e) => {
                    if (e.pointerType !== 'touch' && !o.disabled) setActive(o.value);
                  }}
                  onClick={() => choose(o)}
                >
                  <span>
                    <span>{o.label}</span>
                    {o.description && <small>{o.description}</small>}
                  </span>
                  {!command && selected === o.value && (
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {!command && (
        <select
          ref={native}
          className="af-selection__native"
          aria-hidden="true"
          tabIndex={-1}
          name={name}
          form={form}
          disabled={disabled}
          required={required && !readOnly}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (!readOnly) setSelected(e.target.value);
          }}
          onInvalid={(e) => {
            e.preventDefault();
            setInvalid(true);
            control.current?.focus();
          }}
        >
          <option value="">{placeholder}</option>
          {unique.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
      )}
      {invalid && (
        <p id={feedbackId} role="alert" className="af-selection__error">
          Choose an option before continuing.
        </p>
      )}
    </div>
  );
}
