export type Locale = "fr" | "en";

export interface NavItem {
  slug: string;
  href: string;
  label: string;
}

export interface NavGroup {
  id: string;
  label: string;
  links: NavItem[];
}

export const copy = {
  fr: {
    skip: "Aller au contenu",
    nav: "Sections",
    lang: "Langue",
    toc: "Sur cette page",
    themeToDark: "Thème sombre",
    themeToLight: "Thème clair",
    status:
      "Rendu public simplifié, lecture du 19 octobre 2026. KB3 : ligne de rendu doctrinale instituée et active. Elle rend le sens ; elle n’est pas le code, ni une constitution. KB2 : ligne antérieure. Ce site ne certifie aucune implémentation.",
    footerNote:
      "Abdelaziz Skiredj · TENIR Labs. KB3 est institué comme ligne de rendu, hors du code. Il rend le sens ; il n’est pas une nouvelle constitution.",
    sources: "Sources",
    external: "hors de ce site",
    eyebrow: "TENIR",
    headline: "L’agent a agi. La confirmation est perdue. TENIR tient.",
    homeLead: "UNKNOWN : l’envoi a eu lieu, son résultat n’est pas confirmé.",
    membrane: "L’agent propose. La membrane décide.",
    cadrer: "Cadrer mon diagnostic",
    cadrerHref:
      "mailto:skiredj@tenirlabs.cc?subject=Cadrage%20%E2%80%94%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent&body=Bonjour%2C%0A%0AJe%20souhaite%20cadrer%20un%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent.%0A%0A1.%20Quelle%20action%20pr%C3%A9cise%20l%E2%80%99agent%20peut-il%20d%C3%A9clencher%2C%20dans%20quel%20syst%C3%A8me%2C%20et%20quelle%20cons%C3%A9quence%20faut-il%20pr%C3%A9server%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A2.%20Quel%20incident%2C%20doute%20ou%20changement%20motive%20la%20demande%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A3.%20Quelle%20d%C3%A9cision%20faut-il%20prendre%2C%20et%20%C3%A0%20quelle%20%C3%A9ch%C3%A9ance%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A4.%20Quelles%20r%C3%A8gles%2C%20personnes%20et%20traces%20sont%20accessibles%20pour%20l%E2%80%99examen%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A5.%20Qui%20porte%20la%20d%C3%A9cision%20et%20le%20budget%20du%20diagnostic%2C%20et%20qui%20participera%20%C3%A0%20la%20restitution%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0AMerci.",
    explore: "Simuler l’incident",
    understand: "Comprendre TENIR",
  },
  en: {
    skip: "Skip to content",
    nav: "Sections",
    lang: "Language",
    toc: "On this page",
    themeToDark: "Dark theme",
    themeToLight: "Light theme",
    status:
      "Simplified public rendering, read on 19 October 2026. KB3: enacted, active doctrinal rendering line. It renders meaning; it is not the code, and not a constitution. KB2: prior rendering line. This site certifies no implementation.",
    footerNote:
      "Abdelaziz Skiredj · TENIR Labs. KB3 is enacted as the rendering line, outside the code. It renders meaning; it is not a new constitution.",
    sources: "Sources",
    external: "leaves this site",
    eyebrow: "TENIR",
    headline: "The agent acted. The confirmation is lost. TENIR holds.",
    homeLead: "UNKNOWN: the dispatch took place, its result is not confirmed.",
    membrane: "The agent proposes. The membrane decides.",
    cadrer: "Scope my diagnostic",
    cadrerHref:
      "mailto:skiredj@tenirlabs.cc?subject=Scoping%20%E2%80%94%20diagnostic%20of%20an%20agent%E2%80%99s%20controls&body=Hello%2C%0A%0AI%20would%20like%20to%20scope%20a%20diagnostic%20of%20an%20agent%E2%80%99s%20controls.%0A%0A1.%20Which%20precise%20action%20can%20the%20agent%20trigger%2C%20in%20which%20system%2C%20and%20which%20consequence%20must%20be%20preserved%3F%0ATo%20be%20specified%0A%0A2.%20Which%20incident%2C%20doubt%2C%20or%20change%20motivates%20the%20request%3F%0ATo%20be%20specified%0A%0A3.%20Which%20decision%20has%20to%20be%20made%2C%20and%20by%20when%3F%0ATo%20be%20specified%0A%0A4.%20Which%20rules%2C%20people%2C%20and%20traces%20are%20available%20for%20the%20examination%3F%0ATo%20be%20specified%0A%0A5.%20Who%20carries%20the%20decision%20and%20the%20budget%20for%20the%20diagnostic%2C%20and%20who%20will%20take%20part%20in%20the%20restitution%3F%0ATo%20be%20specified%0A%0AThank%20you.",
    explore: "Simulate the incident",
    understand: "Understand TENIR",
  },
} as const;

export const navGroups: Record<Locale, NavGroup[]> = {
  fr: [
    {
      id: "decouvrir",
      label: "Découvrir",
      links: [
        { slug: "origine", href: "/origine/", label: "Origine" },
        { slug: "concepts", href: "/concepts/", label: "Concepts" },
      ],
    },
    {
      id: "applications",
      label: "Applications",
      links: [
        { slug: "applications", href: "/applications/", label: "Contexte et valeur" },
        { slug: "applications#scenarios", href: "/applications/#scénarios", label: "Scénarios" },
        { slug: "offre", href: "/offre/", label: "Offre" },
        { slug: "offre/exemple", href: "/offre/exemple/", label: "Exemple simulé" },
        { slug: "souverainete", href: "/souverainete/", label: "Souveraineté" },
      ],
    },
    {
      id: "mecanique",
      label: "Mécanique",
      links: [
        { slug: "architecture/demo", href: "/architecture/demo/", label: "Démonstration" },
        { slug: "architecture/interactive", href: "/architecture/interactive/", label: "Parcours interactif" },
        { slug: "architecture/drawing", href: "/architecture/drawing/", label: "Dessin illustratif" },
      ],
    },
    {
      id: "technologie",
      label: "Technologie",
      links: [
        { slug: "architecture", href: "/architecture/", label: "Architecture" },
        { slug: "standard", href: "/standard/", label: "Standard" },
        { slug: "versions", href: "/versions/", label: "Versions" },
        { slug: "depots", href: "/depots/", label: "Dépôts" },
      ],
    },
    {
      id: "preuves",
      label: "Preuves",
      links: [
        { slug: "conformance", href: "/conformance/", label: "Conformance" },
        { slug: "statut", href: "/statut/", label: "Statut" },
        { slug: "publications", href: "/publications/", label: "Publications" },
        { slug: "publications/reg-v0.1", href: "/publications/reg-v0.1/", label: "REG v0.1 · document de travail" },
      ],
    },
  ],
  en: [
    {
      id: "discover",
      label: "Discover",
      links: [
        { slug: "origin", href: "/en/origin/", label: "Origin" },
        { slug: "concepts", href: "/en/concepts/", label: "Concepts" },
      ],
    },
    {
      id: "applications",
      label: "Applications",
      links: [
        { slug: "applications", href: "/en/applications/", label: "Context and value" },
        { slug: "applications#scenarios", href: "/en/applications/#scenarios", label: "Scenarios" },
        { slug: "offer", href: "/en/offer/", label: "Offer" },
        { slug: "offer/example", href: "/en/offer/example/", label: "Simulated example" },
        { slug: "sovereignty", href: "/en/sovereignty/", label: "Sovereignty" },
      ],
    },
    {
      id: "mechanics",
      label: "Mechanics",
      links: [
        { slug: "architecture/demo", href: "/en/architecture/demo/", label: "Demonstration" },
        { slug: "architecture/interactive", href: "/en/architecture/interactive/", label: "Interactive walkthrough" },
        { slug: "architecture/drawing", href: "/en/architecture/drawing/", label: "Illustrative drawing" },
      ],
    },
    {
      id: "technology",
      label: "Technology",
      links: [
        { slug: "architecture", href: "/en/architecture/", label: "Architecture" },
        { slug: "standard", href: "/en/standard/", label: "Standard" },
        { slug: "versions", href: "/en/versions/", label: "Versions" },
        { slug: "repositories", href: "/en/repositories/", label: "Repositories" },
      ],
    },
    {
      id: "evidence",
      label: "Evidence",
      links: [
        { slug: "conformance", href: "/en/conformance/", label: "Conformance" },
        { slug: "status", href: "/en/status/", label: "Status" },
        { slug: "publications", href: "/en/publications/", label: "Publications" },
        { slug: "publications/reg-v0.1", href: "/en/publications/reg-v0.1/", label: "REG v0.1 · working draft" },
      ],
    },
  ],
};

export const navProducts: Record<Locale, NavItem> = {
  fr: { slug: "produits-et-services", href: "/produits-et-services/", label: "Produits et services" },
  en: { slug: "products-and-services", href: "/en/products-and-services/", label: "Products & services" },
};

export const navContact: Record<Locale, NavItem> = {
  fr: { slug: "contact", href: "/contact/", label: "Contact" },
  en: { slug: "contact", href: "/en/contact/", label: "Contact" },
};

const frToEn: Record<string, string> = {
  'parcours/activite': '/en/start/business/',
  'parcours/decouvrir': '/en/start/discover/',
  'parcours/deleguer': '/en/start/delegate/',
  'parcours/concevoir': '/en/start/build/',
  'parcours/examiner': '/en/start/investigate/',
  'parcours/etudier': '/en/start/research/',
  "": "/en/",
  origine: "/en/origin/",
  concepts: "/en/concepts/",
  architecture: "/en/architecture/",
  standard: "/en/standard/",
  versions: "/en/versions/",
  conformance: "/en/conformance/",
  depots: "/en/repositories/",
  statut: "/en/status/",
  publications: "/en/publications/",
  contribuer: "/en/contribute/",
  contact: "/en/contact/",
  applications: "/en/applications/",
  offre: "/en/offer/",
  "diagnostic-execution": "/en/diagnostic-execution/",
  "offre/exemple": "/en/offer/example/",
  souverainete: "/en/sovereignty/",
  "produits-et-services": "/en/products-and-services/",
  "publications/reg-v0.1": "/en/publications/reg-v0.1/",
  "architecture/demo": "/en/architecture/demo/",
  "architecture/interactive": "/en/architecture/interactive/",
  "architecture/drawing": "/en/architecture/drawing/",
};

const enToFr: Record<string, string> = Object.fromEntries(
  Object.entries(frToEn).map(([fr, en]) => [en.replace(/^\/en\/?/, "").replace(/\/$/, ""), fr === "" ? "/" : `/${fr}/`]),
);

export function alternate(locale: Locale, slug: string): string {
  // Draft P1 portfolio paths use deliberately identical bilingual slugs.
  if (slug.startsWith('portfolio/')) return locale === 'fr' ? `/en/${slug}/` : `/${slug}/`;
  if (locale === "fr") return frToEn[slug] ?? "/en/";
  return enToFr[slug] ?? "/";
}

export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const hashAt = normalized.indexOf("#");
  const queryAt = normalized.indexOf("?");
  const cuts = [hashAt, queryAt].filter((index) => index >= 0);
  const cut = cuts.length ? Math.min(...cuts) : normalized.length;
  const pathOnly = normalized.slice(0, cut);
  const suffix = normalized.slice(cut);
  const isFile = /\.[a-z0-9]+$/i.test(pathOnly);
  const slashed = isFile || pathOnly.endsWith("/") ? pathOnly : `${pathOnly}/`;
  return `${base}${slashed}${suffix}`;
}
