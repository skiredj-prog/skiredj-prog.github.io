var landingView = (function(){
  function init(app) {
    const tiles = document.getElementById('landing-tiles');
    const tileData = [
      { view:'explore', glyph:'◎', name:'Explore Ontology', flow:'<b>uses</b> Graph, Concepts, Evidence<br><b>produces</b> a map of what supports what' },
      { view:'analyze', glyph:'△', name:'Analyze a System', flow:'<b>uses</b> Pressure / Capacity / Volatility<br><b>produces</b> a live S-reading + posture' },
      { view:'evolve', glyph:'↻', name:'Chronology', flow:'<b>uses</b> modified dates of pieces<br><b>produces</b> a chronology; concept lineage awaits the Evolution Layer (TGS §2)' },
      { view:'validate', glyph:'✓', name:'Validate Graph', flow:'<b>uses</b> Ontology, Rules, Provenance<br><b>produces</b> an integrity report' },
      { view:'publish', glyph:'▤', name:'Publish Projection', flow:'<b>uses</b> Concepts, Articles<br><b>produces</b> a portable brief' },
      { view:'search', glyph:'⌕', name:'Full-Text Search', flow:'<b>uses</b> full corpus index<br><b>produces</b> ranked matches' }
    ];
    tiles.innerHTML = tileData.map(t => '<div class="tile" data-view="'+t.view+'"><span class="t-glyph">'+t.glyph+'</span><div class="t-name">'+t.name+'</div><div class="t-flow">'+t.flow+'</div></div>').join('');
    tiles.querySelectorAll('.tile').forEach(el => el.addEventListener('click', ()=> app.switchView(el.dataset.view)));
  }
  return { init };
})();