/* Language switching and popover menu */
/* language switch */
const LB={en:'EN',id:'ID',ja:'JA',zh:'ZH'};
const applyStatic=()=>{document.querySelectorAll('[data-i18n]').forEach(e=>{e.innerHTML=t(e.dataset.i18n)});document.querySelectorAll('[data-ia]').forEach(e=>e.dataset.ia.split(',').forEach(q=>{const[at,k]=q.split('=');e.setAttribute(at,t(k))}))};
const setLang=l=>{if(!I18N[l])return;LANG=l;try{localStorage.setItem('mbalab-lang',l)}catch(e){}
document.documentElement.lang=l;applyStatic();$('langLb').textContent=LB[l];
document.querySelectorAll('#langMenu [data-lang]').forEach(b=>b.setAttribute('aria-checked',b.dataset.lang===l));
setMotion(paused);audioUI();$('dn').setAttribute('aria-label',t(document.body.classList.contains('day')?'nightAria':'dayAria'));
fcat=fcat;renderCat();all();$('ideaCfg').textContent=cfgNote();
Object.keys(FF).forEach(k=>{if(FF[k].getAttribute('aria-invalid')==='true')chk(k)})};
const lm=$('langMenu'),lb=$('lang');
const lmOpen=o=>{lm.hidden=!o;lb.setAttribute('aria-expanded',o);if(o){const c=lm.querySelector('[aria-checked="true"]');c&&c.focus()}};
lb.onclick=e=>{e.stopPropagation();lmOpen(lm.hidden)};
lm.onclick=e=>{const b=e.target.closest('[data-lang]');if(b){setLang(b.dataset.lang);lmOpen(false);lb.focus()}};
lm.addEventListener('keydown',e=>{const it=[...lm.querySelectorAll('[data-lang]')],i=it.indexOf(document.activeElement);if(e.key==='ArrowDown'){e.preventDefault();it[(i+1)%it.length].focus()}else if(e.key==='ArrowUp'){e.preventDefault();it[(i-1+it.length)%it.length].focus()}});
document.addEventListener('click',e=>{if(!lm.hidden&&!e.target.closest('.langw'))lmOpen(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lm.hidden){lmOpen(false);lb.focus()}});
