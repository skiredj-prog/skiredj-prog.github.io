import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const cases = [
  { home: 'dist/index.html', catalog: 'dist/produits-et-services/index.html', href: '/produits-et-services/', nav: 'Produits', cta: 'Voir les produits et services' },
  { home: 'dist/en/index.html', catalog: 'dist/en/products-and-services/index.html', href: '/en/products-and-services/', nav: 'Products', cta: 'See products and services' },
];
for (const { home, catalog, href, nav, cta } of cases) {
  const html = readFileSync(home, 'utf8');
  assert(html.includes(`href="${href}"`), `Missing catalogue link in ${home}`);
  assert(html.includes(`>${nav}</a>`), `Missing visible navigation label in ${home}`);
  assert(html.includes(cta), `Missing homepage catalogue entry in ${home}`);
  const page = readFileSync(catalog, 'utf8');
  assert(page.includes('<h1'), `Missing catalogue page heading in ${catalog}`);
}
console.log('Product visibility: FR/EN navigation, homepage link and catalogue pages verified.');
