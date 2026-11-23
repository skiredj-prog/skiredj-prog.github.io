var app = (function(){
  const views = {};
  let currentView = 'landing';
  let repoReady = false;
  let repo = KnowledgeRepository;

  function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-'+viewName).classList.add('active');
    document.querySelectorAll('.activity-btn').forEach(b => b.classList.toggle('active', b.dataset.view===viewName));
    currentView = viewName;
    if (views[viewName]) views[viewName]();
  }

  function onViewShown(viewName, fn) {
    views[viewName] = fn;
    if (currentView===viewName && repoReady) fn();
  }

  async function init() {
    console.log('Workbench booting…');
    await repo.initialize('graph/manifest.json');
    repoReady = true;
	console.log("TENIR BUILD CHECK", ImportService.id);
    await CapabilityRegistry.register(ImportService);

    EventBus.subscribe(TENIREvents.KNOWLEDGE_LOADED, () => updateTelemetry());
    EventBus.subscribe(TENIREvents.KNOWLEDGE_UPDATED, () => updateTelemetry());
    updateTelemetry();

    document.querySelectorAll('.activity-btn').forEach(btn => {
      btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    analyzeView.init();
    landingView.init(app);
    exploreView.init(app, repo);
    validateView.init(app, repo);
    publishView.init(app, repo);
    evolveView.init(app, repo);
    searchView.init(app, repo);

    const cmdInput = document.getElementById('cmd-input');
    cmdInput.addEventListener('keydown', e => { if (e.key==='Enter') runCommand(cmdInput.value.trim()); });
    document.addEventListener('keydown', e => {
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (e.key !== '/' || tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      (currentView === 'search' ? document.getElementById('search-input') : cmdInput).focus();
    });

    // Import UI
    const importBtn = document.createElement('button');
    importBtn.textContent = 'Import';
    importBtn.style.marginLeft = '12px';
    importBtn.addEventListener('click', () => fileInput.click());
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try { await ImportService.importFile(file); console.log('Import successful'); } catch(err) { console.error('Import failed:', err); }
    });
    document.getElementById('topbar').appendChild(importBtn);
    document.getElementById('topbar').appendChild(fileInput);

    switchView('landing');
  }

  function updateTelemetry() {
    const stats = repo.statistics();
    document.getElementById('tele-nodes').textContent = stats.concepts + stats.artifacts;
    document.getElementById('tele-edges').textContent = stats.edges;
  }

  function runCommand(raw) {
    const q = raw.trim(); if (!q) return;
    const lower = q.toLowerCase(); let m;
    m = lower.match(/^show\s+(concepts|artifacts)\s+without\s+(.+)$/);
    if (m) {
      switchView('validate');
      const wantConcepts = m[1]==='concepts';
      const edgeLabel = resolveEdgeLabel(m[2].trim());
      const targets = wantConcepts ? repo.getNodes().filter(n=>n.type==='concept') : repo.getNodes().filter(n=>n.type==='artifact');
      // Artifact relations start at the artifact; concept relations are counted where the concept is the target.
      const withEdge = new Set(repo.getEdges().filter(e=>e.type.toLowerCase()===edgeLabel.toLowerCase()).map(e=>wantConcepts?e.to:e.from));
      const missing = targets.filter(n=>!withEdge.has(n.id));
      document.getElementById('adhoc-slot').innerHTML = '<div class="adhoc-result"><div style="font-family:var(--mono);font-size:10.5px;color:var(--amber);letter-spacing:1px;margin-bottom:8px">QUERY: show '+m[1]+' without '+m[2]+' → resolved edge "'+edgeLabel+'"</div>'+(missing.length ? missing.map(n=>'<div class="rel-row"><span>'+n.label+'</span><span class="r-label">no "'+edgeLabel+'" edge</span></div>').join('') : '<div class="check-detail">None — every node in this group has that relation.</div>')+'</div>';
      return;
    }
    m = lower.match(/^(explain|trace|show|open)\s+(.+)$/);
    if (m) {
      switchView('explore');
      const node = findNodeByFuzzyName(m[2].trim());
      if (node) graphRenderer.focusNode(node.id, repo, id => detailRenderer.render(repo.getNode(id), repo));
      else { switchView('search'); document.getElementById('search-input').value=m[2]; document.getElementById('search-results').innerHTML=''; document.getElementById('search-btn').click(); }
      return;
    }
    if (/^validate/.test(lower)) { switchView('validate'); return; }
    if (/^analy/.test(lower)) { switchView('analyze'); return; }
    if (/^publish/.test(lower)) { switchView('publish'); return; }
    m = lower.match(/^(search|find)\s+(.+)$/);
    if (m) { switchView('search'); document.getElementById('search-input').value=m[2]; document.getElementById('search-btn').click(); return; }
    switchView('search'); document.getElementById('search-input').value=q; document.getElementById('search-btn').click();
  }

  function findNodeByFuzzyName(q) {
    const n = q.toLowerCase();
    const nodes = repo.getNodes();
    return nodes.find(node => node.label.toLowerCase().includes(n) || node.id.toLowerCase().includes(n) || (node.aliases||[]).some(a=>a.toLowerCase().includes(n)));
  }
  function resolveEdgeLabel(q) {
    const syn = {implementation:'implements',implemented:'implements',definition:'defines',defined:'defines',proof:'proves',proven:'proves',formalization:'formalizes',formalized:'formalizes',measurement:'measures',measured:'measures',application:'applies',applied:'applies',introduction:'introduces',introduced:'introduces',protection:'protects',protected:'protects',evaluation:'evaluates',evaluated:'evaluates'};
    const n = q.toLowerCase();
    if (syn[n]) return syn[n];
    const edges = repo.getEdges();
    const known = [...new Set(edges.map(e=>e.type))];
    return known.find(l=>l.toLowerCase().includes(n)) || q;
  }

  return { switchView, onViewShown, init };
})();
window.addEventListener('DOMContentLoaded', () => {
  app.init().catch(error => {
    console.error(error);
    const message = document.querySelector('.landing-sub');
    message.setAttribute('role', 'alert');
    message.textContent = 'Workbench could not start. Extract the complete archive and reopen corpus.html. Details: ' + error.message;
  });
});