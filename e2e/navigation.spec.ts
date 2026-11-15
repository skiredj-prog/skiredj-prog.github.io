import { test, expect } from '@playwright/test';

test.describe('Key pages load', () => {
  const pages = [
    { path: '/cas/', name: /cas/i },
    { path: '/parcours-ia/', name: /rapport|avant de laisser/i },
    { path: '/tau-tenir/', name: /tau|tenir/i },
    { path: '/contact/', name: /contact/i },
    { path: '/en/', name: /ai takes action/i },
  ];

  for (const p of pages) {
    test(`${p.path} loads with a heading`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });
    });
  }
});
