import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ headless: true });
const failures = [];
try {
  const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1280, height: 820 } });
  page.on('pageerror', e => failures.push(e.message));
  await page.goto('http://127.0.0.1:4173/discovery/', { waitUntil: 'networkidle' });
  await page.waitForSelector('label.reg-source');
  assert.equal(await page.locator('label.reg-source').count(), 5, '5 framework cards');
  await page.locator('label.reg-source input').nth(0).check();
  await page.locator('label.reg-source input').nth(2).check();
  await page.locator('[data-reg-generate]').click();
  await page.locator('[data-reg-output]:visible').waitFor();
  assert((await page.locator('article.reg-finding').count()) > 0);
  assert.equal(await page.locator('.reg-conflict').count(), 0, 'exploration cannot assert a conflict');
  assert((await page.locator('.reg-references a').count()) > 0, 'every report links to selected sources');
  const downloadEvent = page.waitForEvent('download');
  await page.locator('[data-reg-export]').click();
  const download = await downloadEvent;
  assert.match(download.suggestedFilename(), /reg-discovery-.*\.json/);

  await page.locator('[data-reg-example]').click();
  assert((await page.locator('.reg-conflict').count()) > 0, 'fictional PayFlow contradicts declared premises');
  assert((await page.locator('[data-reg-intro]').textContent()).includes('Prior human approval'));
  assert((await page.locator('.reg-limit').textContent()).includes('Aucun système'));
  assert.equal(failures.length, 0, failures.join('\n'));

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on('pageerror', e => failures.push(e.message));
  await mobile.goto('http://127.0.0.1:4173/en/discovery/', { waitUntil: 'networkidle' });
  await mobile.waitForSelector('label.reg-source');
  assert.equal(await mobile.locator('label.reg-source').count(), 5);
  await mobile.locator('label.reg-source input').first().focus();
  await mobile.keyboard.press('Space');
  assert(await mobile.locator('label.reg-source input').first().isChecked(), 'keyboard selection');
  await mobile.locator('[data-reg-generate]').click();
  await mobile.locator('[data-reg-output]:visible').waitFor();
  assert((await mobile.locator('[data-reg-intro]').textContent()).includes('exploratory'));
  assert.equal(failures.length, 0, failures.join('\n'));
  console.log('Browser preview: FR multi-select/export + PayFlow, EN mobile/keyboard passed.');
} finally {
  await browser.close();
}
