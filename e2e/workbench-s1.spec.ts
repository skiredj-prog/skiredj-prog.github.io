import { test, expect } from '@playwright/test';

const preview = process.env.WORKBENCH_PREVIEW_URL;

test.describe('S1 workbench on the PR preview', () => {
  test.skip(!preview, 'WORKBENCH_PREVIEW_URL is the local preview of this PR, not the live site.');
  test.use({ baseURL: preview || 'http://127.0.0.1:4731' });

  for (const route of [
    { path: '/workbench/', posture: 'Marge réduite', synthetic: 'Illustratif / synthétique' },
    { path: '/en/workbench/', posture: 'Reduced margin', synthetic: 'Illustrative / synthetic' },
  ]) {
    test(`${route.path} reads the preview build`, async ({ page }) => {
      const leaked: string[] = [];
      page.on('request', (request) => {
        const url = request.url();
        if (url.includes('/api/v1') || url.includes('localhost:8000') || url.startsWith('ws:') || url.startsWith('wss:')) {
          leaked.push(url);
        }
      });
      await page.goto(route.path);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByText('This is an interactive communication concept, not the TENIR scoring kernel, a measured physical system, or an actual policy adjudication.')).toBeVisible();
      await expect(page.locator('.wb-bar [data-wb="posture"]').first()).toHaveText(route.posture);
      await expect(page.locator('.wb-bar [data-wb="margin"]').first()).toHaveText('20');
      await expect(page.getByText(route.synthetic).first()).toBeVisible();
      await expect(page.locator('[data-audience], select[name="audience"]')).toHaveCount(0);
      const pressure = page.locator('#wb-pressure');
      await pressure.focus();
      await page.keyboard.press('ArrowRight');
      await expect(pressure).toHaveValue('56');
      await expect(page.locator('.wb-bar [data-wb="margin"]').first()).toHaveText('19');
      expect(leaked).toEqual([]);
    });
  }
});
