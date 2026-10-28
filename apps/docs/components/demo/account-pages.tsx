'use client';
import { useState, type FormEvent } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Field,
  Input,
  NativeSelect,
  Switch,
  TextField,
  Textarea,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
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
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  useToast,
} from '@antiflex/ui';
import {
  IconPlus,
  IconSearch,
  IconMail,
  IconMapPin,
  IconWorld,
  IconDownload,
  IconCheck,
  IconTrash,
} from '@tabler/icons-react';
import { useDemo, newId, event, record, download, type Member } from './store';
import { PageHeading, Panel, StatStrip, Status, NoResults, NextLink } from './common';
export function TeamPage() {
  const { state, setState } = useDemo();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const rows = state.members.filter((m) =>
    `${m.name} ${m.email}`.toLowerCase().includes(query.toLowerCase()),
  );
  function invite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email')).trim().toLowerCase(),
      name = String(f.get('name')).trim();
    if (name.length < 2) {
      setError('Enter a name with at least two characters.');
      return;
    }
    if (state.members.some((m) => m.email.toLowerCase() === email)) {
      setError('This person already has a member record. Use a different email.');
      return;
    }
    const member: Member = {
      id: newId('MEM'),
      name,
      email,
      role: f.get('role') as Member['role'],
      status: 'Invited',
    };
    setState((s) => ({
      ...s,
      members: [...s.members, member],
      activity: record(
        s,
        event(
          `${name} was invited to the sample team`,
          `${member.role} access. No email was sent.`,
          'Team',
        ),
      ),
    }));
    setQuery('');
    setOpen(false);
    toast({
      title: 'Sample invitation created',
      description: 'No email was sent. You can change the role in the member list.',
      variant: 'success',
    });
  }
  return (
    <>
      <PageHeading
        title="Team"
        description="Good work starts with the right people in the room."
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
              Invite member
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={invite}>
                <DialogHeader>
                  <DialogTitle>Invite a team member</DialogTitle>
                  <DialogDescription>
                    Create an illustrative invitation. This demo does not send email or grant real
                    access.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody className="demo-form-stack">
                  <TextField
                    name="name"
                    label="Member name"
                    pattern={String.raw`.*\S.*\S.*`}
                    minLength={2}
                    maxLength={80}
                    required
                    placeholder="Jordan Ellis"
                  />
                  <TextField
                    name="email"
                    label="Work email"
                    type="email"
                    required
                    maxLength={120}
                    placeholder="jordan@example.com"
                    error={error || undefined}
                  />
                  <Field label="Role">
                    <NativeSelect name="role">
                      <option>Member</option>
                      <option>Admin</option>
                      <option>Viewer</option>
                    </NativeSelect>
                  </Field>
                  <p className="demo-help">
                    Admins manage the workspace. Members collaborate. Viewers have read-only access
                    in this sample.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <DialogClose>Cancel</DialogClose>
                  <Button type="submit">Create demo invite</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <StatStrip
        items={[
          {
            label: 'Team members',
            value: String(state.members.length),
            note: 'Including sample invitations',
          },
          {
            label: 'Active',
            value: String(state.members.filter((m) => m.status === 'Active').length),
            note: 'Ready to collaborate',
          },
          {
            label: 'Invitations',
            value: String(state.members.filter((m) => m.status === 'Invited').length),
            note: 'Awaiting a sample response',
          },
        ]}
      />
      <section className="demo-panel">
        <div className="demo-table-toolbar">
          <TextField
            label="Search team"
            hideLabel
            placeholder="Search members…"
            leading={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="demo-help">Roles are illustrative; no real permissions change.</span>
        </div>
        <div className="demo-table-scroll" role="region" aria-label="Team members" tabIndex={0}>
          <Table>
            <TableCaption className="af-sr-only">
              Orbit sample team, roles, and invitation status
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="demo-person-cell">
                      <Avatar alt={m.name} />
                      <span>
                        <strong>
                          {m.name}
                          {m.role === 'Owner' && ' (you)'}
                        </strong>
                        <span>{m.email}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Field label={`Role for ${m.name}`} hideLabel>
                      <NativeSelect
                        size="sm"
                        value={m.role}
                        disabled={m.role === 'Owner'}
                        onChange={(e) => {
                          const role = e.target.value as Member['role'];
                          setState((s) => ({
                            ...s,
                            members: s.members.map((a) => (a.id === m.id ? { ...a, role } : a)),
                            activity: record(
                              s,
                              event(
                                `${m.name}'s role changed to ${role}`,
                                'Sample team access updated.',
                                'Team',
                              ),
                            ),
                          }));
                          toast({ title: 'Member role updated', variant: 'success' });
                        }}
                      >
                        {(m.role === 'Owner' ? ['Owner'] : ['Admin', 'Member', 'Viewer']).map(
                          (v) => (
                            <option key={v}>{v}</option>
                          ),
                        )}
                      </NativeSelect>
                    </Field>
                  </TableCell>
                  <TableCell>
                    <Status value={m.status} />
                  </TableCell>
                  <TableCell>
                    {m.role === 'Owner' ? (
                      <span className="demo-help">Workspace owner</span>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger
                          variant="ghost"
                          size="sm"
                          aria-label={`Remove ${m.name}`}
                        >
                          <IconTrash size={16} />
                          <span>Remove</span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove {m.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This removes their sample member record. No actual account or access
                              is affected.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep member</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                setState((s) => ({
                                  ...s,
                                  members: s.members.filter((a) => a.id !== m.id),
                                  activity: record(
                                    s,
                                    event(
                                      `${m.name} was removed from the sample team`,
                                      'Sample member record removed.',
                                      'Team',
                                    ),
                                  ),
                                }));
                                toast({ title: 'Sample member removed', variant: 'success' });
                              }}
                            >
                              Remove sample member
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {!rows.length && <NoResults onClear={() => setQuery('')} />}
        <div className="demo-table-note">
          {state.members.length} sample members · Manage plan capacity in{' '}
          <NextLink href="/demo/billing">Billing</NextLink>
        </div>
      </section>
    </>
  );
}
export function SettingsPage() {
  const { state, setState } = useDemo();
  const { toast } = useToast();
  const [draft, setDraft] = useState(state.workspace);
  const [saved, setSaved] = useState('');
  const [section, setSection] = useState('general');
  const dirty = JSON.stringify(draft) !== JSON.stringify(state.workspace);
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = { ...draft, name: draft.name.trim(), slug: draft.slug.trim() };
    if (next.name.length < 2) return;
    setState((s) => ({
      ...s,
      workspace: next,
      activity: record(
        s,
        event(
          'Workspace settings were updated',
          `Preferences saved for ${next.name}.`,
          'Workspace',
        ),
      ),
    }));
    setSaved('Workspace settings saved.');
    toast({
      title: 'Settings saved',
      description: 'Your preferences are saved in this browser.',
      variant: 'success',
    });
  }
  const change = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) => {
    setDraft((s) => ({ ...s, [key]: value }));
    setSaved('');
  };
  return (
    <>
      <PageHeading title="Settings" description="A workspace that works the way your team does." />
      <form
        onSubmit={save}
        className="demo-settings-form"
        onInvalidCapture={(e) => {
          const input = e.target as HTMLInputElement;
          if (input.closest('[role="tabpanel"]')?.hasAttribute('hidden')) {
            e.preventDefault();
            setSection('general');
            requestAnimationFrame(() => {
              input.focus();
              input.reportValidity();
            });
          }
        }}
      >
        <Tabs value={section} onValueChange={setSection}>
          <TabsList aria-label="Settings sections">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Panel
              title="Workspace details"
              description="The essentials your team sees across Orbit."
            >
              <div className="demo-form-grid">
                <TextField
                  label="Workspace name"
                  pattern={String.raw`.*\S.*\S.*`}
                  required
                  minLength={2}
                  maxLength={60}
                  value={draft.name}
                  onChange={(e) => change('name', e.target.value)}
                  description="Used in your workspace header."
                />
                <TextField
                  label="Workspace slug"
                  required
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  maxLength={60}
                  value={draft.slug}
                  onChange={(e) => change('slug', e.target.value)}
                  description="Lowercase letters, numbers, and single hyphens."
                />
                <Field label="Industry">
                  <NativeSelect
                    value={draft.industry}
                    onChange={(e) => change('industry', e.target.value)}
                  >
                    {[
                      'Software & technology',
                      'Design & creative',
                      'Professional services',
                      'Education',
                      'Other',
                    ].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Workspace timezone">
                  <NativeSelect
                    value={draft.timezone}
                    onChange={(e) => change('timezone', e.target.value)}
                  >
                    {[
                      'Asia/Jakarta',
                      'Asia/Singapore',
                      'Europe/London',
                      'America/New_York',
                      'UTC',
                    ].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </NativeSelect>
                </Field>
              </div>
            </Panel>
            <Panel title="Workspace data" description="Keep a copy of your sample configuration.">
              <div className="demo-setting-row">
                <div>
                  <h3>Export demo data</h3>
                  <p>Download the current sample workspace as a JSON file.</p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => download('orbit-workspace.json', JSON.stringify(state, null, 2))}
                >
                  <IconDownload size={16} />
                  Export workspace
                </Button>
              </div>
            </Panel>
          </TabsContent>
          <TabsContent value="notifications">
            <Panel
              title="Notification preferences"
              description="These choices are saved for the sample account; no email is sent."
            >
              {(
                [
                  {
                    key: 'digest',
                    title: 'Weekly workspace digest',
                    description: 'A weekly summary of project progress and workspace activity.',
                  },
                  {
                    key: 'mentions',
                    title: 'Mentions and comments',
                    description: 'Updates when a teammate mentions you or replies to your work.',
                  },
                  {
                    key: 'productUpdates',
                    title: 'Product updates',
                    description: 'Occasional news about changes to the sample product.',
                  },
                ] as const
              ).map((p) => (
                <div className="demo-setting-row" key={p.key}>
                  <div>
                    <h3>
                      <label htmlFor={'setting-' + p.key}>{p.title}</label>
                    </h3>
                    <p id={'desc-' + p.key}>{p.description}</p>
                  </div>
                  <Switch
                    id={'setting-' + p.key}
                    checked={draft[p.key]}
                    onChange={(e) => change(p.key, e.target.checked)}
                    aria-describedby={'desc-' + p.key}
                  />
                </div>
              ))}
            </Panel>
          </TabsContent>
          <TabsContent value="preferences">
            <Panel
              title="Personal preferences"
              description="Small decisions that make the workspace feel familiar."
            >
              <div className="demo-setting-row">
                <div>
                  <h3>
                    <label htmlFor="compact-layout">Compact content spacing</label>
                  </h3>
                  <p>Use a denser table and content layout in this demo.</p>
                </div>
                <Switch
                  id="compact-layout"
                  checked={draft.compact}
                  onChange={(e) => change('compact', e.target.checked)}
                />
              </div>
              <Field label="Start of the work week">
                <NativeSelect
                  value={draft.weekStart}
                  onChange={(e) => change('weekStart', e.target.value)}
                >
                  <option>Monday</option>
                  <option>Sunday</option>
                  <option>Saturday</option>
                </NativeSelect>
              </Field>
              <p className="demo-help">
                The work-week preference is stored with this workspace. Use the theme button in the
                antiflex header to preview light and dark.
              </p>
            </Panel>
          </TabsContent>
        </Tabs>
        <div className="demo-form-footer">
          <span role="status">
            {saved || (dirty ? 'You have unsaved changes.' : 'All changes saved.')}
          </span>
          <Button
            variant="secondary"
            disabled={!dirty}
            onClick={() => {
              setDraft(state.workspace);
              setSaved('Changes discarded.');
            }}
          >
            Discard changes
          </Button>
          <Button type="submit" disabled={!dirty}>
            Save changes
          </Button>
        </div>
      </form>
    </>
  );
}
export function ProfilePage() {
  const { state, setState } = useDemo();
  const { toast } = useToast();
  const [draft, setDraft] = useState(state.profile);
  const [saved, setSaved] = useState('');
  const dirty = JSON.stringify(draft) !== JSON.stringify(state.profile);
  const change = (key: keyof typeof draft, value: string) => {
    setDraft((s) => ({ ...s, [key]: value }));
    setSaved('');
  };
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const profile = { ...draft, name: draft.name.trim() };
    if (profile.name.length < 2) return;
    setState((s) => ({
      ...s,
      profile,
      members: s.members.map((m) =>
        m.role === 'Owner' ? { ...m, name: profile.name, email: profile.email } : m,
      ),
      activity: record(
        s,
        event('Your profile was updated', 'Your sample account details were saved.', 'Account'),
      ),
    }));
    setSaved('Profile saved.');
    toast({ title: 'Profile saved', variant: 'success' });
  }
  return (
    <>
      <PageHeading
        title="Your profile"
        description="The person behind the work."
        actions={
          <Button
            variant="secondary"
            onClick={() => download('orbit-profile.json', JSON.stringify(state.profile, null, 2))}
          >
            <IconDownload size={16} />
            Export profile
          </Button>
        }
      />
      <div className="demo-profile-layout">
        <aside className="demo-profile-preview" aria-label="Saved profile preview">
          <div className="demo-profile-cover" />
          <Avatar alt={state.profile.name} size="lg" className="demo-profile-avatar" />
          <h2>{state.profile.name}</h2>
          <p className="demo-profile-role">{state.profile.role}</p>
          <Badge>Workspace owner</Badge>
          <p className="demo-profile-bio">{state.profile.bio}</p>
          <ul>
            <li>
              <IconMapPin size={16} />
              {state.profile.location || 'No location added'}
            </li>
            <li>
              <IconMail size={16} />
              {state.profile.email}
            </li>
            {state.profile.website && (
              <li>
                <IconWorld size={16} />
                <a
                  href={
                    /^https?:\/\//.test(state.profile.website) ? state.profile.website : undefined
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {state.profile.website.replace(/^https?:\/\//, '')}
                </a>
              </li>
            )}
          </ul>
          <div className="demo-profile-counts">
            <div>
              <strong>{state.projects.length}</strong>
              <span>Projects</span>
            </div>
            <div>
              <strong>{state.members.length}</strong>
              <span>Teammates</span>
            </div>
          </div>
        </aside>
        <form onSubmit={save}>
          <Panel
            title="Personal information"
            description="Your saved changes update the preview and account menu."
          >
            <div className="demo-form-grid">
              <TextField
                label="Full name"
                pattern={String.raw`.*\S.*\S.*`}
                required
                minLength={2}
                maxLength={80}
                value={draft.name}
                onChange={(e) => change('name', e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                required
                maxLength={120}
                value={draft.email}
                onChange={(e) => change('email', e.target.value)}
              />
              <TextField
                label="Job title"
                maxLength={80}
                value={draft.role}
                onChange={(e) => change('role', e.target.value)}
              />
              <TextField
                label="Location"
                maxLength={100}
                value={draft.location}
                onChange={(e) => change('location', e.target.value)}
              />
              <div className="demo-span-all">
                <TextField
                  label="Website"
                  type="url"
                  pattern="https?://.*"
                  maxLength={200}
                  value={draft.website}
                  onChange={(e) => change('website', e.target.value)}
                  description="Use a full http:// or https:// address."
                />
              </div>
              <div className="demo-span-all">
                <Field label="Bio" description={`${draft.bio.length}/280 characters`}>
                  <Textarea
                    maxLength={280}
                    value={draft.bio}
                    onChange={(e) => change('bio', e.target.value)}
                    rows={4}
                  />
                </Field>
              </div>
            </div>
          </Panel>
          <div className="demo-form-footer">
            <span role="status">
              {saved || (dirty ? 'You have unsaved changes.' : 'All changes saved.')}
            </span>
            <Button
              variant="secondary"
              disabled={!dirty}
              onClick={() => {
                setDraft(state.profile);
                setSaved('Changes discarded.');
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!dirty}>
              Save profile
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
