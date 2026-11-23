var analyzeView = (function(){
  function init() {
    const sl = { p:document.getElementById('sl-p'), k:document.getElementById('sl-k'), v:document.getElementById('sl-v') };
    function update() {
      const P=+sl.p.value, K=+sl.k.value, V=+sl.v.value, eps=0.1;
      document.getElementById('lbl-p').textContent = P.toFixed(1);
      document.getElementById('lbl-k').textContent = K.toFixed(1);
      document.getElementById('lbl-v').textContent = V.toFixed(1);
      const S = K/(P*V+eps);
      document.getElementById('s-val').textContent = S.toFixed(2);
      const postureEl = document.getElementById('s-posture');
      if (S>=1.5) { postureEl.textContent='NORMAL'; postureEl.className='s-posture p-normal'; }
      else if (S>=0.7) { postureEl.textContent='CAUTION'; postureEl.className='s-posture p-caution'; }
      else { postureEl.textContent='HOLDING-FIRST'; postureEl.className='s-posture p-holding'; }
    }
    Object.values(sl).forEach(s=>s.addEventListener('input', update));
    update();
  }
  return { init };
})();