import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const entries=['diagnostic','prevent','prepare','explorer','discovery','mediation','xray','translation','gov','conformance','reg-arch','technical','experiences','control-tower'];
const hubs=['products','services','demos'];
const expected=[...hubs,...entries];
const paths = (lang,page) => lang==='fr'?`dist/portfolio/${page}/index.html`:`dist/en/portfolio/${page}/index.html`;
for(const lang of ['fr','en']){
  for(const page of expected){
    const path=paths(lang,page);
    assert(existsSync(path),`Missing ${lang} route for ${page}: ${path}`);
    const html=readFileSync(path,'utf8');
    assert(html.includes('pf-root'),`Missing editorial portfolio component: ${path}`);
    assert(html.includes('hreflang="'),`Missing language alternate: ${path}`);
    assert(html.includes('portfolio/'),`Missing portfolio links: ${path}`);
    if(!hubs.includes(page)){
      assert(html.includes('pf-details'),`Missing profile: ${path}`);
      assert((html.match(/class="pf-field/g)||[]).length===9,`Expected nine public fields: ${path}`);
      assert(html.includes('pf-status-card'),`Missing maturity panel: ${path}`);
    }
  }
}
// Products must be discoverable in the primary menu for both languages, not only through site content.
for (const [lang, home, productsPath] of [
  ['fr', 'dist/index.html', '/portfolio/products/'],
  ['en', 'dist/en/index.html', '/en/portfolio/products/'],
]) {
  const html = readFileSync(home,'utf8');
  const navStart = html.indexOf('id="main-navigation"');
  assert(navStart !== -1, `${lang}: main navigation missing`);
  const navEnd = html.indexOf('</nav>', navStart);
  assert(navEnd !== -1, `${lang}: main navigation closing tag missing`);
  const nav = html.slice(navStart, navEnd);
  assert(nav.includes(`href="${productsPath}"`), `${lang}: Products link missing from header nav`);
  assert(existsSync(paths(lang,'products')), `${lang}: menu destination not built`);
  const expectedLabel = lang === 'fr' ? 'Produits' : 'Products';
  assert(nav.includes(`>${expectedLabel}</a>`), `${lang}: visible Products label missing`);
  const productNavLinks = (nav.match(new RegExp('href="' + productsPath + '"','g')) || []).length;
  assert.equal(productNavLinks, 1, `${lang}: duplicate Products entry in header navigation`);
}

// The product matrix is a genuinely two-dimensional classification, not the
// illustrative before/during/after sequence on the homepage.
const mappedProducts = ['prevent','prepare','explorer','discovery','mediation','xray','translation','gov','conformance'];
for(const lang of ['fr','en']){
  const matrixPage=readFileSync(paths(lang,'products'),'utf8');
  assert(matrixPage.includes('portfolio-matrix-title'),`${lang}: 2D classification heading missing`);
  assert(matrixPage.includes('class="pm-2x2"') && matrixPage.includes('role="region"') && matrixPage.includes('tabindex="0"'),`${lang}: keyboard-accessible 2x2 matrix missing`);
  assert((matrixPage.match(/class="pm-cell"/g)||[]).length===4,`${lang}: expected four matrix cells`);
  assert(matrixPage.includes(lang==='fr'?'Avant de laisser agir · comprendre':'Before AI acts · understand'),`${lang}: before-action axis missing`);
  assert(matrixPage.includes(lang==='fr'?'Après une action · vérifier':'After an action · verify'),`${lang}: after-effect axis missing`);
  assert(matrixPage.includes(lang==='fr'?'Commencez par la situation':'Start with the situation'),`${lang}: visitor-friendly matrix guidance missing`);
  assert(matrixPage.includes('pm-transverse'),`${lang}: cross-cutting matrix guidance missing`);
  const matrixStart=matrixPage.indexOf('<div class="pm-2x2"');
  const matrixEnd=matrixPage.indexOf('</div><div class="pm-transverse"',matrixStart);
  const matrix=matrixPage.slice(matrixStart,matrixEnd+6);
  for(const id of ['reg-arch','technical','diagnostic']){
    assert(!matrix.includes(`portfolio/${id}/`),`${lang}: foundation, service or demo incorrectly placed inside product grid: ${id}`);
    assert(matrixPage.includes(`href="${lang==='fr'?'/':'/en/'}portfolio/${id}/"`),`${lang}: missing cross-cutting link ${id}`);
  }
  for(const id of mappedProducts){
    assert(matrixPage.includes(`href="${lang==='fr'?'/':'/en/'}portfolio/${id}/"`),`${lang}: ${id} not placed in the matrix`);
  }
  const homePage=readFileSync(lang==='fr'?'dist/index.html':'dist/en/index.html','utf8');
  assert(homePage.includes('home-lifecycle'),`${lang}: concise lifecycle reading missing on marketing homepage`);
  assert(homePage.includes('lifecycle-flow'),`${lang}: lifecycle stages missing on homepage`);
  assert(homePage.includes('id="market-heading"'),`${lang}: conversion hero missing`);
  assert(homePage.includes('id="essayer"'),`${lang}: live simulation destination missing`);
  assert(homePage.includes('/embeds/reg-autonomy-control-tower-v1.0.html'),`${lang}: embedded interactive demo missing`);
  assert(homePage.includes('id="comprendre"') && homePage.includes('id="demarche"'),`${lang}: legacy deep links must remain valid`);
  assert(homePage.includes(`href="${lang==='fr'?'/parcours-ia/':'/en/ai-readiness/'}"`),`${lang}: free personalized pathway CTA must be on the homepage`);
  assert(homePage.includes(`href="${lang==='fr'?'/':'/en/'}portfolio/products/"`),`${lang}: product map not reachable from homepage`);
}

const htmlArtifact='dist/embeds/reg-autonomy-control-tower-v1.0.html';
assert(existsSync(htmlArtifact),'Missing standalone Control Tower asset');
const simulation=readFileSync(htmlArtifact,'utf8');
for(const name of ['structural','authorized','unknown','duplicate'])assert(simulation.includes(name+':{'),`Scenario missing: ${name}`);
for(const label of ['kernel_connection:false','external_provider_effect','no live'])assert(simulation.toLowerCase().includes(label.toLowerCase()),`Simulation boundary missing: ${label}`);
for(const lang of ['fr','en']){
  const frame=readFileSync(paths(lang,'control-tower'),'utf8');
  assert(frame.includes('pf-demo-frame'),'Control Tower iframe missing');
  assert(frame.includes('loading="lazy"'),'Control Tower should not force media loading');
  assert(frame.includes('/embeds/reg-autonomy-control-tower-v1.0.html'),'Control Tower source missing');
}
console.log('Portfolio: 34 FR/EN routes, 28 nine-field profiles, standalone 4-scenario interactive artifact, no autoplay.');

// The free self-assessment is the new commercial front door.
await import('./check-pathway.mjs');
await import('./check-credibility.mjs');
