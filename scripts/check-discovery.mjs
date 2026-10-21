import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const dir = process.argv.includes('--dist') ? 'dist' : 'public';
const json = JSON.parse(await readFile(`${dir}/discovery/projection-v0.1.json`, 'utf8'));
assert.equal(json.projection_version, 'discovery-presentation-v0.1.0');
assert.equal(json.sources.length, 5);
assert.match(json.catalog_sha256, /^[0-9a-f]{64}$/);
assert.equal(Object.keys(json.exploratory_reports).length, 31);
for (const [key, report] of Object.entries(json.exploratory_reports)) {
  assert.equal(report.mode, 'exploratory', key);
  assert.equal(report.behavior, null, key);
  assert(report.findings.length > 0 && report.findings.length <= 5, key);
  assert(report.findings.every(x => x.assessment === 'open_question'), key);
  const selected = new Set(report.selected_sources.map(s => s.source_id));
  assert.deepEqual(key.split('+'), [...selected].sort(), key);
  assert(report.findings.every(f =>
    f.source_refs.length && f.source_refs.every(ref => selected.has(ref.source_id))
  ), key);
  assert.equal(report.limitations.not_guarantee_demonstration, true);
  assert.equal(report.limitations.not_legal_advice, true);
}
assert.equal(json.fictional_demo.report.mode, 'contextualized');
assert(json.fictional_demo.report.findings.some(f => f.assessment === 'structural_conflict'));
for (const lang of ['','en/']) {
  const html = await readFile(`dist/${lang}discovery/index.html`, 'utf8');
  assert(html.includes('REG Discovery'), lang);
  assert(html.includes('data-reg-discovery'), lang);
  assert(html.includes('data-reg-generate'), lang);
}
console.log('REG Discovery smoke: 5 sources, 31 exploratory reports, bounded PayFlow demo, FR/EN route OK.');
