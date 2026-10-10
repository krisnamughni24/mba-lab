/* Camera feature: zoom / rotate pad over the 3D city (press and hold to repeat). Talks to window.cityCam (scene feature). */
MBALAB.feature('camera', () => {
  const pad = MBALAB.ui.html(
    '<div class="camctl" id="camctl" role="group" aria-label="3D camera controls" data-ia="aria-label=camGroup">' +
    '<button id="camIn" type="button" data-ia="aria-label=zoomIn,title=zoomIn">+</button>' +
    '<button id="camUp" type="button" data-ia="aria-label=rotUp,title=rotUp">↑</button>' +
    '<button id="camOut" type="button" data-ia="aria-label=zoomOut,title=zoomOut">−</button>' +
    '<button id="camLeft" type="button" data-ia="aria-label=rotLeft,title=rotLeft">←</button>' +
    '<button id="camDown" type="button" data-ia="aria-label=rotDown,title=rotDown">↓</button>' +
    '<button id="camRight" type="button" data-ia="aria-label=rotRight,title=rotRight">→</button>' +
    '<button id="camReset" class="wide" type="button" data-ia="aria-label=resetCamA,title=resetCamA"><span data-i18n="resetCamT">⟲ Reset</span></button></div>');
  MBALAB.ui.floating(pad);

  const hold = (id, fn) => {
    const b = $(id);
    let timer = null;
    const stop = () => { clearInterval(timer); timer = null; };
    b.addEventListener('pointerdown', () => { fn(); clearInterval(timer); timer = setInterval(fn, 110); });
    ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(ev => b.addEventListener(ev, stop));
    b.addEventListener('click', e => { if (e.detail === 0) fn(); });   // keyboard activation
  };
  const cam = fn => () => { window.cityCam && fn(window.cityCam); };

  hold('camIn', cam(c => c.zoom(.9)));
  hold('camOut', cam(c => c.zoom(1.12)));
  hold('camUp', cam(c => c.tilt(.05)));
  hold('camDown', cam(c => c.tilt(-.05)));
  hold('camLeft', cam(c => c.pan(.06)));
  hold('camRight', cam(c => c.pan(-.06)));
  $('camReset').onclick = cam(c => c.reset());
});
