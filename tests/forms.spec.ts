import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const formSlugs = [
  'input',
  'label',
  'field',
  'textarea',
  'native-select',
  'checkbox',
  'radio-group',
  'switch',
  'button-group',
  'input-group',
];

test('native select keeps its chevron inset across sizes, themes, and writing directions', async ({
  page,
}) => {
  const storybookURL = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
  for (const theme of ['light', 'dark']) {
    await page.goto(
      `${storybookURL}/iframe.html?id=components-nativeselect--sizes&viewMode=story&globals=theme:${theme}`,
    );
    const selects = page.getByRole('combobox');
    await expect(selects).toHaveCount(3);
    for (const direction of ['ltr', 'rtl']) {
      await page
        .locator('#storybook-root')
        .evaluate((node, dir) => node.setAttribute('dir', dir), direction);
      await page.setViewportSize({ width: direction === 'rtl' ? 390 : 1280, height: 844 });
      for (const select of await selects.all()) {
        const bounds = await select.evaluate((node) => {
          const control = node.getBoundingClientRect();
          const icon = node.nextElementSibling!.getBoundingClientRect();
          const style = getComputedStyle(node);
          return {
            inset:
              style.direction === 'rtl' ? icon.left - control.left : control.right - icon.right,
            centered: Math.abs((icon.top + icon.bottom - control.top - control.bottom) / 2),
            textClearance: parseFloat(style.paddingInlineEnd) - icon.width,
          };
        });
        expect(bounds.inset).toBeGreaterThanOrEqual(12);
        expect(bounds.centered).toBeLessThan(1);
        expect(bounds.textClearance).toBeGreaterThan(bounds.inset);
        await select.selectOption({ label: 'UTC' });
        await expect(select).toHaveValue('UTC');
        await select.focus();
        await expect(select).toBeFocused();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  }
  await page.emulateMedia({ forcedColors: 'active' });
  await expect(page.locator('.af-native-select-chevron').first()).toBeHidden();
  await expect(page.getByRole('combobox').first()).toHaveCSS('appearance', 'auto');
});

test('form validates, focuses the first error, saves native values, and resets defaults', async ({
  page,
}) => {
  await page.goto('/docs/forms');
  const name = page.getByRole('textbox', { name: 'Workspace name' });
  const email = page.getByRole('textbox', { name: 'Work email' });
  await expect(name).toHaveAttribute('required', '');
  await name.fill('');
  await email.fill('invalid');
  await page.getByRole('button', { name: 'Save preferences' }).click();
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toHaveAccessibleDescription(
    'A name your team will recognize. Enter at least two characters.',
  );
  await expect(email).toHaveAccessibleDescription('Enter a valid work email address.');
  await name.fill('Atlas');
  await email.fill('alex@example.com');
  await page.getByRole('radio', { name: 'Private', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Product updates' }).uncheck();
  const notifications = page.getByRole('switch', { name: 'Desktop notifications' });
  await notifications.focus();
  await page.keyboard.press('Space');
  await expect(notifications).toBeChecked();
  await page.getByRole('button', { name: 'Save preferences' }).click();
  await expect(page.getByRole('button', { name: 'Save preferences' })).toBeDisabled();
  await expect(page.locator('.preview-content').getByRole('status')).toContainText(
    'Saved locally for Atlas. Visibility: private. Product updates: off. Notifications: on.',
  );
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(name).toHaveValue('Orbit');
  await expect(page.getByRole('radio', { name: 'Team', exact: true })).toBeChecked();
  await expect(notifications).not.toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Product updates' })).toBeChecked();
  await expect(name).not.toHaveAttribute('aria-invalid', 'true');
});

test('native choices support mixed state, arrow navigation, controlled updates, and labels', async ({
  page,
}) => {
  await page.goto('/docs/components/checkbox');
  const mixed = page.getByRole('checkbox', { name: 'Select all projects' });
  await expect(mixed).toHaveJSProperty('indeterminate', true);
  await mixed.focus();
  await page.keyboard.press('Space');
  await expect(mixed).toBeChecked();
  await expect(mixed).toHaveJSProperty('indeterminate', false);
  await page.goto('/docs/components/radio-group');
  await page.getByRole('radio', { name: 'Team', exact: true }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio', { name: 'Private', exact: true })).toBeChecked();
  await expect(page.locator('.preview-content').getByRole('status')).toHaveText(
    'Selected: private',
  );
  await expect(page.getByRole('radio', { name: 'Public', exact: true })).toBeDisabled();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('radio', { name: 'Team', exact: true })).toBeChecked();
  await page.goto('/docs/components/switch');
  const toggle = page.getByRole('switch', { name: 'Desktop notifications' });
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).not.toBeChecked();
  await expect(page.locator('.preview-content').getByRole('status')).toContainText('off');
  await page.goto('/docs/components/label');
  await page.locator('label[for="label-example"]').click();
  await expect(page.getByRole('textbox', { name: 'Workspace name' })).toBeFocused();
});

test('groups retain separate focus and preserve composed descriptions', async ({
  page,
  browserName,
}) => {
  const nextControl = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.goto('/docs/components/input-group');
  const website = page.getByRole('textbox', { name: 'Website' });
  await expect(website).toHaveAccessibleDescription('https://');
  await page.getByRole('searchbox', { name: 'Search records' }).focus();
  await page.keyboard.press(nextControl);
  await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.preview-content').getByRole('status')).toContainText(
    'Sample search complete.',
  );
  await page.goto('/docs/components/button-group');
  await page.getByRole('button', { name: 'Save draft', exact: true }).focus();
  await page.keyboard.press(nextControl);
  await expect(page.getByRole('button', { name: 'Save a copy', exact: true })).toBeFocused();
});

for (const theme of ['light', 'dark'])
  test(`new form surfaces are accessible in ${theme}, including mobile RTL`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    for (const route of ['/docs/forms', ...formSlugs.map((slug) => '/docs/components/' + slug)]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
          .violations,
        route,
      ).toEqual([]);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/forms');
    await page.locator('form').evaluate((node) => node.setAttribute('dir', 'rtl'));
    await page.getByRole('switch', { name: 'Desktop notifications' }).check();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  });

test('Field follows explicit control IDs, including controls nested inside InputGroup', async ({
  page,
}) => {
  await page.goto('/docs/components/field');
  const email = page.getByRole('textbox', { name: 'Work email' });
  await expect(email).toHaveAttribute('id', 'field-explicit-email');
  await page.locator('label[for="field-explicit-email"]').click();
  await expect(email).toBeFocused();
  await expect(email).toHaveAccessibleDescription(
    'Use your work address. Enter a valid email address.',
  );
  await page.goto('/docs/components/input-group');
  const website = page.getByRole('textbox', { name: 'Website' });
  await expect(website).toHaveAttribute('id', 'group-explicit-website');
  await page.locator('label[for="group-explicit-website"]').click();
  await expect(website).toBeFocused();
  await expect(website).toHaveAccessibleDescription('https://');
});
