// Assembles a draft from the ideas on the Publish board. Quoted text is verbatim from the cited artifact;
// the connective text is fixed scaffolding. Nothing is inferred or invented here.
var publishService = (function(){
  const T = {
    en:{ thesis:'Thesis', connect:'What connects them', sources:'Sources', carried:'Carried by', pieces:'artifacts in the corpus', graph:'In the graph',
      angle:'Angle', meet:'Where they meet', open:'Open questions', shared:'Artifacts carrying both',
      nobridge:'no passage in the corpus joins these two ideas yet — the link has to be argued, not quoted.',
      nopass:'No pinned passage for this idea.', proj:'TENIR Workbench projection', src:'sources',
      note:'Draft assembled from verbatim passages of the TENIR corpus. Text in quotation marks is exact; everything else is scaffolding to rewrite.' },
    fr:{ thesis:'Thèse', connect:'Ce qui les relie', sources:'Sources', carried:'Porté par', pieces:'pièces du corpus', graph:'Dans le graphe',
      angle:'Angle', meet:'Là où elles se rejoignent', open:'Questions ouvertes', shared:'Pièces portant les deux',
      nobridge:'aucun passage du corpus ne joint encore ces deux idées — le lien est à argumenter, pas à citer.',
      nopass:'Aucun passage épinglé pour cette idée.', proj:'Projection TENIR Workbench', src:'sources',
      note:'Brouillon assemblé à partir de passages exacts du corpus TENIR. Le texte entre guillemets est exact ; le reste est une trame à réécrire.' }
  };
  function clip(s, n) { if (s.length <= n) return s; const c = s.lastIndexOf(' ', n - 1); return s.slice(0, c > n * 0.6 ? c : n - 1).replace(/[\s,;:—-]+$/, '') + '…'; }
  function q(s, lang) { return lang === 'fr' ? '« ' + s + ' »' : '“' + s + '”'; }

  function generate(graph, spec) {
    const lang = spec.lang === 'fr' ? 'fr' : 'en', t = T[lang], ideas = spec.ideas || [], pairs = spec.pairs || [];
    if (!ideas.length) return '';
    const refs = [];
    const ref = id => { let i = refs.indexOf(id); if (i < 0) { refs.push(id); i = refs.length - 1; } return '[' + (i + 1) + ']'; };
    const pinned = list => (list || []).filter(p => p.pinned);
    const title = (spec.title || '').trim() || ideas.map(i => i.label).join(' × ');
    const date = new Date().toISOString().slice(0, 10);
    const relLine = e => graph.getNode(e.from).label + ' — ' + e.type + ' → ' + graph.getNode(e.to).label;
    const conceptRels = i => !i.conceptId ? [] : graph.incoming(i.conceptId).filter(e => graph.isConcept(e.from)).concat(graph.outgoing(i.conceptId).filter(e => graph.isConcept(e.to)));
    const sourceList = () => refs.map((id, i) => {
      const n = graph.getNode(id), fam = ((n.tags || []).find(x => /^\d\d_/.test(x)) || '').replace(/_/g, ' ');
      return '[' + (i + 1) + '] ' + n.label + [fam, n.version ? 'v' + n.version : '', n.modified, n.properties.url].filter(Boolean).map(x => ' · ' + x).join('');
    }).join('\n');
    const firstBridge = () => { for (const p of pairs) { const b = pinned(p.items)[0]; if (b) return b; } return null; };
    const out = [];

    if (spec.format === 'linkedin') {
      const hook = firstBridge() || pinned(ideas[0].passages)[0];
      if (hook) { out.push(q(clip(hook.text, 230), lang), ''); ref(hook.id); }
      ideas.forEach(i => { const p = pinned(i.passages).find(x => !hook || x.text !== hook.text) || pinned(i.passages)[0]; if (p) { out.push(i.label + ' — ' + q(clip(p.text, 200), lang), ''); ref(p.id); } });
      out.push(t.sources + ' : ' + refs.map(id => graph.getNode(id).label).join(' ; '), '');
      out.push(ideas.map(i => '#' + i.label.replace(/[^A-Za-zÀ-ÿ0-9]+/g, '')).join(' '), '', '---', t.note);
      return out.join('\n');
    }
    if (spec.format === 'prompt-post' || spec.format === 'prompt-article') {
      const post = spec.format === 'prompt-post';
      out.push(lang === 'fr'
        ? 'Tu rédiges pour l’auteur du corpus TENIR. Écris en français.\nLivrable : ' + (post ? 'un post LinkedIn de 120 à 180 mots.' : 'un article de 700 à 900 mots, avec un titre et trois ou quatre sections.') +
          '\nRègles :\n- Utilise uniquement le matériau ci-dessous. N’ajoute aucun fait, chiffre, nom ou affirmation qui n’y figure pas.\n- Cite la source sous la forme [n] après chaque idée reprise ; quand tu cites, garde la formulation exacte.\n- Écris comme l’auteur de ce travail : direct, précis, sans emphase, sans présenter les idées comme une découverte.\n- Si le matériau ne soutient pas le passage d’une idée à l’autre, ne l’invente pas : signale-le dans une dernière ligne « MANQUES : ».'
        : 'You are drafting for the author of the TENIR corpus. Write in English.\nDeliverable: ' + (post ? 'a LinkedIn post of 120 to 180 words.' : 'an article of 700 to 900 words, with a title and three or four sections.') +
          '\nRules:\n- Use only the material below. Add no fact, figure, name or claim that is not in it.\n- Cite the source as [n] after each idea you borrow; when you quote, keep the wording exact.\n- Write as the author of this work: direct, precise, no hype, and never framed as a discovery.\n- If the material does not support the step from one idea to the next, do not invent it: flag it in a final line “GAPS:”.');
      out.push('', (lang === 'fr' ? 'Idées à relier : ' : 'Ideas to connect: ') + ideas.map(i => i.label).join(' ; '));
      const rels = []; ideas.forEach(i => conceptRels(i).forEach(e => { const l = relLine(e); if (!rels.includes(l)) rels.push(l); }));
      if (rels.length) out.push((lang === 'fr' ? 'Relations déclarées dans le graphe : ' : 'Relations declared in the graph: ') + rels.join(' ; '));
      out.push('', lang === 'fr' ? 'PASSAGES' : 'PASSAGES');
      ideas.forEach(i => { out.push('', '— ' + i.label); pinned(i.passages).forEach(p => out.push(ref(p.id) + ' ' + q(p.text, lang))); if (!pinned(i.passages).length) out.push(t.nopass); });
      const bl = []; pairs.forEach(p => pinned(p.items).forEach(b => bl.push(p.a + ' ↔ ' + p.b + ' ' + ref(b.id) + ' ' + q(b.text, lang))));
      pairs.filter(p => !p.items.length).forEach(p => bl.push(p.a + ' ↔ ' + p.b + ' : ' + t.nobridge));
      if (bl.length) out.push('', lang === 'fr' ? 'PASSAGES DE LIAISON' : 'BRIDGING PASSAGES', ...bl);
      out.push('', t.sources.toUpperCase(), sourceList());
      return out.join('\n');
    }
    if (spec.format === 'outline') {
      out.push('# ' + title, '', t.angle + ' : ' + ideas.map(i => i.label).join(' × '), '');
      ideas.forEach((i, k) => { out.push((k + 1) + '. ' + i.label); pinned(i.passages).forEach(p => out.push('   - ' + q(clip(p.text, 240), lang) + ' ' + ref(p.id))); if (!pinned(i.passages).length) out.push('   - ' + t.nopass); out.push(''); });
      if (pairs.length) {
        out.push((ideas.length + 1) + '. ' + t.meet);
        pairs.forEach(p => pinned(p.items).forEach(b => out.push('   - ' + p.a + ' ↔ ' + p.b + ' : ' + q(clip(b.text, 240), lang) + ' ' + ref(b.id))));
        const gaps = pairs.filter(p => !pinned(p.items).length);
        if (gaps.length) { out.push('', (ideas.length + 2) + '. ' + t.open); gaps.forEach(p => out.push('   - ' + p.a + ' ↔ ' + p.b + ' : ' + t.nobridge)); }
        out.push('');
      }
      out.push('## ' + t.sources, sourceList());
      return out.join('\n');
    }
    // brief (default) and dossier share the structure; the dossier keeps every pinned passage in full
    const full = spec.format === 'dossier';
    out.push('# ' + title, '', '_' + date + ' · ' + t.proj + '_', '');
    const fb = firstBridge(); if (fb) out.push('## ' + t.thesis, '> ' + q(full ? fb.text : clip(fb.text, 320), lang) + ' ' + ref(fb.id), '');
    ideas.forEach(i => {
      out.push('## ' + i.label);
      const ps = pinned(i.passages);
      ps.forEach(p => out.push('> ' + q(full ? p.text : clip(p.text, 360), lang) + ' ' + ref(p.id), ''));
      if (!ps.length) out.push(t.nopass, '');
      const rels = conceptRels(i); if (rels.length) out.push(t.graph + ' : ' + rels.map(relLine).join(' ; '), '');
      if (i.conceptId) { const n = graph.incoming(i.conceptId).filter(e => graph.isArtifact(e.from)).length; if (n) out.push(t.carried + ' ' + n + ' ' + t.pieces + '.', ''); }
    });
    if (pairs.length) {
      out.push('## ' + t.connect);
      pairs.forEach(p => {
        out.push('### ' + p.a + ' ↔ ' + p.b);
        (p.relations || []).forEach(e => out.push(t.graph + ' : ' + relLine(e)));
        const bs = pinned(p.items);
        bs.forEach(b => out.push('> ' + q(full ? b.text : clip(b.text, 360), lang) + ' ' + ref(b.id), ''));
        if (!bs.length) out.push(p.a + ' ↔ ' + p.b + ' : ' + t.nobridge, '');
        if (p.shared && p.shared.length) out.push(t.shared + ' : ' + p.shared.length + ' — ' + p.shared.slice(0, 3).map(id => graph.getNode(id).label).join(' ; ') + (p.shared.length > 3 ? ' ; …' : ''), '');
      });
    }
    out.push('## ' + t.sources, sourceList());
    return out.join('\n');
  }
  return { generate };
})();
