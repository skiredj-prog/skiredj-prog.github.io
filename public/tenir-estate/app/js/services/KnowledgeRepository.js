var KnowledgeRepository = (function() {
  'use strict';
  let nodesMap = {};
  let nodesArray = [];
  let edgesArray = [];
  let ready = false;
  let cachedStats = null;
  let provenanceChecked = false;
  let provenanceChecking = false;

  async function initialize(manifestUrl) {
    console.log('Repository initializing…');
    const { manifest, data } = await RepositoryLoader.load(manifestUrl);
    const ontology = data.ontology;
    const corpus = data.corpus;

    const conceptNodes = KnowledgeObject.normalizeArray(ontology.nodes, { type: 'concept' });
    const artifactNodes = corpus.artifacts.map(a => KnowledgeObject.create({
      id: a.id, type: 'artifact', label: a.title,
      properties: {
        format: (a.path||'').split('.').pop().toLowerCase(),
        // Corpus paths are declared relative to documents/ (see README "Repository Structure").
        // bundle starts optimistic (true) — verifyProvenance() below checks it for real.
        url: a.path ? 'documents/' + a.path : '', excerpt: a.summary || '', bundle: true, bundleChecked: false,
        group: a.type || 'corpus', language: a.language, tags: a.tags || []
      },
      aliases: a.aliases || [], tags: a.tags || [],
      status: a.status || 'published', version: a.version || '',
      created: a.created || '', modified: a.modified || '',
      supersedes: a.supersedes || '', supersededBy: a.supersededBy || ''
    }));
    nodesArray = [...conceptNodes, ...artifactNodes];
    nodesMap = {};
    nodesArray.forEach(n => { nodesMap[n.id] = n; });
    edgesArray = ontology.edges.map(e => ({...e}));

    AliasResolver.build(nodesArray);
    SearchIndexer.build(nodesArray);
    EvidenceRepository.build(artifactNodes);
    cachedStats = StatisticsService.compute(nodesArray, edgesArray);

    ready = true;
    EventBus.publish(TENIREvents.KNOWLEDGE_LOADED, { nodes: nodesArray, edges: edgesArray });
    console.log('Repository ready');
    return true;
  }

  function getNode(id) {
    if (!ready) return null;
    const canonicalId = AliasResolver.resolve(id) || id;
    return nodesMap[canonicalId] || null;
  }
  function getNodes() { return nodesArray.slice(); }
  function getEdges() { return edgesArray.slice(); }
  function isConcept(id) { const n=getNode(id); return n && n.type==='concept'; }
  function isArtifact(id) { const n=getNode(id); return n && n.type==='artifact'; }
  function incoming(id) {
    const canonicalId = AliasResolver.resolve(id) || id;
    return edgesArray.filter(e => e.to === canonicalId);
  }
  function outgoing(id) {
    const canonicalId = AliasResolver.resolve(id) || id;
    return edgesArray.filter(e => e.from === canonicalId);
  }
  function neighbors(id) {
    const inc = incoming(id).map(e => e.from);
    const out = outgoing(id).map(e => e.to);
    return [...new Set([...inc, ...out])];
  }
  function search(query) { return SearchIndexer.search(query); }
  function statistics() { return cachedStats || StatisticsService.compute(nodesArray, edgesArray); }
  function documentPath(id) { return EvidenceRepository.getPath(id); }

  // Real provenance check: HEAD-fetches every artifact's declared path and
  // records whether it actually resolves, instead of trusting a hardcoded flag.
  // Requires serving over HTTP (fetch of local files fails under file://).
  async function verifyProvenance(force) {
    if (location.protocol === 'file:') return provenanceStatus();
    if (provenanceChecking) return null;
    if (provenanceChecked && !force) return provenanceStatus();
    provenanceChecking = true;
    const artifacts = nodesArray.filter(n => n.type === 'artifact' && n.properties && n.properties.url);
    await Promise.all(artifacts.map(async n => {
      let ok = false;
      try {
        const resp = await fetch(encodeURI(n.properties.url), { method: 'HEAD', cache: 'no-store' });
        ok = resp.ok;
      } catch (e) {
        ok = false;
      }
      n.properties.bundle = ok;
      n.properties.bundleChecked = true;
    }));
    provenanceChecked = true;
    provenanceChecking = false;
    cachedStats = StatisticsService.compute(nodesArray, edgesArray);
    const status = provenanceStatus();
    EventBus.publish(TENIREvents.PROVENANCE_CHECKED, status);
    return status;
  }
  function provenanceStatus() {
    const artifacts = nodesArray.filter(n => n.type === 'artifact');
    const broken = artifacts.filter(n => n.properties && n.properties.bundleChecked && n.properties.bundle === false);
    return { checked: provenanceChecked, checking: provenanceChecking, total: artifacts.length, broken };
  }

  EventBus.subscribe(TENIREvents.KNOWLEDGE_UPDATED, payload => {
    if (payload.action === 'add' && payload.object) {
      nodesArray.push(payload.object);
      nodesMap[payload.object.id] = payload.object;
      AliasResolver.build(nodesArray);
      SearchIndexer.build(nodesArray);
      if (payload.object.type === 'artifact') {
        EvidenceRepository.build(nodesArray.filter(n=>n.type==='artifact'));
      }
      cachedStats = StatisticsService.compute(nodesArray, edgesArray);
      EventBus.publish(TENIREvents.KNOWLEDGE_UPDATED, { stats: cachedStats });
    }
  });

  return { initialize, getNode, getNodes, getEdges, isConcept, isArtifact, incoming, outgoing, neighbors, search, statistics, documentPath, verifyProvenance, provenanceStatus };
})();