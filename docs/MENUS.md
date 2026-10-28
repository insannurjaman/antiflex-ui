# Action menus

Dropdown Menu and Context Menu are original antiflex implementations sharing an internal menu engine. The public catalog contains two families, not one family per item or submenu. They use native manual popovers for top-layer rendering and the existing floating-layer stack for modal integration.

## Composition

A root contains one Trigger and Content. Use Item for commands and Link for real anchors. CheckboxItem and RadioGroup/RadioItem support controlled values and initial defaults. Group, Label, Separator, Shortcut, and nested Sub/SubTrigger/Content provide composition without behavior-library dependencies. Parts remain DOM descendants of their owning menu; rendered custom wrappers are supported.

Native attributes and element refs are forwarded. Root and Sub are state providers without DOM nodes or refs. Content sizes are sm (192px), md (240px), and lg (288px); minimum item heights are 28/32/40px, with intrinsic text/padding and a 44px coarse-pointer minimum. Layout uses logical spacing and native direction inheritance.

## Keyboard and focus

- Enter/Space/ArrowDown open a dropdown at its first item; ArrowUp opens at its last.
- ArrowUp/Down wrap. Home/End and buffered label typeahead navigate the current level. The rendered menu uses a roving tab stop; disabled items remain discoverable with aria-disabled and cannot activate.
- Enter/Space activate native button items. Real anchors retain native navigation behavior.
- Click or the forward directional arrow opens a submenu. The backward arrow closes it. Directional keys reverse in RTL. No hover timer is supplied.
- Escape closes the top floating level and restores its invoker. Parent modal dismissal waits for the next Escape.
- Tab/Shift+Tab close the menu tree and move beyond its root invoker, rather than cycling inside a menu.
- Selection restores focus only while the menu still owns it. An action that opens a dialog retains the dialog's focus.
- Outside press/release and focus exit request dismissal. Controlled consumers must honor onOpenChange to close.

Checkbox/radio items stay open by default; set closeOnSelect to true for immediate dismissal. onSelect receives a cancellable Event. preventDefault cancels automatic close and choice changes; on Link it also cancels navigation. onClick.preventDefault cancels selection. Disabled items do not run action callbacks.

## Context entry

ContextMenuTrigger is a focusable div. Give it an appropriate role and accessible name. Right-click uses pointer coordinates; Shift+F10 or the ContextMenu key opens near the region. Native browser gestures may take precedence. External movement of the context requests closing; an already-queued scroll notification should not dismiss a newly opened menu.

Always expose equivalent commands through a visible button for touch and discoverability. This implementation does not install a custom long-press recognizer. Shortcut labels are visual hints and do not register global key bindings.

## Placement and limits

Menus follow resize and scroll, flip when necessary, and clamp to the visual viewport. Top-layer ancestors escape clipping by their DOM ancestors; nested submenu anchors must be checked within their actual top-layer container. Hidden anchors request dismissal. Native popover support and ResizeObserver are required; no legacy polyfill is bundled.

Menus contain discrete commands and choices. Use Popover or a modal task for text fields and forms. Avoid positive tabindex, detached/portaled menu parts, and nested interactive content inside an Item. User code owns persistence, networking, permissions, and confirmation for destructive actions.

See `/docs/menus`, `/docs/components/dropdown-menu`, `/docs/components/context-menu`, and the dashboard order actions for working local examples. The synthetic project example duplicates local entries, changes pin/density/archive state, and downloads JSON. The dashboard flags a local order or downloads its sample record.

Keyboard guidance: [W3C menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) and [menu patterns](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/). Automated checks complement manual assistive-technology review; they are not an accessibility certification.
