export const toastComponentData = {
  toast: {
    name: 'Toast',
    description:
      'Brief feedback with deliberate timing, accessible announcements, and recoverable actions.',
    code: `<ToastProvider>\n  <ProjectActions />\n  <ToastViewport />\n</ToastProvider>\n\nfunction ProjectActions() {\n  const { toast } = useToast()\n  return <Button onClick={() => toast({\n    title: 'Project saved',\n    description: 'Your local changes are ready.',\n    variant: 'success',\n  })}>Save project</Button>\n}`,
    props: [
      ['ToastProvider: defaultDuration', 'number (ms); 0 persists', '6000'],
      [
        'ToastProvider: maxVisible / maxToasts',
        'number; bounded to 1–5 / 1–100',
        '3 / 50; capacity is at least maxVisible',
      ],
      [
        'useToast: toast(options)',
        'ToastOptions → string | null',
        'appends or replaces explicit ID; null for invalid input/full queue',
      ],
      [
        'useToast: update / dismiss / dismissAll',
        '(id, patch) → boolean / (id) → void / () → void',
        'updates reset remaining time; dismissals are explicit',
      ],
      [
        'ToastOptions: title / description / variant',
        'string / string / neutral | success | warning | danger',
        'title required / optional / neutral',
      ],
      [
        'ToastOptions: duration / priority',
        'number ≥ 0 / polite | assertive',
        'actions/warning/danger persist; polite announcements',
      ],
      [
        'ToastOptions: action',
        '{label, onAction, errorMessage?} | null',
        'action success dismisses; false keeps open; rejection enables retry',
      ],
      [
        'ToastOptions: onDismiss',
        '(reason: ToastDismissReason) => void',
        'dismiss | timeout | action | clear | programmatic',
      ],
      [
        'ToastViewport: layout / position / label',
        'fixed | inline / top-start | top-end | bottom-start | bottom-end / string',
        'fixed / bottom-end / Notifications',
      ],
      [
        'Toast: title / description / variant / action / onDismiss',
        'native div attrs/ref; optional ReactNode action',
        'presentational group; no timer or live region',
      ],
    ] as [string, string, string][],
    accessibility:
      'Notifications never focus themselves. The provider keeps stable polite/status and assertive/alert announcers separate from the visible group to avoid duplicate speech; only visible new/updated messages are announced. Use assertive only for urgent information. Default success/information messages last 6000ms; warnings, errors and action messages persist unless you explicitly set duration. Set duration=0 or provider defaultDuration=0 to disable automatic expiry, and keep essential information elsewhere in the application. Timers start only when a queued message becomes visible, pause together on pointer hover, focus, hidden tab or window blur, and resume with their remaining time. Pending actions pause their own timer. Buttons have accessible names; Escape dismisses only while focus is inside this viewport and does not intercept page-wide Escape. Dismissing a focused notification moves focus to another notification control or its recorded origin; an action opening a dialog keeps the new focus. Use one Viewport per Provider. The viewport ref can support a visible Review notifications button; no global shortcut, swipe gesture, exit animation, or notification history is installed. Fixed layout uses a native manual popover in the top layer without a backdrop; inline layout stays in document flow. For actionable messages inside a native modal, put both provider and viewport inside that modal; outside content is inert. Native popover support is required for fixed layout. Provider state is local, not a cross-tab/global store. Display timing and action callbacks do not implement backend persistence or cancellation. Root/Provider have no DOM ref; Toast and Viewport forward div refs and native attributes. Actual assistive-technology announcements require manual screen-reader review in addition to automated checks.',
  },
};
