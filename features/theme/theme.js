/* Theme feature: night / day switch and pause / play for the city animation. */
MBALAB.feature('theme', () => {
  const pause = MBALAB.ui.html(
    '<button id="mo" class="pill" type="button" aria-label="Pause city animation" data-ia="title=motionTitle">' +
    '<span id="moi" aria-hidden="true">⏸</span><span class="lb" id="mol">Pause</span></button>');
  const sw = MBALAB.ui.html(
    '<button id="dn" class="pill sw" type="button" role="switch" aria-checked="false" aria-label="Switch to day mode" data-ia="title=dnTitle" data-sfx="theme">' +
    '<span aria-hidden="true">🌙</span><span aria-hidden="true">☀️</span><i class="kn"></i></button>');
  MBALAB.ui.nav(pause, 10);
  MBALAB.ui.nav(sw, 50);

  let paused = false;
  const isDay = () => document.body.classList.contains('day');

  const setMotion = p => {
    paused = p;
    document.body.classList.toggle('still', p);   // also stills typography effects and the assistant
    window.cityPause && window.cityPause(p);
    $('moi').textContent = p ? '▶' : '⏸';
    $('mol').textContent = t(p ? 'play' : 'pause');
    pause.setAttribute('aria-label', t(p ? 'playAria' : 'pauseAria'));
  };
  const labelSwitch = () => sw.setAttribute('aria-label', t(isDay() ? 'nightAria' : 'dayAria'));

  pause.onclick = () => setMotion(!paused);
  sw.onclick = () => {
    const day = !isDay();
    document.body.classList.toggle('day', day);
    sw.setAttribute('aria-checked', day);
    labelSwitch();
    window.cityMode && window.cityMode(day);   // 3D scene
    MBALAB.emit('theme', day);                 // simulations, audio, ...
  };
  MBALAB.on('lang', () => { setMotion(paused); labelSwitch(); });

  MBALAB.theme = { isDay, isPaused: () => paused };
  setMotion(false);
});
