var KnowledgeObject = (function() {
  'use strict';
  function create(base) {
    return Object.assign({
      id: '', type: '', label: '', version: '', created: '', modified: '',
      status: 'draft', supersedes: '', supersededBy: '', links: [], metadata: {},
      aliases: [], tags: []
    }, base);
  }
  function normalizeArray(arr, defaults) {
    return arr.map(item => create({ ...defaults, ...item }));
  }
  return { create, normalizeArray };
})();