/* Life 40: pictures. svg(state) draws the life so far (home, work, vehicle, family, weather, savings); it works on a live game or on a fresh one for previews.
   banner(id) gives each event its own illustration, timeline(log, state) marks the big moments of the life. */
(function () {
  const L = () => MBALAB.life;
  const COLS = ['var(--cy)', 'var(--gn)', 'var(--mg)', 'var(--am)'];

  const hair = a => a >= 56 ? '#e6e8ef' : a >= 45 ? '#9a9aaa' : '#6b4a35';
  function person(x, o) {
    const s = o.s || 1;
    return '<g transform="translate(' + x + ' 190) scale(' + s + ')"><ellipse class="sh" cx="0" cy="0" rx="14" ry="3.5"/><g class="pp' + (o.bob ? ' bob' : '') + '">' +
      '<path class="lg" d="M-5 -26V-2M5 -26V-2"/><rect class="bdy" x="-9" y="-52" width="18" height="28" rx="7" style="fill:' + o.c + '"/>' +
      '<path class="arm" d="M-9 -48l-7 16M9 -48l7 16"/><circle class="hd" cx="0" cy="-62" r="9"/>' +
      '<path class="hr" d="M-9.5 -63a9.5 9.5 0 0 1 19 0c-4-4.5-15-4.5-19 0z" style="fill:' + o.h + '"/>' +
      (o.cane ? '<path class="cn" d="M19 -36V-1"/><path class="cn" d="M15 -36h8"/>' : '') +
      (o.glam ? '<text x="-24" y="-66" font-size="13">✨</text>' : '') + '</g></g>';
  }

  function home(S) {
    const g = (a, b) => '<g transform="translate(' + a + ' 190)">' + b + '</g>', real = S.house ? S.house.value / S.cpi : 0;
    if (!S.house) {
      if (S.bg === 'poor') return g(36, '<rect class="bd" x="0" y="-36" width="70" height="36"/><polygon class="rf" points="-8,-36 35,-62 78,-36"/><rect class="dr" x="28" y="-22" width="14" height="22"/><rect class="wn" x="8" y="-28" width="11" height="11"/><rect class="wn" x="52" y="-28" width="11" height="11"/>');
      if (S.bg === 'rich') return g(16, '<rect class="bd" x="0" y="-80" width="120" height="80"/><polygon class="rf" points="-8,-80 60,-112 128,-80"/><rect class="dr" x="52" y="-28" width="16" height="28"/>' + [0, 1, 2].map(i => '<rect class="wn" x="' + (12 + i * 40) + '" y="-68" width="16" height="14"/>').join('') + '<rect class="tag" x="42" y="-132" width="40" height="11" rx="3"/><circle class="bush" cx="-6" cy="-6" r="9"/><circle class="bush" cx="128" cy="-6" r="9"/>');
      let w = '<rect class="bd" x="0" y="-84" width="84" height="84"/><rect class="dr" x="34" y="-20" width="16" height="20"/>';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) w += '<rect class="wn" x="' + (14 + c * 40) + '" y="' + (-74 + r * 24) + '" width="14" height="12"/>';
      return g(32, w + '<rect class="tag" x="22" y="-96" width="40" height="11" rx="3"/>');
    }
    if (real < 700) return g(28, '<rect class="bd" x="0" y="-50" width="96" height="50"/><polygon class="rf" points="-8,-50 48,-84 104,-50"/><rect class="ch" x="76" y="-82" width="8" height="22"/><rect class="dr" x="40" y="-28" width="16" height="28"/><rect class="wn" x="10" y="-38" width="16" height="14"/><rect class="wn" x="70" y="-38" width="16" height="14"/>');
    if (real < 1800) return g(16, '<rect class="bd" x="0" y="-80" width="120" height="80"/><polygon class="rf" points="-8,-80 60,-112 128,-80"/><rect class="dr" x="52" y="-28" width="16" height="28"/>' +
      [0, 1, 2].map(i => '<rect class="wn" x="' + (12 + i * 40) + '" y="-68" width="16" height="14"/>').join('') + [0, 2].map(i => '<rect class="wn" x="' + (12 + i * 40) + '" y="-36" width="16" height="14"/>').join('') +
      '<circle class="bush" cx="-6" cy="-6" r="9"/><circle class="bush" cx="128" cy="-6" r="9"/>');
    return g(6, '<rect class="bd" x="10" y="-76" width="164" height="76"/><polygon class="rf" points="0,-76 92,-116 184,-76"/>' +
      [0, 1, 2, 3].map(i => '<rect class="col" x="' + (28 + i * 40) + '" y="-70" width="8" height="70"/>').join('') + '<rect class="dr" x="78" y="-34" width="28" height="34"/>' +
      [0, 1].map(i => '<rect class="wn" x="' + (44 + i * 62) + '" y="-58" width="18" height="16"/>').join('') + '<ellipse class="pool" cx="150" cy="-2" rx="26" ry="4"/>');
  }

  function work(S) {
    if (S.retired) return '<g transform="translate(500 190)"><text x="0" y="-8" font-size="38">🏖️</text><text x="44" y="-6" font-size="26">🌴</text></g>';
    const fl = 2 + S.job, h = 20 + fl * 18; let w = '';
    for (let r = 0; r < fl; r++) for (let c = 0; c < 3; c++) w += '<rect class="wn" x="' + (10 + c * 20) + '" y="' + (-h + 8 + r * 18) + '" width="11" height="9"/>';
    return '<g transform="translate(500 190)"><rect class="bd" x="0" y="' + (-h) + '" width="72" height="' + h + '"/>' + w + '<rect class="dr" x="28" y="-16" width="16" height="16"/>' +
      '<path class="g" d="M36 ' + (-h) + 'v-14"/>' + (S.job >= 2 ? '<polygon class="flag" points="36,' + (-h - 14) + ' 52,' + (-h - 9) + ' 36,' + (-h - 4) + '"/>' : '') + '</g>';
  }

  function coins(S) {
    const liq = L().liquid(S) / S.cpi, tiers = [5, 20, 60, 150, 400, 1000, 2500, 6000];
    let n = 0; tiers.forEach(t => { if (liq >= t) n++; });
    let s = ''; const rows = [4, 3, 2, 1]; let k = 0;
    for (let r = 0; r < rows.length && k < n; r++) for (let c = 0; c < rows[r] && k < n; c++, k++) s += '<ellipse class="coin" cx="' + (232 + c * 15 + r * 7.5) + '" cy="' + (186 - r * 7) + '" rx="8" ry="3.6"/>';
    if (S.gold > 0.08 * Math.max(1, L().liquid(S))) s += '<rect class="bar" x="224" y="181" width="12" height="6" rx="1"/>';
    return s;
  }

  function sky(S) {
    const w = S.y > 0 ? S.W[S.y - 1] : null, reg = w ? w.reg : 'normal';
    let s = '<rect class="sky ' + reg + '" x="0" y="0" width="640" height="190"/>';
    if (reg === 'bull' || reg === 'normal') s += '<circle class="sun' + (reg === 'bull' ? ' big' : '') + '" cx="580" cy="42" r="' + (reg === 'bull' ? 22 : 15) + '"/>';
    const cl = (x, y, k) => '<g class="cloud ' + k + '" transform="translate(' + x + ' ' + y + ')"><ellipse cx="0" cy="0" rx="34" ry="12"/><ellipse cx="22" cy="-8" rx="22" ry="12"/><ellipse cx="-20" cy="-6" rx="18" ry="9"/></g>';
    if (reg === 'normal') s += cl(120, 36, 'c1');
    if (reg === 'bear') s += cl(110, 34, 'c1') + cl(330, 28, 'c2') + cl(520, 44, 'c3');
    if (reg === 'crisis') { s += cl(100, 32, 'c1 dk') + cl(300, 26, 'c2 dk') + cl(500, 36, 'c3 dk') + '<polygon class="bolt" points="320,44 306,76 318,76 308,104 336,66 322,66 332,44"/>'; for (let i = 0; i < 14; i++) s += '<path class="rain" style="animation-delay:' + (i * 0.13).toFixed(2) + 's" d="M' + (40 + i * 44) + ' 70l-5 14"/>'; }
    return s;
  }

  function svg(S, o) {
    o = o || {};
    const age = S.age, lifeC = [COLS[1], COLS[0], COLS[2]][S.lifestyle], debt = L().debt(S);
    let s = '<svg viewBox="0 0 640 230" class="lf-sc" role="img" aria-label="' + (o.aria || '') + '" preserveAspectRatio="xMidYMax meet">' + sky(S) +
      '<rect class="gr" x="0" y="190" width="640" height="40"/><path class="rd" d="M0 214H640"/>' + [214, 470, 626].map((x, i) => '<g transform="translate(' + x + ' 190)"><rect class="trk2" x="-2" y="-18" width="4" height="18"/><circle class="bush" cx="0" cy="-26" r="' + (11 - i * 2) + '"/></g>').join('') + home(S) + work(S) + coins(S);
    if (debt > 1) s += '<g transform="translate(' + (S.house ? 70 : 72) + ' 66)"><rect class="debtb" x="-38" y="-14" width="76" height="22" rx="11"/><text class="debtt" x="0" y="1" text-anchor="middle">' + (o.debt ? o.debt(debt) : '💳') + '</text></g>';
    s += '<g class="drive">' + '<text x="150" y="212" font-size="' + (S.bg === 'poor' ? 22 : 26) + '"' + (S.car ? '' : ' opacity="0"') + '>' + (S.bg === 'poor' ? '🛵' : S.bg === 'rich' ? '🚘' : '🚗') + '</text></g>';
    S.kids.forEach((b, i) => { const a = Math.max(0, age - b); s += person(402 + i * 22, { s: 0.38 + 0.62 * Math.min(1, a / 18), c: COLS[(i + 1) % 4], h: '#6b4a35' }); });
    if (S.spouse) s += person(362, { s: 0.96, c: COLS[3], h: hair(age - 2) });
    s += person(330, { s: 1, c: lifeC, h: hair(age), cane: age >= 60, bob: true, glam: S.lifestyle === 2 });
    return s + '</svg>';
  }

  const BAN = { promo: '🚀📈', layoff: '📦😟', offer: '🤝💼', bonus: '🎁💰', side: '🛵💻', study: '🎓📚', startup: '🚀🦄', scam: '🎭🪤', fomo: '🪙📉', crash: '📉⛈️', inflate: '🛒💸', marriage: '💍💐', baby: '👶🍼', college: '🎓🏫', parents: '🏥👵', inherit: '📜💎', house: '🏠🔑', repair: '🔧🏠', car: '🚗🔑', gadget: '📱✨', bill: '🧾😬', health: '🤒💊', insurance: '🛡️🏥', dplk: '🏦🤝', midlife: '🧭🌅', gengsi: '🥂✈️', rupiah: '💱📉', retire: '🏖️🌴',
    biz: '🏪', startup_l: '🚀', ponzi1: '🎭💵', ponzi2: '💥', fomo_l: '🪙', edu: '🎓', cert: '📜', career: '🧭', delay: '🏥💸' };
  const banner = id => '<div class="lf-ban" aria-hidden="true">' + Array.from(BAN[id] || '✨').map(c => '<span>' + c + '</span>').join('') + '</div>';

  const MARK = { marriage: ['ab', '💍'], baby: ['ab', '👶'], house: ['ab', '🏠'], car: ['a', '🚗'], study: ['ab', '🎓'], layoff: ['abc', '📦'], crash: ['abc', '📉'], inherit: ['abc', '📜'], startup: ['ab', '🚀'], scam: ['a', '🎭'], retire: ['bc', '🏖️'], parents: ['abc', '🏥'], midlife: ['ab', '🧭'], promo: ['ab', '⬆️'] };
  function timeline(log, S, title) {
    const pos = a => ((a - L().START) / L().YEARS * 100).toFixed(1);
    let m = '';
    log.forEach(x => { const mk = MARK[x.id]; if (mk && mk[0].indexOf(x.opt) >= 0) m += '<span class="mk" style="left:' + pos(x.age) + '%" title="' + (title ? title(x) : '') + '">' + mk[1] + '</span>'; });
    return '<div class="lf-tl" aria-hidden="true"><div class="trk"><i style="width:' + pos(Math.min(S.age, L().END)) + '%"></i></div>' + m + '<span class="nw" style="left:' + pos(Math.min(S.age, L().END)) + '%">▼</span><div class="ends"><span>' + L().START + '</span><span>' + L().END + '</span></div></div>';
  }

  MBALAB.lifeScene = { svg, banner, timeline };
})();
