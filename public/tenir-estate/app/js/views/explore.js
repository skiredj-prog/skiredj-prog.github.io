var exploreView = (function(){
  function init(app, graph) {
    app.onViewShown('explore', () => {
      graphRenderer.render('graph-canvas', graph, id => detailRenderer.render(graph.getNode(id), graph));
    });
  }
  return { init };
})();