export const feedbackComponentData: Record<
  string,
  {
    name: string;
    description: string;
    code: string;
    props: [string, string, string][];
    accessibility: string;
  }
> = {
  alert: {
    name: 'Alert',
    description: 'Readable inline feedback, with urgency chosen by the application.',
    code: '<Alert variant="warning" title="Storage is almost full">\n  Remove unused files or change your plan.\n</Alert>',
    props: [
      ['title / children', 'ReactNode', 'title required'],
      ['variant', 'neutral | success | warning | danger', 'neutral'],
      ['icon', 'ReactNode', '—'],
      ['role', 'Native ARIA role', 'none'],
    ],
    accessibility:
      'A static message has no live role by default. Use role=status for a new non-urgent update or role=alert for an urgent error inserted after an action. Existing content is not guaranteed to announce merely by assigning a role. Keep explicit text, recovery actions, and meaningful link names. Icons are decorative. Ref targets the div.',
  },
  avatar: {
    name: 'Avatar',
    description: 'A compact identity tile with a stable fallback while an image loads or fails.',
    code: '<Avatar alt="Alex Morgan" src="/alex.jpg" fallback="AM" size="md" />',
    props: [
      ['alt', 'string', 'required'],
      ['src', 'string', '—'],
      ['fallback', 'ReactNode', 'initials from alt'],
      ['size', 'sm | md | lg', 'md'],
    ],
    accessibility:
      'The root span exposes one image name through alt. The nested image and fallback are decorative to avoid duplicate names. Missing, loading, or failed images show the fallback. Changing src allows another load attempt; changing alt updates the name. Ref targets the span, not the image. Place an Avatar inside a named link or button when the identity is interactive.',
  },
  breadcrumb: {
    name: 'Breadcrumb',
    description: 'A semantic trail of links to the current location.',
    code: '<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/docs">Docs</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>',
    props: [
      ['Breadcrumb', 'Native nav attributes', 'aria-label=Breadcrumb'],
      ['BreadcrumbList / BreadcrumbItem', 'Native ol / li attributes', '—'],
      ['BreadcrumbLink', 'Native anchor attributes', '—'],
      ['BreadcrumbPage', 'Native span attributes', 'aria-current=page'],
      ['BreadcrumbSeparator', 'Native li attributes', 'decorative chevron'],
    ],
    accessibility:
      'The nav has a name and an ordered list. Give multiple trails distinct names. BreadcrumbPage marks the current location without becoming an unnecessary link. Separators are hidden from assistive technology and flip in RTL. Links keep native keyboard, modified-click, and browser navigation. Do not put interactive controls inside a decorative separator.',
  },
  empty: {
    name: 'Empty',
    description: 'An empty state with a specific reason and a useful recovery action.',
    code: '<Empty title="No matching records" description="Try another search or clear the filters.">\n  <Button onClick={clearFilters}>Clear filters</Button>\n</Empty>',
    props: [
      ['title', 'ReactNode', 'required'],
      ['description / icon', 'ReactNode', '—'],
      ['children', 'ReactNode', 'recovery actions'],
    ],
    accessibility:
      'Empty provides static content, not a live announcement. Announce a result count through an application status region after filtering. Distinguish first use, no results, missing permission, and a failed request in your copy and actions. Icons are decorative; provide accessible action names. Ref targets the div.',
  },
  kbd: {
    name: 'Kbd',
    description: 'Describe keyboard input using native keyboard markup.',
    code: '<KbdGroup aria-label="Control plus K">\n  <Kbd>Ctrl</Kbd><span aria-hidden="true">+</span><Kbd>K</Kbd>\n</KbdGroup>',
    props: [
      ['Kbd', 'Native kbd attributes / ref', '—'],
      ['KbdGroup', 'Native span attributes / ref', '—'],
    ],
    accessibility:
      'Kbd is a label for a real shortcut, not a key handler or button. Spell out ambiguous symbols with an accessible label and hide redundant separators. Actual shortcuts must be implemented separately and must not hijack text input or browser commands. Keep platform-specific shortcut labels accurate.',
  },
  pagination: {
    name: 'Pagination',
    description: 'Composable links or native buttons for moving between pages.',
    code: '<Pagination aria-label="Project pages">\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious disabled href="?page=0" /></PaginationItem>\n    <PaginationItem><PaginationLink href="?page=1" isActive aria-label="Page 1">1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext href="?page=2" /></PaginationItem>\n  </PaginationContent>\n</Pagination>',
    props: [
      ['Pagination', 'Native nav attributes', 'aria-label=Pagination'],
      ['PaginationContent / PaginationItem', 'Native ul / li attributes', '—'],
      ['PaginationLink.isActive / disabled', 'boolean', 'false'],
      ['PaginationButton.isActive', 'boolean', 'false'],
      ['PaginationPrevious / PaginationNext', 'PaginationLinkProps', 'Previous / Next'],
      ['PaginationEllipsis', 'Native span attributes', 'More pages'],
    ],
    accessibility:
      'Active links/buttons expose aria-current=page. Disabled links omit href and leave the Tab sequence; disabled buttons use the native attribute. Use links for real destinations and PaginationButton for in-memory application state. Name numeric pages and the navigation. Ellipsis is non-interactive. The application owns page counts, range truncation, result announcements, and focus after fetching.',
  },
  progress: {
    name: 'Progress',
    description: 'A native progress indicator for measured or unknown completion.',
    code: '<Progress value={64} max={100} aria-label="Importing records" />\n<Progress aria-label="Preparing files" />',
    props: [
      ['value', 'number | undefined', 'undefined (indeterminate)'],
      ['max', 'number', '100'],
      ['size', 'sm | md | lg', 'md'],
    ],
    accessibility:
      'Provide aria-label, aria-labelledby, or an associated native Label. A missing/non-finite value is indeterminate. Finite values clamp between zero and max; invalid max falls back to 100. Native progress semantics expose the measured value. Progress is not a live region; announce meaningful milestones separately and use aria-busy on the region being updated. Reduced motion stops indeterminate animation. Ref targets HTMLProgressElement.',
  },
  spinner: {
    name: 'Spinner',
    description: 'A compact loading indicator, decorative unless it has a label.',
    code: '<Spinner label="Loading projects" size="md" />\n<Button loading>Save changes</Button>',
    props: [
      ['size', 'sm | md | lg', 'sm'],
      ['label', 'string', '— (decorative)'],
    ],
    accessibility:
      'Without a label, the span is aria-hidden. With a label it exposes status and hidden readable text. Avoid duplicate announcements beside an existing status message. Loading never steals focus. Reduced motion stops rotation. The shared Button uses the same indicator without adding a second name. Ref targets the outer span.',
  },
  tabs: {
    name: 'Tabs',
    description: 'Layered content with explicit selection, roving focus, and native buttons.',
    code: '<Tabs defaultValue="overview">\n  <TabsList aria-label="Project sections">\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="activity">Activity</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">Project summary</TabsContent>\n  <TabsContent value="activity">Recent changes</TabsContent>\n</Tabs>',
    props: [
      ['value / defaultValue', 'string', 'first enabled direct/composed trigger'],
      ['onValueChange', '(value: string) => void', '—'],
      ['orientation', 'horizontal | vertical', 'horizontal'],
      ['activationMode', 'automatic | manual', 'automatic'],
      ['TabsTrigger.value / TabsContent.value', 'matching unique string', 'required'],
      ['TabsTrigger.disabled', 'boolean', 'false'],
    ],
    accessibility:
      'Name TabsList. One enabled tab is in the Tab sequence. Horizontal Left/Right follows LTR/RTL, vertical Up/Down follows orientation, and Home/End move to endpoints; arrows wrap and skip disabled tabs. Automatic mode selects on focus; manual mode waits for Enter or Space. Panels keep matching generated IDs and remain mounted but hidden when inactive. Content is focusable by default; set tabIndex=-1 when its first content is already focusable. Keep values unique and stable. Rendered triggers are discovered through custom wrappers; supply defaultValue/value to choose the initial selection explicitly. onValueChange leaves controlled selection consumer-owned. Trigger/content IDs are internally owned.',
  },
  accordion: {
    name: 'Accordion',
    description: 'Stacked disclosure headings with single or multiple expanded panels.',
    code: '<Accordion type="single" defaultValue={["source"]} headingLevel={3}>\n  <AccordionItem value="source">\n    <AccordionTrigger>Can I edit the source?</AccordionTrigger>\n    <AccordionContent>Yes. Keep the source in your application.</AccordionContent>\n  </AccordionItem>\n</Accordion>',
    props: [
      ['type', 'single | multiple', 'single'],
      ['value / defaultValue', 'string[]', '[]'],
      ['onValueChange', '(value: string[]) => void', '—'],
      ['collapsible / disabled', 'boolean', 'true / false'],
      ['headingLevel', '2 | 3 | 4 | 5 | 6', '3'],
      ['AccordionItem.value / disabled', 'string / boolean', 'required / false'],
    ],
    accessibility:
      'Each native trigger is the only child of its heading and controls a stable panel ID. Choose a heading level appropriate to your document; do not put nested controls in trigger content. Enter/Space toggles, Tab visits all controls, and optional Up/Down/Home/End moves between enabled headings without including nested accordions. Single mode uses at most the first value. With collapsible=false the final open panel cannot close; initialize at least one enabled value. Panels remain mounted and hidden when closed; default content does not create excessive region landmarks. Native refs/attributes are forwarded. Trigger/content IDs are internally owned.',
  },
  collapsible: {
    name: 'Collapsible',
    description: 'Show or hide one supporting section with a linked native button.',
    code: '<Collapsible defaultOpen={false}>\n  <CollapsibleTrigger>Connection details</CollapsibleTrigger>\n  <CollapsibleContent>Optional connection guidance</CollapsibleContent>\n</Collapsible>',
    props: [
      ['open / defaultOpen', 'boolean', 'false'],
      ['onOpenChange', '(open: boolean) => void', '—'],
      ['disabled', 'boolean', 'false'],
      [
        'CollapsibleTrigger / CollapsibleContent',
        'Native button / div attributes',
        'generated relation IDs',
      ],
    ],
    accessibility:
      'Enter and Space activate the native trigger. aria-expanded and aria-controls identify the state and panel. Hidden content is removed from the accessibility tree and Tab sequence while remaining mounted. Closing from within the panel restores focus to the trigger. A disabled root disables activation, not the visibility chosen by controlled state. Trigger/content IDs are internally owned; the root id can supply the ID prefix. Do not hide essential content without a discoverable trigger.',
  },
  toggle: {
    name: 'Toggle',
    description: 'A stable button that expresses an on/off choice with aria-pressed.',
    code: '<Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">\n  <BoldIcon aria-hidden="true" />\n</Toggle>',
    props: [
      ['pressed / defaultPressed', 'boolean', 'false'],
      ['onPressedChange', '(pressed: boolean) => void', '—'],
      ['variant', 'default | outline', 'default'],
      ['size', 'sm | md | lg', 'md'],
      ['disabled', 'boolean', 'false'],
    ],
    accessibility:
      'Use a stable label such as Bold rather than changing it to Unbold. Native Enter/Space toggles pressed state; disabled prevents activation. The default type is button and the control does not represent a submitted form field. Use Checkbox, RadioGroup, or Switch for named form values/settings. onClick can preventDefault to cancel the state change. Refs target the native button; controlled state remains consumer-owned.',
  },
  'toggle-group': {
    name: 'Toggle Group',
    description: 'Related pressed buttons, with independent or exclusive selection.',
    code: '<ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Text formatting">\n  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>\n  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>\n</ToggleGroup>',
    props: [
      ['type', 'single | multiple', 'single'],
      ['value / defaultValue', 'string[]', '[]'],
      ['onValueChange', '(value: string[]) => void', '—'],
      ['orientation / loop', 'horizontal | vertical / boolean', 'horizontal / true'],
      ['variant / size', 'default | outline / sm | md | lg', 'outline / md'],
      ['disabled / item.disabled', 'boolean', 'false'],
    ],
    accessibility:
      'Name the group and each icon-only button. Items use aria-pressed in a named group, not radio semantics. A single mode can have zero or one pressed item; multiple mode permits independent choices. Arrows follow orientation and LTR/RTL, skip disabled items, and move focus without changing selection. Home/End moves to endpoints. Enter/Space changes the focused value. One item is a Tab stop, preferring the first enabled selected value when the group is re-entered. Values are strings in an array in both modes. Keep item values unique and stable. Rendered items inside custom wrappers participate in the same keyboard collection. Group choices are not form inputs.',
  },
  typography: {
    name: 'Typography',
    description: 'A CSS recipe for semantic text, with a constrained reading measure.',
    code: '<Typography size="sm">\n  <h2>Workspace guidelines</h2>\n  <p>Keep component names <strong>consistent</strong>.</p>\n  <ul><li>Start from shared tokens.</li><li>Document decisions.</li></ul>\n</Typography>',
    props: [
      ['size', 'sm | md', 'md'],
      ['children', 'Semantic HTML', '—'],
    ],
    accessibility:
      'Typography styles content; the author chooses heading order, list structure, link meaning, and alternative text. It does not create headings or regions automatically. Place scrollable code blocks in the Tab sequence with a meaningful label when needed. Long content wraps; preformatted content scrolls. Ref targets the wrapper div. Nested Typography wrappers are unnecessary.',
  },
  'aspect-ratio': {
    name: 'Aspect Ratio',
    description: 'Reserve predictable media geometry without prescribing its content.',
    code: '<AspectRatio ratio={16 / 9}>\n  <img src="/project-preview.jpg" alt="Project settings preview" />\n</AspectRatio>',
    props: [
      ['ratio', 'positive finite number', '16 / 9'],
      ['children / style', 'Native div content / CSSProperties', '—'],
    ],
    accessibility:
      'The wrapper is presentational and forwards native div attributes/ref. Give images meaningful alt, video captions, and embeds an accessible title. Invalid ratios fall back to 16:9. The component uses native CSS aspect-ratio and object-fit for direct image/video children; explicit heights or padding can override the resulting geometry. It clips overflow, so keep focusable overlay controls inside its visible bounds.',
  },
};
