import { ModalExample } from '../../../components/modal-specimens';
export const metadata = { title: 'Focused tasks and confirmations' };
export default function ModalsPage() {
  return (
    <>
      <h1>Make room for one task.</h1>
      <p className="doc-lead">
        Edit a sample project, review long content, or ask for a deliberate confirmation. Two modal
        primitives share one native foundation.
      </p>
      <h2>Tasks and confirmations</h2>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Modal workspace</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <ModalExample />
        </div>
      </div>
      <h2>Focus follows the task</h2>
      <p>
        Opening moves focus inside. Tab and Shift+Tab stay within the active modal; Escape closes
        the topmost modal. Closing restores its invoker. The edit example can open a nested
        confirmation without closing the parent.
      </p>
      <h2>Choose the right interruption</h2>
      <p>
        Dialog supports ordinary focused tasks and optional backdrop dismissal. Alert Dialog
        requires an explicit response and initially focuses its least destructive action. Keep
        inline feedback inline when it does not require a decision.
      </p>
      <h2>Native semantics, explicit ownership</h2>
      <p>
        The foundation uses <code>HTMLDialogElement.showModal()</code>. The browser owns the top
        layer and inert background. Controlled state, validation, asynchronous work, and the next
        logical focus target belong to the application. These examples update local state and never
        send project data to a server.
      </p>
      <p>
        Implementation guidance follows the{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/">
          W3C modal dialog pattern
        </a>
        , <a href="https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/">alert dialog pattern</a>,
        and{' '}
        <a href="https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element">
          HTML dialog standard
        </a>
        .
      </p>
    </>
  );
}
