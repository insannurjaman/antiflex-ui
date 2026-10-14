'use client';

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx, type Size } from './utils';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label: string;
    description?: string;
    error?: string;
    size?: Size;
    leading?: ReactNode;
    hideLabel?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ id, label, description, error, size = 'md', leading, hideLabel, className, 'aria-describedby': describedBy, ...props }, ref) {
    const generated = useId();
    const inputId = id || generated;
    const helpId = `${inputId}-help`;
    const help = error || description;
    return (<div className={cx('ch-field', className)}>
      <label className={hideLabel ? 'ch-sr-only' : 'ch-field-label'} htmlFor={inputId}>
        {label}
      </label>
      <div className={cx('ch-field-control', `ch-field-control--${size}`, Boolean(error) && 'ch-field-control--error')}>
        {leading && (<span className="ch-field-leading" aria-hidden="true">
            {leading}
          </span>)}
        <input {...props} ref={ref} id={inputId} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={[describedBy, help ? helpId : undefined].filter(Boolean).join(' ') || undefined}/>
      </div>
      {help && (<span id={helpId} className={cx('ch-field-help', Boolean(error) && 'ch-field-error')}>
          {help}
        </span>)}
    </div>);
});
