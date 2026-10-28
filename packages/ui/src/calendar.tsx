'use client';
import {
  forwardRef,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react';
import { Button } from './button';
import { useControllable } from './interaction-utils';
import {
  boundDate,
  dateLabel,
  isDateValue,
  monthValue,
  readDate,
  shiftDay,
  shiftMonth,
  writeDate,
} from './date-utils';
import { cx } from './utils';
export type DateValue = string;
export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  value?: DateValue;
  defaultValue?: DateValue;
  onValueChange?: (value: DateValue) => void;
  month?: string;
  defaultMonth?: string;
  onMonthChange?: (month: string) => void;
  min?: DateValue;
  max?: DateValue;
  disabled?: boolean | ((date: DateValue) => boolean);
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  today?: DateValue;
}
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    value,
    defaultValue = '',
    onValueChange,
    month,
    defaultMonth,
    onMonthChange,
    min,
    max,
    disabled = false,
    locale = 'en-US',
    weekStartsOn = 0,
    today = writeDate(new Date()),
    className,
    onKeyDown,
    ...props
  },
  ref,
) {
  const [selected, setSelected] = useControllable(value, defaultValue, onValueChange),
    [requestedView, setView] = useControllable(
      monthValue(month),
      monthValue(defaultMonth) ??
        (isDateValue(selected)
          ? selected
          : boundDate(isDateValue(today) ? today : '2026-01-01', min, max)
        ).slice(0, 7),
      onMonthChange,
    );
  const root = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => root.current!);
  const id = useId(),
    [focused, setFocused] = useState(isDateValue(selected) ? selected : boundDate(today, min, max)),
    requestFocus = useRef(false);
  const view = boundDate(`${requestedView}-01`, min, max).slice(0, 7);
  const start = `${view}-01`,
    weekStart =
      Number.isInteger(weekStartsOn) && weekStartsOn >= 0 && weekStartsOn <= 6 ? weekStartsOn : 0,
    offset = (readDate(start).getUTCDay() - weekStart + 7) % 7;
  const days = Array.from({ length: 42 }, (_, i) => shiftDay(start, i - offset));
  const focusDay =
    days.includes(focused) && isDateValue(focused)
      ? focused
      : days.includes(selected)
        ? selected
        : days.includes(today)
          ? today
          : start;
  const unavailable = (day: string) =>
    !isDateValue(day) ||
    (isDateValue(min) && day < min) ||
    (isDateValue(max) && day > max) ||
    (typeof disabled === 'function' ? disabled(day) : disabled);
  const previous = shiftMonth(start, -1).slice(0, 7),
    next = shiftMonth(start, 1).slice(0, 7);
  const monthAllowed = (m: string) =>
    !!monthValue(m) &&
    !(isDateValue(min) && m < min.slice(0, 7)) &&
    !(isDateValue(max) && m > max.slice(0, 7));
  useLayoutEffect(() => {
    if (!requestFocus.current) return;
    requestFocus.current = false;
    root.current
      ?.querySelector<HTMLButtonElement>(`[data-af-date="${focusDay}"]`)
      ?.focus({ preventScroll: true });
  }, [focusDay, view]);
  useLayoutEffect(() => {
    if (isDateValue(value)) {
      setFocused(value);
      if (month === undefined) setView(value.slice(0, 7));
    }
  }, [value]);
  const move = (day: string) => {
    const nextDay = boundDate(day, min, max);
    requestFocus.current = true;
    setFocused(nextDay);
    if (nextDay.slice(0, 7) !== view) setView(nextDay.slice(0, 7));
  };
  return (
    <div {...props} ref={root} className={cx('af-calendar', className)}>
      <div className="af-calendar__header">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Previous month"
          disabled={disabled === true || !monthAllowed(previous)}
          onClick={() => {
            setView(previous);
            setFocused(`${previous}-01`);
          }}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m10 4-4 4 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Button>
        <h3 id={`${id}-month`} aria-live="polite" aria-atomic="true">
          {dateLabel(start, locale, { month: 'long', year: 'numeric' })}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Next month"
          disabled={disabled === true || !monthAllowed(next)}
          onClick={() => {
            setView(next);
            setFocused(`${next}-01`);
          }}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Button>
      </div>
      <table
        role="grid"
        aria-labelledby={`${id}-month`}
        aria-describedby={`${id}-help`}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          const target = e.target as HTMLElement,
            day = target.dataset.afDate;
          if (
            e.defaultPrevented ||
            !day ||
            e.ctrlKey ||
            e.metaKey ||
            e.altKey ||
            e.nativeEvent.isComposing ||
            disabled === true
          )
            return;
          const rtl = getComputedStyle(e.currentTarget).direction === 'rtl',
            weekday = readDate(day).getUTCDay();
          let dest: string | undefined;
          if (e.key === 'ArrowRight') dest = shiftDay(day, rtl ? -1 : 1);
          if (e.key === 'ArrowLeft') dest = shiftDay(day, rtl ? 1 : -1);
          if (e.key === 'ArrowDown') dest = shiftDay(day, 7);
          if (e.key === 'ArrowUp') dest = shiftDay(day, -7);
          if (e.key === 'Home') dest = shiftDay(day, -((weekday - weekStart + 7) % 7));
          if (e.key === 'End') dest = shiftDay(day, 6 - ((weekday - weekStart + 7) % 7));
          if (e.key === 'PageDown') dest = shiftMonth(day, e.shiftKey ? 12 : 1);
          if (e.key === 'PageUp') dest = shiftMonth(day, e.shiftKey ? -12 : -1);
          if (dest) {
            e.preventDefault();
            move(dest);
          }
        }}
      >
        <thead>
          <tr>
            {Array.from({ length: 7 }, (_, i) => {
              const day = shiftDay('2023-01-01', (weekStart + i) % 7);
              return (
                <th key={i} scope="col" abbr={dateLabel(day, locale, { weekday: 'long' })}>
                  {dateLabel(day, locale, { weekday: 'short' })}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, row) => (
            <tr key={row}>
              {days.slice(row * 7, row * 7 + 7).map((day) => (
                <td key={day} role="gridcell" aria-selected={selected === day}>
                  {isDateValue(day) && (
                    <button
                      type="button"
                      data-af-date={day}
                      data-outside={day.slice(0, 7) !== view || undefined}
                      tabIndex={disabled === true ? -1 : focusDay === day ? 0 : -1}
                      aria-label={dateLabel(day, locale)}
                      aria-current={day === today ? 'date' : undefined}
                      aria-disabled={unavailable(day) || undefined}
                      onFocus={() => setFocused(day)}
                      onClick={() => {
                        if (!unavailable(day)) {
                          setSelected(day);
                          setFocused(day);
                          if (day.slice(0, 7) !== view) setView(day.slice(0, 7));
                        }
                      }}
                    >
                      {readDate(day).getUTCDate()}
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p id={`${id}-help`} className="af-calendar__help">
        Arrow keys move days. Page Up/Down changes month.
      </p>
    </div>
  );
});
