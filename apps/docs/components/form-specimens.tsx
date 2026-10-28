'use client';
import { useRef, useState, type FormEvent } from 'react';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Field,
  FieldSet,
  FieldLegend,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  NativeSelect,
  RadioGroup,
  Switch,
  Textarea,
} from '@antiflex/ui';
import { IconSearch } from '@tabler/icons-react';

export function FormComponentDemo({ name }: { name: string }) {
  const [enabled, setEnabled] = useState(true);
  const [mixed, setMixed] = useState(true);
  const [action, setAction] = useState('');
  const [visibility, setVisibility] = useState('team');
  if (name === 'input')
    return (
      <div className="demo-fields">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Field key={size} label={`Project name · ${size}`}>
            <Input size={size} placeholder="Orbit workspace" />
          </Field>
        ))}
        <Field label="Workspace ID">
          <Input readOnly value="workspace_orbit" />
        </Field>
        <Field label="Archived project">
          <Input disabled placeholder="Unavailable" />
        </Field>
      </div>
    );
  if (name === 'label')
    return (
      <div className="demo-fields">
        <Label htmlFor="label-example" required>
          Workspace name
        </Label>
        <Input id="label-example" required placeholder="Click the label to focus" />
      </div>
    );
  if (name === 'field')
    return (
      <div className="demo-fields">
        <Field
          label="Work email"
          required
          description="Use your work address."
          error="Enter a valid email address."
        >
          <Input id="field-explicit-email" name="email" type="email" defaultValue="not-an-email" />
        </Field>
        <FieldSet>
          <FieldLegend>Workspace details</FieldLegend>
          <Field label="Name">
            <Input placeholder="Orbit" />
          </Field>
          <Field label="Notes">
            <Textarea rows={2} />
          </Field>
        </FieldSet>
      </div>
    );
  if (name === 'textarea')
    return (
      <div className="demo-fields">
        <Field label="Project brief" description="Up to 500 characters.">
          <Textarea name="brief" maxLength={500} placeholder="What are you building?" />
        </Field>
        <Field label="Archived brief">
          <Textarea disabled defaultValue="This project is archived." />
        </Field>
      </div>
    );
  if (name === 'native-select')
    return (
      <div className="demo-fields">
        <Field label="Timezone">
          <NativeSelect defaultValue="Asia/Jakarta">
            <optgroup label="Asia">
              <option value="Asia/Jakarta">Jakarta (UTC+7)</option>
              <option value="Asia/Singapore">Singapore (UTC+8)</option>
            </optgroup>
            <option value="UTC">UTC</option>
          </NativeSelect>
        </Field>
        <Field label="Locked timezone">
          <NativeSelect disabled>
            <option>UTC</option>
          </NativeSelect>
        </Field>
      </div>
    );
  if (name === 'checkbox')
    return (
      <div className="demo-fields">
        <label className="af-choice">
          <Checkbox indeterminate={mixed} onChange={() => setMixed(false)} />
          <span>Select all projects</span>
        </label>
        <label className="af-choice">
          <Checkbox defaultChecked name="updates" />
          <span>Product updates</span>
        </label>
        <label className="af-choice">
          <Checkbox disabled />
          <span>Locked preference</span>
        </label>
        <p className="af-field-help">
          The first checkbox starts in a mixed state. Space or a click selects it.
        </p>
      </div>
    );
  if (name === 'radio-group')
    return (
      <div className="demo-fields">
        <RadioGroup
          label="Workspace visibility"
          name="demo-visibility"
          value={visibility}
          onValueChange={setVisibility}
          options={[
            { value: 'team', label: 'Team', description: 'Everyone in your workspace.' },
            { value: 'private', label: 'Private', description: 'Only invited members.' },
            { value: 'public', label: 'Public', disabled: true },
          ]}
        />
        <p role="status" className="af-field-help">
          Selected: {visibility}
        </p>
      </div>
    );
  if (name === 'switch')
    return (
      <div className="demo-fields">
        <label className="af-choice">
          <Switch checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
          <span>Desktop notifications</span>
        </label>
        <label className="af-choice">
          <Switch disabled defaultChecked />
          <span>Required security alerts</span>
        </label>
        <p role="status" className="af-field-help">
          Desktop notifications are {enabled ? 'on' : 'off'}.
        </p>
      </div>
    );
  if (name === 'button-group')
    return (
      <div className="demo-fields">
        <ButtonGroup aria-label="Document actions">
          <Button variant="secondary" onClick={() => setAction('Draft saved.')}>
            Save draft
          </Button>
          <Button variant="secondary" onClick={() => setAction('A copy was created.')}>
            Save a copy
          </Button>
        </ButtonGroup>
        <p role="status" className="af-field-help">
          {action || 'Each action keeps its own keyboard focus.'}
        </p>
      </div>
    );
  if (name === 'input-group')
    return (
      <div className="demo-fields">
        <Field label="Search records">
          <InputGroup>
            <InputGroupAddon aria-hidden="true">
              <IconSearch />
            </InputGroupAddon>
            <Input type="search" placeholder="Find a record…" />
            <Button variant="ghost" size="sm" onClick={() => setAction('Sample search complete.')}>
              Search
            </Button>
          </InputGroup>
        </Field>
        <Field label="Website">
          <InputGroup>
            <InputGroupAddon id="website-prefix">https://</InputGroupAddon>
            <Input
              id="group-explicit-website"
              aria-describedby="website-prefix"
              placeholder="your-company"
            />
            <InputGroupAddon align="end">.com</InputGroupAddon>
          </InputGroup>
        </Field>
        <p role="status" className="af-field-help">
          {action}
        </p>
      </div>
    );
  return null;
}

export function FormExample() {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  function reset() {
    setErrors({});
    setStatus('Preferences reset to the sample defaults.');
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const nextErrors = {
      name: name.length < 2 ? 'Enter at least two characters.' : undefined,
      email: !email || !emailInput.validity.valid ? 'Enter a valid work email address.' : undefined,
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email) {
      setStatus('Preferences were not saved. Check the highlighted fields.');
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setSaving(true);
    setStatus('Saving sample preferences…');
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    setStatus(
      `Saved locally for ${name}. Visibility: ${data.get('visibility')}. Product updates: ${data.has('updates') ? 'on' : 'off'}. Notifications: ${data.has('notifications') ? 'on' : 'off'}.`,
    );
  }
  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      onReset={reset}
      className="form-example"
      aria-label="Workspace preferences"
    >
      <FieldSet disabled={saving}>
        <FieldLegend>Workspace profile</FieldLegend>
        <div className="form-example-grid">
          <Field
            label="Workspace name"
            controlId="preferences-name"
            required
            description="A name your team will recognize."
            error={errors.name}
          >
            <Input name="name" defaultValue="Orbit" autoComplete="organization" />
          </Field>
          <Field label="Work email" controlId="preferences-email" required error={errors.email}>
            <Input name="email" type="email" defaultValue="alex@example.com" autoComplete="email" />
          </Field>
        </div>
        <Field label="Workspace URL">
          <InputGroup>
            <InputGroupAddon id="preferences-prefix">antiflex.example/</InputGroupAddon>
            <Input name="slug" defaultValue="orbit" aria-describedby="preferences-prefix" />
          </InputGroup>
        </Field>
        <Field label="Project brief" description="Optional. Up to 500 characters.">
          <Textarea
            name="brief"
            maxLength={500}
            rows={3}
            placeholder="Tell your team what this workspace is for."
          />
        </Field>
        <Field label="Timezone">
          <NativeSelect name="timezone" defaultValue="Asia/Jakarta">
            <option value="Asia/Jakarta">Jakarta (UTC+7)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">New York</option>
          </NativeSelect>
        </Field>
        <RadioGroup
          label="Visibility"
          name="visibility"
          defaultValue="team"
          options={[
            { value: 'team', label: 'Team' },
            { value: 'private', label: 'Private' },
          ]}
          orientation="horizontal"
        />
        <div className="form-example-preferences">
          <div className="af-choice">
            <Checkbox id="preferences-updates" name="updates" defaultChecked />
            <Label htmlFor="preferences-updates">Product updates</Label>
          </div>
          <div className="af-choice">
            <Switch id="preferences-notifications" name="notifications" />
            <Label htmlFor="preferences-notifications">Desktop notifications</Label>
          </div>
        </div>
      </FieldSet>
      <ButtonGroup aria-label="Preference actions">
        <Button type="submit" loading={saving}>
          Save preferences
        </Button>
        <Button type="reset" variant="secondary" disabled={saving}>
          Reset
        </Button>
      </ButtonGroup>
      <p role="status" aria-atomic="true" className="form-example-status">
        {status || 'Sample preferences. This example does not send data to a server.'}
      </p>
    </form>
  );
}
