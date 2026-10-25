import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const page = (locale,id) => readFileSync((locale==='fr'?'dist/portfolio/':'dist/en/portfolio/')+id+'/index.html','utf8');

for (const locale of ['fr','en']) {
  const productHub=page(locale,'products');
  for (const [key,label] of [
    ['explorer','REG Explorer v0.2'],
    ['mediation','REG Mediation'],
    ['conformance','REG Conformance v0.6.1'],
    ['discovery','REG Discovery'],
    ['gov','TENIR-Gov v5.7.0']
  ]) {
    assert(productHub.includes(label),`${locale}: product not in directory: ${label}`);
    assert(productHub.includes(`portfolio/${key}/`),`${locale}: missing product detail route: ${key}`);
  }
  const rel=page(locale,'conformance');
  assert(rel.includes('https://github.com/skiredj-prog/reg-conformance/releases/tag/v0.6.1'),`${locale}: released conformance link missing`);
  assert(rel.includes('46/46'),`${locale}: profile tests missing`);
  assert(/C3/.test(rel),`${locale}: C3 limitation missing`);
  assert(/loopback/.test(rel),`${locale}: Raft qualification boundary missing`);
  const exploration=page(locale,'explorer');
  assert(exploration.includes('READY WITH CONDITIONS'),`${locale}: Explorer release gate missing`);
  assert(!exploration.includes('href="/embeds/reg-explorer-v0.2.html"'),`${locale}: invented Explorer URL`);
  const mediation=page(locale,'mediation');
  assert(/PREVENT/.test(mediation)&&/PREPARE/.test(mediation),`${locale}: Mediation proposal roles missing`);
  assert(!mediation.includes('href="/embeds/reg-mediation.html"'),`${locale}: invented Mediation URL`);
  assert(/Discovery/.test(page(locale,'discovery')),`${locale}: Discovery missing`);
  assert(/X-Ray v0.2/.test(page(locale,'xray')),`${locale}: X-Ray version absent`);
  const demoHub=page(locale,'demos');
  assert(demoHub.includes('/embeds/demonstration-bancaire.html'),`${locale}: banking simulation unreferenced`);
  assert(demoHub.includes('Point of No Return'),`${locale}: Point of No Return status missing`);
  assert(demoHub.includes('Agent That Wouldn'),`${locale}: pending demo missing`);
  assert(demoHub.includes('/embeds/reg-autonomy-control-tower-v1.0.html')||demoHub.includes('portfolio/control-tower/'),`${locale}: Control Tower route missing`);
  assert(page(locale,'gov').includes('releases/tag/v5.7.0'),`${locale}: runtime release link absent`);
}
for (const file of ['dist/embeds/demonstration-bancaire.html','dist/embeds/reg-autonomy-control-tower-v1.0.html']) {
  assert(existsSync(file),`Missing public demo file: ${file}`);
}
console.log('PASS: FR/EN 14-item product references, scoped releases, explicit verified public routes and no invented prototype deployments.');
