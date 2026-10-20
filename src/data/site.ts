export type Locale = "fr" | "en";

export interface NavItem {
  slug: string;
  href: string;
  label: string;
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
  },
} as const;

export const nav: Record<Locale, NavItem[]> = {
  fr: [
    { slug: "", href: "/", label: "Accueil" },
    { slug: "origine", href: "/origine/", label: "Origine" },
    { slug: "concepts", href: "/concepts/", label: "Concepts" },
    { slug: "architecture", href: "/architecture/", label: "Architecture" },
    { slug: "standard", href: "/standard/", label: "Standard" },
    { slug: "versions", href: "/versions/", label: "Versions" },
    { slug: "conformance", href: "/conformance/", label: "Conformance" },
    { slug: "depots", href: "/depots/", label: "Dépôts" },
    { slug: "statut", href: "/statut/", label: "Statut" },
    { slug: "contribuer", href: "/contribuer/", label: "Contribuer" },
    { slug: "contact", href: "/contact/", label: "Contact" },
  ],
  en: [
    { slug: "", href: "/en/", label: "Home" },
    { slug: "origin", href: "/en/origin/", label: "Origin" },
    { slug: "concepts", href: "/en/concepts/", label: "Concepts" },
    { slug: "architecture", href: "/en/architecture/", label: "Architecture" },
    { slug: "standard", href: "/en/standard/", label: "Standard" },
    { slug: "versions", href: "/en/versions/", label: "Versions" },
    { slug: "conformance", href: "/en/conformance/", label: "Conformance" },
    { slug: "repositories", href: "/en/repositories/", label: "Repositories" },
    { slug: "status", href: "/en/status/", label: "Status" },
    { slug: "contribute", href: "/en/contribute/", label: "Contribute" },
    { slug: "contact", href: "/en/contact/", label: "Contact" },
  ],
};

const frToEn: Record<string, string> = {
  "": "/en/",
  origine: "/en/origin/",
  concepts: "/en/concepts/",
  architecture: "/en/architecture/",
  standard: "/en/standard/",
  versions: "/en/versions/",
  conformance: "/en/conformance/",
  depots: "/en/repositories/",
  statut: "/en/status/",
  contribuer: "/en/contribute/",
  contact: "/en/contact/",
  "architecture/demo": "/en/architecture/demo/",
  "architecture/interactive": "/en/architecture/interactive/",
  "architecture/drawing": "/en/architecture/drawing/",
};

const enToFr: Record<string, string> = Object.fromEntries(
  Object.entries(frToEn).map(([fr, en]) => [en.replace(/^\/en\/?/, "").replace(/\/$/, ""), fr === "" ? "/" : `/${fr}/`]),
);

export function alternate(locale: Locale, slug: string): string {
  if (locale === "fr") return frToEn[slug] ?? "/en/";
  return enToFr[slug] ?? "/";
}

export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(normalized.split("?")[0].split("#")[0]);
  const slashed = isFile || normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${base}${slashed}`;
}
