import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('dashboard filters, clears empty states, sorts, paginates, and exports', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Workspace overview' })).toBeVisible();
  await page.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(page.getByText('Page 2 of 3')).toBeVisible();
  await page.getByRole('textbox', { name: 'Search orders' }).fill('Lina');
  await expect(page.locator('#orders tbody tr')).toHaveCount(1);
  await expect(page.locator('#orders tbody')).toContainText('Lina Chen');
  await expect(page.getByText('Page 1 of 1')).toBeVisible();
  await page.getByRole('textbox', { name: 'Search orders' }).fill('nothing-matches');
  await expect(page.getByText('No matching orders')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByLabel('Filter by status').selectOption('Pending');
  await expect(page.locator('#orders tbody tr')).toHaveCount(3);
  await page.getByLabel('Filter by status').selectOption('All statuses');
  await page.getByRole('button', { name: 'Amount', exact: true }).click();
  await expect(page.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute(
    'aria-sort',
    'ascending',
  );
  await expect(page.locator('#orders tbody tr').first()).toContainText('$49');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('chamfer-sample-orders.csv');
});

test('date range and refresh loading states work', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Paid orders · Oct 1–14, 2026')).toBeVisible();
  await expect(page.locator('.chart-labels > span')).toHaveCount(14);
  await page.getByLabel('Date range').selectOption('7');
  await expect(page.getByText('Paid orders · Oct 8–14, 2026')).toBeVisible();
  await expect(page.locator('.chart-labels > span')).toHaveCount(7);
  await expect(page.getByText('Page 1 of 2')).toBeVisible();
  await page.getByRole('button', { name: 'Refresh sample orders' }).click();
  await expect(page.getByRole('region', { name: 'Orders table' })).toHaveAttribute(
    'aria-busy',
    'true',
  );
  await expect(page.getByRole('region', { name: 'Orders table' })).toHaveAttribute(
    'aria-busy',
    'false',
  );
  await expect(page.getByText('Sample records refreshed.')).toBeAttached();
});

test('theme persists across reload and navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Components', exact: true })
    .click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('mobile navigation closes on Escape and link activation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/dashboard');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Workspace sections' })
    .getByRole('link', { name: 'Orders' })
    .click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('navigation', { name: 'Workspace sections' })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('field errors are associated and loading buttons prevent repeat activation', async ({
  page,
}) => {
  await page.goto('/docs/components/text-field');
  const input = page.getByRole('textbox', { name: 'Work email' });
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveAccessibleDescription('Enter a valid email address.');
  await page.goto('/docs/components/button');
  const save = page.getByRole('button', { name: 'Save changes' });
  await save.click();
  await expect(save).toBeDisabled();
  await expect(save).toHaveAttribute('aria-busy', 'true');
  await expect(save).toBeEnabled();
});

for (const theme of ['light', 'dark'])
  test(`${theme} theme passes accessibility checks on all primary surfaces`, async ({ page }) => {
    // This case scans fourteen complete pages; the default single-interaction budget is too short on two-core CI runners.
    test.setTimeout(90_000);
    await page.addInitScript((t) => localStorage.setItem('chamfer-theme', t), theme);
    for (const route of [
      '/',
      '/dashboard',
      '/docs',
      '/docs/foundations',
      '/docs/installation',
      '/docs/accessibility',
      ...[
        'button',
        'text-field',
        'badge',
        'card',
        'separator',
        'skeleton',
        'table',
        'app-shell',
      ].map((s) => '/docs/components/' + s),
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        results.violations,
        `${route}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
  });

test('every Storybook specimen renders and passes accessibility checks', async ({
  page,
  request,
}) => {
  // Each specimen receives an axe scan; budget five seconds per story without weakening assertions.
  const storybookURL = process.env.CHAMFER_STORYBOOK_URL || 'http://127.0.0.1:6106';
  const response = await request.get(storybookURL + '/index.json');
  const index = await response.json();
  const entries = Object.values(index.entries) as { id: string; type: string }[];
  const stories = entries.filter((e) => e.type === 'story');
  expect(stories.length).toBeGreaterThan(0);
  test.setTimeout(Math.max(30_000, stories.length * 5_000));
  for (const { id } of stories) {
    await page.goto(`${storybookURL}/iframe.html?id=${id}&viewMode=story`);
    await expect(page.locator('#storybook-root > div')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations,
      `${id}: ${JSON.stringify(results.violations.map((v) => v.id))}`,
    ).toEqual([]);
  }
});

test('mobile installation code can be read and scrolled with the keyboard in both themes', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const theme of ['light', 'dark']) {
    await page.addInitScript((t) => localStorage.setItem('chamfer-theme', t), theme);
    await page.goto('/docs/installation');
    await expect(
      page.getByRole('heading', { name: 'Copy components into your project' }),
    ).toBeVisible();
    const examples = page.locator('.code-block pre');
    const overflowing = await examples.evaluateAll((nodes) =>
      nodes.findIndex((node) => node.scrollWidth > node.clientWidth),
    );
    expect(overflowing).toBeGreaterThanOrEqual(0);
    const example = examples.nth(overflowing);
    await example.focus();
    await expect(example).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => example.evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
      false,
    );
  }
});
