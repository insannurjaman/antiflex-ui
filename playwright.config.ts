import { defineConfig, devices } from '@playwright/test';
const docsURL = process.env.CHAMFER_DOCS_URL || 'http://127.0.0.1:3100';
const storybookURL = process.env.CHAMFER_STORYBOOK_URL || 'http://127.0.0.1:6106';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: docsURL, colorScheme: 'light', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...(process.platform !== 'darwin' || process.env.CHAMFER_TEST_FIREFOX === '1'
      ? [{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }]
      : []),
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: [
    ...(!process.env.CHAMFER_DOCS_URL
      ? [
          {
            command: 'pnpm --filter @chamfer/docs start --port 3100',
            url: docsURL,
            reuseExistingServer: !process.env.CI,
          },
        ]
      : []),
    ...(!process.env.CHAMFER_STORYBOOK_URL
      ? [
          {
            command: 'node scripts/serve-storybook.mjs',
            url: storybookURL,
            reuseExistingServer: !process.env.CI,
          },
        ]
      : []),
  ],
});
