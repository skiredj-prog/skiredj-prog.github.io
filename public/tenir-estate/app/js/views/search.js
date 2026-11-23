var searchView = (function(){
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c])); }
  function init(app, graph) {
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');
    const resultsDiv = document.getElementById('search-results');
    function doSearch() {
      const q = input.value.trim();
      if (!q) { resultsDiv.innerHTML=''; return; }
      const results = searchService.search(graph, q);
      const info = SearchIndexer.info();
      if (!results.length) {
        resultsDiv.innerHTML = '<div class="detail-empty" style="margin-top:0">No artifact or concept contains ' +
          info.terms.map(t => '“' + esc(t) + '”').join(' or ') + '.' +
          (info.indexed ? '' : '<br><br>The full-text index (graph/search_index.js) is not loaded: only titles and excerpts were searched. Run build_search_index.py.') + '</div>';
        return;
      }
      const head = '<div class="r-count">' + results.length + (results.length === 60 ? '+' : '') + ' result' + (results.length === 1 ? '' : 's') +
        (info.partial ? ' — nothing contains every word; showing partial matches' : '') + '</div>';
      resultsDiv.innerHTML = head + results.map(r => {
        const hit = SearchIndexer.hit(r.id) || {};
        const family = (r.tags || []).find(t => /^\d\d_/.test(t));
        const kind = r.type === 'concept' ? 'CONCEPT' : (family ? family.replace(/_/g, ' ') : 'ARTIFACT');
        const url = r.properties && r.properties.url;
        const open = url ? '<a class="r-open" href="' + encodeURI(url).replace(/#/g, '%23') + '" target="_blank" rel="noopener">open ↗</a>' : '';
        const snippet = hit.snippet || (r.type === 'concept' ? 'concept node — see Explore Ontology' : 'no text indexed');
        return '<div class="result" data-id="'+esc(r.id)+'"><span class="r-title">'+esc(r.label)+'</span><span class="r-group">'+esc(kind)+'</span>'+open+
          '<div class="r-snippet">'+snippet+'</div></div>';
      }).join('');
      resultsDiv.querySelectorAll('.result').forEach(el => {
        el.addEventListener('click', ev => {
          if (ev.target.closest('.r-open')) return;
          app.switchView('explore');
          graphRenderer.focusNode(el.dataset.id, graph, id => detailRenderer.render(graph.getNode(id), graph));
        });
      });
    }
    btn.addEventListener('click', doSearch);
    function clearSearch() { input.value = ''; resultsDiv.innerHTML = ''; input.focus(); }
    const resetBtn = document.getElementById('search-reset');
    if (resetBtn) resetBtn.addEventListener('click', clearSearch);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSearch();
      else if (e.key === 'Escape') clearSearch();
    });
  }
  return { init };
})();
