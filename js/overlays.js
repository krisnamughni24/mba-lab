/* Overlays (modal windows), open/close and SMART view switching */
const M=$("modal"),ovs=[M,$("infoDlg"),$("ideaDlg")];let lastFoc=null;
const openOv=el=>{lastFoc=document.activeElement;ovs.forEach(o=>o.classList.remove("on"));el.classList.add("on");document.body.classList.add("modal-open");const f=el.querySelector("[data-close]");f&&f.focus()};
const closeOv=()=>{if(!ovs.some(o=>o.classList.contains("on")))return;ovs.forEach(o=>o.classList.remove("on"));document.body.classList.remove("modal-open");lastFoc&&lastFoc.focus&&lastFoc.focus()};
const openM=()=>openOv(M),closeM=closeOv;
$("explore").onclick=openM;$("mclose").onclick=closeM;M.onclick=e=>{if(e.target===M)closeM()};document.addEventListener("keydown",e=>{if(e.key==="Escape")closeM()});
const openSmart=()=>{closeM();document.body.classList.add('inapp');$("landing").classList.add("off");$("app").classList.add("on");sens()};
$("back").onclick=()=>{document.body.classList.remove('inapp');$("app").classList.remove("on");$("landing").classList.remove("off")};
