const sharedProps: [string, string, string][] = [
  [
    'Root / Sub: open, defaultOpen, onOpenChange',
    'boolean, boolean, (open: boolean) => void',
    'uncontrolled, closed',
  ],
  ['Content: size', 'sm | md | lg', 'md: 240px, 32px minimum item'],
  [
    'Content: side / align / sideOffset / collisionPadding',
    'top | right | bottom | left; start | center | end; px',
    'bottom/start/4/8; submenu right (left in RTL)',
  ],
  [
    'Item / Link: onSelect',
    '(event: Event) => void',
    'preventDefault cancels automatic close; Link also cancels navigation',
  ],
  [
    'Item: disabled / variant / textValue / closeOnSelect',
    'boolean / default | danger / string / boolean',
    'false / default / visible text / true',
  ],
  [
    'CheckboxItem: checked / defaultChecked / onCheckedChange',
    'boolean / boolean / (checked: boolean) => void',
    'uncontrolled; stays open by default',
  ],
  [
    'RadioGroup: value / defaultValue / onValueChange',
    'string / string / (value: string) => void',
    'consumer labels the group; RadioItem supplies value',
  ],
  [
    'Sub + SubTrigger + Content',
    'composable nested menu',
    'click, Enter, Space or directional arrow opens; no hover timer',
  ],
  [
    'Shortcut',
    'native span attributes and ref',
    'visual hint only; does not register keyboard shortcuts',
  ],
];
const accessibility =
  'Provide an accessible menu name with aria-label/aria-labelledby or a named Trigger. Arrow keys wrap among items; Home/End and buffered typeahead work in each menu. Disabled items remain focusable (aria-disabled) but never invoke callbacks. Enter/Space activate native buttons. Checkbox/radio items expose checked state and stay open unless closeOnSelect is true. RadioGroup/Group require an accessible label when needed. Submenus open by click, Enter/Space or the forward arrow (reversed in RTL); the backward arrow/Escape closes one level. Tab/Shift+Tab close the entire tree and move beyond the root invoker; they do not cycle inside menus. Outside press/release or focus exit requests dismissal. Focus returns after Escape/selection when still owned by the menu; an action opening a dialog retains its new focus. Controlled consumers must honor onOpenChange to close. Content uses native popover top-layer support and ResizeObserver, flips/clamps to the visual viewport, and stays mounted when closed. Menu parts must remain DOM descendants of their owning Content; custom wrappers are supported. Do not put form fields or other tabbable controls inside a menu; use Popover for that task. Root/Sub have no DOM/ref. Trigger/Item/CheckboxItem/RadioItem/SubTrigger forward button refs, Link an anchor, Content/Group/RadioGroup/Label/Separator divs and Shortcut a span. Shortcut text does not install global bindings. No hover-open submenu or touch long-press recognizer is included.';
export const menuComponentData = {
  'dropdown-menu': {
    name: 'Dropdown Menu',
    description: 'A compact action list with nested choices, checkboxes, and radio preferences.',
    code: `<DropdownMenu>\n  <DropdownMenuTrigger>Project actions</DropdownMenuTrigger>\n  <DropdownMenuContent aria-label="Project actions">\n    <DropdownMenuItem onSelect={duplicateProject}>Duplicate project</DropdownMenuItem>\n    <DropdownMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>Pin project</DropdownMenuCheckboxItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem disabled>Delete project</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
    props: sharedProps,
    accessibility:
      'Trigger supports native button attributes/refs. Enter/Space/ArrowDown open at the first item; ArrowUp opens at the last. ' +
      accessibility,
  },
  'context-menu': {
    name: 'Context Menu',
    description: 'Contextual actions at a pointer location, with a complete keyboard alternative.',
    code: `<ContextMenu>\n  <ContextMenuTrigger role="region" aria-label="Project context actions">\n    Atlas workspace\n  </ContextMenuTrigger>\n  <ContextMenuContent aria-label="Project actions">\n    <ContextMenuItem onSelect={duplicateProject}>Duplicate project</ContextMenuItem>\n    <ContextMenuItem onSelect={exportProject}>Export JSON</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
    props: [
      ['Trigger', 'native div attributes/ref; tabIndex', '0; choose a meaningful role/name'] as [
        string,
        string,
        string,
      ],
      ...sharedProps,
    ],
    accessibility:
      'Right-click opens at the pointer; Shift+F10 or ContextMenu key opens near the focusable region. Context content uses zero offset by default and closes on external scrolling. Supply a visible Dropdown Menu with equivalent actions for touch and discoverability. The browser can reserve context gestures (for example Shift+right-click); native menus remain available outside the trigger. ' +
      accessibility,
  },
};
