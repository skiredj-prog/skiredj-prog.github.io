import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const errors = [];
const base = 'http://127.0.0.1:4173/';
try {
  for (const width of [320, 360, 390, 768, 960]) {
    const page = await browser.newPage({ viewport: { width, height: 640 } });
    page.on('pageerror', error => errors.push(`${width}: ${error.message}`));
    await page.goto(base, { waitUntil: 'networkidle' });
    const toggle = page.locator('[data-mobile-menu-toggle]');
    const nav = page.locator('#site-navigation');
    assert(await toggle.isVisible(), `mobile toggle visible at ${width}`);
    assert(!(await nav.isVisible()), `navigation initially collapsed at ${width}`);
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(await page.locator('.site-header').evaluate(el => getComputedStyle(el).position), 'static');
    await toggle.click();
    assert(await nav.isVisible(), `navigation opens at ${width}`);
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
    await nav.locator('details > summary').first().click();
    assert(await nav.locator('details').first().evaluate(el => el.open), 'submenu opens');
    await page.keyboard.press('Escape');
    assert(!(await nav.isVisible()), 'Escape closes navigation');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click();
    await page.evaluate(() => window.scrollTo(0, 900));
    const bottom = await page.locator('.site-header').evaluate(el => el.getBoundingClientRect().bottom);
    assert(bottom < 0, `opened header scrolls out of view at ${width} (bottom=${bottom})`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('main').click({ position: { x: 5, y: 5 } });
    assert(!(await nav.isVisible()), 'outside click closes navigation');
    const overflow = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      header: document.querySelector('.site-header').getBoundingClientRect().right,
      nav: document.querySelector('.site-nav').getBoundingClientRect().right,
    }));
    assert(overflow.header <= overflow.viewport + 1, `header overflow at ${width}`);
    assert(overflow.nav <= overflow.viewport + 1, `nav overflow at ${width}`);
    await page.close();
  }
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktop.goto(base, { waitUntil: 'networkidle' });
  assert(await desktop.locator('#site-navigation').isVisible(), 'desktop navigation visible');
  assert(!(await desktop.locator('[data-mobile-menu-toggle]').isVisible()), 'desktop toggle hidden');
  assert.equal(await desktop.locator('.site-header').evaluate(el => getComputedStyle(el).position), 'sticky');
  await desktop.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 640 } });
  const basic = await noJS.newPage();
  await basic.goto(base);
  assert(await basic.locator('#site-navigation').isVisible(), 'navigation accessible without JavaScript');
  assert.equal(await basic.locator('.site-header').evaluate(el => getComputedStyle(el).position), 'static');
  await noJS.close();
  assert.deepEqual(errors, [], 'no client-side errors');
  console.log('Mobile nav passed: 320/360/390/768/960px, desktop, Escape, outside click, scroll, no-JS.');
} finally {
  await browser.close();
}
