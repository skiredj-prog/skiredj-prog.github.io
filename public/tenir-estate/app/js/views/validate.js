var validateView = (function(){
  function render(graph) {
    const v = validationService.validate(graph);
    const prov = graph.provenanceStatus ? graph.provenanceStatus() : { checked: true, checking: false };
    let provStatus, provDetail;
    if (prov.checking) {
      provStatus = 'warn';
      provDetail = 'Checking ' + prov.total + ' artifact path(s) against disk…';
    } else if (!prov.checked) {
      provStatus = 'warn';
      provDetail = location.protocol === 'file:' ? 'Local mode. Artifact links can be opened individually. Serve this folder over HTTP to check every link automatically.' : 'Not yet checked — click "Re-check provenance" (requires serving over HTTP).';
    } else {
      provStatus = v.provenance.length ? 'fail' : 'pass';
      provDetail = v.provenance.length
        ? v.provenance.length + '/' + prov.total + ' artifact(s) do not resolve: ' + v.provenance.map(a=>a.label).join(' · ')
        : 'All ' + prov.total + ' artifact paths verified against disk.';
    }
    const checks = [
      { status: v.evidence.unsupported.length?'fail':'pass', title:'Evidence Rule — every concept supported by ≥1 artifact',
        detail: v.evidence.unsupported.length ? v.evidence.unsupported.length+' unsupported: '+v.evidence.unsupported.map(z=>z.label).join(', ') : graph.getNodes().filter(n=>n.type==='concept').length+'/'+graph.getNodes().filter(n=>n.type==='concept').length+' concepts pass.' },
      { status: provStatus, title:'Provenance — every artifact URL resolves',
        detail: provDetail },
      { status: v.typedEdges?'pass':'fail', title:'Typed Relationships (P4) — no anonymous edges',
        detail: v.typedEdges ? graph.getEdges().length+'/'+graph.getEdges().length+' edges have a semantic label.' : 'Some edges missing type.' },
      { status:'warn', title:'Evolution Layer (P6, TGS §2)',
        detail: v.evolution.tagged+'/'+v.evolution.total+' nodes carry evolution metadata.' }
    ];
    document.getElementById('checks').innerHTML = checks.map(c => '<div class="check"><div class="check-head"><span class="check-status status-'+c.status+'">'+c.status.toUpperCase()+'</span><span class="check-title">'+c.title+'</span></div><div class="check-detail">'+c.detail+'</div></div>').join('');
  }
  function init(app, graph) {
    app.onViewShown('validate', () => {
      const status = graph.provenanceStatus ? graph.provenanceStatus() : {};
      if (graph.verifyProvenance && !status.checked && !status.checking) {
        graph.verifyProvenance(); // flips "checking" to true synchronously before its first await
      }
      render(graph);
    });
    if (typeof EventBus !== 'undefined') {
      EventBus.subscribe(TENIREvents.PROVENANCE_CHECKED, () => render(graph));
    }
    const btn = document.getElementById('btn-recheck-provenance');
    if (btn && location.protocol === 'file:') {
      btn.disabled = true;
      btn.textContent = 'Live file checks require a local HTTP server';
    }
    if (btn) {
      btn.addEventListener('click', () => {
        graph.verifyProvenance(true);
        render(graph);
      });
    }
  }
  return { init };
})();
