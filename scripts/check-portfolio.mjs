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
  const expectedLabel = lang === 'fr' ? 'Produits et services' : 'Products & services';
  const expectedMarkupLabel = lang === 'fr' ? expectedLabel : 'Products &amp; services';
  assert(nav.includes(`<strong>${expectedMarkupLabel}`), `${lang}: visible Products label missing`);
  const productPage = readFileSync(paths(lang,'products'),'utf8');
  assert(productPage.includes(`href="${productsPath}" aria-current="page"><strong>${expectedMarkupLabel}`), `${lang}: exact portfolio route is not marked current`);
  const productNavLinks = (nav.match(new RegExp('href="' + productsPath + '"','g')) || []).length;
  assert.equal(productNavLinks, 1, `${lang}: duplicate Products entry in header navigation`);
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
