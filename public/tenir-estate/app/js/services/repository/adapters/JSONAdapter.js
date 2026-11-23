var JSONAdapter = (function() {
  'use strict';
  async function load(url) {
    if (location.protocol === 'file:') {
      const embedded = document.getElementById(url);
      if (!embedded) throw new Error('Missing packaged data: ' + url);
      return JSON.parse(embedded.textContent);
    }
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to load ' + url + ': ' + resp.status);
    return resp.json();
  }
  return { load };
})();