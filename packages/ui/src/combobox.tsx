'use client';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { ChoiceControl, type ChoiceCommonProps } from './choice';
export type { ChoiceOption as ComboboxOption } from './choice';
export interface ComboboxProps
  extends
    ChoiceCommonProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      keyof ChoiceCommonProps | 'onChange' | 'type' | 'onInput'
    > {
  onInputChange?: (value: string) => void;
}
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
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
    onInputChange,
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
        onInputChange,
      }}
      editable
      controlRef={ref}
      inputProps={props}
    />
  );
});

Object.assign(Combobox, { __antiflexControl: true });
