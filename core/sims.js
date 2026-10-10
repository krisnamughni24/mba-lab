/* Simulation host: loads simulations on demand (microsite style) and shows one at a time inside #app.

   A simulation is a folder under simulations/<id>/ listed in data/simulations.js. Its files (strings, template,
   app code, styles) are only downloaded the first time it is opened. Each file registers its part with
       MBALAB.sims.define('<id>', { strings, template, mount(host), onShow(host), onHide(), onLang(), onTheme(day) })
   Parts from several files are merged. See docs/ADDING-A-SIMULATION.md. */
(() => {
  const impl = {};        // id -> merged implementation
  const loading = {};     // id -> load promise
  const stash = {};       // id -> DocumentFragment holding a simulation's DOM while another one is shown
  const mounted = {};
  let owner = null;       // id of the simulation whose DOM is currently inside #app

  const manifest = id => (MBALAB.data.simulations || []).find(s => s.id === id);
  const host = () => $('app');
  const current = () => (owner && host().classList.contains('on')) ? impl[owner] : null;

  const define = (id, part) => {
    const target = impl[id] || (impl[id] = {});
    if (part.strings) MBALAB.i18n.add(part.strings);
    Object.assign(target, part);
  };

  const load = id => loading[id] || (loading[id] = (async () => {
    const m = manifest(id);
    if (!m || m.status !== 'live') throw new Error('Simulation "' + id + '" is not available');
    const base = m.path || ('simulations/' + id + '/');
    await Promise.all([
      MBALAB.load.styles((m.styles || []).map(s => base + s)),
      MBALAB.load.scripts((m.scripts || []).map(s => base + s))
    ]);
  })().catch(err => { delete loading[id]; throw err; }));

  const showError = () => {
    const h = host();
    h.innerHTML = '<main><section><p class="warn" role="alert">' + t('simLoadError') + '</p><button type="button" data-sim-back>' + t('simBack') + '</button></section></main>';
    owner = null;
  };

  const open = async id => {
    MBALAB.overlay.close();
    const h = host();
    try { await load(id); } catch (err) { console.error('[MBALAB]', err); showError(); show(); return; }
    const sim = impl[id];
    if (owner && owner !== id) {                       // park the previous simulation's DOM
      const frag = document.createDocumentFragment();
      while (h.firstChild) frag.appendChild(h.firstChild);
      stash[owner] = frag;
      owner = null;
    }
    if (owner !== id) {
      if (stash[id]) { h.textContent = ''; h.appendChild(stash[id]); delete stash[id]; }
      else { h.innerHTML = sim.template || ''; }
      owner = id;
      MBALAB.i18n.apply(h);
      if (!mounted[id]) { mounted[id] = true; sim.mount && sim.mount(h); }
    } else {
      MBALAB.i18n.apply(h);                            // language may have changed while it was hidden
    }
    show();
    if (sim.onShow) sim.onShow(h);
  };

  const show = () => {
    document.body.classList.add('inapp');
    $('landing').classList.add('off');
    host().classList.add('on');
  };

  const close = () => {
    const sim = current();
    host().classList.remove('on');
    $('landing').classList.remove('off');
    document.body.classList.remove('inapp');
    if (sim && sim.onHide) sim.onHide();
  };

  MBALAB.sims = { define, open, close, manifest, isOpen: () => host().classList.contains('on') };
  MBALAB.actions['open-sim'] = el => open(el.dataset.sim);

  /* back buttons inside a simulation, and the brand link in the top bar */
  document.addEventListener('click', e => {
    if (e.target.closest && e.target.closest('[data-sim-back]')) close();
  });
  const brand = $('brand');
  brand && brand.addEventListener('click', e => { e.preventDefault(); if (MBALAB.sims.isOpen()) close(); });

  MBALAB.on('lang', () => { const s = current(); s && s.onLang && s.onLang(); });
  MBALAB.on('theme', day => { const s = current(); s && s.onTheme && s.onTheme(day); });
})();
