var AliasResolver = (function() {
  'use strict';
  let aliasMap = {};
  let reverseAlias = {};
  function build(nodes) {
    aliasMap = {};
    reverseAlias = {};
    nodes.forEach(n => {
      if (!n.aliases) n.aliases = [];
      aliasMap[n.id] = n.aliases.slice();
      const keys = [n.id, n.label, ...n.aliases];
      keys.forEach(k => {
        const key = k.toLowerCase();
        if (reverseAlias[key] && reverseAlias[key] !== n.id) {
          console.warn('Alias collision: "' + k + '"');
        } else {
          reverseAlias[key] = n.id;
        }
      });
    });
  }
  function resolve(id) {
    if (!id) return null;
    const key = id.toLowerCase();
    return reverseAlias[key] || null;
  }
  return { build, resolve };
})();