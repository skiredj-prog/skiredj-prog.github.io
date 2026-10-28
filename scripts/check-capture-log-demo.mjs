import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.REPLAY_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({ headless: true, channel: process.env.REPLAY_BROWSER_CHANNEL || undefined });
const cases = [
  { locale: 'fr', route: '/demonstrations/journal/', alternate: '/en/demos/log/', replay: '/rejouer/', prefix: '', absent: 'Absente', fiction: 'Exemple fictif', unknown: 'inconclusive' },
  { locale: 'en', route: '/en/demos/log/', alternate: '/demonstrations/journal/', replay: '/en/replay/', prefix: '/en', absent: 'Absent', fiction: 'Fictional example', unknown: 'inconclusive' },
];

try {
  for (const scenario of cases) {
    for (const width of [320, 390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: width === 320 ? 'dark' : 'light' });
      const errors = [], writes = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url()); });
      assert.equal((await page.goto(base + scenario.route)).status(), 200);
      const root = page.locator('.capture-demo');
      const compare = root.locator('[data-capture-compare]');
      const noWitness = root.locator('[data-capture-no-witness]');
      assert.equal(await page.locator('h1').count(), 1);
      assert((await root.locator('.capture-intro').textContent()).includes(scenario.fiction));
      assert.equal(await root.locator('[data-capture-log] li').count(), 2);
      assert(await root.locator('[data-capture-comparison]').isHidden());
      assert(await root.locator('[data-capture-finding]').isHidden());
      await compare.locator('summary').focus();
      await page.keyboard.press('Space');
      assert(await compare.evaluate(details => details.open));
      assert.equal(await root.locator('[data-capture-comparison] tbody tr').count(), 3);
      assert.equal(await root.locator('.capture-missing').count(), 1);
      assert.equal(await root.locator('.capture-missing th').textContent(), 'D-042');
      assert.equal(await root.locator('.capture-missing strong').textContent(), scenario.absent);
      const tableWidth = await root.locator('[data-capture-comparison]').evaluate(table => ({ scroll: table.parentElement.scrollWidth, width: table.parentElement.clientWidth }));
      assert(tableWidth.scroll <= tableWidth.width + 2, `${scenario.locale} ${width}: the comparison must fit without hiding its last column`);
      assert((await root.locator('[data-capture-finding]').textContent()).includes('D-042'));
      await noWitness.locator('summary').click();
      assert(await compare.evaluate(details => details.open), 'The two disclosures must remain independently explorable');
      assert((await noWitness.textContent()).includes(scenario.unknown));
      await root.locator('[data-capture-limits] summary').click();
      assert((await root.locator('[data-capture-limits]').textContent()).includes('CB-T01'));
      assert((await root.locator('[data-capture-limits]').textContent()).includes(scenario.locale === 'fr' ? 'ne lance aucun test' : 'runs no test'));
      const links = root.locator('.capture-next .actions a');
      assert.deepEqual(await links.evaluateAll(items => items.map(item => new URL(item.href).pathname)), [scenario.prefix + '/portfolio/prepare/', scenario.replay, scenario.prefix + '/portfolio/demos/']);
      const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      assert(dimensions.scroll <= dimensions.width + 2, `${scenario.locale} ${width}: horizontal overflow`);
      if (process.env.REPLAY_SCREENSHOT_DIR && scenario.locale === 'fr' && width !== 320) {
        await mkdir(process.env.REPLAY_SCREENSHOT_DIR, { recursive: true });
        await compare.screenshot({ path: join(process.env.REPLAY_SCREENSHOT_DIR, `capture-${width}.png`) });
      }
      let language = page.locator(`.tools .lang a[lang="${scenario.locale === 'fr' ? 'en' : 'fr'}"]`);
      if (!await language.isVisible()) {
        await page.locator('[data-menu-toggle]').click();
        language = page.locator('.nav-mobile-tools a');
      }
      assert.equal(new URL(await language.getAttribute('href'), base).pathname, scenario.alternate);
      const alternate = await page.locator(`link[rel="alternate"][hreflang="${scenario.locale === 'fr' ? 'en' : 'fr'}"]`).getAttribute('href');
      assert.equal(new URL(alternate, base).pathname, scenario.alternate);
      await language.click();
      await page.waitForURL(base + scenario.alternate);
      assert(await page.locator('.capture-demo').isVisible());
      assert.deepEqual(errors, []);
      assert.deepEqual(writes, []);
      await page.close();
      console.log(`PASS log demo ${scenario.locale} ${width}px: comparison, missing event, uncertainty, limits, language, exits, no overflow or writes`);
    }
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    await page.goto(base + scenario.route);
    await page.locator('[data-capture-compare] summary').click();
    assert(await page.locator('[data-capture-finding]').isVisible());
    await page.locator('[data-capture-no-witness] summary').click();
    assert(await page.locator('[data-capture-no-witness] h3').isVisible());
    await page.close();
    const navigation = await browser.newPage();
    for (const [from, selector] of [
      [scenario.prefix + '/portfolio/demos/', `.pf-demo-card a[href="${scenario.route}"]`],
      [scenario.prefix + '/portfolio/prepare/', '[data-capture-bridge] a'],
      [scenario.replay, '[data-capture-replay-link]'],
    ]) {
      await navigation.goto(base + from);
      assert.equal(await navigation.locator(`#main-navigation a[href="${scenario.route}"]`).count(), 1);
      await navigation.locator(selector).click();
      await navigation.waitForURL(base + scenario.route);
      assert(await navigation.locator('.capture-demo').isVisible());
    }
    await navigation.close();
    console.log(`PASS log demo ${scenario.locale}: usable without JavaScript; discoverable from demos, REG Prepare and replay`);
  }
} finally {
  await browser.close();
}
