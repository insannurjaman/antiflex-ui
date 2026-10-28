import { WorkspaceTools } from '../../../components/workspace-specimens';
export const metadata = { title: 'Workspace navigation and planning' };
export default function WorkspaceToolsPage() {
  return (
    <>
      <h1>Find the next step.</h1>
      <p className="doc-lead">
        Browse resources, run an action, choose a reviewer, or plan a date. Eight new families share
        the same compact foundation.
      </p>
      <h2>A working local workspace</h2>
      <p>
        These examples use synthetic data. Form submissions update the page; exports download a
        local sample. No account or backend is connected.
      </p>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Workspace tools</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <WorkspaceTools />
        </div>
      </div>
      <h2>Keep navigation familiar</h2>
      <p>
        Navigation Menu uses disclosure buttons and ordinary links. Menubar provides application
        commands, with one Tab stop and arrow-key movement. Hover Card adds supplementary
        information without moving focus; its link remains usable and its visible preview button
        supports touch.
      </p>
      <h2>Search without changing the committed value</h2>
      <p>
        Select lets people inspect choices before committing. Combobox filters named options, keeps
        focus in its input, and restores the committed label when dismissed. Both submit through
        native form controls and support required validation and reset. Command runs local actions;
        a modal composition is provided without a global shortcut.
      </p>
      <h2>Use date-only values</h2>
      <p>
        Calendar and Date Picker use Gregorian YYYY-MM-DD strings and UTC arithmetic. Labels follow
        the supplied locale, week start is explicit, and min/max boundaries and unavailable dates
        remain clear. This release supports single dates; range selection, multiple calendars and
        alternate calendar systems remain future work.
      </p>
      <p>
        Keyboard references:{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/">W3C menubar</a>,{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">combobox</a>, and{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/">
          date picker guidance
        </a>
        . Automated checks supplement a manual assistive-technology review.
      </p>
    </>
  );
}
