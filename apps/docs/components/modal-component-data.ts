export const modalComponentData = {
  dialog: {
    name: 'Dialog',
    description: 'A focused task in a native modal, with the page behind it kept inert.',
    code: `<Dialog>\n  <DialogTrigger>Edit project</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Edit project</DialogTitle>\n      <DialogDescription>Update your project details.</DialogDescription>\n    </DialogHeader>\n    <DialogBody>Project fields go here.</DialogBody>\n    <DialogFooter><DialogClose>Cancel</DialogClose></DialogFooter>\n  </DialogContent>\n</Dialog>`,
    props: [
      [
        'Root: open / defaultOpen / onOpenChange',
        'boolean / boolean / (open: boolean) => void',
        'uncontrolled, closed',
      ],
      ['Content: size', 'sm (400px) | md (512px) | lg (640px)', 'md'],
      [
        'Content: initialFocusRef / returnFocusRef',
        'RefObject<HTMLElement | null>',
        'native initial focus / invoker',
      ],
      ['Content: dismissOnOutside', 'boolean', 'true'],
      [
        'Content: onCancel / onClose',
        'native dialog events',
        'Escape requests close; close mirrors native state',
      ],
      ['Trigger / Close', 'ButtonProps, native button attributes/ref', 'primary / secondary'],
    ] as [string, string, string][],
    accessibility:
      'Use for a task that warrants interruption; ordinary inline content should remain inline. Content is a native dialog opened with showModal(), not an open attribute or custom overlay. Provide one DialogTitle (or aria-label/aria-labelledby), an explicit close action, and optionally one short DialogDescription. Set aria-describedby="" for structured long content and focus a heading through initialFocusRef. The browser supplies top-layer modality and inert background; antiflex loops Tab/Shift+Tab, locks page scroll, and restores a connected visible invoker or returnFocusRef. Escape requests closing; preventDefault in onCancel cancels that request. Backdrop closing requires a pointer press and release outside; drags starting inside do not dismiss. Controlled open remains consumer-owned; ignoring onOpenChange keeps the modal open. Native method="dialog" forms and ref.close() request synchronization; controlled refusal reopens. Content stays mounted when closed, so fields persist unless the application resets them. Root is a provider without DOM/ref; Content ref targets HTMLDialogElement, Title h2, Description p, and layout parts divs. Do not pass open/id/role directly to Content, add positive tabindex, nest interactive triggers, or render multiple titles/descriptions per root. Nest complete roots for stacked dialogs. Modern browsers with native dialog support are required; no legacy polyfill or nonmodal mode is included.',
  },
  'alert-dialog': {
    name: 'Alert Dialog',
    description: 'An important confirmation that waits for an explicit response.',
    code: `<AlertDialog>\n  <AlertDialogTrigger variant="danger">Archive project</AlertDialogTrigger>\n  <AlertDialogContent size="sm">\n    <AlertDialogHeader>\n      <AlertDialogTitle>Archive this project?</AlertDialogTitle>\n      <AlertDialogDescription>You can restore it later.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Keep project</AlertDialogCancel>\n      <AlertDialogAction onClick={archive}>Archive project</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
    props: [
      [
        'Root: open / defaultOpen / onOpenChange',
        'boolean / boolean / (open: boolean) => void',
        'uncontrolled, closed',
      ],
      ['Content: size', 'sm | md | lg', 'md'],
      [
        'Content: initialFocusRef / returnFocusRef',
        'RefObject<HTMLElement | null>',
        'first enabled Cancel / invoker',
      ],
      ['Cancel / Action', 'ButtonProps and native button refs', 'secondary / danger'],
      ['Content: dismissOnOutside', 'ignored for alert dialogs', 'always false'],
    ] as [string, string, string][],
    accessibility:
      'Use a native modal with role=alertdialog for a brief important message that requires a response. Provide one visible AlertDialogTitle, one AlertDialogDescription (or explicit aria-describedby), and clearly named Cancel and Action buttons. Focus starts on the first enabled Cancel unless initialFocusRef deliberately overrides it. Backdrop interaction never dismisses; Escape cancels through onOpenChange unless onCancel prevents it. Action and Cancel request closing after their click handler; preventDefault to keep the dialog open for validation or an asynchronous operation, then close controlled state on success. Async/network work belongs to the application; disabled/loading buttons alone do not block Escape. All Dialog modality, scroll, focus-return, controlled-state, nesting, and ref contracts also apply. If the original invoker becomes disabled or disappears, supply returnFocusRef for the next logical workflow target. The demonstration archives only local sample state and provides a restore action.',
  },
};
