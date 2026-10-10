/* Idea form: validation and submission */
/* idea / collaboration form */
const FF={name:$('fName'),email:$('fEmail'),type:$('fType'),subject:$('fSubject'),message:$('fMessage')},FE={name:'eName',email:'eEmail',type:'eType',subject:'eSubject',message:'eMessage'};
const RULES={name:()=>'',email:v=>!v.trim()?t('vEmail0'):/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?'':t('vEmail1'),type:v=>v?'':t('vType'),subject:v=>v.trim().length<3?t('vSubject'):'',message:v=>v.trim().length<10?t('vMessage'):''};
const chk=k=>{const m=RULES[k](FF[k].value);$(FE[k]).textContent=m;FF[k].setAttribute('aria-invalid',m?'true':'false');return!m};
Object.keys(FF).forEach(k=>{FF[k].addEventListener('blur',()=>{if(FF[k].value||FF[k].getAttribute('aria-invalid')==='true')chk(k)});FF[k].addEventListener('input',()=>{if(FF[k].getAttribute('aria-invalid')==='true')chk(k)});FF[k].addEventListener('change',()=>{if(FF[k].getAttribute('aria-invalid')==='true')chk(k)})});
const setSt=(m,c)=>{const s=$('fStatus');s.textContent=m;s.className=c||'';if(c==='ok')AU.play('ok');else if(c==='err')AU.play('err')};
const sendIdea=async d=>{const C=window.MBALAB_CONFIG||{};
if(C.formEndpoint){
/* generic JSON payload: works with Web3Forms, Formspree and similar form-to-email services; formFields carries their static fields (e.g. access_key) */
const body=Object.assign({},C.formFields||{},{name:d.name||'(not provided)',from_name:d.name||'MBA Lab visitor',email:d.email,type:d.type,subject:'[MBA Lab] '+d.type+': '+d.subject,_subject:'[MBA Lab] '+d.type+': '+d.subject,message:d.message,page:d.page,sentAt:d.sentAt,lang:d.lang});
const r=await fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
let j=null;try{j=await r.json()}catch(x){}
if(!r.ok||(j&&(j.success===false||j.ok===false)))throw new Error((j&&j.message)||t('errStatus',{s:r.status}));
return{msg:t('okEndpoint'),reset:true}}
const e=new Error(t('errUnavail'));e.unavail=true;throw e};
let sending=false;
$('ideaForm').addEventListener('submit',async e=>{e.preventDefault();if(sending||$('fBot').value)return;const bad=Object.keys(FF).filter(k=>!chk(k));if(bad.length){FF[bad[0]].focus();setSt(t('fixFields'),'err');return}
sending=true;$('fSubmit').disabled=true;$('ideaForm').setAttribute('aria-busy','true');setSt(t('submitting'),'');
const d={name:FF.name.value.trim(),email:FF.email.value.trim(),type:FF.type.value,subject:FF.subject.value.trim(),message:FF.message.value.trim(),page:location.href,sentAt:new Date().toISOString(),lang:LANG};
try{const r=await sendIdea(d);setSt(r.msg,'ok');if(r.reset){$('ideaForm').reset();Object.keys(FF).forEach(k=>{$(FE[k]).textContent='';FF[k].setAttribute('aria-invalid','false')})}}
catch(err){if(err&&err.unavail)setSt(err.message,'err');else setSt(t('errPre')+((err&&err.message)||t('unknownErr'))+t('errKept'),'err')}
finally{sending=false;$('fSubmit').disabled=false;$('ideaForm').removeAttribute('aria-busy')}});
