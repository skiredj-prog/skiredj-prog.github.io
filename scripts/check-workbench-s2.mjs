// Documentary matrix must stay tied to the pinned 5.7.6 tree.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { events, gaps, holdEvent, pin, readingsOf } from '../src/data/workbench-s2.ts';

const holdReadings = readingsOf(holdEvent);
assert.equal(holdReadings.length, 3);
for (const reading of holdReadings) {
  assert.equal(reading.eventId, holdEvent.id);
  assert.equal(reading.decision, holdEvent.decision);
  assert.equal(reading.provenance, holdEvent.provenance);
  assert.equal(reading.unavailableFields, holdEvent.unavailableFields);
  assert.equal(reading.demonstratedLimit, holdEvent.demonstratedLimit);
  assert.equal(reading.integrity, holdEvent.integrity);
  assert.equal(reading.externalEffect, holdEvent.externalEffect);
}
const observation = events.find((event) => event.id === holdEvent.id);
assert.ok(observation, 'HOLD event missing from the matrix');
assert.equal(observation.missingFields, holdEvent.unavailableFields);
assert.equal(observation.presentation, holdEvent.wording);
assert.equal(observation.integrity, holdEvent.integrity);
assert.equal(observation.eventTruth, holdEvent.externalEffect);

assert.equal(pin.commit, '1881c90bb33a0cf1218df5381698c4e3c8dd4df2');
assert.equal(pin.tag, 'v5.7.6');
assert.equal(events.length, 4);
for (const event of events) {
  assert.notEqual(event.reading, 'demonstrated-guarantee', event.id);
  assert.ok(event.missingFields.length > 0, event.id + ' missing fields');
  assert.ok(event.presentation.operational.en.length > 20, event.id);
  assert.ok(event.integrity.en.length > 20 && event.eventTruth.en.length > 20, event.id);
}
assert.match(holdEvent.wording.operational.en, /If a corroborated operation state/);
assert.match(holdEvent.wording.operational.fr, /Si un état d’opération corroboré/);
assert.match(holdEvent.integrity.en, /does not recompute the content hash/);
assert.match(holdEvent.integrity.fr, /ne recalcule pas l’empreinte du contenu/);
assert.match(holdEvent.integrity.en, /not the same property/);
assert.equal(observation.eventType, 'observation');
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
  const eventIds = [...html.matchAll(/data-event-id="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(eventIds, [holdEvent.id, holdEvent.id, holdEvent.id], locale + ' HOLD readings diverge');
  assert.equal((html.match(/data-hold-reading="/g) || []).length, 3, locale + ' reading count');
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, locale + ' h1');
  for (const bit of bits) assert.ok(html.includes(bit), locale + ' missing ' + bit);
  assert.ok(!html.includes('data-audience'), locale + ' audience selector');
  assert.ok(!/5\.7\.7[^<]{0,40}(release|published|publiée)/i.test(html), locale + ' 5.7.7 presented as released');
}
console.log('PASS: Workbench S2 matrix, pinned v5.7.6, no gateway, no second chain.');
