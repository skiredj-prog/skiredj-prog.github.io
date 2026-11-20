import {test, expect} from '@playwright/test';

// Production-facing smoke tests: Playwright baseURL is https://tenirlabs.cc.
// No email is sent. Inbox delivery is a separate manual acceptance gate.
test.describe('S0 live contact-address acceptance', () => {
  for (const route of ['/contact/', '/en/contact/']) {
    test(route+' exposes new email and prepares a correct message', async ({page}) => {
      const response = await page.goto(route, {waitUntil:'domcontentloaded'});
      expect(response?.status()).toBe(200);
      await expect(page.locator('.site-footer a[href^="mailto:skiredj@gmail.com"]').first()).toBeVisible();
      expect(await page.content()).not.toContain(['skiredj','tenirlabs.cc'].join('@'));

      const form=page.locator('[data-contact-brief]');
      await expect(form).toBeVisible();
      await form.locator('[name="action"]').fill('S0 automated contact route verification — please disregard this draft.');
      await form.locator('[data-brief-submit]').click();
      const mailto= form.locator('[data-brief-mailto]');
      await expect(mailto).toBeVisible();
      await expect(mailto).toHaveAttribute('href', /^mailto:skiredj@gmail\.com\?subject=/);
      const href = await mailto.getAttribute('href');
      expect(decodeURIComponent(href||'')).toContain('S0 automated contact route verification');
    });
  }

  test('magazine N02 and main CTAs do not reference expired email', async ({page}) => {
    for(const route of ['/','/en/','/magazine/n02/']) {
      const response=await page.goto(route,{waitUntil:'domcontentloaded'});
      expect(response?.status()).toBe(200);
      expect(await page.content()).not.toContain(['skiredj','tenirlabs.cc'].join('@'));
      if(route==='/magazine/n02/') {
        await expect(page.locator('a[href^="mailto:skiredj@gmail.com"]').first()).toBeVisible();
      }
    }
  });
});
