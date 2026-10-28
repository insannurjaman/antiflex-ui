'use client';
import { ModalRoot, type ModalRootProps } from './modal';
export interface AlertDialogProps extends ModalRootProps {}
export function AlertDialog(props: AlertDialogProps) {
  return <ModalRoot {...props} kind="alertdialog" />;
}
export {
  ModalTrigger as AlertDialogTrigger,
  ModalContent as AlertDialogContent,
  ModalHeader as AlertDialogHeader,
  ModalBody as AlertDialogBody,
  ModalFooter as AlertDialogFooter,
  ModalTitle as AlertDialogTitle,
  ModalDescription as AlertDialogDescription,
  ModalCancel as AlertDialogCancel,
  ModalAction as AlertDialogAction,
  type ModalContentProps as AlertDialogContentProps,
} from './modal';
