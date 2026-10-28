'use client';
import { useMemo, useState, type FormEvent } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Field,
  Input,
  NativeSelect,
  TextField,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DatePicker,
  useToast,
} from '@antiflex/ui';
import {
  IconPlus,
  IconDownload,
  IconSearch,
  IconArrowUpRight,
  IconArrowDown,
  IconArrowUp,
  IconChevronLeft,
  IconChevronRight,
  IconLayoutBoard,
  IconList,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons-react';
import { useDemo, record, event, newId, download, type Customer, type Project } from './store';
import { PageHeading, Panel, StatStrip, Status, NoResults, NextLink } from './common';
import { money, dateLabel } from './catalog';
import { orders } from '../dashboard-data';
const customerCSV = (rows: Customer[]) =>
  [
    'Name,Email,Company,Plan,Status,Revenue',
    ...rows.map((c) =>
      [c.name, c.email, c.company, c.plan, c.status, c.revenue]
        .map((v) => '"' + String(v).replaceAll('"', '""') + '"')
        .join(','),
    ),
  ].join('\n');
export function CustomersPage() {
  const { state, setState } = useDemo();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [plan, setPlan] = useState('All plans');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'name' | 'revenue'>('name');
  const [asc, setAsc] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string>();
  const rows = useMemo(
    () =>
      state.customers
        .filter(
          (c) =>
            (status === 'All statuses' || c.status === status) &&
            (plan === 'All plans' || c.plan === plan) &&
            `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(query.toLowerCase()),
        )
        .sort(
          (a, b) =>
            (sort === 'name' ? a.name.localeCompare(b.name) : a.revenue - b.revenue) *
            (asc ? 1 : -1),
        ),
    [state.customers, query, status, plan, sort, asc],
  );
  const count = Math.max(1, Math.ceil(rows.length / 8)),
    current = Math.min(page, count);
  const customer = state.customers.find((c) => c.id === selected);
  const clear = () => {
    setQuery('');
    setStatus('All statuses');
    setPlan('All plans');
    setPage(1);
  };
  function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name')).trim(),
      email = String(f.get('email')).trim().toLowerCase();
    if (name.length < 2) {
      setError('Enter a name with at least two characters.');
      return;
    }
    if (state.customers.some((c) => c.email.toLowerCase() === email)) {
      setError('This email already belongs to a customer. Use a different email.');
      return;
    }
    const item: Customer = {
      id: newId('CUS'),
      name,
      email,
      company: String(f.get('company')).trim(),
      plan: f.get('plan') as Customer['plan'],
      status: 'Trial',
      revenue: 0,
      joined: '2026-10-28',
    };
    setState((s) => ({
      ...s,
      customers: [item, ...s.customers],
      activity: record(
        s,
        event(
          `${name} was added as a customer`,
          `${item.company || 'Independent customer'} started a ${item.plan} trial.`,
          'Customer',
        ),
      ),
    }));
    clear();
    setOpen(false);
    toast({
      title: 'Customer added',
      description: `${name} is now in this sample workspace.`,
      variant: 'success',
    });
  }
  return (
    <>
      <PageHeading
        title="Customers"
        description="Every relationship, with the details that matter."
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => download('orbit-customers.csv', customerCSV(rows), 'text/csv')}
            >
              <IconDownload size={16} />
              Export
            </Button>
            <Dialog
              open={open}
              onOpenChange={(v) => {
                setOpen(v);
                setError('');
              }}
            >
              <DialogTrigger>
                <IconPlus size={16} />
                Add customer
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={create}>
                  <DialogHeader>
                    <DialogTitle>Add a customer</DialogTitle>
                    <DialogDescription>
                      Create a sample record. No invitation or email will be sent.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody className="demo-form-stack">
                    <TextField
                      label="Full name"
                      pattern={String.raw`.*\S.*\S.*`}
                      name="name"
                      required
                      minLength={2}
                      maxLength={80}
                      placeholder="Jordan Ellis"
                    />
                    <TextField
                      label="Email address"
                      name="email"
                      type="email"
                      required
                      maxLength={120}
                      placeholder="jordan@example.com"
                      error={error || undefined}
                    />
                    <TextField
                      label="Company"
                      name="company"
                      maxLength={80}
                      placeholder="Company or studio"
                    />
                    <Field label="Starting plan">
                      <NativeSelect name="plan" defaultValue="pro">
                        <option value="starter">Starter</option>
                        <option value="pro">Pro</option>
                        <option value="business">Business</option>
                      </NativeSelect>
                    </Field>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <Button type="submit">Add customer</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </>
        }
      />
      <StatStrip
        items={[
          {
            label: 'Total customers',
            value: String(state.customers.length),
            note: 'Across the workspace',
          },
          {
            label: 'Active customers',
            value: String(state.customers.filter((c) => c.status === 'Active').length),
            note: 'Currently active',
          },
          {
            label: 'On trial',
            value: String(state.customers.filter((c) => c.status === 'Trial').length),
            note: 'Exploring the product',
          },
          {
            label: 'Sample revenue',
            value: money(state.customers.reduce((n, c) => n + c.revenue, 0)),
            note: 'Illustrative transactions',
          },
        ]}
      />
      <section className="demo-panel">
        <div className="demo-table-toolbar">
          <TextField
            label="Search customers"
            hideLabel
            leading={<IconSearch size={16} />}
            placeholder="Search name, email, or company…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <Field label="Customer status" hideLabel>
            <NativeSelect
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              {['All statuses', 'Active', 'Trial', 'Inactive'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Customer plan" hideLabel>
            <NativeSelect
              value={plan}
              onChange={(e) => {
                setPlan(e.target.value);
                setPage(1);
              }}
            >
              <option>All plans</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="business">Business</option>
            </NativeSelect>
          </Field>
        </div>
        <div className="demo-table-scroll" role="region" aria-label="Customer records" tabIndex={0}>
          <Table>
            <TableCaption className="af-sr-only">
              Synthetic Orbit customer records. Select a customer to inspect the record.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  aria-sort={sort === 'name' ? (asc ? 'ascending' : 'descending') : undefined}
                >
                  <button
                    className="sort-button"
                    onClick={() => {
                      setSort('name');
                      setAsc(sort === 'name' ? !asc : true);
                    }}
                  >
                    Customer{' '}
                    {sort === 'name' &&
                      (asc ? <IconArrowUp size={13} /> : <IconArrowDown size={13} />)}
                  </button>
                </TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  aria-sort={sort === 'revenue' ? (asc ? 'ascending' : 'descending') : undefined}
                >
                  <button
                    className="sort-button"
                    onClick={() => {
                      setSort('revenue');
                      setAsc(sort === 'revenue' ? !asc : false);
                    }}
                  >
                    Revenue{' '}
                    {sort === 'revenue' &&
                      (asc ? <IconArrowUp size={13} /> : <IconArrowDown size={13} />)}
                  </button>
                </TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice((current - 1) * 8, current * 8).map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <button className="demo-customer-button" onClick={() => setSelected(c.id)}>
                      <Avatar alt={c.name} />
                      <span>
                        <strong>{c.name}</strong>
                        <span>{c.email}</span>
                      </span>
                    </button>
                  </TableCell>
                  <TableCell>{c.company || 'Independent'}</TableCell>
                  <TableCell className="demo-capitalize">{c.plan}</TableCell>
                  <TableCell>
                    <Status value={c.status} />
                  </TableCell>
                  <TableCell className="demo-numeric">{money(c.revenue)}</TableCell>
                  <TableCell>{dateLabel(c.joined)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {!rows.length && <NoResults onClear={clear} />}
        <div className="demo-pagination">
          <span role="status">
            {rows.length
              ? `${(current - 1) * 8 + 1}–${Math.min(current * 8, rows.length)} of ${rows.length} customers`
              : '0 customers'}
          </span>
          <div>
            <Button
              aria-label="Previous customer page"
              variant="secondary"
              size="sm"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              <IconChevronLeft size={16} />
            </Button>
            <span>
              Page {current} of {count}
            </span>
            <Button
              aria-label="Next customer page"
              variant="secondary"
              size="sm"
              disabled={current === count}
              onClick={() => setPage(current + 1)}
            >
              <IconChevronRight size={16} />
            </Button>
          </div>
        </div>
      </section>
      <Sheet
        open={!!customer}
        onOpenChange={(v) => {
          if (!v) setSelected(undefined);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Customer details</SheetTitle>
            <SheetDescription>A sample relationship in your Orbit workspace.</SheetDescription>
          </SheetHeader>
          <SheetBody>
            {customer && (
              <>
                <div className="demo-person-summary">
                  <Avatar alt={customer.name} size="lg" />
                  <div>
                    <h2>{customer.name}</h2>
                    <p>{customer.company || 'Independent customer'}</p>
                  </div>
                </div>
                <dl className="demo-detail-list">
                  <div>
                    <dt>Email</dt>
                    <dd>{customer.email}</dd>
                  </div>
                  <div>
                    <dt>Customer ID</dt>
                    <dd>{customer.id}</dd>
                  </div>
                  <div>
                    <dt>Joined</dt>
                    <dd>{dateLabel(customer.joined)}</dd>
                  </div>
                  <div>
                    <dt>Revenue</dt>
                    <dd>{money(customer.revenue)}</dd>
                  </div>
                  <div>
                    <dt>Plan</dt>
                    <dd className="demo-capitalize">{customer.plan}</dd>
                  </div>
                </dl>
                <Field label="Customer status">
                  <NativeSelect
                    value={customer.status}
                    onChange={(e) => {
                      const value = e.target.value as Customer['status'];
                      setState((s) => ({
                        ...s,
                        customers: s.customers.map((c) =>
                          c.id === customer.id ? { ...c, status: value } : c,
                        ),
                        activity: record(
                          s,
                          event(
                            `${customer.name} is now ${value.toLowerCase()}`,
                            'Customer status updated.',
                            'Customer',
                          ),
                        ),
                      }));
                      toast({ title: 'Customer status updated', variant: 'success' });
                    }}
                  >
                    {['Active', 'Trial', 'Inactive'].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </NativeSelect>
                </Field>
                <p className="demo-help">Changes are saved to this local sample workspace.</p>
              </>
            )}
          </SheetBody>
          <SheetFooter>
            <SheetClose>Close details</SheetClose>
            {customer && (
              <Button
                onClick={() =>
                  download(`orbit-${customer.id}.json`, JSON.stringify(customer, null, 2))
                }
              >
                <IconDownload size={16} />
                Download record
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
const stages: Project['status'][] = ['Planned', 'In progress', 'Review', 'Complete'];
export function ProjectsPage() {
  const { state, setState } = useDemo();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [due, setDue] = useState('2026-11-16');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string>();
  const project = state.projects.find((p) => p.id === selected);
  const rows = state.projects.filter((p) =>
    `${p.name} ${p.customer}`.toLowerCase().includes(query.toLowerCase()),
  );
  const move = (id: string, status: Project['status']) => {
    setState((s) => {
      const p = s.projects.find((p) => p.id === id)!;
      return {
        ...s,
        projects: s.projects.map((p) =>
          p.id === id
            ? { ...p, status, completed: status === 'Complete' ? p.tasks : p.completed }
            : p,
        ),
        activity: record(
          s,
          event(
            `${p.name} moved to ${status.toLowerCase()}`,
            'Project workflow updated.',
            'Project',
          ),
        ),
      };
    });
    toast({ title: 'Project updated', description: `Moved to ${status}.`, variant: 'success' });
  };
  function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget),
      name = String(data.get('name')).trim();
    if (name.length < 3) {
      setError('Enter at least three characters for the project name.');
      return;
    }
    const item: Project = {
      id: newId('PRJ'),
      name,
      description: String(data.get('description')).trim(),
      customer: String(data.get('customer')),
      status: 'Planned',
      due,
      tasks: 8,
      completed: 0,
    };
    setState((s) => ({
      ...s,
      projects: [item, ...s.projects],
      activity: record(
        s,
        event(`${name} was created`, 'A new project is ready to plan.', 'Project'),
      ),
    }));
    setQuery('');
    setOpen(false);
    toast({ title: 'Project created', variant: 'success' });
  }
  return (
    <>
      <PageHeading
        title="Projects"
        description="Keep the work moving, from the first idea to the final review."
        actions={
          <Dialog
            open={open}
            onOpenChange={(v) => {
              setOpen(v);
              setError('');
            }}
          >
            <DialogTrigger>
              <IconPlus size={16} />
              New project
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={create}>
                <DialogHeader>
                  <DialogTitle>Create a project</DialogTitle>
                  <DialogDescription>
                    Give your next piece of work a name and a deadline.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody className="demo-form-stack">
                  <TextField
                    name="name"
                    label="Project name"
                    required
                    minLength={3}
                    maxLength={80}
                    placeholder="New product launch"
                    error={error || undefined}
                  />
                  <Field label="Description">
                    <Textarea
                      name="description"
                      maxLength={400}
                      placeholder="What will this project accomplish?"
                    />
                  </Field>
                  <Field label="Customer">
                    <NativeSelect name="customer">
                      {Array.from(
                        new Set(state.customers.map((c) => c.company).filter(Boolean)),
                      ).map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </NativeSelect>
                  </Field>
                  <Field label="Due date" required>
                    <DatePicker
                      label="Due date"
                      name="due"
                      value={due}
                      onValueChange={setDue}
                      required
                      today="2026-10-28"
                      weekStartsOn={
                        state.workspace.weekStart === 'Monday'
                          ? 1
                          : state.workspace.weekStart === 'Saturday'
                            ? 6
                            : 0
                      }
                    />
                  </Field>
                </DialogBody>
                <DialogFooter>
                  <DialogClose>Cancel</DialogClose>
                  <Button type="submit">Create project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <Tabs defaultValue="board">
        <div className="demo-view-toolbar">
          <TabsList aria-label="Project view">
            <TabsTrigger value="board">
              <IconLayoutBoard size={16} />
              Board
            </TabsTrigger>
            <TabsTrigger value="list">
              <IconList size={16} />
              List
            </TabsTrigger>
          </TabsList>
          <TextField
            label="Search projects"
            hideLabel
            placeholder="Search projects…"
            leading={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <TabsContent value="board">
          <div className="demo-board" role="region" aria-label="Project board" tabIndex={0}>
            {stages.map((stage) => (
              <section className="demo-board-column" key={stage}>
                <div className="demo-board-heading">
                  <h2>{stage}</h2>
                  <Badge size="sm">{rows.filter((p) => p.status === stage).length}</Badge>
                </div>
                {rows
                  .filter((p) => p.status === stage)
                  .map((p) => (
                    <article className="demo-project" key={p.id}>
                      <div className="demo-project-top">
                        <span className="demo-code">{p.id}</span>
                        <button
                          className="demo-icon-link"
                          aria-label={`View ${p.name}`}
                          onClick={() => setSelected(p.id)}
                        >
                          <IconArrowUpRight size={17} />
                        </button>
                      </div>
                      <h3>
                        <button onClick={() => setSelected(p.id)}>{p.name}</button>
                      </h3>
                      <p>{p.description}</p>
                      <div className="demo-project-progress">
                        <span>
                          {p.completed} / {p.tasks} tasks
                        </span>
                        <Progress
                          value={p.completed}
                          max={p.tasks}
                          aria-label={`${p.name} completed tasks`}
                        />
                      </div>
                      <div className="demo-project-meta">
                        <Avatar alt={p.customer} size="sm" />
                        <span>Due {dateLabel(p.due)}</span>
                      </div>
                      <Field label={`Status for ${p.name}`} hideLabel>
                        <NativeSelect
                          size="sm"
                          value={p.status}
                          onChange={(e) => move(p.id, e.target.value as Project['status'])}
                        >
                          {stages.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </NativeSelect>
                      </Field>
                    </article>
                  ))}
                {!rows.some((p) => p.status === stage) && (
                  <p className="demo-board-empty">
                    No projects {stage === 'Complete' ? 'completed' : 'here'} yet.
                  </p>
                )}
              </section>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div
            className="demo-panel demo-table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Project list"
          >
            <Table>
              <TableCaption className="af-sr-only">
                Sample projects and their current stages
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <button className="demo-text-button" onClick={() => setSelected(p.id)}>
                        {p.name}
                      </button>
                    </TableCell>
                    <TableCell>{p.customer}</TableCell>
                    <TableCell>
                      <Status value={p.status} />
                    </TableCell>
                    <TableCell>
                      {p.completed}/{p.tasks}
                    </TableCell>
                    <TableCell>{dateLabel(p.due)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      {!rows.length && <NoResults onClear={() => setQuery('')} />}
      <Sheet
        open={!!project}
        onOpenChange={(v) => {
          if (!v) setSelected(undefined);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{project?.name || 'Project details'}</SheetTitle>
            <SheetDescription>{project?.customer}</SheetDescription>
          </SheetHeader>
          <SheetBody>
            {project && (
              <>
                <p>{project.description}</p>
                <dl className="demo-detail-list">
                  <div>
                    <dt>Project ID</dt>
                    <dd>{project.id}</dd>
                  </div>
                  <div>
                    <dt>Due date</dt>
                    <dd>{dateLabel(project.due)}</dd>
                  </div>
                  <div>
                    <dt>Tasks complete</dt>
                    <dd>
                      {project.completed} of {project.tasks}
                    </dd>
                  </div>
                </dl>
                <Field label="Project stage">
                  <NativeSelect
                    value={project.status}
                    onChange={(e) => move(project.id, e.target.value as Project['status'])}
                  >
                    {stages.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </NativeSelect>
                </Field>
                <p className="demo-help">
                  Moving to Complete also completes the sample task count.
                </p>
              </>
            )}
          </SheetBody>
          <SheetFooter>
            <SheetClose>Close project</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
export function ActivityPage() {
  const { state } = useDemo();
  const [filter, setFilter] = useState('All activity');
  const rows = state.activity.filter((a) => filter === 'All activity' || a.category === filter);
  return (
    <>
      <PageHeading
        title="Activity"
        description="The small steps that move your workspace forward."
        actions={
          <Field label="Activity category" hideLabel>
            <NativeSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
              {[
                'All activity',
                'Workspace',
                'Customer',
                'Project',
                'Team',
                'Billing',
                'Account',
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </NativeSelect>
          </Field>
        }
      />
      <Panel title="Workspace history" description="Your demo edits appear here as you explore.">
        <ol className="demo-timeline">
          {rows.map((a) => (
            <li key={a.id}>
              <span className="demo-event-marker">
                <IconCheck size={15} />
              </span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.detail}</p>
                <span>
                  {a.category} · {dateLabel(a.date)}
                </span>
              </div>
              <time dateTime={a.date}>
                {new Date(a.date).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZone: state.workspace.timezone,
                })}{' '}
                {state.workspace.timezone}
              </time>
            </li>
          ))}
        </ol>
        {!rows.length && (
          <NoResults
            title="No activity in this category"
            description="Make a change in the workspace or choose another category."
            onClear={() => setFilter('All activity')}
          />
        )}
      </Panel>
    </>
  );
}
const channels = [
  { name: 'Direct', visits: 1840, conversions: 124 },
  { name: 'Organic search', visits: 1420, conversions: 92 },
  { name: 'Referrals', visits: 960, conversions: 81 },
  { name: 'Social', visits: 620, conversions: 26 },
];
export function AnalyticsPage() {
  const [period, setPeriod] = useState('14');
  const [metric, setMetric] = useState('revenue');
  const days = Array.from({ length: Number(period) }, (_, i) => i + (period === '14' ? 1 : 8));
  const data = days.map((day) => {
    const rows = orders.filter((o) => Number(o.date.slice(-2)) === day);
    return metric === 'revenue'
      ? rows.filter((o) => o.status === 'Paid').reduce((n, o) => n + o.amount, 0)
      : rows.length;
  });
  const max = Math.max(...data, 1),
    total = data.reduce((a, b) => a + b, 0);
  const factor = period === '14' ? 1 : 0.48;
  return (
    <>
      <PageHeading
        title="Analytics"
        description="Understand the path from a first visit to a lasting customer."
        actions={
          <>
            <Field label="Analytics period" hideLabel>
              <NativeSelect value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="14">Oct 1–14, 2026</option>
                <option value="7">Oct 8–14, 2026</option>
              </NativeSelect>
            </Field>
            <Button
              variant="secondary"
              onClick={() =>
                download(
                  'orbit-analytics.csv',
                  [
                    'Day,' + metric,
                    ...days.map((d, i) => `2026-10-${String(d).padStart(2, '0')},${data[i]}`),
                  ].join('\n'),
                  'text/csv',
                )
              }
            >
              <IconDownload size={16} />
              Export report
            </Button>
          </>
        }
      />
      <StatStrip
        items={[
          {
            label: 'Website visits',
            value: Math.round(4840 * factor).toLocaleString(),
            note: 'Sample acquisition data',
          },
          {
            label: 'Conversions',
            value: Math.round(323 * factor).toLocaleString(),
            note: 'Visitor to customer',
          },
          { label: 'Conversion rate', value: '6.7%', note: 'Across sample channels' },
          {
            label: 'Paid revenue',
            value: money(
              orders
                .filter((o) => o.status === 'Paid' && days.includes(Number(o.date.slice(-2))))
                .reduce((n, o) => n + o.amount, 0),
            ),
            note: 'Selected sample period',
          },
        ]}
      />
      <Panel
        title="Performance over time"
        description="Daily transactions from the shared sample order records."
        actions={<Badge>October 2026</Badge>}
      >
        <Tabs value={metric} onValueChange={setMetric}>
          <TabsList aria-label="Analytics metric">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue">
            <AnalyticsChart values={data} days={days} max={max} metric={metric} />
          </TabsContent>
          <TabsContent value="orders">
            <AnalyticsChart values={data} days={days} max={max} metric={metric} />
          </TabsContent>
        </Tabs>
        <div className="demo-chart-summary">
          <span>{metric === 'revenue' ? 'Paid revenue' : 'Orders'} in selected period</span>
          <strong>{metric === 'revenue' ? money(total) : total}</strong>
        </div>
      </Panel>
      <div className="demo-two-column">
        <Panel
          title="Acquisition channels"
          description="Illustrative website traffic and conversion data."
        >
          <div className="demo-channel-list">
            {channels.map((c) => (
              <div key={c.name}>
                <div>
                  <strong>{c.name}</strong>
                  <span>{Math.round(c.visits * factor).toLocaleString()} visits</span>
                </div>
                <Progress value={c.visits} max={4840} aria-label={`${c.name} share of visits`} />
                <span>{((c.visits / 4840) * 100).toFixed(1)}% of traffic</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Conversion funnel"
          description="A sample journey from discovery to activation."
        >
          <ol className="demo-funnel">
            {[
              ['Visitors', 4840],
              ['Signed up', 640],
              ['Activated', 410],
              ['Converted', 323],
            ].map(([label, n], i) => (
              <li key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{Math.round(Number(n) * factor).toLocaleString()}</strong>
                </div>
                <div className="demo-funnel-track">
                  <span style={{ width: `${(Number(n) / 4840) * 100}%` }} />
                </div>
                <p>
                  {i === 0
                    ? 'All sample website visits'
                    : `${((Number(n) / Number([4840, 640, 410][i - 1])) * 100).toFixed(1)}% from the previous step`}
                </p>
              </li>
            ))}
          </ol>
          <NextLink href="/demo/customers">Explore customers</NextLink>
        </Panel>
      </div>
    </>
  );
}
function AnalyticsChart({
  values,
  days,
  max,
  metric,
}: {
  values: number[];
  days: number[];
  max: number;
  metric: string;
}) {
  return (
    <figure className="demo-analytics-chart">
      <svg
        viewBox="0 0 900 240"
        role="img"
        aria-label={`Daily sample ${metric}: ${values.map((v, i) => `October ${days[i]}: ${metric === 'revenue' ? money(v) : v}`).join('; ')}`}
      >
        <g className="demo-chart-grid">
          {[20, 75, 130, 185, 230].map((y) => (
            <line key={y} x1="0" x2="900" y1={y} y2={y} />
          ))}
        </g>
        {values.map((v, i) => (
          <rect
            key={days[i]}
            x={(i * 900) / values.length + 12}
            y={230 - (v / max) * 195}
            width={Math.max(8, 900 / values.length - 24)}
            height={Math.max(v === 0 ? 0 : 2, (v / max) * 195)}
            fill="var(--af-semantic-accent)"
            opacity={i === values.length - 1 ? 1 : 0.55}
          >
            <title>
              October {days[i]}: {metric === 'revenue' ? money(v) : v}
            </title>
          </rect>
        ))}
      </svg>
      <div
        className="demo-chart-days"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${days.length},1fr)` }}
      >
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <figcaption>October {days[0]}–14 · Illustrative data</figcaption>
    </figure>
  );
}
