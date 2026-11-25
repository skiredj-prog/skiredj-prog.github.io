// Documentary matrix must stay tied to the pinned 5.7.6 tree.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { events, gaps, pin } from '../src/data/workbench-s2.ts';

assert.equal(pin.commit, '1881c90bb33a0cf1218df5381698c4e3c8dd4df2');
assert.equal(pin.tag, 'v5.7.6');
assert.equal(events.length, 4);
for (const event of events) {
  assert.notEqual(event.reading, 'demonstrated-guarantee', event.id);
  assert.ok(event.missingFields.length > 0, event.id + ' missing fields');
  assert.ok(event.presentation.operational.en.length > 20, event.id);
  assert.ok(event.integrity.en.length > 20 && event.eventTruth.en.length > 20, event.id);
}
assert.equal(events.find((event) => event.id === 'observation').presentation.operational.en,
  'Operation suspended, no dispatch authorised at this stage.');
assert.ok(gaps.length >= 4);
const joined = JSON.stringify({ events, gaps });
assert.ok(!joined.includes('5.7.7'), '5.7.7 must not be named as a version here');
assert.ok(!/workbench gateway/i.test(joined), 'no Workbench Gateway');

for (const file of ['src/data/workbench-s2.ts', 'src/components/WorkbenchMatrix.astro']) {
  const text = readFileSync(file, 'utf8');
  for (const banned of ['fetch(', 'WebSocket', 'innerHTML', 'localhost:8000']) {
    assert.ok(!text.includes(banned), file + ' ' + banned);
  }
}

for (const [locale, file, bits] of [
  ['fr', 'dist/workbench/technique/index.html', ['observation', 'control_transition', 'previous_hash', 'NOT_CERTIFIABLE', 'Non vérifié', 'voie B', 'n’est pas une version déclarée']],
  ['en', 'dist/en/workbench/technical/index.html', ['observation', 'control_transition', 'previous_hash', 'NOT_CERTIFIABLE', 'Unverified', 'Lane B', 'not a declared version']],
]) {
  const html = readFileSync(file, 'utf8');
  assert.ok(html.includes('data-workbench-s2'), locale);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, locale + ' h1');
  for (const bit of bits) assert.ok(html.includes(bit), locale + ' missing ' + bit);
  assert.ok(!html.includes('data-audience'), locale + ' audience selector');
  assert.ok(!/5\.7\.7[^<]{0,40}(release|published|publiée)/i.test(html), locale + ' 5.7.7 presented as released');
}
console.log('PASS: Workbench S2 matrix, pinned v5.7.6, no gateway, no second chain.');
