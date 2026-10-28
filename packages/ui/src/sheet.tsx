'use client';
import { forwardRef } from 'react';
import { ModalRoot, ModalContent, type ModalRootProps, type ModalContentProps } from './modal';
import { cx } from './utils';

export interface SheetProps extends ModalRootProps {}
export function Sheet(props: SheetProps) {
  return <ModalRoot {...props} kind="dialog" />;
}
export interface SheetContentProps extends ModalContentProps {
  /** Physical viewport edge; left/right do not swap in RTL. */
  side?: 'top' | 'right' | 'bottom' | 'left';
}
export const SheetContent = forwardRef<HTMLDialogElement, SheetContentProps>(function SheetContent(
  { side = 'right', size = 'md', className, ...props },
  ref,
) {
  return (
    <ModalContent
      {...props}
      ref={ref}
      size={size}
      data-side={side}
      className={cx('af-panel', 'af-sheet', `af-sheet--${size}`, className)}
    />
  );
});
export {
  ModalTrigger as SheetTrigger,
  ModalHeader as SheetHeader,
  ModalBody as SheetBody,
  ModalFooter as SheetFooter,
  ModalTitle as SheetTitle,
  ModalDescription as SheetDescription,
  ModalClose as SheetClose,
} from './modal';
