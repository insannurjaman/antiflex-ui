import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
const catalog = JSON.parse(
  readFileSync(new URL('../packages/ui/src/catalog.json', import.meta.url), 'utf8'),
);

test('docs components are A–Z and desktop sidebar stays fixed while each region scrolls', async ({
  page,
}) => {
  for (const width of [1440, 900, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/docs/components');
    const links = page.locator('#docs-navigation a[href^="/docs/components/"]');
    const names = await links.allTextContents();
    expect(names.length).toBe(Object.keys(catalog).length);
    expect(names).toEqual(
      [...names].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })),
    );
    expect(await page.locator('.component-index h2').allTextContents()).toEqual(names);
    const sidebar = page.locator('.docs-sidebar');
    const initial = await sidebar.boundingBox();
    await page.mouse.move(width - 60, 450);
    await page.mouse.wheel(0, 1000);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(200);
    expect(Math.abs((await sidebar.boundingBox())!.y - initial!.y)).toBeLessThan(1);
    expect((await page.locator('.site-header').boundingBox())!.y).toBe(0);
    const documentScroll = await page.evaluate(() => scrollY);
    await sidebar.hover();
    await page.mouse.wheel(0, 650);
    await expect.poll(() => sidebar.evaluate((n) => n.scrollTop)).toBeGreaterThan(100);
    expect(await page.evaluate(() => scrollY)).toBe(documentScroll);
    await page.locator('.sidebar-foot a').focus();
    await expect(page.locator('.sidebar-foot a')).toBeInViewport();
    expect(await page.evaluate(() => scrollY)).toBe(documentScroll);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
});
test('mobile docs navigation keeps its toggle and sorted links in normal page flow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/components');
  const toggle = page.getByRole('button', { name: 'Documentation menu' });
  await expect(page.getByRole('navigation', { name: 'Documentation', exact: true })).toBeHidden();
  await toggle.click();
  const links = page.locator('#docs-navigation a[href^="/docs/components/"]');
  const names = await links.allTextContents();
  expect(names).toEqual(
    [...names].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })),
  );
  await page
    .getByRole('navigation', { name: 'Documentation', exact: true })
    .getByRole('link', { name: 'Accordion', exact: true })
    .click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(
    page.getByRole('heading', { name: 'Accordion', exact: true, level: 1 }),
  ).toBeVisible();
  await expect(page.locator('.docs-sidebar')).toHaveCSS('position', 'static');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
