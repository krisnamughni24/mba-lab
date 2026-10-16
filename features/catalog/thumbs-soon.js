/* Animated thumbnails for the coming-soon topics. Same classes and animations as thumbs.js (see catalog.css).
   Each topic maps to one reusable motif below, so a new topic only needs one line in MAP. */
(function () {
  const S = b => '<svg viewBox="0 0 200 100" role="presentation" focusable="false" aria-hidden="true">' + b + '</svg>';
  const axes = '<path class="g" d="M20 10V86H186"/>';
  const col = ['a', 'b', 'c', 'd'], fil = ['fa', 'fb', 'fc', 'fd'];
  const d = i => ';--d:' + (i * .2) + 's';
  const M = {
    // 2x2 matrix with letters, pulsing quadrants and a roaming dot
    matrix: (L, c) => S([[54, 8], [102, 8], [54, 52], [102, 52]].map((q, i) => '<g class="k-pulse" style="--d:' + (i * .5) + 's"><rect class="' + fil[(i + (c || 0)) % 4] + '" x="' + q[0] + '" y="' + q[1] + '" width="44" height="40" rx="8" opacity=".9"/><text class="tk" x="' + (q[0] + 22) + '" y="' + (q[1] + 27) + '" text-anchor="middle">' + L[i] + '</text></g>').join('') +
      '<circle class="fc k-ride" style="offset-path:path(\'M30 90Q100 50 170 12\')" cx="0" cy="0" r="4"/><path class="g" d="M14 90h172" stroke-dasharray="3 6"/>'),
    // bubbles of different size on axes (BCG, positioning maps)
    bubbles: s => S(axes + [[56, 30, 15], [120, 26, 9], [60, 66, 8], [136, 64, 12], [92, 46, 6]].slice(0, s || 5).map((b, i) => '<circle class="' + fil[i % 4] + ' k-pulse" style="--d:' + (i * .4) + 's" cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" opacity=".8"/>').join('') + '<path class="g" d="M103 10V86M20 48H186" stroke-dasharray="3 6"/>'),
    // curve drawn over axes with a rider dot
    curve: (p, p2) => S(axes + (p2 ? '<path class="b k-draw" pathLength="1" style="--d:.5s" d="' + p2 + '"/>' : '') + '<path class="a k-draw" pathLength="1" d="' + p + '"/><circle class="fc k-ride" style="offset-path:path(\'' + p + '\')" cx="0" cy="0" r="5"/><circle class="fc k-pulse" cx="178" cy="' + (p.match(/(\d+)$/) || [0, 20])[1] + '" r="4" opacity=".0"/>'),
    // growing bars with a trend line
    bars: (h, line) => S(axes + h.map((v, i) => '<rect class="' + fil[i % 4] + ' k-up" style="--d:' + (i * .18) + 's" x="' + (30 + i * (140 / h.length)) + '" y="' + (86 - v) + '" width="' + (110 / h.length) + '" height="' + v + '" rx="3" opacity=".7"/>').join('') + (line ? '<path class="c k-draw" pathLength="1" d="' + line + '"/>' : '')),
    // funnel with falling dots
    funnel: n => S([0, 1, 2, 3].slice(0, n || 4).map((_, i) => '<rect class="' + fil[i] + '" x="' + (30 + i * 12) + '" y="' + (10 + i * 19) + '" width="' + (140 - i * 24) + '" height="15" rx="7" opacity=".75"/>').join('') +
      [0, 1, 2].map(i => '<circle class="fc k-bob" style="--d:' + i * .5 + 's" cx="' + (80 + i * 20) + '" cy="' + (18 + i * 3) + '" r="3"/>').join('') + '<path class="d k-draw" pathLength="1" d="M100 86v8M94 90l6 6 6-6"/>'),
    // chain of nodes with a moving pulse; loop=true closes a ring
    chain: (n, loop) => {
      const xs = Array.from({ length: n }, (_, i) => 24 + i * (152 / (n - 1)));
      return S((loop ? '<ellipse class="g" cx="100" cy="50" rx="62" ry="30" stroke-dasharray="3 6"/>' : '<path class="g" d="M24 50H176" stroke-dasharray="3 6"/>') +
        (loop ? Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2 - Math.PI / 2; return '<circle class="' + fil[i % 4] + ' k-pulse" style="--d:' + i * .3 + 's" cx="' + (100 + 62 * Math.cos(a)).toFixed(1) + '" cy="' + (50 + 30 * Math.sin(a)).toFixed(1) + '" r="9"/>'; }).join('') + '<circle class="fc k-spin" style="transform-origin:100px 50px" cx="100" cy="20" r="3"/>'
          : xs.map((x, i) => '<rect class="' + fil[i % 4] + ' k-pulse" style="--d:' + i * .3 + 's" x="' + (x - 11) + '" y="' + (i === Math.floor(n / 2) ? 28 : 36) + '" width="22" height="' + (i === Math.floor(n / 2) ? 44 : 28) + '" rx="6" opacity=".85"/>').join('') + '<circle class="fc k-sx" cx="100" cy="50" r="4" style="animation-duration:2.4s"/>'));
    },
    // balance scale
    scale: () => S('<path class="g" d="M100 20V84M70 84H130"/><g class="k-bob"><path class="a" d="M40 34H160"/><path class="b" d="M40 34L26 62H54ZM160 34L146 62H174Z"/><circle class="fc" cx="40" cy="55" r="5"/><circle class="fd k-pulse" cx="160" cy="55" r="7"/></g><circle class="fa" cx="100" cy="20" r="5"/>'),
    // people nodes around a centre
    people: n => S(Array.from({ length: n || 5 }, (_, i) => { const a = i / (n || 5) * Math.PI * 2 - Math.PI / 2, x = 100 + 56 * Math.cos(a), y = 50 + 32 * Math.sin(a); return '<path class="g" d="M100 50L' + x.toFixed(1) + ' ' + y.toFixed(1) + '" stroke-dasharray="3 5"/><circle class="' + fil[i % 4] + ' k-pulse" style="--d:' + i * .35 + 's" cx="' + x.toFixed(1) + '" cy="' + (y - 4).toFixed(1) + '" r="6"/><path class="' + col[i % 4] + '" d="M' + (x - 9).toFixed(1) + ' ' + (y + 12).toFixed(1) + 'Q' + x.toFixed(1) + ' ' + (y + 2).toFixed(1) + ' ' + (x + 9).toFixed(1) + ' ' + (y + 12).toFixed(1) + '"/>'; }).join('') + '<circle class="fc k-pulse" cx="100" cy="50" r="9"/>'),
    // globe with orbiting dot
    globe: () => S('<circle class="a" cx="100" cy="50" r="36"/><ellipse class="a" cx="100" cy="50" rx="15" ry="36" opacity=".6"/><path class="a" d="M64 50H136M70 32H130M70 68H130" opacity=".6"/><ellipse class="b k-spin" style="transform-origin:100px 50px" cx="100" cy="50" rx="52" ry="14"/><circle class="fc k-pulse" cx="136" cy="30" r="5"/><circle class="fd k-pulse" style="--d:.8s" cx="70" cy="64" r="4"/>'),
    // pyramid / ladder
    pyramid: () => S([['fa', 14], ['fd', 34], ['fc', 54], ['fb', 74]].map((r, i) => '<rect class="' + r[0] + ' k-gx" style="--d:' + i * .2 + 's" x="' + (100 - (92 - i * 24) / 2) + '" y="' + (14 + (3 - i) * 20) + '" width="' + (92 - i * 24) + '" height="15" rx="4" opacity=".8"/>').join('').replace(/k-gx/g, 'k-pulse') + '<path class="c k-draw" pathLength="1" d="M100 8l4 8-8 0z"/>'),
    // target / bullseye with arrow
    target: () => S('<circle class="a" cx="100" cy="50" r="38"/><circle class="b" cx="100" cy="50" r="25"/><circle class="c" cx="100" cy="50" r="12"/><circle class="fd k-pulse" cx="100" cy="50" r="4"/><path class="d k-draw" pathLength="1" d="M178 8L102 48M178 8l-12 2M178 8l-2 12"/>'),
    // dice / randomness
    dice: () => S('<g class="k-bob"><rect class="a" x="30" y="30" width="40" height="40" rx="8"/><circle class="fa" cx="42" cy="42" r="3.5"/><circle class="fa" cx="58" cy="58" r="3.5"/><circle class="fa" cx="50" cy="50" r="3.5"/></g><g class="k-bob" style="--d:.7s"><rect class="b" x="84" y="22" width="40" height="40" rx="8"/><circle class="fb" cx="96" cy="34" r="3.5"/><circle class="fb" cx="112" cy="50" r="3.5"/></g><path class="c k-draw" pathLength="1" d="M20 90Q40 74 70 82T120 76T180 40"/><circle class="fc k-pulse" cx="180" cy="40" r="5"/>'),
    // bell / distribution
    bell: () => S(axes + '<path class="fa" opacity=".25" d="M24 86Q70 86 100 18Q130 86 180 86Z"/><path class="a k-draw" pathLength="1" d="M24 86Q70 86 100 18Q130 86 180 86"/><path class="c" d="M100 18V86" stroke-dasharray="3 5"/>' + [60, 80, 120, 140].map((x, i) => '<circle class="' + fil[(i + 1) % 4] + ' k-bob" style="--d:' + i * .4 + 's" cx="' + x + '" cy="' + (70 - i % 2 * 12) + '" r="3.5"/>').join('')),
    // 2x2 payoff grid (game theory)
    payoff: () => S('<rect class="g" x="36" y="12" width="128" height="76" rx="6"/><path class="g" d="M100 12V88M36 50H164"/>' + [[68, 30, 'fd'], [132, 30, 'fc'], [68, 70, 'fb'], [132, 70, 'fa']].map((c, i) => '<circle class="' + c[2] + ' k-pulse" style="--d:' + i * .4 + 's" cx="' + c[0] + '" cy="' + c[1] + '" r="9"/>').join('') + '<path class="c k-sx" d="M60 8h8M132 8h8"/>'),
    // queue of dots to a server
    queue: () => S('<rect class="fb" x="140" y="28" width="34" height="44" rx="8" opacity=".85"/><circle class="fc k-blink" cx="157" cy="50" r="5"/>' + Array.from({ length: 6 }, (_, i) => '<circle class="' + fil[i % 4] + ' k-sx" style="--d:' + i * .25 + 's" cx="' + (20 + i * 17) + '" cy="50" r="6"/>').join('') + '<path class="g" d="M14 66H134" stroke-dasharray="3 6"/>'),
    // gauges (scorecard, ratios)
    gauges: () => S([[56, 'a'], [144, 'b']].map((g, i) => '<path class="g" d="M' + (g[0] - 30) + ' 46A30 30 0 0 1 ' + (g[0] + 30) + ' 46"/><path class="' + g[1] + ' k-draw" pathLength="1" style="--d:' + i * .4 + 's" d="M' + (g[0] - 30) + ' 46A30 30 0 0 1 ' + (g[0] + 30) + ' 46"/><path class="c k-spin" style="transform-origin:' + g[0] + 'px 46px;animation-duration:' + (5 + i * 2) + 's" d="M' + g[0] + ' 46L' + (g[0] + 18) + ' 30"/>').join('') + [56, 144].map((x, i) => '<rect class="' + fil[i + 2] + ' k-up" style="--d:' + i * .3 + 's" x="' + (x - 22) + '" y="62" width="44" height="26" rx="5" opacity=".6"/>').join('')),
    // two overlapping circles (synergy, merger, VRIO)
    venn: () => S('<circle class="fa k-sx" cx="84" cy="50" r="30" opacity=".55"/><circle class="fb k-sxr" cx="116" cy="50" r="30" opacity=".55"/><circle class="fc k-pulse" cx="100" cy="50" r="6"/>'),
    // building blocks / canvas grid
    canvas: () => S([[14, 10, 52, 48], [70, 10, 30, 22], [70, 36, 30, 22], [104, 10, 30, 48], [138, 10, 24, 22], [138, 36, 24, 22], [166, 10, 22, 48], [14, 62, 86, 26], [104, 62, 84, 26]].map((r, i) => '<rect class="' + fil[i % 4] + ' k-pulse" style="--d:' + i * .25 + 's" x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" rx="4" opacity=".6"/>').join('')),
    // coin stack / cash
    coins: () => S([0, 1, 2, 3].map(i => '<ellipse class="fc k-up" style="--d:' + i * .2 + 's" cx="64" cy="' + (76 - i * 12) + '" rx="26" ry="8" opacity="' + (.5 + i * .12) + '"/>').join('') + '<path class="d k-draw" pathLength="1" d="M110 74L132 54L148 64L180 24"/><path class="d" d="M168 24h12v12"/><circle class="fc k-ride" style="offset-path:path(\'M110 74L132 54L148 64L180 24\')" cx="0" cy="0" r="4"/>'),
    // magnifier over bars
    scan: () => S([30, 46, 22, 58, 36].map((h, i) => '<rect class="' + fil[i % 4] + '" x="' + (26 + i * 26) + '" y="' + (86 - h) + '" width="16" height="' + h + '" rx="3" opacity=".45"/>').join('') + '<g class="k-sx"><circle class="c" cx="100" cy="44" r="20"/><path class="c" d="M114 59L130 76"/></g>'),
    // rocket / launch
    rocket: () => S('<path class="g" d="M10 88H190"/><g class="k-bob"><path class="b" d="M100 14Q120 36 114 62H86Q80 36 100 14Z"/><circle class="fa" cx="100" cy="40" r="6"/><path class="c" d="M86 62L76 74L86 70M114 62L124 74L114 70"/></g><path class="c k-blink" d="M100 68v14M94 68v10M106 68v10"/>'),
    // lightning / disruption
    bolt: () => S('<path class="fc k-pulse" d="M110 8L70 54H98L88 92L132 42H104Z" opacity=".9"/><path class="b k-sx" d="M20 30H50M150 66H180"/><path class="a k-sxr" d="M26 70H56M146 28H176"/>'),
    // heart/leaf for ESG
    leaf: () => S('<path class="fd k-pulse" d="M100 16C150 18 164 60 128 80C100 94 60 84 52 50C60 30 80 18 100 16Z" opacity=".75"/><path class="g" d="M70 78Q96 54 126 36"/><circle class="fc k-bob" cx="148" cy="22" r="8"/>'),
    // phone / store
    phone: () => S('<rect class="a" x="74" y="8" width="52" height="84" rx="9"/><path class="g" d="M90 84h20"/><rect class="fb k-up" x="82" y="22" width="36" height="14" rx="3" opacity=".7"/><rect class="fd k-up" style="--d:.3s" x="82" y="42" width="36" height="14" rx="3" opacity=".7"/><rect class="fc k-up" style="--d:.6s" x="82" y="62" width="36" height="14" rx="3" opacity=".7"/><circle class="fc k-bob" cx="148" cy="30" r="7"/><circle class="fa k-bob" style="--d:.8s" cx="52" cy="62" r="6"/>'),
    // shield / compass for ethics, risk
    shield: () => S('<path class="a" d="M100 10L148 26V54C148 72 124 86 100 92C76 86 52 72 52 54V26Z"/><path class="d k-draw" pathLength="1" d="M80 50L95 65L124 36"/><circle class="fb k-pulse" cx="162" cy="20" r="5"/>'),
    // chat bubbles
    chat: () => S('<path class="a k-bob" d="M24 18H114A8 8 0 0 1 122 26V48A8 8 0 0 1 114 56H60L44 70V56H24A8 8 0 0 1 16 48V26A8 8 0 0 1 24 18Z"/><path class="b k-bob" style="--d:.8s" d="M86 48H176A8 8 0 0 1 184 56V76A8 8 0 0 1 176 84H156V94L140 84H86A8 8 0 0 1 78 76V56A8 8 0 0 1 86 48Z"/><circle class="fc k-blink" cx="50" cy="37" r="3"/><circle class="fc k-blink" style="--d:.3s" cx="66" cy="37" r="3"/><circle class="fc k-blink" style="--d:.6s" cx="82" cy="37" r="3"/>'),
    // gantt / schedule
    gantt: () => S([[20, 14, 70], [50, 32, 60], [80, 50, 70], [110, 68, 60]].map((r, i) => '<rect class="fg" x="20" y="' + r[1] + '" width="160" height="12" rx="6"/><rect class="' + fil[i] + ' k-gx" style="--d:' + i * .25 + 's" x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="12" rx="6"/>').join('') + '<path class="b k-sx" d="M104 8V92" stroke-dasharray="3 5"/>'),
    // sliders / levers
    sliders: () => S([36, 100, 164].map((x, i) => '<path class="g" d="M' + x + ' 14V86"/><circle class="' + fil[i] + ' k-bob" style="--d:' + i * .6 + 's" cx="' + x + '" cy="' + (36 + i * 14) + '" r="9"/>').join('') + '<path class="c k-draw" pathLength="1" d="M36 40Q100 70 164 60"/>')
  };
  const up = 'M30 80Q80 78 110 56T178 18', rise = 'M30 78C70 78 80 30 110 30S150 20 178 20', hump = 'M24 80Q70 76 96 28Q120 70 178 80', down = 'M30 24Q90 30 120 60T178 78', s = 'M24 80C60 80 70 24 100 40S150 72 178 16';
  const MAP = {
    'swot-tows': M.matrix(['S', 'W', 'O', 'T']), 'bcg-matrix': M.bubbles(), 'ansoff-matrix': M.matrix(['→', '↗', '◆', '★'], 1),
    'blue-ocean': M.curve('M24 70Q60 20 100 60T178 30', 'M24 40Q64 82 100 36T178 70'), 'vrio-resource-based': M.venn(), 'pestel-scan': M.globe(),
    'value-chain': M.chain(5), 'balanced-scorecard': M.gauges(), 'ma-synergy': M.venn(),
    'dcf-wacc': M.coins(), 'irr-vs-npv': M.scale(), 'capital-structure': M.bars([22, 38, 54, 70, 80], 'M30 70L90 50L170 20'), 'capm-beta': M.curve(up), 'real-options': M.dice(),
    'dividend-policy': M.coins(), 'cash-conversion-cycle': M.chain(4, true), 'startup-runway': M.rocket(),
    'financial-ratios': M.gauges(), 'dupont-roe': M.canvas(), 'cost-volume-profit': M.curve(rise, 'M24 70L178 38'), 'activity-based-costing': M.chain(4), 'budget-variance': M.bars([40, 52, 36, 62, 48], 'M30 52Q90 40 170 46'),
    'transfer-pricing': M.scale(), 'earnings-quality': M.scan(),
    'marketing-mix-4p': M.matrix(['P', 'P', 'P', 'P'], 2), 'stp-positioning': M.bubbles(4), 'customer-ltv-cac': M.bars([30, 44, 58, 72], 'M30 76L90 56L170 22'), 'marketing-funnel': M.funnel(), 'kano-model': M.curve(rise, 'M24 30Q100 40 178 80'), 'product-lifecycle': M.curve(hump),
    'game-theory-price-war': M.payoff(), 'auction-bidding': M.dice(), 'cognitive-biases': M.shield(), 'ahp-decision-matrix': M.canvas(), 'conflict-resolution': M.people(5),
    'theory-of-constraints': M.chain(5), 'lean-six-sigma': M.bell(), 'queueing-capacity': M.queue(), 'supply-chain-risk': M.chain(4), 'project-crashing-pert': M.gantt(),
    'lean-startup': M.chain(3, true), 'business-model-canvas': M.canvas(), 'disruptive-innovation': M.bolt(), 'venture-term-sheet': M.funnel(3),
    'marginal-analysis': M.curve(s, 'M24 34Q90 40 178 80'), 'exchange-rate-exposure': M.curve(down, up), 'global-market-entry': M.globe(), 'hofstede-culture': M.globe(),
    'kotter-change': M.pyramid(), 'motivation-theories': M.pyramid(), 'tuckman-team': M.people(4), 'performance-management-okr': M.target(), 'talent-retention': M.people(6),
    'csr-esg': M.leaf(), 'umkm-digital': M.phone(),
    'pareto-root-cause': M.bars([76, 54, 36, 24, 14, 8], 'M34 14Q80 30 120 34T178 40'), 'regression-for-managers': M.curve('M30 76L178 24'), 'monte-carlo-risk': M.bell(),
    'ethical-dilemmas': M.shield(), 'emotional-intelligence': M.chat()
  };
  // spec strings "motif:arg" resolved against the motifs above
  const CUR = { up: [up], rise: [rise], hump: [hump], down: [down], fan: ['M24 80Q80 70 178 20', 'M24 80Q80 74 178 52'] };
  const BARS = { grow: [[18, 28, 40, 54, 70], 'M30 76L90 56L170 18'], cap: [[30, 30, 60, 60, 90], 'M30 62H170'] };
  const res = spec => {
    const [k, a] = spec.split(':');
    if (k === 'curve') return M.curve(CUR[a][0], CUR[a][1]);
    if (k === 'bars') return M.bars(BARS[a][0], BARS[a][1]);
    if (k === 'chain') return M.chain(parseInt(a, 10), /loop/.test(a));
    if (k === 'matrix') return M.matrix(a.split(''));
    if (k === 'people') return M.people(parseInt(a, 10));
    return M[k]();
  };
  const SPEC = {"financial-mgmt-objectives": "curve:up", "financial-statement-analysis": "scan", "financial-projections": "bars:grow", "management-accounting": "canvas", "time-value-of-money": "curve:rise", "financing-environment": "globe", "working-capital": "chain:4loop", "risk-return-concepts": "curve:hump", "capital-budgeting-cases": "coins", "creating-customer-value": "pyramid", "marketing-environment": "globe", "marketing-insights": "scan", "marketing-research": "sliders", "selling-race": "gantt", "product-service-mix": "matrix:PSLQ", "price-setting": "curve:down", "place-digital-channels": "funnel", "promotion-imc": "chat", "branding": "bolt", "operations-strategy": "matrix:CQDF", "product-service-design": "canvas", "project-management": "gantt", "strategic-capacity": "bars:cap", "process-design": "chain:5", "lean-operations": "chain:3loop", "statistical-quality-control": "bell", "sales-operations-planning": "chain:4loop", "mrp-erp": "canvas", "rational-decision-framework": "chain:5", "kepner-tregoe": "matrix:MWRS", "smart-method": "target", "decision-tree-ev": "chain:3", "scenario-planning": "curve:fan", "systems-thinking": "people:6", "negotiation-dilemma": "payoff", "negotiation-style": "people:4", "claiming-value": "venn", "distributive-integrative": "scale", "integrative-negotiation-technique": "canvas", "multiparty-negotiation": "people:6", "data-literacy": "scan", "descriptive-diagnostic": "bars:grow", "predictive-analytics": "curve:up", "prescriptive-analytics": "sliders", "marketing-analytics": "funnel", "finance-analytics": "curve:rise", "operations-analytics": "gauges", "people-analytics": "people:5", "big-data-analytics": "globe", "deep-learning": "people:6", "generative-ai-business": "bolt", };
  Object.keys(SPEC).forEach(id => { MAP[id] = res(SPEC[id]); });
  MBALAB.thumbs = Object.assign(MBALAB.thumbs || {}, MAP);
})();
