import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  for (const width of [320, 390, 768, 1024, 1100]) {
    // Touch device: section menus are opened with tap(), as a phone would.
    const page = await browser.newPage({ viewport: { width, height: 640 }, hasTouch: true });
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
    // Each section is an accordion in the folded menu: one open at a time, no sideways scroll, 44px section buttons and links.
    await toggle.click();
    const triggers = page.locator('[data-nav-trigger]');
    for (let index = 0; index < 4; index += 1) {
      const trigger = triggers.nth(index);
      await trigger.tap();
      const triggerBox = await trigger.boundingBox();
      assert(triggerBox && triggerBox.height >= 44, `section button ${index} under 44px at ${width}px`);
      const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
      assert.equal(await trigger.getAttribute('aria-expanded'), 'true', `section ${index} expands at ${width}px`);
      assert(await panel.isVisible(), `section ${index} menu visible at ${width}px`);
      assert.equal(await page.locator('.nav-item[data-open]').count(), 1, `one section open at a time at ${width}px`);
      const fit = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      assert(fit.scroll <= fit.viewport + 2, `open section ${index} overflows at ${width}px`);
      const small = await panel.locator('a').evaluateAll(links => links.filter(link => link.getBoundingClientRect().height < 44).map(link => link.textContent.trim()));
      assert.deepEqual(small, [], `menu links under 44px at ${width}px`);
    }
    await triggers.nth(3).tap();
    assert.equal(await page.locator('.nav-item[data-open]').count(), 0, `second tap closes the section at ${width}px`);
    await page.close();
  }
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  for (const locale of ['fr', 'en']) {
    const prefix = locale === 'fr' ? '' : '/en';
    for (const route of [`${prefix}/`, `${prefix}/portfolio/demos/`]) {
      await desktop.goto(`http://127.0.0.1:4173${route}`);
      await desktop.evaluate(() => document.fonts.ready);
      assert.equal(await desktop.locator('.site-header').evaluate(x => getComputedStyle(x).position), 'sticky', 'desktop remains sticky');
      assert(await desktop.locator('#main-navigation').isVisible(), 'desktop links visible');
      if (route.endsWith('/portfolio/demos/')) {
        const active = desktop.locator('#main-navigation [data-nav-trigger][aria-current]');
        assert.deepEqual(await active.allTextContents(), [locale === 'fr' ? 'Démos' : 'Demos'], `${route}: only the Demos section is active`);
      }
      for (const width of [1101, 1280, 1440]) {
        await desktop.setViewportSize({ width, height: 720 });
        const bounds = await desktop.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          scroll: document.documentElement.scrollWidth,
          action: document.querySelector('.header-cta').getBoundingClientRect().right,
        }));
        assert(bounds.action <= bounds.viewport, `${route} at ${width}px: header action overflows`);
        assert(bounds.scroll <= bounds.viewport + 2, `${route} at ${width}px: page overflows`);
      }
    }
  }
  // Section menus on a wide screen: click and keyboard open them, Escape returns focus, nothing overflows.
  for (const [route, labels] of [['/', ['Comprendre', 'Produits', 'Démos', 'Crédibilité']], ['/en/', ['Understand', 'Products', 'Demos', 'Credibility']]]) {
    await desktop.setViewportSize({ width: 1280, height: 720 });
    await desktop.goto(`http://127.0.0.1:4173${route}`);
    const triggers = desktop.locator('[data-nav-trigger]');
    assert.deepEqual(await triggers.allTextContents(), labels, `${route}: the four sections, in order`);
    assert.equal(await desktop.locator('.nav-panel').filter({ visible: true }).count(), 0, `${route}: menus closed on load`);
    for (const width of [1101, 1280]) {
      await desktop.setViewportSize({ width, height: 720 });
      for (let index = 0; index < 4; index += 1) {
        const trigger = triggers.nth(index);
        await trigger.click();
        const panel = desktop.locator(`#${await trigger.getAttribute('aria-controls')}`);
        assert(await panel.isVisible(), `${route}: ${labels[index]} menu opens at ${width}px`);
        assert.equal(await desktop.locator('.nav-panel').filter({ visible: true }).count(), 1, `${route}: one menu at a time`);
        const box = await panel.boundingBox();
        const fit = await desktop.evaluate(() => ({ viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
        assert(box.x >= 0 && box.x + box.width <= fit.viewport + 1 && box.y + box.height <= 720, `${route}: ${labels[index]} menu leaves the ${width}px viewport`);
        assert(fit.scroll <= fit.viewport + 2, `${route}: ${labels[index]} menu overflows the page at ${width}px`);
        assert(await panel.locator('.nav-question').isVisible(), `${route}: ${labels[index]} menu states its question`);
      }
      await desktop.keyboard.press('Escape');
      assert.equal(await desktop.locator('.nav-panel').filter({ visible: true }).count(), 0, `${route}: Escape closes the menu`);
      assert.equal(await desktop.evaluate(() => document.activeElement?.getAttribute('aria-controls')), 'nav-panel-credibilite', `${route}: Escape returns focus to the section button`);
    }
    await triggers.nth(0).focus();
    await desktop.keyboard.press('Enter');
    assert(await desktop.locator('#nav-panel-comprendre').isVisible(), `${route}: Enter opens the menu`);
    await desktop.keyboard.press('Tab');
    assert(await desktop.evaluate(() => Boolean(document.activeElement?.closest('#nav-panel-comprendre'))), `${route}: Tab moves into the open menu`);
    await desktop.mouse.click(640, 700);
    assert.equal(await desktop.locator('.nav-panel').filter({ visible: true }).count(), 0, `${route}: a click outside closes the menu`);
    await triggers.nth(1).hover();
    // Wait on the panel state, not on the open/close timers in site.ts.
    await desktop.locator('#nav-panel-produits').waitFor({ state: 'visible', timeout: 3000 });
    await desktop.mouse.move(640, 700);
    await desktop.locator('#nav-panel-produits').waitFor({ state: 'hidden', timeout: 3000 });
    assert.equal(await desktop.locator('.nav-panel').filter({ visible: true }).count(), 0, `${route}: leaving closes the menu`);
  }
  // Nothing in a header menu is missing from the footer site map.
  for (const route of ['/', '/en/']) {
    await desktop.goto(`http://127.0.0.1:4173${route}`);
    const missing = await desktop.evaluate(() => {
      const footer = new Set(Array.from(document.querySelectorAll('.footer-links a'), link => link.getAttribute('href')));
      return Array.from(document.querySelectorAll('.nav-panel a'), link => link.getAttribute('href')).filter(href => !footer.has(href));
    });
    assert.deepEqual(missing, [], `${route}: header menu links absent from the footer`);
  }
  await desktop.close();
  console.log('UX navigation: mobile menu, section menus (mouse, keyboard, touch), bilingual desktop layout, and active Demos group passed.');
} finally {
  await browser.close();
}
