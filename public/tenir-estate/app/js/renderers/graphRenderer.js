// Explore Ontology renderer — two states instead of one hairball:
//   overview : concepts only, on level rings, with concept-to-concept relations
//   focus    : one concept, its related concepts, and its strongest evidence (the panel lists all of it)
// Artifacts never enter the overview; they appear only around the concept they evidence.
var graphRenderer = (function(){
  let network = null, nodes = null, edges = null, G = null, onClick = null, focused = null;
  const GOLD = '#f2b544', MAX_EVIDENCE = 14, BACK = '__back__', MORE = '__more__';
  const PALETTE = { corpus:'#5b93f5', application:'#ef6c62', ip:'#b18cf7', source:'#3fd39a', article:'#f2b544', document:'#7a8699' };
  const MONO = 'IBM Plex Mono, Consolas, Menlo, monospace';

  function shortLabel(n) {
    const s = n.label.replace(/\s*\(.*?\)\s*/g, '').trim() || n.label;
    if (s.length <= 15 || s.indexOf(' ') < 0) return s;
    const mid = s.length / 2; let cut = -1;
    for (let i = 0; i < s.length; i++) if (s[i] === ' ' && (cut < 0 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i;
    return s.slice(0, cut) + '\n' + s.slice(cut + 1);
  }
  function clip(s, n) { return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s; }
  function evidence(id) { return G.incoming(id).filter(e => G.isArtifact(e.from)); }
  function conceptLinks(id) {
    return G.incoming(id).filter(e => G.isConcept(e.from)).concat(G.outgoing(id).filter(e => G.isConcept(e.to)));
  }
  function conceptNode(n, x, y, dim) {
    const ev = evidence(n.id), count = ev.filter(e => e.type !== 'mentions').length, mentioned = ev.length - count;
    const lvl = n.properties.level || 1, draft = n.status === 'draft';
    return { id:n.id, x, y, fixed:true, shape:'dot', label:shortLabel(n),
      title:n.label + ' — ' + count + ' curated link' + (count === 1 ? '' : 's') + (mentioned ? ' · ' + mentioned + ' mention' + (mentioned === 1 ? '' : 's') : '') + (draft ? ' — draft' : ''),
      size: 7 + (4 - lvl) * 3 + Math.sqrt(count) * 1.5, borderWidth: draft ? 1.5 : 2.5,
      shapeProperties:{ borderDashes: draft ? [4, 3] : false }, opacity: dim ? 0.55 : 1,
      color:{ background: draft ? '#0a0e15' : '#241a06', border:GOLD, highlight:{ background:'#3a2a08', border:'#ffce6b' }, hover:{ background:'#3a2a08', border:'#ffce6b' } },
      font:{ color:GOLD, size: lvl === 1 ? 19 : 15, face:MONO, vadjust:2 } };
  }
  function relationEdge(e) {
    return { id:'r:' + e.id, from:e.from, to:e.to, label:e.type, arrows:{ to:{ enabled:true, scaleFactor:0.55 } },
      color:{ color:GOLD, opacity:0.55 }, width:1,
      font:{ color:'#8b96a8', size:9.5, face:MONO, strokeWidth:0, background:'rgba(9,12,18,0.9)' },
      smooth:{ type:'curvedCW', roundness:0.18 } };
  }

  function overview() {
    focused = null;
    const concepts = G.getNodes().filter(n => n.type === 'concept');
    const byLevel = {};
    concepts.forEach(c => { const l = c.properties.level || 1; (byLevel[l] = byLevel[l] || []).push(c); });
    const out = [];
    Object.keys(byLevel).sort().forEach((lvl, ringIndex) => {
      const ring = byLevel[lvl].sort((a, b) => ((a.tags || [])[0] || '').localeCompare((b.tags || [])[0] || '') || a.label.localeCompare(b.label));
      const n = ring.length, base = ringIndex === 0 ? 105 : 105 + ringIndex * 205;
      ring.forEach((c, i) => {
        const stagger = n > 12 ? (i % 2 ? 78 : -78) : 0;
        const a = -Math.PI / 2 + (2 * Math.PI * i) / n + ringIndex * 0.35;
        out.push(conceptNode(c, Math.cos(a) * (base + stagger) * 1.5, Math.sin(a) * (base + stagger), false));
      });
    });
    const ids = new Set(concepts.map(c => c.id));
    nodes.clear(); edges.clear();
    nodes.add(out);
    edges.add(G.getEdges().filter(e => ids.has(e.from) && ids.has(e.to)).map(relationEdge));
    network.fit({ animation:{ duration:350 } });
  }

  function rank(e) {
    const a = G.getNode(e.from), tags = (a && a.tags) || [];
    return [e.type === 'mentions' ? 1 : 0, (tags.includes('estate') || tags.includes('imported')) ? 1 : 0, a ? a.modified || '' : ''];
  }
  function focus(id, pinArtifact) {
    const c = G.getNode(id); if (!c) return;
    focused = c.id;
    const out = [conceptNode(c, 0, 0, false)], outEdges = [];
    out[0].size += 6; out[0].font = { color:GOLD, size:17, face:MONO, vadjust:4 };
    const links = conceptLinks(c.id), seen = new Set();
    const related = links.map(e => e.from === c.id ? e.to : e.from).filter(x => !seen.has(x) && seen.add(x));
    related.forEach((rid, i) => {
      const x = (i - (related.length - 1) / 2) * 230;
      out.push(conceptNode(G.getNode(rid), x, -330 - Math.abs(x) * 0.08, true));
    });
    links.forEach(e => outEdges.push(relationEdge(e)));
    let ev = evidence(c.id).slice().sort((p, q) => {
      const a = rank(p), b = rank(q);
      return a[0] - b[0] || a[1] - b[1] || (a[2] < b[2] ? 1 : a[2] > b[2] ? -1 : 0);
    });
    const total = ev.length;
    if (pinArtifact) ev = ev.filter(e => e.from === pinArtifact).concat(ev.filter(e => e.from !== pinArtifact));
    ev = ev.slice(0, MAX_EVIDENCE);
    const perSide = Math.ceil(ev.length / 2);
    ev.forEach((e, i) => {
      const a = G.getNode(e.from), right = i % 2 === 0, row = Math.floor(i / 2);
      const col = PALETTE[a.properties && a.properties.group] || PALETTE.document;
      out.push({ id:a.id, x:(right ? 1 : -1) * 440, y:(row - (perSide - 1) / 2) * 46 + 30, fixed:true, shape:'box', margin:8,
        label:clip(a.label, 29), title:a.label, widthConstraint:{ minimum:270, maximum:270 }, borderWidth:1.2,
        color:{ background:'#0e131c', border:col, highlight:{ background:'#161f30', border:col }, hover:{ background:'#161f30', border:col } },
        font:{ color:col, size:12, face:MONO, align:'left' } });
      outEdges.push({ id:'e:' + e.id, from:a.id, to:c.id, color:{ color:col, opacity: e.type === 'mentions' ? 0.18 : 0.35 }, width:1,
        label: e.type === 'mentions' ? undefined : e.type,
        font:{ color:'#8b96a8', size:9, face:MONO, strokeWidth:0, background:'rgba(9,12,18,0.9)' },
        smooth:{ type:'cubicBezier', forceDirection:'horizontal', roundness:0.55 } });
    });
    const bottom = ((perSide - 1) / 2) * 46 + 30 + 62;
    if (total > ev.length) out.push({ id:MORE, x:0, y:Math.max(bottom, 150), fixed:true, shape:'text',
      label:'+' + (total - ev.length) + ' more in the panel →', font:{ color:'#8b96a8', size:11, face:MONO } });
    out.push({ id:BACK, x:-555, y:-((perSide - 1) / 2) * 46 - 120, fixed:true, shape:'text', label:'← all concepts',
      font:{ color:'#8b96a8', size:12, face:MONO } });
    nodes.clear(); edges.clear(); nodes.add(out); edges.add(outEdges);
    network.fit({ animation:{ duration:350 } });
    if (pinArtifact) network.selectNodes([pinArtifact]); else network.selectNodes([c.id]);
  }

  function render(containerId, graph, onNodeClick) {
    G = graph; onClick = onNodeClick;
    if (network) { network.destroy(); network = null; }   // release the previous canvas and its resize listeners
    nodes = new vis.DataSet([]); edges = new vis.DataSet([]);
    network = new vis.Network(document.getElementById(containerId), { nodes, edges },
      { physics:false, interaction:{ hover:true, tooltipDelay:120 }, nodes:{ chosen:true } });
    network.on('click', p => {
      const id = p.nodes[0];
      if (!id || id === BACK) { if (focused) overview(); return; }
      if (id === MORE) { if (onClick) onClick(focused); return; }
      if (G.isConcept(id)) focus(id);
      if (onClick) onClick(id);
    });
    overview();
  }
  function focusNode(id, graph, onNodeClick) {
    if (!network) return;
    const n = (graph || G).getNode(id); if (!n) return;
    if (n.type === 'concept') focus(n.id);
    else {
      const first = G.outgoing(n.id).find(e => G.isConcept(e.to));
      if (first) focus(first.to, n.id);
    }
    const cb = onNodeClick || onClick; if (cb) cb(n.id);
  }
  return { render, focusNode };
})();
