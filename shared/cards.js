/* Scenario card picker (the BATNA look, shared by every scenario simulation).
   MBALAB.cards.card({...}) returns one case card: an animated SVG picture that matches the case, a number badge,
   emoji chips, title, tag, short text, difficulty diamonds and a footer (stars or any html). Styles: .sc-card2 in shared/scenario.css.
   MBALAB.cards.art(kind, o) draws the picture alone. Kinds: ab, forces, govern, disc, whip, coop (village | remote | fishing), generic.
   A new simulation only needs `kind` and a few numbers per case, for example: card({ kind: 'forces', f: [88, 90, 30, 60, 55], icon: '☕', ... }). */
(function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let uid = 0;
  const AC = ['#ff6ad5', '#4dd2ff', '#ffd166', '#a78bfa', '#ffb36b', '#6ee7b7', '#ff7a7a', '#7dd3fc'];
  const base = (ac, id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${ac}" stop-opacity=".42"/><stop offset="1" stop-color="${ac}" stop-opacity=".06"/></linearGradient></defs><rect width="240" height="112" fill="url(#${id})"/><circle class="sc2-orb" cx="206" cy="26" r="34" fill="${ac}" opacity=".16"/><path d="M0 98H240" stroke="${ac}" stroke-opacity=".35"/>`;
  const emo = (icon, x, y, s) => `<text class="sc2-em" x="${x}" y="${y}" text-anchor="middle" font-size="${s || 40}">${icon || ''}</text>`;
  const D = (n, t) => ` style="--d:${(n * .25).toFixed(2)}s${t ? ';' + t : ''}"`;

  const KIND = {
    /* two page variants, the visitor's cursor clicks the better one, bars grow for A and B */
    ab: (ac, o) => {
      const up = (o.lift == null ? .1 : o.lift) >= 0, hb = Math.max(10, Math.min(46, 28 + (o.lift || 0) * 120)), ha = 28;
      const page = (x, c, h, lbl, k) => `<g><rect x="${x}" y="14" width="86" height="66" rx="9" fill="currentColor" opacity=".08" stroke="${c}" stroke-opacity=".7"/><rect x="${x + 8}" y="22" width="40" height="6" rx="3" fill="${c}" opacity=".5"/><rect x="${x + 8}" y="33" width="70" height="4" rx="2" fill="currentColor" opacity=".18"/><rect class="sc2-btn" ${D(k)} x="${x + 8}" y="42" width="34" height="11" rx="5.5" fill="${c}"/><rect class="sc2-bar" ${D(k + 1)} x="${x + 56}" y="${(76 - h).toFixed(1)}" width="14" height="${h.toFixed(1)}" rx="3" fill="${c}" opacity=".75"/><text x="${x + 8}" y="72" font-size="11" font-weight="800" fill="${c}">${lbl}</text></g>`;
      return page(14, '#9aa7c7', ha, 'A', 0) + page(140, up ? '#6ee7b7' : '#ff7a7a', hb, 'B', 1) + `<circle class="sc2-cur" cx="30" cy="58" r="5" fill="${ac}"/>` + emo(o.icon, 120, 56, 30);
    },
    /* five forces round a firm; node size = how strong that force is */
    forces: (ac, o) => {
      const f = o.f || [60, 60, 60, 60, 60];
      return f.map((v, i) => { const a = i / 5 * Math.PI * 2 - Math.PI / 2, x = 120 + 64 * Math.cos(a), y = 56 + 29 * Math.sin(a); return `<path d="M120 54L${x.toFixed(1)} ${y.toFixed(1)}" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="3 4"/><circle class="sc2-pu" ${D(i, 'transform-origin:' + x.toFixed(1) + 'px ' + y.toFixed(1) + 'px')} cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(4 + v / 100 * 7).toFixed(1)}" fill="${v > 66 ? '#ff7a7a' : v > 40 ? '#ffd166' : '#6ee7b7'}" opacity=".9"/>`; }).join('') + `<circle cx="120" cy="54" r="21" fill="${ac}" opacity=".25"/>` + emo(o.icon, 120, 66, 30);
    },
    /* shield with a check, a risk gauge with a swinging needle */
    govern: (ac, o) => {
      const risk = o.risk == null ? .5 : o.risk;
      return `<path d="M62 14L98 26V50C98 66 80 78 62 84C44 78 26 66 26 50V26Z" fill="${ac}" opacity=".18" stroke="${ac}" stroke-width="2"/><path class="sc2-ck" pathLength="1" d="M46 50L58 62L80 36" fill="none" stroke="#6ee7b7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<path d="M112 70A34 34 0 0 1 180 70" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="8" stroke-linecap="round"/><path d="M112 70A34 34 0 0 1 134 38" fill="none" stroke="#6ee7b7" stroke-width="8" stroke-linecap="round"/><path d="M134 38A34 34 0 0 1 158 38" fill="none" stroke="#ffd166" stroke-width="8"/><path d="M158 38A34 34 0 0 1 180 70" fill="none" stroke="#ff7a7a" stroke-width="8" stroke-linecap="round"/>` +
        `<g class="sc2-nd" style="--a:${(-70 + risk * 140).toFixed(0)}deg;transform-origin:146px 70px"><path d="M146 70L146 42" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></g><circle cx="146" cy="70" r="5" fill="currentColor"/>` + emo(o.icon, 208, 84, 34);
    },
    /* four DISC colours that take turns to pulse */
    disc: (ac, o) => [['D', '#ff6b6b'], ['I', '#ffd166'], ['S', '#6ee7b7'], ['C', '#4dd2ff']].map((q, i) => { const x = 50 + (i % 2) * 38, y = 28 + Math.floor(i / 2) * 36; return `<g class="sc2-pu" ${D(i, 'transform-origin:' + x + 'px ' + y + 'px')}><circle cx="${x}" cy="${y}" r="16" fill="${q[1]}" opacity=".85"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="800" fill="#0b1226">${q[0]}</text></g>`; }).join('') +
      `<path d="M104 56H150" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="3 4"/><path class="sc2-ck" pathLength="1" d="M112 48L146 56L112 64" fill="none" stroke="${ac}" stroke-width="3" stroke-linecap="round"/>` + emo(o.icon, 190, 70, 44),
    /* a supply chain: each step swings wider (the whip) */
    whip: (ac, o) => {
      const n = o.n || 4, gap = 190 / n;
      return Array.from({ length: n }, (_, i) => { const x = 28 + i * gap + gap / 2 - 12, h = 12 + i * 11; return `<path d="M${x + 12} 80V40" stroke="currentColor" stroke-opacity=".15"/><rect class="sc2-sw" ${D(i, 'transform-origin:' + (x + 12) + 'px 80px;--h:' + (1 + i * .35).toFixed(2))} x="${x + 4}" y="${80 - h}" width="16" height="${h}" rx="4" fill="${AC[(i + 1) % 4]}" opacity=".85"/><rect x="${x}" y="82" width="24" height="12" rx="4" fill="currentColor" opacity=".18"/>`; }).join('') + emo(o.icon, 212, 30, 28);
    },
    /* a cooperative: village, remote hills or a fishing coast */
    coop: (ac, o) => {
      const m = o.mode || 'village';
      let s = `<circle class="sc2-sun" cx="40" cy="28" r="12" fill="#ffd166" opacity=".9"/>`;
      if (m === 'fishing') s += `<path class="sc2-wv" d="M0 80Q20 70 40 80T80 80T120 80T160 80T200 80T240 80V112H0Z" fill="#4dd2ff" opacity=".3"/><g class="sc2-bt"><path d="M92 74H148L138 88H102Z" fill="${ac}"/><path d="M120 74V40L142 70Z" fill="#fff" opacity=".85"/></g><path class="sc2-wv" style="--d:.8s" d="M0 92Q20 84 40 92T80 92T120 92T160 92T200 92T240 92V112H0Z" fill="#4dd2ff" opacity=".4"/>`;
      else if (m === 'remote') s += `<path d="M0 98L40 56L66 80L106 38L150 84L190 52L240 98Z" fill="${ac}" opacity=".35"/><path d="M0 98Q80 86 120 92T240 82" stroke="currentColor" stroke-opacity=".4" stroke-dasharray="4 5" fill="none"/><g class="sc2-tr"><rect x="34" y="82" width="26" height="12" rx="3" fill="#ffb36b"/><circle cx="40" cy="95" r="3.5" fill="currentColor"/><circle cx="55" cy="95" r="3.5" fill="currentColor"/></g>`;
      else s += [[34, 70], [78, 62], [122, 70], [166, 64]].map((h, i) => `<g class="sc2-bob" ${D(i)}><rect x="${h[0]}" y="${h[1]}" width="30" height="26" rx="3" fill="${AC[i]}" opacity=".85"/><path d="M${h[0] - 4} ${h[1]}L${h[0] + 15} ${h[1] - 14}L${h[0] + 34} ${h[1]}Z" fill="#ff7a7a"/></g>`).join('');
      return s + emo(o.icon, 208, 70, 34);
    },
    generic: (ac, o) => emo(o.icon, 120, 74, 52)
  };

  const art = (kind, o) => { o = o || {}; const ac = o.ac || AC[0], id = 'sc2g' + (++uid); return `<svg class="sc2-art" viewBox="0 0 240 112" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${base(ac, id)}${(KIND[kind] || KIND.generic)(ac, o)}</svg>`; };

  /* o: kind, ac, i (index, staggers the entrance), badge, who[] (emoji chips), title, tag, desc, diff (0..5), foot (html), locked, lockTip, attrs (extra attributes), cls, tag2 (element tag, default button) */
  const card = o => {
    const ac = o.ac || AC[(o.i || 0) % AC.length], diff = o.diff == null ? null : Math.max(1, Math.min(5, o.diff));
    return `<button type="button" class="sc-card2 ${o.cls || ''}${o.locked ? ' locked' : ''}" style="--ac:${ac};--i:${o.i || 0}" ${o.attrs || ''} ${o.locked ? 'disabled' : ''} ${o.locked && o.lockTip ? `title="${esc(o.lockTip)}"` : ''}>${art(o.kind, Object.assign({ ac }, o))}` +
      `${o.badge ? `<span class="sc2-n">${esc(o.badge)}</span>` : ''}${o.locked ? '<span class="sc2-lock" aria-hidden="true">🔒</span>' : ''}` +
      `<span class="sc2-body">${o.who && o.who.length ? `<span class="sc2-who" aria-hidden="true">${o.who.map(w => `<span class="sc2-av">${w}</span>`).join('')}</span>` : ''}<b class="sc2-tt">${esc(o.title)}</b>${o.tag ? `<i class="sc2-tg">${esc(o.tag)}</i>` : ''}${o.desc ? `<small class="sc2-ds">${esc(o.desc)}</small>` : ''}</span>` +
      `<span class="sc2-ft">${diff ? `<span class="sc2-df" aria-hidden="true">${[1, 2, 3, 4, 5].map(k => `<u class="${k <= diff ? 'on' : ''}"></u>`).join('')}</span>` : '<span></span>'}<span class="sc2-fx">${o.foot || ''}</span></span></button>`;
  };
  window.MBALAB = window.MBALAB || {}; MBALAB.cards = { card, art, AC };
})();
