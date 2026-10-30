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
  const DIM=[
    {id:'purpose',name:L('Objectif','Purpose'),keys:[2]},
    {id:'accountability',name:L('Responsabilité','Accountability'),keys:[3]},
    {id:'visibility',name:L('Visibilité','Visibility'),keys:[5]},
    {id:'control',name:L('Contrôle','Control'),keys:[4,6,7]},
    {id:'evidence',name:L('Preuves','Evidence'),keys:[8]},
    {id:'adaptability',name:L('Capacité d’adaptation','Adaptability'),keys:[9]}
  ];
  const steps=[
    {id:'purpose',title:L('Définir ce que le projet doit accomplir','Define the outcome the project must deliver'),desc:L('Écrivez un objectif mesurable pour une action précise et définissez comment savoir si elle a réussi.','Document one measurable outcome for a specific action and how you will know it succeeded.')},
    {id:'accountability',title:L('Nommer la personne qui décide','Name the person who is accountable'),desc:L('Désignez un responsable du parcours, y compris lorsque l’IA se trompe ou que le résultat reste inconnu.','Name an owner for the workflow, including when AI makes a mistake or the outcome is unknown.')},
    {id:'control',title:L('Fixer et tester les limites de l’IA','Set and test the limits of AI actions'),desc:L('Identifiez les actions sensibles, leurs conditions d’approbation et ce qui doit se passer en cas de panne.','Identify sensitive actions, approval rules and what should happen when a system fails.')},
    {id:'visibility',title:L('Rendre les actions traçables','Make actions traceable'),desc:L('Reliez chaque décision importante à sa demande, son exécution et au résultat réellement connu.','Link each important decision to its request, execution and actually known outcome.')},
    {id:'evidence',title:L('Rassembler des preuves utilisables','Build evidence you can use'),desc:L('Associez les tests et journaux aux contrôles et à la version du système réellement concernés.','Tie tests and records to the controls and system version they actually describe.')},
    {id:'adaptability',title:L('Sécuriser les changements','Make changes safely'),desc:L('Prévoyez comment approuver, tester et surveiller les modifications des règles de l’IA.','Define how AI rules will be approved, tested and monitored as they change.')}
  ];
  const textStatus={
    strong:L('Structuré (déclaré)','Structured (reported)'),
    partial:L('Partiel','Partial'),
    weak:L('À clarifier','Needs work'),
    na:L('À préparer','Not yet applicable')
  };
  let index=0;
  let answers=Array(questions.length).fill(null);
  let report=null;
  const $=(id)=>document.getElementById(id);
  const show=(name)=>{
    ['pa-intro','pa-steps','pa-question','pa-report'].forEach(id=>{const el=$(id);el.hidden=(id!=='pa-'+name && !(name==='intro'&&id==='pa-steps'));});
    window.scrollTo({top:0,behavior:'instant'});
  };
  const optValue=(v)=>v==='strong'?2:v==='partial'?1:v==='weak'?0:null;
  const getDimensions=()=>DIM.map(d=>{
    const vals=d.keys.map(i=>optValue(answers[i]));
    const rated=vals.filter(v=>v!==null);
    let level='na';
    if(rated.length){
      if(rated.some(v=>v===0)) level='weak';
      else if(rated.length<vals.length||rated.some(v=>v===1))level='partial';
      else level='strong';
    }
    return {...d,level};
  });
  const riskLabel=(value)=>{
    const x={
      financial:L('l’impact financier','financial impact'),
      service:L('la continuité du service','operational continuity'),
      customer:L('les conséquences pour les clients','customer impact'),
      regulatory:L('les obligations juridiques ou réglementaires','legal or regulatory exposure'),
      trust:L('la confiance et la réputation','trust and reputation')
    };
    return x[value]||L('les conséquences possibles','the potential consequences');
  };
  const contextLabel=(i,v)=>questions[i].options.find(o=>o.v===v)?.label||L('Non précisé','Not specified');
  const route=(suffix)=> (fr?'/':'/en/') + suffix;
  function evaluate(){
    const dims=getDimensions();
    const rank={weak:0,partial:1,na:2,strong:3};
    const prioritized=steps.map((s,i)=>({
      ...s,dim:dims.find(d=>d.id===s.id),
      sort:rank[dims.find(d=>d.id===s.id).level],
      i
    })).sort((a,b)=>a.sort-b.sort||a.i-b.i).slice(0,3);
    // A fully structured self-report needs validation and ongoing value review,
    // not introductory instructions to name an owner or define a first objective.
    if(dims.every(d=>d.level==='strong')){
      prioritized.splice(0,prioritized.length,
        {title:L('Tester les limites avec un incident simulé','Stress-test the controls with a simulated incident'),
         desc:L('Choisissez un cas d’échec réaliste : indisponibilité d’un outil, résultat inconnu ou tentative de doublon. Vérifiez la réaction attendue.','Pick a realistic failure: unavailable tool, unknown outcome or duplicate attempt. Validate the expected response.')},
        {title:L('Relier les preuves à ce qui est réellement déployé','Connect evidence to the actual deployment'),
         desc:L('Vérifiez que les journaux, tests et règles correspondent à la version utilisée, puis faites examiner les écarts par un tiers.','Check that logs, tests and rules match the deployed version, then have a reviewer challenge the gaps.')},
        {title:L('Mesurer la valeur et entretenir le dispositif','Measure value and keep controls current'),
         desc:L('Fixez une revue périodique des incidents, des coûts, des améliorations et des changements de règles.','Schedule periodic reviews of incidents, costs, improvements and rule changes.')}
      );
    }
    const weak=dims.filter(d=>d.level==='weak');
    const partial=dims.filter(d=>d.level==='partial');
    const structured=dims.filter(d=>d.level==='strong');
    const main=prioritized[0];
    const summary=weak.length
      ?L('Premier chantier à examiner : ','First issue to address: ')+main.title+'. '+L('Vos réponses suggèrent des points à clarifier, notamment autour de ','Your answers suggest areas to investigate, especially around ')+riskLabel(answers[1])+'.'
      :partial.length
      ?L('Votre organisation semble avoir posé plusieurs bases. La prochaine étape est de consolider les pratiques encore partielles, en particulier : ','You appear to have some foundations in place. The next move is to strengthen partial practices, especially: ')+main.title+'.'
      :L('Votre parcours semble bien structuré d’après vos réponses. Il reste à vérifier les preuves et la résistance des contrôles sur un cas concret.','Your pathway appears structured based on your answers. The next step is to validate evidence and test controls against a real scenario.');
    // Select the most helpful engagement, without turning the self-assessment into a certification.
    let offer;
    if(dims.find(d=>d.id==='purpose').level==='weak'||dims.find(d=>d.id==='accountability').level==='weak'){
      offer={title:L('Diagnostic de votre parcours IA','AI pathway diagnostic'),desc:L('Un échange ciblé pour clarifier une action, son résultat attendu et les responsabilités.','A focused engagement to clarify an action, its expected outcome and who owns the decision.'),link:route('portfolio/diagnostic/')};
    }else if(dims.find(d=>d.id==='control').level!=='strong'){
      offer={title:L('REG Prevent · Préparer les limites','REG Prevent · Define the limits'),desc:L('Identifier les situations sensibles et les contrôles à préparer avant que l’IA agisse.','Map sensitive situations and the controls to prepare before AI acts.'),link:route('portfolio/prevent/')};
    }else if(dims.find(d=>d.id==='visibility').level!=='strong'||dims.find(d=>d.id==='evidence').level!=='strong'){
      offer={title:L('REG Prepare · Organiser les preuves','REG Prepare · Organize the evidence'),desc:L('Établir ce qui peut être retrouvé et prouvé, et ce qui reste encore inconnu.','Establish what can be reconstructed and demonstrated, and what remains unknown.'),link:route('portfolio/prepare/')};
    }else{
      offer={title:L('Échange sur une mise en pratique ciblée','Discuss a focused next step'),desc:L('Vos réponses ouvrent la voie à une revue concrète d’un parcours sensible, sans présumer de sa conformité.','Your answers suggest a focused review of one consequential workflow, without assuming it is compliant.'),link:route('portfolio/services/')};
    }
    return{dims,prioritized,summary,offer,structured:structured.length};
  }
  function optionNode(o,selected){
    const label=document.createElement('label');label.className='pa-option';
    const input=document.createElement('input');input.type='radio';input.name='pathway-choice';input.value=o.v;input.checked=selected===o.v;
    const body=document.createElement('div');const head=document.createElement('span');head.textContent=o.label;body.appendChild(head);
    if(o.sub){const sub=document.createElement('small');sub.textContent=o.sub;body.appendChild(sub);}
    input.addEventListener('change',()=>{answers[index]=o.v;$('pa-next').disabled=false;});
    label.append(input,body);return label;
  }
  function renderQuestion(){
    const q=questions[index];
    $('pa-progress-label').textContent=q.section;
    $('pa-count').textContent=String(index+1)+' / '+String(questions.length);
    $('pa-progress-fill').style.width=(100*(index+1)/questions.length)+'%';
    $('pa-qsection').textContent=L('Question ','Question ')+String(index+1);
    $('pa-question-title').textContent=q.title;
    $('pa-options').replaceChildren(...q.options.map(o=>optionNode(o,answers[index])));
    $('pa-back').disabled=index===0;
    $('pa-next').disabled=!answers[index];
    $('pa-next').textContent=index===questions.length-1?L('Voir mon rapport →','See my report →'):L('Suivant →','Next →');
  }
  function makeElement(tag,cls,content){
    const el=document.createElement(tag);
    if(cls)el.className=cls;
    if(content!==undefined)el.textContent=content;
    return el;
  }
  function reportText(){
    if(!report)return'';
    const rows=[
      'TENIR LABS — '+L('RAPPORT DE PARCOURS IA','AI PATHWAY REPORT'),
      L('Auto-évaluation déclarative','Self-reported assessment')+' · '+new Date().toLocaleDateString(fr?'fr-FR':'en-GB'),
      '',
      L('TYPE D’ACTION','TYPE OF ACTION')+' : '+contextLabel(0,answers[0]),
      L('RISQUE PRINCIPAL','MAIN CONCERN')+' : '+contextLabel(1,answers[1]),
      '',
      L('SYNTHÈSE','SUMMARY')+': '+report.summary,
      '',
      L('SIX DIMENSIONS','SIX DIMENSIONS')
    ];
    for(const dim of report.dims)rows.push('• '+dim.name+': '+textStatus[dim.level]);
    rows.push('',L('TROIS PRIORITÉS','THREE PRIORITIES'));
    report.prioritized.forEach((step,i)=>rows.push(String(i+1)+'. '+step.title+' — '+step.desc));
    rows.push('',L('PARCOURS SUGGÉRÉ','SUGGESTED PATHWAY')+': '+report.offer.title,report.offer.desc,'',
      L('Ce rapport s’appuie uniquement sur les réponses fournies. Aucune preuve technique n’a été vérifiée. Ce n’est ni un audit ni une certification.','This report uses only the answers provided. No technical evidence was verified. It is neither an audit nor a certification.'),
      'tenirlabs.cc');
    return rows.join('\n');
  }
  function renderReport(){
    report=evaluate();
    $('pa-report-summary').textContent=report.summary;
    const rows=report.dims.map(d=>{
      const container=makeElement('div','pa-dimension');
      const top=makeElement('div','pa-dim-top');
      top.append(makeElement('strong','',d.name),makeElement('span','',textStatus[d.level]));
      const track=makeElement('div','pa-dim-track');const fill=makeElement('div','pa-dim-fill '+(d.level==='partial'?'partial':d.level==='weak'?'low':''));
      fill.style.width=d.level==='strong'?'100%':d.level==='partial'?'63%':d.level==='weak'?'25%':'8%';
      track.append(fill);container.append(top,track);return container;
    });
    $('pa-dimensions').replaceChildren(...rows);
    const items=report.prioritized.map(s=>{const li=document.createElement('li');li.append(makeElement('strong','',s.title),makeElement('p','',s.desc));return li;});
    $('pa-priorities').replaceChildren(...items);
    $('pa-offer-title').textContent=report.offer.title;
    $('pa-offer-description').textContent=report.offer.desc;
    $('pa-learn').href=report.offer.link;
    $('pa-learn').textContent=L('Découvrir cette approche →','Explore this approach →');
    $('pa-talk').href='mailto:skiredj@tenirlabs.cc?subject='+encodeURIComponent(L('Parlons de mon rapport de parcours IA','Discuss my AI pathway report'))+'&body='+encodeURIComponent(L('Bonjour,\n\nJe souhaite discuter des prochaines étapes suggérées par mon rapport TENIR Labs.\n\n','Hello,\n\nI would like to discuss the next steps suggested by my TENIR Labs report.\n\n')+reportText()+'\n\n'+L('Cordialement,','Best regards,'));
    $('pa-feedback').textContent='';
    show('report');
    $('pa-report-title').focus({preventScroll:true});
  }
  async function copyReport(){
    const content=reportText();
    try{
      if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(content);
      else throw Error('clipboard unavailable');
      $('pa-feedback').textContent=L('Rapport copié.','Report copied.');
    }catch(err){
      const el=document.createElement('textarea');el.value=content;el.style.position='fixed';el.style.opacity='0';document.body.append(el);el.select();const ok=document.execCommand('copy');el.remove();
      $('pa-feedback').textContent=ok?L('Rapport copié.','Report copied.'):L('Copie indisponible : utilisez le téléchargement.','Copy unavailable: please download your report.');
    }
  }
  function downloadReport(){
    const text=reportText();
    const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='TENIR-'+(fr?'rapport-parcours':'pathway-report')+'-'+new Date().toISOString().slice(0,10)+'.txt';
    document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('pa-start').addEventListener('click',()=>{index=0;answers=Array(questions.length).fill(null);renderQuestion();show('question');$('pa-question-title').focus({preventScroll:true});});
  $('pa-back').addEventListener('click',()=>{if(index>0){index--;renderQuestion();$('pa-question-title').focus({preventScroll:true});}});
  $('pa-next').addEventListener('click',()=>{
    if(answers[index]===null)return;
    if(index<questions.length-1){index++;renderQuestion();$('pa-question-title').focus({preventScroll:true});}
    else renderReport();
  });
  $('pa-restart').addEventListener('click',()=>{index=0;answers=Array(questions.length).fill(null);report=null;show('intro');$('pa-start').focus({preventScroll:true});});
  $('pa-copy').addEventListener('click',copyReport);
  $('pa-download').addEventListener('click',downloadReport);
  $('pa-print').addEventListener('click',()=>window.print());
})();
