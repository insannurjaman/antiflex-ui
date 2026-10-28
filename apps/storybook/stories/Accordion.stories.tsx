import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@antiflex/ui';
const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj;
function SampleAccordion({
  multiple = false,
  locked = false,
}: {
  multiple?: boolean;
  locked?: boolean;
}) {
  return (
    <Accordion
      type={multiple ? 'multiple' : 'single'}
      defaultValue={['license']}
      collapsible={!locked}
      headingLevel={2}
    >
      <AccordionItem value="license">
        <AccordionTrigger>What is included?</AccordionTrigger>
        <AccordionContent>The original component source and shared tokens.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="source">
        <AccordionTrigger>Can I edit the source?</AccordionTrigger>
        <AccordionContent>Yes. Keep the source in your application.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="disabled" disabled>
        <AccordionTrigger>Unavailable section</AccordionTrigger>
        <AccordionContent>Unavailable.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
function ControlledAccordion() {
  const [value, setValue] = useState(['one']);
  return (
    <>
      <Accordion value={value} onValueChange={setValue}>
        <AccordionItem value="one">
          <AccordionTrigger>First section</AccordionTrigger>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger>Second section</AccordionTrigger>
          <AccordionContent>Second content</AccordionContent>
        </AccordionItem>
      </Accordion>
      <button onClick={() => setValue([])}>Close all</button>
    </>
  );
}
export const Default: Story = { render: () => <SampleAccordion /> };
export const Multiple: Story = { render: () => <SampleAccordion multiple /> };
export const RequiredOpen: Story = { render: () => <SampleAccordion locked /> };
export const Controlled: Story = { render: () => <ControlledAccordion /> };
export const Nested: Story = {
  render: () => (
    <Accordion defaultValue={['outer']}>
      <AccordionItem value="outer">
        <AccordionTrigger>Outer section</AccordionTrigger>
        <AccordionContent>
          <SampleAccordion />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <SampleAccordion />
    </div>
  ),
};
