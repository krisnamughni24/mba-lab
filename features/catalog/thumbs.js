/* Catalog thumbnails: one small inline SVG per simulation that pictures what it is about.
   MBALAB.thumbs[simulationId] = SVG markup. Classes (styled in catalog.css): a b c d = cyan / magenta / amber / green strokes,
   fa fb fc fd = the same colours as fills, g / fg = muted stroke / fill, tk = dark text on a coloured fill.
   A simulation without an entry falls back to its emoji icon. To give a new simulation a picture, add a line here (or set "thumb" in data/simulations.js). */
(function () {
  const S = body => '<svg viewBox="0 0 200 100" role="presentation" focusable="false" aria-hidden="true">' + body + '</svg>';
  const axes = '<path class="g" d="M20 10V86H186"/>';
  const T = {};

  T['smart-decision-studio'] = S(
    [[140, 'fd'], [110, 'fa'], [84, 'fb'], [52, 'fc']].map((r, i) => '<rect class="fg" x="26" y="' + (12 + i * 20) + '" width="156" height="12" rx="6"/><rect class="' + r[1] + '" x="26" y="' + (12 + i * 20) + '" width="' + r[0] + '" height="12" rx="6"/><circle class="' + r[1] + '" cx="' + (26 + r[0]) + '" cy="' + (18 + i * 20) + '" r="7" stroke="#fff" stroke-width="1.5"/>').join('') +
    '<path class="fc" d="M12 10l2.4 5 5.4.7-4 3.7 1 5.4L12 22.2 7.2 24.8l1-5.4-4-3.7 5.4-.7z"/>');

  T['disc-crisis-room'] = S(
    [['D', 'fb', 54, 8], ['I', 'fc', 102, 8], ['C', 'fa', 54, 52], ['S', 'fd', 102, 52]].map(q => '<rect class="' + q[1] + '" x="' + q[2] + '" y="' + q[3] + '" width="44" height="40" rx="8"/><text class="tk" x="' + (q[2] + 22) + '" y="' + (q[3] + 27) + '" text-anchor="middle">' + q[0] + '</text>').join('') +
    '<path class="g" d="M14 90h172" stroke-dasharray="3 6"/><circle class="fb" cx="30" cy="26" r="6"/><path class="b" d="M22 38l8-4 8 4"/>');

  T['bumn-explorer'] = S(
    '<circle class="fc o2" cx="160" cy="24" r="12"/>' +
    '<path class="g" d="M10 74h180"/>' +
    '<rect class="fa o2" x="22" y="48" width="16" height="26" rx="2"/><rect class="fb o2" x="42" y="38" width="18" height="36" rx="2"/><rect class="fd o2" x="64" y="52" width="14" height="22" rx="2"/>' +
    '<rect class="fc" x="84" y="20" width="26" height="54" rx="2"/><path class="c" d="M97 20V8"/><circle class="fc" cx="97" cy="7" r="2.5"/>' +
    '<rect class="fb o2" x="116" y="42" width="16" height="32" rx="2"/><rect class="fa o2" x="136" y="30" width="18" height="44" rx="2"/><rect class="fd o2" x="158" y="54" width="14" height="20" rx="2"/>' +
    '<path class="a" d="M10 84q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0"/><path class="a o" d="M10 92q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0"/>' +
    '<path class="fc" d="M96 18h2v2h-2z"/>');

  T['break-even-analysis'] = S(axes +
    '<path class="fd o" d="M128 38.5L186 14V47z"/><path class="b" d="M20 62L186 26"/><path class="d" d="M20 84L186 14"/>' +
    '<path class="g" d="M128 38.5V86" stroke-dasharray="3 4"/><circle class="fc" cx="128" cy="38.5" r="5"/><circle class="c" cx="128" cy="38.5" r="9" opacity=".5"/>');

  T['npv-capital-budgeting'] = S(
    '<path class="g" d="M16 52H186"/><rect class="fb" x="22" y="52" width="20" height="34" rx="3"/>' +
    [14, 22, 28, 32, 36].map((h, i) => '<rect class="fd" x="' + (52 + i * 26) + '" y="' + (52 - h) + '" width="20" height="' + h + '" rx="3"/>').join('') +
    '<path class="c" stroke-dasharray="4 4" d="M62 30Q100 30 124 40T182 60"/><circle class="fc" cx="182" cy="60" r="4"/>');

  T['porter-s-five-forces'] = S(
    '<path class="g" d="M100 26V40M100 60V74M54 50H84M116 50H146"/>' +
    '<path class="b" d="M96 34l4 6 4-6M96 66l4-6 4 6M78 46l6 4-6 4M122 46l-6 4 6 4"/>' +
    '<circle class="fc" cx="100" cy="50" r="12"/><circle class="fb" cx="100" cy="16" r="9"/><circle class="fb" cx="100" cy="84" r="9"/><circle class="fa" cx="44" cy="50" r="9"/><circle class="fa" cx="156" cy="50" r="9"/>');

  T['portfolio-risk-return'] = S(axes +
    '<path class="c" d="M32 76C40 40 80 28 176 24"/>' +
    [[60, 70], [84, 62], [110, 70], [130, 56], [150, 66], [100, 50], [70, 56], [168, 52]].map(p => '<circle class="fa o2" cx="' + p[0] + '" cy="' + p[1] + '" r="3.2"/>').join('') +
    '<circle class="fd" cx="71" cy="38" r="5"/><path class="g" d="M71 38H20M71 38V86" stroke-dasharray="3 4"/>');

  T['pricing-elasticity'] = S(axes +
    '<rect class="fa o" x="24" y="50" width="43" height="36"/><path class="a" d="M26 20Q70 70 184 82"/>' +
    '<path class="g" d="M67 50H20M67 50V86" stroke-dasharray="3 4"/><circle class="fc" cx="67" cy="50" r="5"/>' +
    '<path class="c" d="M150 14h24l6 6-6 6h-24z"/><circle class="fc" cx="158" cy="20" r="2"/>');

  T['market-segmentation'] = S(
    '<ellipse class="a o2" cx="52" cy="36" rx="34" ry="22" stroke-dasharray="4 4"/><ellipse class="b o2" cx="136" cy="32" rx="36" ry="20" stroke-dasharray="4 4"/><ellipse class="d o2" cx="98" cy="74" rx="40" ry="18" stroke-dasharray="4 4"/>' +
    [[40, 30], [52, 42], [62, 28], [46, 38], [58, 34], [34, 40]].map(p => '<circle class="fa" cx="' + p[0] + '" cy="' + p[1] + '" r="3.4"/>').join('') +
    [[124, 28], [138, 38], [150, 26], [130, 36], [144, 30], [158, 36]].map(p => '<circle class="fb" cx="' + p[0] + '" cy="' + p[1] + '" r="3.4"/>').join('') +
    [[84, 70], [98, 78], [110, 68], [92, 76], [104, 72], [118, 76]].map(p => '<circle class="fd" cx="' + p[0] + '" cy="' + p[1] + '" r="3.4"/>').join(''));

  T['inventory-eoq'] = S(axes +
    '<path class="a" d="M24 20L64 80V20L104 80V20L144 80V20L184 80"/><path class="c" d="M20 50H186" stroke-dasharray="4 4"/>' +
    '<circle class="fc" cx="64" cy="80" r="3.5"/><circle class="fc" cx="104" cy="80" r="3.5"/><circle class="fc" cx="144" cy="80" r="3.5"/>');

  T['bullwhip-effect'] = S(
    '<path class="g" d="M16 50H186" stroke-dasharray="3 5"/><path class="b" d="M20 50L50 44L70 56L90 38L112 62L132 28L152 72L172 16L184 84"/>' +
    [[20, 'fa'], [70, 'fa'], [112, 'fc'], [152, 'fb']].map(p => '<circle class="' + p[1] + '" cx="' + p[0] + '" cy="92" r="4"/>').join('') + '<path class="g" d="M24 92H66M74 92H108M116 92H148" stroke-dasharray="2 3"/>');

  T['negotiation-batna'] = S(
    '<path class="g" d="M14 86H186"/><rect class="fd o" x="80" y="14" width="40" height="64" rx="6"/>' +
    '<path class="b" stroke-width="9" d="M30 34H120"/><path class="a" stroke-width="9" d="M80 56H170"/>' +
    '<path class="fb" d="M30 24l6 10-6 10-6-10z"/><path class="fa" d="M170 46l6 10-6 10-6-10z"/>' +
    '<circle class="fc" cx="100" cy="45" r="5"/>');

  T['demand-forecasting'] = S(axes +
    '<path class="fc o" d="M110 52L186 20V62L110 56z"/><path class="a" d="M22 70L36 60 48 66 62 50 76 56 90 42 104 48 110 44"/>' +
    '<path class="c" stroke-dasharray="5 4" d="M110 44L134 36 160 30 184 24"/><path class="g" d="M110 12V86" stroke-dasharray="2 4"/><circle class="fc" cx="110" cy="44" r="4"/>');

  T['situational-leadership'] = S(
    [['fb', 20], ['fc', 58], ['fa', 96], ['fd', 134]].map((c, i) => '<rect class="' + c[0] + '" x="' + (c[1] + 6) + '" y="' + (72 - i * 17) + '" width="32" height="' + (14 + i * 17) + '" rx="5"/><text class="tk" x="' + (c[1] + 22) + '" y="' + (86 - i * 0) + '" text-anchor="middle" style="font-size:11px">S' + (i + 1) + '</text>').join('') +
    '<path class="g" d="M20 20Q60 8 100 24T180 18" stroke-dasharray="3 5"/>');

  MBALAB.thumbs = Object.assign(MBALAB.thumbs || {}, T);
})();
