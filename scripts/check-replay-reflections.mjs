import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.REPLAY_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true, channel: process.env.REPLAY_BROWSER_CHANNEL || undefined });
const events = [
  { id: 'authorization', index: 1, choice: 'permission', feedback: /permission/ },
  { id: 'lost-response', index: 4, choice: 'lookup', feedback: /HOLD/ },
  { id: 'lookup', index: 6, choice: 'bank-state', feedback: /traitement encore en cours|ongoing processing/ },
];

try {
  for (const path of ['/rejouer/', '/en/replay/']) {
    for (const width of [320, 390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: width === 320 ? 'dark' : 'light' });
      const errors = [], writes = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url()); });
      await page.goto(base + path);
      const root = page.locator('.replay-page');
      await page.waitForFunction(() => document.querySelector('.replay-page')?.dataset.replayEnhanced === 'true');
      assert.equal(await root.locator('[data-replay-reflection]').count(), 3);
      assert.equal(await root.locator('input[type="radio"]:visible').count(), 0);
      await root.locator('[data-replay-step="7"]').click();
      assert.equal(await root.getAttribute('data-replay-index'), '7');
      assert.equal(await root.locator('input:checked').count(), 0, 'No answer is required to reach the end');
      for (const event of events) {
        await root.locator(`[data-replay-step="${event.index}"]`).click();
        const panel = root.locator(`[data-event="${event.id}"]`);
        await panel.locator('summary').click();
        const reflection = panel.locator('[data-replay-reflection]');
        const choices = reflection.locator('input[type="radio"]');
        const response = reflection.locator('[data-reflection-response]');
        assert.equal(await choices.count(), 3);
        assert.equal(await response.getAttribute('aria-live'), 'polite');
        assert.equal(await reflection.locator('fieldset').getAttribute('aria-labelledby'), await panel.locator('summary').getAttribute('id'));
        const answers = new Set();
        for (const choice of await choices.all()) {
          assert.equal(await choice.getAttribute('aria-controls'), await response.getAttribute('id'));
          await choice.check();
          answers.add(await response.textContent());
          assert.equal(await root.getAttribute('data-replay-index'), String(event.index), 'Choosing a response must not advance the replay');
          assert.equal(await reflection.locator('input:checked').count(), 1);
        }
        assert.equal(answers.size, 3, 'Each choice must have its own explanation');
        await choices.first().focus();
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowDown');
        assert(await choices.nth(1).isChecked());
        assert(await choices.nth(1).evaluate(input => input === document.activeElement));
        await reflection.locator(`input[value="${event.choice}"]`).check();
        assert.match(await response.textContent(), event.feedback);
        await root.locator('[data-replay-step="0"]').click();
        await root.locator(`[data-replay-step="${event.index}"]`).click();
        assert(await reflection.locator(`input[value="${event.choice}"]`).isChecked());
        assert.match(await response.textContent(), event.feedback);
        const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
        assert(dimensions.scroll <= dimensions.width + 2, `${path} ${width}px ${event.id}: overflow`);
        if (process.env.REPLAY_SCREENSHOT_DIR && path === '/rejouer/' && event.id === 'lost-response' && width !== 320) {
          await mkdir(process.env.REPLAY_SCREENSHOT_DIR, { recursive: true });
          await panel.screenshot({ path: join(process.env.REPLAY_SCREENSHOT_DIR, `reflection-${width}.png`) });
        }
      }
      assert.deepEqual(errors, []);
      assert.deepEqual(writes, [], 'Reflections must not send data or execute an action');
      await page.close();
      console.log(`PASS reflections ${path} ${width}px: optional, distinct feedback, keyboard, retained choices, no overflow or writes`);
    }
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    await page.goto(base + path);
    for (const event of events) {
      const panel = page.locator(`[data-event="${event.id}"]`);
      await panel.locator('summary').click();
      assert(await panel.locator('[data-reflection-response]').isVisible());
      assert((await panel.locator('[data-reflection-response]').textContent()).length > 40);
      assert(await panel.locator('fieldset').isHidden());
    }
    await page.close();
    console.log(`PASS reflections ${path}: explanations available without JavaScript`);
  }
} finally {
  await browser.close();
}
