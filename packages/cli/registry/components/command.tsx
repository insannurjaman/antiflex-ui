'use client';
import { forwardRef, useRef, useImperativeHandle, type HTMLAttributes } from 'react';
import { ChoiceControl, type ChoiceOption } from './choice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';
import { cx } from './utils';
export interface CommandItem extends ChoiceOption {
  onSelect: () => void | false;
}
export interface CommandProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: CommandItem[];
  label: string;
  placeholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  onAction?: (value: string) => void;
}
export const Command = forwardRef<HTMLDivElement, CommandProps>(function Command(
  {
    items,
    label,
    placeholder = 'Search commands…',
    emptyMessage = 'No commands found.',
    loading,
    onAction,
    className,
    ...props
  },
  ref,
) {
  return (
    <div {...props} ref={ref} className={cx('af-command', className)}>
      <ChoiceControl
        options={items}
        value=""
        onValueChange={(v) => {
          const item = items.find((i) => i.value === v);
          if (item && !item.disabled && item.onSelect() !== false) onAction?.(v);
        }}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
        loading={loading}
        editable
        inline
        command
        inputProps={{ 'aria-label': label }}
      />
    </div>
  );
});
export interface CommandDialogProps extends CommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}
export const CommandDialog = forwardRef<HTMLDivElement, CommandDialogProps>(function CommandDialog(
  {
    open,
    onOpenChange,
    title = 'Run a command',
    description = 'Search available actions in this workspace.',
    onAction,
    ...props
  },
  ref,
) {
  const root = useRef<HTMLDivElement>(null),
    input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => root.current!);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent initialFocusRef={input}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command
          {...props}
          ref={(node) => {
            root.current = node;
            input.current = node?.querySelector<HTMLInputElement>('input[role="combobox"]') ?? null;
          }}
          onAction={(v) => {
            onAction?.(v);
            onOpenChange(false);
          }}
        />
        <DialogFooter>
          <DialogClose>Close commands</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
