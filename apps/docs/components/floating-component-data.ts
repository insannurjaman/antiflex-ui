export const floatingComponentData = {
  popover: {
    name: 'Popover',
    description: 'A small, nonmodal task panel anchored to its trigger.',
    code: `<Popover>\n  <PopoverTrigger>Project filters</PopoverTrigger>\n  <PopoverContent>\n    <PopoverTitle>Filter projects</PopoverTitle>\n    <PopoverDescription>Choose a project status.</PopoverDescription>\n    <Field label="Status"><NativeSelect><option>Active</option><option>Archived</option></NativeSelect></Field>\n    <PopoverClose>Done</PopoverClose>\n  </PopoverContent>\n</Popover>`,
    props: [
      [
        'Root: open / defaultOpen / onOpenChange',
        'boolean / boolean / (open: boolean) => void',
        'uncontrolled, closed',
      ],
      [
        'Content: side / align',
        'top | right | bottom | left / start | center | end',
        'bottom / start',
      ],
      ['Content: sideOffset / collisionPadding', 'number (px)', '8 / 8'],
      [
        'Content: initialFocusRef / returnFocusRef',
        'RefObject<HTMLElement | null>',
        'first focusable / trigger',
      ],
      ['Trigger / Close', 'ButtonProps and native button refs', 'secondary'],
    ] as [string, string, string][],
    accessibility:
      'Provide one PopoverTitle (or an explicit aria-label/aria-labelledby), an explicit close action, and optionally one short PopoverDescription. Content is a nonmodal dialog in the browser popover top layer. Focus moves to the first focusable control or Content; initialFocusRef must target a visible descendant. Tab is not trapped: moving focus outside requests closing. Escape closes the top floating layer and restores the invoker; outside press/release requests closing without stealing focus from an outside focusable destination. Nested panels close one layer per Escape or outside gesture. The page remains interactive and scrollable. Content follows resize/scroll, flips when the preferred side has insufficient room, clamps to the visual viewport, and requests closing if its anchor is clipped out of view. Start/end alignment follows RTL on top/bottom placements. Open state is consumer-owned when controlled, so consumers must honor onOpenChange to dismiss. Root has no DOM/ref; Trigger and Close refs target buttons, Content a div, Title h3, Description p. Native popover support and ResizeObserver are required. Do not nest interactive trigger elements, use multiple title/description parts, add positive tabindex, or use a popover for a modal confirmation. Content stays mounted while closed.',
  },
  tooltip: {
    name: 'Tooltip',
    description: 'Short supplemental text on pointer hover or keyboard focus.',
    code: `<Tooltip>\n  <TooltipTrigger>Copy project ID</TooltipTrigger>\n  <TooltipContent>Copies this project identifier.</TooltipContent>\n</Tooltip>`,
    props: [
      ['Root: delayDuration', 'number (ms)', '500; keyboard focus is immediate'],
      [
        'Root: open / defaultOpen / onOpenChange',
        'boolean / boolean / (open: boolean) => void',
        'uncontrolled, closed',
      ],
      ['Content: children', 'string', 'required, supplemental text only'],
      [
        'Content: side / align',
        'top | right | bottom | left / start | center | end',
        'top / center',
      ],
      ['Content: sideOffset / collisionPadding', 'number (px)', '8 / 8'],
      ['Trigger', 'ButtonProps and native button ref', 'secondary'],
    ] as [string, string, string][],
    accessibility:
      'Keep a complete visible or accessible button name; a tooltip is supplemental description, never the only way to learn an essential action or error. Content accepts plain text only and never receives focus or contains interactive elements. Trigger merges the generated tooltip ID with existing aria-describedby values. Focus shows immediately; mouse/pen hover uses delayDuration, with a brief grace period and transparent pointer bridge to hover Content. Touch hover is ignored. Escape or trigger activation dismisses without moving focus; a dismissed tooltip waits for a fresh trigger entry or focus before reopening. Moving away closes after the grace period unless the trigger is still focused. The shared positioning follows resize/scroll, flips/clamps, and dismisses a clipped anchor. Controlled state stays consumer-owned. Root has no DOM/ref; Trigger ref targets its native button and Content a top-layer div with role=tooltip. Disabled native buttons cannot receive keyboard focus; put essential help in visible text rather than relying on their tooltip. No provider, interactive tooltip, or legacy popover polyfill is included.',
  },
};
