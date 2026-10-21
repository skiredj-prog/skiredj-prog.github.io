import type { Locale } from './site';

export const businessHref = (locale: Locale) => locale === 'fr' ? '/parcours/activite/' : '/en/start/business/';
export const businessProfiles = ['services', 'produit', 'operations'] as const;
export type BusinessProfile = typeof businessProfiles[number];
interface Persona {
  id: BusinessProfile;
  profile: string;
  industry: string;
  need: string;
  situation: string;
  question: string;
  first: { label: string; href: string; note: string };
  next: { label: string; href: string };
  context: 'deleguer' | 'concevoir' | 'examiner';
}
export const personas: Record<Locale, Persona[]> = {
  fr: [
    {
      id: 'services', profile: 'Je dirige une activité de services', industry: 'Services sur rendez-vous',
      need: '« Moins d’allers-retours, sans perdre la main sur mon agenda. »',
      situation: 'Vous envisagez de confier les propositions de créneaux à un agent. Vos rendez-vous confirmés, les personnes à contacter et le nombre de messages doivent rester sous votre contrôle.',
      question: 'Quelle tâche vous ferait gagner du temps, et quelles limites voudriez-vous garder ?',
      first: { label: 'Essayer la tâche de rendez-vous', href: 'https://mobile.tenirlabs.cc/discover', note: 'Prototype avec données d’exemple · aucun vrai message envoyé.' },
      next: { label: 'Comprendre ce que l’on peut déléguer', href: '/parcours/deleguer/' }, context: 'deleguer',
    },
    {
      id: 'produit', profile: 'Je prépare un agent avec mon équipe', industry: 'Produit logiciel · exemple : services financiers',
      need: '« Avant le lancement, je veux savoir ce qui autorise ou arrête une action. »',
      situation: 'Vous êtes responsable produit, CTO ou architecte. Votre équipe envisage un agent pouvant demander un paiement : il faut expliciter le plafond, les autorisations et la preuve attendue du résultat.',
      question: 'Sur quelle action voulez-vous vous accorder avant de la laisser partir ?',
      first: { label: 'Explorer une autorisation dans la démo', href: '/architecture/demo/#scene-1', note: 'Scénario technique simulé · artefact en anglais.' },
      next: { label: 'Voir les exigences du standard REG', href: '/standard/' }, context: 'concevoir',
    },
    {
      id: 'operations', profile: 'Je suis responsable des opérations', industry: 'Commerce en ligne · achats',
      need: '« La confirmation manque. Je dois décider si l’on peut recommencer. »',
      situation: 'Un agent a transmis une commande, mais vous ne retrouvez pas sa confirmation. Vous cherchez à éviter un doublon et à distinguer ce que les traces prouvent de ce qui reste inconnu.',
      question: 'Qu’est-ce qui permettrait de confirmer le résultat avant une nouvelle tentative ?',
      first: { label: 'Lire une fiche de diagnostic sourcée', href: '/offre/exemple/', note: 'Exemple simulé sur une opération budgétaire, avec ses fichiers sources.' },
      next: { label: 'Explorer le résultat inconnu dans la démo', href: '/architecture/demo/#scene-5' }, context: 'examiner',
    },
  ],
  en: [
    {
      id: 'services', profile: 'I run a service business', industry: 'Appointment-based services',
      need: '“Less back-and-forth, while keeping control of my calendar.”',
      situation: 'You are considering delegating appointment proposals to an agent. Confirmed bookings, who gets contacted and how many messages are sent must stay within your limits.',
      question: 'Which task would save you time, and which limits would you want to keep?',
      first: { label: 'Try the appointment task', href: 'https://mobile.tenirlabs.cc/discover', note: 'Prototype with example data · no real messages sent.' },
      next: { label: 'Understand what can be delegated', href: '/en/start/delegate/' }, context: 'deleguer',
    },
    {
      id: 'produit', profile: 'I’m preparing an agent with my team', industry: 'Software products · example: financial services',
      need: '“Before launch, I want to know what permits or stops an action.”',
      situation: 'You are a product lead, CTO or architect. Your team is considering an agent that can request a payment: the cap, permissions and expected evidence of the outcome need to be explicit.',
      question: 'Which action do you want the team to agree on before it can be dispatched?',
      first: { label: 'Explore authorization in the demo', href: '/en/architecture/demo/#scene-1', note: 'Simulated technical scenario · artifact in English.' },
      next: { label: 'See the REG standard’s requirements', href: '/en/standard/' }, context: 'concevoir',
    },
    {
      id: 'operations', profile: 'I’m responsible for operations', industry: 'E-commerce · purchasing',
      need: '“The confirmation is missing. I need to decide whether we can try again.”',
      situation: 'An agent dispatched an order, but you cannot find its confirmation. You want to avoid a duplicate and distinguish what the traces establish from what remains unknown.',
      question: 'What could confirm the outcome before another attempt?',
      first: { label: 'Read a sourced diagnostic sheet', href: '/en/offer/example/', note: 'Simulated budget-operation example with its source files.' },
      next: { label: 'Explore the unknown outcome in the demo', href: '/en/architecture/demo/#scene-5' }, context: 'examiner',
    },
  ],
};
