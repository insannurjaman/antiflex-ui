import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const storybookURL = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';

test('tabs select automatically or manually and keep one enabled tab stop', async ({ page }) => {
  await page.goto('/docs/components/tabs');
  const auto = page.getByRole('tablist', { name: 'Workspace sections', exact: true });
  const overview = auto.getByRole('tab', { name: 'Overview' });
  const activity = auto.getByRole('tab', { name: 'Activity' });
  const settings = auto.getByRole('tab', { name: 'Settings' });
  await overview.focus();
  await page.keyboard.press('ArrowRight');
  await expect(activity).toBeFocused();
  await expect(activity).toHaveAttribute('aria-selected', 'true');
  const content = page.locator(`[id="${await activity.getAttribute('aria-controls')}"]`);
  await expect(content).toBeVisible();
  await expect(content).toHaveAttribute(
    'aria-labelledby',
    (await activity.getAttribute('id')) || '',
  );
  await page.keyboard.press('ArrowRight');
  await expect(settings).toBeFocused();
  await page.keyboard.press('Home');
  await expect(overview).toBeFocused();
  await page.keyboard.press('End');
  await expect(settings).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(overview).toBeFocused();
  await expect(auto.locator('[tabindex="0"]')).toHaveCount(1);
  await expect(auto.getByRole('tab', { name: 'Billing' })).toBeDisabled();
  const manual = page.getByRole('tablist', { name: 'Manual sections', exact: true });
  await manual.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(manual.getByRole('tab', { name: 'Activity' })).toBeFocused();
  await expect(manual.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.keyboard.press('Space');
  await expect(manual.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tabpanel', { name: 'Activity', exact: true }).last()).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(manual.getByRole('tab', { name: 'Activity' })).toBeFocused();
});

test('vertical tabs and RTL horizontal collections follow their orientation', async ({ page }) => {
  await page.goto('/docs/components/tabs');
  const vertical = page.getByRole('tablist', { name: 'Vertical sections' });
  await vertical.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(vertical.getByRole('tab', { name: 'Activity' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(vertical.getByRole('tab', { name: 'Settings' })).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(vertical.getByRole('tab', { name: 'Activity' })).toBeFocused();
  await page.evaluate(() => (document.documentElement.dir = 'rtl'));
  const horizontal = page.getByRole('tablist', { name: 'Workspace sections', exact: true });
  await horizontal.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(horizontal.getByRole('tab', { name: 'Activity' })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(horizontal.getByRole('tab', { name: 'Overview' })).toBeFocused();
});

test('toggle groups separate focus from selection and support multiple values', async ({
  page,
}) => {
  await page.goto('/docs/components/toggle-group');
  const density = page.getByRole('group', { name: 'Content density', exact: true });
  const compact = density.getByRole('button', { name: 'Compact' });
  const comfortable = density.getByRole('button', { name: 'Comfortable' });
  await comfortable.focus();
  await page.keyboard.press('ArrowRight');
  await expect(compact).toBeFocused();
  await expect(comfortable).toHaveAttribute('aria-pressed', 'true');
  await expect(compact).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('Space');
  await expect(compact).toHaveAttribute('aria-pressed', 'true');
  await expect(comfortable).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('Space');
  await expect(compact).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('End');
  await expect(comfortable).toBeFocused();
  await expect(density.getByRole('button', { name: 'Spacious' })).toBeDisabled();
  const formatting = page.getByRole('group', { name: 'Text formatting', exact: true });
  await formatting.getByRole('button', { name: 'Bold' }).focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(formatting.getByRole('button', { name: 'Bold' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(formatting.getByRole('button', { name: 'Italic' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(formatting.locator('[tabindex="0"]')).toHaveCount(1);
  await page.evaluate(() => (document.documentElement.dir = 'rtl'));
  await comfortable.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(compact).toBeFocused();
  const vertical = page.getByRole('group', { name: 'Vertical density' });
  await vertical.getByRole('button', { name: 'Compact' }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(vertical.getByRole('button', { name: 'Comfortable' })).toBeFocused();
});

test('accordion supports single, multiple, required-open, disabled, and nested collections', async ({
  page,
}) => {
  await page.goto('/docs/components/accordion');
  const single = page
    .locator('[data-af-accordion]')
    .filter({ has: page.getByRole('button', { name: 'Can I use the core commercially?' }) })
    .first();
  const first = single.getByRole('button', { name: 'Can I use the core commercially?' });
  const second = single.getByRole('button', { name: 'Can I edit the source?' });
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await second.click();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await second.focus();
  await page.keyboard.press('ArrowDown');
  await expect(first).toBeFocused();
  await page.keyboard.press('End');
  await expect(second).toBeFocused();
  await expect(
    single.getByRole('button', { name: 'Enterprise service (unavailable)' }),
  ).toBeDisabled();
  const multiple = page.getByLabel('Multiple disclosures', { exact: true });
  await multiple.getByRole('button', { name: 'Can I edit the source?' }).click();
  await expect(multiple.locator('[aria-expanded="true"]')).toHaveCount(2);
  const locked = page.getByLabel('Required disclosure', { exact: true });
  const lockedFirst = locked.getByRole('button', { name: 'Can I use the core commercially?' });
  await lockedFirst.focus();
  await page.keyboard.press('Enter');
  await expect(lockedFirst).toHaveAttribute('aria-expanded', 'true');
  await expect(lockedFirst).toHaveAttribute('aria-disabled', 'true');
  await page.goto(`${storybookURL}/iframe.html?id=components-accordion--nested&viewMode=story`);
  const innerFirst = page.getByRole('button', { name: 'What is included?' });
  const innerSecond = page.getByRole('button', { name: 'Can I edit the source?' });
  await innerFirst.focus();
  await page.keyboard.press('ArrowUp');
  await expect(innerSecond).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(innerFirst).toBeFocused();
});

test('controlled disclosure returns focus when closed from inside and preserves content state', async ({
  page,
}) => {
  await page.goto('/docs/components/collapsible');
  const trigger = page.getByRole('button', { name: 'Advanced connection details' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const input = page.getByRole('textbox', { name: 'Connection label' });
  await input.fill('Staging');
  await page.getByRole('button', { name: 'Close details from inside' }).click();
  await expect(trigger).toBeFocused();
  await expect(input).toBeHidden();
  await page.keyboard.press('Space');
  await expect(input).toHaveValue('Staging');
  await expect(page.getByRole('button', { name: 'Unavailable details' })).toBeDisabled();
});

test('pagination preserves native links, disabled state, current page, and stateful boundaries', async ({
  page,
}) => {
  await page.goto('/docs/components/pagination');
  const pages = page.getByRole('navigation', { name: 'Sample records pages' });
  await expect(pages.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  await pages.getByRole('button', { name: 'Next page' }).click();
  await expect(pages.getByRole('button', { name: 'Page 2', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await pages.getByRole('button', { name: 'Next page' }).click();
  await expect(pages.getByRole('button', { name: 'Next page' })).toBeDisabled();
  await pages.getByRole('button', { name: 'Page 1', exact: true }).click();
  await expect(pages.locator('[aria-current="page"]')).toHaveCount(1);
  const links = page.getByRole('navigation', { name: 'Link pagination example' });
  const previous = links.locator('[aria-label="Previous page"]');
  await expect(previous).not.toHaveAttribute('href');
  await expect(previous).toHaveAttribute('aria-disabled', 'true');
  await expect(links.getByRole('link', { name: 'Next page' })).toHaveAttribute('href', '?page=2');
  await links.getByRole('link', { name: 'Next page' }).click();
  await expect(page).toHaveURL(/\?page=2$/);
});

test('controlled stories respond to external resets and standalone toggles keep their name', async ({
  page,
}) => {
  await page.goto('/docs/components/toggle');
  const bold = page.getByRole('button', { name: 'Bold', exact: true });
  await bold.focus();
  await page.keyboard.press('Space');
  await expect(bold).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Reset bold' }).click();
  await expect(bold).toHaveAttribute('aria-pressed', 'false');
  await page.goto(`${storybookURL}/iframe.html?id=components-tabs--controlled&viewMode=story`);
  await page.getByRole('tab', { name: 'Second' }).click();
  await expect(page.getByRole('tabpanel', { name: 'Second' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset selection' }).click();
  await expect(page.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true');
  await page.goto(`${storybookURL}/iframe.html?id=components-accordion--controlled&viewMode=story`);
  await page.getByRole('button', { name: 'Second section' }).click();
  await expect(page.getByRole('button', { name: 'Second section' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.getByRole('button', { name: 'Close all' }).click();
  await expect(page.locator('[aria-expanded="true"]')).toHaveCount(0);
});

test('progress, avatar, aspect ratio, and reduced-motion feedback retain native semantics', async ({
  page,
}) => {
  await page.goto('/docs/components/progress');
  await expect(page.getByRole('progressbar', { name: 'Complete import' })).toHaveAttribute(
    'value',
    '100',
  );
  await expect(page.getByRole('progressbar', { name: 'Preparing files' })).not.toHaveAttribute(
    'value',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('progressbar', { name: 'Preparing files' })).toHaveCSS(
    'animation-name',
    'none',
  );
  await page.goto('/docs/components/spinner');
  await expect(page.getByRole('status').filter({ hasText: 'Loading sample records' })).toHaveCount(
    1,
  );
  await expect(page.locator('.af-spinner').first()).toHaveCSS('animation-name', 'none');
  await page.goto(`${storybookURL}/iframe.html?id=components-avatar--image&viewMode=story`);
  await expect(page.getByRole('img', { name: 'Geometric sample identity' })).toHaveAttribute(
    'data-loaded',
    'true',
  );
  await page.goto(`${storybookURL}/iframe.html?id=components-avatar--failed-image&viewMode=story`);
  await expect(page.getByRole('img', { name: 'Sam Rivera' })).toContainText('SR');
  await expect(page.locator('.af-avatar img')).toHaveCount(0);
  await page.goto('/docs/components/aspect-ratio');
  const box = await page.locator('.af-aspect-ratio').first().boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width / box!.height).toBeCloseTo(16 / 9, 1);
});

for (const theme of ['light', 'dark'] as const)
  test(`feedback and navigation surfaces are accessible in ${theme}, including mobile RTL`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const slugs = [
      'alert',
      'avatar',
      'breadcrumb',
      'empty',
      'kbd',
      'pagination',
      'progress',
      'spinner',
      'tabs',
      'accordion',
      'collapsible',
      'toggle',
      'toggle-group',
      'typography',
      'aspect-ratio',
    ];
    await page.addInitScript((value) => localStorage.setItem('antiflex-theme', value), theme);
    for (const slug of slugs) {
      await page.goto('/docs/components/' + slug);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, slug).toEqual([]);
    }
    await page.goto('/docs/feedback');
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => (document.documentElement.dir = 'rtl'));
    await page.getByRole('tab', { name: 'Setup', exact: true }).click();
    await expect(page.getByRole('progressbar', { name: 'Workspace setup' })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
    ).toBe(false);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.getByRole('tab', { name: 'Help', exact: true }).click();
    await expect(
      page.getByRole('button', { name: 'Can I use the core commercially?' }),
    ).toBeVisible();
  });

test('custom tab wrappers retain keyboard entry, inferred selection, and disabled updates', async ({
  page,
}) => {
  await page.goto(`${storybookURL}/iframe.html?id=components-tabs--custom-wrappers&viewMode=story`);
  const individual = page.getByRole('tablist', { name: 'Wrapped individual tabs' });
  const whole = page.getByRole('tablist', { name: 'Wrapped whole list' });
  await expect(individual.locator('[tabindex="0"]')).toHaveCount(1);
  await expect(individual.getByRole('tab', { name: 'Two', exact: true })).toHaveAttribute(
    'tabindex',
    '0',
  );
  await individual.getByRole('tab', { name: 'Two', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(individual.getByRole('tab', { name: 'One', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(individual.getByRole('tab', { name: 'Two', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Change availability' }).click();
  await expect(individual.getByRole('tab', { name: 'One', exact: true })).toHaveAttribute(
    'tabindex',
    '0',
  );
  await expect(individual.locator('[tabindex="0"]')).toHaveCount(1);
  await expect(whole.getByRole('tab', { name: 'One', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(whole.locator('[tabindex="0"]')).toHaveCount(1);
  await whole.getByRole('tab', { name: 'One', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(whole.getByRole('tab', { name: 'Two', exact: true })).toBeFocused();
  await expect(whole.getByRole('tab', { name: 'Two', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('custom toggle wrappers retain one enabled keyboard entry and independent selection', async ({
  page,
}) => {
  await page.goto(
    `${storybookURL}/iframe.html?id=components-toggle-group--custom-wrappers&viewMode=story`,
  );
  for (const name of ['Wrapped individual toggles', 'Wrapped whole collection']) {
    const group = page.getByRole('group', { name });
    await expect(group.locator('[tabindex="0"]')).toHaveCount(1);
    const first = group.getByRole('button', { name: 'One', exact: true });
    const second = group.getByRole('button', { name: 'Two', exact: true });
    if (name === 'Wrapped individual toggles')
      await expect(second).toHaveAttribute('tabindex', '0');
    else await expect(first).toHaveAttribute('tabindex', '0');
    await first.focus();
    await page.keyboard.press('ArrowRight');
    await expect(second).toBeFocused();
    await page.keyboard.press('Space');
    await expect(second).toHaveAttribute(
      'aria-pressed',
      name === 'Wrapped individual toggles' ? 'false' : 'true',
    );
    await page.keyboard.press('Home');
    await expect(first).toBeFocused();
  }
  await page.getByRole('button', { name: 'Change availability' }).click();
  const group = page.getByRole('group', { name: 'Wrapped individual toggles' });
  await expect(group.getByRole('button', { name: 'Two', exact: true })).toBeDisabled();
  await expect(group.locator('[tabindex="0"]')).toHaveCount(1);
});

test('activity guidance link reaches the feedback keyboard section', async ({ page }) => {
  await page.goto('/docs/components/tabs');
  await page
    .getByRole('tablist', { name: 'Workspace sections', exact: true })
    .getByRole('tab', { name: 'Activity' })
    .click();
  await page.getByRole('link', { name: 'Keyboard guidance' }).click();
  await expect(page).toHaveURL(/\/docs\/feedback#keyboard-guidance$/);
  await expect(page.locator('#keyboard-guidance')).toBeVisible();
});
