/* Overlay manager: modal windows (catalog, About, Share an Idea, ...).
   A window registers itself once; the manager handles open/close, backdrop click, Escape, Tab focus trap
   and restoring focus. Any [data-close] button inside a registered window closes it. */
(() => {
  const list = [];
  let lastFocus = null;

  const isOpen = () => list.some(o => o.classList.contains('on'));
  const open = el => {
    lastFocus = document.activeElement;
    list.forEach(o => o.classList.remove('on'));
    el.classList.add('on');
    document.body.classList.add('modal-open');
    const first = el.querySelector('[data-close]');
    first && first.focus();
  };
  const close = () => {
    if (!isOpen()) return;
    list.forEach(o => o.classList.remove('on'));
    document.body.classList.remove('modal-open');
    lastFocus && lastFocus.focus && lastFocus.focus();
  };
  const register = el => {
    if (list.includes(el)) return;
    list.push(el);
    el.addEventListener('click', e => { if (e.target === el) close(); });
  };

  document.addEventListener('click', e => {
    const btn = e.target.closest && e.target.closest('[data-close]');
    if (btn && list.some(o => o.contains(btn))) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    if (e.key !== 'Tab') return;
    const ov = list.find(o => o.classList.contains('on'));
    if (!ov) return;
    const f = [...ov.querySelectorAll('button,input,select,textarea,a[href]')].filter(x => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  });

  MBALAB.overlay = { register, open, close, isOpen };
})();
