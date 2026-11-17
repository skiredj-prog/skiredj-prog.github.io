// Site navigation: one header, one tree, one closing step per page.
// Four sections, each opening a menu: Comprendre · Produits · Démos · Crédibilité,
// with the free report as the permanent header call to action.
// 16 November 2026: the learning journey gets its own section ("Comprendre") next to the
// commercial one (Produits) and the transparency, architecture and research one (Crédibilité).
// "Approche & Méthode" keeps its page and now sits under Produits, with how we work.
import type { Locale, NavItem } from "./site";

export type Section = "comprendre" | "produits" | "demos" | "credibilite";

/** One destination in a section menu. `hint` says what the visitor finds there. */
export interface MenuLink extends NavItem {
  hint: string;
  external?: boolean;
}

export interface MenuGroup {
  label: string;
  links: MenuLink[];
}

export interface PrimaryItem extends NavItem {
  section: Section;
  /** The visitor question this section answers, shown at the top of its menu. */
  question: string;
  /** Label of the link to the section's landing page (`href`), shown under the question. */
  overview: string;
  groups: MenuGroup[];
}

/** Header entries. `slug` and `href` are the landing page of the section. */
export const primaryNav: Record<Locale, PrimaryItem[]> = {
  fr: [
    {
      section: "comprendre", slug: "pourquoi-maintenant", href: "/pourquoi-maintenant/", label: "Comprendre",
      question: "De quoi parle-t-on, et pourquoi cela me concerne\u00a0?",
      overview: "Commencer ici\u00a0: pourquoi maintenant",
      groups: [
        {
          label: "Sans prérequis", links: [
            { slug: "apprendre", href: "/apprendre/", label: "Apprendre à reconnaître", hint: "Cinq distinctions entre promesse et preuve." },
            { slug: "cas", href: "/cas/", label: "Les cas", hint: "Des cas documentés et des scénarios pédagogiques." },
            { slug: "acteurs", href: "/acteurs/", label: "Les acteurs", hint: "Qui contrôle quoi, et qui peut le prouver." },
            { slug: "magazine", href: "/magazine/", label: "Magazine", hint: "Les grands choix, expliqués : Maroc 2030, l’IA au travail." },
          ],
        },
        {
          label: "Le cadre TENIR", links: [
            { slug: "parcours/decouvrir", href: "/parcours/decouvrir/", label: "Comprendre TENIR", hint: "Qu’est-ce qui permet de tenir sous pression\u00a0?" },
            { slug: "tau-tenir", href: "/tau-tenir/", label: "Introduction TAU / TENIR", hint: "Une introduction accessible au cadre." },
            { slug: "concepts", href: "/concepts/", label: "Concepts", hint: "Les définitions de référence." },
            { slug: "origine", href: "/origine/", label: "Origine", hint: "Le récit d’origine de TAU et TENIR." },
          ],
        },
      ],
    },
    {
      section: "produits", slug: "portfolio/products", href: "/portfolio/products/", label: "Produits",
      question: "Qu’est-ce qui existe, et qu’est-ce qui convient à ma situation\u00a0?",
      overview: "Tous les produits",
      groups: [
        {
          label: "Disponible aujourd’hui", links: [
            { slug: "offre", href: "/offre/", label: "Leap Readiness · l’offre", hint: "Une semaine, 5 000 EUR : votre palier démontré et le plan." },
            { slug: "portfolio/gov", href: "/portfolio/gov/", label: "TENIR-Gov", hint: "Avant qu’un agent agisse, examiner ce qui l’y autorise." },
            { slug: "portfolio/conformance", href: "/portfolio/conformance/", label: "REG Conformance", hint: "Des tests reproductibles sur un profil borné." },
          ],
        },
        {
          label: "En pilote", links: [
            { slug: "portfolio/prevent", href: "/portfolio/prevent/", label: "REG Prevent", hint: "Une exigence à appliquer. Quelles conditions vérifier\u00a0?" },
            { slug: "portfolio/prepare", href: "/portfolio/prepare/", label: "REG Prepare", hint: "Que pouvons-nous réellement démontrer\u00a0?" },
          ],
        },
        {
          label: "Comment nous travaillons", links: [
            { slug: "produits-et-services", href: "/produits-et-services/", label: "Approche & Méthode", hint: "De la découverte au pilote." },
            { slug: "processus-et-roles", href: "/processus-et-roles/", label: "Processus & rôles", hint: "Où TENIR intervient, et pour qui." },
            { slug: "parcours/activite", href: "/parcours/activite/", label: "En pratique", hint: "Trois situations, un exemple à explorer." },
          ],
        },
      ],
    },
    {
      section: "demos", slug: "portfolio/demos", href: "/portfolio/demos/", label: "Démos",
      question: "À quoi cela ressemble-t-il, concrètement\u00a0?",
      overview: "Toutes les démonstrations",
      groups: [
        {
          label: "À manipuler", links: [
            { slug: "portfolio/control-tower", href: "/portfolio/control-tower/", label: "Control Tower", hint: "Un agent propose une action. Que se passe-t-il ensuite\u00a0?" },
            { slug: "demonstrations/journal", href: "/demonstrations/journal/", label: "Ce que le journal ne voit pas", hint: "Deux lignes cohérentes, une demande manquante." },
            { slug: "architecture/interactive", href: "/architecture/interactive/", label: "Parcours interactif", hint: "L’architecture, pièce par pièce." },
            { slug: "prototype", href: "https://mobile.tenirlabs.cc/discover", label: "Prototype mobile", hint: "Une simulation distincte, sur téléphone.", external: true },
          ],
        },
        {
          label: "À suivre et à lire", links: [
            { slug: "rejouer", href: "/rejouer/", label: "Rejouer une action", hint: "Un virement autorisé, une confirmation perdue." },
            { slug: "architecture/demo", href: "/architecture/demo/", label: "Démo du plan de contrôle", hint: "Six scènes illustratives." },
            { slug: "offre/exemple", href: "/offre/exemple/", label: "Un exemple sourcé", hint: "La fiche d’un diagnostic simulé." },
          ],
        },
      ],
    },
    {
      section: "credibilite", slug: "credibilite", href: "/credibilite/", label: "Crédibilité",
      question: "Qu’est-ce qui est réellement démontré\u00a0?",
      overview: "Parcours Crédibilité",
      groups: [
        {
          label: "Transparence", links: [
            { slug: "statut", href: "/statut/", label: "Statut et limites", hint: "Ce qui est revendiqué, et ce qui ne l’est pas." },
            { slug: "affirmations", href: "/affirmations/", label: "Registre d’affirmations", hint: "Chaque affirmation, sa base, sa limite." },
            { slug: "preuves", href: "/preuves/", label: "Socle de preuves", hint: "Ce que chaque source établit, dans son périmètre." },
            { slug: "versions", href: "/versions/", label: "Versions", hint: "Ce que chaque version désigne." },
          ],
        },
        {
          label: "Architecture", links: [
            { slug: "architecture", href: "/architecture/", label: "Architecture", hint: "Théorie, standard, runtime et preuve." },
            { slug: "standard", href: "/standard/", label: "Standard", hint: "Le standard REG et ses RFC." },
            { slug: "conformance", href: "/conformance/", label: "Conformance", hint: "Lancer les suites, lire ce qu’elles établissent." },
            { slug: "depots", href: "/depots/", label: "Dépôts", hint: "Le code public, dépôt par dépôt." },
          ],
        },
        {
          label: "Recherche", links: [
            { slug: "publications", href: "/publications/", label: "Publications", hint: "Working papers et paquet publié." },
            { slug: "publications/reg-v0.1", href: "/publications/reg-v0.1/", label: "REG v0.1 · document de travail", hint: "La spécification de cadrage." },
            { slug: "preuves/hold", href: "/preuves/hold/", label: "Expérience HOLD", hint: "Une expérience, pas une promesse." },
            { slug: "preuves/cadres", href: "/preuves/cadres/", label: "Comparer les cadres", hint: "Leurs objets, leurs questions, leurs limites." },
          ],
        },
      ],
    },
  ],
  en: [
    {
      section: "comprendre", slug: "why-now", href: "/en/why-now/", label: "Understand",
      question: "What is this about, and why would it concern me?",
      overview: "Start here: why now",
      groups: [
        {
          label: "No background needed", links: [
            { slug: "learn", href: "/en/learn/", label: "Learn to recognize", hint: "Five distinctions between promise and evidence." },
            { slug: "cases", href: "/en/cases/", label: "The cases", hint: "Documented cases and teaching scenarios." },
            { slug: "actors", href: "/en/actors/", label: "The players", hint: "Who controls what, and who can prove it." },
            { slug: "magazine", href: "/magazine/n02/en/", label: "Magazine", hint: "Big choices, explained: Morocco 2030, AI at work." },
          ],
        },
        {
          label: "The TENIR framework", links: [
            { slug: "start/discover", href: "/en/start/discover/", label: "Understand TENIR", hint: "What makes it possible to hold under pressure?" },
            { slug: "tau-tenir", href: "/en/tau-tenir/", label: "TAU / TENIR introduction", hint: "An accessible introduction to the framework." },
            { slug: "concepts", href: "/en/concepts/", label: "Concepts", hint: "The reference definitions." },
            { slug: "origin", href: "/en/origin/", label: "Origin", hint: "The origin story of TAU and TENIR." },
          ],
        },
      ],
    },
    {
      section: "produits", slug: "portfolio/products", href: "/en/portfolio/products/", label: "Products",
      question: "What exists, and what fits my situation?",
      overview: "All products",
      groups: [
        {
          label: "Available today", links: [
            { slug: "offer", href: "/en/offer/", label: "Leap Readiness · the offer", hint: "One week, EUR 5,000: your demonstrated tier and the plan." },
            { slug: "portfolio/gov", href: "/en/portfolio/gov/", label: "TENIR-Gov", hint: "Before an agent acts, examine what authorizes it." },
            { slug: "portfolio/conformance", href: "/en/portfolio/conformance/", label: "REG Conformance", hint: "Reproducible tests on a bounded profile." },
          ],
        },
        {
          label: "In pilot", links: [
            { slug: "portfolio/prevent", href: "/en/portfolio/prevent/", label: "REG Prevent", hint: "A requirement to apply. What needs to be checked?" },
            { slug: "portfolio/prepare", href: "/en/portfolio/prepare/", label: "REG Prepare", hint: "What can we actually demonstrate?" },
          ],
        },
        {
          label: "How we work", links: [
            { slug: "products-and-services", href: "/en/products-and-services/", label: "Approach & Method", hint: "From discovery to pilot." },
            { slug: "processus-et-roles", href: "/en/processus-et-roles/", label: "Process & Roles", hint: "Where TENIR fits, and for whom." },
            { slug: "start/business", href: "/en/start/business/", label: "In practice", hint: "Three situations, one example to explore." },
          ],
        },
      ],
    },
    {
      section: "demos", slug: "portfolio/demos", href: "/en/portfolio/demos/", label: "Demos",
      question: "What does it look like in practice?",
      overview: "All demos",
      groups: [
        {
          label: "Hands-on", links: [
            { slug: "portfolio/control-tower", href: "/en/portfolio/control-tower/", label: "Control Tower", hint: "An agent proposes an action. What happens next?" },
            { slug: "demos/log", href: "/en/demos/log/", label: "What the log cannot see", hint: "Two consistent lines, one missing request." },
            { slug: "architecture/interactive", href: "/en/architecture/interactive/", label: "Interactive walkthrough", hint: "The architecture, piece by piece." },
            { slug: "prototype", href: "https://mobile.tenirlabs.cc/discover", label: "Mobile prototype", hint: "A separate simulation, on your phone.", external: true },
          ],
        },
        {
          label: "To watch and read", links: [
            { slug: "replay", href: "/en/replay/", label: "Replay an action", hint: "An authorized transfer, a lost confirmation." },
            { slug: "architecture/demo", href: "/en/architecture/demo/", label: "Control-plane demo", hint: "Six illustrative scenes." },
            { slug: "offer/example", href: "/en/offer/example/", label: "A sourced example", hint: "The sheet from a simulated diagnostic." },
          ],
        },
      ],
    },
    {
      section: "credibilite", slug: "credibility", href: "/en/credibility/", label: "Credibility",
      question: "What is actually demonstrated?",
      overview: "Credibility Journey",
      groups: [
        {
          label: "Transparency", links: [
            { slug: "status", href: "/en/status/", label: "Status and limits", hint: "What is claimed, and what is not." },
            { slug: "claims", href: "/en/claims/", label: "Claims register", hint: "Each claim, its basis, its limit." },
            { slug: "evidence", href: "/en/evidence/", label: "Evidence base", hint: "What each source establishes, within its scope." },
            { slug: "versions", href: "/en/versions/", label: "Versions", hint: "What each version designates." },
          ],
        },
        {
          label: "Architecture", links: [
            { slug: "architecture", href: "/en/architecture/", label: "Architecture", hint: "Theory, standard, runtime and evidence." },
            { slug: "standard", href: "/en/standard/", label: "Standard", hint: "The REG standard and its RFCs." },
            { slug: "conformance", href: "/en/conformance/", label: "Conformance", hint: "Run the suites, read what they establish." },
            { slug: "repositories", href: "/en/repositories/", label: "Repositories", hint: "The public code, repository by repository." },
          ],
        },
        {
          label: "Research", links: [
            { slug: "publications", href: "/en/publications/", label: "Publications", hint: "Working papers and the published package." },
            { slug: "publications/reg-v0.1", href: "/en/publications/reg-v0.1/", label: "REG v0.1 · working draft", hint: "The framing specification." },
            { slug: "evidence/hold", href: "/en/evidence/hold/", label: "HOLD experiment", hint: "An experiment, not a promise." },
            { slug: "evidence/frameworks", href: "/en/evidence/frameworks/", label: "Compare frameworks", hint: "Their objects, their questions, their limits." },
          ],
        },
      ],
    },
  ],
};

/** The free personalized AI report: permanent header call to action. */
export const reportLink: Record<Locale, NavItem> = {
  fr: { slug: "parcours-ia", href: "/parcours-ia/", label: "Auto-évaluation IA · 5 min" },
  en: { slug: "ai-readiness", href: "/en/ai-readiness/", label: "AI self-assessment · 5 min" },
};

// Portfolio pages that are demonstrations rather than products, services or foundations.
const portfolioDemos = new Set(["demos", "experiences", "control-tower", "reg-demo", "workbench"]);

// Pages outside portfolio/, architecture/ and the journeys, by section (FR and EN slugs).
const sectionBySlug: Record<string, Section> = {
  // Comprendre: the problem in plain words, then the framework.
  "pourquoi-maintenant": "comprendre", "why-now": "comprendre",
  apprendre: "comprendre", learn: "comprendre",
  cas: "comprendre", cases: "comprendre",
  "cas/operation-ambigue": "comprendre", "cases/ambiguous-operation": "comprendre",
  acteurs: "comprendre", actors: "comprendre",
  "tau-tenir": "comprendre",
  concepts: "comprendre",
  origine: "comprendre", origin: "comprendre",
  applications: "comprendre",
  souverainete: "comprendre", sovereignty: "comprendre",
  // Produits: offers, services and how an engagement runs.
  offre: "produits", offer: "produits",
  "produits-et-services": "produits", "products-and-services": "produits",
  "processus-et-roles": "produits",
  "parcours/activite": "produits", "start/business": "produits",
  // Démos: bounded, fictional scenarios.
  "offre/exemple": "demos", "offer/example": "demos",
  "demonstrations/journal": "demos", "demos/log": "demos",
  rejouer: "demos", replay: "demos",
  // Crédibilité: transparency, architecture and research.
  credibilite: "credibilite", credibility: "credibilite",
  statut: "credibilite", status: "credibilite",
  affirmations: "credibilite", claims: "credibilite",
  versions: "credibilite",
  conformance: "credibilite",
  standard: "credibilite",
  architecture: "credibilite",
  publications: "credibilite", "publications/reg-v0.1": "credibilite",
  preuves: "credibilite", "preuves/hold": "credibilite", "preuves/cadres": "credibilite",
  evidence: "credibilite", "evidence/hold": "credibilite", "evidence/frameworks": "credibilite",
  depots: "credibilite", repositories: "credibilite",
};

/** Section a page belongs to, or null (home, contact, free report, 404). */
export function sectionOf(slug: string): Section | null {
  if (sectionBySlug[slug]) return sectionBySlug[slug];
  if (slug.startsWith("portfolio/")) return portfolioDemos.has(slug.slice("portfolio/".length)) ? "demos" : "produits";
  if (slug.startsWith("architecture/")) return "demos";
  if (slug.startsWith("parcours/") || slug.startsWith("start/")) return "comprendre";
  return null;
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
  // #start opens question 1 directly rather than the page that describes the check.
  const report = { label: fr ? "Commencer mon rapport gratuit" : "Start my free report", href: `${reportLink[locale].href}?start=1` };
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
      id: "comprendre", label: "Comprendre", links: [
        { slug: "pourquoi-maintenant", href: "/pourquoi-maintenant/", label: "Pourquoi maintenant" },
        { slug: "apprendre", href: "/apprendre/", label: "Apprendre à reconnaître" },
        { slug: "cas", href: "/cas/", label: "Les cas" },
        { slug: "cas/operation-ambigue", href: "/cas/operation-ambigue/", label: "Opération ambiguë" },
        { slug: "acteurs", href: "/acteurs/", label: "Les acteurs" },
        { slug: "magazine", href: "/magazine/", label: "Magazine" },
        { slug: "parcours/decouvrir", href: "/parcours/decouvrir/", label: "Comprendre TENIR" },
        { slug: "tau-tenir", href: "/tau-tenir/", label: "Introduction TAU / TENIR" },
        { slug: "concepts", href: "/concepts/", label: "Concepts" },
        { slug: "origine", href: "/origine/", label: "Origine" },
        { slug: "applications", href: "/applications/", label: "Contexte et valeur" },
        { slug: "souverainete", href: "/souverainete/", label: "Souveraineté" },
      ],
    },
    {
      id: "produits", label: "Produits", links: [
        { slug: "portfolio/products", href: "/portfolio/products/", label: "Tous les produits" },
        { slug: "offre", href: "/offre/", label: "Leap Readiness · l’offre" },
        { slug: "portfolio/gov", href: "/portfolio/gov/", label: "TENIR-Gov" },
        { slug: "portfolio/conformance", href: "/portfolio/conformance/", label: "REG Conformance" },
        { slug: "portfolio/prevent", href: "/portfolio/prevent/", label: "REG Prevent" },
        { slug: "portfolio/prepare", href: "/portfolio/prepare/", label: "REG Prepare" },
        { slug: "produits-et-services", href: "/produits-et-services/", label: "Approche & Méthode" },
        { slug: "processus-et-roles", href: "/processus-et-roles/", label: "Processus & rôles" },
        { slug: "parcours/activite", href: "/parcours/activite/", label: "En pratique" },
      ],
    },
    {
      id: "demos", label: "Démos", links: [
        { slug: "portfolio/demos", href: "/portfolio/demos/", label: "Toutes les démonstrations" },
        { slug: "portfolio/control-tower", href: "/portfolio/control-tower/", label: "Control Tower" },
        { slug: "prototype", href: "https://mobile.tenirlabs.cc/discover", label: "Prototype mobile" },
        { slug: "architecture/demo", href: "/architecture/demo/", label: "Démo du plan de contrôle" },
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
        { slug: "affirmations", href: "/affirmations/", label: "Registre d’affirmations" },
        { slug: "versions", href: "/versions/", label: "Versions" },
        { slug: "conformance", href: "/conformance/", label: "Conformance" },
        { slug: "preuves", href: "/preuves/", label: "Socle de preuves" },
        { slug: "preuves/hold", href: "/preuves/hold/", label: "Expérience HOLD" },
        { slug: "preuves/cadres", href: "/preuves/cadres/", label: "Comparer les cadres" },
        { slug: "standard", href: "/standard/", label: "Standard" },
        { slug: "architecture", href: "/architecture/", label: "Architecture" },
        { slug: "publications", href: "/publications/", label: "Publications" },
        { slug: "publications/reg-v0.1", href: "/publications/reg-v0.1/", label: "REG v0.1 · document de travail" },
        { slug: "depots", href: "/depots/", label: "Dépôts" },
      ],
    },
    {
      id: "echanger", label: "Échanger", links: [
        { slug: "parcours-ia", href: "/parcours-ia/", label: "Rapport IA personnalisé gratuit" },
        { slug: "contact", href: "/contact/", label: "Contact" },
        { slug: "contribuer", href: "/contribuer/", label: "Contribuer" },
      ],
    },
  ],
  en: [
    {
      id: "comprendre", label: "Understand", links: [
        { slug: "why-now", href: "/en/why-now/", label: "Why now" },
        { slug: "learn", href: "/en/learn/", label: "Learn to recognize" },
        { slug: "cases", href: "/en/cases/", label: "The cases" },
        { slug: "cases/ambiguous-operation", href: "/en/cases/ambiguous-operation/", label: "Ambiguous operation" },
        { slug: "actors", href: "/en/actors/", label: "The players" },
        { slug: "magazine", href: "/magazine/n02/en/", label: "Magazine" },
        { slug: "start/discover", href: "/en/start/discover/", label: "Understand TENIR" },
        { slug: "tau-tenir", href: "/en/tau-tenir/", label: "TAU / TENIR introduction" },
        { slug: "concepts", href: "/en/concepts/", label: "Concepts" },
        { slug: "origin", href: "/en/origin/", label: "Origin" },
        { slug: "applications", href: "/en/applications/", label: "Context and value" },
        { slug: "sovereignty", href: "/en/sovereignty/", label: "Sovereignty" },
      ],
    },
    {
      id: "produits", label: "Products", links: [
        { slug: "portfolio/products", href: "/en/portfolio/products/", label: "All products" },
        { slug: "offer", href: "/en/offer/", label: "Leap Readiness · the offer" },
        { slug: "portfolio/gov", href: "/en/portfolio/gov/", label: "TENIR-Gov" },
        { slug: "portfolio/conformance", href: "/en/portfolio/conformance/", label: "REG Conformance" },
        { slug: "portfolio/prevent", href: "/en/portfolio/prevent/", label: "REG Prevent" },
        { slug: "portfolio/prepare", href: "/en/portfolio/prepare/", label: "REG Prepare" },
        { slug: "products-and-services", href: "/en/products-and-services/", label: "Approach & Method" },
        { slug: "processus-et-roles", href: "/en/processus-et-roles/", label: "Process & Roles" },
        { slug: "start/business", href: "/en/start/business/", label: "In practice" },
      ],
    },
    {
      id: "demos", label: "Demos", links: [
        { slug: "portfolio/demos", href: "/en/portfolio/demos/", label: "All demos" },
        { slug: "portfolio/control-tower", href: "/en/portfolio/control-tower/", label: "Control Tower" },
        { slug: "prototype", href: "https://mobile.tenirlabs.cc/discover", label: "Mobile prototype" },
        { slug: "architecture/demo", href: "/en/architecture/demo/", label: "Control-plane demo" },
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
        { slug: "claims", href: "/en/claims/", label: "Claims register" },
        { slug: "versions", href: "/en/versions/", label: "Versions" },
        { slug: "conformance", href: "/en/conformance/", label: "Conformance" },
        { slug: "evidence", href: "/en/evidence/", label: "Evidence base" },
        { slug: "evidence/hold", href: "/en/evidence/hold/", label: "HOLD experiment" },
        { slug: "evidence/frameworks", href: "/en/evidence/frameworks/", label: "Compare frameworks" },
        { slug: "standard", href: "/en/standard/", label: "Standard" },
        { slug: "architecture", href: "/en/architecture/", label: "Architecture" },
        { slug: "publications", href: "/en/publications/", label: "Publications" },
        { slug: "publications/reg-v0.1", href: "/en/publications/reg-v0.1/", label: "REG v0.1 · working draft" },
        { slug: "repositories", href: "/en/repositories/", label: "Repositories" },
      ],
    },
    {
      id: "echanger", label: "Talk", links: [
        { slug: "ai-readiness", href: "/en/ai-readiness/", label: "Free personalized AI report" },
        { slug: "contact", href: "/en/contact/", label: "Contact" },
        { slug: "contribute", href: "/en/contribute/", label: "Contribute" },
      ],
    },
  ],
};
