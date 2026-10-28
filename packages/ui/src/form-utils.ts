'use client';
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type AriaAttributes,
  type ReactNode,
} from 'react';

/** Resolve native/antiflex controls through transparent layout wrappers without running components. */
export function fieldControlId(children: ReactNode): string | undefined {
  let id: string | undefined;
  Children.forEach(children, (child) => {
    if (id || !isValidElement<{ id?: string; children?: ReactNode }>(child)) return;
    const type = child.type;
    const native = typeof type === 'string' && ['input', 'textarea', 'select'].includes(type);
    const marked = typeof type === 'object' && type !== null && '__antiflexControl' in type;
    if (native || marked) id = child.props.id;
    else id = fieldControlId(child.props.children);
  });
  return id;
}
export const describedBy = (...values: (string | undefined)[]) =>
  [...new Set(values.flatMap((value) => value?.split(/\s+/).filter(Boolean) || []))].join(' ') ||
  undefined;
export const FieldContext = createContext<
  | {
      id: string;
      descriptionId?: string;
      errorId?: string;
      invalid?: boolean;
      required?: boolean;
    }
  | undefined
>(undefined);
export function useFieldControl(props: AriaAttributes & { id?: string; required?: boolean }) {
  const field = useContext(FieldContext);
  return {
    id: props.id ?? field?.id,
    required: props.required ?? field?.required,
    'aria-invalid': props['aria-invalid'] ?? (field?.invalid || undefined),
    'aria-describedby': describedBy(
      props['aria-describedby'],
      field?.descriptionId,
      field?.errorId,
    ),
  };
}
