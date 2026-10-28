import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const sb = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
async function story(page: Page, id = 'default', theme = 'light') {
  await page.goto(
    `${sb}/iframe.html?id=components-toast--${id}&viewMode=story&globals=theme:${theme}`,
  );
  await expect(page.locator('[data-theme]').first()).toHaveAttribute('data-theme', theme);
  await expect(page.getByRole('button', { name: 'Show notification', exact: true })).toBeVisible();
}
const button = (page: Page, name: string) => page.getByRole('button', { name, exact: true });
const row = (page: Page, name: string) => page.getByRole('group', { name, exact: true });
test('notification preserves focus, announces once outside visual groups and updates a stable ID', async ({
  page,
}) => {
  await story(page);
  const trigger = button(page, 'Show notification');
  await trigger.focus();
  await trigger.press('Enter');
  await expect(trigger).toBeFocused();
  await expect(row(page, 'Project saved')).toBeVisible();
  await expect(page.locator('[data-af-toast-announcer="polite"]')).toContainText('Project saved');
  await expect(row(page, 'Project saved')).not.toHaveAttribute('aria-live');
  await button(page, 'Clear notifications').click();
  await button(page, 'Show progress').click();
  await button(page, 'Show progress').click();
  await expect(page.locator('[data-af-toast-id]')).toHaveCount(1);
  await button(page, 'Update notification').click();
  await expect(row(page, 'Project ready')).toBeVisible();
  await expect(page.locator('[data-af-toast-announcer="polite"]')).toContainText('Project ready');
  await button(page, 'Urgent notification').click();
  await expect(page.locator('[data-af-toast-announcer="assertive"]')).toContainText(
    'Urgent sample error',
  );
});
test('timer preserves remaining time through pointer, keyboard and background pauses', async ({
  page,
}) => {
  await story(page, 'timing');
  await page.clock.install();
  await button(page, 'Show notification').click();
  await page.clock.runFor(400);
  await row(page, 'Project saved').hover();
  await page.clock.runFor(3000);
  await expect(row(page, 'Project saved')).toBeVisible();
  await page.mouse.move(1, 1);
  await page.clock.runFor(300);
  await button(page, 'Dismiss Project saved').focus();
  await page.clock.runFor(3000);
  await expect(row(page, 'Project saved')).toBeVisible();
  await button(page, 'Show notification').focus();
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await page.clock.runFor(3000);
  await expect(row(page, 'Project saved')).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await page.clock.runFor(600);
  await expect(row(page, 'Project saved')).toBeHidden();
});
test('persistent notifications, queue capacity and invalid input are bounded', async ({ page }) => {
  await story(page, 'queue');
  await page.clock.install();
  await button(page, 'Queue five').click();
  await expect(page.locator('[data-af-toast-id]')).toHaveCount(3);
  await expect(page.getByText('1 more notification waiting')).toBeVisible();
  await button(page, 'Dismiss Queued message 1').click();
  await expect(row(page, 'Queued message 4')).toBeVisible();
  await button(page, 'Dismiss Queued message 2').click();
  await button(page, 'Dismiss Queued message 3').click();
  await expect(row(page, 'Queued message 5')).toHaveCount(0);
  await page.clock.runFor(60000);
  await expect(row(page, 'Queued message 4')).toBeVisible();
  await button(page, 'Clear notifications').click();
  await button(page, 'Reject invalid input').click();
  await expect(page.locator('[data-af-toast-id]')).toHaveCount(0);
});
test('queued timers start on display and updates reset duration', async ({ page }) => {
  await story(page, 'timing');
  await page.clock.install();
  await button(page, 'Queue five').click();
  await page.clock.runFor(1300);
  await expect(row(page, 'Queued message 4')).toBeVisible();
  await expect(row(page, 'Queued message 5')).toBeVisible();
  await page.clock.runFor(1300);
  await expect(page.locator('[data-af-toast-id]')).toHaveCount(0);
  await button(page, 'Show progress').click();
  await page.clock.runFor(60000);
  await expect(row(page, 'Saving project')).toBeVisible();
  await button(page, 'Update notification').click();
  await page.clock.runFor(1300);
  await expect(row(page, 'Project ready')).toBeHidden();
});
test('actions persist, reject duplicate pending clicks, report failure and allow retry', async ({
  page,
}) => {
  await story(page, 'async-action');
  await page.clock.install();
  await button(page, 'Show action').click();
  await page.clock.runFor(60000);
  await expect(row(page, 'Undo available')).toBeVisible();
  await button(page, 'Undo change').click();
  await expect(row(page, 'Undo available')).toBeHidden();
  await expect(page.getByTestId('action-result')).toContainText('Change restored');
  await button(page, 'Show async action').focus();
  await button(page, 'Show async action').press('Enter');
  await button(page, 'Retry save').focus();
  await button(page, 'Retry save').press('Enter');
  await expect(button(page, 'Retry save')).toHaveAttribute('aria-disabled', 'true');
  await button(page, 'Retry save').press('Enter');
  await page.clock.runFor(350);
  await expect(row(page, 'Retry local action')).toContainText(
    'Sample save failed. Try Retry save again.',
  );
  await expect(page.getByTestId('action-result')).toContainText('Attempts 1');
  await expect(button(page, 'Retry save')).toBeFocused();
  await button(page, 'Retry save').press('Enter');
  await page.clock.runFor(350);
  await expect(row(page, 'Retry local action')).toBeHidden();
  await expect(page.getByTestId('action-result')).toContainText('Retry succeeded');
  await expect(button(page, 'Show async action')).toBeFocused();
});
test('dismissal moves focus to remaining controls then the origin; dialog handoff keeps new focus', async ({
  page,
}) => {
  await story(page);
  await button(page, 'Show action').focus();
  await button(page, 'Show action').press('Enter');
  await button(page, 'Show notification').focus();
  await button(page, 'Show notification').press('Enter');
  await button(page, 'Dismiss Project saved').focus();
  await page.keyboard.press('Enter');
  await expect(button(page, 'Undo change')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(button(page, 'Show notification')).toBeFocused();
  await button(page, 'Show dialog action').click();
  await button(page, 'Review details').click();
  const dialog = page.getByRole('dialog', { name: 'Notification details' });
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((n) => n.contains(document.activeElement))).toBeTruthy();
});
test('fixed notifications use the top layer and nested Escape dismisses focused feedback before the dialog', async ({
  page,
}) => {
  await page.goto(`${sb}/iframe.html?id=components-toast--inside-dialog&viewMode=story`);
  await button(page, 'Open notification task').click();
  await button(page, 'Show action').click();
  const viewport = page.getByRole('region', { name: 'Notifications', exact: true });
  expect(await viewport.evaluate((n) => n.matches(':popover-open'))).toBeTruthy();
  await button(page, 'Undo change').focus();
  await page.keyboard.press('Escape');
  await expect(row(page, 'Undo available')).toBeHidden();
  await expect(page.getByRole('dialog', { name: 'Local notification task' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('strict remount clears notifications without orphan timers or page errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await story(page, 'strict-cleanup');
  await button(page, 'Show notification').click();
  await button(page, 'Toggle notification mount').click();
  await expect(page.locator('[data-af-toast-id]')).toHaveCount(0);
  await button(page, 'Toggle notification mount').click();
  await button(page, 'Show notification').click();
  await expect(page.locator('[data-af-toast-id]')).toHaveCount(1);
  await expect(page.locator('[data-af-toast-announcer]')).toHaveCount(2);
  expect(errors).toEqual([]);
});
test('local project save updates progress and archive Undo changes real example state', async ({
  page,
}) => {
  await page.goto('/docs/notifications');
  await page.getByRole('textbox', { name: 'Local project name' }).fill('Orbit workspace');
  await button(page, 'Save local project').click();
  await expect(row(page, 'Project saved')).toContainText('Orbit workspace');
  await button(page, 'Archive sample').click();
  await expect(button(page, 'Archive sample')).toBeDisabled();
  await button(page, 'Undo archive').click();
  await expect(button(page, 'Archive sample')).toBeEnabled();
  await page.getByRole('textbox', { name: 'Local project name' }).fill('');
  await button(page, 'Save local project').click();
  await expect(row(page, 'Project name is required')).toBeVisible();
});
for (const theme of ['light', 'dark'])
  test(`Toast docs and all 16 stories remain accessible and fit mobile through desktop in ${theme}`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    await page.goto('/docs/notifications');
    await button(page, 'Archive sample').click();
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBeTruthy();
    }
    const old = page;
    page = await page.context().newPage();
    await old.close();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const index = await (await page.request.get(`${sb}/index.json`)).json();
    const ids = Object.keys(index.entries).filter(
      (id) => id.startsWith('components-toast--') && index.entries[id].type === 'story',
    );
    expect(ids).toHaveLength(16);
    await page.setViewportSize({ width: 390, height: 844 });
    for (const id of ids) {
      await page.goto(`${sb}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
      await expect(page.locator('[data-theme]').first()).toHaveAttribute('data-theme', theme);
      if (id.endsWith('inside-dialog')) await button(page, 'Open notification task').click();
      if ((await page.locator('[data-af-toast-id]').count()) === 0)
        await button(page, 'Show action').click();
      expect(
        (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
          .violations,
        id,
      ).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        id,
      ).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
