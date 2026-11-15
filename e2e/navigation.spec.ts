import { test, expect } from '@playwright/test';

test.describe('Key pages load', () => {
  const pages = [
    { path: '/cas/', title: /cas/i },
    { path: '/parcours-ia/', title: /rapport/i },
    { path: '/tau-tenir/', title: /tau|tenir/i },
    { path: '/contact/', title: /contact/i },
    { path: '/en/', title: /ai takes action/i },
  ];

  for (const p of pages) {
    test(`${p.path} loads`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page).toHaveTitle(p.title);
    });
  }
});
