/* Day/night switch, pause, brand link, camera controls */
const DAYC=['#2563eb','#059669','#d97706','#7c3aed','#dc2626','#475569','#a16207','#0e7490'],NIGHTC=COL.slice();
$('dn').onclick=()=>{const day=!document.body.classList.contains('day');document.body.classList.toggle('day',day);$('dn').setAttribute('aria-checked',day);$('dn').setAttribute('aria-label',t(day?'nightAria':'dayAria'));COL.splice(0,8,...(day?DAYC:NIGHTC));all();window.cityMode&&window.cityMode(day)};
let paused=false;
const setMotion=p=>{paused=p;window.cityPause&&window.cityPause(p);$('moi').textContent=p?'\u25b6':'\u23f8';$('mol').textContent=t(p?'play':'pause');$('mo').setAttribute('aria-label',t(p?'playAria':'pauseAria'))};
$('mo').onclick=()=>setMotion(!paused);
$('brand').onclick=e=>{e.preventDefault();if(document.body.classList.contains('inapp'))$('back').click()};

/* camera controls (press and hold to repeat) */
const holdBtn=(id,fn)=>{const b=$(id);let iv=null;const stop=()=>{clearInterval(iv);iv=null};b.addEventListener('pointerdown',()=>{fn();clearInterval(iv);iv=setInterval(fn,110)});['pointerup','pointerleave','pointercancel','blur'].forEach(ev=>b.addEventListener(ev,stop));b.addEventListener('click',e=>{if(e.detail===0)fn()})};
const cc=f=>()=>{window.cityCam&&f(window.cityCam)};
holdBtn('camIn',cc(c=>c.zoom(.9)));holdBtn('camOut',cc(c=>c.zoom(1.12)));holdBtn('camUp',cc(c=>c.tilt(.05)));holdBtn('camDown',cc(c=>c.tilt(-.05)));holdBtn('camLeft',cc(c=>c.pan(.06)));holdBtn('camRight',cc(c=>c.pan(-.06)));$('camReset').onclick=cc(c=>c.reset());
