import assert from 'node:assert/strict';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.REPLAY_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true, channel: process.env.REPLAY_BROWSER_CHANNEL || undefined });
const routes = [
  { path: '/rejouer/', exits: ['/portfolio/demos/', '/cas/'] },
  { path: '/en/replay/', exits: ['/en/portfolio/demos/', '/en/cases/'] },
];

try {
  for (const route of routes) {
    let count;
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width: theme === 'dark' ? 320 : 1280, height: 900 }, colorScheme: theme });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + route.path);
      await page.waitForFunction(() => document.querySelector('.replay-page')?.dataset.replayEnhanced === 'true');
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
      assert.equal(await page.locator('h1').count(), 1);
      assert.match(await page.locator('#replay-title').textContent(), /demande.*envoyée|request.*sent/i);
      const root = page.locator('.replay-page');
      const steps = root.locator('[data-replay-step]');
      count = await steps.count();
      assert(count >= 6);
      const live = root.locator('[data-replay-announcement]');
      assert.equal(await live.getAttribute('role'), 'status');
      assert.equal(await live.getAttribute('aria-live'), 'polite');
      assert.equal(await live.getAttribute('aria-atomic'), 'true');
      await steps.first().focus();
      await page.keyboard.press('Tab');
      assert(await steps.nth(1).evaluate(element => element === document.activeElement));
      const focus = await steps.nth(1).evaluate(element => {
        const style = getComputedStyle(element);
        return { width: parseFloat(style.outlineWidth), style: style.outlineStyle };
      });
      assert(focus.width >= 2 && focus.style !== 'none', 'Keyboard focus must have a visible outline');
      await page.keyboard.press('Enter');
      const panel = root.locator('[data-replay-panel]:visible');
      assert.equal(await steps.nth(1).getAttribute('aria-controls'), await panel.getAttribute('id'));
      assert(await panel.getAttribute('aria-labelledby'));
      assert((await live.textContent()).startsWith(`2 / ${count}`));
      assert((await live.textContent()).includes('ALLOW'), 'The announcement must include the action status');
      assert(await steps.nth(1).evaluate(element => element === document.activeElement), 'Selecting an event must retain keyboard focus');
      const links = root.locator('.replay-takeaway .actions a');
      assert.equal(await links.count(), route.exits.length);
      for (let index = 0; index < route.exits.length; index++) {
        const href = await links.nth(index).getAttribute('href');
        assert.equal(new URL(href, base).pathname, route.exits[index]);
        assert.equal((await page.request.get(new URL(href, base).href)).status(), 200);
      }
      const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      assert(dimensions.scroll <= dimensions.width + 2);
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`PASS ${route.path} ${theme}: explicit request, heading, focus, live status, exit destinations, layout`);
    }
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    await page.goto(base + route.path);
    assert.equal(await page.locator('[data-replay-panel]:visible').count(), count);
    assert(await page.locator('[data-replay-timeline]').isHidden());
    assert(await page.locator('[data-replay-controls]').isHidden());
    assert(await page.locator('.replay-takeaway').isVisible());
    await page.close();
    console.log(`PASS ${route.path}: complete static narrative without misleading interactive controls`);
  }
} finally {
  await browser.close();
}
