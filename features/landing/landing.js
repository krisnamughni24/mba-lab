/* Landing feature: hero section (copy from data/landing.js) and pointer effects. */
MBALAB.feature('landing', () => {
  const H = MBALAB.data.landing, bind = MBALAB.i18n.bind;
  const L = $('landing');
  const hero = MBALAB.ui.html(
    '<div class="hero"><span class="tag"></span><h1></h1><p></p>' +
    '<button class="cta" id="explore" type="button" data-action="open-catalog" data-sfx="open"></button></div>');
  L.appendChild(hero);
  bind(hero.querySelector('.tag'), () => tr(H.tag));
  bind(hero.querySelector('h1'), () => tr(H.title));
  bind(hero.querySelector('p'), () => tr(H.text));
  bind(hero.querySelector('.cta'), () => tr(H.cta));

  /* gentle parallax of the scene following the pointer */
  L.addEventListener('mousemove', e => {
    const r = L.getBoundingClientRect();
    L.style.setProperty('--mx', (e.clientX - r.left) / r.width - .5);
    L.style.setProperty('--my', (e.clientY - r.top) / r.height - .5);
  });
  L.addEventListener('mouseleave', () => { L.style.setProperty('--mx', 0); L.style.setProperty('--my', 0); });

  /* 3D tilt on simulation cards */
  const CARD = '.feat div,.sim';
  document.addEventListener('mousemove', e => {
    const el = e.target.closest && e.target.closest(CARD);
    if (!el) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = 'perspective(600px) rotateY(' + (x * 14) + 'deg) rotateX(' + (-y * 14) + 'deg) translateY(-4px)';
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest && e.target.closest(CARD);
    if (el && !el.contains(e.relatedTarget)) el.style.transform = '';
  });
});
