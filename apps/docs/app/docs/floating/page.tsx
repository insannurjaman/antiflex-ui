import { FloatingExample } from '../../../components/floating-specimens';
export const metadata = { title: 'Anchored panels and help' };
export default function FloatingPage() {
  return (
    <>
      <h1>Stay close to the work.</h1>
      <p className="doc-lead">
        Open a small task beside its trigger, or add a short explanation to an action. The
        surrounding page stays available.
      </p>
      <h2>Panels and supplemental help</h2>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Floating foundation</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <FloatingExample />
        </div>
      </div>
      <h2>Different focus contracts</h2>
      <p>
        Popover moves focus into a small task panel and closes when focus leaves. It does not trap
        Tab or make the page inert. Tooltip never takes focus; its trigger keeps a complete label.
        Essential instructions belong in visible text.
      </p>
      <h2>Placement follows the available space</h2>
      <p>
        Both components use the browser top layer, reposition on scroll and resize, and flip or
        clamp near viewport edges. Eight pixels separate the trigger and content by default. Hidden
        anchors request dismissal. Controlled state remains owned by the application.
      </p>
      <h2>Dismiss the nearest layer</h2>
      <p>
        Escape dismisses the top floating layer before an enclosing modal. Popovers also close after
        an outside press and release; nested panels close one layer per gesture. Tooltip remains
        available while its trigger or text is hovered, and keyboard focus shows it immediately.
      </p>
      <p>
        Implementation references: the{' '}
        <a href="https://html.spec.whatwg.org/multipage/popover.html">HTML popover standard</a> and
        the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/">W3C tooltip pattern</a>.
      </p>
    </>
  );
}
