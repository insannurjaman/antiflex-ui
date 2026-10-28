import { initializeAnalytics } from './analytics';
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { STORY_CHANGED, DOCS_RENDERED } from 'storybook/internal/core-events';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'antiflex/ui',
    brandImage: '/brand/wordmark.svg',
    brandUrl: 'https://antiflex-ui.vercel.app',
    brandTarget: '_self',
  }),
});

const recordPage = initializeAnalytics();
const afterNavigation = () => requestAnimationFrame(recordPage);
addons.register('antiflex/vercel-analytics', () => {
  addons.getChannel().on(STORY_CHANGED, afterNavigation);
  addons.getChannel().on(DOCS_RENDERED, afterNavigation);
  window.addEventListener('popstate', afterNavigation);
});
