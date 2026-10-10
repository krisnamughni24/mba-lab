/* Catalog feature: the "Choose a simulation" window. Entirely driven by data/categories.js and data/simulations.js. */
MBALAB.feature('catalog', () => {
  const { categories, simulations } = MBALAB.data;

  const modal = MBALAB.ui.html(
    '<div id="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mw">' +
    '<div class="row" style="justify-content:space-between;margin:0"><h3 id="mtitle" data-i18n="catTitle">Choose a simulation</h3>' +
    '<button id="mclose" type="button" data-close data-sfx="close" data-ia="aria-label=catClose">✕</button></div>' +
    '<p class="note" id="mcount"></p><div class="chips" id="chips" role="group" data-ia="aria-label=filterLbl"></div><div class="sg" id="sg"></div></div></div>');
  MBALAB.ui.dialog(modal);
  MBALAB.overlay.register(modal);

  let filter = 'all';
  const catName = id => { const c = categories.find(x => x.id === id); return c ? tr(c.name) : ''; };

  const card = s => {
    const live = s.status === 'live';
    const head = '<span class="bd">' + t(live ? 'live' : 'soon') + '</span><b><span aria-hidden="true">' + s.icon + '</span> ' + tr(s.name) + '</b>' +
      '<span class="cat">' + catName(s.category) + '</span><span class="note">' + tr(s.description) + '</span>';
    return live
      ? '<div class="sim live">' + head + '<button type="button" data-action="open-sim" data-sim="' + s.id + '" data-sfx="open">' + t('open') + '</button></div>'
      : '<div class="sim soon" aria-disabled="true">' + head + '</div>';
  };

  const render = () => {
    const live = simulations.filter(s => s.status === 'live').length;
    $('mcount').textContent = t('count', { l: live, s: simulations.length - live });
    $('chips').innerHTML = [{ id: 'all' }, ...categories].map(c =>
      '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === filter) + '">' + (c.id === 'all' ? t('all') : tr(c.name)) + '</button>').join('');
    $('sg').innerHTML = simulations.filter(s => filter === 'all' || s.category === filter).map(card).join('');
  };

  $('chips').onclick = e => {
    const chip = e.target.closest('[data-cat]');
    if (!chip) return;
    filter = chip.dataset.cat;
    render();
    const active = $('chips').querySelector('[aria-pressed="true"]');
    active && active.focus();
  };

  MBALAB.actions['open-catalog'] = () => MBALAB.overlay.open(modal);
  MBALAB.on('lang', render);
  render();
});
