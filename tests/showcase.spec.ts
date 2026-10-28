import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const slugs = [
  '',
  'analytics',
  'orders',
  'customers',
  'projects',
  'activity',
  'team',
  'settings',
  'profile',
  'billing',
  'checkout',
  'sign-in',
  'onboarding',
];
const nav = (page: import('@playwright/test').Page) =>
  page.getByRole('navigation', { name: 'Orbit pages' });

test('example gallery filters all thirteen examples and opens top navigation', async ({ page }) => {
  await page.goto('/examples');
  await expect(page.locator('.examples-item')).toHaveCount(13);
  await page.getByRole('button', { name: 'Commerce', exact: true }).click();
  await expect(page.locator('.examples-item')).toHaveCount(2);
  await page.getByLabel('Search examples').fill('missing-example');
  await expect(page.getByRole('heading', { name: 'No examples found' })).toBeVisible();
  await page.getByRole('button', { name: 'Show all examples' }).click();
  await expect(page.locator('.examples-item')).toHaveCount(13);
  await page
    .getByRole('link', { name: 'Top navigation The same workflow, a different frame.' })
    .click();
  await expect(page).toHaveURL(/\/demo\/analytics\?layout=top/);
  await expect(page.locator('.showcase-shell')).toHaveAttribute('data-navigation-layout', 'top');
});
test('layout switching preserves drafts, routes and saved account state', async ({ page }) => {
  await page.goto('/demo/profile');
  const input = page.getByLabel('Full name', { exact: true });
  await input.fill('Jordan Ellis');
  await page.getByLabel('Navigation layout').selectOption('top');
  await expect(input).toHaveValue('Jordan Ellis');
  await expect(page).toHaveURL(/profile\?layout=top/);
  await page.getByRole('button', { name: 'Save profile', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Jordan Ellis' })).toBeVisible();
  await nav(page).getByRole('link', { name: 'Customers', exact: true }).click();
  await expect(page).toHaveURL(/customers\?layout=top/);
  await page.reload();
  await expect(page.locator('.showcase-shell')).toHaveAttribute('data-navigation-layout', 'top');
  await page.getByRole('button', { name: 'Open account menu' }).click();
  await page.getByRole('menuitem', { name: 'Your profile' }).click();
  await expect(input).toHaveValue('Jordan Ellis');
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Customers', exact: true })).toBeVisible();
});
test('customer filtering, paging, sorting, creation, details, export and shared activity work', async ({
  page,
}) => {
  await page.goto('/demo/customers');
  await page.getByRole('button', { name: 'Next customer page' }).click();
  await expect(page.getByText('Page 2 of 3')).toBeVisible();
  await page.getByLabel('Search customers').fill('nothing-matches');
  await expect(page.getByRole('heading', { name: 'No results found' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByRole('button', { name: 'Revenue', exact: true }).click();
  await expect(page.getByRole('columnheader', { name: 'Revenue' })).toHaveAttribute(
    'aria-sort',
    'descending',
  );
  await page.getByRole('button', { name: 'Add customer', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Full name').fill('Casey Lane');
  await dialog.getByLabel('Email address').fill('casey@example.com');
  await dialog.getByLabel('Company').fill('Casey Studio');
  await dialog.getByRole('button', { name: 'Add customer', exact: true }).click();
  await expect(dialog).toBeHidden();
  await page.getByLabel('Search customers').fill('casey');
  await expect(
    page.getByRole('region', { name: 'Customer records' }).locator('tbody tr'),
  ).toHaveCount(1);
  await page.getByRole('button', { name: 'Casey Lane casey@example.com' }).click();
  const sheet = page.getByRole('dialog');
  await sheet.getByLabel('Customer status').selectOption('Active');
  await sheet.getByRole('button', { name: 'Close details' }).click();
  await expect(
    page.getByRole('region', { name: 'Customer records' }).getByText('Active', { exact: true }),
  ).toBeVisible();
  const file = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export', exact: true }).click();
  expect((await file).suggestedFilename()).toBe('orbit-customers.csv');
  await nav(page).getByRole('link', { name: 'Activity', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Casey Lane is now active' })).toBeVisible();
  await nav(page).getByRole('link', { name: 'Overview', exact: true }).click();
  await expect(page.locator('.metrics-grid')).toContainText('19');
  await page.reload();
  await expect(page.locator('.metrics-grid')).toContainText('19');
});
test('customer duplicate email validation stays in the named modal', async ({ page }) => {
  await page.goto('/demo/customers');
  await page.getByRole('button', { name: 'Add customer', exact: true }).click();
  const d = page.getByRole('dialog');
  await d.getByLabel('Full name').fill('Alex Again');
  await d.getByLabel('Email address').fill('alex@northstar.example');
  await d.getByRole('button', { name: 'Add customer', exact: true }).click();
  await expect(
    d.getByText('This email already belongs to a customer. Use a different email.'),
  ).toBeVisible();
  await expect(d.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true');
  await page.keyboard.press('Escape');
  await expect(d).toBeHidden();
  await expect(page.getByRole('button', { name: 'Add customer', exact: true })).toBeFocused();
});
test('projects create with a date, move stages, and expose a semantic list', async ({ page }) => {
  await page.goto('/demo/projects');
  await page.getByRole('button', { name: 'New project', exact: true }).click();
  const d = page.getByRole('dialog');
  await d.getByLabel('Project name').fill('Launch readiness');
  await d
    .getByLabel('Description', { exact: true })
    .fill('Review the product before our next release.');
  await d.getByRole('button', { name: /Due date/ }).click();
  await expect(page.getByRole('grid')).toBeVisible();
  await page.keyboard.press('Escape');
  await d.getByRole('button', { name: 'Create project', exact: true }).click();
  await expect(d).toBeHidden();
  await page.getByLabel('Status for Launch readiness', { exact: true }).selectOption('Review');
  await page.getByRole('tab', { name: 'List', exact: true }).click();
  await expect(page.getByRole('row').filter({ hasText: 'Launch readiness' })).toContainText(
    'Review',
  );
  await page.getByRole('button', { name: 'Launch readiness', exact: true }).click();
  await page.getByRole('dialog').getByLabel('Project stage').selectOption('Complete');
  await page.getByRole('button', { name: 'Close project' }).click();
  await expect(page.getByRole('row').filter({ hasText: 'Launch readiness' })).toContainText('8/8');
});
test('team invitations, roles and protected removal update local records', async ({ page }) => {
  await page.goto('/demo/team');
  await page.getByRole('button', { name: 'Invite member', exact: true }).click();
  const d = page.getByRole('dialog');
  await d.getByLabel('Member name').fill('Casey Stone');
  await d.getByLabel('Work email').fill('casey.stone@example.com');
  await d.getByRole('button', { name: 'Create demo invite' }).click();
  await expect(d).toBeHidden();
  await page.getByLabel('Role for Casey Stone').selectOption('Viewer');
  await expect(page.getByRole('row').filter({ hasText: 'Casey Stone' })).toContainText('Invited');
  await page.getByRole('button', { name: 'Remove Casey Stone' }).click();
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.getByRole('button', { name: 'Keep member' }).click();
  await expect(page.getByLabel('Role for Casey Stone')).toHaveValue('Viewer');
  await page.getByRole('button', { name: 'Remove Casey Stone' }).click();
  await page.getByRole('button', { name: 'Remove sample member' }).click();
  await expect(page.getByRole('row').filter({ hasText: 'casey.stone@example.com' })).toHaveCount(0);
});
test('settings validate, save notifications and density, and reset only demo state', async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem('unrelated-showcase-setting', 'keep'));
  await page.goto('/demo/settings');
  await page.getByLabel('Workspace name', { exact: true }).fill('Orbit Studio');
  await page.getByLabel('Workspace slug').fill('Invalid Slug');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByLabel('Workspace slug')).toBeFocused();
  await page.getByLabel('Workspace slug').fill('orbit-studio');
  await page.getByRole('tab', { name: 'Notifications', exact: true }).click();
  await page.getByRole('switch', { name: 'Product updates' }).check();
  await page.getByRole('tab', { name: 'Preferences', exact: true }).click();
  await page.getByRole('switch', { name: 'Compact content spacing' }).check();
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.locator('.demo-workspace-brand')).toContainText('Orbit Studio');
  await expect(page.locator('.demo-page')).toHaveAttribute('data-density', 'compact');
  await page.reload();
  await page.getByRole('tab', { name: 'Notifications', exact: true }).click();
  await expect(page.getByRole('switch', { name: 'Product updates' })).toBeChecked();
  await page.getByRole('button', { name: 'Reset demo', exact: true }).click();
  await page.getByRole('button', { name: 'Reset sample data' }).click();
  await expect(page.getByLabel('Workspace name', { exact: true })).toHaveValue('Orbit');
  expect(await page.evaluate(() => localStorage.getItem('unrelated-showcase-setting'))).toBe(
    'keep',
  );
});
test('checkout carries plan selection, calculates discounts, validates and creates a downloadable receipt', async ({
  page,
}) => {
  await page.goto('/demo/billing?layout=top');
  await page.getByRole('button', { name: /Yearly/ }).click();
  await page.getByRole('link', { name: 'Choose Business' }).click();
  await expect(page).toHaveURL(/plan=business/);
  await expect(page.getByLabel('Navigation layout')).toHaveValue('top');
  await page.getByLabel('Seats', { exact: true }).fill('3');
  await expect(page.getByTestId('checkout-total')).toHaveText('$2,370.00');
  await page.getByLabel('Demo discount code').fill('BAD');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.getByText('Use ORBIT20 to try a 20% demo discount.')).toBeVisible();
  await page.getByLabel('Demo discount code').fill('ORBIT20');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.getByTestId('checkout-total')).toHaveText('$1,896.00');
  await page.getByRole('button', { name: 'Complete demo checkout', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your demo workspace is ready.' })).toBeHidden();
  await page.getByRole('checkbox', { name: /I understand this is a demo/ }).check();
  await page.getByRole('button', { name: 'Complete demo checkout', exact: true }).click();
  await expect(page.getByRole('button', { name: /Preparing your demo/ })).toBeDisabled();
  await expect(page.getByRole('heading', { name: 'Your demo workspace is ready.' })).toBeFocused();
  const file = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download receipt' }).click();
  expect((await file).suggestedFilename()).toMatch(/^orbit-DEMO-.*\.txt$/);
  await page.getByRole('link', { name: 'Back to billing' }).click();
  await expect(page.locator('.demo-billing-current')).toContainText('Business');
  await expect(page.locator('.demo-billing-current')).toContainText('3 seats');
  await expect(
    page.getByRole('region', { name: 'Sample invoices' }).locator('tbody tr'),
  ).toHaveCount(4);
});
test('auth preview and onboarding work without storing the demo password', async ({ page }) => {
  await page.goto('/demo/sign-in');
  await page.getByRole('button', { name: 'Forgot password?' }).click();
  await page.getByRole('button', { name: 'Preview password recovery' }).click();
  await expect(page.getByRole('heading', { name: 'Recovery preview complete.' })).toBeVisible();
  await page.getByRole('button', { name: 'Back to sign in', exact: true }).click();
  await page.getByRole('button', { name: 'Try sign up' }).click();
  await page.getByLabel('Full name').fill('Jordan Ellis');
  await page.getByRole('checkbox', { name: /I understand this creates/ }).check();
  await page.getByRole('button', { name: 'Continue to setup' }).click();
  await expect(page).toHaveURL(/\/demo\/onboarding/);
  await page.getByLabel('Workspace name', { exact: true }).fill('Studio Tomorrow');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Sample teammate emails').fill('wrong-email');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(
    page.getByText('Enter up to five valid sample email addresses, one per line.'),
  ).toBeVisible();
  await page.getByLabel('Sample teammate emails').fill('new.member@example.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Open your workspace', exact: true }).click();
  await expect(page.locator('.demo-workspace-brand')).toContainText('Studio Tomorrow');
  expect(await page.evaluate(() => localStorage.getItem('antiflex-orbit-demo-v1'))).not.toContain(
    'antiflex-demo',
  );
  await nav(page).getByRole('link', { name: 'Team', exact: true }).click();
  await expect(page.getByRole('row').filter({ hasText: 'new.member@example.com' })).toBeVisible();
});
test('mobile navigation, page search and Escape retain keyboard destinations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(nav(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await nav(page).getByRole('link', { name: 'Profile', exact: true }).click();
  await expect(nav(page)).toBeHidden();
  await page.getByRole('button', { name: 'Find a page' }).click();
  const d = page.getByRole('dialog');
  await d.getByRole('combobox', { name: 'Search Orbit pages' }).fill('billing');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Billing', exact: true })).toBeVisible();
});
test('unavailable or malformed browser storage leaves a usable demo', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'getItem', {
      value: () => '{broken',
      configurable: true,
    });
    Object.defineProperty(Storage.prototype, 'setItem', {
      value: () => {
        throw Error('Storage unavailable');
      },
      configurable: true,
    });
  });
  await page.goto('/demo/profile');
  await expect(page.getByText('Changes are temporary', { exact: true })).toBeVisible();
  await page.getByLabel('Full name', { exact: true }).fill('Temporary User');
  await page.getByRole('button', { name: 'Save profile' }).click();
  await expect(page.getByRole('heading', { name: 'Temporary User' })).toBeVisible();
});
for (const theme of ['light', 'dark'])
  test(`all demo routes have accessible content and responsive layouts in ${theme}`, async ({
    page,
  }) => {
    test.setTimeout(180000);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    for (const slug of slugs) {
      await page.goto('/demo' + (slug ? '/' + slug : ''));
      await expect(page.locator('.demo-page h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      for (const width of [390, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          `${slug || 'overview'} at ${width}`,
        ).toBe(true);
      }
      const a11y = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        a11y.violations,
        `${slug}: ${JSON.stringify(a11y.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
    await page.goto('/demo/analytics?layout=top');
    await expect(page.locator('.showcase-shell')).toHaveAttribute('data-navigation-layout', 'top');
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
