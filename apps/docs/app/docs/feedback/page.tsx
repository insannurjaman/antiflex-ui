import { FeedbackExample } from '../../../components/feedback-specimens';
export const metadata = { title: 'Feedback and navigation' };
export default function FeedbackPage() {
  return (
    <>
      <h1>Keep people oriented.</h1>
      <p className="doc-lead">
        Fifteen building blocks for clear feedback, useful navigation, and content that opens when
        it is needed. Explore the local workspace example below.
      </p>
      <h2>Workspace example</h2>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Workspace overview</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <FeedbackExample />
        </div>
      </div>
      <h2 id="keyboard-guidance">Keyboard guidance</h2>
      <p>
        Tabs have one Tab stop in their list. Arrow keys move between enabled tabs; Home and End
        move to the first and last. Automatic tabs activate on focus; manual tabs wait for Enter or
        Space. Vertical tabs use Up and Down, and horizontal tabs follow the text direction.
      </p>
      <p>
        Accordion headings and disclosure triggers are native buttons. Enter and Space open their
        content. Accordion also supports Up, Down, Home, and End between enabled headings. Toggle
        Group arrows move focus; Enter and Space toggle the focused button. Each group needs an
        accessible name.
      </p>
      <h2>Feedback without interruption</h2>
      <p>
        Alert content is static by default. Choose role="status" for non-urgent updates or
        role="alert" for a newly inserted urgent error. A Spinner is decorative unless it has a
        label. Give every Progress a label; leave its value undefined when completion cannot be
        measured.
      </p>
      <h2>Navigation stays native</h2>
      <p>
        Breadcrumb and Pagination preserve real links, current-page state, and standard browser
        behavior. Use PaginationButton for state held in the application. Choosing page ranges,
        fetching records, and announcing results remain application responsibilities.
      </p>
      <h2>Built on native semantics</h2>
      <p>
        The interactions follow{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/">W3C Authoring Practices</a>. Typography
        styles semantic HTML without choosing your document outline. Aspect Ratio controls media
        geometry; it does not supply alternative text.
      </p>
    </>
  );
}
