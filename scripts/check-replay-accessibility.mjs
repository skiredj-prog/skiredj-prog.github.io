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
      const contrasts = await root.evaluate(element => {
        const parse = value => value.match(/[\d.]+/g)?.map(Number) || [];
        const luminance = channels => channels.slice(0, 3).reduce((sum, value, index) => {
          const s = value / 255;
          return sum + (s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4) * [.2126, .7152, .0722][index];
        }, 0);
        return [...element.querySelectorAll('.replay-action, .replay-knowledge .role, .replay-knowledge p, .replay-owner, .replay-impact, .replay-step')]
          .filter(item => item.getClientRects().length)
          .map(item => {
            const style = getComputedStyle(item);
            let current = item;
            let background;
            while (current) {
              const candidate = parse(getComputedStyle(current).backgroundColor);
              if (candidate.length === 3 || candidate[3] === 1) { background = candidate; break; }
              current = current.parentElement;
            }
            if (!background) throw new Error('Unable to determine an opaque background');
            const foreground = parse(style.color);
            if (foreground.length !== 3 && foreground[3] !== 1) throw new Error('Translucent text requires a separate contrast check');
            const a = luminance(foreground), b = luminance(background);
            const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700);
            return { text: item.textContent.trim().slice(0, 70), ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05), minimum: large ? 3 : 4.5 };
          });
      });
      assert(contrasts.length >= 8);
      for (const item of contrasts) assert(item.ratio >= item.minimum, `${theme} text contrast ${item.ratio.toFixed(2)} < ${item.minimum}: ${item.text}`);
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
      console.log(`PASS ${route.path} ${theme}: explicit request, heading, focus, live status, sampled text contrast, exit destinations, layout`);
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
