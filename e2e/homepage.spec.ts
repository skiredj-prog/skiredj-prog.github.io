import { test, expect } from '@playwright/test';

test.describe('Homepage critical paths', () => {
  test('FR: "Voir un cas concret" lands on /cas/', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /voir un cas concret/i }).click();
    await expect(page).toHaveURL(/\/cas\/?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('EN: "See one concrete case" lands on /en/cases/', async ({ page }) => {
    await page.goto('/en/');
    await page.getByRole('link', { name: /see one concrete case/i }).click();
    await expect(page).toHaveURL(/\/en\/cases\/?$/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('FR: primary CTA lands on pathway with explanation visible', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /commencer mon rapport gratuit/i }).first().click();
    await expect(page).toHaveURL(/\/parcours-ia\/?/);
    await expect(page.getByRole('heading', { name: /ce qui vous attend/i })).toBeVisible();
  });

  test('hero title is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(page.getByText(/l’ia agit/i)).toBeVisible();
  });
});
