'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Badge,
  Button,
  Checkbox,
  Field,
  NativeSelect,
  Progress,
  RadioGroup,
  TextField,
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
  useToast,
} from '@antiflex/ui';
import {
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconDownload,
  IconCreditCard,
  IconReceipt,
  IconLock,
  IconCircleCheck,
} from '@tabler/icons-react';
import { useDemo, record, event, newId, download, type DemoState } from './store';
import { PageHeading, Panel, DemoLink, Status } from './common';
import { samplePlans, type PlanKey, money, dateLabel } from './catalog';
const planKeys = Object.keys(samplePlans) as PlanKey[];
function CyclePicker({
  value,
  onChange,
}: {
  value: 'monthly' | 'annual';
  onChange: (v: 'monthly' | 'annual') => void;
}) {
  return (
    <div className="demo-segment" role="group" aria-label="Billing cycle">
      <Button
        variant={value === 'monthly' ? 'primary' : 'ghost'}
        aria-pressed={value === 'monthly'}
        size="sm"
        onClick={() => onChange('monthly')}
      >
        Monthly
      </Button>
      <Button
        variant={value === 'annual' ? 'primary' : 'ghost'}
        aria-pressed={value === 'annual'}
        size="sm"
        onClick={() => onChange('annual')}
      >
        Yearly <span>2 months free</span>
      </Button>
    </div>
  );
}
export function BillingPage() {
  const { state, setState } = useDemo();
  const { toast } = useToast();
  const [cycle, setCycle] = useState(state.billing.cycle);
  const [contact, setContact] = useState(false);
  const [invoice, setInvoice] = useState<{
    id: string;
    date: string;
    total: number;
    email: string;
  }>();
  const current = samplePlans[state.billing.plan];
  const recurring =
    current.price * state.billing.seats * (state.billing.cycle === 'annual' ? 10 : 1);
  const invoices = [
    ...state.receipts.map((r) => ({ ...r })),
    ...['2026-10-01', '2026-09-01', '2026-08-01'].map((date, i) => ({
      id: 'INV-2026-' + String(10 - i).padStart(3, '0'),
      date,
      total: 145,
      email: 'billing@example.com',
    })),
  ];
  return (
    <>
      <PageHeading
        title="Billing"
        description="Your plan, your usage, and every invoice in one place."
      />
      <div className="demo-billing-current">
        <div>
          <h2>
            {current.name} plan <Badge>Current sample plan</Badge>
          </h2>
          <p>
            {state.billing.seats} seats · Billed{' '}
            {state.billing.cycle === 'annual' ? 'yearly' : 'monthly'} · {money(recurring)} /{' '}
            {state.billing.cycle === 'annual' ? 'year' : 'month'}
          </p>
        </div>
        <DemoLink
          href={`/demo/checkout?plan=${state.billing.plan}&cycle=${state.billing.cycle}`}
          className="af-button af-button--secondary af-button--md"
        >
          Manage plan <IconArrowRight size={16} />
        </DemoLink>
      </div>
      <div className="demo-two-column">
        <Panel
          title="Workspace usage"
          description="Sample usage based on the records in this demo."
        >
          <div className="demo-usage">
            <div>
              <span>Projects</span>
              <strong>
                {state.projects.length} / {current.projects}
              </strong>
            </div>
            <Progress
              value={state.projects.length}
              max={current.projects}
              aria-label="Project capacity"
            />
            <div>
              <span>Team records</span>
              <strong>{state.members.length} members</strong>
            </div>
            <p className="demo-help">{state.billing.seats} sample seats on your current plan.</p>
          </div>
        </Panel>
        <Panel title="Billing information" description="No actual payment method is connected.">
          <div className="demo-payment-method">
            <IconCreditCard size={28} />
            <div>
              <strong>Demo Visa ending in 4242</strong>
              <span>Illustrative payment method</span>
            </div>
          </div>
          <div className="demo-billing-contact">
            <span>{state.billing.invoiceEmail}</span>
            <Dialog open={contact} onOpenChange={setContact}>
              <DialogTrigger variant="secondary" size="sm">
                Edit billing email
              </DialogTrigger>
              <DialogContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = String(new FormData(e.currentTarget).get('email')).trim();
                    setState((s) => ({
                      ...s,
                      billing: { ...s.billing, invoiceEmail: email },
                      activity: record(
                        s,
                        event(
                          'Billing email was updated',
                          'Sample invoice contact changed.',
                          'Billing',
                        ),
                      ),
                    }));
                    setContact(false);
                    toast({ title: 'Billing email saved', variant: 'success' });
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Billing email</DialogTitle>
                    <DialogDescription>
                      Change the sample invoice contact. No email will be sent.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <TextField
                      label="Invoice email"
                      name="email"
                      type="email"
                      required
                      maxLength={120}
                      defaultValue={state.billing.invoiceEmail}
                    />
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <Button type="submit">Save billing email</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Panel>
      </div>
      <div className="demo-plan-heading">
        <div>
          <h2>A little room. Or a lot.</h2>
          <p>Illustrative Orbit plans, for this demo only. These are not antiflex/ui prices.</p>
        </div>
        <CyclePicker value={cycle} onChange={setCycle} />
      </div>
      <div className="demo-plans">
        {planKeys.map((key) => {
          const p = samplePlans[key];
          return (
            <section className="demo-plan" key={key}>
              <div className="demo-plan-name">
                <h3>{p.name}</h3>
                {state.billing.plan === key && <Badge size="sm">Current plan</Badge>}
              </div>
              <p>{p.description}</p>
              <div className="demo-plan-price">
                <strong>{money(p.price * (cycle === 'annual' ? 10 / 12 : 1))}</strong>
                <span>/ seat / month</span>
              </div>
              <p className="demo-help">
                {cycle === 'annual'
                  ? `${money(p.price * 10)} per seat, billed yearly`
                  : 'Billed monthly'}
              </p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <IconCheck size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <DemoLink
                href={`/demo/checkout?plan=${key}&cycle=${cycle}`}
                className={`af-button af-button--${key === state.billing.plan ? 'secondary' : 'primary'} af-button--md`}
              >
                {key === state.billing.plan ? 'Manage' : 'Choose'} {p.name}
                <IconArrowRight size={16} />
              </DemoLink>
            </section>
          );
        })}
      </div>
      <Panel title="Invoice history" description="Preview or download an illustrative invoice.">
        <div className="demo-table-scroll" role="region" aria-label="Sample invoices" tabIndex={0}>
          <Table>
            <TableCaption className="af-sr-only">
              Sample Orbit invoices, including locally completed demo checkouts
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="demo-code">{i.id}</TableCell>
                  <TableCell>{dateLabel(i.date)}</TableCell>
                  <TableCell>{money(i.total)}</TableCell>
                  <TableCell>
                    <Badge variant="success">Demo paid</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setInvoice(i)}>
                      View invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
      <Dialog
        open={!!invoice}
        onOpenChange={(v) => {
          if (!v) setInvoice(undefined);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sample invoice {invoice?.id}</DialogTitle>
            <DialogDescription>
              Illustrative record only. This is not a tax invoice or proof of payment.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            {invoice && (
              <dl className="demo-detail-list">
                <div>
                  <dt>Issued</dt>
                  <dd>{dateLabel(invoice.date)}</dd>
                </div>
                <div>
                  <dt>Bill to</dt>
                  <dd>{invoice.email}</dd>
                </div>
                <div>
                  <dt>Amount</dt>
                  <dd>{money(invoice.total)}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>Demo paid · No payment processed</dd>
                </div>
              </dl>
            )}
          </DialogBody>
          <DialogFooter>
            <DialogClose>Close invoice</DialogClose>
            <Button
              onClick={() => {
                if (invoice)
                  download(
                    `orbit-${invoice.id}.txt`,
                    `ORBIT SAMPLE INVOICE\n${invoice.id}\nDate: ${dateLabel(invoice.date)}\nBill to: ${invoice.email}\nTotal: ${money(invoice.total)}\nIllustrative only. No payment was processed.`,
                    'text/plain',
                  );
              }}
            >
              <IconDownload size={16} />
              Download sample
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function CheckoutPage() {
  const params = useSearchParams();
  const { state, setState } = useDemo();
  const [plan, setPlan] = useState<PlanKey>(() =>
    planKeys.includes(params.get('plan') as PlanKey)
      ? (params.get('plan') as PlanKey)
      : state.billing.plan,
  );
  const [cycle, setCycle] = useState<'monthly' | 'annual'>(() =>
    params.get('cycle') === 'annual'
      ? 'annual'
      : params.get('cycle') === 'monthly'
        ? 'monthly'
        : state.billing.cycle,
  );
  const [seats, setSeats] = useState(Math.max(state.billing.seats, state.members.length));
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<DemoState['receipts'][number]>();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const success = useRef<HTMLHeadingElement>(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (receipt) success.current?.focus();
  }, [receipt]);
  const subtotal = samplePlans[plan].price * seats * (cycle === 'annual' ? 10 : 1),
    saving = discount ? Math.round(subtotal * 0.2 * 100) / 100 : 0,
    total = subtotal - saving;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget),
      email = String(data.get('email')).trim();
    setProcessing(true);
    timer.current = setTimeout(() => {
      const r = {
        id: newId('DEMO'),
        plan,
        cycle,
        seats,
        total,
        date: new Date().toISOString(),
        email,
        method: data.get('method') === 'invoice' ? ('invoice' as const) : ('card' as const),
        billingName: String(data.get('name')).trim(),
        company: String(data.get('company')).trim(),
        country: String(data.get('country')),
      };
      setState((s) => ({
        ...s,
        billing: { plan, cycle, seats, invoiceEmail: email },
        receipts: [r, ...s.receipts].slice(0, 30),
        activity: record(
          s,
          event(
            `${samplePlans[plan].name} demo checkout completed`,
            `${seats} seats, ${cycle} billing. No payment processed.`,
            'Billing',
          ),
        ),
      }));
      setReceipt(r);
      setProcessing(false);
    }, 700);
  }
  if (receipt)
    return (
      <div className="demo-checkout-success">
        <span className="demo-success-icon">
          <IconCircleCheck size={36} />
        </span>
        <h1 ref={success} tabIndex={-1}>
          Your demo workspace is ready.
        </h1>
        <p>
          You completed the checkout example. No payment was processed and no subscription was
          created.
        </p>
        <dl className="demo-detail-list">
          <div>
            <dt>Reference</dt>
            <dd>{receipt.id}</dd>
          </div>
          <div>
            <dt>Sample plan</dt>
            <dd>
              {samplePlans[receipt.plan].name} · {receipt.seats} seats
            </dd>
          </div>
          <div>
            <dt>Billing cycle</dt>
            <dd>{receipt.cycle}</dd>
          </div>
          <div>
            <dt>Demo total</dt>
            <dd>{money(receipt.total)}</dd>
          </div>
          <div>
            <dt>Payment preview</dt>
            <dd>{receipt.method === 'invoice' ? 'Demo invoice' : 'Demo Visa ending in 4242'}</dd>
          </div>
          <div>
            <dt>Invoice email</dt>
            <dd>{receipt.email}</dd>
          </div>
        </dl>
        <div className="demo-actions">
          <Button
            variant="secondary"
            onClick={() =>
              download(
                `orbit-${receipt.id}.txt`,
                `ORBIT DEMO RECEIPT\nReference: ${receipt.id}\nPlan: ${samplePlans[receipt.plan].name}\nSeats: ${receipt.seats}\nCycle: ${receipt.cycle}\nTotal: ${money(receipt.total)}\nEmail: ${receipt.email}\nName: ${receipt.billingName}\nCompany: ${receipt.company}\nCountry: ${receipt.country}\nMethod: ${receipt.method}\nNo payment was processed. This is an illustrative receipt.`,
                'text/plain',
              )
            }
          >
            <IconDownload size={16} />
            Download receipt
          </Button>
          <DemoLink href="/demo/billing" className="af-button af-button--primary af-button--md">
            Back to billing <IconArrowRight size={16} />
          </DemoLink>
        </div>
        <Button variant="ghost" onClick={() => setReceipt(undefined)}>
          Try another checkout
        </Button>
      </div>
    );
  return (
    <>
      <PageHeading
        title="Make room for your next chapter."
        description="A complete checkout flow, with sample plans and zero real payments."
        actions={
          <DemoLink className="demo-inline-link" href="/demo/billing">
            <IconArrowLeft size={16} />
            Back to billing
          </DemoLink>
        }
      />
      <form onSubmit={submit}>
        <fieldset disabled={processing} className="demo-checkout-fieldset">
          <div className="demo-checkout-layout">
            <div className="demo-checkout-steps">
              <Panel
                title="Choose your plan"
                description="All prices are illustrative Orbit demo prices."
              >
                <Field label="Plan">
                  <NativeSelect value={plan} onChange={(e) => setPlan(e.target.value as PlanKey)}>
                    {planKeys.map((p) => (
                      <option key={p} value={p}>
                        {samplePlans[p].name} — {money(samplePlans[p].price)} / seat / month
                      </option>
                    ))}
                  </NativeSelect>
                </Field>
                <div className="demo-checkout-options">
                  <CyclePicker value={cycle} onChange={setCycle} />
                  <TextField
                    label="Seats"
                    type="number"
                    min={1}
                    max={25}
                    required
                    value={seats}
                    onChange={(e) => {
                      const n = e.target.valueAsNumber;
                      setSeats(Number.isNaN(n) ? 1 : Math.min(25, Math.max(1, n)));
                    }}
                  />
                </div>
              </Panel>
              <Panel
                title="Billing details"
                description="Use sample information; nothing will be sent."
              >
                <div className="demo-form-grid">
                  <TextField
                    label="Full name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    defaultValue={state.profile.name}
                  />
                  <TextField
                    label="Invoice email"
                    name="email"
                    type="email"
                    required
                    maxLength={120}
                    defaultValue={state.billing.invoiceEmail}
                  />
                  <TextField
                    label="Company"
                    name="company"
                    maxLength={80}
                    defaultValue={state.workspace.name}
                  />
                  <Field label="Country">
                    <NativeSelect name="country" defaultValue="Indonesia">
                      <option>Indonesia</option>
                      <option>Singapore</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Other</option>
                    </NativeSelect>
                  </Field>
                </div>
              </Panel>
              <Panel
                title="Payment method"
                description="Sample methods only. Do not enter real payment information."
              >
                <RadioGroup
                  className="demo-payment-choices"
                  label="Demo payment method"
                  name="method"
                  defaultValue="card"
                  options={[
                    {
                      value: 'card',
                      label: 'Demo Visa ending in 4242',
                      description: 'Illustrative card. No charge.',
                    },
                    {
                      value: 'invoice',
                      label: 'Demo invoice',
                      description: 'Preview an invoice-based workflow.',
                    },
                  ]}
                />
              </Panel>
            </div>
            <aside className="demo-order-summary" aria-label="Order summary">
              <div className="demo-summary-heading">
                <h2>Order summary</h2>
                <Badge>Demo only</Badge>
              </div>
              <p>{samplePlans[plan].name} workspace</p>
              <dl>
                <div>
                  <dt>
                    {seats} {seats === 1 ? 'seat' : 'seats'} ·{' '}
                    {cycle === 'annual' ? 'Yearly' : 'Monthly'}
                  </dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                {cycle === 'annual' && (
                  <div>
                    <dt>Annual savings included</dt>
                    <dd>{money(samplePlans[plan].price * seats * 2)}</dd>
                  </div>
                )}
                {discount && (
                  <div>
                    <dt>ORBIT20 discount</dt>
                    <dd>−{money(saving)}</dd>
                  </div>
                )}
                <div>
                  <dt>Tax</dt>
                  <dd>{money(0)}</dd>
                </div>
                <div className="demo-summary-total">
                  <dt>Demo total</dt>
                  <dd data-testid="checkout-total">{money(total)}</dd>
                </div>
              </dl>
              <p className="demo-help">
                {cycle === 'annual' ? 'Per year' : 'Per month'} · USD · Illustrative, not a charge
              </p>
              <div className="demo-coupon">
                <TextField
                  label="Demo discount code"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponError('');
                  }}
                  placeholder="Try ORBIT20"
                  error={couponError || undefined}
                />
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (discount) {
                      setDiscount(false);
                      setCoupon('');
                      setCouponError('');
                    } else if (coupon.trim().toUpperCase() === 'ORBIT20') {
                      setDiscount(true);
                      setCouponError('');
                    } else setCouponError('Use ORBIT20 to try a 20% demo discount.');
                  }}
                >
                  {discount ? 'Remove' : 'Apply'}
                </Button>
              </div>
              {discount && (
                <p className="demo-help" role="status">
                  20% discount applied to this demo checkout only.
                </p>
              )}
              <label className="demo-terms">
                <Checkbox required name="acknowledged" />
                <span>I understand this is a demo and no payment will be processed.</span>
              </label>
              <Button type="submit" loading={processing} className="demo-checkout-submit">
                <IconLock size={16} />
                {processing ? 'Preparing your demo…' : 'Complete demo checkout'}
              </Button>
              <p className="demo-summary-footnote">
                No card details collected. No real subscription. Your sample plan is saved in this
                browser.
              </p>
            </aside>
          </div>
        </fieldset>
      </form>
    </>
  );
}
