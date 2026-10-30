import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless:true });
try {
  for (const locale of ['fr','en']) {
    const prefix = locale==='fr'?'':'/en';
    for (const width of [320,390,768,1280]) {
      const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      const errors=[];
      page.on('pageerror', e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:4173'+prefix+'/', {waitUntil:'networkidle'});
      const cards=page.locator('.ml-card');
      assert.equal(await cards.count(),3,locale+' / '+width+': expected three primary offers');
      assert(await page.locator('.ml-offerings').isVisible(),locale+' / '+width+': marketing offers hidden');
      const grid=await page.locator('.ml-cards').evaluate(el=>({
        columns:getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length,
        width:el.getBoundingClientRect().width
      }));
      if(width<=390)assert.equal(grid.columns,1,locale+' / '+width+': narrow grid must stack');
      if(width===768)assert.equal(grid.columns,2,locale+': tablet grid must use two columns');
      if(width===1280)assert.equal(grid.columns,3,locale+': desktop grid should use three offer columns');
      const dims=await page.evaluate(()=>({
        scroll:document.documentElement.scrollWidth,
        viewport:document.documentElement.clientWidth
      }));
      assert(dims.scroll<=dims.viewport+2,locale+'/'+width+': page horizontal overflow ('+(dims.scroll-dims.viewport)+'px)');
      assert(await page.locator('#market-heading').isVisible(),locale+'/'+width+': main marketing message hidden');
      assert(await page.locator('.ml-demo-panel iframe').count()===1,locale+'/'+width+': interactive demo missing');
      assert(await page.locator('.ml-hero .ml-btn-primary').count()===1,locale+'/'+width+': direct diagnostic CTA missing');
      const diagnostic=page.locator('.ml-card').first();
      await diagnostic.click();
      await page.waitForURL('**/diagnostic-execution/');
      assert(await page.locator('h1').first().isVisible(),locale+': offer page heading missing');
      assert(await page.locator('main').isVisible(),locale+': offer page body missing');
      const offerWidth=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
      assert(offerWidth.scroll<=offerWidth.viewport+2,locale+'/'+width+': offer page horizontal overflow ('+(offerWidth.scroll-offerWidth.viewport)+'px)');
      assert.equal(errors.length,0,locale+'/'+width+': browser JavaScript error: '+errors.join(', '));
      await page.close();
      console.log('Chromium '+locale.toUpperCase()+' '+width+'px: three offer paths, responsive layout and linked diagnostic PASS.');
    }
  }
} finally {
  await browser.close();
}
