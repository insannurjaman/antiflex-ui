'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Alert, Skeleton, ToastProvider, ToastViewport } from '@antiflex/ui';
import { orders } from '../dashboard-data';
import { previousDemoKey } from '../storage-migration';
import type { PlanKey } from './catalog';
export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: PlanKey;
  status: 'Active' | 'Trial' | 'Inactive';
  revenue: number;
  joined: string;
}
export interface Project {
  id: string;
  name: string;
  description: string;
  customer: string;
  status: 'Planned' | 'In progress' | 'Review' | 'Complete';
  due: string;
  tasks: number;
  completed: number;
}
export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
  status: 'Active' | 'Invited';
}
export interface Activity {
  id: string;
  title: string;
  detail: string;
  category: 'Workspace' | 'Customer' | 'Project' | 'Team' | 'Billing' | 'Account';
  date: string;
}
export interface DemoState {
  version: 1;
  workspace: {
    name: string;
    slug: string;
    industry: string;
    timezone: string;
    weekStart: string;
    digest: boolean;
    mentions: boolean;
    productUpdates: boolean;
    compact: boolean;
  };
  profile: {
    name: string;
    email: string;
    role: string;
    location: string;
    website: string;
    bio: string;
  };
  customers: Customer[];
  projects: Project[];
  members: Member[];
  activity: Activity[];
  billing: { plan: PlanKey; cycle: 'monthly' | 'annual'; seats: number; invoiceEmail: string };
  receipts: {
    id: string;
    plan: PlanKey;
    cycle: 'monthly' | 'annual';
    seats: number;
    total: number;
    method: 'card' | 'invoice';
    billingName: string;
    company: string;
    country: string;
    date: string;
    email: string;
  }[];
}
export const storageKey = 'antiflex-orbit-demo-v1';
export function createDemo(): DemoState {
  return {
    version: 1,
    workspace: {
      name: 'Orbit',
      slug: 'orbit-studio',
      industry: 'Software & technology',
      timezone: 'Asia/Jakarta',
      weekStart: 'Monday',
      digest: true,
      mentions: true,
      productUpdates: false,
      compact: false,
    },
    profile: {
      name: 'Alex Morgan',
      email: 'alex@example.com',
      role: 'Product designer',
      location: 'Jakarta, Indonesia',
      website: 'https://example.com',
      bio: 'Building thoughtful products with a small, ambitious team. Currently working on our next workspace release.',
    },
    customers: orders.map((o, i) => ({
      id: 'CUS-' + String(i + 1).padStart(3, '0'),
      name: o.customer,
      email: o.email,
      company: [
        'Northstar Studio',
        'Linear Works',
        'Forma Labs',
        'Acme',
        'Studio Twelve',
        'Horizon',
      ][i % 6],
      plan: o.plan === 'Scale' ? 'business' : o.plan === 'Growth' ? 'pro' : 'starter',
      status: i % 5 === 0 ? 'Trial' : i % 7 === 0 ? 'Inactive' : 'Active',
      revenue: o.status === 'Paid' ? o.amount : 0,
      joined: o.date,
    })),
    projects: [
      {
        id: 'PRJ-101',
        name: 'Workspace redesign',
        description:
          'Simplify daily workflows and bring the new design language to our core screens.',
        customer: 'Northstar Studio',
        status: 'In progress',
        due: '2026-11-06',
        tasks: 24,
        completed: 16,
      },
      {
        id: 'PRJ-102',
        name: 'Customer onboarding',
        description: 'Help new customers find their first successful workflow.',
        customer: 'Forma Labs',
        status: 'Review',
        due: '2026-10-30',
        tasks: 12,
        completed: 11,
      },
      {
        id: 'PRJ-103',
        name: 'Reporting experience',
        description: 'Make reporting useful, readable, and exportable.',
        customer: 'Linear Works',
        status: 'Planned',
        due: '2026-11-16',
        tasks: 18,
        completed: 0,
      },
      {
        id: 'PRJ-104',
        name: 'Billing improvements',
        description: 'Connect plan selection, checkout, and invoice history.',
        customer: 'Acme',
        status: 'In progress',
        due: '2026-11-10',
        tasks: 16,
        completed: 7,
      },
      {
        id: 'PRJ-105',
        name: 'Brand foundations',
        description: 'A shared vocabulary for the next chapter of the product.',
        customer: 'Studio Twelve',
        status: 'Complete',
        due: '2026-10-24',
        tasks: 10,
        completed: 10,
      },
      {
        id: 'PRJ-106',
        name: 'Mobile navigation',
        description: 'Keep the workspace useful on every screen.',
        customer: 'Horizon',
        status: 'Planned',
        due: '2026-11-20',
        tasks: 8,
        completed: 0,
      },
    ],
    members: [
      {
        id: 'MEM-1',
        name: 'Alex Morgan',
        email: 'alex@example.com',
        role: 'Owner',
        status: 'Active',
      },
      {
        id: 'MEM-2',
        name: 'Jamie Park',
        email: 'jamie@example.com',
        role: 'Admin',
        status: 'Active',
      },
      {
        id: 'MEM-3',
        name: 'Sam Rivera',
        email: 'sam@example.com',
        role: 'Member',
        status: 'Active',
      },
      {
        id: 'MEM-4',
        name: 'Riley Chen',
        email: 'riley@example.com',
        role: 'Member',
        status: 'Active',
      },
      {
        id: 'MEM-5',
        name: 'Taylor Kim',
        email: 'taylor@example.com',
        role: 'Viewer',
        status: 'Invited',
      },
    ],
    activity: [
      {
        id: 'EV-1',
        title: 'Jamie moved Customer onboarding to review',
        detail: '11 of 12 tasks are complete.',
        category: 'Project',
        date: '2026-10-28T08:20:00Z',
      },
      {
        id: 'EV-2',
        title: 'A new customer joined the workspace',
        detail: 'Northstar Studio started a Pro trial.',
        category: 'Customer',
        date: '2026-10-28T07:45:00Z',
      },
      {
        id: 'EV-3',
        title: 'Taylor was invited to the team',
        detail: 'Viewer access is ready to accept.',
        category: 'Team',
        date: '2026-10-27T15:30:00Z',
      },
      {
        id: 'EV-4',
        title: 'Brand foundations was completed',
        detail: 'All 10 tasks were reviewed and approved.',
        category: 'Project',
        date: '2026-10-24T11:00:00Z',
      },
      {
        id: 'EV-5',
        title: 'October invoice is available',
        detail: 'The sample Pro workspace invoice is ready.',
        category: 'Billing',
        date: '2026-10-01T09:00:00Z',
      },
    ],
    billing: { plan: 'pro', cycle: 'monthly', seats: 5, invoiceEmail: 'billing@example.com' },
    receipts: [],
  };
}
export const newId = (prefix: string) => prefix + '-' + crypto.randomUUID().slice(0, 8);
export const event = (title: string, detail: string, category: Activity['category']): Activity => ({
  id: newId('EV'),
  title,
  detail,
  category,
  date: new Date().toISOString(),
});
// Accept only this version's own bounded, well-formed data; never merge arbitrary browser storage.
function isDemo(value: unknown): value is DemoState {
  if (!value || typeof value !== 'object') return false;
  const v = value as DemoState;
  const strings = (o: unknown, keys: string[]) =>
    !!o &&
    typeof o === 'object' &&
    keys.every((k) => typeof (o as Record<string, unknown>)[k] === 'string');
  return (
    v.version === 1 &&
    strings(v.workspace, ['name', 'slug', 'industry', 'timezone', 'weekStart']) &&
    ['Asia/Jakarta', 'Asia/Singapore', 'Europe/London', 'America/New_York', 'UTC'].includes(
      v.workspace.timezone,
    ) &&
    ['Monday', 'Sunday', 'Saturday'].includes(v.workspace.weekStart) &&
    ['digest', 'mentions', 'productUpdates', 'compact'].every(
      (k) => typeof (v.workspace as unknown as Record<string, unknown>)[k] === 'boolean',
    ) &&
    strings(v.profile, ['name', 'email', 'role', 'location', 'website', 'bio']) &&
    ['starter', 'pro', 'business'].includes(v.billing?.plan) &&
    ['monthly', 'annual'].includes(v.billing?.cycle) &&
    Number.isInteger(v.billing?.seats) &&
    v.billing.seats >= 1 &&
    v.billing.seats <= 25 &&
    typeof v.billing.invoiceEmail === 'string' &&
    Array.isArray(v.customers) &&
    v.customers.length <= 500 &&
    v.customers.every(
      (c) =>
        strings(c, ['id', 'name', 'email', 'company', 'joined']) &&
        ['starter', 'pro', 'business'].includes(c.plan) &&
        ['Active', 'Trial', 'Inactive'].includes(c.status) &&
        Number.isFinite(c.revenue) &&
        Number.isFinite(Date.parse(c.joined)),
    ) &&
    Array.isArray(v.projects) &&
    v.projects.length <= 100 &&
    v.projects.every(
      (p) =>
        strings(p, ['id', 'name', 'description', 'customer', 'due']) &&
        ['Planned', 'In progress', 'Review', 'Complete'].includes(p.status) &&
        Number.isFinite(p.tasks) &&
        Number.isFinite(p.completed) &&
        Number.isFinite(Date.parse(p.due)),
    ) &&
    Array.isArray(v.members) &&
    v.members.length <= 100 &&
    v.members.every(
      (m) =>
        strings(m, ['id', 'name', 'email']) &&
        ['Owner', 'Admin', 'Member', 'Viewer'].includes(m.role) &&
        ['Active', 'Invited'].includes(m.status),
    ) &&
    Array.isArray(v.activity) &&
    v.activity.length <= 60 &&
    v.activity.every(
      (a) =>
        strings(a, ['id', 'title', 'detail', 'category', 'date']) &&
        Number.isFinite(Date.parse(a.date)),
    ) &&
    Array.isArray(v.receipts) &&
    v.receipts.length <= 30 &&
    v.receipts.every(
      (r) =>
        strings(r, ['id', 'plan', 'cycle', 'date', 'email', 'billingName', 'company', 'country']) &&
        ['starter', 'pro', 'business'].includes(r.plan) &&
        ['monthly', 'annual'].includes(r.cycle) &&
        ['card', 'invoice'].includes(r.method) &&
        Number.isFinite(Date.parse(r.date)) &&
        Number.isFinite(r.total) &&
        Number.isInteger(r.seats),
    )
  );
}
interface Store {
  state: DemoState;
  setState: Dispatch<SetStateAction<DemoState>>;
  reset: () => void;
  persistent: boolean;
}
const Context = createContext<Store | null>(null);
export function useDemo() {
  const value = useContext(Context);
  if (!value) throw Error('DemoProvider required.');
  return value;
}
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(createDemo);
  const [ready, setReady] = useState(false);
  const [persistent, setPersistent] = useState(true);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey) ?? localStorage.getItem(previousDemoKey);
      if (raw && raw.length < 1000000) {
        const parsed: unknown = JSON.parse(raw);
        if (isDemo(parsed)) setState(parsed);
      }
    } catch {
      setPersistent(false);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      setPersistent(false);
    }
  }, [ready, state]);
  return (
    <Context.Provider
      value={{
        state,
        setState,
        reset: () => {
          setState(createDemo());
          setRevision((r) => r + 1);
        },
        persistent,
      }}
    >
      <ToastProvider key={revision}>
        {!persistent && (
          <Alert role="status" title="Changes are temporary">
            Browser storage is unavailable. You can still explore; changes will reset after a
            refresh.
          </Alert>
        )}
        {ready ? (
          children
        ) : (
          <div className="demo-loading" role="status">
            Loading sample workspace
            <Skeleton style={{ height: 240, marginTop: 24 }} />
          </div>
        )}
        <ToastViewport label="Orbit notifications" />
      </ToastProvider>
    </Context.Provider>
  );
}
export function record(state: DemoState, activity: Activity) {
  return [activity, ...state.activity].slice(0, 60);
}
export function download(name: string, contents: string, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
