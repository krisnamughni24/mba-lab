/* node templates/calculator/tests/engine.js : hand-computed example, edge cases, invalid input. */
const E = require('../engine/engine.js'); let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL', m); } };
const r = E.solve({ fixed: 12000, price: 30, variable: 12 }); ok(r.unit === 18 && r.units === 667, 'cafe: 12000 / 18 = 666.7 -> 667 units'); ok(Math.abs(r.marginPct - 60) < 1e-9, 'margin 60%');
ok(E.solve({ fixed: 0, price: 10, variable: 4 }).units === 0, 'no fixed cost -> 0 units');
ok(E.validate({ fixed: 100, price: 5, variable: 5 }).includes('margin'), 'price = variable is invalid');
ok(E.validate({ fixed: -1, price: 5, variable: 1 }).includes('fixed'), 'negative fixed cost is invalid');
ok(E.validate({ fixed: NaN, price: 5, variable: 1 }).includes('fixed'), 'NaN is invalid');
const s = E.sens({ fixed: 12000, price: 30, variable: 12 }, [-.2, 0, .2]); ok(s[0].units > s[1].units && s[1].units > s[2].units, 'higher price needs fewer units');
ok(E.sens({ fixed: 1, price: 10, variable: 9 }, [-.2])[0].units === null, 'price below variable cost -> no result');
console.log(bad ? bad + ' FAILED' : 'engine OK'); process.exit(bad ? 1 : 0);
