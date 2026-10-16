/* Pure maths, no DOM. Exposed as MBALAB.be (and module.exports for node tests). Break-even: units = fixed / (price - variable). */
(function (root) {
  const CASES = [
    { id: 'cafe', fixed: 12000, price: 30, variable: 12 },
    { id: 'shop', fixed: 8000, price: 45, variable: 30 },
    { id: 'blank', fixed: 0, price: 0, variable: 0 }
  ];
  /* validate -> list of problem codes; an invalid model never produces a result */
  function validate(m) {
    const p = [];
    if (!(m.fixed >= 0) || !isFinite(m.fixed)) p.push('fixed');
    if (!(m.price > 0) || !isFinite(m.price)) p.push('price');
    if (!(m.variable >= 0) || !isFinite(m.variable)) p.push('variable');
    if (!p.length && m.price <= m.variable) p.push('margin');
    return p;
  }
  function solve(m) {
    const unit = m.price - m.variable, units = Math.ceil(m.fixed / unit);
    return { unit, units, revenue: units * m.price, marginPct: unit / m.price * 100 };
  }
  /* stress-test: break-even units when the price moves by each step (fractions) */
  function sens(m, steps) { return steps.map(s => { const price = m.price * (1 + s), r = validate({ ...m, price }).length ? null : solve({ ...m, price }); return { step: s, price, units: r && r.units }; }); }
  const api = { CASES, validate, solve, sens };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.MBALAB = root.MBALAB || {}; root.MBALAB.be = api; }
})(typeof window !== 'undefined' ? window : globalThis);
