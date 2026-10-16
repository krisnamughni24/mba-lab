/* Catalog feature: the "Choose a simulation" window. Entirely driven by data/categories.js and data/simulations.js. */
MBALAB.feature('catalog', () => {
  const { categories, simulations } = MBALAB.data;

  const modal = MBALAB.ui.html(
    '<div id="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mw">' +
    '<div class="row" style="justify-content:space-between;margin:0"><h3 id="mtitle" data-i18n="catTitle">Choose a simulation</h3>' +
    '<button id="mclose" type="button" data-close data-sfx="close" data-ia="aria-label=catClose">✕</button></div>' +
    '<p class="note"><span id="mcount"></span> <span id="mshow" class="mshow"></span></p><input type="search" id="msearch" class="msearch" autocomplete="off" data-ia="placeholder=search,aria-label=search"><div class="cbody"><aside class="filters" id="chips" role="group" data-ia="aria-label=filterLbl"></aside><div class="sg" id="sg"></div></div></div></div>');
  MBALAB.ui.dialog(modal);
  MBALAB.overlay.register(modal);

  /* three independent filters: UI template type, topic (category), status */
  const TYPES = ['game', 'scenario', 'explorer', 'calculator', 'exam'];
  const F = { type: 'all', cat: 'all', status: 'all', q: '' };
  const norm = x => String(x || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const hay = s => norm(['name', 'description'].map(k => Object.values(s[k] || {}).join(' ')).join(' ') + ' ' + s.id.replace(/-/g, ' ') + ' ' + catName(s.category));
  const catName = id => { const c = categories.find(x => x.id === id); return c ? tr(c.name) : ''; };

  const card = s => {
    const live = s.status === 'live';
    const th = s.thumb || (MBALAB.thumbs && MBALAB.thumbs[s.id]) || '<svg viewBox="0 0 200 100" aria-hidden="true"><text class="em" x="100" y="68" text-anchor="middle">' + s.icon + '</text></svg>';
    const head = '<div class="tb" aria-hidden="true">' + th + '</div><span class="bd">' + t(live ? 'live' : 'soon') + '</span><b title="' + tr(s.name).replace(/"/g, '&quot;') + '"><span aria-hidden="true">' + s.icon + '</span> ' + tr(s.name) + '</b>' +
      '<span class="cat">' + catName(s.category) + '</span><span class="note">' + tr(s.description) + '</span>';
    /* footer row: the Open button is always pinned bottom-left of the square; the developer text sits beside it */
    const A = MBALAB.data.about || {};
    const dev = s.developer ? tr(s.developer) : (A.developer || '');   // just the name; the Info window explains who built what
    const by = dev ? '<span class="by">' + dev + '</span>' : '';
    return live
      ? '<div class="sim live">' + (MBALAB.passport && MBALAB.passport.done(s.id) ? '<span class="stamp" title="MBA insight">🎓</span>' : '') + head + '<div class="ft"><button type="button" data-action="open-sim" data-sim="' + s.id + '" data-sfx="open">' + t('open') + '</button>' + by + '</div></div>'
      : '<div class="sim soon" aria-disabled="true">' + head + '</div>';   // coming soon: no developer line yet
  };

  /* marketplace-style facet: a collapsible group in the left column; every option shows how many simulations it would give */
  const OPEN = { type: true, cat: true, status: true };
  const matches = (s, skip) => (!F.q || F.q.split(/\s+/).every(w => hay(s).includes(w))) && (skip === 'type' || F.type === 'all' || s.template === F.type) && (skip === 'cat' || F.cat === 'all' || s.category === F.cat) && (skip === 'status' || F.status === 'all' || s.status === F.status);
  const group = (key, label, opts) => '<details class="fg" data-g="' + key + '"' + (OPEN[key] ? ' open' : '') + '><summary class="fl">' + label + '</summary><div class="fo">' +
    opts.map(o => {
      const n = simulations.filter(s => matches(s, key) && (o.id === 'all' || (key === 'type' ? s.template : key === 'cat' ? s.category : s.status) === o.id)).length;
      return '<button type="button" class="chip" data-f="' + key + '" data-v="' + o.id + '" aria-pressed="' + (F[key] === o.id) + '"><span>' + o.label + '</span><em>' + n + '</em></button>';
    }).join('') + '</div></details>';

  const render = () => {
    const live = simulations.filter(s => s.status === 'live').length;
    $('mcount').textContent = t('count', { l: live, s: simulations.length - live });
    const all = { id: 'all', label: t('all') };
    $('chips').innerHTML =
      group('type', t('fType'), [all, ...TYPES.map(x => ({ id: x, label: t('tpl_' + x) }))]) +
      group('cat', t('fTopic'), [all, ...categories.map(c => ({ id: c.id, label: tr(c.name) }))]) +
      group('status', t('fStatus'), [all, { id: 'live', label: t('live') }, { id: 'soon', label: t('soon') }]);
    /* live simulations first, then A to Z by the name in the current language */
    const byName = (a, b) => tr(a.name).localeCompare(tr(b.name), MBALAB.i18n.get(), { sensitivity: 'base' });
    const ordered = simulations
      .filter(s => matches(s))
      .sort((a, b) => ((b.status === 'live') - (a.status === 'live')) || byName(a, b));
    const filtered = F.q || F.type !== 'all' || F.cat !== 'all' || F.status !== 'all';
    $('mshow').textContent = filtered ? t('showing', { n: ordered.length }) : '';
    $('sg').innerHTML = ordered.length ? ordered.map(card).join('')
      : '<div class="nomatch"><p>' + t('noMatch') + '</p><button type="button" class="chip" data-f="reset">' + t('reset') + '</button></div>';
  };

  $('msearch').oninput = e => { F.q = norm(e.target.value).trim(); render(); };
  $('chips').addEventListener('toggle', e => { const d = e.target.closest && e.target.closest('details[data-g]'); if (d) OPEN[d.dataset.g] = d.open; }, true);
  $('chips').onclick = e => {
    const chip = e.target.closest('button[data-f]');
    if (!chip) return;
    if (chip.dataset.f === 'reset') F.type = F.cat = F.status = 'all', F.q = '', $('msearch').value = ''; else F[chip.dataset.f] = chip.dataset.v;
    render();
    const again = chip.dataset.f === 'reset' ? null : $('chips').querySelector('[data-f="' + chip.dataset.f + '"][data-v="' + chip.dataset.v + '"]');
    again && again.focus();
  };
  $('sg').onclick = e => { if (e.target.closest('[data-f="reset"]')) { F.type = F.cat = F.status = 'all', F.q = '', $('msearch').value = ''; render(); } };

  MBALAB.actions['open-catalog'] = () => MBALAB.overlay.open(modal);
  MBALAB.on('lang', render); MBALAB.on('passport', render);
  render();
});
