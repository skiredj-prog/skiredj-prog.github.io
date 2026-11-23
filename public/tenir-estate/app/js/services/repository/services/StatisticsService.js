var StatisticsService = (function() {
  'use strict';
  let stats = {};
  function compute(nodes, edges) {
    const concepts = nodes.filter(n => n.type === 'concept');
    const artifacts = nodes.filter(n => n.type === 'artifact');
    const unsupported = concepts.filter(c => {
      const supporters = edges.filter(e => e.to === c.id && nodes.find(n => n.id === e.from)?.type === 'artifact');
      return supporters.length === 0;
    });
    return {
      concepts: concepts.length,
      artifacts: artifacts.length,
      edges: edges.length,
      documents: artifacts.length,
      missingDocuments: artifacts.filter(a => a.properties?.bundle === false).length,
      orphanConcepts: unsupported.length,
      orphanArtifacts: 0,
      averageEvidenceDepth: '-'
    };
  }
  EventBus.subscribe(TENIREvents.KNOWLEDGE_LOADED, ({nodes, edges}) => {
    stats = compute(nodes, edges);
  });
  EventBus.subscribe(TENIREvents.KNOWLEDGE_UPDATED, ({stats: newStats}) => {
    if (newStats) stats = newStats;
  });
  return { compute, getStats: () => stats };
})();