/* i18n runtime: current language and t(key, params) */
let LANG='en';try{const s=localStorage.getItem('mbalab-lang');if(s&&I18N[s])LANG=s}catch(e){}
const t=(k,p)=>{let s=(I18N[LANG]&&I18N[LANG][k])||I18N.en[k]||k;if(p)for(const q in p)s=s.split('{'+q+'}').join(p[q]);return s};
