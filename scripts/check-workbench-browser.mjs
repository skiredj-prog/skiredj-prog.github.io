import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

const browser=await chromium.launch({headless:true,...(process.env.REPLAY_BROWSER_CHANNEL ? {channel:process.env.REPLAY_BROWSER_CHANNEL} : {})});
try{
 for(const locale of ['fr','en']){
  const prefix=locale==='fr'?'':'/en';
  for(const width of [320,390,768,1280]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   const base=process.env.REPLAY_BASE_URL || 'http://127.0.0.1:4173';
   const route=prefix+'/portfolio/workbench/';
   await page.goto(base+route,{waitUntil:'networkidle'});
   const headline=page.locator('.pf-detail-hero h2');
   assert(await headline.isVisible(),locale+'/'+width+': overview hero missing');
   assert((await headline.innerText()).length>20,locale+'/'+width+': empty overview');
   assert(await page.locator('.pf-status-card').isVisible(),locale+'/'+width+': publication disclaimer hidden');
   assert((await page.locator('.pf-status-card').innerText()).includes(locale==='fr'?'distribution publique':'public distribution'),locale+'/'+width+': missing release boundary');
   assert.equal(await page.locator('.pf-card-grid article').count(),4,locale+'/'+width+': expected four steps');
   const metrics=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
   assert(metrics.scroll<=metrics.viewport+2,locale+'/'+width+': horizontal overflow '+(metrics.scroll-metrics.viewport)+'px');
   assert(!page.url().includes('.zip'),locale+'/'+width+': unexpected download redirect');
   assert.equal(errors.length,0,locale+'/'+width+': JS errors: '+errors.join('; '));
   const offer=page.locator('.pf-actions a').filter({hasText:locale==='fr'?'Comprendre le diagnostic proposé':'Read the proposed diagnostic'});
   await offer.click();
   await page.waitForURL('**/diagnostic-execution/');
   assert(await page.locator('main').isVisible(),locale+'/'+width+': diagnostic route failed');
   await page.goto(base+prefix+'/portfolio/demos/',{waitUntil:'networkidle'});
   const link=page.locator('a[href="'+route+'"]').first();
   assert(await link.count()>0,locale+'/'+width+': no Workbench link in demos');
   await link.click();
   await page.waitForURL('**/portfolio/workbench/');
   console.log('Chromium '+locale.toUpperCase()+' '+width+'px PASS: page, disclaimer, four stages, no overflow, offer and demos navigation.');
   await page.close();
  }
 }
} finally{
 await browser.close();
}
