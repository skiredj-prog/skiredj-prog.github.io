var EvidenceRepository = (function() {
  'use strict';
  let artifactsMap = {};
  function build(artifacts) {
    artifactsMap = {};
    artifacts.forEach(a => { artifactsMap[a.id] = a; });
  }
  function get(id) { return artifactsMap[id] || null; }
  function getPath(id) { const a = get(id); return a ? a.properties.url : null; }
  return { build, get, getPath };
})();