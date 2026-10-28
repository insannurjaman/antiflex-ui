export const workspaceComponentData: Record<
  string,
  {
    name: string;
    description: string;
    code: string;
    props: [string, string, string][];
    accessibility: string;
  }
> = {
  'hover-card': {
    name: 'Hover Card',
    description:
      'Supplementary context beside a real link, available through hover, focus or an explicit preview.',
    code: '<HoverCard>\n  <HoverCardTrigger href="/members/alex">Alex Morgan</HoverCardTrigger>\n  <HoverCardToggle aria-label="Preview Alex Morgan">Preview</HoverCardToggle>\n  <HoverCardContent>\n    <HoverCardTitle>Alex Morgan</HoverCardTitle>\n    <p>Product designer · Sample member</p>\n  </HoverCardContent>\n</HoverCard>',
    props: [
      [
        'open / defaultOpen / onOpenChange',
        'boolean / boolean / (boolean) => void',
        'uncontrolled / false',
      ],
      ['openDelay / closeDelay', 'milliseconds', '600 / 300'],
      [
        'Content: side / align',
        'top | right | bottom | left / start | center | end',
        'bottom / start',
      ],
      ['Content: sideOffset / collisionPadding', 'pixels', '8 / 8'],
    ],
    accessibility:
      'A supplementary read-only region; the anchor keeps its real href and essential information stays visible. Hover opens after 600ms, focus opens immediately, leaving both trigger/content closes after 300ms. Content can be hovered and text selected. Escape dismisses only the top floating layer without moving focus. HoverCardToggle provides explicit touch access. Root has no DOM ref; Trigger forwards an anchor ref, Toggle a button ref, Content a div ref, Title a heading ref. One named content region per root; supply Title or aria-label. Put modal compositions inside their dialog. Native popover support is required; do not put essential actions in the preview.',
  },
  menubar: {
    name: 'Menubar',
    description: 'Compact application commands with scoped menu keyboard navigation.',
    code: '<Menubar aria-label="Workspace commands">\n  <MenubarMenu value="file">\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem onSelect={createLocalProject}>New local project</MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>',
    props: [
      ['value / defaultValue / onValueChange', 'open menu key / (string) => void', "''"],
      ['MenubarMenu: value', 'unique non-empty string', 'required'],
      [
        'MenubarTrigger / Content',
        'native button / menu div attributes and refs',
        'same menu sizing as Dropdown Menu',
      ],
      [
        'Item / CheckboxItem / RadioItem / Sub',
        'original menu parts',
        'same selection contracts as Dropdown Menu',
      ],
    ],
    accessibility:
      'One roving Tab stop among enabled top-level triggers. Left/Right follow text direction; Home/End and buffered typeahead move among headings. Enter/Space or Down opens the first item; Up opens the last. While a menu is open, Left/Right changes root menus; nested submenu keys retain their own scope. Escape restores the trigger, Tab leaves the whole menubar, and checked/radio item behavior is shared with Dropdown Menu. Pointer hover switches headings only while a menu is already open. Disabled top-level triggers are skipped; disabled popup actions remain discoverable. Name the menubar. Controlled value is the open menu key; empty string closes it. Root forwards a div ref, trigger a button ref, content a div ref; Menu/Sub roots have no DOM element/ref. No global shortcut or hover-open submenu service is installed.',
  },
  'navigation-menu': {
    name: 'Navigation Menu',
    description: 'Responsive disclosure navigation with ordinary links and familiar Tab order.',
    code: '<NavigationMenu aria-label="Resources">\n  <NavigationMenuList>\n    <NavigationMenuItem value="learn">\n      <NavigationMenuTrigger>Learn</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>',
    props: [
      ['value / defaultValue / onValueChange', 'open item key / (string) => void', "''"],
      ['NavigationMenuItem: value', 'unique non-empty string', 'required'],
      [
        'Content: side / align / sideOffset / collisionPadding',
        'native floating placement',
        'bottom / start / 8 / 8',
      ],
      ['Link: href / aria-current', 'native anchor attributes', 'ordinary link semantics'],
    ],
    accessibility:
      'Uses a named nav, a real list and ordinary anchors, with disclosure buttons rather than menu roles. Every top-level button/link remains in normal Tab order; open links participate in that order. Enter/Space toggles; optional Down/Up opens and focuses the first/last panel link. Escape returns to the controlling button; moving focus or pointer outside dismisses. Link activation preserves native navigation and modifier keys. One open item per root; controlled value is its key and empty string closes it. Panels flip/clamp in the native top layer and reflow on narrow screens. Root forwards a nav ref; List ul, Item li, Trigger button, Content div and Link anchor refs. No hover-open behavior or mobile drawer is implied.',
  },
  select: {
    name: 'Select',
    description: 'A single-choice listbox with keyboard exploration and native form submission.',
    code: "<Field label=\"Priority\">\n  <Select name=\"priority\" value={priority} onValueChange={setPriority}\n    options={[{ value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' }]} />\n</Field>",
    props: [
      [
        'options',
        'SelectOption[]: value, label, description?, disabled?, group?, keywords?',
        'required',
      ],
      ['value / defaultValue / onValueChange', 'string / string / (string) => void', "''"],
      ['open / defaultOpen / onOpenChange', 'boolean / boolean / (boolean) => void', 'false'],
      ['size / placeholder', 'sm | md | lg / string', 'md / Choose an option'],
      ['name / form / required / disabled / readOnly', 'native form contracts', 'optional / false'],
      [
        'loading / loadingMessage / emptyMessage',
        'boolean / string / string',
        'false / Loading options… / No options found.',
      ],
    ],
    accessibility:
      'Select-only combobox with an original listbox. Focus stays on the button; aria-activedescendant identifies the explored option. Arrow keys open/navigate enabled options, Home/End explore edges, buffered typeahead finds labels, Enter/Space commits. Escape/Tab close without committing an explored option. A visually hidden native select submits the committed value, supports required validation, autofill change and form reset; validation focuses the visible control and shows an error. Controlled values remain consumer-owned during reset. Label via Field, aria-label or aria-labelledby. Options require unique non-empty values and labels; disabled options cannot be selected. Only single selection, no virtualization or async fetching engine. Native button attributes/ref are forwarded; value/defaultValue/onValueChange belong to this component.',
  },
  combobox: {
    name: 'Combobox',
    description: 'Search named options without confusing typed text with a committed choice.',
    code: "<Field label=\"Reviewer\">\n  <Combobox name=\"reviewer\" value={reviewer} onValueChange={setReviewer}\n    options={[{ value: 'alex', label: 'Alex Morgan', keywords: ['design'] }]} />\n</Field>",
    props: [
      [
        'options',
        'ComboboxOption[]: value, label, description?, disabled?, group?, keywords?',
        'required',
      ],
      ['value / defaultValue / onValueChange', 'committed string value / (string) => void', "''"],
      ['onInputChange', '(query: string) => void', 'optional; query is local'],
      ['open / defaultOpen / onOpenChange', 'boolean / boolean / (boolean) => void', 'false'],
      [
        'size / name / form / required / disabled / readOnly',
        'shared native form and size contracts',
        'md / optional / false',
      ],
      ['loading / emptyMessage', 'boolean / string', 'false / No options found.'],
    ],
    accessibility:
      'Editable, discrete-value combobox: typing filters labels/keywords with case/diacritic normalization; arbitrary text is never submitted as a choice. DOM focus remains on the input and aria-activedescendant follows the enabled option. Arrow keys explore, Enter commits, Escape/blur restores the committed label, Tab leaves without selecting an uncommitted result. Clearing text clears the selected value. Native text-editing keys and IME composition are preserved. A hidden native select handles name/form, required validation and uncontrolled form reset. Provide a real label; loading/empty content is announced as an unavailable option. Disabled options do not activate. Controlled value belongs to the application; search text is local and onInputChange reports it. No multi-select, creatable values, virtualization or network fetching is supplied. Ref/native attributes target the text input.',
  },
  command: {
    name: 'Command',
    description: 'Search and run local actions, inline or inside an explicit dialog.',
    code: "<Command label=\"Search actions\" items={[\n  { value: 'new', label: 'Create local project', group: 'Projects', onSelect: createLocalProject },\n]} />\n\n<CommandDialog open={open} onOpenChange={setOpen}\n  label=\"Search actions\" items={actions} />",
    props: [
      [
        'items',
        'CommandItem[]: value, label, onSelect, group?, keywords?, disabled?, description?',
        'required',
      ],
      [
        'label / placeholder / emptyMessage',
        'string',
        'label required / Search commands… / No commands found.',
      ],
      ['loading / onAction', 'boolean / (value: string) => void', 'false / optional'],
      ['CommandItem: onSelect', '() => void | false', 'false keeps dialog open'],
      [
        'CommandDialog: open / onOpenChange',
        'boolean / (boolean) => void',
        'required controlled state',
      ],
      [
        'CommandDialog: title / description',
        'string',
        'Run a command / Search available actions in this workspace.',
      ],
    ],
    accessibility:
      'A searchable local command list uses a labeled combobox and listbox with grouped items. Arrow keys move the active action; Enter runs it, disabled actions never run, Escape clears an inline query. CommandDialog composes the original native Dialog; Escape closes it and focus returns to its explicit trigger. Item onSelect returns false to keep a dialog open; successful actions notify onAction. Caller owns side effects, errors, permissions and asynchronous work. No global keyboard shortcut is registered. Command forwards a div ref/native attributes; label names the search input. CommandDialog open/onOpenChange are controlled and its ref also targets the Command div, not a dialog element. Native form fields and free text are not the command result.',
  },
  calendar: {
    name: 'Calendar',
    description: 'A keyboard-navigable Gregorian month grid with date-only values.',
    code: '<Calendar value={date} onValueChange={setDate}\n  locale="id-ID" weekStartsOn={1}\n  min="2026-10-01" max="2027-12-31" today="2026-10-23" />',
    props: [
      ['value / defaultValue / onValueChange', 'YYYY-MM-DD / (string) => void', "''"],
      [
        'month / defaultMonth / onMonthChange',
        'YYYY-MM / (string) => void',
        'selected date or today',
      ],
      ['min / max', 'YYYY-MM-DD', 'optional'],
      ['disabled', 'boolean | (date: string) => boolean', 'false'],
      ['locale / weekStartsOn', 'Intl locale / 0–6 (Sunday–Saturday)', 'en-US / 0'],
      ['today', 'YYYY-MM-DD', 'current UTC date'],
    ],
    accessibility:
      'Single-date Gregorian grid with YYYY-MM-DD values and UTC arithmetic, preventing host timezone/DST offsets. Month is YYYY-MM; labels use Intl with locale and explicit weekStartsOn. One date button is in Tab order. Arrows move by day/week (horizontal keys respect RTL), Home/End moves within the week, Page Up/Down changes month, Shift adds year navigation, Enter/Space selects. Unavailable dates remain keyboard-discoverable with aria-disabled and cannot be selected. min/max clamp navigation; header controls respect month boundaries. Today has aria-current=date and the month heading announces changes. Disabled=true removes day buttons from Tab order. Controlled date/month and reset state are consumer-owned. Ref/native attributes target the div; standalone Calendar does not submit form data. UTC today is the default; pass a local date-only today when the application uses another time zone. Ranges, multiple months and alternate calendar systems are not included.',
  },
  'date-picker': {
    name: 'Date Picker',
    description: 'Choose a single date in context, with native form validation and reset.',
    code: '<Field label="Review date">\n  <DatePicker label="Review date" name="reviewDate" required\n    value={date} onValueChange={setDate}\n    min="2026-10-01" max="2027-12-31" />\n</Field>',
    props: [
      ['label', 'string', 'required'],
      ['value / defaultValue / onValueChange', 'YYYY-MM-DD / (string) => void', "''"],
      ['open / defaultOpen / onOpenChange', 'boolean / boolean / (boolean) => void', 'false'],
      ['min / max / isDateDisabled', 'ISO bounds / predicate', 'optional'],
      ['locale / weekStartsOn / today', 'Intl locale / 0–6 / ISO date', 'en-US / 0 / UTC today'],
      [
        'name / form / required / disabled / readOnly / clearable',
        'native form contracts / boolean',
        'optional / false / true (clearable)',
      ],
    ],
    accessibility:
      'A labeled button opens a non-modal Popover containing the original Calendar. Initial focus targets its active date; Escape/Cancel closes and returns focus, and selecting a day commits the YYYY-MM-DD value. Focus is not trapped; put the entire picker inside an active modal when composing there. Native date input submission handles name/form, min/max, required validation and uncontrolled reset; the visible trigger receives invalid focus and an error message. Clear date commits an empty value; required validation still applies. Controlled value/open remain consumer-owned. Ref/native button attributes target the trigger; label is required and its accessible name includes a formatted selected date. Locale formats labels, not submitted ISO values. Single dates only; no text-entry parser, date ranges or alternative calendar engine.',
  },
};
