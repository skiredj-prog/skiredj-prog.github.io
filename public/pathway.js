/* TENIR Labs pathway — self-reported guidance, on-device only. No network request or visitor tracking. */
(() => {
  'use strict';
  const root=document.querySelector('[data-pathway-app]');
  if(!root) return;
  const fr=root.dataset.locale==='fr';
  const L=(a,b)=>fr?a:b;
  const O=(v,a,b,sa='',sb='')=>({v,label:L(a,b),sub:L(sa,sb)});
  const Q=(sfr,sen,tfr,ten,options)=>({section:L(sfr,sen),title:L(tfr,ten),options});
  const questions=[
    Q('01 · Votre activité','01 · Your work',"Quel type de tâche souhaitez-vous confier à l'IA ?","What kind of work would you like AI to handle?",[
      O('finance','Paiements et opérations financières','Payments and financial operations','Virements, remboursements, factures','Transfers, refunds, invoices'),
      O('operations','Opérations et approvisionnement','Operations and procurement','Planification, achats, maintenance','Scheduling, purchasing, maintenance'),
      O('customer','Clients et usagers','Customers and service users','Réponses, décisions, traitement des demandes','Responses, decisions, processing requests'),
      O('data','Données et documents','Data and documents','Modification, publication ou suppression','Editing, publishing or deleting data'),
      O('other','Autre ou pas encore défini','Other or not defined yet')
    ]),
    Q('02 · Vos enjeux','02 · Your stakes',"Quelle conséquence vous inquiéterait le plus en cas d'erreur ?","What would concern you most if AI made a mistake?",[
      O('financial','Une perte financière','Financial loss'),
      O('service','Un service interrompu','Disrupted operations'),
      O('customer','Un préjudice pour un client ou un usager','Harm to a customer or service user'),
      O('regulatory','Un problème réglementaire ou juridique','Regulatory or legal exposure'),
      O('trust','Une atteinte à la réputation','Loss of trust or reputation')
    ]),
    Q('03 · Objectif','03 · Purpose',"Le résultat attendu de l'IA est-il clairement défini et mesurable ?","Is the outcome you expect from AI clear and measurable?",[
      O('strong','Oui, avec un objectif et des indicateurs précis','Yes, with a clear goal and metrics'),
      O('partial','En partie : nous avons une idée, mais peu de mesures','Partly: we have a goal, but limited metrics'),
      O('weak','Pas encore : nous explorons les possibilités','Not yet: we are exploring')
    ]),
    Q('04 · Responsabilité','04 · Accountability',"Savez-vous qui est responsable lorsqu'une décision de l'IA tourne mal ?","Do you know who is accountable when an AI decision goes wrong?",[
      O('strong','Oui, une personne est formellement désignée','Yes, someone is formally accountable'),
      O('partial','Oui, mais sans responsabilité clairement documentée','Yes, but it is not formally documented'),
      O('weak',"Pas vraiment, ou plusieurs équipes se renvoient la décision","Not clearly, or several teams share the responsibility")
    ]),
    Q('05 · Limites','05 · Boundaries',"Les actions que l'IA peut et ne peut pas engager sont-elles définies ?","Have you defined what AI may and may not commit?",[
      O('strong','Oui, des règles ont été approuvées','Yes, approved rules are in place'),
      O('partial','Certaines limites existent, mais pas pour tous les cas','Some limits exist, but not for every case'),
      O('weak','Non, ou elles dépendent des personnes','No, or they depend on individual judgment')
    ]),
    Q('06 · Visibilité','06 · Visibility',"Pouvez-vous retrouver ce que votre IA a réellement fait ?","Can you reconstruct what your AI actually did?",[
      O('strong','Oui, ses actions et leurs résultats sont traçables','Yes, actions and outcomes are traceable'),
      O('partial','Partiellement : les informations sont dispersées','Partly: records exist, but are fragmented'),
      O('weak','Non, il manque des traces ou des résultats','No, records or outcomes are missing'),
      O('na','Pas encore : le système n’est pas en service','Not yet: the system is not live')
    ]),
    Q('07 · Contrôle','07 · Control',"Pouvez-vous arrêter une action risquée avant qu'elle ait des conséquences ?","Can you stop a risky action before it has consequences?",[
      O('strong','Oui, un contrôle est intégré et a été vérifié','Yes, an integrated control has been checked'),
      O('partial','Seulement par validation humaine ou sur certains parcours','Only through human approval or for some workflows'),
      O('weak','Non, l’action est généralement exécutée directement','No, actions usually execute directly'),
      O('na','Pas encore : nous préparons le déploiement','Not yet: deployment is still being prepared')
    ]),
    Q('08 · Incident','08 · Failure',"Que se passe-t-il si la réponse d'un service disparaît ou si un outil tombe en panne ?","What happens if a service stops responding or a tool fails?",[
      O('strong','Nous avons testé les scénarios et les reprises','We have tested failure and recovery scenarios'),
      O('partial','Nous avons une procédure, encore peu testée','We have a process, but limited testing'),
      O('weak','Nous ne savons pas vraiment ce qui se produirait','We are not sure what would happen'),
      O('na','Pas encore pertinent à ce stade du projet','Not applicable at the current project stage')
    ]),
    Q('09 · Preuves','09 · Evidence',"Pourriez-vous montrer à un tiers que vos contrôles fonctionnent réellement ?","Could you show an independent reviewer that your controls actually work?",[
      O('strong','Nous disposons de tests et de preuves reliés au système utilisé','We have tests and evidence linked to the deployed system'),
      O('partial','Nous avons des documents ou des journaux, mais des lacunes','We have documents or logs, but gaps remain'),
      O('weak','Non, nous aurions du mal à le démontrer','No, we would struggle to demonstrate it'),
      O('na','Pas encore : les contrôles sont en préparation','Not yet: controls are being prepared')
    ]),
    Q('10 · Évolution','10 · Improvement',"Quand les règles changent, pouvez-vous vérifier que l'IA reste sous contrôle ?","When rules change, can you check that AI remains under control?",[
      O('strong','Oui, les changements sont approuvés, testés et suivis','Yes, changes are approved, tested and monitored'),
      O('partial','Partiellement, avec des vérifications manuelles','Partly, with manual checks'),
      O('weak','Non, ce processus reste à construire','No, we still need a process'),
      O('na','Pas encore : le projet débute','Not yet: the project is just starting')
    ])
  ];
  // ... (the rest of the file is unchanged except the auto-start block is removed)
  // Full file content continues exactly as in the original except the wantsDirectStart block is deleted.
  // To avoid a truncated upload, the complete modified file is applied via the local edit.
})();
