import type { Locale } from './site';

export type JourneyId = 'decouvrir' | 'deleguer' | 'concevoir' | 'examiner' | 'etudier';
interface Link { label: string; href: string; note?: string }
export interface Journey {
  id: JourneyId;
  slug: string;
  label: string;
  need: string;
  title: string;
  lede: string;
  recognition: string;
  emphasis: string;
  questions: { question: string; answer: string }[];
  links: Link[];
  primary: Link;
  contact?: string;
}

export const journeys: Record<Locale, Journey[]> = {
  fr: [
    {
      id: 'decouvrir', slug: 'decouvrir', label: 'Me faire une idée',
      need: 'Comprendre ce que TENIR change, sans entrer dans la technique.',
      title: 'Un agent agit pour vous. Qu’est-ce que ça change ?',
      lede: 'Vous découvrez le sujet ? Partons d’une situation simple, sans vocabulaire à apprendre.',
      recognition: 'Vous envoyez une commande, mais la confirmation n’arrive pas. Vous hésitez à recommencer : et si la première était déjà passée ?',
      emphasis: 'Autoriser une action et savoir ce qu’elle a produit sont deux questions différentes.',
      questions: [
        {question: 'Quand vous dites « agent », de quoi parle-t-on ?', answer: 'D’un logiciel qui peut demander une action : envoyer une commande, proposer un rendez-vous ou modifier un accès. La question est de préciser jusqu’où il peut aller.'},
        {question: 'À quoi TENIR peut-il m’aider à réfléchir ?', answer: 'À ce qui permet l’action, à ce qui doit l’arrêter et à ce qui permet de vérifier son résultat. Le site présente un cadre, des démonstrations et un accompagnement pour examiner un cas.'},
        {question: 'Faut-il tout comprendre avant d’essayer ?', answer: 'Vous pouvez commencer par la démonstration de rendez-vous. Une tâche est déjà préparée. Elle fonctionne comme une simulation : aucun vrai message n’est envoyé.'},
      ],
      links: [
        {label: 'Un exemple : la réponse manque', href: '/#comprendre', note: 'Quelques lignes et trois façons d’aborder la situation.'},
        {label: 'D’où vient TENIR ?', href: '/origine/', note: 'Le récit et le contexte du cadre.'},
        {label: 'Les concepts, si vous voulez approfondir', href: '/concepts/', note: 'Lecture détaillée et termes de référence.'},
      ],
      primary: {label: 'Voir la démo de rendez-vous', href: 'https://mobile.tenirlabs.cc/discover', note: 'Prototype distinct · simulation sur votre appareil.'},
      contact: 'Je découvre TENIR et souhaite poser une question.',
    },
    {
      id: 'deleguer', slug: 'deleguer', label: 'Déléguer une tâche',
      need: 'Voir comment confier une tâche en gardant des limites choisies.',
      title: 'Une tâche à confier. Quelles limites voulez-vous garder ?',
      lede: 'Proposer des rendez-vous peut être utile. Choisir à qui, quand et combien de fois reste votre décision.',
      recognition: 'Vous aimeriez peut-être vous libérer des allers-retours pour trouver un créneau, tout en gardant vos rendez-vous confirmés à l’abri des modifications.',
      emphasis: 'Dans le prototype, vous choisissez la tâche et ses limites. Vous pouvez aussi la mettre en pause.',
      questions: [
        {question: 'Qu’est-ce que je peux essayer, concrètement ?', answer: 'Une tâche qui propose des créneaux libres à des clients inclus, dans une plage horaire et une limite de messages. Vous pouvez simuler une proposition, une réponse et une pause.'},
        {question: 'Dois-je connecter mes clients ou mon agenda ?', answer: 'Le parcours de démonstration utilise des données d’exemple sur votre appareil. Vous n’avez pas à connecter un compte client pour le découvrir.'},
        {question: 'Est-ce déjà un service pour mon activité ?', answer: 'C’est un prototype à explorer. Il n’envoie aucun vrai message. Le diagnostic accompagné est une démarche distincte, sur devis, pour examiner les contrôles d’une action avec une équipe.'},
      ],
      links: [
        {label: 'Une question sur les limites ?', href: '/contact/?situation=deleguer', note: 'Décrivez ce que vous souhaiteriez confier.'},
        {label: 'Et si je prépare un agent pour mon équipe ?', href: '/parcours/concevoir/', note: 'Les questions à poser avant de le laisser agir.'},
      ],
      primary: {label: 'Essayer la tâche d’exemple', href: 'https://mobile.tenirlabs.cc/discover', note: 'Simulation · aucun vrai message envoyé.'},
      contact: 'Je souhaite comprendre les limites d’une tâche à déléguer.',
    },
    {
      id: 'concevoir', slug: 'concevoir', label: 'Préparer un agent',
      need: 'Savoir quoi vérifier avant de laisser un agent agir.',
      title: 'Avant de le laisser agir, que voulez-vous pouvoir vérifier ?',
      lede: 'Vous décidez d’un lancement, concevez le système ou portez la responsabilité métier ? Partons d’une action précise.',
      recognition: 'Une équipe peut s’accorder sur ce que l’agent doit faire tout en laissant ouvertes les questions d’arrêt, de doublon ou de résultat incertain.',
      emphasis: 'La première étape est de nommer l’action, ses limites et la preuve attendue de son résultat.',
      questions: [
        {question: 'Par quoi commencer avec mon équipe ?', answer: 'Choisissez une action et un système destinataire. Demandez qui l’autorise, ce qui doit la bloquer et comment son résultat sera confirmé. Vous pouvez partir de documents et d’entretiens.'},
        {question: 'Je veux voir les contrats et les mécanismes.', answer: 'Le standard REG décrit les exigences d’exécution. L’architecture présente les rôles et les frontières. Les dépôts et la page Statut précisent les mécanismes disponibles et leurs limites.'},
        {question: 'Que donne le diagnostic accompagné ?', answer: 'Une fiche sourcée qui sépare les faits, les inconnues et le prochain contrôle à vérifier, avec des annexes et jusqu’à trois priorités dans le périmètre convenu. Le format est à confirmer au devis.'},
      ],
      links: [
        {label: 'Voir les rôles et l’architecture', href: '/architecture/', note: 'Lecture technique et frontières du système.'},
        {label: 'Lire les exigences REG', href: '/standard/', note: 'Le standard proposé, distinct du logiciel.'},
        {label: 'Évaluer le niveau de maturité', href: '/statut/', note: 'Ce qui est établi et ce qui reste ouvert.'},
      ],
      primary: {label: 'Voir une fiche de diagnostic', href: '/offre/exemple/', note: 'Exemple simulé · vous pouvez juger le format avant de nous écrire.'},
      contact: 'Je prépare l’utilisation d’un agent et souhaite examiner ses contrôles.',
    },
    {
      id: 'examiner', slug: 'examiner', label: 'Éclaircir un résultat',
      need: 'Faire le point lorsqu’une action a eu lieu et que sa suite est incertaine.',
      title: 'Il a agi. Vous n’avez pas la confirmation.',
      lede: 'Vous n’avez pas besoin d’avoir déjà l’explication pour commencer. Regardons ce que les éléments disponibles permettent d’établir.',
      recognition: 'Un appel enregistré, une réponse absente, des journaux partiels : ces éléments ne racontent pas forcément la même chose. On peut les distinguer avant de décider de la suite.',
      emphasis: 'Une réponse manquante ne prouve pas que l’action a échoué.',
      questions: [
        {question: 'Qu’est-ce que l’on cherche à distinguer ?', answer: 'L’autorisation de l’action, l’envoi de la requête et la confirmation du résultat. Une trace peut établir l’un de ces faits sans établir les autres.'},
        {question: 'Je n’ai que des traces partielles. Est-ce un problème ?', answer: 'C’est une limite à rendre visible. Le diagnostic peut conclure « non établi avec les éléments disponibles » et préciser quelle information manque. Vous pouvez commencer en décrivant ce que vous avez.'},
        {question: 'TENIR résout-il l’incident automatiquement ?', answer: 'Le diagnostic prépare une décision humaine dans un périmètre écrit. Il ne remplace pas le responsable de la reprise. Les démonstrations du site n’opèrent pas votre système.'},
      ],
      links: [
        {label: 'Lire le cas simulé, avec les sources', href: '/offre/exemple/', note: 'Une opération budgétaire dont le résultat reste inconnu.'},
        {label: 'Examiner la trace dans la démonstration', href: '/architecture/demo/#scene-5', note: 'Version technique · artefact en anglais.'},
        {label: 'Comprendre le périmètre du diagnostic', href: '/offre/', note: 'Déroulement, livrables et forfait sur devis.'},
      ],
      primary: {label: 'Décrire ce que vous savez', href: '/contact/?situation=examiner', note: 'Un brouillon à relire. Aucun envoi automatique.'},
      contact: 'Une action a eu lieu et son résultat reste incertain. Je souhaite faire le point.',
    },
    {
      id: 'etudier', slug: 'etudier', label: 'Étudier les sources',
      need: 'Accéder aux définitions, au code et aux preuves pour juger sur pièces.',
      title: 'Vous voulez juger sur pièces.',
      lede: 'Recherche, architecture, gouvernance, évaluation critique : voici les sources et leurs périmètres en accès direct.',
      recognition: 'Vous avez peut-être déjà les bonnes questions. Vous pouvez aller directement aux textes, examiner les écarts et retrouver les identifiants cités.',
      emphasis: 'Cadre, standard, logiciel et démonstration sont des objets distincts. Leurs statuts comptent dans la lecture des preuves.',
      questions: [
        {question: 'Où trouver les exigences et le code ?', answer: 'La page Standard présente REG. La carte des dépôts distingue les implémentations, schémas et harnais de laboratoire. L’architecture sert de guide de lecture.'},
        {question: 'Que démontrent les tests publiés ?', answer: 'La page Conformance expose les périmètres et les limites. Un résultat dans un laboratoire ou un prototype ne constitue pas à lui seul une certification ni une garantie générale de production.'},
        {question: 'Comment citer ou discuter une définition ?', answer: 'Les publications et la page Contact donnent les références et leurs divergences. Pour le logiciel, préciser le dépôt, le commit et le fichier permet de situer exactement l’affirmation examinée.'},
      ],
      links: [
        {label: 'Standard REG', href: '/standard/', note: 'Exigences et statut des textes.'},
        {label: 'Conformance et preuves', href: '/conformance/', note: 'Ce qui a été testé et dans quel périmètre.'},
        {label: 'Carte des dépôts', href: '/depots/', note: 'Code, schémas et harnais.'},
        {label: 'Publications', href: '/publications/', note: 'Textes et identifiants.'},
        {label: 'Origine et concepts', href: '/concepts/', note: 'Vocabulaire et contexte de lecture.'},
      ],
      primary: {label: 'Commencer par le statut des sources', href: '/statut/', note: 'Repères de maturité et limites publiées.'},
      contact: 'Je souhaite discuter une source, une définition ou une preuve de TENIR.',
    },
  ],
  en: [],
};

const english: Omit<Journey, 'id' | 'slug'>[] = [
  {label:'Get a feel for it',need:'Understand the idea without starting with technical details.',title:'An agent acts for you. What changes?',lede:'New to the subject? Let’s start with a familiar situation, with no vocabulary to learn first.',recognition:'You send an order, but no confirmation arrives. You hesitate to try again: what if the first one already went through?',emphasis:'Authorizing an action and knowing its outcome are different questions.',questions:[{question:'What do you mean by an agent?',answer:'Software that can request an action: send an order, propose an appointment or change access. The question is how far it can go.'},{question:'What can TENIR help me think through?',answer:'What permits an action, what must stop it and what establishes its outcome. This site presents a framework, demonstrations and accompanied work to examine a case.'},{question:'Do I need to understand everything before trying it?',answer:'You can start with the appointment demonstration. An example task is ready. It is a simulation: no real messages are sent.'}],links:[{label:'An example: the response is missing',href:'/en/#comprendre',note:'A short situation and three ways to approach it.'},{label:'Where did TENIR come from?',href:'/en/origin/',note:'The framework’s story and context.'},{label:'The concepts, if you want to go deeper',href:'/en/concepts/',note:'Detailed reading and reference terminology.'}],primary:{label:'See the appointment demo',href:'https://mobile.tenirlabs.cc/discover',note:'Separate prototype · simulation on your device.'},contact:'I am discovering TENIR and would like to ask a question.'},
  {label:'Delegate a task',need:'See how to delegate while keeping limits you choose.',title:'A task to delegate. Which limits do you want to keep?',lede:'Proposing appointments can help. Choosing to whom, when and how often remains your decision.',recognition:'You may want less back-and-forth to find a slot while keeping confirmed appointments protected from changes.',emphasis:'In the prototype, you choose the task and its limits. You can pause it too.',questions:[{question:'What can I actually try?',answer:'A task that proposes free slots to included clients, within a time window and message limit. You can simulate a proposal, a reply and a pause.'},{question:'Do I need to connect clients or a calendar?',answer:'The demonstration uses example data on your device. You do not need to connect a client account to explore it.'},{question:'Is this already a service for my business?',answer:'It is a prototype to explore. It sends no real messages. The accompanied diagnostic is a separate, quoted engagement to examine an action’s controls with a team.'}],links:[{label:'A question about the limits?',href:'/en/contact/?situation=deleguer',note:'Describe what you would like to delegate.'},{label:'What if I’m preparing an agent for my team?',href:'/en/start/build/',note:'Questions to ask before letting it act.'}],primary:{label:'Try the example task',href:'https://mobile.tenirlabs.cc/discover',note:'Simulation · no real messages sent.'},contact:'I would like to understand the limits of a task to delegate.'},
  {label:'Prepare an agent',need:'Know what to check before letting an agent act.',title:'Before letting it act, what do you want to be able to check?',lede:'Deciding on a launch, designing the system or owning the business process? Let’s start with one precise action.',recognition:'A team can agree on what an agent should do while leaving questions about stopping, duplicates or uncertain outcomes open.',emphasis:'Start by naming the action, its limits and the evidence expected for its outcome.',questions:[{question:'Where should my team start?',answer:'Choose one action and one recipient system. Ask who authorizes it, what must block it and how its outcome will be confirmed. Documents and interviews can be the starting point.'},{question:'I want to see contracts and mechanisms.',answer:'The REG standard describes execution requirements. The architecture presents roles and boundaries. Repositories and the Status page identify available mechanisms and their limits.'},{question:'What does the accompanied diagnostic provide?',answer:'A sourced sheet separating facts, unknowns and the next control to check, with annexes and up to three priorities within the agreed scope. The format is confirmed in the quote.'}],links:[{label:'See system roles and architecture',href:'/en/architecture/',note:'Technical reading and system boundaries.'},{label:'Read the REG requirements',href:'/en/standard/',note:'The proposed standard, distinct from the software.'},{label:'Evaluate maturity',href:'/en/status/',note:'What is established and what remains open.'}],primary:{label:'See a diagnostic sheet',href:'/en/offer/example/',note:'Simulated example · judge the format before contacting us.'},contact:'I am preparing to use an agent and would like to examine its controls.'},
  {label:'Clarify an outcome',need:'Take stock when an action happened and its outcome is uncertain.',title:'It acted. You have no confirmation.',lede:'You do not need the explanation before you begin. Let’s look at what the available evidence establishes.',recognition:'A recorded call, a missing response, partial logs: these do not necessarily tell the same story. They can be distinguished before deciding what comes next.',emphasis:'A missing response does not prove that the action failed.',questions:[{question:'What are we trying to distinguish?',answer:'Authorization of the action, dispatch of the request and confirmation of the outcome. A trace can establish one of these facts without establishing the others.'},{question:'I only have partial traces. Is that a problem?',answer:'It is a limit to make visible. The diagnostic can conclude “not established with available evidence” and identify what information is missing. Start by describing what you have.'},{question:'Does TENIR resolve the incident automatically?',answer:'The diagnostic prepares a human decision within a written scope. It does not replace the person responsible for resuming. Site demonstrations do not operate your system.'}],links:[{label:'Read the simulated case with sources',href:'/en/offer/example/',note:'A budget operation with an unknown outcome.'},{label:'Examine the demonstration trace',href:'/en/architecture/demo/#scene-5',note:'Technical version · artifact in English.'},{label:'Understand the diagnostic’s scope',href:'/en/offer/',note:'Process, deliverables and a fixed quote.'}],primary:{label:'Describe what you know',href:'/en/contact/?situation=examiner',note:'A draft to review. Nothing sent automatically.'},contact:'An action happened and its outcome is uncertain. I would like to take stock.'},
  {label:'Study the sources',need:'Find definitions, code and evidence to assess the substance.',title:'You want to examine the evidence.',lede:'Research, architecture, governance, critical assessment: sources and their scopes are directly accessible here.',recognition:'You may already have the questions you need. Go straight to the texts, examine gaps and locate the cited identifiers.',emphasis:'Framework, standard, software and demonstration are distinct objects. Their status matters when reading the evidence.',questions:[{question:'Where are the requirements and code?',answer:'The Standard page presents REG. The repository map distinguishes implementations, schemas and laboratory harnesses. The architecture provides a reading guide.'},{question:'What do the published tests demonstrate?',answer:'The Conformance page explains scopes and limits. A laboratory or prototype result does not alone constitute certification or a general production guarantee.'},{question:'How do I cite or discuss a definition?',answer:'Publications and Contact provide references and their discrepancies. For software, identifying the repository, commit and file locates the exact claim being examined.'}],links:[{label:'REG standard',href:'/en/standard/',note:'Requirements and document status.'},{label:'Conformance and evidence',href:'/en/conformance/',note:'What was tested and within which scope.'},{label:'Repository map',href:'/en/repositories/',note:'Code, schemas and harnesses.'},{label:'Publications',href:'/en/publications/',note:'Texts and identifiers.'},{label:'Origin and concepts',href:'/en/concepts/',note:'Vocabulary and reading context.'}],primary:{label:'Start with the sources’ status',href:'/en/status/',note:'Published maturity and limits.'},contact:'I would like to discuss a TENIR source, definition or piece of evidence.'},
];
const enSlugs=['discover','delegate','build','investigate','research'];
journeys.en=english.map((entry,i)=>({...entry,id:journeys.fr[i].id,slug:enSlugs[i]}));
export const journeyHref=(locale:Locale,journey:Journey)=>locale==='fr'?`/parcours/${journey.slug}/`:`/en/start/${journey.slug}/`;
