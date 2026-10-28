import { inject, pageview } from '@vercel/analytics';

function pagePath(url: URL) {
  const selectedPath = url.searchParams.get('path');
  const storyId = url.searchParams.get('id');
  if (selectedPath && /^\/(story|docs)\/[a-z0-9-]+$/i.test(selectedPath)) return selectedPath;
  if (url.pathname.endsWith('/iframe.html') && storyId && /^[a-z0-9-]+$/i.test(storyId)) {
    return `/${url.searchParams.get('viewMode') === 'docs' ? 'docs' : 'story'}/${storyId}`;
  }
  return url.pathname;
}

/** Track the Storybook shell or a standalone preview, never an embedded iframe twice. */
export function initializeAnalytics() {
  if (window.self !== window.top) return () => {};
  inject({
    framework: 'storybook',
    disableAutoTrack: true,
    beforeSend(event) {
      const url = new URL(event.url);
      url.pathname = pagePath(url);
      url.search = '';
      url.hash = '';
      return { ...event, url: url.toString() };
    },
  });
  let previousPath = '';
  const recordPage = () => {
    const path = pagePath(new URL(window.location.href));
    if (path === previousPath) return;
    previousPath = path;
    pageview({ path, route: path });
  };
  recordPage();
  return recordPage;
}
