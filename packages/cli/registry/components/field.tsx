'use client';
import {
  forwardRef,
  useId,
  type HTMLAttributes,
  type FieldsetHTMLAttributes,
  type ReactNode,
} from 'react';
import { Label } from './label';
import { cx } from './utils';
import { FieldContext, fieldControlId } from './form-utils';
export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: ReactNode;
  controlId?: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  hideLabel?: boolean;
  children: ReactNode;
}
/** One labeled control per Field. Use FieldSet for a related group. */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, controlId, description, error, required, hideLabel, children, className, ...props },
  ref,
) {
  const generated = useId();
  const id = fieldControlId(children) || controlId || generated;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <FieldContext.Provider
      value={{ id, descriptionId, errorId, invalid: Boolean(error), required }}
    >
      <div
        {...props}
        ref={ref}
        className={cx('af-field', className)}
        data-invalid={error ? '' : undefined}
      >
        <Label htmlFor={id} required={required} className={hideLabel ? 'af-sr-only' : undefined}>
          {label}
        </Label>
        {children}
        {description && (
          <span id={descriptionId} className="af-field-help">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="af-field-help af-field-error">
            {error}
          </span>
        )}
      </div>
    </FieldContext.Provider>
  );
});
export const FieldSet = forwardRef<
  HTMLFieldSetElement,
  FieldsetHTMLAttributes<HTMLFieldSetElement>
>(function FieldSet({ className, ...props }, ref) {
  return <fieldset {...props} ref={ref} className={cx('af-fieldset', className)} />;
});
export const FieldLegend = forwardRef<HTMLLegendElement, HTMLAttributes<HTMLLegendElement>>(
  function FieldLegend({ className, ...props }, ref) {
    return <legend {...props} ref={ref} className={cx('af-field-legend', className)} />;
  },
);
