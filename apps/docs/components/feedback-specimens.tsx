'use client';
import { useState } from 'react';
import {
  Alert,
  Avatar,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Empty,
  Kbd,
  KbdGroup,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Progress,
  Spinner,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Typography,
  AspectRatio,
  Button,
  Badge,
  Field,
  Input,
} from '@antiflex/ui';
import {
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconSearch,
  IconFolder,
  IconLock,
  IconBold,
  IconItalic,
  IconUnderline,
  IconChevronDown,
} from '@tabler/icons-react';

export function TabsSpecimen({
  manual = false,
  vertical = false,
}: {
  manual?: boolean;
  vertical?: boolean;
}) {
  const name = manual ? 'Manual sections' : vertical ? 'Vertical sections' : 'Workspace sections';
  return (
    <Tabs
      defaultValue="overview"
      activationMode={manual ? 'manual' : 'automatic'}
      orientation={vertical ? 'vertical' : 'horizontal'}
    >
      <TabsList aria-label={name}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <strong>Workspace overview</strong>
        <p>Three projects are ready for review. Sample data.</p>
      </TabsContent>
      <TabsContent value="activity">
        <strong>Recent activity</strong>
        <p>Alex updated the shared component library.</p>
        <a href="/docs/feedback#keyboard-guidance">Keyboard guidance</a>
      </TabsContent>
      <TabsContent value="billing">Billing is unavailable in this example.</TabsContent>
      <TabsContent value="settings">
        <Field label="Workspace display name">
          <Input defaultValue="Orbit" />
        </Field>
      </TabsContent>
    </Tabs>
  );
}
export function AccordionSpecimen({
  multiple = false,
  locked = false,
}: {
  multiple?: boolean;
  locked?: boolean;
}) {
  return (
    <Accordion
      type={multiple ? 'multiple' : 'single'}
      defaultValue={['license']}
      collapsible={!locked}
      headingLevel={3}
      aria-label={
        multiple ? 'Multiple disclosures' : locked ? 'Required disclosure' : 'Foundation questions'
      }
    >
      <AccordionItem value="license">
        <AccordionTrigger>Can I use the core commercially?</AccordionTrigger>
        <AccordionContent>
          The core is MIT licensed. Separately licensed Pro assets are a different product.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="source">
        <AccordionTrigger>Can I edit the source?</AccordionTrigger>
        <AccordionContent>
          Yes. Components are copied into your application so your team owns its changes.{' '}
          <a href="/docs/installation">Read installation guidance</a>.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="roadmap" disabled>
        <AccordionTrigger>Enterprise service (unavailable)</AccordionTrigger>
        <AccordionContent>No service is offered by this demonstration.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
export function ToggleGroupSpecimen({
  multiple = false,
  vertical = false,
}: {
  multiple?: boolean;
  vertical?: boolean;
}) {
  const [value, setValue] = useState(multiple ? ['bold'] : ['comfortable']);
  return (
    <div className="feedback-stack">
      <ToggleGroup
        type={multiple ? 'multiple' : 'single'}
        value={value}
        onValueChange={setValue}
        orientation={vertical ? 'vertical' : 'horizontal'}
        aria-label={
          multiple ? 'Text formatting' : vertical ? 'Vertical density' : 'Content density'
        }
      >
        {multiple ? (
          <>
            <ToggleGroupItem value="bold" aria-label="Bold">
              <IconBold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <IconItalic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <IconUnderline />
            </ToggleGroupItem>
          </>
        ) : (
          <>
            <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
            <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
            <ToggleGroupItem value="spacious" disabled>
              Spacious
            </ToggleGroupItem>
          </>
        )}
      </ToggleGroup>
      <span className="feedback-caption">Selected: {value.length ? value.join(', ') : 'none'}</span>
    </div>
  );
}
export function PaginationSpecimen() {
  const [page, setPage] = useState(1);
  return (
    <div className="feedback-stack">
      <Pagination aria-label="Sample records pages">
        <PaginationContent>
          <PaginationItem>
            <PaginationButton
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </PaginationButton>
          </PaginationItem>
          {[1, 2, 3].map((n) => (
            <PaginationItem key={n}>
              <PaginationButton
                aria-label={`Page ${n}`}
                isActive={page === n}
                onClick={() => setPage(n)}
              >
                {n}
              </PaginationButton>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationButton
              aria-label="Next page"
              disabled={page === 3}
              onClick={() => setPage(page + 1)}
            >
              Next
            </PaginationButton>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p role="status" className="feedback-caption">
        Showing sample page {page} of 3.
      </p>
    </div>
  );
}
export function FeedbackComponentDemo({ name }: { name: string }) {
  const [pressed, setPressed] = useState(false);
  const [open, setOpen] = useState(false);
  switch (name) {
    case 'alert':
      return (
        <div className="feedback-stack">
          {(['neutral', 'success', 'warning', 'danger'] as const).map((variant) => (
            <Alert
              key={variant}
              variant={variant}
              title={
                {
                  neutral: 'Review before publishing',
                  success: 'Changes saved',
                  warning: 'Storage is almost full',
                  danger: 'Changes could not be saved',
                }[variant]
              }
              icon={
                variant === 'success' ? (
                  <IconCircleCheck />
                ) : variant === 'neutral' ? (
                  <IconInfoCircle />
                ) : (
                  <IconAlertTriangle />
                )
              }
            >
              {variant === 'danger'
                ? 'Check your connection and try again.'
                : 'This is illustrative feedback, not a live service.'}
            </Alert>
          ))}
        </div>
      );
    case 'avatar':
      return (
        <div className="feedback-inline">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Avatar key={size} size={size} alt="Alex Morgan" />
          ))}
          <Avatar src="/avatar-missing-example.png" alt="Sam Rivera" />
          <span className="feedback-caption">
            Initials remain visible if an image is missing or fails.
          </span>
        </div>
      );
    case 'breadcrumb':
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    case 'empty':
      return (
        <div className="feedback-empty-examples">
          <Empty
            title="No projects yet"
            description="Create your first project to give your team a shared workspace."
            icon={<IconFolder />}
          >
            <Button onClick={() => setPressed(true)}>
              {pressed ? 'Sample project created' : 'Create sample project'}
            </Button>
          </Empty>
          <Empty
            title="No matching records"
            description="Try another search or clear your filters."
            icon={<IconSearch />}
          >
            <Button variant="secondary" onClick={() => setOpen(!open)}>
              {open ? 'Filters cleared' : 'Clear sample filters'}
            </Button>
          </Empty>
          <Empty
            title="You need access"
            description="Ask your workspace owner for permission to see this section."
            icon={<IconLock />}
          />
          <Empty
            title="Could not load records"
            description="Your data is still safe. Check the connection and retry."
            icon={<IconAlertTriangle />}
          >
            <Button variant="secondary" onClick={() => setPressed(true)}>
              Try sample retry
            </Button>
          </Empty>
        </div>
      );
    case 'kbd':
      return (
        <div className="feedback-stack">
          <span>
            Open search{' '}
            <KbdGroup aria-label="Control plus K">
              <Kbd>Ctrl</Kbd>
              <span aria-hidden="true">+</span>
              <Kbd>K</Kbd>
            </KbdGroup>
          </span>
          <span>
            Move between tabs with <Kbd>ArrowLeft</Kbd> and <Kbd>ArrowRight</Kbd>.
          </span>
          <p className="feedback-caption">
            Kbd describes a shortcut; it does not install a key handler.
          </p>
        </div>
      );
    case 'pagination':
      return (
        <div className="feedback-stack">
          <PaginationSpecimen />
          <Pagination aria-label="Link pagination example">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious disabled href="?page=0" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive aria-label="Page 1" href="?page=1">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-label="Page 8" href="?page=8">
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="?page=2" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      );
    case 'progress':
      return (
        <div className="feedback-stack">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size}>
              <p className="feedback-caption">Importing sample records · 64%</p>
              <Progress value={64} size={size} aria-label={`Sample import ${size}`} />
            </div>
          ))}
          <div>
            <p className="feedback-caption">Preparing sample files · indeterminate</p>
            <Progress aria-label="Preparing files" />
          </div>
          <Progress value={200} max={100} aria-label="Complete import" />
        </div>
      );
    case 'spinner':
      return (
        <div className="feedback-stack">
          <div className="feedback-inline">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <span>Decorative indicators</span>
          </div>
          <div className="feedback-inline">
            <Spinner label="Loading sample records" />
            <span>Loading sample records</span>
          </div>
          <Button loading>Saving preferences</Button>
        </div>
      );
    case 'tabs':
      return (
        <div className="feedback-stack">
          <TabsSpecimen />
          <TabsSpecimen manual />
          <TabsSpecimen vertical />
        </div>
      );
    case 'accordion':
      return (
        <div className="feedback-stack">
          <AccordionSpecimen />
          <AccordionSpecimen multiple />
          <AccordionSpecimen locked />
        </div>
      );
    case 'collapsible':
      return (
        <div className="feedback-stack">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger>
              Advanced connection details <IconChevronDown size={16} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Field label="Connection label">
                <Input defaultValue="Development" />
              </Field>
              <p>Local demonstration. No connection is created.</p>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Close details from inside
              </Button>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible disabled>
            <CollapsibleTrigger>Unavailable details</CollapsibleTrigger>
            <CollapsibleContent>Unavailable.</CollapsibleContent>
          </Collapsible>
        </div>
      );
    case 'toggle':
      return (
        <div className="feedback-stack">
          <div className="feedback-inline">
            <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Bold">
              <IconBold />
            </Toggle>
            <Toggle variant="outline" defaultPressed aria-label="Italic">
              <IconItalic />
            </Toggle>
            <Toggle variant="outline" disabled>
              Unavailable
            </Toggle>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <Toggle key={size} size={size} variant="outline">
                {size}
              </Toggle>
            ))}
          </div>
          <span role="status" className="feedback-caption">
            Bold is {pressed ? 'on' : 'off'}.
          </span>
          <Button variant="secondary" size="sm" onClick={() => setPressed(false)}>
            Reset bold
          </Button>
        </div>
      );
    case 'toggle-group':
      return (
        <div className="feedback-stack">
          <ToggleGroupSpecimen />
          <ToggleGroupSpecimen multiple />
          <ToggleGroupSpecimen vertical />
        </div>
      );
    case 'typography':
      return (
        <Typography size="sm">
          <h3>Readable, by default.</h3>
          <p>
            Compose meaningful HTML and let the recipe handle spacing and type.{' '}
            <strong>Keep headings in order</strong> for your document.
          </p>
          <h4>A source your team can own</h4>
          <ul>
            <li>Shared tokens for light and dark themes.</li>
            <li>Native semantics and visible focus.</li>
          </ul>
          <blockquote>Design and code should speak the same language.</blockquote>
          <p>
            Use <code>data-theme</code> to change themes.{' '}
            <a href="/docs/foundations">Explore the foundations</a>.
          </p>
        </Typography>
      );
    case 'aspect-ratio':
      return (
        <div className="feedback-ratios">
          {[16 / 9, 1, 4 / 3].map((ratio, i) => (
            <div key={ratio}>
              <AspectRatio ratio={ratio}>
                <div
                  className="feedback-media"
                  role="img"
                  aria-label={`${['16 by 9', 'Square', '4 by 3'][i]} geometric media placeholder`}
                >
                  <svg aria-hidden="true" viewBox="0 0 160 100" fill="none">
                    <path d="M30 15h80l20 20v40l-20 20H30L10 75V35z" stroke="currentColor" />
                    <path d="M60 35h40v15H70v15h30v15H60L45 65V50z" fill="currentColor" />
                  </svg>
                </div>
              </AspectRatio>
              <p className="feedback-caption">{['16:9', '1:1', '4:3'][i]}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function FeedbackExample() {
  const [notice, setNotice] = useState(false);
  return (
    <div className="feedback-example">
      <Breadcrumb aria-label="Example location">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Workspace overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="feedback-example__header">
        <div className="feedback-inline">
          <Avatar alt="Alex Morgan" size="lg" />
          <div>
            <strong>Orbit workspace</strong>
            <p className="feedback-caption">Sample workspace · design and engineering</p>
          </div>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      <Alert title="A shared foundation" icon={<IconInfoCircle />}>
        Illustrative workspace data. Actions below update this page only.
      </Alert>
      <Tabs defaultValue="projects">
        <TabsList aria-label="Example workspace">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <div className="feedback-example__toolbar">
            <strong>Project list</strong>
            <ToggleGroup defaultValue={['comfortable']} aria-label="Example density">
              <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
              <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Empty
            icon={<IconFolder />}
            title={notice ? 'Sample project created' : 'Your first project starts here'}
            description={
              notice
                ? 'This demonstration changes only the visible state. No project is stored.'
                : 'Create a shared home for your components, decisions, and documentation.'
            }
          >
            <Button onClick={() => setNotice(!notice)}>
              {notice ? 'Reset example' : 'Create sample project'}
            </Button>
          </Empty>
          <PaginationSpecimen />
        </TabsContent>
        <TabsContent value="setup">
          <Typography size="sm">
            <h3>Prepare your workspace</h3>
            <p>Two of three illustrative steps are complete.</p>
          </Typography>
          <Progress value={2} max={3} aria-label="Workspace setup" />
          <Collapsible className="feedback-example__details">
            <CollapsibleTrigger>Show setup checklist</CollapsibleTrigger>
            <CollapsibleContent>
              <ul>
                <li>Choose a workspace name — complete.</li>
                <li>Explore the tokens — complete.</li>
                <li>Create your first project — next.</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </TabsContent>
        <TabsContent value="help">
          <AccordionSpecimen />
        </TabsContent>
      </Tabs>
    </div>
  );
}
