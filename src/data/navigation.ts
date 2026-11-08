// Site navigation: one header, one tree, one closing step per page.
// Tree approved on 8 November 2026: Produits · Démos · Crédibilité · Approche,
// with the free report as the permanent header call to action.
import type { Locale, NavItem } from "./site";

export type Section = "produits" | "demos" | "credibilite" | "approche";

export interface PrimaryItem extends NavItem {
  section: Section;
}

/** Header entries. `slug` is the landing page of the section. */
export const primaryNav: Record<Locale, PrimaryItem[]> = {
  fr: [
    { section: "produits", slug: "portfolio/products", href: "/portfolio/products/", label: "Produits" },
    { section: "demos", slug: "portfolio/demos", href: "/portfolio/demos/", label: "Démos" },
    { section: "credibilite", slug: "credibilite", href: "/credibilite/", label: "Crédibilité" },
    { section: "approche", slug: "produits-et-services", href: "/produits-et-services/", label: "Approche" },
  ],
  en: [
    { section: "produits", slug: "portfolio/products", href: "/en/portfolio/products/", label: "Products" },
    { section: "demos", slug: "portfolio/demos", href: "/en/portfolio/demos/", label: "Demos" },
    { section: "credibilite", slug: "credibility", href: "/en/credibility/", label: "Credibility" },
    { section: "approche", slug: "products-and-services", href: "/en/products-and-services/", label: "Approach" },
  ],
};

/** The free report (maturity preview): permanent header call to action. */
export const reportLink: Record<Locale, NavItem> = {
  fr: { slug: "parcours-ia", href: "/parcours-ia/", label: "Rapport gratuit" },
  en: { slug: "ai-readiness", href: "/en/ai-readiness/", label: "Free report" },
};

// Portfolio pages that are demonstrations rather than products, services or foundations.
const portfolioDemos = new Set(["demos", "experiences", "control-tower", "reg-demo", "workbench"]);

// Pages outside portfolio/, architecture/ and the journeys, by section (FR and EN slugs).
const sectionBySlug: Record<string, Section> = {
  // Produits: offers and services.
  offre: "produits", offer: "produits",
  "diagnostic-execution": "produits",
  // Démos: bounded, fictional scenarios.
  "offre/exemple": "demos", "offer/example": "demos",
  "demonstrations/journal": "demos", "demos/log": "demos",
  rejouer: "demos", replay: "demos",
  // Crédibilité: versions, tests, limits, sources.
  credibilite: "credibilite", credibility: "credibilite",
  statut: "credibilite", status: "credibilite",
  versions: "credibilite",
  conformance: "credibilite",
  standard: "credibilite",
  architecture: "credibilite",
  publications: "credibilite", "publications/reg-v0.1": "credibilite",
  depots: "credibilite", repositories: "credibilite",
  // Approche: how a case is examined, and the reasoning behind it.
  "produits-et-services": "approche", "products-and-services": "approche",
  "processus-et-roles": "approche",
  "pourquoi-maintenant": "approche", "why-now": "approche",
  concepts: "approche",
  origine: "approche", origin: "approche",
  applications: "approche",
  souverainete: "approche", sovereignty: "approche",
  acteurs: "approche", actors: "approche",
  cas: "approche", cases: "approche",
  apprendre: "approche", learn: "approche",
  contribuer: "approche", contribute: "approche",
};

/** Section a page belongs to, or null (home, contact, free report, 404). */
export function sectionOf(slug: string): Section | null {
  if (slug.startsWith("portfolio/")) return portfolioDemos.has(slug.slice("portfolio/".length)) ? "demos" : "produits";
  if (slug.startsWith("architecture/")) return "demos";
  if (slug.startsWith("parcours/") || slug.startsWith("start/")) return "approche";
  return sectionBySlug[slug] ?? null;
}

export function sectionItem(locale: Locale, section: Section | null): PrimaryItem | undefined {
  return section ? primaryNav[locale].find((item) => item.section === section) : undefined;
}

export interface Band {
  kicker: string;
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string; external?: boolean; resolved?: boolean };
}

/**
 * Closing step for doc-template pages.
 * `contactHref` keeps the page context (journey, portfolio topic) already passed to the contact page.
 */
export function bandFor(locale: Locale, slug: string, contactHref: string): Band {
  const fr = locale === "fr";
  const report = { label: fr ? "Faire le point en 10 questions" : "Take stock in 10 questions", href: reportLink[locale].href };
  // contactHref is already resolved against the base path by the caller.
  const ask = { label: fr ? "Poser une question" : "Ask a question", href: contactHref, external: true, resolved: true };
  const kicker = fr ? "Prochaine étape" : "Next step";
  if (slug === "contact") {
    return {
      kicker,
      title: fr ? "Pas encore prêt à écrire ?" : "Not ready to write yet?",
      text: fr
        ? "Regardez d’abord un exemple de fiche remise, ou faites le point en dix questions, sans compte."
        : "See an example of a delivered sheet first, or take stock in ten questions, with no account.",
      primary: { label: fr ? "Voir un exemple" : "See an example", href: fr ? "/offre/exemple/" : "/en/offer/example/" },
      secondary: { ...report },
    };
  }
  switch (sectionOf(slug)) {
    case "produits":
      return {
        kicker,
        title: fr ? "Pas sûr de ce qui convient à votre situation ?" : "Not sure what fits your situation?",
        text: fr
          ? "Dix questions, environ cinq minutes, sans compte : un premier aperçu et une suite possible. Ce n’est pas une certification."
          : "Ten questions, about five minutes, no account: a first preview and a possible next step. It is not a certification.",
        primary: report,
        secondary: ask,
      };
    case "demos":
      return {
        kicker,
        title: fr ? "Une démonstration montre un mécanisme, pas votre situation." : "A demo shows a mechanism, not your situation.",
        text: fr
          ? "Les scénarios sont fictifs et bornés, sans action sur un système réel. Pour votre cas, commencez par dix questions."
          : "The scenarios are fictional and bounded, with no action on a real system. For your own case, start with ten questions.",
        primary: report,
        secondary: ask,
      };
    case "credibilite": {
      const onStatus = slug === "statut" || slug === "status";
      return {
        kicker,
        title: fr ? "Ce qui est démontré, et ce qui ne l’est pas." : "What is demonstrated, and what is not.",
        text: fr
          ? "Versions, tests et limites, avec leurs sources. Le statut détaillé dit aussi ce qui n’est pas revendiqué."
          : "Versions, tests and limits, with their sources. The detailed status also states what is not claimed.",
        primary: onStatus ? report : { label: fr ? "Lire le statut et les limites" : "Read the status and limits", href: fr ? "/statut/" : "/en/status/" },
        secondary: ask,
      };
    }
    default:
      return {
        kicker,
        title: fr ? "Commencez par un cas précis." : "Start with one precise case.",
        text: fr ? "Une situation, une fiche sourcée, une suite à décider." : "One situation, a sourced sheet, a next step to decide.",
        primary: report,
        secondary: ask,
      };
  }
}

export interface FooterGroup {
  id: string;
  label: string;
  links: NavItem[];
}

/** Footer: the full tree, so nothing removed from the header becomes unreachable. */
export const footerGroups: Record<Locale, FooterGroup[]> = {
  fr: [
    {
      id: "produits", label: "Produits", links: [
        { slug: "portfolio/products", href: "/portfolio/products/", label: "Tous les produits" },
        { slug: "portfolio/services", href: "/portfolio/services/", label: "Services" },
        { slug: "diagnostic-execution", href: "/diagnostic-execution/", label: "Diagnostic d’exécution" },
        { slug: "offre", href: "/offre/", label: "Un accompagnement" },
        { slug: "portfolio/gov", href: "/portfolio/gov/", label: "TENIR-Gov" },
      ],
    },
    {
      id: "demos", label: "Démos", links: [
        { slug: "portfolio/demos", href: "/portfolio/demos/", label: "Toutes les démonstrations" },
        { slug: "prototype", href: "https://mobile.tenirlabs.cc/discover", label: "Prototype mobile" },
        { slug: "architecture/demo", href: "/architecture/demo/", label: "Démonstration" },
        { slug: "architecture/interactive", href: "/architecture/interactive/", label: "Parcours interactif" },
        { slug: "architecture/drawing", href: "/architecture/drawing/", label: "Dessin illustratif" },
        { slug: "demonstrations/journal", href: "/demonstrations/journal/", label: "Ce que le journal ne voit pas" },
        { slug: "rejouer", href: "/rejouer/", label: "Rejouer une action" },
        { slug: "offre/exemple", href: "/offre/exemple/", label: "Un exemple sourcé" },
      ],
    },
    {
      id: "credibilite", label: "Crédibilité", links: [
        { slug: "credibilite", href: "/credibilite/", label: "Parcours Crédibilité" },
        { slug: "statut", href: "/statut/", label: "Statut et limites" },
        { slug: "versions", href: "/versions/", label: "Versions" },
        { slug: "conformance", href: "/conformance/", label: "Conformance" },
        { slug: "standard", href: "/standard/", label: "Standard" },
        { slug: "architecture", href: "/architecture/", label: "Architecture" },
        { slug: "publications", href: "/publications/", label: "Publications" },
        { slug: "publications/reg-v0.1", href: "/publications/reg-v0.1/", label: "REG v0.1 · document de travail" },
        { slug: "depots", href: "/depots/", label: "Dépôts" },
      ],
    },
    {
      id: "approche", label: "Approche", links: [
        { slug: "produits-et-services", href: "/produits-et-services/", label: "Approche & Méthode" },
        { slug: "processus-et-roles", href: "/processus-et-roles/", label: "Processus & rôles" },
        { slug: "pourquoi-maintenant", href: "/pourquoi-maintenant/", label: "Pourquoi maintenant" },
        { slug: "parcours/decouvrir", href: "/parcours/decouvrir/", label: "Comprendre TENIR" },
        { slug: "parcours/activite", href: "/parcours/activite/", label: "En pratique" },
        { slug: "cas", href: "/cas/", label: "Les cas" },
        { slug: "concepts", href: "/concepts/", label: "Concepts" },
        { slug: "origine", href: "/origine/", label: "Origine" },
        { slug: "applications", href: "/applications/", label: "Contexte et valeur" },
        { slug: "souverainete", href: "/souverainete/", label: "Souveraineté" },
      ],
    },
    {
      id: "echanger", label: "Échanger", links: [
        { slug: "parcours-ia", href: "/parcours-ia/", label: "Rapport gratuit" },
        { slug: "contact", href: "/contact/", label: "Contact" },
        { slug: "contribuer", href: "/contribuer/", label: "Contribuer" },
      ],
    },
  ],
  en: [
    {
      id: "produits", label: "Products", links: [
        { slug: "portfolio/products", href: "/en/portfolio/products/", label: "All products" },
        { slug: "portfolio/services", href: "/en/portfolio/services/", label: "Services" },
        { slug: "diagnostic-execution", href: "/en/diagnostic-execution/", label: "Execution diagnostic" },
        { slug: "offer", href: "/en/offer/", label: "Accompanied work" },
        { slug: "portfolio/gov", href: "/en/portfolio/gov/", label: "TENIR-Gov" },
      ],
    },
    {
      id: "demos", label: "Demos", links: [
        { slug: "portfolio/demos", href: "/en/portfolio/demos/", label: "All demos" },
        { slug: "prototype", href: "https://mobile.tenirlabs.cc/discover", label: "Mobile prototype" },
        { slug: "architecture/demo", href: "/en/architecture/demo/", label: "Demonstration" },
        { slug: "architecture/interactive", href: "/en/architecture/interactive/", label: "Interactive walkthrough" },
        { slug: "architecture/drawing", href: "/en/architecture/drawing/", label: "Illustrative drawing" },
        { slug: "demos/log", href: "/en/demos/log/", label: "What the log cannot see" },
        { slug: "replay", href: "/en/replay/", label: "Replay an action" },
        { slug: "offer/example", href: "/en/offer/example/", label: "A sourced example" },
      ],
    },
    {
      id: "credibilite", label: "Credibility", links: [
        { slug: "credibility", href: "/en/credibility/", label: "Credibility Journey" },
        { slug: "status", href: "/en/status/", label: "Status and limits" },
        { slug: "versions", href: "/en/versions/", label: "Versions" },
        { slug: "conformance", href: "/en/conformance/", label: "Conformance" },
        { slug: "standard", href: "/en/standard/", label: "Standard" },
        { slug: "architecture", href: "/en/architecture/", label: "Architecture" },
        { slug: "publications", href: "/en/publications/", label: "Publications" },
        { slug: "publications/reg-v0.1", href: "/en/publications/reg-v0.1/", label: "REG v0.1 · working draft" },
        { slug: "repositories", href: "/en/repositories/", label: "Repositories" },
      ],
    },
    {
      id: "approche", label: "Approach", links: [
        { slug: "products-and-services", href: "/en/products-and-services/", label: "Approach & Method" },
        { slug: "processus-et-roles", href: "/en/processus-et-roles/", label: "Process & Roles" },
        { slug: "why-now", href: "/en/why-now/", label: "Why now" },
        { slug: "start/discover", href: "/en/start/discover/", label: "Understand TENIR" },
        { slug: "start/business", href: "/en/start/business/", label: "In practice" },
        { slug: "cases", href: "/en/cases/", label: "The cases" },
        { slug: "concepts", href: "/en/concepts/", label: "Concepts" },
        { slug: "origin", href: "/en/origin/", label: "Origin" },
        { slug: "applications", href: "/en/applications/", label: "Context and value" },
        { slug: "sovereignty", href: "/en/sovereignty/", label: "Sovereignty" },
      ],
    },
    {
      id: "echanger", label: "Talk", links: [
        { slug: "ai-readiness", href: "/en/ai-readiness/", label: "Free report" },
        { slug: "contact", href: "/en/contact/", label: "Contact" },
        { slug: "contribute", href: "/en/contribute/", label: "Contribute" },
      ],
    },
  ],
};
