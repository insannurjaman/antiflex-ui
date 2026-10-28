import '@fontsource/dm-sans/100.css';
import '@fontsource/dm-sans/100-italic.css';
import '@fontsource/dm-sans/200.css';
import '@fontsource/dm-sans/200-italic.css';
import '@fontsource/dm-sans/300.css';
import '@fontsource/dm-sans/300-italic.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/400-italic.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/500-italic.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/600-italic.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/700-italic.css';
import '@fontsource/dm-sans/800.css';
import '@fontsource/dm-sans/800-italic.css';
import '@fontsource/dm-sans/900.css';
import '@fontsource/dm-sans/900-italic.css';
import '@fontsource/anybody/100.css';
import '@fontsource/anybody/200.css';
import '@fontsource/anybody/300.css';
import '@fontsource/anybody/400.css';
import '@fontsource/anybody/500.css';
import '@fontsource/anybody/600.css';
import '@fontsource/anybody/700.css';
import '@fontsource/anybody/800.css';
import '@fontsource/anybody/900.css';
import '@fontsource/anybody/100-italic.css';
import '@fontsource/anybody/200-italic.css';
import '@fontsource/anybody/300-italic.css';
import '@fontsource/anybody/400-italic.css';
import '@fontsource/anybody/500-italic.css';
import '@fontsource/anybody/600-italic.css';
import '@fontsource/anybody/700-italic.css';
import '@fontsource/anybody/800-italic.css';
import '@fontsource/anybody/900-italic.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/400-italic.css';
import '@fontsource/space-mono/700.css';
import '@fontsource/space-mono/700-italic.css';
import type { Preview } from '@storybook/react-vite';
import { initializeAnalytics } from './analytics';
import '@antiflex/ui/styles.css';
import './styles.css';
initializeAnalytics();
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'antiflex theme',
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
          background: 'var(--af-semantic-canvas)',
          color: 'var(--af-semantic-foreground)',
          fontFamily: 'var(--af-font-sans)',
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
