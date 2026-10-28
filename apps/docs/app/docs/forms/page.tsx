import { FormExample } from '../../../components/form-specimens';
import { Code } from '../../../components/code';
export const metadata = { title: 'Composing forms' };
export default function FormsPage() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Examples</div>
      <h1>Compose a complete form.</h1>
      <p className="doc-lead">
        Ten form building blocks, one token language. Try validation, keyboard navigation, native
        form values, and reset below.
      </p>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Workspace preferences</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <FormExample />
        </div>
      </div>
      <h2>Compose the field, keep the control.</h2>
      <p>
        Field links one control to its label, description, error, and required state. Each control
        keeps its native events, attributes, and ref. Use FieldSet and FieldLegend for related
        controls.
      </p>
      <Code>{`<Field label="Work email" description="Use your work address." error={error} required>\n  <Input name="email" type="email" autoComplete="email" />\n</Field>\n\n<RadioGroup label="Visibility" name="visibility" defaultValue="team"\n  options={[{ value: 'team', label: 'Team' }, { value: 'private', label: 'Private' }]}\n/>`}</Code>
      <h2>Validation belongs to your form.</h2>
      <p>
        This example validates on submit, connects each error to its control, announces a summary,
        and focuses the first invalid field. It simulates a save in memory; it has no backend
        connection or persistent storage. Native FormData reads values from named controls.
      </p>
      <h2>Controlled state and reset</h2>
      <p>
        Use value/checked with change handlers for controlled state, or defaultValue/defaultChecked
        for browser-owned state. A native reset restores uncontrolled defaults. Reset controlled
        values and a controlled mixed checkbox state in your application’s reset handler. Do not
        switch a control between controlled and uncontrolled modes.
      </p>
      <h2>Keyboard and labels</h2>
      <p>
        Tab moves through controls and buttons. Space toggles checkboxes and switches; native radios
        use arrow keys. Native selects follow the browser’s keyboard and mobile picker behavior.
        Give every standalone control a Label or accessible name. ButtonGroup keeps each action in
        the normal Tab sequence.
      </p>
    </>
  );
}
