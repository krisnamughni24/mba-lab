/* Simulation host: loads simulations on demand (microsite style) and shows one at a time inside #app.

   A simulation is a folder under simulations/<id>/ listed in data/simulations.js. Its files (strings, template,
   app code, styles) are only downloaded the first time it is opened. Each file registers its part with
       MBALAB.sims.define('<id>', { strings, template, mount(host), onShow(host), onHide(), onLang(), onTheme(day) })
   Parts from several files are merged. See docs/ADDING-A-SIMULATION.md. */
(() => {
  const LOAD_MS = 6000;   // fixed duration of the loading screen (milliseconds)
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

  const load = (id, onEach) => loading[id] || (loading[id] = (async () => {
    const m = manifest(id);
    if (!m || m.status !== 'live') throw new Error('Simulation "' + id + '" is not available');
    const base = m.path || ('simulations/' + id + '/');
    await Promise.all([
      MBALAB.load.styles((m.styles || []).map(x => base + x), onEach),
      MBALAB.load.scripts((m.scripts || []).map(x => base + x), onEach)
    ]);
  })().catch(err => { delete loading[id]; throw err; }));

  /* Loading screen: real file progress, fixed duration (LOAD_MS) so every text can be read (name, percentage, developer) */
  let screen = null;
  const buildScreen = () => {
    screen = document.createElement('div');
    screen.className = 'simload'; screen.id = 'simload'; screen.hidden = true;
    screen.setAttribute('role', 'status'); screen.setAttribute('aria-live', 'polite');
    screen.innerHTML = '<div class="sl-box"><div class="sl-logo" aria-hidden="true">&#9670;</div><div class="sl-brand">MBA Lab</div>' +
      '<div class="sl-title" id="slTitle"></div><div class="sl-name" id="slName"></div>' +
      '<div class="sl-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i id="slFill"></i></div>' +
      '<div class="sl-pct" id="slPct">0%</div><div class="sl-dev" id="slDev"></div></div>';
    document.body.appendChild(screen);
  };
  const withLoader = async (id, minMs) => {
    if (!screen) buildScreen();
    const m = manifest(id), A = (MBALAB.data && MBALAB.data.about) || {};
    $('slTitle').textContent = t('loadingT');
    $('slName').textContent = m ? tr(m.name) : '';
    $('slDev').textContent = (A.developedBy ? tr(A.developedBy) + ' ' : '') + (A.developer || '');
    const fill = $('slFill'), pct = $('slPct'), bar = screen.querySelector('.sl-bar');
    let total = m ? ((m.scripts || []).length + (m.styles || []).length) || 1 : 1, got = 0, ready = false, failed = null;
    const shown = { v: 0 }, t0 = performance.now();
    const set = v => { const p = Math.round(v); fill.style.width = p + '%'; pct.textContent = p + '%'; bar.setAttribute('aria-valuenow', p); };
    MBALAB.audio && MBALAB.audio.loadStart && MBALAB.audio.loadStart(minMs);
    set(0); screen.hidden = false; void screen.offsetWidth; screen.classList.add('on');
    const work = load(id, () => { got++; }).then(() => { ready = true; }, e => { failed = e; ready = true; });
    await new Promise(res => {
      const tick = now => {
        const timePart = Math.min(1, (now - t0) / minMs) * 100;
        const filePart = ready ? 100 : Math.min(90, got / total * 90);
        const target = Math.min(timePart, filePart);
        shown.v += (target - shown.v) * 0.18 + 0.15;
        if (shown.v > target) shown.v = target;
        set(shown.v);
        if (ready && shown.v >= 99.5) { set(100); res(); return; }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await work;
    MBALAB.audio && MBALAB.audio.loadEnd && MBALAB.audio.loadEnd(!!failed);
    await new Promise(r => setTimeout(r, 180));        // let the 100% register
    return { hide() { screen.classList.remove('on'); setTimeout(() => { screen.hidden = true; }, 300); }, failed };
  };

  const showError = () => {
    const h = host();
    h.innerHTML = '<main><section><p class="warn" role="alert">' + t('simLoadError') + '</p><button type="button" data-sim-back>' + t('simBack') + '</button></section></main>';
    owner = null;
  };

  const open = async id => {
    MBALAB.overlay.close();
    const h = host();
    const L = await withLoader(id, LOAD_MS);
    if (L.failed) { console.error('[MBALAB]', L.failed); showError(); show(); L.hide(); return; }
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
    L.hide();
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
