var SchemaValidator = (function() {
  'use strict';
  function validateManifest(manifest) {
    if (!manifest || typeof manifest !== 'object') throw new Error('Manifest is not an object.');
    if (!manifest.sources || !Array.isArray(manifest.sources)) throw new Error('Manifest missing "sources" array.');
  }
  function validateOntology(data) {
    if (!data || !Array.isArray(data.nodes)) throw new Error('Ontology missing "nodes" array.');
    data.nodes.forEach((n,i) => {
      if (!n.id || !n.type || !n.label) throw new Error('Ontology node ' + i + ' missing required field.');
    });
    if (!Array.isArray(data.edges)) throw new Error('Ontology missing "edges" array.');
    data.edges.forEach((e,i) => {
      if (!e.from || !e.to || !e.type) throw new Error('Ontology edge ' + i + ' missing required field.');
    });
  }
  function validateCorpus(data) {
    if (!data || !Array.isArray(data.artifacts)) throw new Error('Corpus missing "artifacts" array.');
    data.artifacts.forEach((a,i) => {
      if (!a.id || !a.title || !a.path) throw new Error('Corpus artifact ' + i + ' missing required field.');
    });
  }
  return { validateManifest, validateOntology, validateCorpus };
})();