// Guards for the public read-only TENIR Workbench (S1). Synthetic page, no kernel.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { illustrativeStress, marginPoints, postureId, viewModel, approachSeries, DEFAULT_READING } from '../src/data/workbench-s1.ts';

const margin = marginPoints(DEFAULT_READING);
assert.equal(margin, 20, 'default capacity margin');
assert.equal(postureId(margin), 'reduced');
const viewFr = viewModel('fr', DEFAULT_READING, 'hold', null, approachSeries(DEFAULT_READING));
const viewEn = viewModel('en', DEFAULT_READING, 'hold', null, approachSeries(DEFAULT_READING));
assert.equal(viewFr.posture, 'Marge réduite');
assert.equal(viewEn.posture, 'Reduced margin');
assert.match(viewFr.sentence, /reste dans l’enveloppe illustrative/);
assert.match(viewEn.sentence, /remains within the illustrative envelope/);
assert.ok(illustrativeStress(DEFAULT_READING) > 0 && illustrativeStress(DEFAULT_READING) < 1);

const sources = [
  'src/components/SystemWorkbench.astro',
  'src/data/workbench-s1.ts',
  'src/pages/workbench/index.astro',
  'src/pages/en/workbench/index.astro',
];
for (const file of sources) {
  const text = readFileSync(file, 'utf8');
  for (const banned of ['fetch(', 'WebSocket', 'innerHTML', 'localhost:8000', '/api/v1', 'ws://', 'eval(']) {
    assert(!text.includes(banned), `${file} contains ${banned}`);
  }
}

for (const [locale, file] of [
  ['fr', 'dist/workbench/index.html'],
  ['en', 'dist/en/workbench/index.html'],
]) {
  const html = readFileSync(file, 'utf8');
  assert(html.includes('data-workbench-s1'), locale + ': workbench root missing');
  assert(html.includes(locale === 'fr' ? 'Marge réduite' : 'Reduced margin'), locale + ': default posture missing');
  assert(html.includes('NOT_CERTIFIABLE') && html.includes('INCOMPLETE'), locale + ': harness status missing');
  assert(html.includes('FM-20'), locale + ': FM-20 limit missing');
  assert(html.includes(locale === 'fr' ? 'mono-hôte' : 'single-host'), locale + ': host scope missing');
  assert(html.includes(locale === 'fr' ? 'Illustratif / synthétique' : 'Illustrative / synthetic'), locale + ': synthetic label missing');
  assert(html.includes('This is an interactive communication concept, not the TENIR scoring kernel, a measured physical system, or an actual policy adjudication.'), locale + ': disclaimer missing');
  assert(!html.includes('fetch(') && !html.includes('WebSocket') && !html.includes('innerHTML'), locale + ': unsafe browser API in HTML');
  assert(!html.includes('localhost:8000') && !html.includes('/api/v1'), locale + ': kernel endpoint leaked');
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, locale + ': expected one h1');
}

const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
assert(sitemap.includes('https://tenirlabs.cc/workbench/'));
assert(sitemap.includes('https://tenirlabs.cc/en/workbench/'));
console.log('PASS: TENIR Workbench S1 default margin, disclaimers, harness limits, and no kernel calls.');
