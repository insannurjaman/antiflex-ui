import type { Preview } from '@storybook/react-vite';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@chamfer/ui/styles.css';
import './styles.css';
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Chamfer theme',
      toolbar: { icon: 'circlehollow', items: ['light', 'dark'] },
    },
  },
  initialGlobals: { theme: 'light', a11y: { manual: true } },
  decorators: [
    (Story, context) => (
      <div
        data-theme={context.globals.theme}
        style={{
          padding: 32,
          background: 'var(--ch-semantic-canvas)',
          color: 'var(--ch-semantic-foreground)',
          fontFamily: 'var(--ch-font-sans)',
          minHeight: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: { a11y: { test: 'error' }, controls: { expanded: true } },
  tags: ['autodocs'],
};
export default preview;
