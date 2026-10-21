import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  for (const width of [320, 390, 768, 1024, 1100]) {
    const page = await browser.newPage({ viewport: { width, height: 640 } });
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    const header = page.locator('.site-header');
    const nav = page.locator('#main-navigation');
    const toggle = page.locator('[data-menu-toggle]');
    assert.equal(await header.evaluate(x => getComputedStyle(x).position), 'static', `header must not stick at ${width}px`);
    assert(await toggle.isVisible(), `menu button visible at ${width}px`);
    assert(!(await nav.isVisible()), `menu initially closed at ${width}px`);
    await toggle.click();
    assert(await nav.isVisible(), `menu opens at ${width}px`);
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
    const bottom = await header.evaluate(x => x.getBoundingClientRect().bottom);
    assert(bottom < 0, `opened menu must scroll off-screen at ${width}px, bottom=${bottom}`);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.keyboard.press('Escape');
    assert(!(await nav.isVisible()), 'Escape closes menu');
    await page.close();
  }
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await desktop.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  assert.equal(await desktop.locator('.site-header').evaluate(x => getComputedStyle(x).position), 'sticky', 'desktop remains sticky');
  assert(await desktop.locator('#main-navigation').isVisible(), 'desktop links visible');
  await desktop.close();
  console.log('UX mobile navigation: 320/390/768/1024/1100 and desktop passed.');
} finally {
  await browser.close();
}
