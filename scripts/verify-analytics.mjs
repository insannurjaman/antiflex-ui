import fs from 'node:fs';
import { chromium, expect } from '@playwright/test';
const browser = await chromium.launch();
const results = {};
try {
  for (const [name, base, start] of [
    ['docs', 'https://antiflex-ui.vercel.app', '/docs'],
    [
      'storybook',
      process.env.ANTIFLEX_ANALYTICS_STORYBOOK_URL || 'https://antiflex-storybook.vercel.app',
      '/?path=/story/components-button--primary',
    ],
  ]) {
    const context = await browser.newContext();
    const page = await context.newPage();
    if (new URL(base).hostname === '127.0.0.1')
      await page.route('**/_vercel/insights/script.js', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'text/javascript',
          body: '/* Local transport stub; inspect only SDK event queue. */',
        }),
      );
    const requests = [];
    let managerPagePaths;
    const loaders = [];
    const queue = () =>
      page.evaluate(() =>
        (window.vaq ?? []).filter((item) => item[0] === 'pageview').map((item) => item[1]?.path),
      );
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', async (response) => {
      const request = response.request();
      if (
        response.request().resourceType() === 'script' &&
        /\/(script\.js)$/.test(new URL(response.url()).pathname)
      )
        loaders.push({ url: new URL(response.url()).pathname, status: response.status() });
      if (request.method() !== 'POST' || new URL(request.url()).origin !== base) return;
      let body;
      try {
        body = request.postDataJSON();
      } catch {
        return;
      }
      requests.push({
        endpoint: new URL(request.url()).pathname,
        status: response.status(),
        type: body?.en ?? body?.type ?? null,
        path:
          typeof body?.o === 'string' && body.o.startsWith('http')
            ? new URL(body.o).pathname
            : undefined,
        fields: Object.keys(body ?? {}),
      });
    });
    await page.goto(base + start);
    const sdk = page.locator('script[data-sdkn^="@vercel/analytics"]');
    await expect(sdk).toHaveCount(1);
    await expect.poll(() => loaders.some((r) => r.status === 200)).toBe(true);
    await expect.poll(async () => (await queue()).length).toBeGreaterThan(0);
    if (name === 'docs') {
      const count = (await queue()).length;
      await page
        .locator('#docs-navigation')
        .getByRole('link', { name: 'Foundations', exact: true })
        .click();
      await expect(page).toHaveURL(base + '/docs/foundations');
      await expect.poll(async () => (await queue()).length).toBeGreaterThan(count);
      expect(await queue()).toContain('/docs/foundations');
    } else {
      const frame = page.frameLocator('#storybook-preview-iframe');
      await expect(frame.locator('.af-button').first()).toBeVisible();
      await expect(frame.locator('script[data-sdkn^="@vercel/analytics"]')).toHaveCount(0);
      await page.getByRole('button', { name: 'Badge', exact: true }).click();
      await page.getByRole('link', { name: 'Neutral', exact: true }).click();
      await expect.poll(queue).toContain('/story/components-badge--neutral');
      const managerPaths = await queue();
      managerPagePaths = managerPaths;
      expect(
        managerPaths.filter((path) => path === '/story/components-badge--neutral'),
      ).toHaveLength(1);
      await page.goto(base + '/iframe.html?id=components-tooltip--open&viewMode=story');
      await expect(page.locator('[role="tooltip"]')).toBeVisible();
      await expect(page.locator('script[data-sdkn^="@vercel/analytics"]')).toHaveCount(1);
      await expect.poll(queue).toContain('/story/components-tooltip--open');
    }
    expect(errors).toEqual([]);
    results[name] = {
      loaders,
      queuedPagePaths: await queue(),
      managerPagePaths,
      localTransportStub: new URL(base).hostname === '127.0.0.1',
      requests,
      pageErrors: errors,
      verified: true,
      collectionNote:
        'Vercel excludes navigator.webdriver/Headless clients. Real-browser ingestion is verified separately through project counts.',
    };
    await context.close();
  }
} finally {
  await browser.close();
  fs.writeFileSync(
    'artifacts/analytics-browser-checks.json',
    JSON.stringify(results, null, 2) + '\n',
  );
}
console.log(JSON.stringify(results, null, 2));
