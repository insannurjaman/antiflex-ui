import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldSet,
  FieldLegend,
  Input,
  Textarea,
  NativeSelect,
  Checkbox,
  Switch,
  Button,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Field',
  component: Field,
  args: {
    label: 'Work email',
    description: 'Use your work address.',
    children: <Input type="email" placeholder="you@company.com" />,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const Error: Story = { args: { error: 'Enter a valid email address.' } };
export const HiddenLabel: Story = { args: { hideLabel: true } };
export const Composition: Story = {
  render: () => (
    <form style={{ display: 'grid', gap: 24, maxWidth: 440 }}>
      <FieldSet>
        <FieldLegend>Workspace details</FieldLegend>
        <Field label="Name" required>
          <Input name="name" />
        </Field>
        <Field label="Brief">
          <Textarea name="brief" />
        </Field>
        <Field label="Timezone">
          <NativeSelect name="timezone">
            <option>Jakarta</option>
            <option>UTC</option>
          </NativeSelect>
        </Field>
        <Field label="Updates">
          <Checkbox name="updates" />
        </Field>
        <Field label="Notifications">
          <Switch name="notifications" />
        </Field>
      </FieldSet>
      <Button type="reset" variant="secondary">
        Reset
      </Button>
    </form>
  ),
};
export const RTL: Story = {
  render: () => (
    <div dir="rtl" style={{ maxWidth: 400 }}>
      <Field label="Workspace name" description="A shared name for your team.">
        <Input defaultValue="Orbit" />
      </Field>
    </div>
  ),
};
