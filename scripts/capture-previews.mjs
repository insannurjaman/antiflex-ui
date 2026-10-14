import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser = await chromium.launch();
fs.mkdirSync('assets/previews', { recursive: true });
const results = [];
for (const [name, width, height, theme, route] of [
  ['home-desktop', 1440, 1000, 'light', '/'],
  ['home-mobile', 390, 844, 'light', '/'],
  ['dashboard-desktop', 1440, 1100, 'light', '/dashboard'],
  ['dashboard-dark', 1440, 1100, 'dark', '/dashboard'],
  ['dashboard-tablet', 900, 1100, 'light', '/dashboard'],
  ['dashboard-mobile', 390, 844, 'light', '/dashboard'],
  ['components-mobile', 390, 844, 'dark', '/docs/components/button'],
]) {
  if (process.argv[2] && name !== process.argv[2]) continue;
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: theme });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://127.0.0.1:3000' + route);
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole('button', { name: `Switch to ${theme === 'light' ? 'dark' : 'light'} theme` })
    .click();
  await page
    .getByRole('button', { name: `Switch to ${theme === 'light' ? 'light' : 'dark'} theme` })
    .click();
  await page.screenshot({
    path: `assets/previews/${name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
  results.push({
    name,
    errors,
    overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    font: await page.locator('body').evaluate((n) => getComputedStyle(n).fontFamily),
  });
  await context.close();
}
await browser.close();
const evidencePath = 'assets/previews/browser-evidence.json';
const previous =
  process.argv[2] && fs.existsSync(evidencePath)
    ? JSON.parse(fs.readFileSync(evidencePath, 'utf8'))
    : [];
fs.writeFileSync(
  evidencePath,
  JSON.stringify(
    [
      ...previous.filter((item) => !results.some((result) => result.name === item.name)),
      ...results,
    ],
    null,
    2,
  ),
);
console.log(JSON.stringify(results, null, 2));
