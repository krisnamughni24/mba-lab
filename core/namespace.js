/* MBA Lab core: global namespace, tiny event bus, DOM helpers and UI slots.
   Everything else (features, simulations, data) plugs into window.MBALAB. */
window.MBALAB = window.MBALAB || {};
MBALAB.data = MBALAB.data || {};       // content registries, see data/*.js
MBALAB.features = {};                  // feature id -> init function (registered by js/features/*)
MBALAB.actions = {};                   // data-action name -> handler(element, event)

const $ = id => document.getElementById(id);

(() => {
  const handlers = {};
  /* events: 'lang' (language changed), 'theme' (night/day changed), 'ready' (boot finished) */
  MBALAB.on = (name, fn) => { (handlers[name] = handlers[name] || []).push(fn); };
  MBALAB.emit = (name, ...args) => {
    (handlers[name] || []).slice().forEach(fn => {
      try { fn(...args); } catch (err) { console.error('[MBALAB] handler for "' + name + '" failed', err); }
    });
  };
  MBALAB.feature = (id, init) => { MBALAB.features[id] = init; };

  /* declarative actions: <button data-action="open-about"> runs MBALAB.actions['open-about'] */
  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest('[data-action]');
    const fn = el && MBALAB.actions[el.dataset.action];
    if (fn) { e.preventDefault(); fn(el, e); }
  });
})();

/* Where features put their UI. Order numbers keep the layout stable no matter which feature loads first. */
MBALAB.ui = {
  html(markup) {
    const tpl = document.createElement('template');
    tpl.innerHTML = markup.trim();
    return tpl.content.firstElementChild;
  },
  /* top navigation bar, right side */
  nav(el, order) {
    const host = $('navr');
    el.dataset.order = order;
    host.insertBefore(el, [...host.children].find(k => +k.dataset.order > order) || null);
  },
  /* floating button group, bottom left (Info, Share an Idea, ...) */
  fab(el, order) {
    let group = $('fab');
    if (!group) {
      group = MBALAB.ui.html('<div class="fab" id="fab" role="group" aria-label="Info"></div>');
      MBALAB.ui.floating(group);
    }
    el.dataset.order = order;
    group.insertBefore(el, [...group.children].find(k => +k.dataset.order > order) || null);
  },
  /* fixed-position widgets over the 3D scene */
  floating(el) { document.body.insertBefore(el, $('stage')); },
  /* modal windows */
  dialog(el) { document.body.insertBefore(el, $('app')); }
};
