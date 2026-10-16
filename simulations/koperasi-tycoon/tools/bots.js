global.MBALAB={coop:{}};require('../data/events.js');const E=require('../engine/engine.js');
function play(seed,pol){let s=E.create(seed),g=0;
 while(!s.over&&g++<400){
  if(s.phase==='event'){const ev=E.eventOf(s);const ids=ev.choices.map(c=>c.id);E.choose(s,pol.ev(ev,s)||ids[0]);}
  else if(s.phase==='plan'){E.step(s,pol.plan(s),{});}
  else if(s.phase==='report'){E.next(s);}
  else if(s.phase==='rat'){E.ratDecide(s,pol.rat(s));}
  else break;}
 return s;}
const D=()=>E.defaults();
const pols={
 smart:{ev:(e,s)=>e.choices[Math.min(e.choices.length-1,(s.t%3))].id,plan:s=>{const d=D();d.restock=Math.round(160+ (s.t%4===0?20:0)+(s.goods<30?30:0));d.markup=.14;d.ricePay=1.04;d.action=s.t===9?'digital':s.t===4?'training':'visit';return d;},rat:()=>({members:.45,reserve:.35})},
 balanced:{ev:(e)=>e.choices[e.choices.length>2?2:0].id,plan:s=>{const d=D();d.action=s.t%8===2?'training':'visit';return d;},rat:()=>({members:.4,reserve:.45})},
 greedy:{ev:(e)=>e.choices[1].id,plan:s=>{const d=D();d.markup=.3;d.ricePay=.8;d.rate=2;d.screen=0;return d;},rat:()=>({members:0,reserve:.9})},
 generous:{ev:(e)=>e.choices[0].id,plan:s=>{const d=D();d.markup=.05;d.rate=0;d.screen=2;d.ricePay=1.15;return d;},rat:()=>({members:.7,reserve:.1})},
 reckless:{ev:(e)=>e.choices[e.choices.length-1].id,plan:s=>{const d=D();d.screen=2;d.rate=0;d.restock=300;d.action='storage';return d;},rat:()=>({members:.6,reserve:0})},
};
for(const [n,p] of Object.entries(pols)){const r={};let sc=0,N=30;for(let i=0;i<N;i++){const s=play(i+1,p);sc+=E.result(s).score;const en=E.result(s).ending;r[en]=(r[en]||0)+1;}
 console.log(n,'avg',(sc/N).toFixed(1),JSON.stringify(r));}
{let s=E.create(2),g=0;const p=pols.balanced;while(!s.over&&g++<400){
 if(s.phase==='event'){const ev=E.eventOf(s);E.choose(s,p.ev(ev,s));}
 else if(s.phase==='plan'){const r=E.step(s,p.plan(s),{noise:.08});console.log(s.t,s.cash|0,s.debt|0,E.equity(s)|0,s.eq0|0,r.profit.toFixed(0),r.action,s.phase);}
 else if(s.phase==='report')E.next(s);else if(s.phase==='rat')E.ratDecide(s,p.rat(s));}
console.log(s.ending)}
