var ImportService = (function() {
  'use strict';
  const plugins = {};
  const capabilityId = 'import';

  function registerPlugin(format, plugin) { plugins[format] = plugin; }

  async function importFile(file) {
    EventBus.publish(TENIREvents.IMPORT_STARTED, { fileName: file.name });
    const ext = file.name.split('.').pop().toLowerCase();
    const plugin = plugins[ext];
    if (!plugin) {
      EventBus.publish(TENIREvents.IMPORT_FAILED, { fileName: file.name, error: 'No importer for .'+ext });
      throw new Error('No importer for .'+ext);
    }
    try {
      const obj = await plugin.parse(file);
      EventBus.publish(TENIREvents.KNOWLEDGE_UPDATED, { action: 'add', object: obj });
      EventBus.publish(TENIREvents.IMPORT_COMPLETED, { fileName: file.name, knowledgeObject: obj });
      return obj;
    } catch(e) {
      EventBus.publish(TENIREvents.IMPORT_FAILED, { fileName: file.name, error: e.message });
      throw e;
    }
  }

  function initialize(eventBus) { /* no-op */ }
  function metadata() { return { id: capabilityId, name: 'Import' }; }
  function dispose() {}

  // built-in plugins
  registerPlugin('md', {
    parse: async function(file) {
      const text = await file.text();
      const title = file.name.replace(/\.md$/i,'');
      return KnowledgeObject.create({
        id: 'imported.'+Date.now(), type:'artifact', label:title,
        properties:{ format:'md', excerpt: text.slice(0,200), bundle:true, group:'imported' },
        status:'draft', version:'1'
      });
    }
  });
  registerPlugin('html', {
    parse: async function(file) {
      const text = await file.text();
      const title = file.name.replace(/\.html?$/i,'');
      const doc = new DOMParser().parseFromString(text,'text/html');
      const bodyText = doc.body ? doc.body.innerText : text;
      return KnowledgeObject.create({
        id: 'imported.'+Date.now(), type:'artifact', label:title,
        properties:{ format:'html', excerpt: bodyText.slice(0,200), bundle:true, group:'imported' },
        status:'draft', version:'1'
      });
    }
  });
  registerPlugin('json', {
    parse: async function(file) {
      const text = await file.text();
      const obj = JSON.parse(text);
      return KnowledgeObject.create({
        id: 'imported.'+Date.now(), type:'artifact', label: obj.title || file.name.replace(/\.json$/i,''),
        properties:{ format:'json', excerpt: JSON.stringify(obj).slice(0,200), bundle:true, group:'imported', raw: obj },
        status:'draft', version:'1'
      });
    }
  });

  return {
  id: capabilityId,
  capabilityId,
  registerPlugin,
  importFile,
  initialize,
  metadata,
  dispose
};
})();