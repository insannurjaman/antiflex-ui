import { test, expect } from '@playwright/test';

test('installation uses the antiflex package, paths and namespace with a real downloadable installer', async ({
  page,
  request,
}) => {
  await page.goto('/docs/installation');
  const content = await page.locator('main').innerText();
  expect(content).not.toMatch(/chamfer/i);
  expect(content).toContain('antiflex.json');
  expect(content).toContain('@antiflex/ui');
  expect(content).toContain('components/antiflex');
  const download = page.getByRole('link', { name: 'Download antiflex-ui 0.1.0-alpha.2' });
  const response = await request.get((await download.getAttribute('href'))!);
  expect(response.status()).toBe(200);
  expect((await response.body()).byteLength).toBeGreaterThan(10000);
});

test('saved theme and demo profile survive the namespace migration and new values take precedence', async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem('chamfer-theme', 'dark'));
  await page.goto('/demo/profile');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => localStorage.getItem('antiflex-theme'))).toBe('dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('Alex Morgan');
  await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('antiflex-orbit-demo-v1')!);
    state.profile.name = 'Namespace Retained';
    localStorage.setItem('chamfer-orbit-demo-v1', JSON.stringify(state));
    localStorage.removeItem('antiflex-orbit-demo-v1');
  });
  await page.reload();
  await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('Namespace Retained');
  await expect
    .poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('antiflex-orbit-demo-v1')!).profile.name),
    )
    .toBe('Namespace Retained');
});
