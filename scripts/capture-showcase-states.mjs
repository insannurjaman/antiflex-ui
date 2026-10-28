import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, '.impeccable/review/showcase');
const base = process.env.ANTIFLEX_DOCS_URL || 'http://127.0.0.1:3162';
const browser = await chromium.launch();
const manifest = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const shot = async (name, { fullPage = true } = {}) => {
  await page.evaluate(() => document.fonts.ready);
  if (name.startsWith('gallery')) {
    await page.locator('.examples-image img').evaluateAll(async (images) => {
      for (const img of images) {
        img.loading = 'eager';
        img.removeAttribute('srcset');
      }
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await Promise.all(images.map((img) => img.decode()));
    });
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll('.examples-image img')).every(
        (img) => img.complete && img.naturalWidth > 0,
      ),
    );
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  const file = path.join(dir, name + '.png');
  await page.screenshot({ path: file, fullPage });
  manifest.push({ name, file: path.relative(root, file), width: page.viewportSize().width });
};
await page.goto(base + '/examples');
await page.getByRole('heading', { name: 'See the system at work.' }).waitFor();
await page.locator('.examples-image img').evaluateAll(async (images) => {
  await Promise.all(
    images.map((img) => {
      img.loading = 'eager';
      return img.decode();
    }),
  );
});
await shot('gallery-light-desktop');
await shot('gallery-intro-light-desktop', { fullPage: false });
await page.setViewportSize({ width: 390, height: 844 });
await shot('gallery-light-mobile');
await page.getByRole('button', { name: 'Switch to dark theme' }).click();
await page.locator('.examples-image img').evaluateAll(async (images) => {
  await Promise.all(
    images.map((img) => {
      img.loading = 'eager';
      return img.decode();
    }),
  );
});
await shot('gallery-dark-mobile');
await shot('gallery-intro-dark-mobile', { fullPage: false });
await page.setViewportSize({ width: 1440, height: 1000 });
await shot('gallery-dark-desktop');
await context.close();
for (const [name, width, action] of [
  [
    'customers-empty',
    1440,
    async (p) => {
      await p.goto(base + '/demo/customers');
      await p.getByLabel('Search customers').fill('no-one-matches');
    },
  ],
  [
    'customer-validation',
    390,
    async (p) => {
      await p.goto(base + '/demo/customers');
      await p.getByRole('button', { name: 'Add customer', exact: true }).click();
      const d = p.getByRole('dialog');
      await d.getByLabel('Full name').fill('Alex Again');
      await d.getByLabel('Email address').fill('alex@northstar.example');
      await d.getByRole('button', { name: 'Add customer', exact: true }).click();
    },
  ],
  [
    'project-date-picker',
    1440,
    async (p) => {
      await p.goto(base + '/demo/projects');
      await p.getByRole('button', { name: 'New project', exact: true }).click();
      await p
        .getByRole('dialog')
        .getByRole('button', { name: /Due date/ })
        .click();
    },
  ],
  [
    'settings-notifications',
    390,
    async (p) => {
      await p.goto(base + '/demo/settings');
      await p.getByRole('tab', { name: 'Notifications', exact: true }).click();
      await p.getByRole('switch', { name: 'Product updates' }).check();
    },
  ],
  [
    'checkout-complete',
    390,
    async (p) => {
      await p.goto(base + '/demo/checkout?plan=business&cycle=annual');
      await p.getByRole('radio', { name: /Demo invoice/ }).check();
      await p.getByRole('checkbox', { name: /I understand this is a demo/ }).check();
      await p.getByRole('button', { name: 'Complete demo checkout', exact: true }).click();
      await expect(p.getByRole('heading', { name: 'Your demo workspace is ready.' })).toBeFocused();
    },
  ],
  [
    'auth-recovery',
    390,
    async (p) => {
      await p.goto(base + '/demo/sign-in');
      await p.getByRole('button', { name: 'Forgot password?' }).click();
      await p.getByRole('button', { name: 'Preview password recovery' }).click();
    },
  ],
  [
    'onboarding-review',
    1440,
    async (p) => {
      await p.goto(base + '/demo/onboarding');
      await p.getByRole('button', { name: 'Continue', exact: true }).click();
      await p.getByRole('button', { name: 'Continue', exact: true }).click();
    },
  ],
  [
    'mobile-navigation',
    390,
    async (p) => {
      await p.goto(base + '/demo/customers?layout=top');
      await p.getByRole('button', { name: 'Menu', exact: true }).click();
    },
  ],
]) {
  const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 } });
  const p = await ctx.newPage();
  await action(p);
  await p.evaluate(() => document.fonts.ready);
  const file = path.join(dir, name + '.png');
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.screenshot({
    path: file,
    fullPage: !['customer-validation', 'project-date-picker'].includes(name),
  });
  manifest.push({ name, file: path.relative(root, file), width });
  await ctx.close();
}
await browser.close();
await fs.writeFile(
  path.join(root, 'artifacts/showcase/state-captures.json'),
  JSON.stringify(manifest, null, 2),
);
console.log(`Captured ${manifest.length} gallery and interaction views.`);
