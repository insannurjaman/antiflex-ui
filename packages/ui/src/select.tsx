'use client';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { ChoiceControl, type ChoiceCommonProps } from './choice';
export type { ChoiceOption as SelectOption } from './choice';
export interface SelectProps
  extends
    ChoiceCommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ChoiceCommonProps | 'onChange'> {}
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options,
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    placeholder,
    size,
    name,
    form,
    required,
    disabled,
    readOnly,
    emptyMessage,
    loading,
    loadingMessage,
    id,
    ...props
  },
  ref,
) {
  return (
    <ChoiceControl
      {...{
        options,
        value,
        defaultValue,
        onValueChange,
        open,
        defaultOpen,
        onOpenChange,
        placeholder,
        size,
        name,
        form,
        required,
        disabled,
        readOnly,
        emptyMessage,
        loading,
        loadingMessage,
        id,
      }}
      controlRef={ref}
      buttonProps={props}
    />
  );
});

Object.assign(Select, { __antiflexControl: true });
