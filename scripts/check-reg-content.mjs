import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const cases = [
  {
    locale: 'fr', home: 'dist/index.html',
    products: 'dist/produits-et-services/index.html',
    spec: 'dist/publications/reg-v0.1/index.html',
    example: 'dist/offre/exemple/index.html',
    productPath: '/produits-et-services/',
    specPath: '/publications/reg-v0.1/',
    examplePath: '/offre/exemple/',
    hero: 'Explorer les cas',
    demoPath:'/portfolio/demos/',
    draft: 'Working Draft',
    fictional: 'Exemple simulé',
  },
  {
    locale: 'en', home: 'dist/en/index.html',
    products: 'dist/en/products-and-services/index.html',
    spec: 'dist/en/publications/reg-v0.1/index.html',
    example: 'dist/en/offer/example/index.html',
    productPath: '/en/products-and-services/',
    specPath: '/en/publications/reg-v0.1/',
    examplePath: '/en/offer/example/',
    hero: 'Explore the cases',
    demoPath:'/en/portfolio/demos/',
    draft: 'Working Draft',
    fictional: 'Simulated example',
  },
];

for (const c of cases) {
  const home = readFileSync(c.home, 'utf8');
  const products = readFileSync(c.products, 'utf8');
  const spec = readFileSync(c.spec, 'utf8');
  const example = readFileSync(c.example, 'utf8');

  assert(home.includes(c.hero), `${c.locale}: reader-first case invitation missing`);
  assert(home.includes('href="'+c.demoPath+'"'), `${c.locale}: technical demo catalogue no longer reachable at second level`);
  assert(home.includes(c.productPath), `${c.locale}: homepage catalogue link missing`);
  assert(products.includes(c.specPath), `${c.locale}: spec link missing`);
  assert(products.includes(c.examplePath), `${c.locale}: example link missing`);
  assert(spec.includes(c.draft), `${c.locale}: draft qualification missing`);
  assert(example.includes(c.fictional), `${c.locale}: fictional simulation label missing`);
  assert(!products.includes('href="/fr/'), `${c.locale}: invalid /fr path`);
  assert(!home.includes('href="/fr/'), `${c.locale}: invalid /fr path`);
  assert(!products.includes('Discovery live'), `${c.locale}: unqualified Discovery launch claim`);
}
console.log('REG bilingual site: product journeys, drafts, examples and paths verified.');
