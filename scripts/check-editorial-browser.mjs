import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const server='http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true});
try {
 for(const locale of ['fr','en']){
  const prefix=locale==='fr'?'':'/en';
  const casePath=locale==='fr'?'/cas/':'/en/cases/';
  for(const width of [320,390,768,1280]){
   const page=await browser.newPage({viewport:{width,height:920},reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(server+prefix+'/',{waitUntil:'domcontentloaded'});
   await page.locator('#home-title').waitFor({state:'visible'});
   const hero=await page.locator('#home-title').innerText();
   assert(hero.includes(locale==='fr'?'marché':'market'),locale+'/'+width+': no editorial headline');
   const positions=await page.evaluate(()=>({
     learning:document.querySelector('[aria-labelledby="responsibility-title"]')?.getBoundingClientRect().top,
     commerce:document.querySelector('.home-offer-map')?.getBoundingClientRect().top,
     video:document.querySelector('.execution-video')?.getBoundingClientRect().top,
     width:document.documentElement.scrollWidth,
     viewport:document.documentElement.clientWidth
   }));
   assert(positions.learning<positions.commerce,locale+'/'+width+': sales before learning');
   assert(positions.learning<positions.video,locale+'/'+width+': video before learning');
   assert(positions.width<=positions.viewport+3,locale+'/'+width+': home horizontal overflow '+(positions.width-positions.viewport));
   await page.locator('a[href="'+casePath+'"]').first().click();
   await page.waitForURL('**'+casePath);
   assert(await page.locator('main').isVisible(),locale+'/'+width+': cases missing');
   for(const id of ['banque-assurance','transport-mobilite']){
     const title=page.locator('#'+id+'-sector-map-title');
     assert(await title.count()===1,locale+'/'+width+': map title missing/duplicate');
   }
   const seq=page.locator('.sector-sequence').last();
   const stats=await seq.evaluate(el=>({scroll:el.scrollWidth,client:el.clientWidth,columns:getComputedStyle(el).gridTemplateColumns.split(' ').length}));
   assert.equal(stats.columns,8,locale+'/'+width+': transport sequence must have 8 columns');
   assert(await seq.getAttribute('tabindex')==='0',locale+'/'+width+': scrollable area inaccessible by keyboard');
   await seq.focus();
   assert(await seq.evaluate(el=>document.activeElement===el),locale+'/'+width+': sequence is not focusable');
   const caseWidth=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
   assert(caseWidth.page<=caseWidth.viewport+3,locale+'/'+width+': cases document overflow '+(caseWidth.page-caseWidth.viewport));
   const video=page.locator('video').first();
   assert((await video.getAttribute('src')).startsWith('/media/'),locale+'/'+width+': video path is not published under local media');
   const alternative=page.locator('a[hreflang="'+(locale==='fr'?'en':'fr')+'"]');
   assert(await alternative.count()>0,locale+'/'+width+': no alternate-language link');
   assert.equal(errors.length,0,locale+'/'+width+': JS errors '+errors.join('; '));
   await page.close();
   console.log('P2 Chromium '+locale.toUpperCase()+' '+width+'px PASS: learning-first, source path, locale, 8-step scroll, keyboard and layout.');
  }
 }
} finally { await browser.close(); }
