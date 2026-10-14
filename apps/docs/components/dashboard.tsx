'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AppShell,
  Badge,
  Button,
  Card,
  TextField,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Skeleton,
  cx,
} from '@chamfer/ui';
import {
  IconArrowDown,
  IconArrowUp,
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconSearch,
  IconLayoutDashboard,
  IconShoppingBag,
  IconActivity,
  IconChartBar,
  IconChevronDown,
  IconRefresh,
  IconCircleCheck,
} from '@tabler/icons-react';
import { orders, type Order } from './dashboard-data';
type SortKey = 'customer' | 'amount' | 'date';
const money = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
const date = (s: string) =>
  new Date(s + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
export function Dashboard() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [sort, setSort] = useState<SortKey>('date');
  const [direction, setDirection] = useState<'ascending' | 'descending'>('descending');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [range, setRange] = useState('14');
  const [active, setActive] = useState('Overview');
  const source = useMemo(
    () => orders.filter((o) => range === '14' || Number(o.date.slice(-2)) >= 8),
    [range],
  );
  const filtered = useMemo(
    () =>
      source
        .filter(
          (o) =>
            (status === 'All statuses' || o.status === status) &&
            `${o.customer} ${o.email} ${o.id} ${o.plan}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) => {
          const result = sort === 'amount' ? a.amount - b.amount : a[sort].localeCompare(b[sort]);
          return direction === 'ascending' ? result : -result;
        }),
    [source, query, status, sort, direction],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / 6));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * 6, currentPage * 6);
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      setNotice('Sample records refreshed.');
    }, 700);
    return () => clearTimeout(timer);
  }, [loading]);
  const sortBy = (key: SortKey) => {
    setSort(key);
    setDirection(sort === key && direction === 'ascending' ? 'descending' : 'ascending');
    setPage(1);
  };
  const paid = source.filter((o) => o.status === 'Paid');
  const revenue = paid.reduce((sum, o) => sum + o.amount, 0);
  const pending = source.filter((o) => o.status === 'Pending').length;
  const exportCSV = () => {
    const text = [
      'Order,Customer,Plan,Status,Amount,Date',
      ...filtered.map((o) => [o.id, o.customer, o.plan, o.status, o.amount, o.date].join(',')),
    ].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chamfer-sample-orders.csv';
    a.click();
    URL.revokeObjectURL(url);
    setNotice(`${filtered.length} sample orders exported.`);
  };
  const nav = [
    ['Overview', '#main-content', IconLayoutDashboard],
    ['Orders', '#orders', IconShoppingBag],
    ['Revenue', '#revenue', IconChartBar],
    ['Activity', '#activity', IconActivity],
  ] as const;
  const sortHeader = (key: SortKey, label: string) => (
    <TableHead aria-sort={sort === key ? direction : undefined}>
      <button className="sort-button" onClick={() => sortBy(key)}>
        {label}
        {sort === key ? (
          direction === 'ascending' ? (
            <IconArrowUp size={13} />
          ) : (
            <IconArrowDown size={13} />
          )
        ) : (
          <IconChevronDown size={13} />
        )}
      </button>
    </TableHead>
  );
  return (
    <AppShell
      header={
        <>
          <Link className="workspace-name" href="/dashboard">
            <span className="workspace-avatar">o</span>
            <strong>Orbit</strong>
            <span className="muted">/</span>
            <span className="workspace-label">Workspace</span>
          </Link>
          <div className="workspace-header-right flex items-center">
            <Badge variant="accent" size="sm">
              Sample workspace
            </Badge>
            <span className="user-avatar" aria-label="Demo user Alex Morgan">
              AM
            </span>
          </div>
        </>
      }
      sidebar={
        <>
          <div className="workspace-select">
            <span className="workspace-avatar small">o</span>
            <div>
              <strong>Orbit workspace</strong>
              <span>Foundation demo</span>
            </div>
          </div>
          <nav aria-label="Workspace sections" className="workspace-nav">
            {nav.map(([label, href, Icon]) => (
              <a
                key={label}
                href={href}
                onClick={() => setActive(label)}
                className={cx(active === label && 'active')}
              >
                <Icon size={18} />
                {label}
                {label === 'Orders' && <span>{source.length}</span>}
              </a>
            ))}
          </nav>
          <div className="workspace-sidebar-note">
            <span className="token-name">BUILT WITH CHAMFER</span>
            <p>
              One system.
              <br />
              Ready for your product.
            </p>
            <Link href="/docs/components">
              Explore the components <IconArrowUpRight size={14} />
            </Link>
          </div>
          <div className="workspace-profile">
            <span className="user-avatar">AM</span>
            <div>
              <strong>Alex Morgan</strong>
              <span>Demo account</span>
            </div>
          </div>
        </>
      }
    >
      <div className="dashboard-heading">
        <div>
          <div className="dashboard-context">
            Orbit workspace <span>/</span> Overview
          </div>
          <h1>Workspace overview</h1>
          <p>A clear view of your business, down to the details.</p>
        </div>
        <div className="dashboard-heading-actions">
          <label className="ch-sr-only" htmlFor="date-range">
            Date range
          </label>
          <select
            id="date-range"
            value={range}
            onChange={(e) => {
              setRange(e.target.value);
              setPage(1);
            }}
          >
            <option value="14">Oct 1–14, 2026</option>
            <option value="7">Oct 8–14, 2026</option>
          </select>
          <Button variant="secondary" onClick={exportCSV}>
            <IconDownload />
            Export
          </Button>
        </div>
      </div>
      <div className="metrics-grid">
        {[
          ['Revenue', money(revenue), `${paid.length} paid orders`, IconChartBar],
          ['Orders', String(source.length), 'Across three plans', IconShoppingBag],
          [
            'Customers',
            String(new Set(source.map((o) => o.email)).size),
            'Unique sample customers',
            IconLayoutDashboard,
          ],
          ['Pending', String(pending), 'Awaiting payment', IconActivity],
        ].map(([label, value, note, Icon]) => (
          <Card key={String(label)} padding="md" className="metric">
            <div className="metric-top">
              <span>{String(label)}</span>
              <Icon size={17} />
            </div>
            <strong>{String(value)}</strong>
            <span>{String(note)}</span>
          </Card>
        ))}
      </div>
      <div className="dashboard-middle">
        <Card id="revenue" padding="lg" className="revenue-panel">
          <div className="panel-heading">
            <div>
              <h2>Revenue over time</h2>
              <p>Paid orders · Oct {range === '14' ? '1' : '8'}–14, 2026</p>
            </div>
            <Badge size="sm">USD</Badge>
          </div>
          <RevenueChart data={source} range={range} />
        </Card>
        <Card id="activity" padding="lg" className="activity-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent activity</h2>
              <p>The latest in your workspace</p>
            </div>
            <IconActivity size={18} />
          </div>
          <div className="activity-list">
            {source.slice(0, 3).map((o) => (
              <div key={o.id}>
                <span className="activity-icon">
                  <IconCircleCheck size={17} />
                </span>
                <div>
                  <p>
                    <strong>{o.customer.split(' ')[0]}</strong>{' '}
                    {o.status === 'Paid'
                      ? 'completed a payment'
                      : o.status === 'Pending'
                        ? 'started an order'
                        : 'received a refund'}
                  </p>
                  <span>
                    {o.plan} plan · {money(o.amount)}
                  </span>
                </div>
                <time dateTime={o.date}>{date(o.date)}</time>
              </div>
            ))}
          </div>
          <a className="activity-link" href="#orders" onClick={() => setActive('Orders')}>
            View all orders <IconArrowRightSmall />
          </a>
        </Card>
      </div>
      <section id="orders" className="orders-panel">
        <div className="orders-heading">
          <div>
            <h2>
              Orders <Badge size="sm">{source.length}</Badge>
            </h2>
            <p>Manage and review your recent transactions.</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            loading={loading}
            onClick={() => setLoading(true)}
            aria-label="Refresh sample orders"
          >
            <IconRefresh />
            Refresh
          </Button>
        </div>
        <div className="orders-toolbar">
          <TextField
            label="Search orders"
            hideLabel
            leading={<IconSearch />}
            placeholder="Search name, email, or order…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <div className="orders-toolbar-right">
            <label className="ch-sr-only" htmlFor="status-filter">
              Filter by status
            </label>
            <select
              id="status-filter"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              {['All statuses', 'Paid', 'Pending', 'Refunded'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <Button variant="secondary" size="sm" onClick={exportCSV}>
              <IconDownload />
              Export CSV
            </Button>
          </div>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Orders table"
          aria-busy={loading}
        >
          <Table>
            <TableCaption className="ch-sr-only">
              Synthetic SaaS orders for the Chamfer UI demonstration
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                {sortHeader('customer', 'Customer')}
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                {sortHeader('amount', 'Amount')}
                {sortHeader('date', 'Date')}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 6 }, (_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }, (_, j) => (
                      <TableCell key={j}>
                        <Skeleton style={{ height: 16, width: j === 1 ? 120 : 60 }} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : visible.length ? (
                visible.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      <span className="order-id">{o.id}</span>
                    </TableCell>
                    <TableCell>
                      <div className="customer-cell">
                        <span className="customer-avatar">{o.initials}</span>
                        <div>
                          <strong>{o.customer}</strong>
                          <span>{o.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="plan-text text-foreground">{o.plan}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          o.status === 'Paid'
                            ? 'success'
                            : o.status === 'Pending'
                              ? 'warning'
                              : 'neutral'
                        }
                      >
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="amount-cell">{money(o.amount)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="table-date">{date(o.date)}</span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="empty-state">
                      <IconSearch size={24} />
                      <strong>No matching orders</strong>
                      <p>Try a different name or clear the filters.</p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setQuery('');
                          setStatus('All statuses');
                          setPage(1);
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="table-pagination">
          <span role="status">
            {loading
              ? 'Loading sample orders…'
              : filtered.length
                ? `${(currentPage - 1) * 6 + 1}–${Math.min(currentPage * 6, filtered.length)} of ${filtered.length} orders`
                : '0 orders'}
          </span>
          <div>
            <Button
              variant="secondary"
              size="sm"
              aria-label="Previous page"
              disabled={currentPage === 1 || loading}
              onClick={() => setPage(currentPage - 1)}
            >
              <IconChevronLeft />
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              aria-label="Next page"
              disabled={currentPage === totalPages || loading}
              onClick={() => setPage(currentPage + 1)}
            >
              <IconChevronRight />
            </Button>
          </div>
        </div>
      </section>
      <div className="dashboard-footer">
        <span>Illustrative data · No live business or payment connection</span>
        <Link href="/docs">Made with Chamfer UI ↗</Link>
      </div>
      <div className="ch-sr-only" role="status">
        {notice}
      </div>
    </AppShell>
  );
}
function IconArrowRightSmall() {
  return <IconArrowUpRight size={15} />;
}
function RevenueChart({ data, range }: { data: Order[]; range: string }) {
  const days = Array.from({ length: Number(range) }, (_, i) => i + (range === '14' ? 1 : 8));
  const values = days.map((day) =>
    data
      .filter((o) => o.status === 'Paid' && Number(o.date.slice(-2)) === day)
      .reduce((sum, o) => sum + o.amount, 0),
  );
  const max = Math.max(...values, 300);
  const column = 560 / days.length;
  const barWidth = Math.min(30, column * 0.55);
  return (
    <figure className="revenue-chart">
      <svg
        viewBox="0 0 600 160"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Sample paid revenue from October ${days[0]} to 14: ${values.map((v, i) => `October ${days[i]}, ${money(v)}`).join('; ')}`}
      >
        <g className="chart-grid">
          {[25, 70, 115, 159].map((y) => (
            <line key={y} x1="35" x2="590" y1={y} y2={y} />
          ))}
        </g>
        {values.map((v, i) => (
          <rect
            key={i}
            x={35 + i * column + (column - barWidth) / 2}
            y={160 - (v / max) * 130}
            width={barWidth}
            height={(v / max) * 130}
            rx="2"
            fill="var(--ch-semantic-accent)"
            opacity={i === values.length - 1 ? 1 : 0.55}
          />
        ))}
      </svg>
      <div
        className="chart-labels"
        style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}
        aria-hidden="true"
      >
        {days.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <figcaption>
        <span>October · Sample data</span>
        <strong>
          {money(values.reduce((a, b) => a + b, 0))} <span>selected period</span>
        </strong>
      </figcaption>
    </figure>
  );
}
