'use client';
import { MenuRoot, type MenuRootProps } from './menu';
export type DropdownMenuProps = MenuRootProps;
export function DropdownMenu(props: DropdownMenuProps) {
  return <MenuRoot {...props} kind="dropdown" />;
}
export function DropdownMenuSub(props: MenuRootProps) {
  return <MenuRoot {...props} kind="sub" />;
}
export {
  MenuContent as DropdownMenuContent,
  MenuItem as DropdownMenuItem,
  MenuLink as DropdownMenuLink,
  MenuCheckboxItem as DropdownMenuCheckboxItem,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuRadioItem as DropdownMenuRadioItem,
  MenuSubTrigger as DropdownMenuSubTrigger,
  MenuGroup as DropdownMenuGroup,
  MenuLabel as DropdownMenuLabel,
  MenuSeparator as DropdownMenuSeparator,
  MenuShortcut as DropdownMenuShortcut,
  MenuTrigger as DropdownMenuTrigger,
} from './menu';
export type {
  MenuContentProps as DropdownMenuContentProps,
  MenuItemProps as DropdownMenuItemProps,
  MenuLinkProps as DropdownMenuLinkProps,
  MenuCheckboxItemProps as DropdownMenuCheckboxItemProps,
  MenuRadioGroupProps as DropdownMenuRadioGroupProps,
  MenuRadioItemProps as DropdownMenuRadioItemProps,
} from './menu';
