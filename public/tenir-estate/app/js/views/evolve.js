var evolveView = (function(){
  // Chronology of the pieces by modified date. Concepts carry no evolution metadata yet,
  // so this orders pieces, not the lineage of a concept.
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c])); }
  function init(app, graph) {
    app.onViewShown('evolve', () => {
      const all = graph.getNodes().filter(n => graph.isArtifact(n.id));
      const dated = all.filter(n => /^\d{4}-\d{2}-\d{2}/.test(n.modified || ''));
      dated.sort((a, b) => (a.modified < b.modified ? 1 : a.modified > b.modified ? -1 : 0));
      const byMonth = {};
      dated.forEach(p => { const m = p.modified.slice(0, 7); (byMonth[m] = byMonth[m] || []).push(p); });
      const gap = document.getElementById('evo-gap');
      gap.style.borderColor = 'var(--border)'; gap.style.background = 'transparent'; gap.style.color = 'var(--dim)';
      gap.innerHTML = 'Chronology of ' + dated.length + ' of ' + all.length +
        ' pieces, by modified date. File dates can reflect a copy rather than the date of writing.';
      document.getElementById('evo-levels').innerHTML = Object.keys(byMonth).sort().reverse().map(m => {
        const parts = m.split('-'), list = byMonth[m];
        return '<div class="evo-level"><h4>' + MONTHS[+parts[1] - 1] + ' ' + parts[0] + ' — ' + list.length +
          ' piece' + (list.length === 1 ? '' : 's') + '</h4>' +
          list.map(p => '<span class="evo-item">' + esc(p.label) + ' <span style="color:var(--dim)">' + esc(p.modified.slice(0, 10)) + '</span></span>').join('') +
          '</div>';
      }).join('');
    });
  }
  return { init };
})();
