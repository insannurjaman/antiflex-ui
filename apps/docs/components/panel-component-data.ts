const sharedProps: [string, string, string][] = [
  [
    'Root: open / defaultOpen / onOpenChange',
    'boolean / boolean / (open: boolean) => void',
    'uncontrolled, closed',
  ],
  ['Content: size', 'sm | md | lg', 'md'],
  [
    'Content: initialFocusRef / returnFocusRef',
    'RefObject<HTMLElement | null>',
    'first focusable / invoker',
  ],
  ['Content: dismissOnOutside', 'boolean', 'true'],
  ['Trigger / Close', 'ButtonProps, native button ref', 'primary / secondary'],
];
const contract =
  'Uses native modal HTML dialog with inert background, nested scroll locks, Tab/Shift+Tab loop, Escape dismissal, and focus restored to the invoker or returnFocusRef. Provide one Title or explicit aria-label/aria-labelledby, one optional short Description, and a visible Close action. initialFocusRef must point to a visible descendant; focus Title and set aria-describedby="" for long structured reading. Controlled consumers must honor onOpenChange to dismiss. Outside dismissal requires both press and release on the backdrop; set dismissOnOutside=false to disable it. Native onCancel can prevent Escape. Content stays mounted while closed, so reset drafts on opening if needed. Root has no DOM/ref. Content forwards native dialog attributes/events and its HTMLDialogElement ref; Header/Body/Footer div, Title h2, Description p, Trigger/Close button. Keep Header, Body, Footer as direct children of Content or of one direct form; Body scrolls while header and footer remain visible. Keep headings/descriptions concise on short viewports. No portal, legacy dialog polyfill, swipe, drag, or snap points are included.';
export const panelComponentData = {
  sheet: {
    name: 'Sheet',
    description: 'A modal workspace attached to a viewport edge, with persistent task actions.',
    code: `<Sheet>\n  <SheetTrigger>Edit settings</SheetTrigger>\n  <SheetContent side="right" size="md">\n    <SheetHeader>\n      <SheetTitle>Workspace settings</SheetTitle>\n      <SheetDescription>Update your workspace.</SheetDescription>\n    </SheetHeader>\n    <SheetBody>Settings form or review content</SheetBody>\n    <SheetFooter><SheetClose>Done</SheetClose></SheetFooter>\n  </SheetContent>\n</Sheet>`,
    props: [
      ...sharedProps,
      ['Content: side', 'top | right | bottom | left (physical edges)', 'right'],
    ] as [string, string, string][],
    accessibility:
      contract +
      ' Side sheets fill the viewport height. Horizontal sheets fill its width. Size selects 360/448/640px width or 320/480/640px height, capped to the viewport. Left and right are physical and do not swap in RTL; text, controls, and logical spacing inherit direction.',
  },
  drawer: {
    name: 'Drawer',
    description:
      'A content-sized bottom task panel, centered on wide screens and bounded to the viewport.',
    code: `<Drawer>\n  <DrawerTrigger>Export records</DrawerTrigger>\n  <DrawerContent size="md">\n    <DrawerHeader>\n      <DrawerTitle>Export records</DrawerTitle>\n      <DrawerDescription>Choose your file format.</DrawerDescription>\n    </DrawerHeader>\n    <DrawerBody>Export options</DrawerBody>\n    <DrawerFooter><DrawerClose>Done</DrawerClose></DrawerFooter>\n  </DrawerContent>\n</Drawer>`,
    props: sharedProps,
    accessibility:
      contract +
      ' Drawer is a bottom task pattern with intrinsic height capped at 85dvh and widths 400/640/800px, capped to 100% of the viewport. It is distinct from a full-height Sheet. Use visible actions to close it; there is no drag-handle affordance or gesture dismissal. Safe-area insets protect content and footer actions on mobile. This primitive does not provide an export backend; the example downloads local sample data.',
  },
};
