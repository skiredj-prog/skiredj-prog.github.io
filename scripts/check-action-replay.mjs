import assert from 'node:assert/strict';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.REPLAY_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true, channel: process.env.REPLAY_BROWSER_CHANNEL || undefined });
const cases = [
  { route: '/rejouer/', alternate: '/en/replay/', last: ['source externe', 'preuve d’effet', 'décision de reprise'], missing: 'réponse absente' },
  { route: '/en/replay/', alternate: '/rejouer/', last: ['external source', 'effect evidence', 'retry decision'], missing: 'missing response' },
];

try {
  for (const scenario of cases) {
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + scenario.route);
      const root = page.locator('.replay-page');
      const steps = root.locator('[data-replay-step]');
      const previous = root.locator('[data-replay-prev]');
      const next = root.locator('[data-replay-next]');
      assert.equal(await steps.count(), 6);
      assert(await previous.isDisabled());
      for (let index = 0; index < 6; index++) {
        assert.equal(await root.getAttribute('data-replay-index'), String(index));
        assert.equal(await steps.nth(index).getAttribute('aria-current'), 'step');
        assert.equal(await root.locator('[aria-current="step"]').count(), 1);
        assert.equal(await root.locator('[data-replay-panel]:visible [data-replay-pieces] li').count(), 3);
        if (index === 3) {
          assert.equal(await root.locator('[data-replay-panel]:visible [data-replay-status]').textContent(), 'UNKNOWN');
          assert((await root.locator('[data-replay-panel]:visible [data-replay-pieces]').textContent()).includes(scenario.missing));
        }
        if (index === 4) assert.equal(await root.locator('[data-replay-panel]:visible [data-replay-status]').textContent(), 'HOLD');
        if (index < 5) await next.click();
      }
      assert(await next.isDisabled());
      assert.deepEqual(await root.locator('[data-replay-panel]:visible [data-replay-pieces] li').allTextContents(), scenario.last);
      await previous.click();
      assert.equal(await root.getAttribute('data-replay-index'), '4');
      await steps.first().focus();
      await page.keyboard.press('Enter');
      assert.equal(await root.getAttribute('data-replay-index'), '0');
      const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      assert(dimensions.scroll <= dimensions.width + 2, `${scenario.route} ${width}px: horizontal overflow`);
      const languageLink = page.locator(`.tools .lang a[lang="${scenario.route.startsWith('/en/') ? 'fr' : 'en'}"]`);
      assert.equal(new URL(await languageLink.getAttribute('href'), base).pathname, scenario.alternate);
      await languageLink.click();
      await page.waitForURL(base + scenario.alternate);
      assert(await page.locator('.replay-page').isVisible());
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`PASS replay ${scenario.route} ${width}px: six steps, localized evidence, controls, keyboard, language switch, no overflow or JS errors`);
    }
  }
} finally {
  await browser.close();
}
