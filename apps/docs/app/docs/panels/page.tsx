import { PanelExample } from '../../../components/panel-specimens';
export const metadata = { title: 'Edge panels and bottom tasks' };
export default function PanelsPage() {
  return (
    <>
      <h1>A little room to finish the task.</h1>
      <p className="doc-lead">
        Edit a workspace beside the page, or complete a short export from the bottom. Both patterns
        protect focus until the task is closed.
      </p>
      <h2>Settings and exports</h2>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Sheet and Drawer</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <PanelExample />
        </div>
      </div>
      <h2>Choose the shape around the task</h2>
      <p>
        Sheet attaches to one of four physical viewport edges. Left and right sheets fill the screen
        height; top and bottom sheets fill its width. Drawer fits its content at the bottom,
        centered on wider screens and capped at 85% of the viewport height.
      </p>
      <h2>Keep the actions within reach</h2>
      <p>
        Header, Body, and Footer can sit directly inside Content or one direct form. The body
        scrolls independently; title and actions stay visible. Mobile safe-area padding keeps
        actions away from device edges. Use concise titles and descriptions, especially in
        landscape.
      </p>
      <h2>One modal contract</h2>
      <p>
        Both reuse Dialog: a modal top layer, keyboard focus containment, Escape, return focus, and
        scroll locks that survive nested tasks. Controlled state belongs to your application. Use an
        explicit close action. Drawer does not implement swipe dismissal or snap points.
      </p>
      <p>
        Keyboard and naming follow the{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/">
          W3C modal dialog pattern
        </a>
        . Use Popover when the surrounding page should remain interactive.
      </p>
    </>
  );
}
