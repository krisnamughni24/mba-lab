/* Bot playthroughs of every mission: node simulations/negotiation-batna/tests/bots.js. Prints the average score per mission for a few bot styles (careful, lazy, lowballer, overpayer). */
const N = require('../engine/engine.js');
function run(i, pol) { const s = N.create(i); let g = 0; pol.pre && pol.pre(s);
  while (!s.over && g++ < 40) { const a = pol.act(s); if (a === 'walk') N.walk(s); else if (a === 'acc') N.accept(s); else if (a && a.ally != null) N.ally(s, a.ally); else N.offer(s, a.x, a.who); }
  return N.result(s); }
// a patient anchor: start ~ 0.7*batna, raise by small steps toward batna, use allies first, accept when ask<=batna-?
const mk = (f0, st) => ({ act: s => { const L = s.L;
  if (s.allies[0] && s.allies[0].uses > 0 && s.round === 1) return { ally: 0 };
  if (s.allies[1] && s.allies[1].uses > 0 && s.round === 2) return { ally: 1 };
  if (s.intel != null && s.intel > L.batna + 1) return 'walk';
  if (!L.zopa && s.round > 3 && !s.intel) return 'walk';
  const tgt = s.intel != null ? s.intel : L.batna * .85; const x = Math.round((s.last == null ? L.batna * f0 : s.last + Math.max(2, (tgt - s.last) * st)));
  if (s.ask <= tgt + 2 && s.ask <= L.batna) return 'acc';
  return { x: Math.min(x, L.batna - 1), who: s.opps.length > 1 ? (s.round % 2) : undefined }; } });
const smart = mk(.8, .4);
const lazy = { act: s => s.ask <= s.L.batna ? 'acc' : { x: Math.round(s.L.batna * .8), who: 0 } };
const low = { act: s => ({ x: 70 }) };
const rich = { act: s => ({ x: s.L.batna }) };
for (const [n, p] of Object.entries({ s72: mk(.72,.35), s76: mk(.76,.4), s80: mk(.8,.4), s84: mk(.84,.5), lazy, low, rich })) { const row = []; for (let i = 0; i < 12; i++) { let sc = 0, st = 0, K = 40; for (let k = 0; k < K; k++) { const r = run(i, p); sc += r.score; st += r.stars; } row.push((sc / K).toFixed(0)); } console.log(n.padEnd(6), row.join(' ')); }
