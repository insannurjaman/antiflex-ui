import { MenuExample } from '../../../components/menu-specimens';
export const metadata = { title: 'Actions and contextual menus' };
export default function MenusPage() {
  return (
    <>
      <h1>Actions, where you need them.</h1>
      <p className="doc-lead">
        Keep project commands close to the work. Use a visible actions button or open the same
        choices from their context.
      </p>
      <h2>One project, two ways in</h2>
      <div className="preview-panel">
        <div className="preview-panel-label">
          <span>Menu foundation</span>
          <span>Local demonstration</span>
        </div>
        <div className="preview-content">
          <MenuExample />
        </div>
      </div>
      <h2>Navigate without a pointer</h2>
      <p>
        Open the button with Enter, Space, or ArrowDown; ArrowUp starts at the last item. Move with
        arrows, Home/End, or type a label. Disabled actions remain discoverable but cannot run. Tab
        leaves the menu; Escape returns to its invoker.
      </p>
      <h2>Choices and nested actions</h2>
      <p>
        Pin project and list density stay open while you choose. Export opens a submenu with a real
        JSON download. Submenus open deliberately by click or keyboard, with reversed directional
        keys in RTL. They close one layer at a time.
      </p>
      <h2>A context menu needs an alternative</h2>
      <p>
        Right-click the project or focus it and press Shift + F10. On touch screens, use Project
        actions. Custom long-press behavior is not included. Context menus close when their
        surrounding page scrolls.
      </p>
      <h2>Commands, not a form</h2>
      <p>
        Use menu items for commands, links, or discrete choices. Put fields and multi-step tasks
        inside Popover, Dialog, Sheet, or Drawer. A visual Shortcut label never registers a global
        keyboard shortcut.
      </p>
      <p>
        Keyboard and semantics follow the{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/">W3C menu button</a> and{' '}
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/">menu patterns</a>.
      </p>
    </>
  );
}
