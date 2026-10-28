'use client';
import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cx, type Size } from './utils';
import { useFieldControl } from './form-utils';
export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: Size;
}
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect(
  { size = 'md', className, multiple, ...props },
  ref,
) {
  const field = useFieldControl(props);
  return (
    <span className="af-native-select-wrap">
      <select
        {...props}
        {...field}
        multiple={multiple}
        ref={ref}
        className={cx('af-input', 'af-native-select', `af-input--${size}`, className)}
      />
      {!multiple && (
        <svg
          className="af-native-select-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </span>
  );
});

Object.assign(NativeSelect, { __antiflexControl: true });
