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
const mappedProducts = ['prevent','prepare','explorer','discovery','mediation','xray','translation','gov','conformance','reg-arch','technical'];
for(const lang of ['fr','en']){
  const matrixPage=readFileSync(paths(lang,'products'),'utf8');
  assert(matrixPage.includes('portfolio-matrix-title'),`${lang}: 2D classification heading missing`);
  assert(matrixPage.includes('pm-table'),`${lang}: semantic matrix table missing`);
  assert(matrixPage.includes('scope="row"') && matrixPage.includes('scope="col"'),`${lang}: accessible axes missing`);
  assert(matrixPage.includes('class="pm-scroller"') && matrixPage.includes('tabindex="0"'),`${lang}: keyboard-accessible horizontal scroll missing`);
  assert(matrixPage.includes(lang==='fr'?'Exigences et intentions':'Requirements and intent'),`${lang}: visitor-friendly problem axis missing`);
  assert(matrixPage.includes(lang==='fr'?'Contrôler / vérifier':'Control / verify'),`${lang}: intervention axis missing`);
  assert(matrixPage.includes('pm-item-status'),`${lang}: product maturity not visible in matrix`);
  const matrixStart=matrixPage.indexOf('<table class="pm-table"');
  const matrixEnd=matrixPage.indexOf('</table>',matrixStart);
  assert(matrixStart>=0 && matrixEnd>matrixStart,`${lang}: matrix table boundaries missing`);
  const table=matrixPage.slice(matrixStart,matrixEnd);
  for(const id of ['reg-arch','technical','diagnostic','control-tower']){
    assert(!table.includes(`portfolio/${id}/`),`${lang}: foundation, service or demo incorrectly placed inside product grid: ${id}`);
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
  assert(homePage.includes(`href="${lang==='fr'?'/':'/en/'}contact/?sujet=diagnostic"`),`${lang}: diagnostic CTA must be directly actionable`);
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
