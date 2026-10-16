/* Decision Tree: pure logic (no DOM, no MBALAB), testable in node.
   Node  = { id, k:'d'|'c'|'e', n:name, pay:number (only for 'e'), kids:[Edge] }
   Edge  = { id, l:label, v:number (cash flow when this branch is taken, costs negative), p:number 0..1 (only under a chance node), n:Node }
   Value of an end = pay; chance = sum p*(v+child); decision = max(v+child). Money is in million rupiah (Rp mn). */
(function (root) {
  const sum = a => a.reduce((x, y) => x + y, 0), num = x => (isFinite(+x) ? +x : 0);
  let uid = 1; const nid = () => 'n' + (uid++), eid = () => 'e' + (uid++);
  const end = (n, pay) => ({ id: nid(), k: 'e', n: n || '', pay: pay == null ? 0 : pay, kids: [] });
  const node = (k, n, kids) => ({ id: nid(), k, n: n || '', kids: kids || [] });
  const edge = (l, child, o) => Object.assign({ id: eid(), l, v: 0, n: child }, o || {});
  const clone = t => JSON.parse(JSON.stringify(t));
  const walk = (n, f, parent, via) => { f(n, parent, via); n.kids.forEach(e => walk(e.n, f, n, e)); };
  const find = (t, id) => { let r = null; walk(t, (n, p, e) => { if (n.id === id) r = { node: n, parent: p, edge: e }; }); return r; };
  const pOf = n => { const s = sum(n.kids.map(e => Math.max(0, num(e.p)))); return n.kids.map(e => s > 0 ? Math.max(0, num(e.p)) / s : 1 / n.kids.length); };

  /* roll back: returns { ev:{nodeId:value}, best:{decisionId:edgeIndex}, edge:{edgeId:value} } */
  function solve(t) {
    const ev = {}, best = {}, edgeV = {};
    (function go(n) {
      if (n.k === 'e' || !n.kids.length) { ev[n.id] = num(n.pay); return ev[n.id]; }
      const vals = n.kids.map(e => { const x = num(e.v) + go(e.n); edgeV[e.id] = x; return x; });
      if (n.k === 'd') { let bi = 0; vals.forEach((x, i) => { if (x > vals[bi] + 1e-9) bi = i; }); best[n.id] = bi; ev[n.id] = vals[bi]; }
      else { const p = pOf(n); ev[n.id] = sum(vals.map((x, i) => x * p[i])); }
      return ev[n.id];
    })(t);
    return { ev, best, edge: edgeV };
  }
  /* the recommended plan: for each decision reached under the best policy, which branch to take */
  function plan(t, S) {
    const out = [];
    (function go(n, depth) {
      if (n.k === 'd' && n.kids.length) { const i = S.best[n.id]; out.push({ id: n.id, name: n.n, choice: n.kids[i].l, idx: i, depth }); go(n.kids[i].n, depth + 1); }
      else n.kids.forEach(e => go(e.n, depth + 1));
    })(t, 0);
    return out;
  }
  /* distribution of final outcomes when following the best policy */
  function profile(t, S) {
    const outs = [];
    (function go(n, p, acc, path) {
      if (n.k === 'e' || !n.kids.length) { outs.push({ p, val: acc + num(n.pay), path }); return; }
      if (n.k === 'd') { const e = n.kids[S.best[n.id]]; go(e.n, p, acc + num(e.v), path.concat([e.l])); }
      else { const ps = pOf(n); n.kids.forEach((e, i) => go(e.n, p * ps[i], acc + num(e.v), path.concat([e.l]))); }
    })(t, 1, 0, []);
    const mean = sum(outs.map(o => o.p * o.val)), sd = Math.sqrt(sum(outs.map(o => o.p * (o.val - mean) ** 2)));
    return { outs, mean, sd, min: Math.min(...outs.map(o => o.val)), max: Math.max(...outs.map(o => o.val)), pLoss: sum(outs.filter(o => o.val < -1e-9).map(o => o.p)) };
  }
  /* expected value of perfect information: decide AFTER every chance node is known */
  function evpi(t, S) {
    const C = []; walk(t, n => { if (n.k === 'c' && n.kids.length) C.push(n); });
    const space = C.reduce((a, n) => a * n.kids.length, 1); if (space > 20000) return null;
    const idx = {}; let total = 0;
    const val = n => {
      if (n.k === 'e' || !n.kids.length) return num(n.pay);
      if (n.k === 'c') { const e = n.kids[idx[n.id]]; return num(e.v) + val(e.n); }
      return Math.max(...n.kids.map(e => num(e.v) + val(e.n)));
    };
    (function rec(i, p) {
      if (i === C.length) { total += p * val(t); return; }
      const ps = pOf(C[i]); C[i].kids.forEach((e, j) => { idx[C[i].id] = j; rec(i + 1, p * ps[j]); });
    })(0, 1);
    return Math.max(0, total - S.ev[t.id]);
  }
  /* sensitivity: set one chance branch to probability x (siblings rescaled), EV of each option at the root */
  function withP(t, edgeId, x) {
    const c = clone(t), f = find(c, 'x'); let par = null;
    walk(c, n => { if (n.kids.some(e => e.id === edgeId)) par = n; }); if (!par) return c;
    const sib = par.kids.filter(e => e.id !== edgeId), cur = pOf(par), tgt = par.kids.findIndex(e => e.id === edgeId), rest = 1 - cur[tgt];
    par.kids.forEach((e, i) => { e.p = i === tgt ? x : (rest > 1e-9 ? cur[i] / rest * (1 - x) : (1 - x) / Math.max(1, sib.length)); });
    return c;
  }
  function sens(t, edgeId, steps, R) {
    steps = steps || 50; const xs = [], series = t.kids.map(() => []), top = [];
    for (let i = 0; i <= steps; i++) {
      const x = i / steps, c = withP(t, edgeId, x), S = (R && isFinite(R)) ? solveRA(c, R) : solve(c); xs.push(x);
      t.kids.forEach((e, j) => series[j].push(S.edge[c.kids[j].id]));
      top.push(t.k === 'd' ? S.best[c.id] : -1);
    }
    const cross = [];
    for (let i = 1; i <= steps; i++) if (top[i] !== top[i - 1] && top[i] >= 0) {
      const a = top[i - 1], b = top[i], d0 = series[a][i - 1] - series[b][i - 1], d1 = series[a][i] - series[b][i];
      const f = d0 === d1 ? 0.5 : d0 / (d0 - d1); cross.push({ x: xs[i - 1] + f / steps, from: a, to: b });
    }
    return { xs, series, top, cross };
  }
  function probEdges(t) { const out = []; walk(t, n => { if (n.k === 'c') n.kids.forEach(e => out.push({ edge: e, parent: n })); }); return out; }
  function validate(t) {
    const issues = [];
    walk(t, n => {
      if (n.k === 'c' && n.kids.length) { const s = sum(n.kids.map(e => num(e.p))); if (Math.abs(s - 1) > 0.005) issues.push({ id: n.id, code: 'psum', s }); if (n.kids.length < 2) issues.push({ id: n.id, code: 'one' }); }
      if (n.k === 'd' && n.kids.length < 2) issues.push({ id: n.id, code: 'one' });
      if (n.k !== 'e' && !n.kids.length) issues.push({ id: n.id, code: 'empty' });
    });
    return issues;
  }
  /* utility view: certainty equivalent under exponential utility (risk tolerance R in Rp mn). R=Infinity -> expected value */
  function solveRA(t, R) {
    if (!isFinite(R) || R <= 0) return solve(t);
    const ev = {}, best = {}, edgeV = {};
    const u = x => 1 - Math.exp(-x / R), ui = y => -R * Math.log(1 - y);
    (function go(n) {
      if (n.k === 'e' || !n.kids.length) { ev[n.id] = num(n.pay); return ev[n.id]; }
      const vals = n.kids.map(e => { const x = num(e.v) + go(e.n); edgeV[e.id] = x; return x; });
      if (n.k === 'd') { let bi = 0; vals.forEach((x, i) => { if (x > vals[bi] + 1e-9) bi = i; }); best[n.id] = bi; ev[n.id] = vals[bi]; }
      else { const p = pOf(n); ev[n.id] = ui(sum(vals.map((x, i) => u(x) * p[i]))); }
      return ev[n.id];
    })(t);
    return { ev, best, edge: edgeV };
  }
  /* presets. labels are keys resolved by the UI; money in Rp mn */
  const L = (en, id, ja, zh) => ({ en, id, ja, zh });
  const PRESETS = [
    { id: 'cafe', icon: '☕', name: L('Open a second café?', 'Buka kafe cabang kedua?', '2号店を出す？', '开第二家分店？'),
      story: L('Demand in the new district is uncertain. A small pilot kiosk costs little but delays the big move. What is the smartest path?', 'Permintaan di distrik baru belum pasti. Kios percobaan murah tetapi menunda langkah besar. Jalur mana yang paling cerdas?', '新エリアの需要は不確実。小さな試験店は安いが本格出店は遅れる。最も賢い進め方は？', '新区域需求不确定。小型试点便宜，但会推迟大动作。哪条路径最聪明？'),
      build() {
        const big = () => node('c', L('Demand', 'Permintaan', '需要', '需求'), [
          edge(L('High', 'Tinggi', '高', '高'), end('', 2600), { p: 0.35 }), edge(L('Medium', 'Sedang', '中', '中'), end('', 1300), { p: 0.4 }), edge(L('Low', 'Rendah', '低', '低'), end('', 200), { p: 0.25 })]);
        const pilot = node('c', L('Pilot result', 'Hasil percobaan', '試験結果', '试点结果'), [
          edge(L('Strong', 'Kuat', '好調', '良好'), node('d', L('Scale up?', 'Besarkan?', '拡大する？', '要扩大吗？'), [
            edge(L('Open full branch', 'Buka cabang penuh', '本格出店', '全面开店'), node('c', L('Demand', 'Permintaan', '需要', '需求'), [
              edge(L('High', 'Tinggi', '高', '高'), end('', 2600), { p: 0.6 }), edge(L('Medium', 'Sedang', '中', '中'), end('', 1300), { p: 0.35 }), edge(L('Low', 'Rendah', '低', '低'), end('', 200), { p: 0.05 })]), { v: -800 }),
            edge(L('Stay small', 'Tetap kecil', '小さく続ける', '保持小规模'), end('', 350))]), { p: 0.45 }),
          edge(L('Weak', 'Lemah', '不調', '不佳'), node('d', L('Scale up?', 'Besarkan?', '拡大する？', '要扩大吗？'), [
            edge(L('Open full branch', 'Buka cabang penuh', '本格出店', '全面开店'), node('c', L('Demand', 'Permintaan', '需要', '需求'), [
              edge(L('High', 'Tinggi', '高', '高'), end('', 2600), { p: 0.1 }), edge(L('Medium', 'Sedang', '中', '中'), end('', 1300), { p: 0.4 }), edge(L('Low', 'Rendah', '低', '低'), end('', 200), { p: 0.5 })]), { v: -800 }),
            edge(L('Close kiosk', 'Tutup kios', '撤退', '关闭试点'), end('', 0))]), { p: 0.55 })]);
        return node('d', L('Expansion', 'Ekspansi', '拡大戦略', '扩张'), [
          edge(L('Open now', 'Buka sekarang', '今すぐ出店', '立即开店'), big(), { v: -800 }),
          edge(L('Pilot kiosk first', 'Kios percobaan dulu', 'まず試験店', '先试点'), pilot, { v: -150 }),
          edge(L('Do nothing', 'Tidak melakukan apa-apa', '何もしない', '不行动'), end('', 0))]);
      } },
    { id: 'research', icon: '🔎', name: L('Research before launch?', 'Riset dulu sebelum meluncur?', '発売前に調査する？', '上市前先做调研？'),
      story: L('A launch costs Rp 500 mn and pays Rp 1,400 mn if it works. A market study costs Rp 80 mn. Is the information worth buying?', 'Peluncuran Rp 500 jt dan menghasilkan Rp 1.400 jt bila berhasil. Riset pasar Rp 80 jt. Apakah informasinya layak dibeli?', '発売は5億ルピア、成功すれば14億。市場調査は8,000万。情報を買う価値はある？', '上市成本 5 亿，成功收入 14 亿。市场调研 8000 万。这条信息值得买吗？'),
      build() {
        const launch = (pS, tag) => node('d', L('Launch?', 'Luncurkan?', '発売する？', '要上市吗？'), [
          edge(L('Launch', 'Luncurkan', '発売', '上市'), node('c', L('Market', 'Pasar', '市場', '市场'), [edge(L('Success', 'Berhasil', '成功', '成功'), end('', 1400), { p: pS }), edge(L('Flop', 'Gagal', '失敗', '失败'), end('', 0), { p: 1 - pS })]), { v: -500 }),
          edge(L('Shelve', 'Batalkan', '見送り', '搁置'), end('', 0))]);
        return node('d', L('Strategy', 'Strategi', '戦略', '策略'), [
          edge(L('Launch blind', 'Luncurkan langsung', 'そのまま発売', '直接上市'), node('c', L('Market', 'Pasar', '市場', '市场'), [edge(L('Success', 'Berhasil', '成功', '成功'), end('', 1400), { p: 0.45 }), edge(L('Flop', 'Gagal', '失敗', '失败'), end('', 0), { p: 0.55 })]), { v: -500 }),
          edge(L('Buy the study', 'Beli riset', '調査を買う', '购买调研'), node('c', L('Study says', 'Riset berkata', '調査結果', '调研结论'), [
            edge(L('Positive', 'Positif', 'ポジティブ', '乐观'), launch(0.7), { p: 0.5 }), edge(L('Negative', 'Negatif', 'ネガティブ', '悲观'), launch(0.2), { p: 0.5 })]), { v: -80 }),
          edge(L('Shelve it', 'Batalkan', '見送り', '搁置'), end('', 0))]);
      } },
    { id: 'machine', icon: '🏭', name: L('Buy or lease the machine?', 'Beli atau sewa mesin?', '機械は購入かリースか？', '机器买还是租？'),
      story: L('Buying is cheaper per unit if demand is high, but locks in cash. How sure must you be to buy?', 'Membeli lebih hemat per unit bila permintaan tinggi, tetapi mengunci kas. Seberapa yakin Anda harus sebelum membeli?', '需要が高ければ購入が割安だが、現金が固定される。購入にはどれだけの確信が要る？', '需求高时购买单位成本更低，但会占用现金。你要多有把握才该买？'),
      build() {
        const dem = (h, l) => node('c', L('Demand', 'Permintaan', '需要', '需求'), [edge(L('High', 'Tinggi', '高', '高'), end('', h), { p: 0.5 }), edge(L('Low', 'Rendah', '低', '低'), end('', l), { p: 0.5 })]);
        return node('d', L('Capacity', 'Kapasitas', '設備', '产能'), [
          edge(L('Buy', 'Beli', '購入', '购买'), dem(2200, 600), { v: -900 }), edge(L('Lease', 'Sewa', 'リース', '租赁'), dem(1500, 800), { v: -300 }),
          edge(L('Outsource', 'Alih daya', '外注', '外包'), end('', 400))]);
      } },
    { id: 'lawsuit', icon: '⚖️', name: L('Settle or go to court?', 'Damai atau ke pengadilan?', '和解か裁判か？', '和解还是上法庭？'),
      story: L('A supplier sues you. Settling costs Rp 400 mn. Court costs Rp 150 mn to fight and may end in a Rp 800 mn loss. Money is not everything: how much risk can you stomach?', 'Pemasok menggugat Anda. Damai Rp 400 jt. Pengadilan Rp 150 jt dan bisa berakhir kalah Rp 800 jt. Uang bukan segalanya: seberapa besar risiko yang sanggup Anda tanggung?', '取引先に訴えられた。和解は4億。裁判は費用1.5億で、負ければ8億。どこまでリスクを取れる？', '供应商起诉你。和解 4 亿；上庭费用 1.5 亿，输了赔 8 亿。你能承受多大风险？'),
      build() {
        return node('d', L('Response', 'Tanggapan', '対応', '应对'), [
          edge(L('Settle', 'Damai', '和解', '和解'), end('', -400)),
          edge(L('Fight in court', 'Ke pengadilan', '裁判で争う', '上法庭'), node('c', L('Verdict', 'Putusan', '判決', '判决'), [edge(L('Win', 'Menang', '勝訴', '胜诉'), end('', 0), { p: 0.5 }), edge(L('Lose', 'Kalah', '敗訴', '败诉'), end('', -800), { p: 0.5 })]), { v: -150 })]);
      } },
    { id: 'blank', icon: '✏️', name: L('My own decision', 'Keputusan saya sendiri', '自分の意思決定', '我自己的决策'),
      story: L('Start from two empty options and build your own tree: add chances, costs and payoffs.', 'Mulai dari dua opsi kosong dan susun pohon Anda sendiri: tambah peluang, biaya, dan hasil.', '空の2案から自分の決定木を作ろう。確率・費用・成果を追加。', '从两个空选项开始，搭建你自己的决策树：加入概率、成本和收益。'),
      build() { return node('d', L('Decision', 'Keputusan', '意思決定', '决策'), [edge(L('Option A', 'Opsi A', '案A', '方案A'), end('', 0)), edge(L('Option B', 'Opsi B', '案B', '方案B'), end('', 0))]); } }
  ];
  const api = { node, end, edge, clone, walk, find, pOf, solve, solveRA, plan, profile, evpi, sens, withP, probEdges, validate, PRESETS, sum };
  root.MBALAB = root.MBALAB || {}; root.MBALAB.dt = api; if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
