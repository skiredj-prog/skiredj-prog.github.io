import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless:true });
try {
  for (const locale of ['fr','en']) {
    const prefix = locale==='fr'?'':'/en';
    for (const width of [320,390,768,1280,1710]) {
      const height=width===1710?740:800;
      const page = await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
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
      // Acceptance: landing-page visitors can start the free report without scrolling,
      // at the observed 1710x900 desktop viewport and across responsive widths.
      const heroCta=await page.locator('.ml-hero .ml-btn-primary').boundingBox();
      assert(heroCta && heroCta.y>=0 && heroCta.y+heroCta.height<=height-16,
        locale+'/'+width+': the primary hero action must fit the first viewport (bottom='+(heroCta?.y+heroCta?.height)+')');
      const heroDemo=await page.locator('.ml-hero .ml-btn-outline').boundingBox();
      assert(heroDemo && heroDemo.y+heroDemo.height<=height-16,
        locale+'/'+width+': the secondary demo action must be above the fold');
      const diagnostic=page.locator('.ml-card').first();
      await diagnostic.click();
      await page.waitForURL('**/diagnostic-execution/');
      assert(await page.locator('h1').first().isVisible(),locale+': offer page heading missing');
      assert(await page.locator('main').isVisible(),locale+': offer page body missing');
      const freeReport=page.locator('.site-nav a[href="'+(locale==='fr'?'/parcours-ia/':'/en/ai-readiness/')+'"]');
      assert.equal(await freeReport.count(),1,locale+': interior navigation must link directly to the free report');
      if(width<=1100)await page.locator('[data-menu-toggle]').click();
      assert(await freeReport.isVisible(),locale+'/'+width+': free report not visible in the interior primary navigation');

      const offerWidth=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
      assert(offerWidth.scroll<=offerWidth.viewport+2,locale+'/'+width+': offer page horizontal overflow ('+(offerWidth.scroll-offerWidth.viewport)+'px)');
      assert.equal(errors.length,0,locale+'/'+width+': browser JavaScript error: '+errors.join(', '));
      await page.close();
      console.log('Chromium '+locale.toUpperCase()+' '+width+'px: three offer paths, responsive layout and linked diagnostic PASS.');
    }
  }

  // Customer acquisition route: complete the full ungated questionnaire in FR and EN.
  for(const locale of ['fr','en']){
    const route=locale==='fr'?'/parcours-ia/':'/en/ai-readiness/';
    for(const profile of ['weak','structured']){
      const page=await browser.newPage({viewport:{width:390,height:844},acceptDownloads:true,reducedMotion:'reduce'});
      const errors=[];
      page.on('pageerror',err=>errors.push(err.message));
      await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle'});
      assert(await page.locator('#pa-start').isVisible(),locale+': pathway start missing');
      const menu=page.locator('.pa-mobile-menu');
      assert(await menu.isVisible(),locale+': mobile pathway navigation must be visible');
      await menu.locator('summary').click();
      const navLinks=menu.locator('nav a');
      assert.equal(await navLinks.count(),5,locale+': pathway menu must expose five links');
      assert(await navLinks.first().isVisible(),locale+': pathway home link must be reachable');
      assert((await navLinks.first().getAttribute('href'))===(locale==='fr'?'/':'/en/'),locale+': pathway home destination wrong');
      await menu.locator('summary').click();

      assert.equal(await page.locator('input[type=email]').count(),0,locale+': report must not demand an email address');
      await page.locator('#pa-start').click();
      for(let i=0;i<10;i++){
        const options=page.locator('.pa-option');
        assert(await options.count()>=3,locale+': missing answer options for question '+(i+1));
        const selectIndex=i<2?0:profile==='weak'?2:0;
        await options.nth(selectIndex).click();
        await page.locator('#pa-next').click();
      }
      assert(await page.locator('#pa-report').isVisible(),locale+': report did not render');
      assert.equal(await page.locator('.pa-dimension').count(),6,locale+': missing six assessment dimensions');
      assert.equal(await page.locator('#pa-priorities li').count(),3,locale+': expected exactly three practical priorities');
      assert(await page.locator('#pa-report-summary').innerText(),locale+': narrative must be substantive');
      const mail=await page.locator('#pa-talk').getAttribute('href');
      assert(mail.startsWith('mailto:skiredj@tenirlabs.cc'),locale+': explicit share-by-email action missing');
      const download=page.waitForEvent('download');
      await page.locator('#pa-download').click();
      const file=await download;
      assert(file.suggestedFilename().endsWith('.txt'),locale+': report download missing');
      const dimensions=await page.locator('.pa-dim-top').allTextContents();
      if(profile==='weak')assert(dimensions.some(x=>x.includes(locale==='fr'?'À clarifier':'Needs work')),locale+': weak self-report not reflected');
      else assert(dimensions.some(x=>x.includes(locale==='fr'?'Structuré':'Structured')),locale+': structured self-report not reflected');
      const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
      assert(dims.scroll<=dims.client+2,locale+': pathway mobile horizontal overflow '+(dims.scroll-dims.client));
      assert.equal(errors.length,0,locale+': report browser errors '+errors.join('; '));
      await page.close();
      console.log('Pathway '+locale.toUpperCase()+' '+profile+': 10 questions, 6 dimensions, 3 actions and report download PASS.');
    }
  }

  // Portfolio hubs must share TENIR navy/blue identity, not the obsolete green tokens.
  for(const locale of ['fr','en']){
    const prefix=locale==='fr'?'':'/en';
    for(const theme of ['dark','light']){
      for(const hub of ['products','services','demos']){
        const page=await browser.newPage({viewport:{width:1710,height:740},colorScheme:theme,reducedMotion:'reduce'});
        await page.addInitScript(mode=>localStorage.setItem('tenir-theme',mode),theme);
        await page.goto('http://127.0.0.1:4173'+prefix+'/portfolio/'+hub+'/',{waitUntil:'networkidle'});
        const colors=await page.evaluate(()=>({
          bg:getComputedStyle(document.body).backgroundColor,
          accent:getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
          scroll:document.documentElement.scrollWidth,
          client:document.documentElement.clientWidth
        }));
        assert.equal(colors.bg,theme==='dark'?'rgb(7, 22, 41)':'rgb(247, 249, 252)',locale+'/'+hub+'/'+theme+': stale portfolio page background '+colors.bg);
        assert.equal(colors.accent,theme==='dark'?'#82aefa':'#2563eb',locale+'/'+hub+'/'+theme+': legacy green accent '+colors.accent);
        assert(colors.scroll<=colors.client+2,locale+'/'+hub+'/'+theme+': horizontal overflow');
        assert(await page.locator('.pf-local-nav').isVisible(),locale+'/'+hub+'/'+theme+': portfolio navigation hidden');
        await page.close();
      }
    }
  }

  for(const locale of ['fr','en']){
    const page=await browser.newPage({viewport:{width:1710,height:740},reducedMotion:'reduce'});
    await page.goto('http://127.0.0.1:4173'+(locale==='fr'?'/parcours-ia/':'/en/ai-readiness/'),{waitUntil:'networkidle'});
    assert(await page.locator('.pa-desktop-nav').isVisible(),locale+': desktop pathway navigation absent');
    assert.equal(await page.locator('.pa-desktop-nav a').count(),5,locale+': desktop pathway menu incomplete');
    const start=await page.locator('#pa-start').boundingBox();
    assert(start && start.y+start.height<=724,locale+': start questionnaire below first visible desktop viewport');
    await page.close();
  }

  // Credibility route: real browser loads the updated 5.7.0 artifact and exercises a simulator.
  for(const locale of ['fr','en']){
    const route=locale==='fr'?'/credibilite/':'/en/credibility/';
    const page=await browser.newPage({viewport:{width:390,height:850},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle'});
    assert(await page.locator('.cr-hero h1').isVisible(),locale+': credibility route hero not rendered');
    assert(await page.locator('.cr-panel').count()===3,locale+': expected release, internal, external proof panels');
    assert((await page.locator('.cr-evidence').innerText()).includes('81 / 81'),locale+': independent rerun evidence missing');
    assert(await page.locator('.cr-architecture iframe').count()===1,locale+': architecture iframe missing');
    await page.locator('.cr-architecture iframe').scrollIntoViewIfNeeded();
    const frame=page.frameLocator('.cr-architecture iframe');
    await frame.locator('#release').waitFor({state:'visible'});
    assert((await frame.locator('#release').innerText()).includes('282.08'),locale+': updated artifact evidence missing');
    await frame.locator('#finReset').click();
    await frame.locator('#finExecute').click();
    assert(await frame.locator('#finLog .log-entry').count()>0,locale+': budget simulator not interactive');
    const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
    assert(dimensions.scroll<=dimensions.client+2,locale+': credibility route horizontal overflow '+(dimensions.scroll-dimensions.client));
    assert.equal(errors.length,0,locale+': interactive credibility browser errors '+errors.join('; '));
    await page.close();
    console.log('Credibility '+locale.toUpperCase()+': v5.7 exact-tag proof, 81 external rerun, interactive simulator and mobile layout PASS.');
  }
} finally {
  await browser.close();
}
