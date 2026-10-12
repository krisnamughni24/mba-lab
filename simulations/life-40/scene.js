/* Life 40: pictures. svg(state) draws the world of this life: the district follows the background (rich, normal, poor), the atmosphere follows the level,
   and home, work, savings jar, family, weather and the sun follow the state of the game. Things you can tap are marked .hot (data-h).
   banner(id) gives each event its own illustration, timeline(log, state) marks the big moments, react(...) animates what a choice just did. */
(function () {
  const L = () => MBALAB.life;
  const COLS = ['var(--cy)', 'var(--gn)', 'var(--mg)', 'var(--am)'];
  const GY = 206;
  const f1 = n => Math.round(n * 10) / 10;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pr = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
  const hair = a => a >= 56 ? '#e6e8ef' : a >= 45 ? '#9a9aaa' : '#6b4a35';

  /* ---------- people ---------- */
  function person(x, o) {
    const s = o.s || 1, m = o.mood || 'n';
    const mouth = m === 'h' ? 'M-3.5 -58.5q3.5 3.6 7 0' : m === 's' ? 'M-3.5 -56.5q3.5 -3.6 7 0' : 'M-3 -57.5h6';
    return '<g transform="translate(' + x + ' ' + GY + ') scale(' + s + ')"' + (o.ghost ? ' class="gh"' : '') + '><ellipse class="sh" cx="0" cy="0" rx="14" ry="3.5"/><g class="pp' + (o.bob ? ' bob' : '') + '">' +
      '<path class="lg" d="M-5 -26V-2M5 -26V-2"/><rect class="bdy" x="-9" y="-52" width="18" height="28" rx="7" style="fill:' + o.c + '"/>' + (o.tie ? '<path class="tie" d="M0 -50l-2 7l2 5l2 -5z"/>' : '') +
      '<path class="arm" d="M-9 -48l-7 16M9 -48l7 16"/><circle class="hd" cx="0" cy="-62" r="9"/>' +
      '<path class="hr" d="M-9.5 -63a9.5 9.5 0 0 1 19 0c-4-4.5-15-4.5-19 0z" style="fill:' + o.h + '"/>' +
      '<circle class="ey" cx="-3.2" cy="-62" r="1.1"/><circle class="ey" cx="3.2" cy="-62" r="1.1"/><path class="mo" d="' + mouth + '"/>' +
      (o.cane ? '<path class="cn" d="M19 -36V-1"/><path class="cn" d="M15 -36h8"/>' : '') +
      (o.glam ? '<text x="-26" y="-66" font-size="13">✨</text>' : '') + (o.stress ? '<text class="swt" x="10" y="-68" font-size="10">💧</text>' : '') + '</g></g>';
  }

  /* ---------- home: style follows the district, size follows what you own or can rent ---------- */
  function homeInfo(S) {
    if (S.house) { const r = S.house.value / S.cpi; return { own: true, tier: r < 250 ? 0 : r < 700 ? 1 : r < 1800 ? 2 : 3 }; }
    const r = S.retired ? (S.refInc || S.salary / S.cpi) : S.salary / S.cpi;
    return { own: false, tier: r < 62 ? 0 : r < 118 ? 1 : r < 230 ? 2 : 3 };
  }
  function house(sty, tier, S, own) {
    const Wd = { poor: [66, 86, 84, 126], normal: [80, 100, 124, 152], rich: [94, 112, 138, 172] }[sty][tier];
    const Ht = { poor: [34, 44, 72, 80], normal: [40, 52, 76, 84], rich: [48, 60, 78, 88] }[sty][tier];
    const fl = tier >= 2 ? 2 : 1, x0 = f1((184 - Wd) / 2) + 6;
    let top, s = '<g transform="translate(' + x0 + ' ' + GY + ')"><rect class="bd ' + sty + '" x="0" y="' + (-Ht) + '" width="' + Wd + '" height="' + Ht + '"/>';
    if (sty === 'poor') {
      const rh = 22 + tier * 2; top = -Ht - rh;
      s += '<polygon class="rf seng" points="-6,' + (-Ht) + ' ' + Wd / 2 + ',' + top + ' ' + (Wd + 6) + ',' + (-Ht) + '"/>';
      for (let i = 1; i < 6; i++) { const x = -6 + i * (Wd + 12) / 6, yt = -Ht - rh * (1 - Math.abs(x - Wd / 2) / (Wd / 2 + 6)); s += '<path class="rfl" d="M' + f1(x) + ' ' + (-Ht) + 'V' + f1(yt) + '"/>'; }
      if (tier === 0) s += '<rect class="tank" x="' + f1(Wd * 0.58) + '" y="' + (top - 8) + '" width="12" height="15" rx="3"/><path class="g" d="M' + f1(Wd * 0.22) + ' ' + f1(-Ht - rh * 0.5) + 'v-15m-5 6h10"/>';
    } else if (sty === 'normal') {
      const rh = 28 + tier * 2; top = -Ht - rh;
      s += '<polygon class="rf tile" points="-8,' + (-Ht) + ' ' + Wd / 2 + ',' + top + ' ' + (Wd + 8) + ',' + (-Ht) + '"/>';
      if (tier >= 1) s += '<rect class="ch" x="' + f1(Wd * 0.72) + '" y="' + f1(top + 8) + '" width="8" height="' + f1(rh * 0.55) + '"/>';
    } else {
      top = -Ht - 7; s += '<rect class="slab" x="-7" y="' + top + '" width="' + (Wd + 14) + '" height="8" rx="2"/>';
      if (tier === 3) { s += '<polygon class="rf tile" points="' + f1(Wd * 0.3) + ',' + top + ' ' + Wd / 2 + ',' + (top - 24) + ' ' + f1(Wd * 0.7) + ',' + top + '"/>'; top -= 24; }
      if (tier === 2) { s += '<rect class="glass" x="' + f1(Wd * 0.6) + '" y="' + (top - 15) + '" width="' + f1(Wd * 0.3) + '" height="15"/>'; top -= 15; }
    }
    const cols = Math.max(2, Math.floor(Wd / 34)), cw = Wd / cols, dh = Math.min(30, Ht * 0.55);
    for (let r = 0; r < fl; r++) for (let c = 0; c < cols; c++) {
      const cx = cw * (c + 0.5); if (r === fl - 1 && Math.abs(cx - Wd / 2) < 15) continue;
      s += '<rect class="wn" x="' + f1(cx - 7) + '" y="' + f1(-Ht + 9 + r * (Ht / fl)) + '" width="14" height="' + (Ht / fl > 30 ? 14 : 12) + '"/>';
    }
    s += '<rect class="dr" x="' + f1(Wd / 2 - 8) + '" y="' + f1(-dh) + '" width="16" height="' + f1(dh) + '" rx="2"/>';
    if (tier === 3 && sty !== 'poor') for (let i = 0; i < 4; i++) s += '<rect class="col" x="' + f1(8 + i * (Wd - 24) / 3) + '" y="' + (-Ht) + '" width="8" height="' + Ht + '"/>';
    if (sty === 'rich' && tier >= 2) s += '<ellipse class="pool" cx="' + f1(Wd / 2) + '" cy="13" rx="34" ry="5"/>';
    if (sty === 'poor' && tier >= 2) s += '<path class="g" d="M6 ' + f1(-Ht / 2 + 4) + 'h' + (Wd - 12) + '"/><text x="' + (Wd - 22) + '" y="' + f1(-Ht / 2 + 2) + '" font-size="13">🪴</text>';
    if (sty === 'poor' && tier === 3) s += '<path class="g" d="M-12 0V-20M' + (Wd + 12) + ' 0V-20M-12 -16H' + (Wd + 12) + '"/>';
    if (sty === 'poor' && tier === 0) s += '<path class="g" d="M' + (Wd + 2) + ' -30L' + (Wd + 30) + ' -36"/><rect class="cloth a" x="' + (Wd + 8) + '" y="-33" width="7" height="10"/><rect class="cloth b" x="' + (Wd + 18) + '" y="-35" width="7" height="12"/>';
    /* ownership: a flag on the roof if it is yours, a for-rent board if not */
    if (own) s += '<path class="g" d="M' + f1(Wd / 2) + ' ' + top + 'v-17"/><polygon class="flag ' + (S.house.loanName ? 'am' : 'gn') + '" points="' + f1(Wd / 2) + ',' + (top - 17) + ' ' + f1(Wd / 2 + 15) + ',' + (top - 12) + ' ' + f1(Wd / 2) + ',' + (top - 7) + '"/>';
    else s += '<path class="g" d="M-9 0V-26"/><rect class="tag" x="-26" y="-34" width="32" height="14" rx="3"/>';
    return { svg: s + '</g>', top: top - 20, x0, Wd };
  }

  /* ---------- work: factory, office or glass tower ---------- */
  function work(S) {
    const X = 504;
    if (S.retired) return '<g class="hot-in"><rect class="hit" x="498" y="150" width="120" height="60"/><g transform="translate(' + X + ' ' + GY + ')"><text x="0" y="-8" font-size="38">🏖️</text><text x="46" y="-6" font-size="26">🌴</text></g></g>';
    const off = S.gap > 0.02, fl = 2 + S.job + (S.bg === 'rich' ? 1 : 0), typ = S.bg === 'poor' && S.job < 2 ? 'fac' : S.bg === 'rich' ? 'glass' : 'off';
    let s, h, w;
    if (typ === 'fac') {
      w = 86; h = 84; s = '<rect class="bd" x="0" y="-44" width="86" height="44"/><polygon class="rf saw" points="0,-44 0,-58 14,-44 14,-58 28,-44 28,-58 42,-44 42,-58 56,-44 56,-58 70,-44 70,-58 84,-44"/><rect class="ch" x="72" y="-84" width="9" height="40"/>' +
        '<circle class="puff" cx="76" cy="-88" r="5"/><circle class="puff p2" cx="80" cy="-88" r="4"/>' + [0, 1, 2, 3].map(i => '<rect class="wn" x="' + (8 + i * 16) + '" y="-34" width="7" height="9"/>').join('') + '<rect class="dr" x="52" y="-24" width="24" height="24"/>';
    } else if (typ === 'glass') {
      w = 66; h = 26 + fl * 18; s = '<rect class="bd gl" x="0" y="' + (-h) + '" width="66" height="' + h + '"/>' + Array.from({ length: fl }, (_, r) => '<rect class="wn strip" x="6" y="' + (-h + 9 + r * 18) + '" width="54" height="9"/>').join('') +
        '<rect class="slab" x="-3" y="' + (-h - 4) + '" width="72" height="5" rx="1"/><path class="g" d="M33 ' + (-h - 4) + 'v-16"/><circle class="beacon" cx="33" cy="' + (-h - 22) + '" r="2.6"/><rect class="dr" x="25" y="-17" width="16" height="17"/>';
    } else {
      w = 72; h = 20 + fl * 18; s = '<rect class="bd" x="0" y="' + (-h) + '" width="72" height="' + h + '"/>' + Array.from({ length: fl }, (_, r) => [0, 1, 2].map(c => '<rect class="wn" x="' + (10 + c * 20) + '" y="' + (-h + 8 + r * 18) + '" width="11" height="9"/>').join('')).join('') +
        '<rect class="dr" x="28" y="-16" width="16" height="16"/><path class="g" d="M36 ' + (-h) + 'v-14"/>' + (S.job >= 2 ? '<polygon class="flag" points="36,' + (-h - 14) + ' 52,' + (-h - 9) + ' 36,' + (-h - 4) + '"/>' : '');
    }
    return '<g class="wk' + (off ? ' off' : '') + '" transform="translate(' + X + ' ' + GY + ')"><rect class="hit" x="-6" y="' + (-(h + 34)) + '" width="' + (w + 12) + '" height="' + (h + 34) + '"/>' + s + '</g>';
  }

  /* ---------- the savings jar: fill = real liquid wealth, falling coins = how much you set aside each year ---------- */
  function jar(S) {
    const liq = L().liquid(S) / S.cpi, tiers = [5, 20, 60, 150, 400, 1000, 2500, 6000]; let n = 0; tiers.forEach(t => { if (liq >= t) n++; });
    let s = '<rect class="hit" x="214" y="104" width="68" height="106"/><rect class="jar" x="226" y="154" width="44" height="52" rx="9"/>';
    for (let k = 0; k < n; k++) s += '<ellipse class="coin" cx="' + (240 + (k % 2) * 6) + '" cy="' + (200 - k * 5.6) + '" rx="8.5" ry="3.4"/><ellipse class="coin" cx="' + (257 - (k % 2) * 5) + '" cy="' + (199 - k * 5.6) + '" rx="8" ry="3.2"/>';
    s += '<rect class="lid" x="231" y="147" width="34" height="8" rx="3"/>';
    if (S.gold > 0.08 * Math.max(1, L().liquid(S))) s += '<rect class="gbar" x="236" y="139" width="24" height="8" rx="1.5"/>';
    const drops = Math.round(S.saveRate * 4);
    for (let i = 0; i < drops; i++) s += '<ellipse class="dropc" cx="' + (240 + (i % 2) * 10) + '" cy="112" rx="6" ry="2.6" style="animation-delay:' + (i * 0.7).toFixed(1) + 's;animation-duration:' + (2.4 + (4 - drops) * 0.5).toFixed(1) + 's"/>';
    return s;
  }

  /* ---------- sky: the sun travels across the sky as you age, the weather is last year's market ---------- */
  function sunPos(age) { const p = clamp((age - L().START) / L().YEARS, 0, 1); return [60 + p * 520, 132 - 98 * Math.sin(Math.PI * p), p]; }
  function sky(S, o) {
    const w = S.y > 0 ? S.W[S.y - 1] : null, reg = w ? w.reg : 'normal', hard = S.level === 'hard', night = S.age >= 61;
    let s = '<rect class="sk0" x="0" y="0" width="640" height="' + GY + '"/>' + [96, 122, 146, 166, 182, 194].map(y => '<rect class="sk1" x="0" y="' + y + '" width="640" height="' + (GY - y) + '"/>').join('') + '<rect class="skr ' + reg + '" x="0" y="0" width="640" height="' + GY + '"/>';
    if (night) {
      s += '<g transform="translate(600 40)"><path class="moon" d="M0 -14A14 14 0 1 0 0 14A10.5 10.5 0 1 1 0 -14z"/></g>';
      for (let i = 0; i < 16; i++) s += '<circle class="star" cx="' + f1(20 + pr(i, 5) * 600) + '" cy="' + f1(10 + pr(i, 6) * 90) + '" r="' + (1 + pr(i, 7)).toFixed(1) + '" style="animation-delay:' + (pr(i, 8) * 3).toFixed(1) + 's"/>';
    } else {
      const sp = sunPos(S.age), pp = o.prevAge != null ? sunPos(o.prevAge) : sp, r = reg === 'bull' ? 21 : reg === 'normal' ? 15 : reg === 'bear' ? 13 : 11;
      s += '<g transform="translate(' + f1(sp[0]) + ' ' + f1(sp[1]) + ')"><g class="sunmv" style="--dx:' + f1(pp[0] - sp[0]) + 'px;--dy:' + f1(pp[1] - sp[1]) + 'px"><circle class="sun' + (reg === 'bull' ? ' big' : '') + (sp[2] > 0.78 ? ' late' : '') + (reg === 'crisis' ? ' dim' : '') + '" r="' + r + '"/></g></g>';
    }
    const cl = (x, y, k) => '<g class="cloud ' + k + '" transform="translate(' + x + ' ' + y + ')"><ellipse cx="0" cy="0" rx="34" ry="12"/><ellipse cx="22" cy="-8" rx="22" ry="12"/><ellipse cx="-20" cy="-6" rx="18" ry="9"/></g>';
    const spots = [[110, 36, 'c1'], [330, 28, 'c2'], [520, 46, 'c3'], [225, 58, 'c1']], dk = reg === 'crisis' ? ' dk' : '';
    const cn = Math.min(4, { bull: 0, normal: 1, bear: 3, crisis: 3 }[reg] + (hard ? 1 : 0));
    for (let i = 0; i < cn; i++) s += cl(spots[i][0], spots[i][1], spots[i][2] + dk);
    if (reg === 'crisis') { s += '<polygon class="bolt" points="320,44 306,76 318,76 308,104 336,66 322,66 332,44"/>'; for (let i = 0; i < 14; i++) s += '<path class="rain" style="animation-delay:' + (i * 0.13).toFixed(2) + 's" d="M' + (40 + i * 44) + ' 70l-5 14"/>'; }
    else if (reg === 'bear' && hard) for (let i = 0; i < 7; i++) s += '<path class="rain lt" style="animation-delay:' + (i * 0.2).toFixed(2) + 's" d="M' + (70 + i * 90) + ' 80l-4 11"/>';
    return s;
  }

  /* ---------- the district: far skyline and street props, by background ---------- */
  function skyline(cls, lo, hi, wlo, whi, k, lit) {
    let s = '', x = -4, i = 0;
    while (x < 640) {
      const w = wlo + pr(i, k) * (whi - wlo), h = lo + pr(i + 50, k) * (hi - lo);
      s += '<rect class="' + cls + '" x="' + f1(x) + '" y="' + f1(GY - h) + '" width="' + f1(w) + '" height="' + f1(h) + '"/>';
      if (lit) for (let r = 0; r < Math.floor(h / 15); r++) if (pr(i * 9 + r, k + 3) > 0.55) s += '<rect class="lit" x="' + f1(x + 3 + pr(r, i) * (w - 9)) + '" y="' + f1(GY - h + 6 + r * 15) + '" width="3" height="4"/>';
      x += w + 1.5; i++;
    }
    return s;
  }
  function district(S) {
    let s = '';
    if (S.bg === 'rich') {
      s += skyline('tw far', 90, 140, 14, 24, 4, false) + skyline('tw', 60, 128, 22, 36, 1, true) +
        '<text x="212" y="' + (GY - 2) + '" font-size="34">🌴</text><text x="470" y="' + (GY - 2) + '" font-size="30">🌴</text>' +
        '<rect class="gate" x="-2" y="' + (GY - 30) + '" width="5" height="30"/><path class="gline" d="M0 ' + (GY - 22) + 'H212M0 ' + (GY - 8) + 'H212" opacity=".35"/>';
    } else if (S.bg === 'poor') {
      s += skyline('tw far', 70, 124, 12, 20, 3, false);
      let x = -8, i = 0;
      while (x < 640) {
        const w = 28 + pr(i, 9) * 14, h = 18 + pr(i, 10) * 14;
        s += '<rect class="shk" x="' + f1(x) + '" y="' + f1(GY - h) + '" width="' + f1(w) + '" height="' + f1(h) + '"/><polygon class="shk r" points="' + f1(x - 3) + ',' + f1(GY - h) + ' ' + f1(x + w / 2) + ',' + f1(GY - h - 9) + ' ' + f1(x + w + 3) + ',' + f1(GY - h) + '"/>';
        if (pr(i, 11) > 0.5) s += '<rect class="lit" x="' + f1(x + 5) + '" y="' + f1(GY - h + 5) + '" width="5" height="5"/>';
        x += w + 4; i++;
      }
      [182, 456].forEach(px => { s += '<path class="pole" d="M' + px + ' ' + GY + 'V86M' + (px - 12) + ' 96H' + (px + 12) + 'M' + (px - 9) + ' 106H' + (px + 9) + '"/>'; });
      s += '<path class="wire" d="M0 92Q91 118 182 96T456 96T640 98M0 102Q91 126 182 106T456 106T640 108"/>';
    } else {
      s += '<path class="hill" d="M0 ' + GY + 'C60 150 120 140 200 ' + (GY - 30) + 'S380 140 470 ' + (GY - 40) + 'S600 150 640 ' + (GY - 50) + 'V' + GY + 'z"/>' + skyline('tw n', 26, 66, 22, 38, 2, true) +
        '<path class="pole" d="M206 ' + GY + 'V' + (GY - 52) + 'h12"/><circle class="lamp" cx="218" cy="' + (GY - 52) + '" r="4"/>' + [0, 1].map(i => '<g transform="translate(' + (470 + i * 98) + ' ' + GY + ')"><rect class="trk2" x="-2" y="-18" width="4" height="18"/><circle class="bush" cx="0" cy="-26" r="' + (11 - i * 2) + '"/></g>').join('');
    }
    return s;
  }
  function ground(S) {
    let s = '<rect class="gr" x="0" y="' + GY + '" width="640" height="44"/><path class="rd" d="M0 ' + (GY + 28) + 'H640"/>';
    if (S.bg === 'poor') s += '<ellipse class="pud" cx="236" cy="' + (GY + 18) + '" rx="26" ry="3.5"/><ellipse class="pud" cx="418" cy="' + (GY + 24) + '" rx="20" ry="3"/><text class="cat" x="330" y="' + (GY + 26) + '" font-size="14">🐈</text>';
    else if (S.bg === 'rich') s += '<path class="paver" d="M70 ' + GY + 'l-18 40M120 ' + GY + 'l-6 40"/>';
    return s;
  }

  /* ---------- the level: birds and flowers when it is easy, wind, price tags and creditors when it is hard ---------- */
  function mood(S) {
    const lv = S.level, night = S.age >= 61; let s = '';
    if (lv === 'easy') {
      if (!night) s += '<path class="bird" d="M0 0q4 -5 8 0q4 -5 8 0" style="--y:62px"/><path class="bird b2" d="M0 0q4 -5 8 0q4 -5 8 0" style="--y:84px"/><text class="bfly" x="430" y="' + (GY - 6) + '" font-size="15">🦋</text>';
      [58, 150, 308, 440, 596].forEach((x, i) => { s += '<circle class="fl' + (i % 2 ? ' b' : '') + '" cx="' + x + '" cy="' + (GY + 8 + (i % 3) * 5) + '" r="2.4"/>'; });
      s += '<text class="net" x="16" y="' + (GY + 14) + '" font-size="16">🛟</text>';
    } else if (lv === 'medium') {
      if (!night) s += '<path class="bird" d="M0 0q4 -5 8 0q4 -5 8 0" style="--y:70px"/>';
      [150, 440].forEach(x => { s += '<circle class="fl" cx="' + x + '" cy="' + (GY + 10) + '" r="2.2"/>'; });
    } else {
      for (let i = 0; i < 5; i++) s += '<path class="wind" style="animation-delay:' + (i * 0.55).toFixed(2) + 's;--y:' + (110 + i * 17) + 'px" d="M0 0h34m-24 5h26"/>';
      for (let i = 0; i < 3; i++) s += '<rect class="leaf" x="0" y="0" width="5" height="3" style="animation-delay:' + (i * 1.3).toFixed(1) + 's;--y:' + (150 + i * 24) + 'px"/>';
      [120, 300, 470].forEach((x, i) => { s += '<text class="ptag" x="' + x + '" y="' + (GY + 10) + '" font-size="14" style="animation-delay:' + (i * 1.1).toFixed(1) + 's">🏷️</text>'; });
      s += '<path class="crack" d="M58 ' + (GY + 30) + 'l8 -7l-4 -6l9 -6M380 ' + (GY + 31) + 'l7 -6l-3 -5"/>';
    }
    if (S.loans.some(l => l.name === 'pinjol')) s += '<text class="coll" x="206" y="' + (GY - 2) + '" font-size="26">🕴️</text>';
    return s;
  }

  /* ---------- hotspots and the whole picture ---------- */
  const hot = (key, label, body, cls, mini) => mini ? '<g' + (cls ? ' class="' + cls + '"' : '') + '>' + body + '</g>' : '<g class="hot' + (cls ? ' ' + cls : '') + '" data-h="' + key + '" tabindex="0" role="button" aria-label="' + esc(label) + '">' + body + '</g>';

  /* what a choice just did: little emoji bursts around the part of the picture that changed */
  const AN = { me: [330, GY - 76], home: [100, GY - 86], work: [540, GY - 96], jar: [247, GY - 70], car: [172, GY - 34], fam: [392, GY - 70], sky: [320, 50] };
  const TARGET = { me: 'me', home: 'home', work: 'work', jar: 'jar', car: 'car', fam: 'family' };
  const RE = {
    promo: ['work', 'rise', '⬆️🎉'], offer: ['work', 'rise', '🤝✨'], bonus: ['me', 'fall', '💰🪙🪙'], side: ['me', 'rise', '💻🪙'], study: ['me', 'rise', '📚🎓'], startup: ['work', 'rise', '🚀✨'], layoff: ['work', 'fall', '📦😟'],
    scam: ['jar', 'away', '🎭💸💸'], fomo: ['jar', 'away', '🪙💸'], crash: ['jar', 'shake', '⚡📉💥'], rupiah: ['jar', 'shake', '💱📉'], inflate: ['me', 'rise', '🛒💸'],
    marriage: ['fam', 'pop', '💍❤️💐'], baby: ['fam', 'pop', '👶🍼❤️'], college: ['fam', 'rise', '🎓🏫'], parents: ['me', 'rise', '🏥👵'], inherit: ['me', 'fall', '📜💎✨'], house: ['home', 'pop', '🏠🔑✨'], repair: ['home', 'rise', '🔧🛠️'],
    car: ['car', 'pop', '🚗🔑'], gadget: ['me', 'pop', '📱✨'], bill: ['me', 'away', '🧾😬'], health: ['me', 'rise', '🤒💊'], insurance: ['me', 'pop', '🛡️'], dplk: ['jar', 'fall', '🏦🪙'], midlife: ['me', 'rise', '🧭🌅'], gengsi: ['me', 'away', '🥂✈️💸'], retire: ['work', 'pop', '🏖️🌴'],
    biz: ['jar', 'rise', '🏪'], startup_l: ['work', 'rise', '🚀'], ponzi1: ['jar', 'away', '🎭'], ponzi2: ['jar', 'shake', '💥💸'], fomo_l: ['jar', 'rise', '🪙'], edu: ['me', 'rise', '🎓'], cert: ['me', 'rise', '📜'], career: ['work', 'rise', '🧭'], delay: ['me', 'rise', '🏥💸']
  };
  function reactOf(r) {
    if (!r) return null;
    let d = RE[r.id];
    if (!d) {
      const m = {}; (r.fx || []).forEach(([k, v]) => { m[k] = (m[k] || 0) + v; });
      d = m.cash > 0.5 ? ['me', 'fall', '🪙🪙'] : m.cash < -0.5 ? ['jar', 'away', '💸'] : m.joy > 0 ? ['me', 'pop', '❤️'] : m.joy < 0 ? ['me', 'rise', '💧'] : ['me', 'pop', '✨'];
    }
    return { at: d[0], kind: d[1], em: Array.from(d[2]) };
  }
  function particles(R) {
    const a = AN[R.at], n = R.em.length; let s = '';
    R.em.forEach((e, i) => { s += '<text class="fxp ' + R.kind + '" x="' + f1(a[0] + (i - (n - 1) / 2) * 24) + '" y="' + a[1] + '" text-anchor="middle" font-size="26" style="animation-delay:' + (i * 0.16).toFixed(2) + 's">' + e + '</text>'; });
    if (R.kind === 'shake') s += '<rect class="flash" x="0" y="0" width="640" height="250"/>';
    return s;
  }

  function svg(S, o) {
    o = o || {};
    const age = S.age, lifeC = [COLS[1], COLS[0], COLS[2]][S.lifestyle], debt = L().debt(S), lab = o.lab || (() => ''), mini = !!o.mini, R = reactOf(o.react);
    const pop = k => R && R.kind === 'pop' && TARGET[R.at] === k ? ' pop' : '';
    const hi = homeInfo(S), H = house(S.bg, hi.tier, S, hi.own), j = S.joy.length ? S.joy[S.joy.length - 1] : 6;
    const mo = j >= 6.5 ? 'h' : j >= 4 ? 'n' : 's', stress = j < 3.5 || S.loans.some(l => l.name === 'pinjol');
    let s = '<svg viewBox="0 0 640 250" class="lf-sc bg-' + S.bg + ' lv-' + S.level + (R && R.kind === 'shake' ? ' shk' : '') + '" role="img" aria-label="' + esc(o.aria || '') + '" preserveAspectRatio="xMidYMax meet">';
    s += hot('sky', lab('sky'), sky(S, o) + '<rect class="hit" x="0" y="0" width="640" height="100"/>', '', mini) + district(S) + ground(S) + mood(S);
    s += hot('home', lab('home'), '<rect class="hit" x="' + (H.x0 - 14) + '" y="' + (GY - 130) + '" width="' + (H.Wd + 28) + '" height="132"/>' + H.svg, pop('home'), mini);
    if (S.car) s += '<g class="drive">' + hot('car', lab('car'), '<rect class="hit" x="146" y="' + (GY - 34) + '" width="40" height="40"/><text x="150" y="' + (GY + 4) + '" font-size="' + (S.bg === 'poor' ? 22 : 26) + '">' + (S.bg === 'poor' ? '🛵' : S.bg === 'rich' ? '🚘' : '🚗') + '</text>', pop('car'), mini) + '</g>';
    else if (S.lifestyle === 0) s += '<text x="150" y="' + (GY + 3) + '" font-size="20">🚲</text>';
    if (S.lifestyle === 0) s += '<text x="196" y="' + (GY + 2) + '" font-size="14">🌱</text>';
    s += hot('jar', lab('jar'), jar(S), pop('jar'), mini) + hot('work', lab('work'), work(S), pop('work'), mini);
    if (debt > 1) s += (() => { const tx = o.debt ? o.debt(debt) : '💳', w = Math.max(64, tx.length * 7.4 + 22); return '<g transform="translate(' + f1(clamp(H.x0 + H.Wd / 2, w / 2 + 4, 200)) + ' ' + Math.max(34, GY + H.top - 8) + ')"><rect class="debtb" x="' + f1(-w / 2) + '" y="-14" width="' + f1(w) + '" height="22" rx="11"/><text class="debtt" x="0" y="1" text-anchor="middle">' + tx + '</text></g>'; })();
    if (S.spouse || S.kids.length) {
      let f = ''; S.kids.forEach((b, i) => { const a = Math.max(0, age - b); f += person(404 + i * 22, { s: 0.38 + 0.62 * Math.min(1, a / 18), c: COLS[(i + 1) % 4], h: '#6b4a35', mood: 'h' }); });
      if (S.spouse) f += person(364, { s: 0.96, c: COLS[3], h: hair(age - 2), mood: mo === 's' ? 'n' : 'h' });
      s += hot('family', lab('family'), '<rect class="hit" x="346" y="' + (GY - 84) + '" width="' + (S.kids.length * 22 + 60) + '" height="88"/>' + f, pop('family'), mini);
    }
    if (o.ghost) s += hot('ghost', lab('ghost'), '<rect class="hit" x="276" y="' + (GY - 84) + '" width="34" height="88"/>' + person(294, { s: 0.95, c: 'var(--txt2)', h: '#cfd2dc', mood: 'h', ghost: true }) + '<text class="gtag" x="294" y="' + (GY - 90) + '" text-anchor="middle" font-size="15">👻</text>', '', mini);
    s += hot('me', lab('me'), '<rect class="hit" x="310" y="' + (GY - 84) + '" width="40" height="88"/>' + person(330, { s: 1, c: lifeC, h: hair(age), cane: age >= 60, bob: true, glam: S.lifestyle === 2, mood: mo, stress: stress, tie: S.bg === 'rich' }), pop('me'), mini);
    if (R) s += particles(R);
    return s + '</svg>';
  }

  /* ---------- event banners and the life timeline (unchanged idea) ---------- */
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

  MBALAB.lifeScene = { svg, banner, timeline, homeInfo };
})();
