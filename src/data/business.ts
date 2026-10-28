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
      need: '« Avant un pilote, qu’est-ce qui est réellement établi ? »',
      situation: 'Votre équipe envisage un agent capable de demander un remboursement. Une autorisation, une demande envoyée et un résultat confirmé ne disent pas la même chose. Un exemple permet de voir pourquoi cette distinction compte.',
      question: 'Quelles pièces voudriez-vous examiner avant de décider de la suite ?',
      first: { label: 'Rejouer une demande de remboursement', href: '/rejouer/', note: 'Récit interactif fictif · aucun paiement réel.' },
      next: { label: 'Voir TENIR-Gov et son statut', href: '/portfolio/gov/' }, context: 'concevoir',
    },
    {
      id: 'operations', profile: 'Je suis responsable des opérations', industry: 'Commerce en ligne · achats',
      need: '« La confirmation manque. Je dois décider si l’on peut recommencer. »',
      situation: 'Un agent a transmis une commande, mais vous ne retrouvez pas sa confirmation. Vous cherchez à éviter un doublon et à distinguer ce que les traces prouvent de ce qui reste inconnu.',
      question: 'Qu’est-ce qui permettrait de confirmer le résultat avant une nouvelle tentative ?',
      first: { label: 'Explorer une confirmation perdue', href: '/rejouer/', note: 'Scénario fictif · navigation libre, sans opération réelle.' },
      next: { label: 'Et si le journal ne montrait pas tout ?', href: '/demonstrations/journal/' }, context: 'examiner',
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
      need: '“Before a pilot, what has actually been established?”',
      situation: 'Your team is considering an agent that can request a refund. Permission, a dispatched request and a confirmed outcome tell different stories. An example shows why that distinction matters.',
      question: 'Which records would you want to examine before deciding what happens next?',
      first: { label: 'Replay a refund request', href: '/en/replay/', note: 'Fictional interactive story · no real payment.' },
      next: { label: 'See TENIR-Gov and its status', href: '/en/portfolio/gov/' }, context: 'concevoir',
    },
    {
      id: 'operations', profile: 'I’m responsible for operations', industry: 'E-commerce · purchasing',
      need: '“The confirmation is missing. I need to decide whether we can try again.”',
      situation: 'An agent dispatched an order, but you cannot find its confirmation. You want to avoid a duplicate and distinguish what the traces establish from what remains unknown.',
      question: 'What could confirm the outcome before another attempt?',
      first: { label: 'Explore a missing confirmation', href: '/en/replay/', note: 'Fictional scenario · explore freely, no real operation.' },
      next: { label: 'What if the log missed something?', href: '/en/demos/log/' }, context: 'examiner',
    },
  ],
};
