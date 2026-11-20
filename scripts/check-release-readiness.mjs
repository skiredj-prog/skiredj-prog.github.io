// S4 — Deterministic build-output preflight. Does not prove live availability.
// Known UX/social defects are WARN until PR #96 is reviewed and integrated.
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';

const routes = [
  ['/', 'fr'], ['/en/', 'en'],
  ['/contact/', 'fr'], ['/en/contact/', 'en'],
  ['/offre/', 'fr'], ['/en/offer/', 'en'],
  ['/statut/', 'fr'], ['/en/status/', 'en'],
  ['/preuves/', 'fr'], ['/en/evidence/', 'en'],
];
const errors = [];
const warnings = [];
const has = (html,reg) => reg.test(html);
for (const [route, lang] of routes) {
  const output = path.join('dist',route.replace(/^\//,''),'index.html');
  if (!existsSync(output)) { errors.push(route+': rendered page not found'); continue; }
  const html = readFileSync(output,'utf8');
  if (!has(html,new RegExp('<html\\s[^>]*lang="'+lang+'"','i'))) errors.push(route+': missing HTML lang '+lang);
  if (!has(html,/<title>[^<]+<\/title>/i)) errors.push(route+': missing title');
  if (!has(html,/<meta\s+name="description"\s+content="[^"]+"/i)) errors.push(route+': missing meta description');
  if (!has(html,/<link\s+rel="canonical"\s+href="https:\/\/tenirlabs\.cc\//i)) errors.push(route+': missing absolute canonical');
  if (!has(html,/<link\s+rel="alternate"\s+hreflang="(?:fr|en)"/i)) errors.push(route+': missing alternate hreflang');
  if (html.includes(['skiredj','tenirlabs.cc'].join('@'))) errors.push(route+': retired email rendered');
  if (/\/contact\/$/.test(route) && (!html.includes('skiredj@gmail.com')||!html.includes('mailto:skiredj@gmail.com'))) errors.push(route+': replacement email missing from contact');
  const h1=(html.match(/<h1(?:\s[^>]*)?>/gi)||[]).length;
  if (h1!==1) warnings.push(route+': expected exactly one h1, got '+h1+' (review UX/PR #96)');
  if (!has(html,/<meta\s+property="og:image"\s+content=/i)) warnings.push(route+': missing og:image (tracked by PR #96)');
}
const sitemap='dist/sitemap.xml';
if(!existsSync(sitemap)) errors.push('missing generated sitemap.xml');
else {
  const xml=readFileSync(sitemap,'utf8');
  for(const [route] of routes){const abs='https://tenirlabs.cc'+route;
    if(!xml.includes(abs)) errors.push('sitemap missing '+abs);
  }
}
const cname='dist/CNAME';
if(!existsSync(cname) || readFileSync(cname,'utf8').trim()!=='tenirlabs.cc') errors.push('incorrect CNAME in build');
for(const v of warnings) console.warn('WARN '+v);
for(const v of errors) console.error('FAIL '+v);
if(errors.length) process.exitCode=1;
else console.log('PASS: '+routes.length+' critical FR/EN routes, canonical metadata, contact email, sitemap and CNAME; '+warnings.length+' non-blocking UX/share warnings.');
