'use client';
import { forwardRef, useId, useImperativeHandle, useEffect, useRef, useState } from 'react';
import { type ButtonProps, Button } from './button';
import { Calendar, type CalendarProps } from './calendar';
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverClose } from './popover';
import { useControllable } from './interaction-utils';
import { dateLabel, isDateValue } from './date-utils';
import { cx } from './utils';
import { useFieldControl } from './form-utils';
export interface DatePickerProps extends Omit<ButtonProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  label: string;
  placeholder?: string;
  locale?: string;
  weekStartsOn?: CalendarProps['weekStartsOn'];
  min?: string;
  max?: string;
  isDateDisabled?: (date: string) => boolean;
  today?: string;
  required?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
}
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue = '',
    onValueChange,
    open,
    defaultOpen = false,
    onOpenChange,
    label,
    placeholder = 'Choose a date',
    locale = 'en-US',
    weekStartsOn,
    min,
    max,
    isDateDisabled,
    today,
    required: requiredProp,
    readOnly = false,
    clearable = true,
    disabled,
    name,
    form,
    className,
    onClick,
    'aria-describedby': describedBy,
    ...props
  },
  ref,
) {
  const { required = false, ...field } = useFieldControl({
    ...props,
    'aria-describedby': describedBy,
    required: requiredProp,
  });
  const [selected, setSelected] = useControllable(value, defaultValue, onValueChange),
    [visible, setVisible] = useControllable(open, defaultOpen, onOpenChange),
    [invalid, setInvalid] = useState(false),
    id = useId();
  const trigger = useRef<HTMLButtonElement>(null),
    activeDate = useRef<HTMLButtonElement>(null),
    native = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => trigger.current!);
  const latest = useRef({ value, defaultValue, setSelected, setVisible });
  latest.current = { value, defaultValue, setSelected, setVisible };
  useEffect(() => {
    const owner = native.current?.form;
    if (!owner) return;
    const reset = (e: Event) =>
      queueMicrotask(() => {
        if (e.defaultPrevented) return;
        const c = latest.current;
        if (c.value === undefined) c.setSelected(c.defaultValue);
        c.setVisible(false);
        setInvalid(false);
      });
    owner.addEventListener('reset', reset);
    return () => owner.removeEventListener('reset', reset);
  }, [form, name]);
  useEffect(() => {
    native.current?.setCustomValidity(
      selected && isDateDisabled?.(selected) ? 'Choose an available date.' : '',
    );
  }, [selected, isDateDisabled]);
  const change = (date: string) => {
    setSelected(date);
    setInvalid(false);
    setVisible(false);
  };
  return (
    <div className="af-date-picker">
      <Popover open={visible && !disabled && !readOnly} onOpenChange={setVisible}>
        <PopoverTrigger
          {...props}
          {...field}
          ref={trigger}
          disabled={disabled}
          className={cx('af-date-picker__trigger', className)}
          aria-label={isDateValue(selected) ? `${label}: ${dateLabel(selected, locale)}` : label}
          aria-disabled={readOnly || undefined}
          aria-invalid={invalid || field['aria-invalid']}
          aria-describedby={
            [
              field['aria-describedby'],
              required ? `${id}-requirement` : null,
              invalid ? `${id}-error` : null,
            ]
              .filter(Boolean)
              .join(' ') || undefined
          }
          onClick={(e) => {
            onClick?.(e);
            if (readOnly) e.preventDefault();
          }}
        >
          <span>
            {isDateValue(selected)
              ? dateLabel(selected, locale, { dateStyle: 'medium' })
              : placeholder}
          </span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M3 3.5h10v10H3ZM5 2v3m6-3v3M3 7h10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </PopoverTrigger>
        <PopoverContent
          aria-label={label}
          initialFocusRef={activeDate}
          className="af-date-picker__content"
        >
          <PopoverTitle>{label}</PopoverTitle>
          <Calendar
            ref={(node) => {
              activeDate.current =
                node?.querySelector<HTMLButtonElement>('[data-af-date][tabindex="0"]') ?? null;
            }}
            value={selected}
            onValueChange={change}
            min={min}
            max={max}
            disabled={isDateDisabled}
            locale={locale}
            weekStartsOn={weekStartsOn}
            today={today}
          />
          <div className="af-date-picker__actions">
            {clearable && (
              <Button variant="ghost" size="sm" onClick={() => change('')}>
                Clear date
              </Button>
            )}
            <PopoverClose size="sm">Cancel</PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
      <input
        ref={native}
        className="af-selection__native"
        aria-hidden="true"
        tabIndex={-1}
        type="date"
        name={name}
        form={form}
        disabled={disabled}
        required={required && !readOnly}
        min={min}
        max={max}
        value={isDateValue(selected) ? selected : ''}
        onChange={(e) => {
          if (!readOnly) change(e.target.value);
        }}
        onInvalid={(e) => {
          e.preventDefault();
          setInvalid(true);
          trigger.current?.focus();
        }}
      />
      {required && (
        <p id={`${id}-requirement`} className="af-calendar__help">
          Required. Choose an available date.
        </p>
      )}
      {invalid && (
        <p id={`${id}-error`} role="alert" className="af-selection__error">
          Choose an available date before continuing.
        </p>
      )}
    </div>
  );
});

Object.assign(DatePicker, { __antiflexControl: true });
