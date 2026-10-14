export const metadata = { title: 'Accessibility' };
export default function Accessibility() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Getting started</div>
      <h1>Access, by design.</h1>
      <p className="doc-lead">
        Native elements first. Clear labels, keyboard access, and visible states throughout.
      </p>
      <h2>Built-in behavior</h2>
      <ul>
        <li>
          Button uses a native button, defaults to <code>type="button"</code>, and disables
          activation while loading.
        </li>
        <li>
          TextField associates labels, hints, and errors with its input. An error sets{' '}
          <code>aria-invalid</code>.
        </li>
        <li>
          Table uses native table markup and column headers. Sorting belongs to the application,
          which sets <code>aria-sort</code>.
        </li>
        <li>
          AppShell uses a mobile disclosure rather than a modal. Escape closes the navigation and
          restores focus to its toggle.
        </li>
        <li>
          Skeleton is hidden from assistive technology. Place a live loading message on the
          surrounding container.
        </li>
      </ul>
      <h2>Your application’s responsibilities</h2>
      <p>
        Supply meaningful labels, error messages, headings, table captions, and link names. Never
        rely on badge color alone. Native attributes and refs stay available for your application’s
        needs.
      </p>
      <h2>Motion and themes</h2>
      <p>
        Focus remains visible in both themes. Reduced motion disables spinner and skeleton
        animation. Compact visual density does not remove keyboard affordances.
      </p>
      <h2>Verification</h2>
      <p>
        Automated axe checks, interaction tests, and visual inspection complement manual keyboard
        and screen-reader review. Passing an automated scan does not establish complete
        accessibility conformance.
      </p>
      <p>
        <a href="https://www.w3.org/WAI/ARIA/apg/">W3C authoring guidance ↗</a> ·{' '}
        <a href="https://storybook.js.org/docs/writing-tests/accessibility-testing">
          Storybook accessibility testing ↗
        </a>
      </p>
    </>
  );
}
