'use client';
import { forwardRef, useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cx, type Size } from './utils';
import { describedBy } from './form-utils';
export interface RadioGroupProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'children'
> {
  label: ReactNode;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: readonly {
    value: string;
    label: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
  }[];
  required?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  size?: Size;
  orientation?: 'horizontal' | 'vertical';
}
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  {
    label,
    name,
    value,
    defaultValue,
    onValueChange,
    options,
    required,
    description,
    error,
    size = 'md',
    orientation = 'vertical',
    className,
    'aria-describedby': descriptionIds,
    ...props
  },
  ref,
) {
  const id = useId();
  const helpId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const described = describedBy(descriptionIds, helpId, errorId);
  return (
    <fieldset
      {...props}
      ref={ref}
      aria-describedby={described}
      className={cx('af-fieldset', 'af-radio-group', className)}
      data-orientation={orientation}
    >
      <legend className="af-field-legend">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </legend>
      {description && (
        <p id={helpId} className="af-field-help">
          {description}
        </p>
      )}
      <div className="af-radio-options">
        {options.map((option, index) => (
          <label key={option.value} className="af-choice">
            <input
              type="radio"
              name={name || id}
              value={option.value}
              form={props.form}
              required={required}
              disabled={props.disabled || option.disabled}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={value === undefined ? defaultValue === option.value : undefined}
              onChange={(event) => onValueChange?.(event.currentTarget.value)}
              aria-labelledby={`${id}-${index}-label`}
              aria-invalid={error ? true : props['aria-invalid']}
              aria-describedby={describedBy(
                described,
                option.description ? `${id}-${index}-description` : undefined,
              )}
              className={cx('af-radio', `af-checkbox--${size}`)}
            />
            <span>
              <span id={`${id}-${index}-label`} className="af-field-label">
                {option.label}
              </span>
              {option.description && (
                <span
                  id={`${id}-${index}-description`}
                  className="af-field-help af-choice-description"
                >
                  {option.description}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="af-field-help af-field-error">
          {error}
        </p>
      )}
    </fieldset>
  );
});
