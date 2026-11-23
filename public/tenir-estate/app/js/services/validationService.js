var validationService = (function(){
  function validate(graph) {
    const concepts = graph.getNodes().filter(n=>n.type==='concept');
    const unsupported = concepts.filter(c => graph.incoming(c.id).filter(e=>graph.isArtifact(e.from)).length===0);
    const provenanceFails = graph.getNodes().filter(n=>n.type==='artifact' && !n.properties?.bundle);
    const typedEdges = graph.getEdges().every(e=>e.type);
    const evoTagged = 0;
    return {
      evidence: { unsupported, thin: [] },
      provenance: provenanceFails,
      typedEdges: typedEdges,
      evolution: { tagged: evoTagged, total: concepts.length+graph.getNodes().filter(n=>n.type==='artifact').length }
    };
  }
  return { validate };
})();