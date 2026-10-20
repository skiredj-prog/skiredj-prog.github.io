import type { Locale } from './site';

interface Introduction { opening: string; emphasis: string; body: string }

export const frameworkIntro: Record<Locale, string> = {
  fr: 'TENIR est un cadre de diagnostic et de gouvernance des systèmes sous pression.',
  en: 'TENIR is a diagnostic and governance framework for systems under pressure.',
};

// Editorial entry points, not quotations or new definitions of the framework.
export const introductions: Record<Locale, Introduction[]> = {
  fr: [
    { opening: 'Avant de trancher,', emphasis: 'voir ce qui se joue.', body: 'Clarifier la situation, préserver ce qui compte et garder des possibilités d’action : pour une personne, une organisation, une institution ou un État.' },
    { opening: 'La pression monte.', emphasis: 'Que faut-il préserver ?', body: 'L’urgence peut masquer l’essentiel. Le point de départ : retrouver les limites, les capacités et les marges de manœuvre du système.' },
    { opening: 'Décider aujourd’hui.', emphasis: 'Quels possibles demain ?', body: 'Une décision peut fermer des chemins. TENIR examine les engagements, leur réversibilité et les options qu’il reste possible de préserver.' },
    { opening: 'Des récits se croisent.', emphasis: 'Où sont les faits ?', body: 'Les points de vue peuvent se contredire. Le diagnostic distingue les faits disponibles, les interprétations et ce qui reste à établir.' },
    { opening: 'Pouvoir agir.', emphasis: 'Sur quelles bases ?', body: 'Qui dispose des leviers ? Qui peut signaler une dérive ou interrompre une action ? TENIR examine les conditions de l’action et les responsabilités.' },
    { opening: 'Tout semble tenir.', emphasis: 'Et sous la surface ?', body: 'Un résultat immédiat ne dit pas tout. Les dépendances, les pressions et l’histoire du système comptent aussi pour comprendre sa trajectoire.' },
  ],
  en: [
    { opening: 'Before deciding,', emphasis: 'see what is at stake.', body: 'Clarify the situation, preserve what matters and keep options for action open: for a person, an organization, an institution or a state.' },
    { opening: 'Pressure is rising.', emphasis: 'What must be preserved?', body: 'Urgency can obscure what matters. Start by identifying the system’s boundaries, capacities and room to act.' },
    { opening: 'Deciding today.', emphasis: 'Which options tomorrow?', body: 'A decision can close paths. TENIR examines commitments, their reversibility and the options that can still be preserved.' },
    { opening: 'Accounts diverge.', emphasis: 'Where are the facts?', body: 'Perspectives can contradict each other. The diagnosis distinguishes available facts, interpretations and what remains to be established.' },
    { opening: 'Being able to act.', emphasis: 'On what basis?', body: 'Who has the levers? Who can flag a drift or stop an action? TENIR examines the conditions for action and responsibilities.' },
    { opening: 'It seems to hold.', emphasis: 'What lies beneath?', body: 'An immediate result does not tell the whole story. Dependencies, pressures and the system’s history also matter when examining its trajectory.' },
  ],
};
