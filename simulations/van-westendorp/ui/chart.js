/* Van Westendorp chart as an SVG string. MBALAB.vwChart.svg(res, opts) / .x(svgEl, clientX, res)
   opts: price, hover, helper (dotted "not cheap"/"not expensive"), points, band (bootstrap ranges), truth (a second analysis drawn dotted), marks [{k,x,ok}], animate, fmt(p), label(key) */
(function () {
  const W = 720, H = 360, L = 50, R = 16, T0 = 16, B = 42;
  const CV = [['tc', 'vw-tc'], ['c', 'vw-c'], ['e', 'vw-e'], ['te', 'vw-te']], PT = ['pmc', 'opp', 'ipp', 'pme'];
  function svg(res, o) {
    o = o || {}; const g = res.grid, cv = res.cv, X = p => L + p / g.max * (W - L - R), Y = v => T0 + (1 - v) * (H - T0 - B);
    const path = (xs, a) => a.map((v, i) => (i ? 'L' : 'M') + X(xs[i]).toFixed(1) + ' ' + Y(v).toFixed(1)).join('');
    const fmt = o.fmt || (p => Math.round(p)), tn = 6;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="vw-svg ${o.animate ? 'draw' : ''}" role="img" aria-label="${o.aria || ''}" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="vgClip"><rect class="vw-rev" x="${L}" y="0" width="${W - L - R}" height="${H}"/></clipPath><pattern id="vgHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="6" fill="currentColor" opacity=".35"/></pattern></defs>`;
    for (let i = 0; i <= 4; i++) { const v = i / 4; s += `<line class="vw-gl" x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text class="vw-ax" x="${L - 8}" y="${Y(v) + 4}" text-anchor="end">${Math.round(v * 100)}%</text>`; }
    for (let i = 0; i <= tn; i++) { const p = g.max * i / tn; s += `<line class="vw-gl v" x1="${X(p)}" x2="${X(p)}" y1="${T0}" y2="${H - B}"/><text class="vw-ax" x="${X(p)}" y="${H - B + 18}" text-anchor="middle">${o.compact ? o.compact(p) : fmt(p)}</text>`; }
    s += `<text class="vw-axt" x="${(L + W - R) / 2}" y="${H - 4}" text-anchor="middle">${o.axX || ''}</text><text class="vw-axt" transform="translate(12 ${(T0 + H - B) / 2}) rotate(-90)" text-anchor="middle">${o.axY || ''}</text>`;
    if (res.sane) {
      s += `<rect class="vw-band" x="${X(res.pts.pmc.x)}" y="${T0}" width="${Math.max(0, X(res.pts.pme.x) - X(res.pts.pmc.x))}" height="${H - T0 - B}"/>`;
      if (o.band) [o.band.pmc, o.band.pme].forEach(b => { if (b) s += `<rect class="vw-fuzz" x="${X(b[0])}" y="${T0}" width="${Math.max(3, X(b[1]) - X(b[0]))}" height="${H - T0 - B}" fill="url(#vgHatch)"/>`; });
    }
    if (o.truth) { const t = o.truth; CV.forEach(c => { s += `<path class="vw-curve vw-truth ${c[1]}" d="${path(t.cv.xs, t.cv[c[0]])}"/>`; }); }
    s += `<g clip-path="url(#vgClip)">`;
    if (o.helper) { s += `<path class="vw-curve vw-help vw-c" d="${path(cv.xs, cv.nc)}"/><path class="vw-curve vw-help vw-e" d="${path(cv.xs, cv.ne)}"/>`; }
    s += CV.map(c => `<path class="vw-curve ${c[1]}" d="${path(cv.xs, cv[c[0]])}"/>`).join('') + `</g>`;
    if (o.points && res.sane) {
      s += `<g class="vw-pts-g">`; const lab = { pmc: [-4, -12, 'end'], opp: [0, -14, 'middle'], ipp: [0, 24, 'middle'], pme: [6, -12, 'start'] };
      PT.forEach(k => { const q = res.pts[k], x = X(q.x), y = Y(q.y), l = lab[k]; s += `<circle class="vw-pt" cx="${x}" cy="${y}" r="5.5"/><text class="vw-ptl" x="${x + l[0]}" y="${y + l[1]}" text-anchor="${l[2]}">${k.toUpperCase()}</text>`; });
      s += `</g>`;
    }
    (o.marks || []).forEach(m => { const q = res.pts[m.k]; if (!q) return; const gx = X(m.x), tx = X(q.x), ty = Y(q.y);
      s += `<line class="vw-mk-l" x1="${gx}" y1="${T0}" x2="${tx}" y2="${ty}"/><path class="vw-mk ${m.ok ? 'ok' : 'no'}" d="M${gx - 6} ${T0 + 2}l12 0-6 11z"/><circle class="vw-mk-t ${m.ok ? 'ok' : 'no'}" cx="${tx}" cy="${ty}" r="7"/><text class="vw-ptl" x="${tx}" y="${ty + 22}" text-anchor="middle">${m.k.toUpperCase()}</text>`; });
    if (o.price != null) s += `<line class="vw-you" x1="${X(o.price)}" x2="${X(o.price)}" y1="${T0}" y2="${H - B}"/><path class="vw-youm" d="M${X(o.price) - 6} ${T0 - 2}h12l-6 9z"/>`;
    if (o.hover != null) s += `<line class="vw-hov" x1="${X(o.hover)}" x2="${X(o.hover)}" y1="${T0}" y2="${H - B}"/>`;
    return s + `<rect class="sk-hit" x="${L}" y="${T0}" width="${W - L - R}" height="${H - T0 - B}" fill="transparent"/></svg>`;
  }
  /* pointer position -> price on the grid */
  function x(el, clientX, res) { const r = el.getBoundingClientRect(), px = (clientX - r.left) / r.width * W; if (px < L || px > W - R) return null; const g = res.grid; return Math.round((px - L) / (W - L - R) * g.max / g.step) * g.step; }
  window.MBALAB = window.MBALAB || {}; MBALAB.vwChart = { svg, x, W, H };
})();
