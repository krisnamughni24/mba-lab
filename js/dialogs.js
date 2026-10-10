/* About and Share an Idea dialogs */
/* dialogs */
const cfgNote=()=>{const C=window.MBALAB_CONFIG||{};return C.formEndpoint?'':t('errUnavail')};
$('btnInfo').onclick=()=>openOv($('infoDlg'));
$('btnIdea').onclick=()=>{$('ideaCfg').textContent=cfgNote();openOv($('ideaDlg'))};
ovs.slice(1).forEach(o=>o.addEventListener('click',e=>{if(e.target===o)closeOv()}));
document.querySelectorAll('.ov [data-close]').forEach(b=>b.onclick=closeOv);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOv();if(e.key!=='Tab')return;const ov=ovs.find(o=>o.classList.contains('on'));if(!ov)return;const f=[...ov.querySelectorAll('button,input,select,textarea,a[href]')].filter(x=>!x.disabled&&x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});
