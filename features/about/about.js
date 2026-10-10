/* About feature: the "About MBA Lab" window and its Info button. Content comes from data/about.js. */
MBALAB.feature('about', () => {
  const A = MBALAB.data.about, bind = MBALAB.i18n.bind;

  const dialog = MBALAB.ui.html(
    '<div class="ov" id="infoDlg" role="dialog" aria-modal="true" aria-labelledby="infoT"><div class="mw dlgw wide">' +
    '<div class="row" style="justify-content:space-between;margin:0"><h3 id="infoT"></h3>' +
    '<button type="button" data-close data-sfx="close" data-ia="aria-label=close">✕</button></div>' +
    '<p id="aboutIntro"></p>' +
    '<h4 id="aboutApproachH"></h4><p id="aboutApproach"></p>' +
    '<h4 id="aboutTopicsH"></h4><ul class="about-topics" id="aboutTopics"></ul>' +
    '<h4 id="aboutDevH"></h4><p class="devname"></p></div></div>');
  MBALAB.ui.dialog(dialog);
  MBALAB.overlay.register(dialog);

  bind($('infoT'), () => tr(A.title));
  bind($('aboutIntro'), () => tr(A.text));
  bind($('aboutApproachH'), () => tr(A.approachTitle));
  bind($('aboutApproach'), () => tr(A.approach));
  bind($('aboutTopicsH'), () => tr(A.topicsTitle));
  bind($('aboutDevH'), () => tr(A.developedBy));
  MBALAB.data.categories.forEach(c => { const li = document.createElement('li'); $('aboutTopics').appendChild(li); bind(li, () => tr(c.name)); });
  dialog.querySelector('.devname').textContent = A.developer;

  const button = MBALAB.ui.html(
    '<button id="btnInfo" type="button" aria-haspopup="dialog" data-action="open-about" data-sfx="open" data-ia="aria-label=infoAria,title=infoAria">' +
    '<span aria-hidden="true">ⓘ</span><span class="lb" data-i18n="infoLbl">Info</span></button>');
  MBALAB.ui.fab(button, 10);

  MBALAB.actions['open-about'] = () => MBALAB.overlay.open(dialog);
});
