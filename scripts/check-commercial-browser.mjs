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
      const cards=page.locator('.home-offer-item');
      assert.equal(await cards.count(),4,locale+' / '+width+': expected four paths');
      assert(await page.locator('.home-offer-map').isVisible(),locale+' / '+width+': offer map hidden');
      const grid=await page.locator('.home-offer-grid').evaluate(el=>({
        columns:getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length,
        width:el.getBoundingClientRect().width
      }));
      if(width<=390)assert.equal(grid.columns,1,locale+' / '+width+': narrow grid must stack');
      if(width===768)assert.equal(grid.columns,2,locale+': tablet grid must use two columns');
      if(width===1280)assert.equal(grid.columns,4,locale+': desktop grid should use four compact columns');
      const dims=await page.evaluate(()=>({
        scroll:document.documentElement.scrollWidth,
        viewport:document.documentElement.clientWidth
      }));
      assert(dims.scroll<=dims.viewport+2,locale+'/'+width+': page horizontal overflow ('+(dims.scroll-dims.viewport)+'px)');
      const diagnostic=page.locator('.home-offer-item').first();
      await diagnostic.click();
      await page.waitForURL('**/diagnostic-execution/');
      assert(await page.locator('h1').first().isVisible(),locale+': offer page heading missing');
      assert(await page.locator('main').isVisible(),locale+': offer page body missing');
      const offerWidth=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
      assert(offerWidth.scroll<=offerWidth.viewport+2,locale+'/'+width+': offer page horizontal overflow ('+(offerWidth.scroll-offerWidth.viewport)+'px)');
      assert.equal(errors.length,0,locale+'/'+width+': browser JavaScript error: '+errors.join(', '));
      await page.close();
      console.log('Chromium '+locale.toUpperCase()+' '+width+'px: four offer paths, responsive layout and linked diagnostic PASS.');
    }
  }
} finally {
  await browser.close();
}
