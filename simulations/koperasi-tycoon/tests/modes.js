/* balance check per mode: node tests/modes.js [mode] */
global.MBALAB={coop:{}};require('../data/events.js');require('../data/events-remote.js');require('../data/events-fishing.js');const E=require('../engine/engine.js');
const MODE=process.argv[2]||'remote';
function play(seed,pol){let s=E.create(seed,MODE),g=0;
 while(!s.over&&g++<400){
  if(s.phase==='event'){const ev=E.eventOf(s);E.choose(s,pol.ev(ev,s));}
  else if(s.phase==='plan'){E.step(s,pol.plan(s),{});}
  else if(s.phase==='report'){E.next(s);}
  else if(s.phase==='rat'){E.ratDecide(s,pol.rat(s));}
  else break;}
 return s;}
const D=()=>E.defaults();
const R=MODE==='remote';
const pols={
 smart:{ev:(e,s)=>e.choices[Math.min(e.choices.length-1,(s.t%3))].id,plan:s=>{const d=D();d.restock=R?130:150;d.markup=.14;d.ricePay=1.04;d.riceBuy=R?18:30;
   d.action=R?(s.t===1?'road':s.t===5?'solar':s.t===9?'storage':s.t===13?'digital':'visit'):(s.t===3?'storage':s.t===6?'boat':s.t===10?'tpi':s.t===14?'boat':'visit');return d;},rat:()=>({members:40,reserve:40})},
 balanced:{ev:(e)=>e.choices[e.choices.length>2?2:0].id,plan:s=>{const d=D();d.riceBuy=R?18:28;d.restock=R?120:140;d.action=s.t%8===2?'training':'visit';return d;},rat:()=>({members:35,reserve:45})},
 greedy:{ev:(e)=>e.choices[1].id,plan:s=>{const d=D();d.markup=.3;d.ricePay=.85;d.rate=2;d.screen=0;return d;},rat:()=>({members:0,reserve:90})},
 generous:{ev:(e)=>e.choices[0].id,plan:s=>{const d=D();d.markup=.05;d.rate=0;d.screen=2;d.ricePay=1.15;return d;},rat:()=>({members:70,reserve:10})},
 reckless:{ev:(e)=>e.choices[e.choices.length-1].id,plan:s=>{const d=D();d.screen=2;d.rate=0;d.restock=300;d.action='storage';return d;},rat:()=>({members:60,reserve:0})},
};
for(const [n,p] of Object.entries(pols)){const r={};let sc=0,N=30,cut=0,sp=0;for(let i=0;i<N;i++){const s=play(i+1,p);const f=E.result(s);sc+=f.score;r[f.ending]=(r[f.ending]||0)+1;cut+=s.stats.cut;sp+=s.stats.spoiled;}
 console.log(MODE,n.padEnd(9),'avg',(sc/N).toFixed(1),'cut/g',(cut/N).toFixed(1),'spoil/g',(sp/N).toFixed(0),JSON.stringify(r));}
