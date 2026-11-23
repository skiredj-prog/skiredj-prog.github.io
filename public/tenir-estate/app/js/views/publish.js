// Publish Projection — free-text board.
// 1. type ideas in your own words (or pick a concept)   2. see the passages that carry each idea and the ones that join two ideas
// 3. generate a draft built from the pinned, cited passages.
var publishView = (function(){
  let G = null, ideas = [], pairs = [], edited = false, built = false;
  const MAX_IDEAS = 5;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
  const bare = l => l.replace(/\s*\(.*?\)\s*/g, '').trim() || l;
  const concepts = () => G.getNodes().filter(n => n.type === 'concept');
  const family = n => ((n.tags || []).find(t => /^\d\d_/.test(t)) || '').replace(/^\d\d_/, '').replace(/_/g, ' ');

  function build() {
    if (built) return; built = true;
    document.querySelector('#view-publish .panel-scroll').innerHTML =
      '<p class="panel-h1">Publish Projection</p>' +
      '<p class="panel-sub">Type ideas in your own words. The bench finds the passages that carry them, shows what joins them, and assembles a draft from verbatim, cited text — nothing invented.</p>' +
      '<div class="cmp-grid"><div class="cmp-col">' +
        '<div class="cmp-h">1 · IDEAS</div>' +
        '<div class="search-box" style="margin-bottom:10px"><input id="cmp-input" placeholder="an idea, a question, a few words… then Enter" autocomplete="off"><button id="cmp-add">ADD IDEA</button></div>' +
        '<div id="cmp-suggest" class="pub-pick" style="margin-bottom:14px"></div>' +
        '<div id="cmp-ideas"></div>' +
        '<div id="cmp-pairs"></div>' +
      '</div><div class="cmp-col">' +
        '<div class="cmp-h">3 · DRAFT</div>' +
        '<div class="cmp-ctl"><select id="cmp-format">' +
          '<option value="brief">Brief</option><option value="linkedin">LinkedIn draft</option><option value="outline">Article outline</option>' +
          '<option value="dossier">Evidence dossier</option><option value="prompt-article">LLM prompt — article</option><option value="prompt-post">LLM prompt — LinkedIn post</option>' +
        '</select><select id="cmp-lang"><option value="en">English</option><option value="fr">Français</option></select>' +
        '<input id="cmp-title" placeholder="Title (optional)"></div>' +
        '<div class="cmp-ctl"><button class="btn" id="pub-gen">GENERATE</button><button class="btn" id="cmp-copy">COPY</button><button class="btn" id="cmp-dl">DOWNLOAD .MD</button><span id="cmp-meta"></span></div>' +
        '<textarea id="pub-out" placeholder="Add an idea on the left. The draft appears here and stays editable."></textarea>' +
      '</div></div>';
    const input = $('cmp-input');
    const add = () => { addIdea(input.value); input.value = ''; suggest(); input.focus(); };
    $('cmp-add').addEventListener('click', add);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
    input.addEventListener('input', suggest);
    $('pub-gen').addEventListener('click', () => { edited = false; generate(); });
    ['cmp-format', 'cmp-lang'].forEach(id => $(id).addEventListener('change', () => { edited = false; generate(); }));
    $('cmp-title').addEventListener('input', () => { if (!edited) generate(); });
    $('pub-out').addEventListener('input', () => { edited = true; });
    $('cmp-copy').addEventListener('click', () => {
      const ta = $('pub-out'); ta.select();
      const done = () => { $('cmp-meta').textContent = 'copied'; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(ta.value).then(done, () => { document.execCommand('copy'); done(); });
      else { document.execCommand('copy'); done(); }
    });
    $('cmp-dl').addEventListener('click', () => {
      const text = $('pub-out').value; if (!text) return;
      const name = (($('cmp-title').value.trim() || ideas.map(i => i.label).join('-')) || 'projection').replace(/[^A-Za-zÀ-ÿ0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type:'text/markdown;charset=utf-8' }));
      a.download = 'TENIR-' + name + '-' + new Date().toISOString().slice(0, 10) + '.md'; document.body.appendChild(a); a.click(); a.remove();
    });
    $('cmp-ideas').addEventListener('click', onBoardClick);
    $('cmp-pairs').addEventListener('click', onBoardClick);
    ['cmp-ideas', 'cmp-pairs', 'cmp-suggest'].forEach(id => $(id).addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"]')) { e.preventDefault(); e.target.click(); }
    }));
    $('cmp-suggest').addEventListener('click', e => { const c = e.target.closest('.pub-chip'); if (c) { addIdea(c.dataset.label, c.dataset.id); input.value = ''; suggest(); } });
  }

  function findConcept(text) {
    const f = text.trim().toLowerCase();
    return concepts().find(c => bare(c.label).toLowerCase() === f || c.label.toLowerCase() === f || (c.aliases || []).some(a => a.toLowerCase() === f)) || null;
  }
  function loadPassages(idea, firstTime) {
    const keep = {}; idea.passages.forEach(p => { keep[SearchIndexer.key(p.text)] = p.pinned; });
    idea.passages = SearchIndexer.passages(idea.terms, idea.shown).map((p, i) => {
      const k = SearchIndexer.key(p.text);
      return { id:p.id, text:p.text, pinned: k in keep ? keep[k] : (firstTime && i < 2) };
    });
  }
  function addIdea(text, conceptId) {
    text = (text || '').trim(); if (!text || ideas.length >= MAX_IDEAS) return;
    const c = conceptId ? G.getNode(conceptId) : findConcept(text);
    const label = c ? bare(c.label) : text.charAt(0).toUpperCase() + text.slice(1);
    if (ideas.some(i => i.label.toLowerCase() === label.toLowerCase())) return;
    const idea = { label, conceptId: c ? c.id : null, terms: SearchIndexer.terms(label), passages: [], shown: 4 };
    if (!idea.terms.length) return;
    loadPassages(idea, true); ideas.push(idea); rebuildPairs(); render();
  }
  function rebuildPairs() {
    const old = {}; pairs.forEach(p => { old[p.a + '|' + p.b] = p; });
    pairs = [];
    for (let i = 0; i < ideas.length; i++) for (let j = i + 1; j < ideas.length; j++) {
      const a = ideas[i], b = ideas[j], k = a.label + '|' + b.label;
      if (old[k]) { pairs.push(old[k]); continue; }
      const relations = (a.conceptId && b.conceptId) ? G.getEdges().filter(e => (e.from === a.conceptId && e.to === b.conceptId) || (e.from === b.conceptId && e.to === a.conceptId)) : [];
      pairs.push({ a:a.label, b:b.label, relations, shared: SearchIndexer.sharedDocs(a.terms, b.terms),
        items: SearchIndexer.bridges(a.terms, b.terms, 3).map((p, n) => ({ id:p.id, text:p.text, pinned:n === 0 })) });
    }
  }
  function onBoardClick(e) {
    const x = e.target.closest('[data-x]'), more = e.target.closest('[data-more]'), p = e.target.closest('.cmp-p');
    if (x) { ideas.splice(+x.dataset.x, 1); rebuildPairs(); render(); return; }
    if (more) { const i = ideas[+more.dataset.more]; i.shown += 4; loadPassages(i, false); render(); return; }
    if (p) {
      const list = p.dataset.pair !== undefined ? pairs[+p.dataset.pair].items : ideas[+p.dataset.idea].passages;
      const it = list[+p.dataset.k]; it.pinned = !it.pinned; render();
    }
  }
  function passageRow(p, attrs, k) {
    const n = G.getNode(p.id);
    return '<div class="cmp-p' + (p.pinned ? ' on' : '') + '" role="button" tabindex="0" aria-pressed="' + !!p.pinned + '" ' + attrs + ' data-k="' + k + '"><span class="cmp-check">' + (p.pinned ? '✓' : '+') + '</span><div>' +
      '<div class="cmp-pt">' + esc(p.text) + '</div><div class="cmp-ps">' + esc(n.label) + (family(n) ? ' · ' + esc(family(n)) : '') + (n.modified ? ' · ' + esc(n.modified) : '') + '</div></div></div>';
  }
  function focusedControl() {   // remembers which board control has keyboard focus, so a re-render can give it back
    const a = document.activeElement, box = a && a.closest ? a.closest('#cmp-ideas,#cmp-pairs,#cmp-suggest') : null;
    if (!box || a.getAttribute('role') !== 'button') return null;
    return '#' + box.id + ' .' + a.classList[0] + Object.keys(a.dataset).map(k => '[data-' + k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) + '="' + CSS.escape(a.dataset[k]) + '"]').join('');
  }
  function render() {
    const keep = focusedControl();
    $('cmp-ideas').innerHTML = ideas.map((i, x) =>
      '<div class="cmp-idea"><div class="cmp-idea-h"><span class="cmp-idea-t">' + esc(i.label) + '</span><span class="r-group">' + (i.conceptId ? 'CONCEPT' : 'IDEA') +
      '</span><span class="cmp-x" role="button" tabindex="0" aria-label="Remove ' + esc(i.label) + '" data-x="' + x + '" title="remove">×</span></div>' +
      (i.passages.length ? i.passages.map((p, k) => passageRow(p, 'data-idea="' + x + '"', k)).join('') +
        (i.passages.length >= i.shown ? '<div class="cmp-more" role="button" tabindex="0" data-more="' + x + '">more passages</div>' : '')
        : '<div class="cmp-none">No passage of the indexed corpus carries these words together. Try fewer or other words.</div>') + '</div>').join('');
    $('cmp-pairs').innerHTML = pairs.length ? '<div class="cmp-h" style="margin-top:22px">2 · CONNECTIONS</div>' + pairs.map((p, x) =>
      '<div class="cmp-idea"><div class="cmp-idea-h"><span class="cmp-idea-t">' + esc(p.a) + ' ↔ ' + esc(p.b) + '</span><span class="r-group">' + p.shared.length + ' SHARED ARTIFACT' + (p.shared.length === 1 ? '' : 'S') + '</span></div>' +
      p.relations.map(e => '<div class="cmp-rel">graph: ' + esc(G.getNode(e.from).label) + ' — ' + esc(e.type) + ' → ' + esc(G.getNode(e.to).label) + '</div>').join('') +
      (p.items.length ? p.items.map((it, k) => passageRow(it, 'data-pair="' + x + '"', k)).join('')
        : '<div class="cmp-none">No passage joins these two ideas. The draft will say so instead of inventing a link.</div>') + '</div>').join('') : '';
    suggest();
    if (!edited) generate();
    if (keep) (document.querySelector(keep) || $('cmp-input')).focus();
  }
  function suggest() {
    const typed = $('cmp-input').value.trim().toLowerCase(), on = new Set(ideas.map(i => i.conceptId).filter(Boolean));
    let list, lead;
    if (typed) { lead = 'concepts'; list = concepts().filter(c => !on.has(c.id) && (c.label.toLowerCase().includes(typed) || (c.aliases || []).some(a => a.toLowerCase().includes(typed)))); }
    else if (ideas.length) {
      lead = 'related';
      const score = {};
      ideas.forEach(i => {
        if (i.conceptId) G.getEdges().forEach(e => { if (e.from === i.conceptId && G.isConcept(e.to)) score[e.to] = (score[e.to] || 0) + 50; if (e.to === i.conceptId && G.isConcept(e.from)) score[e.from] = (score[e.from] || 0) + 50; });
        new Set(i.passages.map(p => p.id)).forEach(id => G.outgoing(id).forEach(e => { if (G.isConcept(e.to)) score[e.to] = (score[e.to] || 0) + 1; }));
      });
      list = Object.keys(score).filter(id => !on.has(id)).sort((a, b) => score[b] - score[a]).map(id => G.getNode(id));
    } else { lead = 'start from'; list = concepts().slice().sort((a, b) => G.incoming(b.id).length - G.incoming(a.id).length); }
    $('cmp-suggest').innerHTML = (list.length ? '<span class="cmp-lead">' + lead + '</span>' : '') + list.slice(0, 9).map(c =>
      '<div class="pub-chip" role="button" tabindex="0" data-id="' + esc(c.id) + '" data-label="' + esc(bare(c.label)) + '">' + esc(bare(c.label)) + '</div>').join('') +
      (ideas.length >= MAX_IDEAS ? '<span class="cmp-lead">board is full (' + MAX_IDEAS + ' ideas)</span>' : '');
  }
  function generate() {
    const text = publishService.generate(G, { ideas, pairs, format:$('cmp-format').value, lang:$('cmp-lang').value, title:$('cmp-title').value });
    $('pub-out').value = text;
    const pins = ideas.reduce((n, i) => n + i.passages.filter(p => p.pinned).length, 0) + pairs.reduce((n, p) => n + p.items.filter(i => i.pinned).length, 0);
    $('cmp-meta').textContent = ideas.length ? pins + ' pinned passage' + (pins === 1 ? '' : 's') + ' · ' + text.split(/\s+/).filter(Boolean).length + ' words' : '';
  }
  function init(app, graph) {
    G = graph;
    app.onViewShown('publish', () => { build(); suggest(); });
  }
  return { init };
})();
