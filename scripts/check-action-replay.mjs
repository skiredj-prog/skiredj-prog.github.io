import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.REPLAY_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true, channel: process.env.REPLAY_BROWSER_CHANNEL || undefined });
const cases = [
  { route: '/rejouer/', alternate: '/en/replay/', last: ['Dossier V-042', 'Effet non démontré', 'Décision de maintien du HOLD'], missing: 'Confirmation absente', verdict: 'NON DÉMONTRÉ' },
  { route: '/en/replay/', alternate: '/rejouer/', last: ['V-042 record', 'Effect not demonstrated', 'Decision to maintain HOLD'], missing: 'Missing confirmation', verdict: 'NOT DEMONSTRATED' },
];

try {
  for (const scenario of cases) {
    for (const width of [320, 390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: width === 320 ? 'dark' : 'light' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + scenario.route);
      const root = page.locator('.replay-page');
      await page.waitForFunction(() => document.querySelector('.replay-page')?.dataset.replayEnhanced === 'true');
      const steps = root.locator('[data-replay-step]');
      const previous = root.locator('[data-replay-prev]');
      const next = root.locator('[data-replay-next]');
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await steps.count(), 8);
      assert(await previous.isDisabled());
      for (let index = 0; index < 8; index++) {
        const panel = root.locator('[data-replay-panel]:visible');
        assert.equal(await panel.count(), 1);
        assert.equal(await root.getAttribute('data-replay-index'), String(index));
        assert.equal(await steps.nth(index).getAttribute('aria-current'), 'step');
        assert.equal(await root.locator('[aria-current="step"]').count(), 1);
        assert.equal(await panel.locator('.replay-pieces li').count(), 3);
        assert(await panel.locator('.replay-actors li').count() >= 2);
        assert((await panel.locator('.replay-owner').textContent()).length > 20);
        assert.equal(await panel.getAttribute('data-knowledge'), index < 4 ? 'known' : 'unknown');
        if (index === 4) {
          assert.equal(await panel.locator('[data-replay-status]').textContent(), 'UNKNOWN');
          assert((await panel.locator('.replay-pieces').textContent()).includes(scenario.missing));
        }
        if (index === 5 || index === 7) assert.equal(await panel.locator('[data-replay-status]').textContent(), 'HOLD');
        await panel.locator('summary').click();
        assert(await panel.locator('details p').isVisible());
        const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
        assert(dimensions.scroll <= dimensions.width + 2, `${scenario.route} ${width}px event ${index}: overflow`);
        if (index < 7) await next.click();
      }
      assert(await next.isDisabled());
      const last = root.locator('[data-replay-panel]:visible');
      assert.deepEqual(await last.locator('.replay-pieces li').allTextContents(), scenario.last);
      const terms = await last.locator('.replay-outcomes dt').allTextContents();
      assert(terms[0].startsWith('ACCEPT'));
      assert(terms[1].startsWith('HOLD'));
      assert(terms[2].startsWith(scenario.verdict));
      if (process.env.REPLAY_SCREENSHOT_DIR && scenario.route === '/rejouer/' && width !== 320) {
        await mkdir(process.env.REPLAY_SCREENSHOT_DIR, { recursive: true });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: join(process.env.REPLAY_SCREENSHOT_DIR, `replay-${width}.png`), fullPage: true });
      }
      await previous.click();
      assert.equal(await root.getAttribute('data-replay-index'), '6');
      assert((await root.locator('[data-replay-announcement]').textContent()).startsWith('7 / 8'));
      await steps.first().focus();
      await page.keyboard.press('Enter');
      assert.equal(await root.getAttribute('data-replay-index'), '0');
      await steps.nth(5).focus();
      await page.keyboard.press('Space');
      assert.equal(await root.getAttribute('data-replay-index'), '5');
      const targetLanguage = scenario.route.startsWith('/en/') ? 'fr' : 'en';
      let languageLink = page.locator(`.tools .lang a[lang="${targetLanguage}"]`);
      if (!await languageLink.isVisible()) {
        await page.locator('[data-menu-toggle]').click();
        languageLink = page.locator(`.nav-mobile-tools a[lang="${targetLanguage}"]`);
      }
      assert.equal(new URL(await languageLink.getAttribute('href'), base).pathname, scenario.alternate);
      await languageLink.click();
      await page.waitForURL(base + scenario.alternate);
      assert(await page.locator('.replay-page').isVisible());
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`PASS replay ${scenario.route} ${width}px: eight events, actors, evidence, knowledge, decisions, keyboard, language switch, no overflow or JS errors`);
    }
    const fallback = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    await fallback.goto(base + scenario.route);
    assert.equal(await fallback.locator('[data-replay-panel]:visible').count(), 8);
    assert(await fallback.locator('[data-replay-timeline]').isHidden());
    assert(await fallback.locator('[data-replay-controls]').isHidden());
    assert(await fallback.locator('.replay-outcomes').isVisible());
    await fallback.close();
    console.log(`PASS replay ${scenario.route}: full narrative available without JavaScript`);
  }
} finally {
  await browser.close();
}
