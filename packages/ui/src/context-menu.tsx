'use client';
import { MenuRoot, type MenuRootProps } from './menu';
export type ContextMenuProps = MenuRootProps;
export function ContextMenu(props: ContextMenuProps) {
  return <MenuRoot {...props} kind="context" />;
}
export function ContextMenuSub(props: MenuRootProps) {
  return <MenuRoot {...props} kind="sub" />;
}
export {
  MenuContent as ContextMenuContent,
  MenuItem as ContextMenuItem,
  MenuLink as ContextMenuLink,
  MenuCheckboxItem as ContextMenuCheckboxItem,
  MenuRadioGroup as ContextMenuRadioGroup,
  MenuRadioItem as ContextMenuRadioItem,
  MenuSubTrigger as ContextMenuSubTrigger,
  MenuGroup as ContextMenuGroup,
  MenuLabel as ContextMenuLabel,
  MenuSeparator as ContextMenuSeparator,
  MenuShortcut as ContextMenuShortcut,
  MenuContextTrigger as ContextMenuTrigger,
} from './menu';
export type {
  MenuContentProps as ContextMenuContentProps,
  MenuItemProps as ContextMenuItemProps,
  MenuLinkProps as ContextMenuLinkProps,
  MenuCheckboxItemProps as ContextMenuCheckboxItemProps,
  MenuRadioGroupProps as ContextMenuRadioGroupProps,
  MenuRadioItemProps as ContextMenuRadioItemProps,
} from './menu';
