var EventBus = (function() {
  'use strict';
  const listeners = {};
  function publish(topic, payload) {
    if (!listeners[topic]) return;
    listeners[topic].forEach(fn => {
      try { fn(payload); } catch(e) { console.error('EventBus error on ' + topic, e); }
    });
  }
  function subscribe(topic, fn) {
    if (!listeners[topic]) listeners[topic] = [];
    listeners[topic].push(fn);
    return () => unsubscribe(topic, fn);
  }
  function unsubscribe(topic, fn) {
    if (!listeners[topic]) return;
    listeners[topic] = listeners[topic].filter(f => f !== fn);
  }
  return { publish, subscribe, unsubscribe };
})();