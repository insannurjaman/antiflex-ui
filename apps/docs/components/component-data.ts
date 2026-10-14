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
      ['navigationLabel', 'string', 'Workspace navigation'],
      ['contentAs / mainId', 'main | div / string', 'main / main-content'],
      ['children', 'ReactNode', '—'],
    ],
    accessibility:
      'The mobile toggle exposes aria-expanded and aria-controls. Escape closes navigation and returns focus. Navigation links close the disclosure. Use contentAs="div" and a unique mainId when embedding a specimen inside an existing main landmark.',
  },
};
