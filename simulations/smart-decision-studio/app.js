/* SMART Decision Studio: matrix, weights, aggregate scores, drill-down and sensitivity analysis.
   Deterministic math:  V_j = sum_i w_i v_ij ;  V_j(x) = (sum_{i!=k} W_i v_ij + x v_kj) / (S + x) ;
   crossover x* = (A_b - A_a) / (v_ka - v_kb). */
(() => {
  let api = null;
  MBALAB.sims.define('smart-decision-studio', {
    mount(host) {
    const DEMO=()=>({alts:["Citarum","Parahyangan","Digi Nusa","Kencana","Mitra Usaha"],
     attrs:[{n:"Branch Proximity",w:10},{n:"Relationship Manager",w:30},{n:"Automatic Credit Limit",w:100},{n:"Cash Management",w:50}],
     m:[[0,100,40,0],[100,100,80,0],[70,0,100,100],[30,0,0,100],[90,100,20,0]]});
    let S=DEMO(),sel=null;
    const NIGHTC=["#7dd3fc","#6ee7b7","#fbbf24","#c4b5fd","#fda4af","#e5e7eb","#fde68a","#67e8f9"],DAYC=["#2563eb","#059669","#d97706","#7c3aed","#dc2626","#475569","#a16207","#0e7490"],COL=NIGHTC.slice();
    const setTheme=day=>{COL.splice(0,8,...(day?DAYC:NIGHTC))};
    const f=(x,d=2)=>Number(x).toFixed(d);const sv=v=>Number.isFinite(v)?v:"";
    function valid(){const W=S.attrs.map(a=>a.w);if(S.alts.length<2)return t("vAlts");
     if(W.some(w=>!isFinite(w)||w<0))return t("vWeights");if(!(W.reduce((a,b)=>a+b,0)>0))return t("vZero");
     for(const r of S.m)for(const v of r)if(!isFinite(v)||v<0||v>100)return t("vRatings");return""}
    function scores(){const T=S.attrs.reduce((a,b)=>a+b.w,0);return S.alts.map((n,j)=>({j,n:n||t("altN",{n:j+1}),V:S.attrs.reduce((s,a,i)=>s+a.w/T*S.m[j][i],0)}))}
    function renderMx(){let h="<tr><th>"+t("thAlt")+"</th>"+S.attrs.map((a,i)=>`<th><input class=nm value="${a.n}" data-an="${i}" placeholder="${t('phAttr')}"><button class=x data-dk="${i}" title="${t('delAttr')}">✕</button></th>`).join("")+"<th></th></tr>";
     h+=`<tr><td><b>${t('rawW')}</b></td>`+S.attrs.map((a,i)=>`<td><input type=number min=0 value="${sv(a.w)}" data-w="${i}"></td>`).join("")+"<td></td></tr>";
     const T=S.attrs.reduce((a,b)=>a+(+b.w||0),0);
     h+=`<tr><td>${t('normW')}</td>`+S.attrs.map(a=>`<td>${T>0&&Number.isFinite(a.w)?f(100*a.w/T)+"%":"–"}</td>`).join("")+"<td></td></tr>";
     S.alts.forEach((n,j)=>{h+=`<tr><td><input class=nm value="${n}" data-n="${j}" placeholder="${t('phAlt')}"></td>`+S.m[j].map((v,i)=>`<td><input type=number min=0 max=100 value="${sv(v)}" data-v="${j},${i}"></td>`).join("")+`<td><button data-d="${j}" title="${t('delAlt')}">✕</button></td></tr>`});
     $("mx").innerHTML=h}
    function renderRes(){const e=valid();$("msg").textContent=e;if(e){$("res").innerHTML="";$("drill").textContent="";return}
     const r=scores().sort((a,b)=>b.V-a.V),top=r[0].V,TW=S.attrs.reduce((s,a)=>s+a.w,0);
     $("res").innerHTML="<tr><th>"+t("rank")+"</th><th>"+t("thAlt")+"</th><th>"+t("score")+"</th><th>"+t("vsLeader")+"</th><th>"+S.attrs.map((a,i)=>`<span class=lg style="background:${COL[i%8]}"></span>${a.n||t("attrN",{n:i+1})}`).join(" ")+"</th></tr>"+r.map((x,k)=>{const tie=Math.abs(x.V-top)<1e-9&&k>0;
     return`<tr class="${k==0?"win":""}" data-r="${x.j}" style="cursor:pointer"><td>${tie?"=1":k+1}</td><td>${x.n}</td><td>${f(x.V)}</td><td>${f(x.V-top)}</td><td><div class=sb>${S.attrs.map((a,i)=>`<i style="width:${a.w/TW*S.m[x.j][i]*2.2}px;background:${COL[i%8]}" title="${a.n}: ${f(a.w/TW*S.m[x.j][i])}"></i>`).join("")}</div></td></tr>`}).join("");
     if(sel===null||sel>=S.alts.length)sel=r[0].j;drill()}
    function drill(){if(valid())return;const T=S.attrs.reduce((a,b)=>a+b.w,0),j=sel;
     let rw=S.attrs.map((a,i)=>`  ${a.n}: ${f(a.w/T,4)} × ${S.m[j][i]} = ${f(a.w/T*S.m[j][i])}`);
     $("drill").textContent=t("breakdown",{a:S.alts[j]})+"\n"+rw.join("\n")+`\n  ${t("total")} = ${f(scores()[j].V)}`}
    function sens(){const e=valid();if(e){$("ch").innerHTML="";$("cx").innerHTML="";return}
     const k=+$("ks").value,xm=Math.max(1,+$("xm").value||200),Wt=S.attrs.map(a=>a.w);
     const Sx=Wt.reduce((a,b,i)=>i==k?a:a+b,0),n=S.alts.length;
     const A=S.m.map(r=>r.reduce((s,v,i)=>i==k?s:s+Wt[i]*v,0)),vk=S.m.map(r=>r[k]);
     const V=(j,x)=>(Sx+x>0)?(A[j]+x*vk[j])/(Sx+x):NaN;
     const win=x=>{let b=0;for(let j=1;j<n;j++)if(V(j,x)>V(b,x)+1e-9)b=j;return b};
     const xp=x=>$("ax").value=="norm"?(Sx+x>0?100*x/(Sx+x):0):x;
     const X0=xp(0),X1=xp(xm),px=x=>50+620*(xp(x)-X0)/((X1-X0)||1),py=v=>300-270*v/100;
     let g=`<line x1=50 y1=300 x2=670 y2=300 stroke="var(--mut)"/><line x1=50 y1=30 x2=50 y2=300 stroke="var(--mut)"/>`;
     for(let t=0;t<=100;t+=25)g+=`<text x=44 y=${py(t)+4} text-anchor=end font-size=11 fill="var(--mut)">${t}</text><line x1=50 x2=670 y1=${py(t)} y2=${py(t)} stroke="var(--line)"/>`;
     for(let t=0;t<=4;t++){const x=xm*t/4,lbl=$("ax").value=="norm"?f(xp(x),1)+"%":f(x,0);g+=`<text x=${px(x)} y=318 text-anchor=middle font-size=11 fill="var(--mut)">${lbl}</text>`}
     g+=`<text x=360 y=332 text-anchor=middle font-size=11 fill="var(--mut)">${$("ax").value=="norm"?t("axisNorm",{a:S.attrs[k].n}):t("axisRaw",{a:S.attrs[k].n})}</text>`;
     const cs=[];for(let a=0;a<n;a++)for(let b=a+1;b<n;b++){const d=vk[a]-vk[b];if(Math.abs(d)<1e-12)continue;const x=(A[b]-A[a])/d;if(x>=0&&x<=xm)cs.push({a,b,x})}
     cs.forEach(c=>{const eps=Math.max(1e-6,xm*1e-6),w1=win(Math.max(0,c.x-eps)),w2=win(c.x+eps);c.sw=w1!=w2;c.w1=w1;c.w2=w2});
     cs.filter(c=>c.sw).forEach(c=>g+=`<line x1=${px(c.x)} x2=${px(c.x)} y1=30 y2=300 stroke="var(--red)" stroke-dasharray="5 4"/>`);
     cs.filter(c=>!c.sw).forEach(c=>g+=`<line x1=${px(c.x)} x2=${px(c.x)} y1=200 y2=300 stroke="var(--mut)" stroke-dasharray="2 4" opacity=.5 />`);
     for(let j=0;j<n;j++){let d="";for(let s=0;s<=160;s++){const x=xm*s/160;d+=(s?"L":"M")+px(x)+","+py(V(j,x))}
      g+=`<path d="${d}" fill="none" stroke="${COL[j%8]}" stroke-width=2.2 />`;
      g+=`<text x=${Math.min(px(xm)-2,668)} y=${py(V(j,xm))-4} text-anchor=end font-size=10.5 fill="${COL[j%8]}">${S.alts[j]}</text>`}
     const bx=Wt[k];if(bx<=xm)g+=`<line x1=${px(bx)} x2=${px(bx)} y1=30 y2=300 stroke="var(--teal)" stroke-width=2 /><text x=${px(bx)+4} y=42 font-size=11 fill="var(--teal)">${t("base")}</text>`;
     const cx=+$("sl").value;g+=`<line x1=${px(cx)} x2=${px(cx)} y1=30 y2=300 stroke="var(--org)" stroke-width=1.5 />`;
     $("ch").innerHTML=g;
     const o=[...Array(n).keys()].sort((a,b)=>V(b,cx)-V(a,cx));
     $("slv").innerHTML=`x = ${cx} (${f(100*cx/(Sx+cx),2)}%) → ${t("leader")} <b>${S.alts[o[0]]}</b> (${f(V(o[0],cx))})`;
     const rows=cs.sort((a,b)=>a.x-b.x);
     $("cx").innerHTML="<tr><th>"+t("thAlts")+"</th><th>"+t("rawX")+"</th><th>"+t("normalized")+"</th><th>"+t("score")+"</th><th>"+t("typeH")+"</th></tr>"+(rows.length?rows.map(c=>`<tr><td>${S.alts[c.a]} × ${S.alts[c.b]}</td><td>${f(c.x)}</td><td>${f(100*c.x/(Sx+c.x))}%</td><td>${f(V(c.a,c.x))}</td><td>${c.sw?`<b class=warn>${t("winSwitch")}</b>: ${S.alts[c.w1]} → ${S.alts[c.w2]}`:t("rankCross")}</td></tr>`).join(""):"<tr><td colspan=5>"+t("noCross")+"</td></tr>");
     const sw=rows.filter(c=>c.sw),w0=win(0);
     $("sum").textContent=sw.length?t("sumSw",{n:sw.length,m:xm,b:bx,w:S.alts[win(bx)],d:f(Math.min(...sw.map(c=>Math.abs(c.x-bx))))}):t("sumStay",{w:S.alts[w0]})}
    function all(){renderMx();renderRes();sens()}
    function fillKs(){const c=$("ks").value||"1";$("ks").innerHTML=S.attrs.map((a,i)=>`<option value=${i}>${a.n||t("attrN",{n:i+1})}</option>`).join("");$("ks").value=Math.min(+c,S.attrs.length-1)}
    host.addEventListener("input",e=>{const d=e.target.dataset;if(d.w!==undefined)S.attrs[d.w].w=parseFloat(e.target.value);
     else if(d.v!==undefined){const[j,i]=d.v.split(",");S.m[j][i]=parseFloat(e.target.value)}
     else if(d.n!==undefined)S.alts[d.n]=e.target.value;else if(d.an!==undefined){S.attrs[d.an].n=e.target.value;fillKs()}
     else if(e.target.id=="sl"||e.target.id=="xm"||e.target.id=="ax"){if(e.target.id=="xm")$("sl").max=e.target.value;sens();return}
     else return;renderRes();sens();const nz=S.attrs.map(a=>a.w);const T=nz.reduce((a,b)=>a+(+b||0),0);
     document.querySelectorAll("#mx tr:nth-child(3) td").forEach((td,i)=>{if(i>0&&i<=S.attrs.length)td.textContent=T>0&&Number.isFinite(S.attrs[i-1].w)?f(100*S.attrs[i-1].w/T)+"%":"–"})});
    $("ks").onchange=sens;
    host.addEventListener("click",e=>{const d=e.target.dataset;
     if(d.d!==undefined){if(S.alts.length<=2){alert(t("minAlts"));return}if(!confirm(t("confDelAlt",{n:S.alts[d.d]||t("thisOne")})))return;S.alts.splice(d.d,1);S.m.splice(d.d,1);all()}
     if(d.dk!==undefined){if(S.attrs.length<=2){alert(t("minAttrs"));return}if(!confirm(t("confDelAttr",{n:S.attrs[d.dk].n||t("thisOne")})))return;S.attrs.splice(d.dk,1);S.m.forEach(r=>r.splice(d.dk,1));fillKs();all()}const tr=e.target.closest("tr[data-r]");if(tr){sel=+tr.dataset.r;drill()}});
    $("addA").onclick=()=>{S.alts.push(t("altN",{n:S.alts.length+1}));S.m.push(S.attrs.map(()=>0));all()};
    $("addK").onclick=()=>{S.attrs.push({n:t("attrN",{n:S.attrs.length+1}),w:10});S.m.forEach(r=>r.push(0));fillKs();all()};
    $("reset").onclick=()=>{if(confirm(t("confReset"))){S.alts=S.alts.map(()=>"");S.attrs=S.attrs.map(()=>({n:"",w:NaN}));S.m=S.m.map(r=>r.map(()=>NaN));sel=null;fillKs();all()}};
      api = { all, sens, setTheme };
      setTheme(MBALAB.theme && MBALAB.theme.isDay());
      fillKs(); all();
    },
    onShow() { api.setTheme(MBALAB.theme.isDay()); api.all(); },
    onLang() { api && api.all(); },
    onTheme(day) { api.setTheme(day); api.all(); }
  });
})();
