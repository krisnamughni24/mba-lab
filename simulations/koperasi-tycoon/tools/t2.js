global.MBALAB={coop:{}};require('../data/events.js');const E=require('../engine/engine.js');
let s=E.create(3),g=0;const pn=process.argv[2]||'bal';
while(!s.over&&g++<200){
 if(s.phase==='event'){const ev=E.eventOf(s);E.choose(s,ev.choices[ev.choices.length>2?2:0].id);}
 else if(s.phase==='plan'){const d=E.defaults();const r=E.step(s,d,{noise:.08});console.log(s.t,'cash',s.cash.toFixed(0),'debt',s.debt.toFixed(0),'eq',E.equity(s).toFixed(0),'eq0',s.eq0.toFixed(0),'profit',r.profit.toFixed(1),'loans',s.loans.toFixed(0),'sat',Object.values(s.sat).map(x=>x|0).join(','));}
 else if(s.phase==='report')E.next(s);
 else if(s.phase==='rat'){console.log(' RAT',JSON.stringify(E.ratInfo?E.ratInfo(s):''));E.ratDecide(s,{members:.4,reserve:.45});}}
console.log(s.ending,s.t);
