import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const entries=['diagnostic','prevent','prepare','discovery','xray','translation','gov','reg-arch','technical','experiences','control-tower'];
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
console.log('Portfolio: 28 FR/EN routes, 22 nine-field profiles, standalone 4-scenario interactive artifact, no autoplay.');
