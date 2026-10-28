'use client';
import { forwardRef } from 'react';
import { ModalRoot, ModalContent, type ModalRootProps, type ModalContentProps } from './modal';
import { cx } from './utils';

export interface DrawerProps extends ModalRootProps {}
export function Drawer(props: DrawerProps) {
  return <ModalRoot {...props} kind="dialog" />;
}
export interface DrawerContentProps extends ModalContentProps {}
/** A content-sized bottom task panel. No drag/swipe or snap-point behavior. */
export const DrawerContent = forwardRef<HTMLDialogElement, DrawerContentProps>(
  function DrawerContent({ size = 'md', className, ...props }, ref) {
    return (
      <ModalContent
        {...props}
        ref={ref}
        size={size}
        className={cx('af-panel', 'af-drawer', `af-drawer--${size}`, className)}
      />
    );
  },
);
export {
  ModalTrigger as DrawerTrigger,
  ModalHeader as DrawerHeader,
  ModalBody as DrawerBody,
  ModalFooter as DrawerFooter,
  ModalTitle as DrawerTitle,
  ModalDescription as DrawerDescription,
  ModalClose as DrawerClose,
} from './modal';
