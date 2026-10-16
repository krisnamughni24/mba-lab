/* About feature: the "About MBA Lab" window and its Info button. Content comes from data/about.js. */
MBALAB.feature('about', () => {
  const A = MBALAB.data.about, bind = MBALAB.i18n.bind;

  const dialog = MBALAB.ui.html(
    '<div class="ov" id="infoDlg" role="dialog" aria-modal="true" aria-labelledby="infoT"><div class="mw dlgw wide">' +
    '<div class="row" style="justify-content:space-between;margin:0"><h3 id="infoT"></h3>' +
    '<button type="button" data-close data-sfx="close" data-ia="aria-label=close">✕</button></div>' +
    '<div class="about-brand"><img src="assets/logo/icon.svg" alt="" width="44" height="44"><b id="aboutTag"></b></div><p id="aboutIntro"></p>' +
    '<h4 id="aboutApproachH"></h4><p id="aboutApproach"></p>' +
    '<h4 id="aboutTopicsH"></h4><ul class="about-topics" id="aboutTopics"></ul>' +
    '<h4 id="aboutDevH"></h4><ul class="devlist" id="aboutDevs"></ul></div></div>');
  MBALAB.ui.dialog(dialog);
  MBALAB.overlay.register(dialog);

  bind($('infoT'), () => tr(A.title));
  bind($('aboutIntro'), () => tr(A.text));
  bind($('aboutApproachH'), () => tr(A.approachTitle));
  bind($('aboutApproach'), () => tr(A.approach));
  bind($('aboutTopicsH'), () => tr(A.topicsTitle));
  bind($('aboutTag'), () => tr(MBALAB.data.landing.tag));
  bind($('aboutDevH'), () => tr(A.developedBy));
  MBALAB.data.categories.forEach(c => { const li = document.createElement('li'); $('aboutTopics').appendChild(li); bind(li, () => tr(c.name)); });
  /* Credits are built from the catalog: every distinct "developer" in data/simulations.js appears here with the simulations it built.
     Simulations without their own "developer" belong to the main developer (data/about.js). A new name added to a simulation shows up automatically. */
  const credits = () => {
    const by = new Map(), add = (name, sim) => { if (!by.has(name)) by.set(name, []); if (sim) by.get(name).push(sim); };
    add(A.developer);
    (MBALAB.data.simulations || []).filter(s => s.status === 'live').forEach(s => add(s.developer ? tr(s.developer) : A.developer, s));
    return [...by].map(([name, sims]) => ({ name, sims: sims.map(s => tr(s.name)) }));
  };
  const paintCredits = () => {
    const ul = $('aboutDevs'); ul.textContent = '';
    credits().forEach(c => {
      const li = document.createElement('li'), b = document.createElement('b'), sp = document.createElement('span');
      b.textContent = c.name; sp.textContent = c.sims.join(' · ');
      li.append(b, sp); ul.appendChild(li);
    });
  };
  paintCredits(); MBALAB.on('lang', paintCredits);

  const button = MBALAB.ui.html(
    '<button id="btnInfo" type="button" aria-haspopup="dialog" data-action="open-about" data-sfx="open" data-ia="aria-label=infoAria,title=infoAria">' +
    '<span aria-hidden="true">ⓘ</span><span class="lb" data-i18n="infoLbl">Info</span></button>');
  MBALAB.ui.fab(button, 10);

  MBALAB.actions['open-about'] = () => MBALAB.overlay.open(dialog);
});
