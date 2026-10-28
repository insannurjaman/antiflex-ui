'use client';
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { type Size } from './utils';
import { Field } from './field';
import { Input } from './input';
import { InputGroup, InputGroupAddon } from './input-group';
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  description?: string;
  error?: string;
  size?: Size;
  leading?: ReactNode;
  hideLabel?: boolean;
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, description, error, size = 'md', leading, hideLabel, className, ...props },
  ref,
) {
  const generated = useId();
  return (
    <Field
      controlId={id || generated}
      label={label}
      description={error ? undefined : description}
      error={error}
      hideLabel={hideLabel}
      className={className}
    >
      <InputGroup size={size} invalid={Boolean(error)}>
        {leading && <InputGroupAddon aria-hidden="true">{leading}</InputGroupAddon>}
        <Input {...props} ref={ref} size={size} />
      </InputGroup>
    </Field>
  );
});
