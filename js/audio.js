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
/* Public-domain classical themes arranged for 8-bit: Beethoven "Ode to Joy" + Petzold/Bach "Minuet in G".
   Grid = eighth notes. Melody notation: "NoteOctave:eighths" (R = rest). */
const NV={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const mid=n=>{const m=/^([A-G])(#?)(\d)$/.exec(n);return 12*(+m[3]+1)+NV[m[1]]+(m[2]?1:0)};
const CH={C:[48,52,55],G:[43,47,50],D:[50,54,57]};
const mk=(len,mel,ch)=>({len,ch:CH[ch],mel:(()=>{let p=0;return mel.split(' ').map(x=>{const[n,d]=x.split(':');const o=[n==='R'?-1:mid(n),p,+d];p+=+d;return o})})()});
const OA='E4:2 E4:2 F4:2 G4:2',OB='G4:2 F4:2 E4:2 D4:2',OC='C4:2 C4:2 D4:2 E4:2',OD='E4:3 D4:1 D4:4';
const SONG=[mk(8,OA,'C'),mk(8,OB,'G'),mk(8,OC,'C'),mk(8,OD,'G'),mk(8,OA,'C'),mk(8,OB,'G'),mk(8,OC,'C'),mk(8,'D4:3 C4:1 C4:4','C'),
mk(8,'D4:2 D4:2 E4:2 C4:2','G'),mk(8,'D4:2 E4:1 F4:1 E4:2 C4:2','G'),mk(8,'D4:2 E4:1 F4:1 E4:2 D4:2','G'),mk(8,'C4:2 D4:2 G3:4','G'),
mk(8,OA,'C'),mk(8,OB,'G'),mk(8,OC,'C'),mk(8,'D4:3 C4:1 C4:4','C'),
mk(6,'D5:2 G4:1 A4:1 B4:1 C5:1','G'),mk(6,'D5:2 G4:2 G4:2','G'),mk(6,'E5:2 C5:1 D5:1 E5:1 F#5:1','C'),mk(6,'G5:2 G4:2 G4:2','G'),
mk(6,'C5:2 D5:1 C5:1 B4:1 A4:1','C'),mk(6,'B4:2 C5:1 B4:1 A4:1 G4:1','G'),mk(6,'F#4:2 G4:1 A4:1 B4:1 G4:1','D'),mk(6,'A4:6','D')];
const NIGHT={bpm:104,vol:.8},DAY={bpm:132,vol:1};
const stepAt=(t,S,sd)=>{const B=SONG[bar],c=B.ch,s=step,v=S.vol;
B.mel.forEach(([m,p,d])=>{if(p===s&&m>=0){tone(mg,mf(m),t,sd*d*.9,'square',.075*v);tone(mg,mf(m)*1.004,t,sd*d*.9,'square',.02*v)}});
tone(mg,mf(c[[0,1,2,1][s%4]]+12),t,sd*.9,'square',.022*v);
if(s===0)tone(mg,mf(c[0]),t,sd*(B.len===8?3.5:2.5),'triangle',.2*v);
if(B.len===8&&s===4)tone(mg,mf(c[0]+7),t,sd*3,'triangle',.15*v);
if(B.len===6&&(s===2||s===4))tone(mg,mf(c[2]+12),t,sd*1.6,'square',.03*v);
if(s===0||(B.len===8&&s===4))tone(mg,150,t,.1,'sine',.25*v,40);
noise(mg,t,.025,s%2?.012:.025,7000)};
const sched=()=>{if(!ctx)return;const S=document.body.classList.contains('day')?DAY:NIGHT,sd=60/S.bpm/2;
while(nextT<ctx.currentTime+.3){stepAt(nextT,S,sd);nextT+=sd;if(++step===SONG[bar].len){step=0;bar=(bar+1)%SONG.length}}};
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
