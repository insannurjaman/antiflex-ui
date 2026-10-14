'use client';
import { useState } from 'react';
import {
  Button,
  TextField,
  Badge,
  Card,
  Separator,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  AppShell,
} from '@chamfer/ui';
import {
  IconArrowRight,
  IconSearch,
  IconPlus,
  IconCheck,
  IconArrowUpRight,
} from '@tabler/icons-react';
export function OverviewSpecimen() {
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <div className="overview-specimen">
      <div className="specimen-actions">
        <div className="specimen-caption">Actions with intent</div>
        <div className="demo-row">
          <Button onClick={() => setSaved(!saved)}>
            {saved ? <IconCheck /> : <IconPlus />}
            {saved ? 'Project created' : 'Create project'}
          </Button>
          <Button variant="secondary" onClick={() => setSaved(false)}>
            Reset
          </Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
        </div>
        <div role="status" className="specimen-feedback">
          {saved
            ? 'Your sample project is ready.'
            : 'Clear states, native behavior, and a visible focus ring.'}
        </div>
        <div className="demo-row specimen-badges">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">In review</Badge>
          <Badge variant="accent">Design system</Badge>
          <Badge>Draft</Badge>
        </div>
      </div>
      <div className="specimen-field">
        <div className="specimen-caption">Details, considered</div>
        <TextField
          label="Work email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          description="A label, a hint, and room for feedback."
        />
        <Separator />
        <div className="specimen-foot">
          <span className="token-name">radius / sm</span>
          <span className="token-name">4px</span>
        </div>
      </div>
    </div>
  );
}
export function ComponentDemo({ name }: { name: string }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('Overview');
  switch (name) {
    case 'button':
      return (
        <div className="demo-row">
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1200);
            }}
          >
            Save changes <IconArrowRight />
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Delete</Button>
          <Button disabled>Disabled</Button>
        </div>
      );
    case 'text-field':
      return (
        <div className="demo-fields">
          <TextField
            label="Project name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="A new workspace"
            description="Choose a name your team will recognize."
          />
          <TextField label="Search" leading={<IconSearch />} placeholder="Search records…" />
          <TextField
            label="Work email"
            defaultValue="not-an-email"
            error="Enter a valid email address."
          />
        </div>
      );
    case 'badge':
      return (
        <div className="demo-row">
          <Badge>Draft</Badge>
          <Badge variant="accent">New</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">In review</Badge>
          <Badge variant="danger">Failed</Badge>
        </div>
      );
    case 'card':
      return (
        <Card className="demo-card">
          <Badge variant="accent">Workspace</Badge>
          <h3>Room for your next idea.</h3>
          <p>Give related content a clear boundary.</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelected(selected === 'Opened' ? 'Overview' : 'Opened')}
          >
            {selected === 'Opened' ? 'Workspace opened' : 'Open workspace'}
            <IconArrowUpRight />
          </Button>
        </Card>
      );
    case 'separator':
      return (
        <div className="demo-separator">
          <span>Personal workspace</span>
          <Separator decorative={false} />
          <span className="muted">Team workspace</span>
        </div>
      );
    case 'skeleton':
      return (
        <div className="skeleton-demo" role="status" aria-label="Loading workspace">
          <Skeleton style={{ width: 40, height: 40 }} />
          <div>
            <Skeleton style={{ width: 160, height: 16 }} />
            <Skeleton style={{ width: 220, height: 12, marginTop: 12 }} />
          </div>
        </div>
      );
    case 'table':
      return (
        <div className="table-scroll">
          <Table>
            <TableCaption>Sample projects</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['Atlas', 'Meridian', 'Forma'].map((p, i) => (
                <TableRow key={p}>
                  <TableCell>{p}</TableCell>
                  <TableCell>
                    <Badge variant={i === 1 ? 'warning' : 'success'}>
                      {i === 1 ? 'In review' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell>{['Alex Kim', 'Sam Rivera', 'Jordan Lee'][i]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    case 'app-shell':
      return (
        <div className="shell-specimen">
          <AppShell
            contentAs="div"
            mainId="sample-main-content"
            header={<strong>Sample workspace</strong>}
            sidebar={
              <nav aria-label="Sample navigation">
                {['Overview', 'Projects'].map((x) => (
                  <Button
                    key={x}
                    variant={selected === x ? 'secondary' : 'ghost'}
                    onClick={() => setSelected(x)}
                  >
                    {x}
                  </Button>
                ))}
              </nav>
            }
          >
            <h3>{selected}</h3>
            <p>Navigation and content share a responsive frame.</p>
          </AppShell>
        </div>
      );
    default:
      return null;
  }
}
