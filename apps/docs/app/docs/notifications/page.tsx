import { ToastExample } from '../../../components/toast-specimens';
export const metadata = { title: 'Feedback without interruption' };
export default function NotificationsPage() {
  return (
    <>
      <h1>Keep the work in focus.</h1>
      <p className="doc-lead">
        Confirm a change, explain a problem, or offer a way back. Notifications let the task
        continue.
      </p>
      <h2>A local project, with a way back</h2>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Toast foundation</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <ToastExample />
        </div>
      </div>
      <h2>Give people time</h2>
      <p>
        Save confirmations can disappear after six seconds. Warnings, errors, and messages with an
        action stay until dismissed. Turn on the preference in the example to keep save
        confirmations too. Hover, keyboard focus, and an inactive tab pause the timer.
      </p>
      <h2>Queue without crowding</h2>
      <p>
        Three notifications are visible at once. Queued messages start their timer when they become
        visible. An explicit ID updates the same notification, which keeps progress and completion
        together.
      </p>
      <h2>Announce, without moving focus</h2>
      <p>
        New messages are announced politely. Reserve assertive announcements for urgent information.
        Review notifications moves focus only when requested; Escape works while focus is inside the
        notification area.
      </p>
      <h2>Inline or beside the workspace</h2>
      <p>
        This example stays in the page so you can inspect it. The default viewport sits at the
        bottom end of the screen, respects text direction, and keeps the same anatomy. Put
        actionable modal notifications inside their modal so the controls remain available.
      </p>
      <p>
        Accessibility references:{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/alert/">W3C alert guidance</a>,{' '}
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html">
          status messages
        </a>
        , and{' '}
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html">
          adjustable timing
        </a>
        .
      </p>
    </>
  );
}
