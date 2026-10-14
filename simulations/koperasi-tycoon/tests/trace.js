global.MBALAB={coop:{}};require('../data/events.js');const E=require('../engine/engine.js');
let s=E.create(1);let g=0;
while(!s.over&&g++<200){
 if(s.phase==='event'){E.choose(s,E.eventOf(s).choices[0].id);}
 else if(s.phase==='plan'){const r=E.step(s,E.defaults(),{noise:0});console.log(s.t-0,'cash',s.cash.toFixed(0),'debt',s.debt.toFixed(0),'goods',s.goods.toFixed(0),'loans',s.loans.toFixed(0),'profit',r.profit.toFixed(1),'rev',r.revGoods.toFixed(0),'rice',r.revRice.toFixed(0),'eq',E.equity(s).toFixed(0));}
 else if(s.phase==='report')E.next(s);
 else if(s.phase==='rat')E.ratDecide(s,{members:.4,reserve:.4});}
console.log(s.ending,s.t);
