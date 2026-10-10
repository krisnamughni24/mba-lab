/* 8-bit music and sound effects (Web Audio) */
/* ===== 8-bit audio: chiptune music + sound effects (Web Audio, no files) ===== */
const AU=(()=>{
let ctx=null,mg=null,sg=null,nb=null,timer=null,nextT=0,step=0,bar=0;
const st={music:false,sfx:true};
try{const m=localStorage.getItem('mbalab-music'),q=localStorage.getItem('mbalab-sfx');if(m!==null)st.music=m==='1';if(q!==null)st.sfx=q==='1'}catch(e){}
const save=()=>{try{localStorage.setItem('mbalab-music',st.music?'1':'0');localStorage.setItem('mbalab-sfx',st.sfx?'1':'0')}catch(e){}};
const ensure=()=>{if(!ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{ctx=new C()}catch(e){return null}
const cp=ctx.createDynamicsCompressor();cp.connect(ctx.destination);mg=ctx.createGain();mg.gain.value=.5;mg.connect(cp);sg=ctx.createGain();sg.gain.value=.6;sg.connect(cp);
const n=ctx.sampleRate>>1;nb=ctx.createBuffer(1,n,ctx.sampleRate);const a=nb.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1}
if(ctx.state==='suspended')ctx.resume();return ctx};
const mf=n=>440*Math.pow(2,(n-69)/12);
const tone=(dst,f,t,d,ty,v,f2)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dst);o.start(t);o.stop(t+d+.03)};
const noise=(dst,t,d,v,hp)=>{const s=ctx.createBufferSource(),g=ctx.createGain(),f=ctx.createBiquadFilter();s.buffer=nb;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(dst);s.start(t);s.stop(t+d+.03)};
const FX={click:[[84,0,.05]],open:[[72,0,.07],[76,.06,.07],[79,.12,.11]],close:[[79,0,.07],[76,.06,.07],[72,.12,.11]],on:[[76,0,.07],[83,.07,.11]],off:[[83,0,.07],[76,.07,.11]],
day:[[72,0,.08],[76,.07,.08],[79,.14,.08],[84,.21,.16]],night:[[84,0,.08],[79,.07,.08],[76,.14,.08],[72,.21,.16]],lang:[[88,0,.04],[91,.05,.07]],
ok:[[72,0,.09],[76,.09,.09],[79,.18,.09],[84,.27,.22]],err:[[48,0,.13,'sawtooth',.2],[43,.14,.2,'sawtooth',.2]]};
const play=k=>{if(!st.sfx||!FX[k]||!ensure())return;const t=ctx.currentTime+.005;FX[k].forEach(([m,o,d,ty,v])=>tone(sg,mf(m),t+o,d,ty||'square',v||.16))};
const NIGHT={bpm:92,ch:[[57,60,64],[53,57,60],[60,64,67],[55,59,62]],bs:[45,41,48,43]};
const DAY={bpm:120,ch:[[60,64,67],[55,59,62],[57,60,64],[53,57,60]],bs:[48,43,45,41]};
const MEL=[[2,-1,1,-1,2,-1,3,2],[1,-1,0,-1,1,2,-1,1],[3,-1,2,-1,1,-1,2,0],[0,-1,1,2,3,-1,2,-1]];
const ARP=[0,1,2,1];
const stepAt=(t,S,sd)=>{const c=S.ch[bar],s=step;
tone(mg,mf(c[ARP[s%4]]+12),t,sd*.9,'square',.035);
if(s%2===0){const v=MEL[bar][s>>1];if(v>=0)tone(mg,mf(c[v%3]+12+(v>=3?12:0)),t,sd*1.7,'square',.07)}
if(s===0||s===8)tone(mg,mf(S.bs[bar]),t,sd*3.5,'triangle',.2);else if(s===4||s===12)tone(mg,mf(S.bs[bar]+(s===12?7:0)),t,sd*3,'triangle',.16);
if(s===0||s===8)tone(mg,150,t,.1,'sine',.3,40);
if(s===4||s===12)noise(mg,t,.09,.07,1500);
if(s%2===0)noise(mg,t,.03,.025,7000)};
const sched=()=>{if(!ctx)return;const S=document.body.classList.contains('day')?DAY:NIGHT,sd=60/S.bpm/4;
while(nextT<ctx.currentTime+.3){stepAt(nextT,S,sd);nextT+=sd;if(++step===16){step=0;bar=(bar+1)%4}}};
const start=()=>{if(timer||!ensure())return;mg.gain.cancelScheduledValues(ctx.currentTime);mg.gain.setTargetAtTime(.5,ctx.currentTime,.03);nextT=ctx.currentTime+.08;step=0;bar=0;timer=setInterval(sched,80)};
const stop=()=>{clearInterval(timer);timer=null;if(ctx){mg.gain.cancelScheduledValues(ctx.currentTime);mg.gain.setTargetAtTime(0,ctx.currentTime,.03)}};
const setMusic=v=>{st.music=v;save();v?start():stop();audioUI()};
const setSfx=v=>{st.sfx=v;save();audioUI()};
document.addEventListener('visibilitychange',()=>{if(!ctx)return;document.hidden?ctx.suspend():ctx.resume()});
/* a saved "music on" preference starts on the first user gesture (browsers block autoplay) */
const first=()=>{if(st.music)start()};['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,first,{once:true}));
return{st,play,setMusic,setSfx}})();
const audioUI=()=>{[['mu','mul',AU.st.music,'musicOn','musicOff'],['sf','sfl',AU.st.sfx,'sfxOn','sfxOff']].forEach(([b,l,on,a,z])=>{const e=$(b);e.setAttribute('aria-pressed',on);e.classList.toggle('off',!on);const m=t(on?a:z);e.setAttribute('aria-label',m);e.title=m})};
$('mu').onclick=()=>{AU.setMusic(!AU.st.music);AU.play(AU.st.music?'on':'off')};
$('sf').onclick=()=>{if(AU.st.sfx){AU.play('off');AU.setSfx(false)}else{AU.setSfx(true);AU.play('on')}};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');if(!b||b.id==='mu'||b.id==='sf'||b.disabled)return;
if(b.id==='dn')AU.play(document.body.classList.contains('day')?'night':'day');
else if(b.hasAttribute('data-close'))AU.play('close');
else if(b.id==='btnInfo'||b.id==='btnIdea'||b.id==='explore')AU.play('open');
else if(b.dataset.lang)AU.play('lang');
else AU.play('click')},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ovs.some(o=>o.classList.contains('on')))AU.play('close')},true);
