'use client';
import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Button,
  Checkbox,
  Field,
  Input,
  NativeSelect,
  TextField,
  Textarea,
  Alert,
  Badge,
} from '@antiflex/ui';
import {
  IconArrowRight,
  IconArrowLeft,
  IconCheck,
  IconLayersIntersect,
  IconLayoutDashboard,
  IconUsers,
  IconCircleCheck,
} from '@tabler/icons-react';
import { DemoLink } from './common';
import { useDemo, event, record, newId, type Member } from './store';
export function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [recovery, setRecovery] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
  }, [mode]);
  const router = useRouter();
  const params = useSearchParams();
  const { state, setState } = useDemo();
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('antiflex-demo');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mode === 'reset') {
      setRecovery(true);
      return;
    }
    if (mode === 'signup') {
      const name = String(new FormData(e.currentTarget).get('name')).trim();
      setState((s) => ({
        ...s,
        profile: { ...s.profile, name, email },
        members: s.members.map((m) => (m.role === 'Owner' ? { ...m, name, email } : m)),
      }));
    }
    router.push(
      (mode === 'signup' ? '/demo/onboarding' : '/demo') +
        (params.get('layout') === 'top' ? '?layout=top' : ''),
    );
  }
  const choose = (next: typeof mode) => {
    setMode(next);
    setRecovery(false);
  };
  return (
    <div className="demo-auth-layout">
      <section className="demo-auth-story">
        <DemoLink href="/demo" className="demo-auth-logo">
          <span className="demo-orbit-mark">O</span>Orbit
        </DemoLink>
        <div>
          <h2>
            A little more focus.
            <br />A lot more possibility.
          </h2>
          <p>
            A considered workspace for the people, projects, and decisions that move your business
            forward.
          </p>
          <ul>
            <li>
              <IconLayoutDashboard size={19} />
              One clear view of your business
            </li>
            <li>
              <IconLayersIntersect size={19} />
              Workflows that fit together
            </li>
            <li>
              <IconUsers size={19} />
              Room for your whole team
            </li>
          </ul>
        </div>
        <p className="demo-auth-caption">An interactive product example built with antiflex/ui.</p>
      </section>
      <section className="demo-auth-form">
        <DemoLink href="/demo" className="demo-inline-link">
          <IconArrowLeft size={16} />
          Back to the workspace
        </DemoLink>
        <div className="demo-auth-form-inner">
          <h1 ref={heading} tabIndex={-1}>
            {mode === 'reset'
              ? 'Reset your password'
              : mode === 'signup'
                ? 'Make space for good work.'
                : 'Welcome back.'}
          </h1>
          <p>
            {mode === 'reset'
              ? 'Explore the recovery confirmation state.'
              : mode === 'signup'
                ? 'Create a sample identity and continue to workspace setup.'
                : 'Use the prefilled demo credentials to explore the workspace.'}
          </p>
          <Alert title="This is a demo">
            No authentication service is connected. Use sample information, not a real password.
          </Alert>
          {recovery ? (
            <div className="demo-recovery" role="status">
              <IconCircleCheck size={30} />
              <h2>Recovery preview complete.</h2>
              <p>
                A real product would send instructions to {email}. This demo has not sent an email.
              </p>
              <Button onClick={() => choose('signin')}>Back to sign in</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="demo-form-stack">
              {mode === 'signup' && (
                <TextField
                  label="Full name"
                  pattern={String.raw`.*\S.*\S.*`}
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  defaultValue={state.profile.name}
                />
              )}
              <TextField
                label="Email address"
                name="email"
                type="email"
                required
                maxLength={120}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              {mode !== 'reset' && (
                <TextField
                  label="Demo password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  maxLength={80}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  description="The sample password is antiflex-demo. It is never stored or sent."
                />
              )}
              {mode === 'signin' && (
                <button
                  type="button"
                  className="demo-text-button demo-forgot"
                  onClick={() => choose('reset')}
                >
                  Forgot password?
                </button>
              )}
              {mode === 'signup' && (
                <label className="demo-terms">
                  <Checkbox required />
                  <span>I understand this creates a local demo identity, not a real account.</span>
                </label>
              )}
              <Button type="submit">
                {mode === 'reset'
                  ? 'Preview password recovery'
                  : mode === 'signup'
                    ? 'Continue to setup'
                    : 'Continue to demo workspace'}
                <IconArrowRight size={16} />
              </Button>
            </form>
          )}
          <div className="demo-auth-switch">
            {mode === 'signin' ? (
              <>
                New to Orbit? <button onClick={() => choose('signup')}>Try sign up</button>
              </>
            ) : (
              <button onClick={() => choose('signin')}>Return to sign in</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
export function OnboardingPage() {
  const { state, setState } = useDemo();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);
  const [name, setName] = useState(state.workspace.name);
  const [industry, setIndustry] = useState(state.workspace.industry);
  const [invites, setInvites] = useState('');
  const [error, setError] = useState('');
  const steps = ['Your workspace', 'Your people', 'Ready to go'];
  const emails = Array.from(
    new Set(
      invites
        .split(/[\n,]+/)
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
  function next(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 0 && name.trim().length < 2) {
      setError('Enter a workspace name with at least two characters.');
      return;
    }
    if (
      step === 1 &&
      (emails.length > 5 || emails.some((email) => !/^\S+@\S+\.\S+$/.test(email)))
    ) {
      setError('Enter up to five valid sample email addresses, one per line.');
      return;
    }
    setError('');
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    const members: Member[] = emails
      .filter((email) => !state.members.some((m) => m.email.toLowerCase() === email))
      .map((email) => ({
        id: newId('MEM'),
        name: email.split('@')[0],
        email,
        role: 'Member',
        status: 'Invited',
      }));
    setState((s) => ({
      ...s,
      workspace: { ...s.workspace, name: name.trim(), industry },
      members: [...s.members, ...members],
      activity: record(
        s,
        event(
          `${name.trim()} workspace setup was completed`,
          `${members.length} sample member invitations added. No email was sent.`,
          'Workspace',
        ),
      ),
    }));
    router.push('/demo' + (params.get('layout') === 'top' ? '?layout=top' : ''));
  }
  return (
    <div className="demo-onboarding">
      <aside>
        <DemoLink href="/demo" className="demo-auth-logo">
          <span className="demo-orbit-mark">O</span>Orbit
        </DemoLink>
        <h2>
          Good things start
          <br />
          with a clear space.
        </h2>
        <p>Shape your sample workspace in a few small steps.</p>
        <ol className="demo-setup-steps">
          {steps.map((s, i) => (
            <li key={s} aria-current={step === i ? 'step' : undefined}>
              <span>{step > i ? <IconCheck size={16} /> : i + 1}</span>
              <div>
                <strong>{s}</strong>
                <p>
                  {
                    [
                      'The basics of your team',
                      'Bring a few teammates along',
                      'Review and open your workspace',
                    ][i]
                  }
                </p>
              </div>
            </li>
          ))}
        </ol>
        <DemoLink href="/demo" className="demo-inline-link">
          <IconArrowLeft size={16} />
          Skip setup and explore
        </DemoLink>
      </aside>
      <section className="demo-onboarding-main">
        <div
          className="demo-setup-progress"
          role="progressbar"
          aria-label="Workspace setup"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
          aria-valuetext={steps[step]}
        >
          {steps.map((s, i) => (
            <span key={s} data-complete={i <= step} />
          ))}
        </div>
        <p className="demo-help">Step {step + 1} of 3</p>
        <h1 ref={heading} tabIndex={-1}>
          {['A home for your team.', 'Better work, together.', 'Everything in its place.'][step]}
        </h1>
        <p>
          {
            [
              'Tell us a little about the sample workspace you are setting up.',
              'Add a few sample teammates, or skip this step for now.',
              'Review your choices before opening the workspace.',
            ][step]
          }
        </p>
        <form onSubmit={next} className="demo-form-stack">
          {step === 0 && (
            <>
              <TextField
                label="Workspace name"
                pattern={String.raw`.*\S.*\S.*`}
                required
                minLength={2}
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={error || undefined}
              />
              <Field label="Industry">
                <NativeSelect value={industry} onChange={(e) => setIndustry(e.target.value)}>
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
            </>
          )}
          {step === 1 && (
            <>
              <Field
                label="Sample teammate emails"
                description="Up to five emails, one per line. No email will be sent."
                error={error || undefined}
              >
                <Textarea
                  value={invites}
                  maxLength={500}
                  rows={5}
                  placeholder={'jamie@example.com\nsam@example.com'}
                  onChange={(e) => setInvites(e.target.value)}
                />
              </Field>
              <p className="demo-help">Leaving this empty keeps the existing sample team.</p>
            </>
          )}
          {step === 2 && (
            <>
              <dl className="demo-detail-list">
                <div>
                  <dt>Workspace</dt>
                  <dd>{name}</dd>
                </div>
                <div>
                  <dt>Industry</dt>
                  <dd>{industry}</dd>
                </div>
                <div>
                  <dt>Sample invites</dt>
                  <dd>{emails.length ? emails.join(', ') : 'No new invitations'}</dd>
                </div>
                <div>
                  <dt>Starting point</dt>
                  <dd>Existing illustrative projects and customers</dd>
                </div>
              </dl>
              <Alert title="Ready to explore">
                This configures the local demo. No real workspace, invitations, or subscription will
                be created.
              </Alert>
            </>
          )}
          <div className="demo-onboarding-actions">
            {step > 0 && (
              <Button
                variant="secondary"
                onClick={() => {
                  setStep(step - 1);
                  setError('');
                }}
              >
                <IconArrowLeft size={16} />
                Back
              </Button>
            )}
            <Button type="submit">
              {step === 2 ? 'Open your workspace' : 'Continue'}
              <IconArrowRight size={16} />
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
