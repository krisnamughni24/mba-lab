/* Corporate Society: the office scene. Pure markup: an SVG background for each place and an avatar for the person you meet.
   Colours come from CSS variables so day and night themes both work. MBALAB.corpScene.html(loc, slot, npc, opts) returns the stage content. */
(function () {
  const root = typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {});
  const AVATAR = { boss: '👩‍💼', senior: '👨‍💼', peer: '🧑‍💻', junior: '🧑‍🎓', other: '🧔', director: '🕴️' };
  const PLAYER = { finance: '💼', it: '💻' };
  /* each place: a few shapes on a 320 x 160 canvas (floor line at y = 118) */
  const ART = {
    desk: '<rect class="f" x="0" y="118" width="320" height="42"/><rect class="m" x="70" y="84" width="96" height="34" rx="3"/><rect class="a" x="86" y="46" width="64" height="38" rx="4"/><rect class="s" x="92" y="52" width="52" height="26" rx="2"/><rect class="m" x="112" y="84" width="12" height="8"/><rect class="m" x="196" y="96" width="30" height="22" rx="3"/><rect class="a" x="204" y="86" width="14" height="10" rx="2"/><circle class="a" cx="258" cy="62" r="14"/><rect class="m" x="256" y="76" width="4" height="42"/>',
    pantry: '<rect class="f" x="0" y="118" width="320" height="42"/><rect class="m" x="30" y="88" width="170" height="30" rx="3"/><rect class="a" x="48" y="58" width="34" height="30" rx="4"/><rect class="s" x="54" y="64" width="22" height="12" rx="2"/><rect class="m" x="110" y="76" width="8" height="12"/><rect class="m" x="126" y="76" width="8" height="12"/><rect class="m" x="142" y="76" width="8" height="12"/><rect class="s" x="228" y="40" width="64" height="78" rx="4"/><rect class="m" x="236" y="48" width="48" height="26"/><rect class="m" x="236" y="80" width="48" height="30"/>',
    meeting: '<rect class="f" x="0" y="118" width="320" height="42"/><rect class="s" x="86" y="22" width="148" height="52" rx="4"/><rect class="a" x="94" y="30" width="132" height="36" rx="2"/><ellipse class="m" cx="160" cy="112" rx="116" ry="20"/><circle class="a" cx="70" cy="98" r="9"/><circle class="a" cx="110" cy="92" r="9"/><circle class="a" cx="210" cy="92" r="9"/><circle class="a" cx="250" cy="98" r="9"/>',
    floor: '<rect class="f" x="0" y="118" width="320" height="42"/><rect class="m" x="20" y="70" width="84" height="48" rx="3"/><rect class="a" x="34" y="48" width="26" height="22" rx="2"/><rect class="m" x="118" y="70" width="84" height="48" rx="3"/><rect class="a" x="132" y="48" width="26" height="22" rx="2"/><rect class="m" x="216" y="70" width="84" height="48" rx="3"/><rect class="a" x="230" y="48" width="26" height="22" rx="2"/><rect class="s" x="0" y="20" width="320" height="6"/>',
    lobby: '<rect class="f" x="0" y="118" width="320" height="42"/><rect class="s" x="180" y="30" width="110" height="88" rx="4"/><rect class="m" x="234" y="30" width="2" height="88"/><rect class="m" x="40" y="94" width="100" height="24" rx="3"/><circle class="a" cx="56" cy="76" r="10"/><rect class="m" x="52" y="86" width="8" height="10"/><circle class="a" cx="300" cy="82" r="14"/>',
    after: '<rect class="sk" x="0" y="0" width="320" height="118"/><rect class="m" x="14" y="52" width="40" height="66"/><rect class="m" x="62" y="30" width="48" height="88"/><rect class="m" x="118" y="64" width="38" height="54"/><rect class="m" x="224" y="42" width="52" height="76"/><rect class="a" x="72" y="44" width="8" height="8"/><rect class="a" x="90" y="60" width="8" height="8"/><rect class="a" x="236" y="58" width="8" height="8"/><rect class="s" x="156" y="72" width="62" height="46" rx="3"/><rect class="a" x="164" y="80" width="46" height="22" rx="2"/><rect class="f" x="0" y="118" width="320" height="42"/>'
  };
  const bg = loc => `<svg class="cs-bg ${loc}" viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${ART[loc] || ''}</svg>`;
  /* ring colour follows how the colleague feels about you: low, ok, good */
  const mood = v => v < 25 ? 'low' : v < 60 ? 'ok' : 'good';
  function html(loc, slot, npc, o) {
    o = o || {};
    const who = npc ? `<div class="cs-npc ${mood(o.rel || 50)}"><span class="av" aria-hidden="true">${AVATAR[npc] || '🙂'}</span><b>${o.name || ''}</b><small>${o.label || ''}</small></div>` : '';
    return `<div class="cs-scene t${slot}">${bg(loc)}<div class="cs-tint"></div><div class="cs-me" aria-hidden="true"><span class="av">🙂</span><i>${PLAYER[o.role] || ''}</i></div>${who}<div class="cs-place">${o.place || ''}</div></div>`;
  }
  root.corpScene = { html, AVATAR, bg };
  if (typeof module !== 'undefined') module.exports = root.corpScene;
})();
