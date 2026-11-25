// S3 is a design page. It must not render authority controls or a 5.7.7 release.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { closureLevels, delegates, pin, steps } from '../src/data/workbench-s3.ts';

assert.equal(pin.commit, '1881c90bb33a0cf1218df5381698c4e3c8dd4df2');
assert.equal(pin.tag, 'v5.7.6');
assert.deepEqual(steps.map((step) => step.id), [
  'unknown', 'reconciliation', 'assignment', 'evidence', 'authorised-decision', 'closure',
]);
for (const step of steps) {
  assert.ok(step.continuity.operationIdentity.includes('idempotency_key'), step.id + ' identity');
  assert.ok(step.continuity.registryState.length > 0, step.id + ' state');
  assert.ok(step.continuity.evidenceOnRecord.length > 0, step.id + ' evidence');
  if (!step.continuity.recordExists) assert.ok(step.gap, step.id + ' missing record must be a gap');
}
assert.equal(steps.find((step) => step.id === 'assignment').continuity.recordExists, false);
assert.deepEqual(closureLevels.map((level) => level.id), ['task', 'operational', 'external']);
assert.equal(closureLevels.find((level) => level.id === 'task').verified, false);
assert.match(closureLevels.find((level) => level.id === 'external').text.fr, /G-07/);
assert.match(closureLevels.find((level) => level.id === 'external').text.fr, /E1/);
assert.match(closureLevels.find((level) => level.id === 'external').text.en, /G-07 is not E1/);
const symbols = new Set(['DualKernelGovernor.reconcile_unknown', 'DualKernelGovernor.dispatch_and_execute', 'DualKernelGovernor.resolve_hold', 'HoldManager.authorize_exit']);
for (const row of delegates) {
  assert.ok(row.investigate.fr && row.investigate.en, 'investigate');
  assert.ok(row.decide.fr && row.decide.en, 'decide');
  assert.ok(symbols.has(row.runtimeExecutes.symbol), row.runtimeExecutes.symbol);
}

const files = ['src/data/workbench-s3.ts', 'src/components/WorkbenchContinuity.astro'];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  assert.ok(!text.includes('5.7.7'), file + ' names 5.7.7');
  assert.ok(!text.includes('<button'), file + ' renders a button');
  assert.ok(!/fetch\(|WebSocket|innerHTML/.test(text), file);
}

for (const file of ['dist/workbench/continuite/index.html', 'dist/en/workbench/continuity/index.html']) {
  const html = readFileSync(file, 'utf8');
  const start = html.indexOf('data-workbench-s3');
  const region = html.slice(start, html.indexOf('</main>', start));
  assert.ok(start >= 0, file);
  assert.ok(!/<button[\s>]/i.test(region), file + ' button in the design');
  assert.ok(!/type="submit"/i.test(region), file + ' submit');
  assert.ok(!region.includes('5.7.7'), file + ' 5.7.7');
  for (const name of ['reconcile_unknown', 'resolve_hold', 'authorize_exit', 'G-07', 'E1', 'idempotency_key', 'Not verified', 'Non vérifié']) {
    if (file.includes('/en/') && name === 'Non vérifié') continue;
    if (!file.includes('/en/') && name === 'Not verified') continue;
    assert.ok(html.includes(name), file + ' missing ' + name);
  }
}
console.log('PASS: Workbench S3 design, no authority control, no 5.7.7 release claim.');
