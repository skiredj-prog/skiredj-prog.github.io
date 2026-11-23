var CapabilityRegistry = (function() {
  'use strict';
  const capabilities = {};
  async function register(capability) {
    if (!capability.id) throw new Error('Capability must have an id');
    if (capabilities[capability.id]) throw new Error('Capability "' + capability.id + '" already registered');
    capabilities[capability.id] = capability;
    if (capability.initialize) await capability.initialize(EventBus);
    EventBus.publish(TENIREvents.CAPABILITY_LOADED, { id: capability.id, metadata: capability.metadata ? capability.metadata() : {} });
  }
  function get(id) { return capabilities[id] || null; }
  function list() { return Object.values(capabilities); }
  async function disposeAll() {
    for (const cap of Object.values(capabilities)) {
      if (cap.dispose) await cap.dispose();
    }
  }
  return { register, get, list, disposeAll };
})();