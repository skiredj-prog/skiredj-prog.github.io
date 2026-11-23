var detailRenderer = (function(){
  // Public edition: corpus text is shown as text, never parsed as markup.
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const EMPTY = '<div class="detail-empty">Click a concept to open it.</div>';
  function close() {
    const panel = document.getElementById('detail-panel');
    panel.classList.remove('is-open'); panel.innerHTML = EMPTY;
  }
  function render(node, graph) {
    const panel = document.getElementById('detail-panel');
    panel.classList.add('is-open');
    let html = '<button type="button" class="detail-close" aria-label="Close details">Close ×</button>';
    if (!node) { panel.innerHTML = html + '<div class="detail-empty">Node not found.</div>'; panel.querySelector('.detail-close').addEventListener('click', close); return; }
    if (node.type === 'concept') {
      html += '<div class="detail-tag">ONTOLOGY CONCEPT · level ' + (node.properties.level||'—') + '</div>';
      html += '<p class="detail-title">' + esc(node.label) + '</p>';
      const manifest = graph.incoming(node.id).filter(e=>graph.isArtifact(e.from));
      const related = graph.incoming(node.id).filter(e=>graph.isConcept(e.from)).concat(graph.outgoing(node.id).filter(e=>graph.isConcept(e.to)));
      if (manifest.length) {
        html += '<div class="detail-section-h">MANIFESTED IN ('+manifest.length+')</div>';
        manifest.forEach(e => { const src=graph.getNode(e.from); html += '<div class="rel-row"><span>'+esc(src.label)+'</span><span class="r-label">'+esc(e.type)+'</span></div>'; });
        const withExcerpt = manifest.map(e=>graph.getNode(e.from)).find(a=>a.properties?.excerpt);
        if (withExcerpt) {
          html += '<div class="detail-section-h">READING — from "'+esc(withExcerpt.label)+'"</div>';
          html += '<div class="detail-excerpt">'+esc(withExcerpt.properties.excerpt)+'</div>';
        }
      } else {
        html += '<div class="detail-section-h" style="color:#ef6c62">NO SUPPORTING ARTIFACT</div>';
      }
      if (related.length) {
        html += '<div class="detail-section-h">RELATED CONCEPTS</div>';
        related.forEach(e => { const other = graph.getNode(e.from===node.id?e.to:e.from); html += '<div class="rel-row"><span>'+esc(other.label)+'</span><span class="r-label">'+esc(e.type)+'</span></div>'; });
      }
    } else {
      html += '<div class="detail-tag">ARCHIVE ARTIFACT · '+esc(node.properties.format||'unknown')+'</div>';
      html += '<p class="detail-title">'+esc(node.label)+'</p>';
      html += '<div class="detail-path">'+esc(node.properties.url||'—')+'</div>';
      html += node.properties.bundle ? '<span class="badge-ok">present in bundle</span>' : '<span class="badge-warn">⚠ not found</span>';
      if (node.properties.excerpt) {
        html += '<div class="detail-section-h">EXCERPT</div><div class="detail-excerpt">'+esc(node.properties.excerpt)+'</div>';
      } else {
        html += '<div class="detail-section-h">EXCERPT</div><div class="detail-empty" style="margin-top:0">No excerpt indexed.</div>';
      }
      const outEdges = graph.outgoing(node.id);
      if (outEdges.length) {
        html += '<div class="detail-section-h">ACTS ON</div>';
        outEdges.forEach(e => { const t = graph.getNode(e.to); html += '<div class="rel-row"><span>'+esc(t.label)+'</span><span class="r-label">'+esc(e.type)+'</span></div>'; });
      }
    }
    panel.innerHTML = html;
    panel.querySelector('.detail-close').addEventListener('click', close);
  }
  return { render, close };
})();