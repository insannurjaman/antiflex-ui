import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputGroup, InputGroupAddon, Input, Field, Button } from '@antiflex/ui';
const meta = { title: 'Components/Input Group', component: InputGroup } satisfies Meta<
  typeof InputGroup
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <Field label="Website">
      <InputGroup {...args}>
        <InputGroupAddon id="story-url-prefix">https://</InputGroupAddon>
        <Input aria-describedby="story-url-prefix" placeholder="your-company" />
        <InputGroupAddon align="end">.com</InputGroupAddon>
      </InputGroup>
    </Field>
  ),
};
export const Invalid: Story = { ...Default, args: { invalid: true } };
export const WithAction: Story = {
  render: () => (
    <Field label="Search records">
      <InputGroup>
        <Input type="search" />
        <Button variant="ghost" size="sm">
          Search
        </Button>
      </InputGroup>
    </Field>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Field key={size} label={'Website ' + size}>
          <InputGroup size={size}>
            <InputGroupAddon aria-hidden="true">@</InputGroupAddon>
            <Input size={size} />
            <Button size="sm" variant="ghost">
              Find
            </Button>
          </InputGroup>
        </Field>
      ))}
    </div>
  ),
};
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Field label="Website">
        <InputGroup>
          <InputGroupAddon>https://</InputGroupAddon>
          <Input />
          <InputGroupAddon align="end">.com</InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  ),
};
