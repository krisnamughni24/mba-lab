/* Language feature: popover menu next to the day/night switch. Languages come from data/languages.js. */
MBALAB.feature('language', () => {
  const langs = MBALAB.data.languages;
  const wrap = MBALAB.ui.html(
    '<div class="langw">' +
    '<button id="lang" class="pill" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="langMenu" data-ia="aria-label=langAria,title=langAria">' +
    '<span aria-hidden="true">🌐</span><span class="lb" id="langLb">EN</span></button>' +
    '<div class="langmenu" id="langMenu" role="menu" hidden>' +
    langs.map(l => '<button type="button" role="menuitemradio" aria-checked="' + (l.code === 'en') + '" data-lang="' + l.code + '" data-sfx="lang"><span class="lc">' + l.label + '</span>' + l.name + '</button>').join('') +
    '</div></div>');
  MBALAB.ui.nav(wrap, 40);

  const menu = $('langMenu'), button = $('lang');
  const setOpen = open => {
    menu.hidden = !open;
    button.setAttribute('aria-expanded', open);
    if (open) { const cur = menu.querySelector('[aria-checked="true"]'); cur && cur.focus(); }
  };

  button.onclick = e => { e.stopPropagation(); setOpen(menu.hidden); };
  menu.onclick = e => {
    const item = e.target.closest('[data-lang]');
    if (item) { MBALAB.i18n.set(item.dataset.lang); setOpen(false); button.focus(); }
  };
  menu.addEventListener('keydown', e => {
    const items = [...menu.querySelectorAll('[data-lang]')], i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  });
  document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('.langw')) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setOpen(false); button.focus(); } });

  MBALAB.on('lang', code => {
    const l = langs.find(x => x.code === code);
    $('langLb').textContent = l ? l.label : code.toUpperCase();
    menu.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-checked', b.dataset.lang === code));
  });
});
