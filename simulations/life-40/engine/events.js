/* Life 40: the life events. Each event has a weight function (what makes it likely right now), 2 to 3 options and
   the effect of each option. Texts live in strings.js as ev_<id>, ev_<id>_d, ev_<id>_h and ev_<id>_<option>.
   p(s) gives the numbers shown in the text; keys starting with n_ are plain numbers, the rest are money. */
(function () {
  const L = () => MBALAB.life, liq = s => L().liquid(s), once = (s, id) => s.done[id] === undefined, cool = (s, id, n) => s.done[id] === undefined || s.y - s.done[id] >= n;
  const base = s => s.B.living * s.cpi;
  const price = s => s.B.house * s.hpi;
  const kpr = s => { const p = price(s), sub = s.bg !== 'rich' && (s.level === 'easy' || (s.level === 'medium' && p <= s.B.house * s.hpi * 1.1)); return { rate: sub ? (s.level === 'easy' ? 0.05 : 0.065) : s.D.mort, sub, float: !sub && s.level === 'hard' }; };
  const netInc = s => (s.salary + s.side) * 0.95 + (s.spouse ? s.spouseSal * 0.95 : 0);
  const car = s => ({ price: s.B.car * s.cpi, rate: s.bg === 'poor' ? 0.25 : 0.15 });

  const LIST = [
    { id: 'promo', w: s => s.job < 3 && s.yrsJob >= 2 && !s.retired ? (1 + 0.5 * s.edu) * (s.bg === 'rich' ? 1.3 : s.bg === 'poor' ? 0.6 : 1) : 0,
      p: s => ({ n_up: 30, n_up2: 45 }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { x.sal(0.30); s.job++; s.yrsJob = 0; x.joy(1.5); } },
        { id: 'b', run: (s, x) => { if (x.chance(0.55)) { x.sal(0.45); s.job++; s.yrsJob = 0; x.joy(2); x.tag('win'); } else { x.sal(0.10); s.yrsJob = 0; x.joy(-1); x.tag('lose'); } } }] },

    { id: 'layoff', w: (s, last) => s.age >= 24 && s.age <= 56 && !s.retired && cool(s, 'layoff', 5) ? (0.3 + (last && last.reg === 'crisis' ? 1.3 : 0) + (last && last.reg === 'bear' ? 0.4 : 0)) * s.D.shock : 0,
      p: s => ({ $sev: s.salary * 0.4 }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { x.get(s.salary * 0.4); s.gap = 0.45; s.salary *= 0.95; s.yrsJob = 0; x.joy(-3); } },
        { id: 'b', run: (s, x) => { x.get(s.salary * 0.4 * 0.6); s.salary *= 0.8; s.yrsJob = 0; x.joy(-2); } },
        { id: 'c', run: (s, x) => { x.get(s.salary * 0.4); const inv = Math.min(liq(s), s.salary * 0.5); x.pay(inv); s.gap = 0.8; s.yrsJob = 0; x.later(2, 'biz', inv); x.joy(-1); } }] },

    { id: 'offer', w: s => s.age >= 24 && s.age <= 50 && !s.retired && s.yrsJob >= 1 && cool(s, 'offer', 3) ? 0.9 : 0,
      p: () => ({ n_up: 25 }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { if (x.chance(0.8)) { x.sal(0.25); s.yrsJob = 0; x.joy(1); x.tag('win'); } else { s.gap = 0.5; x.joy(-2); x.tag('lose'); } } },
        { id: 'b', run: () => { } }] },

    { id: 'bonus', w: s => s.salary > 0 && !s.retired && cool(s, 'bonus', 2) ? 1.1 : 0,
      p: s => ({ $amt: s.salary * 0.2 }),
      opts: [
        { id: 'a', wise: s => L().debt(s) < 1, run: (s, x) => { const a = s.salary * (0.12 + 0.18 * x.r()) * 0.95; x.get(a); x.put(a, 'fund'); } },
        { id: 'b', run: (s, x) => { const a = s.salary * (0.12 + 0.18 * x.r()) * 0.95; x.get(a * 0.3); x.joy(3); } },
        { id: 'c', run: (s, x) => { const a = s.salary * (0.12 + 0.18 * x.r()) * 0.95; x.get(a); x.put(a * 0.5, 'dep'); x.joy(1.5); } },
        { id: 'd', wise: s => L().debt(s) >= 1, can: s => L().debt(s) > 1, run: (s, x) => { const a = s.salary * (0.12 + 0.18 * x.r()) * 0.95, l = s.loans.slice().sort((p, q) => q.rate - p.rate)[0], t = Math.min(a, l.bal); l.bal -= t; s.loans = s.loans.filter(y => y.bal > 0.05); x.fx.push(['debt', -t]); x.get(a - t); } }] },

    { id: 'side', w: s => s.age < 50 && !s.retired && !s.side && cool(s, 'side', 6) ? 0.6 : 0,
      p: s => ({ $inc: 8 * s.B.size * s.cpi }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { s.side = 8 * s.B.size * s.cpi; s.sideLeft = 6; x.joy(-1); } },
        { id: 'b', run: () => { } }] },

    { id: 'study', w: s => s.edu === 0 && s.age >= 24 && s.age <= 38 && !s.retired && s.salary > 0 && once(s, 'study') ? 0.8 : 0,
      p: s => ({ $s2: s.salary * 1.0, $cert: s.salary * 0.12, n_up: 28 }),
      opts: [
        { id: 'a', wise: s => liq(s) > s.salary * 1.6, can: s => liq(s) > s.salary * 0.5, run: (s, x) => { const sch = (s.bg !== 'rich' && x.chance(0.4)); x.pay(s.salary * (sch ? 0.5 : 1)); s.edu = 1; x.later(2, 'edu'); if (sch) x.tag('win'); } },
        { id: 'b', wise: true, run: (s, x) => { x.pay(s.salary * 0.12); s.edu = 2; x.later(1, 'cert'); } },
        { id: 'c', run: () => { } }] },

    { id: 'startup', w: s => s.age >= 24 && s.age <= 50 && liq(s) > 40 * s.B.size && cool(s, 'startup', 4) ? 0.7 : 0,
      p: s => ({ $small: liq(s) * 0.1, $big: liq(s) * 0.4 }),
      opts: [
        { id: 'a', run: (s, x) => { const v = liq(s) * 0.1; x.pay(v); x.later(3, 'startup', v); } },
        { id: 'b', run: (s, x) => { const v = liq(s) * 0.4; x.pay(v); x.later(3, 'startup', v); } },
        { id: 'c', wise: true, run: () => { } }] },

    { id: 'scam', w: s => liq(s) > 20 * s.B.size && cool(s, 'scam', 5) ? 0.55 : 0,
      p: s => ({ $v: liq(s) * 0.2 }),
      opts: [
        { id: 'a', run: (s, x) => { const v = liq(s) * 0.2; x.pay(v); x.later(1, 'ponzi1', v); } },
        { id: 'b', wise: true, run: () => { } }] },

    { id: 'fomo', w: s => s.age < 45 && liq(s) > 15 * s.B.size && cool(s, 'fomo', 4) ? 0.6 : 0,
      p: s => ({ $v: liq(s) * 0.1 }),
      opts: [
        { id: 'a', run: (s, x) => { const v = liq(s) * 0.1; x.pay(v); x.later(1, 'fomo', v); } },
        { id: 'b', wise: true, run: () => { } }] },

    { id: 'crash', forced: true, w: (s, last) => last && last.reg === 'crisis' && s.fund > 1 ? 1 : 0,
      p: s => ({ $f: s.fund, n_drop: Math.round(-s.W[s.y - 1].fund * 100) }),
      opts: [
        { id: 'a', run: (s, x) => { const f = s.fund; s.fund = 0; s.dep += f; x.fx.push(['fund', -f], ['dep', f]); x.joy(-1); } },
        { id: 'b', wise: s => liq(s) - s.fund < base(s) * 0.5, run: () => { } },
        { id: 'c', wise: s => s.cash > base(s) * 0.5, can: s => s.cash > base(s) * 0.5, run: (s, x) => { x.put(Math.min(s.cash * 0.6, s.cash - base(s) * 0.3), 'fund'); } }] },

    { id: 'inflate', forced: true, w: (s, last) => last && last.spike ? 1 : 0,
      p: s => ({ n_inf: Math.round(s.W[s.y - 1].infl * 100) }),
      opts: [
        { id: 'a', wise: s => s.mix === 'safe', run: (s, x) => { s.mix = s.mix === 'safe' ? 'balanced' : 'gold'; } },
        { id: 'b', run: (s, x) => { s.lifestyle = 0; x.joy(-1); } },
        { id: 'c', wise: s => s.mix !== 'safe', run: () => { } }] },

    { id: 'marriage', w: s => !s.spouse && s.age >= 25 && s.age <= 36 && once(s, 'marriage') ? 1.1 : 0,
      p: s => ({ $small: 15 * s.B.size * s.cpi, $grand: 80 * s.B.size * s.cpi * (s.bg === 'rich' ? 0.5 : 1) }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { x.pay(15 * x.size); s.spouse = true; s.spouseSal = s.salary * 0.55; x.joy(3); } },
        { id: 'b', run: (s, x) => { x.pay(80 * x.size * (s.bg === 'rich' ? 0.5 : 1)); s.spouse = true; s.spouseSal = s.salary * 0.55; x.joy(5); } },
        { id: 'c', run: (s, x) => { x.joy(0); } }] },

    { id: 'baby', w: s => s.spouse && s.kids.length < 3 && s.age >= 26 && s.age <= 42 && cool(s, 'baby', 3) ? 1.1 - s.kids.length * 0.3 : 0,
      p: s => ({ $kid: base(s) * 0.3 }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { s.kids.push(s.age); s.eduFund = true; x.joy(4); } },
        { id: 'b', run: (s, x) => { s.kids.push(s.age); x.joy(4); } },
        { id: 'c', run: () => { } }] },

    { id: 'college', forced: true, w: s => s.kids.some(b => s.age - b === 18) && s.done.college !== s.y ? 1 : 0,
      p: s => ({ $pub: base(s) * 0.45, $priv: base(s) * 0.9 }),
      opts: [
        { id: 'a', wise: s => liq(s) < base(s) * 8, run: (s, x) => { s.kidTier = 'public'; } },
        { id: 'b', wise: s => liq(s) >= base(s) * 8, run: (s, x) => { s.kidTier = 'private'; x.joy(2); } }] },

    { id: 'parents', w: s => s.age >= 30 && s.age <= 58 && cool(s, 'parents', 6) ? 0.5 * (s.bg === 'poor' ? 1.6 : s.bg === 'rich' ? 0.6 : 1) * s.D.shock : 0,
      p: s => ({ $bill: 60 * x0(s) }),
      opts: [
        { id: 'a', wise: s => liq(s) > 60 * x0(s) * 1.2, can: s => liq(s) >= 60 * x0(s) * 1.4 * s.D.shock, run: (s, x) => { x.pay(60 * x.size * (0.6 + 0.8 * x.r()) * x.m); } },
        { id: 'b', wise: true, run: (s, x) => { const b = 60 * x.size * (0.6 + 0.8 * x.r()) * x.m; x.loan('family', b, 0.14, 3); } },
        { id: 'c', run: (s, x) => { x.pay(60 * x.size * (0.6 + 0.8 * x.r()) * x.m * 0.4); x.joy(-3); } }] },

    { id: 'inherit', w: s => once(s, 'inherit') && s.age >= 30 ? (s.bg === 'rich' ? 0.45 : s.bg === 'normal' ? 0.1 : 0) : 0,
      p: s => ({ $amt: s.bg === 'rich' ? 450 * s.cpi : 90 * s.cpi }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { const a = s.bg === 'rich' ? 450 * s.cpi : 90 * s.cpi; x.get(a); x.put(a * 0.5, 'dep'); x.put(a * 0.5, 'fund'); } },
        { id: 'b', run: (s, x) => { const a = s.bg === 'rich' ? 450 * s.cpi : 90 * s.cpi; if (s.house) { s.house.value += a; x.fx.push(['house', a]); } else { s.house = { value: a, loanName: null }; x.fx.push(['house', a]); } } },
        { id: 'c', run: (s, x) => { const a = s.bg === 'rich' ? 450 * s.cpi : 90 * s.cpi; x.get(a * 0.3); x.joy(4); } }] },

    { id: 'house', w: s => !s.house && s.age >= 26 && s.age <= 50 && liq(s) >= 0.2 * price(s) * 1.04 * 0.8 && cool(s, 'house', 3) ? 1.3 : 0,
      p: s => { const k = kpr(s), pr = price(s); return { $price: pr, $dp: pr * 0.24, $pay: L().pmt(pr * 0.8, k.rate, 20), n_rate: Math.round(k.rate * 1000) / 10 }; },
      opts: [
        { id: 'a', wise: s => liq(s) >= price(s) * 0.24 * 1.5 && L().pmt(price(s) * 0.8, kpr(s).rate, 20) <= 0.3 * netInc(s), can: s => liq(s) >= price(s) * 0.24, run: (s, x) => { const k = kpr(s), pr = price(s); x.pay(pr * 0.24); s.house = { value: pr, loanName: 'KPR' }; x.loan('KPR', pr * 0.8, k.rate, 20, k.float ? { float: true, base: k.rate } : {}); x.fx.push(['house', pr]); x.joy(2); if (k.sub) x.tag('win'); } },
        { id: 'b', wise: s => liq(s) >= price(s) * 1.5, can: s => liq(s) >= price(s) * 1.15, run: (s, x) => { const pr = price(s); x.pay(pr); s.house = { value: pr, loanName: null }; x.fx.push(['house', pr]); x.joy(2); } },
        { id: 'c', wise: true, run: () => { } }] },

    { id: 'repair', w: s => s.house && cool(s, 'repair', 4) ? 0.7 : 0,
      p: s => ({ $full: 0.03 * s.house.value, $patch: 0.012 * s.house.value }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { x.pay(0.03 * s.house.value * x.m); } },
        { id: 'b', run: (s, x) => { x.pay(0.012 * s.house.value * x.m); s.flags.patch = true; } }] },

    { id: 'car', w: s => !s.car && s.age >= 24 && s.age <= 52 && s.salary > 0 && cool(s, 'car', 3) ? 0.8 : 0,
      p: s => { const c = car(s); return { $price: c.price, $dp: c.price * 0.2, $pay: L().pmt(c.price * 0.8, c.rate, s.bg === 'poor' ? 3 : 5), n_rate: Math.round(c.rate * 100) }; },
      opts: [
        { id: 'a', can: s => liq(s) >= car(s).price * 0.2, run: (s, x) => { const c = car(s); x.pay(c.price * 0.2); x.loan('car', c.price * 0.8, c.rate, s.bg === 'poor' ? 3 : 5); s.car = true; x.joy(2); } },
        { id: 'b', wise: s => s.bg === 'rich' && liq(s) > car(s).price * 2, can: s => liq(s) >= car(s).price * 1.1, run: (s, x) => { x.pay(car(s).price); s.car = true; x.joy(2); } },
        { id: 'c', wise: true, run: () => { } }] },

    { id: 'gadget', w: s => cool(s, 'gadget', 3) ? 0.9 : 0,
      p: s => ({ $new: 12 * s.B.size * s.cpi, $cheap: 3.6 * s.B.size * s.cpi }),
      opts: [
        { id: 'a', run: (s, x) => { x.pay(12 * x.size); x.joy(2); } },
        { id: 'b', wise: true, run: (s, x) => { x.pay(3.6 * x.size); x.joy(0.5); } },
        { id: 'c', run: () => { } }] },

    { id: 'bill', w: () => 1,
      p: s => ({ $bill: 14 * s.B.size * s.cpi }),
      opts: [
        { id: 'a', wise: s => liq(s) > 30 * s.B.size * s.cpi, can: s => liq(s) >= 20 * x0(s) * s.D.shock, run: (s, x) => { x.pay((8 + 12 * x.r()) * x.size * x.m); } },
        { id: 'b', run: (s, x) => { const b = (8 + 12 * x.r()) * x.size * x.m; x.loan('pinjol', b, 0.36, 1); } },
        { id: 'c', wise: true, run: (s, x) => { x.pay((8 + 12 * x.r()) * x.size * x.m * 0.5); x.joy(-1); } }] },

    { id: 'health', w: s => s.age >= 28 && cool(s, 'health', 3) ? 0.5 + s.age * 0.01 : 0,
      p: s => ({ $bill: 35 * s.B.size * s.cpi, n_cov: s.ins === 2 ? 85 : 55 }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { x.pay(35 * x.size * (0.5 + x.r()) * x.m * (s.ins === 2 ? 0.15 : 0.45)); } },
        { id: 'b', run: (s, x) => { x.joy(-3); x.later(1, 'delay', 35 * x.size * (0.5 + x.r()) * x.m * (s.ins === 2 ? 0.15 : 0.45) * 1.8); } }] },

    { id: 'insurance', w: s => s.ins < 2 && s.age >= 26 && s.age <= 45 && once(s, 'insurance') ? 0.9 : 0,
      p: s => ({ $prem: 0.025 * s.salary }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { s.ins = 2; } },
        { id: 'b', run: () => { } }] },

    { id: 'dplk', w: s => s.salary > 0 && !s.retired && !s.dplk && s.age >= 24 && s.age <= 50 && once(s, 'dplk') ? 0.8 : 0,
      p: s => ({ $c5: 0.05 * s.salary, $c2: 0.02 * s.salary }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { s.dplk = 0.05; } },
        { id: 'b', run: (s, x) => { s.dplk = 0.02; } },
        { id: 'c', run: () => { } }] },

    { id: 'midlife', w: s => s.age >= 38 && s.age <= 50 && !s.retired && once(s, 'midlife') ? 0.7 : 0,
      p: s => ({ n_dip: 15, n_up: 40 }),
      opts: [
        { id: 'a', run: (s, x) => { s.gap = 0.5; x.joy(5); } },
        { id: 'b', run: (s, x) => { x.sal(-0.15); x.later(3, 'career'); x.joy(1); } },
        { id: 'c', wise: true, run: (s, x) => { x.joy(-1); } }] },

    { id: 'gengsi', w: s => cool(s, 'gengsi', 3) ? (s.lifestyle >= 1 ? 0.8 : 0.4) + (s.bg === 'rich' ? 0.4 : 0) : 0,
      p: s => ({ $big: 10 * s.B.size * s.cpi, $small: 3 * s.B.size * s.cpi }),
      opts: [
        { id: 'a', run: (s, x) => { x.pay(10 * x.size); x.joy(3); } },
        { id: 'b', wise: true, run: (s, x) => { x.pay(3 * x.size); x.joy(1); } },
        { id: 'c', run: (s, x) => { x.joy(-0.5); } }] },

    { id: 'rupiah', forced: true, w: s => s.level === 'hard' && s.age >= 30 && once(s, 'rupiah') && s.rnd() < 0.12 ? 1 : 0,
      pre: s => { s.W[s.y].infl += 0.02; s.W[s.y].gold += 0.10; },
      p: s => ({ n_inf: 2 }),
      opts: [
        { id: 'a', wise: true, run: (s, x) => { const v = s.dep * 0.3; s.dep -= v; s.gold += v; x.fx.push(['dep', -v], ['gold', v]); } },
        { id: 'b', run: () => { } },
        { id: 'c', run: (s, x) => { s.lifestyle = 0; x.joy(-1); } }] },

    { id: 'retire', w: s => s.age >= 55 && !s.retired && once(s, 'retire') ? 1.2 : 0,
      p: s => ({ $pay: s.salary }),
      opts: [
        { id: 'a', wise: true, run: () => { } },
        { id: 'b', run: (s, x) => { s.retired = true; s.supUntil = 0; x.joy(3); } },
        { id: 'c', run: (s, x) => { s.salary *= 0.4; x.joy(1); } }] }
  ];
  function x0(s) { return s.B.size * s.cpi; }

  /* consequences that arrive years later */
  const LATER = {
    biz: (s, x, inv) => { if (x.chance(0.35)) { x.get(inv * 3); x.tag('win'); } else x.tag('lose'); },
    startup: (s, x, inv) => { const r = x.r(); if (r < 0.15) { x.get(inv * 4); x.tag('win'); } else if (r < 0.45) { x.get(inv); x.tag('ok'); } else x.tag('lose'); },
    ponzi1: (s, x, a) => { x.get(a * 0.25); x.tag('win'); x.later(1, 'ponzi2'); },
    ponzi2: (s, x) => { x.joy(-3); x.tag('lose'); },
    fomo: (s, x, v) => { const r = x.r(); if (r < 0.3) { x.get(v * 2.8); x.tag('win'); } else if (r < 0.6) { x.get(v * 0.5); x.tag('ok'); } else { x.get(v * 0.15); x.tag('lose'); } },
    edu: (s, x) => { x.sal(0.28); x.joy(1); },
    cert: (s, x) => { x.sal(0.06); },
    career: (s, x) => { x.sal(0.4); x.joy(1); },
    delay: (s, x, bill) => { x.pay(bill); x.tag('lose'); }
  };

  MBALAB.lifeEvents = { LIST, LATER, kpr, car };
})();
