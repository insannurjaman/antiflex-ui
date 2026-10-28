import { workspaceComponentData } from './workspace-component-data';
import { toastComponentData } from './toast-component-data';
import { menuComponentData } from './menu-component-data';
import { floatingComponentData } from './floating-component-data';
import { panelComponentData } from './panel-component-data';
import { modalComponentData } from './modal-component-data';
import { feedbackComponentData } from './feedback-component-data';
export const componentData: Record<
  string,
  {
    name: string;
    description: string;
    code: string;
    props: [string, string, string][];
    accessibility: string;
  }
> = {
  ...workspaceComponentData,
  ...toastComponentData,
  ...menuComponentData,
  ...panelComponentData,
  ...floatingComponentData,
  ...feedbackComponentData,
  ...modalComponentData,
  button: {
    name: 'Button',
    description: 'A clear action, with the right emphasis. Native behavior in every state.',
    code: `<Button variant="primary" size="md" loading={saving}>\n  Save changes\n</Button>`,
    props: [
      ['variant', 'primary | secondary | ghost | danger', 'primary'],
      ['size', 'sm | md | lg', 'md'],
      ['loading', 'boolean', 'false'],
      ['disabled', 'boolean', 'false'],
    ],
    accessibility:
      'Provide an accessible name. Loading disables activation and sets aria-busy. Icon-only buttons need aria-label.',
  },
  'text-field': {
    name: 'TextField',
    description: 'A complete text input. Label, hint, validation, and a comfortable focus state.',
    code: `<TextField\n  label="Project name"\n  value={name}\n  onChange={(event) => setName(event.target.value)}\n  description="Choose a name your team will recognize."\n/>`,
    props: [
      ['label', 'string', 'required'],
      ['size', 'sm | md | lg', 'md'],
      ['description / error', 'string', '—'],
      ['hideLabel', 'boolean', 'false'],
      ['leading', 'ReactNode', '—'],
    ],
    accessibility:
      'The label remains accessible when visually hidden. Errors associate with the input and set aria-invalid. Native input attributes and refs are forwarded.',
  },
  badge: {
    name: 'Badge',
    description: 'A compact label for status and classification. Color reinforces the meaning.',
    code: `<Badge variant="success">Active</Badge>\n<Badge variant="warning">In review</Badge>`,
    props: [
      ['variant', 'neutral | accent | success | warning | danger', 'neutral'],
      ['size', 'sm | md', 'md'],
    ],
    accessibility:
      'Always include meaningful text. A badge is a label, not an interactive control. Announce status changes with a live region in the application.',
  },
  card: {
    name: 'Card',
    description: 'A quiet boundary for related content, with consistent spacing.',
    code: `<Card padding="md" variant="outline">\n  <h3>Workspace</h3>\n  <p>Your projects, together.</p>\n</Card>`,
    props: [
      ['variant', 'outline | subtle', 'outline'],
      ['padding', 'none | sm | md | lg', 'md'],
    ],
    accessibility:
      'Card renders a div. Supply headings and meaningful structure inside it. Use actual links or buttons for actions.',
  },
  separator: {
    name: 'Separator',
    description: 'Give adjacent groups a little distance and a clear boundary.',
    code: `<Separator />\n<Separator decorative={false} orientation="horizontal" />`,
    props: [
      ['orientation', 'horizontal | vertical', 'horizontal'],
      ['decorative', 'boolean', 'true'],
    ],
    accessibility:
      'Decorative separators are presentational. Set decorative=false when the separator communicates a meaningful structural division.',
  },
  skeleton: {
    name: 'Skeleton',
    description: 'A measured placeholder that preserves layout while content loads.',
    code: `<div role="status" aria-label="Loading workspace">\n  <Skeleton style={{ width: 160, height: 16 }} />\n</div>`,
    props: [
      ['className', 'string', '—'],
      ['style', 'CSSProperties', '—'],
    ],
    accessibility:
      'Skeleton is aria-hidden. Put a loading message on its container. Animation respects prefers-reduced-motion.',
  },
  table: {
    name: 'Table',
    description:
      'Semantic structure for rows and columns. Your application owns the data behavior.',
    code: `<Table>\n  <TableCaption>Sample projects</TableCaption>\n  <TableHeader>\n    <TableRow><TableHead>Project</TableHead></TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow><TableCell>Atlas</TableCell></TableRow>\n  </TableBody>\n</Table>`,
    props: [
      ['Table', 'Native table attributes + ref', '—'],
      ['TableHead', 'Native th attributes + ref', 'scope="col"'],
      ['TableCell', 'Native td attributes + ref', '—'],
      ['Parts', 'Header, Body, Row, Head, Cell, Caption', '—'],
    ],
    accessibility:
      'Use a caption and column or row headers. Put a native button in sortable headers and set aria-sort on the th. Wrap wide tables in a scrollable region.',
  },
  'app-shell': {
    name: 'AppShell',
    description: 'A responsive frame for navigation, workspace context, and your primary task.',
    code: `<AppShell\n  header={<strong>Workspace</strong>}\n  sidebar={<nav aria-label="Workspace">...</nav>}\n>\n  <h1>Overview</h1>\n</AppShell>`,
    props: [
      ['header', 'ReactNode', 'required'],
      ['sidebar', 'ReactNode', 'required'],
      ['navigationLayout', 'sidebar | top', 'sidebar'],
      ['navigationLabel', 'string', 'Workspace navigation'],
      ['contentAs / mainId', 'main | div / string', 'main / main-content'],
      ['children', 'ReactNode', '—'],
    ],
    accessibility:
      'The mobile toggle exposes aria-expanded and aria-controls. Escape closes navigation and returns focus. Navigation links close the disclosure. Use contentAs="div" and a unique mainId when embedding a specimen inside an existing main landmark.',
  },

  input: {
    name: 'Input',
    description: 'A composable native input with shared sizes and field associations.',
    code: '<Field label="Project name" required>\n  <Input name="project" autoComplete="organization" />\n</Field>',
    props: [
      ['size', 'sm | md | lg', 'md'],
      ['type', 'Native input type', 'text'],
      ['value / defaultValue', 'Native input value', '\u2014'],
    ],
    accessibility:
      'Use Field or Label to give the input a name. Field connects help/error text and required state. Native validation, autocomplete, form attributes, events, and the input ref remain available.',
  },
  label: {
    name: 'Label',
    description: 'A visible, clickable name for a native form control.',
    code: '<Label htmlFor="workspace-name" required>Workspace name</Label>\n<Input id="workspace-name" required />',
    props: [
      ['htmlFor', 'string', '\u2014'],
      ['required', 'boolean (visual indicator)', 'false'],
    ],
    accessibility:
      'Connect htmlFor to the control id. The required marker is visual; set required on the control or its Field as well. Labels support native attributes and a label ref.',
  },
  field: {
    name: 'Field',
    description: 'Compose one control with its label, help, validation, and required state.',
    code: '<Field label="Work email" description="Use your work address." error={error} required>\n  <Input name="email" type="email" />\n</Field>',
    props: [
      ['label', 'ReactNode', 'required'],
      ['controlId', 'string', 'generated'],
      ['description / error', 'ReactNode', '\u2014'],
      ['required / hideLabel', 'boolean', 'false'],
      ['Parts', 'FieldSet, FieldLegend', '\u2014'],
    ],
    accessibility:
      'Place one antiflex control inside Field. It inherits id, required, aria-describedby, and aria-invalid. An explicit native/antiflex child id is used by the label, including inside InputGroup; otherwise controlId or a generated id is used. Custom controls hidden behind your own components should share Field.controlId. Explicit aria-describedby is preserved. Use FieldSet and FieldLegend for related controls. Errors associate with the control; your form owns validation and announcement.',
  },
  textarea: {
    name: 'Textarea',
    description: 'A resizable native text area for longer answers.',
    code: '<Field label="Project brief" description="Up to 500 characters.">\n  <Textarea name="brief" rows={4} maxLength={500} />\n</Field>',
    props: [
      ['size', 'sm | md | lg', 'md'],
      ['rows', 'number', '4'],
      ['value / defaultValue', 'string', '\u2014'],
    ],
    accessibility:
      'Provide a visible label via Field or Label. Required, invalid, description, disabled, readOnly, maxlength, native events, and textarea refs are supported. Vertical resizing stays available.',
  },
  'native-select': {
    name: 'Native Select',
    description: 'A styled browser select, with familiar keyboard and mobile behavior.',
    code: '<Field label="Timezone">\n  <NativeSelect name="timezone" defaultValue="Asia/Jakarta">\n    <option value="Asia/Jakarta">Jakarta (UTC+7)</option>\n    <option value="UTC">UTC</option>\n  </NativeSelect>\n</Field>',
    props: [
      ['size', 'sm | md | lg', 'md'],
      ['value / defaultValue', 'Native select value', '\u2014'],
      ['children', 'option / optgroup', 'required'],
    ],
    accessibility:
      'Uses a native select; keyboard navigation and mobile pickers follow the browser. Field supplies the label and help. Native form, required, disabled, multiple, events, and select refs are supported. The size prop controls visual size rather than native listbox row count.',
  },
  checkbox: {
    name: 'Checkbox',
    description: 'An independent native choice, including a mixed selection state.',
    code: '<div className="af-choice">\n  <Checkbox id="updates" name="updates" defaultChecked />\n  <Label htmlFor="updates">Email me product updates</Label>\n</div>',
    props: [
      ['size', 'sm | md | lg', 'md'],
      ['checked / defaultChecked', 'boolean', '\u2014'],
      ['indeterminate', 'boolean', 'false'],
    ],
    accessibility:
      'Space toggles the native input. Use Label or Field for its name. indeterminate sets the DOM mixed state; onChange receives the native checked value. Only checked controls submit a value. A controlled parent owns its checked/indeterminate reset state. Native input attributes and refs remain available.',
  },
  'radio-group': {
    name: 'Radio Group',
    description: 'One choice from a named set, using native radios and a fieldset.',
    code: '<RadioGroup label="Visibility" name="visibility" defaultValue="team"\n  options={[{ value: "team", label: "Team" }, { value: "private", label: "Private" }]}\n/>',
    props: [
      ['label / options', 'ReactNode / option[]', 'required'],
      ['value / defaultValue', 'string', '\u2014'],
      ['onValueChange', '(value: string) => void', '\u2014'],
      ['size', 'sm | md | lg', 'md'],
      ['orientation', 'horizontal | vertical', 'vertical'],
      ['description / error', 'ReactNode', '\u2014'],
      ['required / disabled', 'boolean', 'false'],
    ],
    accessibility:
      'A native fieldset/legend names the group. Same-name native radios provide arrow-key navigation, a single selection, form submission, and reset. Disabled options are skipped. option.description provides supporting visible text. Controlled value takes precedence over defaultValue; reset controlled state in the application. Ref points to the fieldset.',
  },
  switch: {
    name: 'Switch',
    description: 'A binary setting with native checkbox behavior and switch semantics.',
    code: '<div className="af-choice">\n  <Switch id="notifications" name="notifications" defaultChecked />\n  <Label htmlFor="notifications">Desktop notifications</Label>\n</div>',
    props: [
      ['size', 'sm | md | lg', 'md'],
      ['checked / defaultChecked', 'boolean', '\u2014'],
      ['onChange', 'ChangeEventHandler<HTMLInputElement>', '\u2014'],
    ],
    accessibility:
      'Provide a stable label that does not change when toggled. Space changes the native checked state. The underlying checkbox exposes role=switch, participates in forms and reset, and forwards its input ref. The unchecked value is absent from FormData. Disabled controls cannot be activated.',
  },
  'button-group': {
    name: 'Button Group',
    description: 'Related buttons share a boundary while keeping their native behavior.',
    code: '<ButtonGroup aria-label="Document actions">\n  <Button variant="secondary">Save</Button>\n  <Button variant="secondary">Save a copy</Button>\n</ButtonGroup>',
    props: [
      ['orientation', 'horizontal | vertical', 'horizontal'],
      ['aria-label / aria-labelledby', 'Accessible group name', 'required for meaningful groups'],
    ],
    accessibility:
      'Use an accessible group name. Each button retains its normal Tab stop, focus, disabled state, and click behavior. This is a group of actions, not a toolbar or radio group; it does not invent arrow-key navigation or selection.',
  },
  'input-group': {
    name: 'Input Group',
    description: 'Combine one input with a prefix, suffix, or adjacent action.',
    code: '<Field label="Website">\n  <InputGroup>\n    <InputGroupAddon id="website-prefix">https://</InputGroupAddon>\n    <Input name="website" aria-describedby="website-prefix" />\n    <InputGroupAddon align="end">.com</InputGroupAddon>\n  </InputGroup>\n</Field>',
    props: [
      ['size', 'sm | md | lg', 'md'],
      ['invalid', 'boolean', 'false'],
      ['InputGroupAddon.align', 'start | end', 'start'],
    ],
    accessibility:
      'The input still needs a label. Associate meaningful addon text using aria-describedby; mark purely decorative icons aria-hidden. Adjacent Button children retain separate names and focus. Use one Input directly inside the group. Logical start/end placement supports RTL.',
  },
};
