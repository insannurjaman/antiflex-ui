'use client';
import { ModalRoot, type ModalRootProps } from './modal';
export interface DialogProps extends ModalRootProps {}
export function Dialog(props: DialogProps) {
  return <ModalRoot {...props} kind="dialog" />;
}
export {
  ModalTrigger as DialogTrigger,
  ModalContent as DialogContent,
  ModalHeader as DialogHeader,
  ModalBody as DialogBody,
  ModalFooter as DialogFooter,
  ModalTitle as DialogTitle,
  ModalDescription as DialogDescription,
  ModalClose as DialogClose,
  type ModalContentProps as DialogContentProps,
} from './modal';
