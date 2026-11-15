import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const source = readFileSync(resolve(root, 'src/data/processRoles.ts'), 'utf8');
const fr = readFileSync(resolve(root, 'dist/processus-et-roles/index.html'), 'utf8');
const en = readFileSync(resolve(root, 'dist/en/processus-et-roles/index.html'), 'utf8');

const stages = [...new Set([...source.matchAll(/id:'(stage-\d+)'/g)].map((m) => m[1]))];
const roles = [...new Set([...source.matchAll(/id:'(role-\d+)'/g)].map((m) => m[1]))];
const instruments = [...source.matchAll(/\{id:'([^']+)',name:'([^']+)'\}/g)].map((m) => ({ id: m[1], name: m[2] }));
const expectedStages = ['stage-1','stage-2','stage-3','stage-4','stage-5','stage-6'];
const expectedRoles = ['role-1','role-2','role-3','role-4','role-5','role-6'];
const portfolioSource = readFileSync(resolve(root, 'src/data/portfolio.ts'), 'utf8');
const missing = [...new Set(instruments.map((item) => item.id))].filter((id) => !new RegExp(`^  ['"]?${id}['"]?:`, 'm').test(portfolioSource));
const failures = [];
if (JSON.stringify(stages) !== JSON.stringify(expectedStages)) failures.push(`stages=${stages.join(',')}`);
if (JSON.stringify(roles) !== JSON.stringify(expectedRoles)) failures.push(`roles=${roles.join(',')}`);
if (missing.length) failures.push(`missing portfolio ids=${missing.join(',')}`);
for (const [name, html] of [['FR', fr], ['EN', en]]) {
  for (const id of [...expectedStages, ...expectedRoles]) if (!html.includes(`id="${id}"`)) failures.push(`${name} missing #${id}`);
  if (!html.includes(name === 'FR' ? 'Voir les méthodes et leur statut' : 'See the related methods and their current status')) failures.push(`${name} missing fixed product sentence`);
}
// Products hub -> Process & Roles: every "when to use it" link must land on an existing stage anchor.
for (const [name, hub, page] of [['FR','dist/portfolio/products/index.html',fr],['EN','dist/en/portfolio/products/index.html',en]]) {
  const html = readFileSync(resolve(root, hub), 'utf8');
  const links = [...html.matchAll(/class="pf-when">[\s\S]*?<\/p>/g)].flatMap((m) => [...m[0].matchAll(/processus-et-roles\/#(stage-\d+)/g)].map((x) => x[1]));
  // One expected link per (product, stage) pair cited in processRoles.ts, at most two per product on the hub.
  const expected = 13; // diagnostic 2, gov 1, conformance 1, prevent 2, prepare 2, discovery 1, xray 1, translation 1, explorer 1, mediation 1
  if (links.length !== expected) failures.push(`${name} products hub has ${links.length} stage links; expected ${expected}`);
  for (const id of links) if (!page.includes(`id="${id}"`)) failures.push(`${name} products hub links to missing #${id}`);
}
if (failures.length) {
  console.error(`FAIL Process & Roles integrity: ${failures.join('; ')}`);
  process.exit(1);
}
console.log(`PASS Process & Roles integrity: ${stages.length} stages, ${roles.length} roles, ${new Set(instruments.map((item) => item.id)).size} instrument links, FR/EN anchors present.`);
