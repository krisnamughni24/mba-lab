/* Scene feature: the animated 3D Jakarta-style city on the landing page (Three.js r128 from the CDN).
   Exposes window.cityMode(day), window.cityPause(paused), window.cityHold(held: stop rendering while a full-screen page covers the city) and window.cityCam (zoom / tilt / pan / reset).
   If WebGL or Three.js is unavailable, the CSS cube scene below stays as a fallback. */
MBALAB.feature('scene', () => {
/* CSS fallback scene */
const cube=(s,l,st,d)=>`<div class="o" style="${st}"><div class="cube" style="--s:${s}px;animation-duration:${d}s">${[0,1,2,3,4,5].map(k=>`<i>${l[k]||""}</i>`).join("")}</div></div>`;
$("stage").innerHTML=`<div class="scene"><div class="rig">`+cube(190,["SMART","NPV","EOQ","BEP","5 FORCES","BATNA"],"left:calc(50% - 95px);top:calc(50% - 95px);--z:0px",22)+cube(54,[],"left:6%;top:10%;--z:120px;animation-delay:-2s",11)+cube(38,[],"right:8%;top:16%;--z:-60px;animation-delay:-5s",9)+cube(70,[],"left:12%;bottom:6%;--z:60px;animation-delay:-1s",15)+cube(30,[],"right:14%;bottom:12%;--z:160px;animation-delay:-3s",8)+`<div class="o card" style="left:-4%;top:44%;--z:150px;--r:-16deg;animation-delay:-2s"><b>Demo result</b><br>Digi Nusa <b>82.63</b><div class="mb"><i style="width:100%"></i></div>Parahyangan <b>63.16</b><div class="mb"><i style="width:76%"></i></div></div><div class="o card" style="right:-2%;top:64%;--z:110px;--r:18deg;animation-delay:-4s"><b>Winner switch</b><br>RM weight x = 67<br>(29.52% normalized)</div></div></div>`;

/* 3D city: scene, traffic, aircraft, day/night, camera and render loop */
const L=$('landing');
const build=()=>{try{(function(){
const T=THREE,st=$('stage');st.innerHTML='';let RM=false,t=0,HOLD=false;window.cityPause=v=>{RM=v};window.cityHold=v=>{HOLD=!!v};
const R=new T.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,1.5));st.appendChild(R.domElement);
const sc=new T.Scene();sc.fog=new T.FogExp2(0x0a0f2c,.0022);const cam=new T.PerspectiveCamera(48,1,1,1400);
const amb=new T.AmbientLight(0x8899cc,.8);sc.add(amb);const dl=new T.DirectionalLight(0xbbd4ff,.9);dl.position.set(80,90,-60);sc.add(dl);
const P=16,rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)],M=(c,o)=>new T.MeshBasicMaterial(Object.assign({color:c},o||{})),D=new T.Object3D(),V=(x,z,y)=>new T.Vector3(x,y||0,z);
const add=(m,x,y,z)=>{m.position.set(x,y,z);sc.add(m);return m},flat=(w,h,mt,x,y,z)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),mt);m.rotation.x=-Math.PI/2;return add(m,x,y,z)};
const gtex=c0=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,c0);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new T.CanvasTexture(c)};
const glow=(x,y,z,s,c0)=>{const sp=new T.Sprite(new T.SpriteMaterial({map:gtex(c0),blending:T.AdditiveBlending,depthWrite:false,transparent:true}));sp.scale.set(s,s,1);return add(sp,x,y,z)};
const inst=(geo,mt,list,fn)=>{const im=new T.InstancedMesh(geo,mt,list.length);im.frustumCulled=false;list.forEach((p,i)=>{D.position.set(0,0,0);D.rotation.set(0,0,0);D.scale.set(1,1,1);fn(p,i,im);D.updateMatrix();im.setMatrixAt(i,D.matrix)});sc.add(im);return im};
/* land, coast, sea, islands */
const landM=M(0x0a1228),beachM=M(0x3a4a68);flat(1600,1600,landM,0,0,0);flat(1600,6,beachM,0,.12,-74);
const sea=new T.Mesh(new T.PlaneGeometry(4000,1400,120,40),new T.MeshPhongMaterial({color:0x0b3a6b,shininess:90,specular:0x7fb2ff,transparent:true,opacity:.93}));sea.rotation.x=-Math.PI/2;add(sea,0,.15,-775);const sp=sea.geometry.attributes.position;
/* rice fields */
const fc=[0x1f5a35,0x2c6e3a,0x3f8a3a,0x6b9a3a,0x2a7a4a],cells=[];
for(let x=-190;x<=190;x+=17)for(let z=-55;z<=175;z+=11.5){if(Math.abs(x)<78&&z<74)continue;if(Math.abs(x+8)<44&&Math.abs(z-108)<36)continue;cells.push([x+rnd(-1,1),z+rnd(-.6,.6)])}
const rice=inst(new T.PlaneGeometry(15,10),M(0xffffff),cells,(c,i,im)=>{D.position.set(c[0],.03,c[1]);D.rotation.set(-Math.PI/2,0,0);im.setColorAt(i,new T.Color(pick(fc)))});
const hs=[];for(let v=0;v<16;v++){const cx=rnd(-180,180),cz=rnd(-45,165);if(Math.abs(cx)<80&&cz<76)continue;for(let n=0;n<10;n++){const hx=cx+rnd(-7,7),hz=cz+rnd(-5,5);if(Math.abs(hx+8)<44&&Math.abs(hz-108)<36)continue;hs.push([hx,hz])}}
inst(new T.BoxGeometry(1.8,1.1,1.8),M(0xffffff),hs,(p,i,im)=>{D.position.set(p[0],.6,p[1]);D.rotation.set(0,rnd(0,3),0);im.setColorAt(i,new T.Color(pick([0xffc58a,0xf4a261,0xe9d8a6,0xff8f70])))});
/* rivers + elevated toll road */
const ribbon=(pts,w,y,mt)=>{const cv=new T.CatmullRomCurve3(pts),n=120,p=[],ix=[];for(let i=0;i<=n;i++){const u=i/n,a=cv.getPointAt(u),b=cv.getPointAt(Math.min(1,u+.01)),dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1,nx=-dz/l*w/2,nz=dx/l*w/2;p.push(a.x+nx,y,a.z+nz,a.x-nx,y,a.z-nz);if(i<n){const k=i*2;ix.push(k,k+1,k+2,k+1,k+3,k+2)}}
const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex(ix);sc.add(new T.Mesh(g,mt));return cv};
const DS={side:T.DoubleSide},wm=M(0x2b8fd6,DS);
const r1=ribbon([[50,230],[40,170],[34,118],[32,70],[32,30],[32,-20],[32,-60],[32,-84]].map(p=>V(p[0],p[1])),10,.06,wm);
const r2=ribbon([[-120,200],[-132,150],[-104,110],[-112,70],[-96,30],[-104,-10],[-92,-45],[-98,-82]].map(p=>V(p[0],p[1])),4.5,.06,wm);
const hp=[[-60,210],[-52,150],[-60,100],[-30,60],[-24,20],[-34,-30],[-20,-72]].map(p=>V(p[0],p[1])),hwM=M(0x1b2447,DS),hwL=M(0x4dd2ff,DS),hw=ribbon(hp,4.2,4,hwM);ribbon(hp,.25,4.05,hwL);
const mrM=M(0x2a3566,DS),rlM=M(0x4b5563,DS),mrL=M(0xff6ad5,DS),P2=a=>a.map(q=>V(q[0],q[1]));
const f2p=P2([[-140,-30],[-80,-24],[-20,-24],[30,-24],[80,-26],[150,-34]]),f2=ribbon(f2p,4.4,8,hwM);ribbon(f2p,.25,8.05,hwL);
const f3p=P2([[50,150],[48,100],[46,50],[46,0],[48,-40],[50,-62]]),f3=ribbon(f3p,4.4,4,hwM);ribbon(f3p,.25,4.05,hwL);
const mAp=P2([[-150,48],[-90,40],[-30,40],[30,42],[90,36],[150,48]]),mA=ribbon(mAp,3.6,12,mrM);ribbon(mAp,.3,12.05,mrL);
const mBp=P2([[-72,170],[-70,100],[-70,40],[-72,-20],[-70,-72]]),mB=ribbon(mBp,3.6,15,mrM);ribbon(mBp,.3,15.05,mrL);
const mCp=P2([[-150,-56],[-60,-58],[0,-60],[60,-58],[150,-56]]),mC=ribbon(mCp,3.6,.1,rlM);ribbon(mCp,.3,.14,mrL);
const pil=(cv,y,n)=>inst(new T.BoxGeometry(.8,1,.8),M(0x39467a),[...Array(n).keys()],i=>{const q=cv.getPointAt(i/(n-1));D.position.set(q.x,y/2,q.z);D.scale.set(1,y,1)});
pil(hw,4,40);pil(f2,8,50);pil(f3,4,30);pil(mA,12,40);pil(mB,15,40);
const keep=[];const addK=(c,r,n)=>c.getPoints(n||120).forEach(q=>keep.push({x:q.x,z:q.z,r}));addK(r1,8,200);addK(r2,6);addK(hw,4.5);addK(f2,5);addK(f3,5);addK(mA,5);addK(mB,5);addK(mC,5);const nearR=(x,z)=>keep.some(k=>Math.hypot(k.x-x,k.z-z)<k.r);
/* roads */
const rm=M(0x121a3d),lm=M(0x3b82f6,{transparent:true,opacity:.55});
for(let k=-5;k<=4;k++){const c=(k+.5)*P;[[5,150,c,0,rm,.02],[150,5,0,c,rm,.02],[.12,150,c,0,lm,.04],[150,.12,0,c,lm,.04]].forEach(q=>flat(q[0],q[1],q[4],q[2],q[5],q[3]))}
/* glass towers */
const tx=[0,1,2,3].map(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='#000';x.fillRect(0,0,64,64);for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(Math.random()<.6){x.fillStyle=pick(['#ffd98a','#9be7ff','#ffb3e6','#ffffff']);x.fillRect(i*16+4,j*16+4,8,9)}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;return t}),ec=[0x4dd2ff,0xff6ad5,0xa78bfa];
/* daytime facade: pale wall with blue reflective window panes, so towers read as real buildings in daylight */
const txd=[0,1,2,3].map(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='#dde8f4';x.fillRect(0,0,64,64);for(let i=0;i<4;i++)for(let j=0;j<4;j++){const g=x.createLinearGradient(i*16+3,j*16+3,i*16+13,j*16+14);const lit=Math.random()<.85;g.addColorStop(0,lit?'#8cc4f0':'#cfe0f0');g.addColorStop(1,lit?'#3f78b4':'#aac2dc');x.fillStyle=g;x.fillRect(i*16+3,j*16+4,10,9);x.fillStyle='rgba(255,255,255,.55)';x.fillRect(i*16+3,j*16+4,3,9);x.strokeStyle='#f7fbff';x.lineWidth=1;x.strokeRect(i*16+3,j*16+4,10,9)}x.fillStyle='rgba(60,90,130,.25)';for(let j=0;j<4;j++)x.fillRect(0,j*16+14,64,1.5);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;return t});
const bm=[],be=[];const mk=(geo,x,y,z,rx,ry)=>{const t0=pick(tx).clone();t0.needsUpdate=true;t0.repeat.set(Math.max(1,rx),Math.max(1,ry));const mat=new T.MeshStandardMaterial({color:0x2b3f86,transparent:true,opacity:.72,metalness:.5,roughness:.25,emissive:0xffffff,emissiveMap:t0,emissiveIntensity:.85});const td=pick(txd).clone();td.needsUpdate=true;td.repeat.set(Math.max(1,rx),Math.max(1,ry));mat.userData.dm=td;bm.push(mat);const m=new T.Mesh(geo,mat),em=new T.LineBasicMaterial({color:pick(ec),transparent:true,opacity:.55});em.userData.n=em.color.getHex();be.push(em);m.add(new T.LineSegments(new T.EdgesGeometry(geo,30),em));return add(m,x,y,z)};
const spire=(x,h,z)=>add(new T.Mesh(new T.CylinderGeometry(.08,.2,h*.18,6),M(0xdde6ff)),x,h+h*.09,z);
const clear=[[0,0,14],[-16,0,12],[-48,-32,10],[16,16,8],[-16,-32,8],[16,-48,8],[-48,16,8]],B=[];
for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++)for(let a=-1;a<=1;a+=2)for(let b=-1;b<=1;b+=2){const x=i*P+a*2.75,z=j*P+b*2.75;if(Math.random()<.1||clear.some(c=>Math.hypot(x-c[0],z-c[1])<c[2])||nearR(x,z,4.5))continue;
const d=Math.hypot(i,j),w=rnd(3.6,4.6),dp=rnd(3.6,4.6),h=rnd(4,12)+Math.max(0,5-d)*rnd(2,6),ty=Math.random();
if(ty<.25&&h>14){const h1=h*.55,h2=h*.3,h3=h*.15;mk(new T.BoxGeometry(w,h1,dp),x,h1/2,z,Math.round(w/3),Math.round(h1/3));mk(new T.BoxGeometry(w*.75,h2,dp*.75),x,h1+h2/2,z,2,Math.round(h2/3));mk(new T.BoxGeometry(w*.5,h3,dp*.5),x,h1+h2+h3/2,z,1,Math.round(h3/3));spire(x,h,z)}
else if(ty<.5){const r=w/2;mk(new T.CylinderGeometry(r,r,h,16),x,h/2,z,Math.round(2*Math.PI*r/3),Math.round(h/3));if(h>16)spire(x,h,z)}
else mk(new T.BoxGeometry(w,h,dp),x,h/2,z,Math.round(w/3),Math.round(h/3));B.push({x,z,h,box:ty>=.5})}
const lo=[];for(let i=-4;i<=4;i++)for(let j=-4;j<=4;j++){if(Math.abs(i)<=3&&Math.abs(j)<=3)continue;for(let a=-1;a<=1;a+=2)for(let b=-1;b<=1;b+=2){const x=i*P+a*2.75,z=j*P+b*2.75;if(Math.random()<.2||nearR(x,z,4.5))continue;lo.push([x,z,rnd(1.5,5)])}}
const loM=inst(new T.BoxGeometry(1,1,1),M(0xffffff),lo,(p,i,im)=>{D.position.set(p[0],p[2]/2,p[1]);D.scale.set(3.4,p[2],3.4);im.setColorAt(i,new T.Color(pick([0x7f93c9,0xb9a58a,0xffc58a,0x9aa6c4])))});
/* Monas */
const plazaM=M(0x14532d);flat(22,22,plazaM,0,.05,0);add(new T.Mesh(new T.BoxGeometry(12,1,12),M(0x8793b8)),0,.5,0);add(new T.Mesh(new T.BoxGeometry(7,5,7),new T.MeshStandardMaterial({color:0xdde6ff,emissive:0x223355})),0,3.5,0);
const ob=new T.Mesh(new T.CylinderGeometry(.7,1.7,22,4),new T.MeshStandardMaterial({color:0xeef3ff,emissive:0x2a3a66}));ob.rotation.y=Math.PI/4;add(ob,0,17,0);
add(new T.Mesh(new T.ConeGeometry(.9,3,8),M(0xffd166)),0,29.5,0);const flame=glow(0,29.5,0,16,'rgba(255,200,90,.95)');
/* Istiqlal */
add(new T.Mesh(new T.BoxGeometry(9,2,9),M(0xcfd8f0)),-16,1,0);add(new T.Mesh(new T.CylinderGeometry(3.6,3.6,1.4,24),M(0xe8f0ff)),-16,2.7,0);add(new T.Mesh(new T.SphereGeometry(3.6,24,12,0,Math.PI*2,0,Math.PI/2),M(0xf4f8ff)),-16,3.4,0);
add(new T.Mesh(new T.CylinderGeometry(.5,.6,18,10),M(0xe8f0ff)),-11,9,-5);add(new T.Mesh(new T.ConeGeometry(.8,2,10),M(0xffd166)),-11,19,-5);
/* Selamat Datang monument at a roundabout */
add(new T.Mesh(new T.CylinderGeometry(4.5,4.5,.3,32),M(0x1d6fa5)),-8,.2,24);const tr=new T.Mesh(new T.TorusGeometry(4.6,.2,8,32),M(0xffffff));tr.rotation.x=Math.PI/2;add(tr,-8,.4,24);
add(new T.Mesh(new T.CylinderGeometry(.5,.9,10,8),M(0xe8f0ff)),-8,5.2,24);add(new T.Mesh(new T.BoxGeometry(.6,1.6,.6),M(0xffd166)),-8,11,24);add(new T.Mesh(new T.BoxGeometry(2.4,.2,.2),M(0xffd166)),-8,11.6,24);
/* Gelora Bung Karno stadium */
const sd=new T.Mesh(new T.CylinderGeometry(9,7,4,32,1,true),new T.MeshStandardMaterial({color:0xc9d6ff,emissive:0x3a4a7a,side:T.DoubleSide}));sd.scale.x=1.25;add(sd,-48,2,-32);const fd=new T.Mesh(new T.CircleGeometry(6,24),M(0x1f7a4a));fd.rotation.x=-Math.PI/2;fd.scale.x=1.25;add(fd,-48,.3,-32);const sr=new T.Mesh(new T.TorusGeometry(8.2,.25,6,40),M(0xfff2b0));sr.rotation.x=Math.PI/2;sr.scale.x=1.25;add(sr,-48,4.1,-32);
/* mountains */
const hh=(a,b,c)=>{const s=Math.sin(a*12.9898+b*78.233+c*37.719)*43758.5453;return s-Math.floor(s)-.5};
const MT=[];const mt=(x,z,r,h,sg)=>{const g=new T.CylinderGeometry(r*.06,r,h,sg,4,true),p=g.attributes.position,cl=[],ys=[];for(let i=0;i<p.count;i++){const ox=p.getX(i),oy=p.getY(i),oz=p.getZ(i),y=oy/h+.5,f=1+hh(ox,oy,oz)*.3;p.setXYZ(i,ox*f,oy+(y<.99?hh(oz,ox,oy)*.08*h:0),oz*f);const c=new T.Color().setHSL(.38+.22*y,.45,.1+.2*y);cl.push(c.r,c.g,c.b);ys.push(y)}
g.setAttribute('color',new T.Float32BufferAttribute(cl,3));g.computeVertexNormals();MT.push({g,ys});return add(new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:1})),x,h/2,z)};
const MTL=[[10,250,110,110,9],[-60,262,120,100,8],[-190,225,90,78,8],[170,235,100,70,8],[250,200,80,55,7],[-280,175,70,50,7],[-110,200,60,40,7],[110,205,60,38,7]];MTL.forEach(q=>mt(q[0],q[1],q[2],q[3],q[4]));
add(new T.Mesh(new T.SphereGeometry(3.5,8,8),M(0xff7a3c)),10,108,250);const volc=glow(10,108,250,30,'rgba(255,110,60,.9)');
/* traffic lights, lane-following cars, pedestrians */
const NH=50,cars=[],LNS=[],cc=[0xff4d6d,0x4dd2ff,0xffd166,0xa78bfa,0x6ee7b7,0xffffff],ICS=[];for(let m=-5;m<=4;m++)ICS.push((m+.5)*P);
const lightOf=(ax,tm)=>{const a=ax?((tm%20)+10)%20:tm%20;return a<8?0:a<9?1:2};
for(let ax=0;ax<2;ax++)for(let k=-5;k<=4;k++)for(const dir of[1,-1]){const lane=[];LNS.push(lane);for(let i=0;i<4;i++){const o={ax,off:(k+.5)*P+dir*1.5,dir,p:-68+(i+rnd(.1,.9))*34,v:0,vm:rnd(6,10),lane};o.v=o.vm;lane.push(o);cars.push(o)}}
[[hw,4,24],[f2,8,26],[f3,4,20]].forEach(q=>{const len=q[0].getLength(),n=q[2];for(let k=0;k<n;k++)cars.push({hw:1,cv:q[0],y:q[1]+.35,u:(k>>1)/(n/2),dir:k%2?1:-1,s:9/len})});
const NA=cars.length,cbody=new T.InstancedMesh(new T.BoxGeometry(1.8,.5,.9),M(0xffffff),NA),chl=new T.InstancedMesh(new T.BoxGeometry(.15,.2,.2),M(0xfff2b0),NA*2),ctl=new T.InstancedMesh(new T.BoxGeometry(.1,.2,.2),M(0xff3355),NA*2);[cbody,chl,ctl].forEach(m=>{m.frustumCulled=false;sc.add(m)});
cars.forEach((o,i)=>cbody.setColorAt(i,new T.Color(pick(cc))));cbody.instanceColor.needsUpdate=true;
const lt=(m,k,x,y,z)=>{D.position.set(x,y,z);D.updateMatrix();m.setMatrixAt(k,D.matrix)};
const place=(i,x,y,z,ry)=>{const c=Math.cos(ry),q=Math.sin(ry);D.rotation.set(0,ry,0);D.scale.set(1,1,1);lt(cbody,i,x,y,z);lt(chl,i*2,x+c*.95+q*.25,y,z-q*.95+c*.25);lt(chl,i*2+1,x+c*.95-q*.25,y,z-q*.95-c*.25);lt(ctl,i*2,x-c*.95+q*.25,y,z+q*.95+c*.25);lt(ctl,i*2+1,x-c*.95-q*.25,y,z+q*.95-c*.25)};
const updCars=()=>{cars.forEach((o,i)=>{if(o.hw){const p=o.cv.getPointAt(o.u),tg=o.cv.getTangentAt(o.u).multiplyScalar(o.dir);place(i,p.x-tg.z*1.1,o.y,p.z+tg.x*1.1,Math.atan2(-tg.z,tg.x))}else place(i,o.ax?o.off:o.p,.35,o.ax?o.p:o.off,o.ax?(o.dir>0?-Math.PI/2:Math.PI/2):(o.dir>0?0:Math.PI))});cbody.instanceMatrix.needsUpdate=chl.instanceMatrix.needsUpdate=ctl.instanceMatrix.needsUpdate=true};
const NP=280,peds=[],pm=new T.InstancedMesh(new T.BoxGeometry(.35,.9,.35),M(0xffffff),NP);pm.frustumCulled=false;sc.add(pm);
for(let n=0;n<NP;n++){const side=Math.random()<.5?1:-1;peds.push({ax:n%2,off:(Math.floor(rnd(-5,5))+.5)*P+side*2.85,dir:side,s:rnd(1.1,1.7),p:rnd(-68,68)});pm.setColorAt(n,new T.Color(pick([0xff6ad5,0x4dd2ff,0xffd166,0xffffff,0x6ee7b7,0xff8f70])))}
pm.instanceColor.needsUpdate=true;
const updPeds=()=>{peds.forEach((o,i)=>{D.rotation.set(0,0,0);D.scale.set(1,1,1);D.position.set(o.ax?o.off:o.p,.5+Math.abs(Math.sin(o.p*3))*.1,o.ax?o.p:o.off);D.updateMatrix();pm.setMatrixAt(i,D.matrix)});pm.instanceMatrix.needsUpdate=true};
const SG=[];ICS.forEach(cx=>ICS.forEach(cz=>{SG.push([cx-3.6,cz+2.9,0],[cx+2.9,cz-3.6,1])}));
const sgm=inst(new T.BoxGeometry(.5,1.7,.5),M(0xffffff),SG,(p,i,im)=>{D.position.set(p[0],.85,p[1]);im.setColorAt(i,new T.Color(0x2bff88))}),SC=[0x2bff88,0xffd166,0xff3355];let lastS=[-1,-1];
const updSig=tm=>{const q=[lightOf(0,tm),lightOf(1,tm)];if(q[0]==lastS[0]&&q[1]==lastS[1])return;lastS=q;SG.forEach((p,i)=>sgm.setColorAt(i,new T.Color(SC[q[p[2]]])));sgm.instanceColor.needsUpdate=true};
const stepTraffic=dt=>{cars.forEach(o=>{if(o.hw){o.u+=o.dir*o.s*dt;if(o.u>1)o.u-=1;if(o.u<0)o.u+=1;return}
const ls=lightOf(o.ax,t);let dist=99;if(ls!=0)for(const ic of ICS){const d=(ic-o.dir*3.4-o.p)*o.dir;if(d>-.3&&d<dist&&(ls==2||d>2.2))dist=d}
for(const q of o.lane){if(q===o)continue;const g=(q.p-o.p)*o.dir-2.4;if(g>-1.2&&g<dist)dist=Math.max(g,0)}
const vt=dist>30?o.vm:Math.min(o.vm,Math.sqrt(12*Math.max(0,dist-.3)));o.v+=Math.max(-14*dt,Math.min(3.5*dt,vt-o.v));if(o.v<0)o.v=0;o.p+=o.dir*o.v*dt;if(o.p>68)o.p=-68;if(o.p<-68)o.p=68});
peds.forEach(o=>{const ls=lightOf(1-o.ax,t);let hold=false;if(ls!=2)for(const ic of ICS){const d=(ic-o.p)*o.dir;if(d>2.9&&d<3.6){hold=true;break}}if(!hold){o.p+=o.dir*o.s*dt;if(o.p>68)o.p=-68;if(o.p<-68)o.p=68}});
updSig(t);updCars();updPeds()};
updSig(0);updCars();updPeds();
/* flying things, ships, beacons, fireworks */
const dr=[];for(let n=0;n<7;n++){const m=new T.Mesh(new T.SphereGeometry(.35,8,8),M(pick([0x4dd2ff,0xff6ad5,0xffd166])));sc.add(m);dr.push({m,r:rnd(10,45),a:rnd(0,6.28),s:rnd(.15,.4)*(Math.random()<.5?1:-1),y:rnd(14,30)})}
/* airport, helipads, helicopters, planes */
const rwM=M(0x151d3a),apM=M(0x1d2547),rl=[];
[-165,-195].forEach(x=>{flat(8,150,rwM,x,.06,2);flat(.5,140,M(0xffffff,{transparent:true,opacity:.7}),x,.08,2);for(let z=-72;z<=76;z+=6)rl.push([x-4.6,z],[x+4.6,z])});
inst(new T.BoxGeometry(.5,.3,.5),M(0xffd166),rl,q=>{D.position.set(q[0],.2,q[1])});
flat(36,80,apM,-140,.06,20);flat(40,5,apM,-148,.06,60);flat(30,5,apM,-180,.06,60);flat(20,5,apM,-150,.06,-20);
add(new T.Mesh(new T.BoxGeometry(10,6,70),M(0x3a4a80)),-116,3,20);[-8,16,40].forEach(z=>add(new T.Mesh(new T.BoxGeometry(26,4,6),M(0x4a5a99)),-135,2,z));
add(new T.Mesh(new T.CylinderGeometry(1.6,2,26,12),M(0x8a94b8)),-118,13,-28);add(new T.Mesh(new T.BoxGeometry(6,4,6),M(0x6fb5ff)),-118,28,-28);const twl=glow(-118,31,-28,8,'rgba(255,60,80,1)');
const aglow=glow(-116,5,20,24,'rgba(120,180,255,.7)');
const pads=B.filter(b=>b.box&&b.h>12).sort((a,b)=>b.h-a.h).slice(0,6).map(b=>({x:b.x,y:b.h+.3,z:b.z}));
pads.forEach(p=>{const m=new T.Mesh(new T.CircleGeometry(1.5,20),M(0x1b2447));m.rotation.x=-Math.PI/2;add(m,p.x,p.y-.2,p.z);const r=new T.Mesh(new T.RingGeometry(1.2,1.5,20),M(0xff6ad5));r.rotation.x=-Math.PI/2;add(r,p.x,p.y-.15,p.z)});
const hel=[];for(let n=0;n<Math.min(4,pads.length);n++){const g=new T.Group(),b=new T.Mesh(new T.SphereGeometry(.7,8,6),M(0xe8f0ff));b.scale.set(1.4,.8,.8);g.add(b);const tb=new T.Mesh(new T.BoxGeometry(1.6,.15,.15),M(0xe8f0ff));tb.position.x=-1.6;g.add(tb);const rot=new T.Mesh(new T.BoxGeometry(3.6,.05,.2),M(0xffffff));rot.position.y=.75;g.add(rot);const led=new T.Mesh(new T.SphereGeometry(.12,6,6),M(0xff3355));led.position.set(-2.3,.1,0);g.add(led);sc.add(g);hel.push({g,rot,led,a:n,b:(n+1)%pads.length,st:0,tm:rnd(0,5),dur:rnd(3,6)})}

const mkPlane=()=>{const g=new T.Group();g.add(new T.Mesh(new T.BoxGeometry(9,.9,.9),M(0xeaf0ff)));g.add(new T.Mesh(new T.BoxGeometry(1.6,.15,9),M(0xdde6ff)));const f=new T.Mesh(new T.BoxGeometry(1.4,1.6,.15),M(0xff6ad5));f.position.set(-4,.9,0);g.add(f);const l=new T.Mesh(new T.SphereGeometry(.3,6,6),M(0xff3355));l.position.set(0,.6,0);g.add(l);sc.add(g);return {g,l}};
const PL=[0,1,2,3,4].map(()=>mkPlane()),sm=u=>u*u*(3-2*u);
[4,28,52].forEach(z=>{const q=mkPlane();q.g.position.set(-150,.9,z)});


/* port, ships, boats */
const yd=[];for(let i=0;i<8;i++)for(let j=0;j<3;j++)yd.push([46+i*5,-68-j*2.2]);
inst(new T.BoxGeometry(4.2,2,2),M(0xffffff),yd,(p,i,im)=>{D.position.set(p[0],1.1,p[1]);im.setColorAt(i,new T.Color(pick([0xff4d6d,0x4dd2ff,0xffd166,0x6ee7b7,0xa78bfa])))});
for(let i=0;i<4;i++){add(new T.Mesh(new T.BoxGeometry(.8,12,.8),M(0xff6a3c)),48+i*10,6,-74);add(new T.Mesh(new T.BoxGeometry(.8,.8,9),M(0xff6a3c)),48+i*10,12,-77)}
const ships=[],mkShip=big=>{const g=new T.Group(),k=big?1:.35;g.add(new T.Mesh(new T.BoxGeometry(12*k,1.6*k,3*k),M(big?0x222a4a:0xdde6ff)));if(big)for(let c=0;c<3;c++){const q=new T.Mesh(new T.BoxGeometry(2.6,1.4,2.4),M(pick([0xff4d6d,0x4dd2ff,0xffd166,0x6ee7b7])));q.position.set(-3.5+c*3.2,1.5,0);g.add(q)}
const b=new T.Mesh(new T.BoxGeometry(2*k,2.6*k,2.6*k),M(0xdde6ff));b.position.set(5*k,2*k,0);g.add(b);const l=new T.Mesh(new T.SphereGeometry(big?.3:.4,6,6),M(big?0xffd166:0xff6ad5));l.position.set(5*k,big?3.6:1.8,0);g.add(l);return g};
for(let n=0;n<15;n++){const g=mkShip(true),ln=n%5,d=ln%2?-1:1,sx=-320+213*Math.floor(n/5)+ln*25;g.rotation.y=d>0?0:Math.PI;add(g,sx,.9,-95-ln*20);ships.push({g,d,s:2+ln*.3,x:sx})}
const mkCruise=()=>{const g=new T.Group(),W=M(0xf4f7ff);g.add(new T.Mesh(new T.BoxGeometry(30,2.6,6),W));const sp2=new T.Mesh(new T.BoxGeometry(30.2,.5,6.2),M(0xff4d6d));sp2.position.y=-.3;g.add(sp2);
[[18.5,4],[21.4,2.4]].forEach(q=>{const b=new T.Mesh(new T.BoxGeometry(q[0]>20?3:6,2.6,q[1]),W);b.position.x=q[0];g.add(b)});
for(let d=0;d<3;d++){const w=24-d*4,y=2.6+d*1.5,b=new T.Mesh(new T.BoxGeometry(w,1.5,5-d*.5),W);b.position.set(-1-d*.5,y,0);g.add(b);const s2=new T.Mesh(new T.BoxGeometry(w+.2,.35,5.2-d*.5),M(0xffe29a));s2.position.set(-1-d*.5,y,0);g.add(s2)}
const fn2=new T.Mesh(new T.CylinderGeometry(1.1,1.3,2.8,12),M(0xff8a3c));fn2.position.set(-3,7.6,0);g.add(fn2);const lt2=new T.Mesh(new T.SphereGeometry(.35,6,6),M(0xffd166));lt2.position.set(-1,6.4,0);g.add(lt2);return g};
[[-125,1,2.4,-200],[-165,-1,2,150]].forEach(q=>{const g=mkCruise();g.rotation.y=q[1]>0?0:Math.PI;add(g,q[3],1.3,q[0]);ships.push({g,d:q[1],s:q[2],x:q[3]})});
for(let n=0;n<6;n++){const g=mkShip(false),sx=rnd(-120,120);add(g,sx,.5,-82-n*6);ships.push({g,d:n%2?1:-1,s:rnd(7,11),x:sx,boat:1})}
add(mkShip(true),64,.9,-82);
const rg=[];B.slice().sort((a,b)=>b.h-a.h).slice(0,6).forEach((b,i)=>{const m=new T.Mesh(new T.RingGeometry(.8,1,32),new T.MeshBasicMaterial({color:0x4dd2ff,transparent:true,side:T.DoubleSide}));m.rotation.x=-Math.PI/2;add(m,b.x,b.h*1.2,b.z);rg.push({m,o:i*.5})});
const fn=90,fv=[];for(let i=0;i<fn;i++){const a=Math.random()*6.28,b=Math.acos(rnd(-1,1)),s=rnd(4,9);fv.push([Math.sin(b)*Math.cos(a)*s,Math.cos(b)*s,Math.sin(b)*Math.sin(a)*s])}
const fg=new T.BufferGeometry(),fpa=new Float32Array(fn*3);fg.setAttribute('position',new T.BufferAttribute(fpa,3));const fm=new T.PointsMaterial({size:1.6,transparent:true,depthWrite:false,blending:T.AdditiveBlending}),fp=new T.Points(fg,fm);fp.frustumCulled=false;sc.add(fp);let ft=99,fo=V(0,0,40);
/* bridges, big cable-stayed bridge, MRT/rail, river boats */
const brM=M(0x3a4060);for(let k=-5;k<=4;k++)add(new T.Mesh(new T.BoxGeometry(12,.2,7),brM),32,.03,(k+.5)*P);
const nearP=(cv,x)=>{let b=null,bd=1e9;for(let i=0;i<=400;i++){const q=cv.getPointAt(i/400),d=Math.abs(q.x-x);if(d<bd){bd=d;b=q}}return b};
let cab=[];[24.5,39.5].forEach(xp=>{const q=nearP(f2,xp);[-3.4,3.4].forEach(zz=>{const m=new T.Mesh(new T.BoxGeometry(1.2,26,1.2),M(0xf4f7ff));m.position.set(q.x,13,q.z+zz);sc.add(m)});const bm2=new T.Mesh(new T.BoxGeometry(1,1,8),M(0xf4f7ff));bm2.position.set(q.x,23.5,q.z);sc.add(bm2);
for(const s of[-1,1])for(let k=1;k<=6;k++){const w=nearP(f2,q.x+s*k*2.6);cab.push(q.x,26,q.z,w.x,8.1,w.z)}});
const cgm=new T.BufferGeometry();cgm.setAttribute('position',new T.Float32BufferAttribute(cab,3));sc.add(new T.LineSegments(cgm,new T.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.85})));
const trains=[];const mkTrain=col=>{const g=[];for(let k=0;k<4;k++){const c=new T.Group();c.add(new T.Mesh(new T.BoxGeometry(6,1.8,2.2),M(col)));const w=new T.Mesh(new T.BoxGeometry(5.6,.5,2.3),M(0xffe29a));w.position.y=.3;c.add(w);if(k==0){const hl2=new T.Mesh(new T.BoxGeometry(.2,.3,1.4),M(0xffffff));hl2.position.set(3.05,-.2,0);c.add(hl2)}sc.add(c);g.push(c)}return g};
const trStep=(o,dt)=>{if(o.dw>0){o.dw-=dt;o.v=0}else{let bi=-1,bd=1e9;o.st.forEach((s,i)=>{if(i==o.last)return;const d=(s-o.u)*o.dir;if(d>-1e-4&&d<bd){bd=d;bi=i}});
if(bi<0){o.u=o.st[0];o.last=0;o.dw=4}else{const dist=bd*o.len,vt=Math.min(o.vm,Math.sqrt(6*Math.max(0,dist)));o.v+=Math.max(-8*dt,Math.min(2.5*dt,vt-o.v));const step=o.v*dt;if(step>=dist-.02){o.u=o.st[bi];o.v=0;o.dw=4;o.last=bi}else o.u+=o.dir*step/o.len}}
o.cars.forEach((c,k)=>{const uk=Math.min(1,Math.max(0,o.u-o.dir*k*6.6/o.len)),q=o.cv.getPointAt(uk),tg=o.cv.getTangentAt(uk).multiplyScalar(o.dir);c.position.set(q.x,o.y+1,q.z);c.rotation.y=Math.atan2(-tg.z,tg.x)})};
[[mA,12,[.04,.3,.55,.78,.96],0xff8a3c,[[.3,1],[.78,1]]],[mB,15,[.04,.35,.62,.96],0x4dd2ff,[[.04,1],[.62,1]]],[mC,.1,[.04,.35,.65,.96],0xa78bfa,[[.04,1],[.65,1]]]].forEach(ln=>{const cv=ln[0],y=ln[1],len=cv.getLength();
ln[2].forEach(s=>{const q=cv.getPointAt(s),tg=cv.getTangentAt(s),ry=Math.atan2(-tg.z,tg.x),ox=q.x-tg.z*4.4,oz=q.z+tg.x*4.4;const pf=new T.Mesh(new T.BoxGeometry(18,.5,5),M(0x8a94b8));pf.position.set(ox,y+.25,oz);pf.rotation.y=ry;sc.add(pf);const cn=new T.Mesh(new T.BoxGeometry(18,.3,5.6),M(0x6b7aa8));cn.position.set(ox,y+3.6,oz);cn.rotation.y=ry;sc.add(cn)});
ln[4].forEach(q=>{const o={cv,y,len,st:ln[2],cars:mkTrain(ln[3]),u:q[0],dir:q[1],v:0,dw:2,last:ln[2].indexOf(q[0]),vm:14};trains.push(o);trStep(o,0)})});
const RL=r1.getLength(),rb=[];for(let n=0;n<8;n++){const g=mkShip(false);g.scale.setScalar(.9);sc.add(g);rb.push({g,u:.4+.55*(n+.5)/8,dir:n%2?1:-1,s:5,off:n%2?1.6:-1.6})}
const rbStep=dt=>rb.forEach(o=>{o.u+=o.dir*o.s/RL*dt;if(o.u>.97)o.u=.4;if(o.u<.4)o.u=.97;const q=r1.getPointAt(o.u),tg=r1.getTangentAt(o.u).multiplyScalar(o.dir);o.g.position.set(q.x-tg.z*o.off,.4,q.z+tg.x*o.off);o.g.rotation.y=Math.atan2(-tg.z,tg.x)});rbStep(0);
/* football stadium in the rice fields + green open space (RTH) */
const SX=-8,SZ=108,plaza2=M(0x2a3350),pitchM=M(0x1f7a4a),wl=M(0xffffff,{transparent:true,opacity:.8}),stM=M(0x3a4a80);
flat(78,64,plaza2,SX,.05,SZ);flat(56,36,pitchM,SX,.07,SZ);flat(.4,36,wl,SX,.08,SZ);[[56,.4,0,-18],[56,.4,0,18],[.4,36,-28,0],[.4,36,28,0]].forEach(q=>flat(q[0],q[1],wl,SX+q[2],.08,SZ+q[3]));
const cc2=new T.Mesh(new T.RingGeometry(4.2,4.6,32),wl);cc2.rotation.x=-Math.PI/2;add(cc2,SX,.09,SZ);
[[0,-26,64,6],[0,26,64,6],[-34,0,6,44],[34,0,6,44]].forEach(q=>add(new T.Mesh(new T.BoxGeometry(q[2],3,q[3]),stM),SX+q[0],1.5,SZ+q[1]));
const sp3=[];for(let r=0;r<3;r++){for(let x=-30;x<=30;x+=1.5)sp3.push([x,-(24+r*1.8)],[x,24+r*1.8]);for(let z=-20;z<=20;z+=1.5)sp3.push([-(32+r*1.1),z],[32+r*1.1,z])}
inst(new T.BoxGeometry(.8,.8,.8),M(0xffffff),sp3,(q,i,im)=>{D.position.set(SX+q[0],3.4,SZ+q[1]);im.setColorAt(i,new T.Color(pick([0xff4d6d,0x4dd2ff,0xffd166,0xffffff,0x6ee7b7,0xff8f70])))});
const lg2=[];[[-34,-27],[34,-27],[-34,27],[34,27]].forEach(q=>{add(new T.Mesh(new T.CylinderGeometry(.5,.7,20,8),M(0x8a94b8)),SX+q[0],10,SZ+q[1]);add(new T.Mesh(new T.BoxGeometry(4,2.4,.6),M(0xfff2b0)),SX+q[0],20.5,SZ+q[1]);lg2.push(glow(SX+q[0],20.5,SZ+q[1],18,'rgba(255,245,200,.9)'))});
const PLN=22,pj=[];[[1,0xff4d6d],[-1,0x4dd2ff]].forEach(a=>[[-26,0],[-14,-12],[-14,-4],[-14,4],[-14,12],[-4,-13],[-4,-5],[-4,5],[-4,13],[7,-6],[7,6]].forEach(q=>pj.push({bx:a[0]*q[0],bz:a[0]*q[1],c:a[1]})));
const pm2=new T.InstancedMesh(new T.BoxGeometry(.7,1.5,.7),M(0xffffff),PLN);pm2.frustumCulled=false;sc.add(pm2);pj.forEach((q,i)=>pm2.setColorAt(i,new T.Color(q.c)));pm2.instanceColor.needsUpdate=true;
const ball=new T.Mesh(new T.SphereGeometry(.5,8,8),M(0xffffff));sc.add(ball);let ba=0,bb=1,bt=0;
const pos0=(i,tm)=>[SX+pj[i].bx+Math.sin(tm*.7+i*1.7)*4,SZ+pj[i].bz+Math.cos(tm*.6+i*2.1)*3];
const stadStep=(tm,dt)=>{bt+=dt;if(bt>1.4){bt=0;ba=bb;bb=Math.floor(rnd(0,PLN))}const A=pos0(ba,tm),B=pos0(bb,tm),u=bt/1.4;ball.position.set(A[0]+(B[0]-A[0])*u,.5+Math.sin(u*Math.PI)*2,A[1]+(B[1]-A[1])*u);
pj.forEach((q,i)=>{const c=pos0(i,tm);D.rotation.set(0,0,0);D.scale.set(1,1,1);D.position.set(c[0]+(ball.position.x-c[0])*.1,.9,c[1]+(ball.position.z-c[1])*.1);D.updateMatrix();pm2.setMatrixAt(i,D.matrix)});pm2.instanceMatrix.needsUpdate=true};stadStep(0,0);
const PK=[[16,16],[-16,-32],[16,-48],[-48,16]],parkM=M(0x1f7a3a),pondM=M(0x2b8fd6),pathM=M(0xc9b79c),pkN=[0x14532d,0x1b6b3a,0x0f3d2a],pkD=[0x2e7d32,0x4caf50,0x66bb6a],pt=[];
PK.forEach(c=>{flat(11,11,parkM,c[0],.05,c[1]);flat(11,.8,pathM,c[0],.06,c[1]);flat(.8,11,pathM,c[0],.06,c[1]);const pd=new T.Mesh(new T.CircleGeometry(2.2,20),pondM);pd.rotation.x=-Math.PI/2;add(pd,c[0],.08,c[1]);for(let i=0;i<16;i++){const a=rnd(0,6.28),r=rnd(3.6,5.2);pt.push([c[0]+Math.cos(a)*r,c[1]+Math.sin(a)*r,rnd(.7,1.1)])}});
const pkT=inst(new T.ConeGeometry(1,3.2,6),M(0xffffff),pt,(q,i,im)=>{D.position.set(q[0],1.6*q[2],q[1]);D.scale.set(q[2],q[2],q[2]);im.setColorAt(i,new T.Color(pick(pkN)))});
const jg=[];PK.forEach(c=>{for(let k=0;k<4;k++)jg.push({c,a:k*1.6,r:3+(k%2)*1.2,s:k%2?.35:-.45})});
const jm=new T.InstancedMesh(new T.BoxGeometry(.35,.9,.35),M(0xffffff),jg.length);jm.frustumCulled=false;sc.add(jm);jg.forEach((q,i)=>jm.setColorAt(i,new T.Color(pick([0xff6ad5,0x4dd2ff,0xffd166,0xffffff,0x6ee7b7]))));jm.instanceColor.needsUpdate=true;
const parkStep=tm=>{jg.forEach((q,i)=>{const a=q.a+q.s*tm;D.rotation.set(0,0,0);D.scale.set(1,1,1);D.position.set(q.c[0]+Math.cos(a)*q.r,.5,q.c[1]+Math.sin(a)*q.r);D.updateMatrix();jm.setMatrixAt(i,D.matrix)});jm.instanceMatrix.needsUpdate=true};parkStep(0);
/* rocket launch site near the mountains */
const RX=-165,RZ=165;flat(26,26,M(0x6b7280),RX,.08,RZ);
const rk=new T.Group();rk.add(new T.Mesh(new T.CylinderGeometry(1.2,1.2,12,16),M(0xf4f7ff)));const rn=new T.Mesh(new T.ConeGeometry(1.2,3.5,16),M(0xff4d6d));rn.position.y=7.75;rk.add(rn);
[-3,1.5].forEach(y=>{const b=new T.Mesh(new T.CylinderGeometry(1.22,1.22,1.2,16),M(0xff8a3c));b.position.y=y;rk.add(b)});
for(let i=0;i<4;i++){const f=new T.Mesh(new T.BoxGeometry(.2,2.6,1.6),M(0xff4d6d)),a=i*Math.PI/2;f.position.set(Math.cos(a)*1.6,-4.7,Math.sin(a)*1.6);f.rotation.y=-a;rk.add(f)}
const fl=new T.Mesh(new T.ConeGeometry(1.1,6,12),M(0xffa43c,{transparent:true,opacity:.9,blending:T.AdditiveBlending}));fl.rotation.x=Math.PI;fl.position.y=-9;rk.add(fl);rk.scale.setScalar(2);sc.add(rk);
const tw=new T.Group();[-3.6,3.6].forEach(x=>{const c=new T.Mesh(new T.BoxGeometry(.8,28,.8),M(0x8a94b8));c.position.set(x,14,0);tw.add(c)});for(let i=0;i<6;i++){const b=new T.Mesh(new T.BoxGeometry(7.2,.4,.4),M(0x8a94b8));b.position.set(0,3+i*4.5,0);tw.add(b)}
const arm=new T.Mesh(new T.BoxGeometry(6,.6,.6),M(0xff8a3c));arm.position.set(2.5,18,0);tw.add(arm);tw.position.set(RX-5,0,RZ);sc.add(tw);
const bl=glow(RX-5,29,RZ,6,'rgba(255,60,80,1)'),fg2=glow(RX,12,RZ,40,'rgba(255,170,80,.95)');
const SMK=[],smT=gtex('rgba(235,235,245,.9)');for(let i=0;i<70;i++){const s=new T.Sprite(new T.SpriteMaterial({map:smT,transparent:true,depthWrite:false,opacity:0}));s.visible=false;sc.add(s);SMK.push({s,l:9})}
let smi=0,smt=0;const puff=(x,y,z)=>{const o=SMK[smi++%SMK.length];o.l=0;o.s.visible=true;o.s.position.set(x+rnd(-2,2),y,z+rnd(-2,2))};
const rkStep=(tm,dt)=>{const ph=tm%36;let y=0,dx=0,fire=0;
if(ph>=12&&ph<15)fire=.6+.4*(ph-12)/3;else if(ph>=15&&ph<27){const u=ph-15;y=1.6*u*u;dx=.18*u*u;fire=1}
rk.position.set(RX+dx,12.5+y,RZ);rk.rotation.z=dx?-Math.atan2(dx,y+1):0;rk.visible=ph<27;
fl.visible=fire>0;fl.scale.set(1,Math.max(.01,fire*(.85+.3*Math.random())),1);fg2.visible=fire>0;fg2.position.set(RX+dx,y+3,RZ);fg2.material.opacity=Math.min(1,fire);
smt+=dt;if(fire>0&&smt>.05){smt=0;puff(RX+dx,y+1,RZ);if(ph<20)puff(RX+rnd(-6,6),1.5,RZ+rnd(-6,6))}
SMK.forEach(o=>{if(o.l<9){o.l+=dt;o.s.scale.setScalar(6+o.l*10);o.s.material.opacity=Math.max(0,.85-o.l/4.5)*.9;o.s.position.y+=2.2*dt;if(o.l>=4.5){o.s.visible=false;o.l=9}}});
bl.visible=ph<12&&Math.sin(tm*5)>0};rkStep(0,0);
/* forest behind the rice fields and on the mountain slopes */
const gY=(x,z)=>{let y=0;MTL.forEach(m=>{const d=Math.hypot(x-m[0],z-m[1]);if(d<m[2])y=Math.max(y,Math.min(m[3],m[3]*(m[2]-d)/(m[2]*.94)))});return y};
const floorM=M(0x0b2a1e);flat(1000,215,floorM,0,.04,284);flat(260,285,floorM,330,.04,66);flat(250,285,floorM,-330,.04,66);
const FN=[0x0f3d2a,0x14532d,0x1b6b3a,0x0d4a30],FD=[0x2e7d32,0x388e3c,0x1b5e20,0x4caf50],trs=[];
for(let i=0;i<40000&&trs.length<8500;i++){const x=rnd(-450,450),z=rnd(178,390);if(nearR(x,z,4)||Math.hypot(x-RX,z-RZ)<16)continue;const gy=gY(x,z);if(gy>75)continue;trs.push([x,z,gy,rnd(.8,1.7)])}
for(let i=0;i<30000&&trs.length<15500;i++){const x=Math.random()<.5?rnd(200,450):rnd(-450,-205),z=rnd(-68,200);if(nearR(x,z)||Math.hypot(x-RX,z-RZ)<16)continue;trs.push([x,z,0,rnd(.8,1.7)])}
const forest=inst(new T.ConeGeometry(1.5,5,6),M(0xffffff),trs,(p,i,im)=>{D.position.set(p[0],p[2]+p[3]*2.4,p[1]);D.scale.set(p[3],p[3],p[3]);im.setColorAt(i,new T.Color(pick(FN)))});
/* ===== route engine: aircraft + helicopters (waypoint following, smooth steering, clearance map) ===== */
const wrapA=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a},cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const HC=10,HM=new Map(),hk=(i,j)=>i*4000+j;
const hmark=(x,z,h,r)=>{for(let i=Math.floor((x-r)/HC);i<=Math.floor((x+r)/HC);i++)for(let j=Math.floor((z-r)/HC);j<=Math.floor((z+r)/HC);j++){const k=hk(i,j);if((HM.get(k)||0)<h)HM.set(k,h)}};
B.forEach(b=>hmark(b.x,b.z,b.h*1.2+2,3.2));
[[hw,4],[f2,8],[f3,4],[mA,12],[mB,15]].forEach(c=>{for(let i=0;i<=300;i++){const q=c[0].getPointAt(i/300);hmark(q.x,q.z,c[1]+4,3)}});
hmark(0,0,32,6);hmark(-11,-5,21,2);hmark(-118,-28,32,4);hmark(RX-5,RZ,31,5);hmark(RX,RZ,30,3);hmark(24.5,-24,27,3);hmark(39.5,-24,27,3);
[[-34,-27],[34,-27],[-34,27],[34,27]].forEach(q=>hmark(SX+q[0],SZ+q[1],22,2));for(let i=0;i<4;i++)hmark(48+i*10,-75,14,4);
const hAt=(x,z)=>{const i=Math.floor(x/HC),j=Math.floor(z/HC);let m=0;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const v=HM.get(hk(i+a,j+b));if(v>m)m=v}return Math.max(m,gY(x,z))};
/* ---- airplanes: each has its own route, speed, altitude layer ---- */
const AIR=PL.map((o,i)=>({g:o.g,l:o.l,x:0,y:60,z:0,hd:0,v:30,vt:30,bk:0,pt:0,wps:[],mode:'cruise',layer:[58,70,82,94,106][i],ap:i<2,tm:0,grounded:false,acc:6,minV:0,cruise:true,sepY:0,leg:0,pend:0,av:0})),RWB={land:0,off:0};
const clearLine=(x0,z0,x1,z1)=>{for(let i=1;i<=14;i++){const u=i/14;if(gY(x0+(x1-x0)*u,z0+(z1-z0)*u)>20)return false}return true};
const planWp=(o,fx,fz)=>{let x=0,z=0;for(let k=0;k<30;k++){if(Math.random()<.6){x=rnd(-95,95);z=rnd(-95,95)}else{x=rnd(-380,380);z=rnd(-330,330)}if(Math.hypot(x-fx,z-fz)>130&&gY(x,z)<20&&gY(x+70,z)<20&&gY(x-70,z)<20&&gY(x,z+70)<20&&gY(x,z-70)<20&&clearLine(fx,fz,x,z))break}
if(Math.random()<.14){const a=rnd(Math.PI*1.05,Math.PI*1.95)+(Math.random()<.4?Math.PI*.9:0);x=Math.cos(a)*540;z=Math.min(110,Math.sin(a)*470)}return{x,z,y:Math.max(o.layer+rnd(-5,5),gY(x,z)+32),v:rnd(26,42),r:30}};
const newCruise=o=>{o.mode='cruise';o.cruise=true;o.acc=6;o.minV=0;o.grounded=false;o.leg++;
if(o.ap&&!RWB.land&&o.leg>1&&Math.random()<.3){RWB.land=1;o.pend=1;o.wps=[{x:-165+rnd(-100,100),y:72,z:rnd(-480,-390),v:36,r:35}];return}
if(Math.abs(o.x)>430||Math.abs(o.z)>380)o.wps=[{x:rnd(-140,140),z:rnd(-110,110),y:o.layer,v:34,r:40}];else{const a=planWp(o,o.x,o.z),b=planWp(o,a.x,a.z);o.wps=[a,b]}};
const startApproach=o=>{o.mode='approach';o.cruise=false;o.acc=6;o.wps=[]};
const startTakeoff=o=>{if(RWB.off){o.tm=2;return}RWB.off=1;o.mode='takeoff';o.g.visible=true;o.x=-195;o.z=68;o.y=.9;o.hd=Math.PI/2;o.v=0;o.bk=0;o.pt=0;o.grounded=true;o.acc=20;o.minV=40;o.cruise=false;
o.wps=[{x:-195,y:8,z:-38,v:62,r:10},{x:-195,y:56,z:-230,v:50,r:30},{x:-195+rnd(-60,60),y:o.layer,z:-470,v:44,r:40}]};
const fly=(o,w,dt)=>{let gA=0;if(o.cruise){const cx=Math.cos(o.hd),cz=-Math.sin(o.hd);for(const k of[0,3,6,10])gA=Math.max(gA,gY(o.x+cx*o.v*k,o.z+cz*o.v*k));if(gA>20&&gA+28>o.y+6){if(!o.av){let best=1e9,m0=MTL[0];MTL.forEach(m=>{const dd=Math.hypot(m[0]-o.x,m[1]-o.z)-m[2];if(dd<best){best=dd;m0=m}});o.av=(cx*(m0[1]-o.z)-cz*(m0[0]-o.x))>=0?1:-1}}else o.av=0}else o.av=0;
const dx=w.x-o.x,dz=w.z-o.z,d=Math.hypot(dx,dz),dh=o.av?o.av*1.2:wrapA(Math.atan2(-dz,dx)-o.hd),tr=o.grounded?0:.34;
o.hd=wrapA(o.hd+cl(dh,-tr*dt,tr*dt));o.bk+=((o.grounded?0:cl(dh*1.4,-.5,.5))-o.bk)*Math.min(1,dt*3);
if(w.v!==undefined)o.vt=w.v;o.v+=cl(o.vt-o.v,-o.acc*dt,o.acc*dt);
const fx=Math.cos(o.hd),fz=-Math.sin(o.hd);let ty=w.y+o.sepY;
if(o.cruise)ty=Math.max(ty,gA+28);
let vy=o.grounded?(.9-o.y)*.5:cl((ty-o.y)*.5,-7,9);if(o.v<o.minV)vy=Math.min(vy,0);if(o.cruise&&o.y<Math.max(gY(o.x,o.z),gY(o.x+fx*o.v*1.5,o.z+fz*o.v*1.5))+14)vy=Math.max(vy,24);
o.y=Math.max(.9,o.y+vy*dt);o.x+=fx*o.v*dt;o.z+=fz*o.v*dt;o.pt+=(Math.atan2(vy,Math.max(o.v,8))-o.pt)*Math.min(1,dt*3);
o.g.position.set(o.x,o.y,o.z);o.g.rotation.set(-o.bk,o.hd,o.pt);return d};
const planeStep=(o,dt,t)=>{o.l.visible=Math.sin(t*6+o.layer)>0;
if(o.mode=='taxi'){o.tm-=dt;if(o.tm<=0)startTakeoff(o);return}
if(o.mode=='cruise'){let up=0;AIR.forEach(q=>{if(q!==o&&q.g.visible&&Math.hypot(q.x-o.x,q.z-o.z)<45&&Math.abs(q.y-o.y)<14&&q.y<=o.y)up=14});o.sepY+=(up-o.sepY)*Math.min(1,dt*1.2)}else o.sepY=0;
let w=o.wps[0];
if(o.mode=='approach'){const u=cl((o.z+330)/264,0,1);w={x:-165,y:o.z<-330?56+Math.min(16,(-330-o.z)*.05):56*(1-u)+1.5*u,z:o.z+150,v:32-11*u}}
const d=fly(o,w,dt);
if(o.mode=='cruise'){if(d<Math.max(w.r||30,o.v*2.6)){o.wps.shift();if(!o.wps.length){if(o.pend){o.pend=0;startApproach(o)}else newCruise(o)}}}
else if(o.mode=='approach'){if(o.z>-70){o.mode='roll';o.grounded=true;o.wps=[{x:-165,y:.9,z:-4,v:0,r:5}];o.acc=7}}
else if(o.mode=='roll'){if(o.v<2){o.mode='taxi';o.tm=rnd(6,12);RWB.land=0;o.g.visible=false}}
else if(o.mode=='takeoff'){if(o.grounded&&o.v>=40)o.grounded=false;if(d<(w.r||28)){o.wps.shift();if(!o.wps.length){RWB.off=0;newCruise(o)}}}};
/* ---- helicopters: climb, transit (open areas or above the city), hover, descend, land, dwell, repeat ---- */
const HEL=hel.map((o,i)=>({g:o.g,rot:o.rot,led:o.led,i,pad:i,x:pads[i].x,y:pads[i].y,z:pads[i].z,vx:0,vy:0,vz:0,hd:rnd(-3,3),pt:0,bk:0,rs:0,st:'idle',tm:rnd(1,7),ph:rnd(0,6),route:[],hovT:0})),padBusy=pads.map(()=>-1);
HEL.forEach(h=>{h.g.rotation.order='YXZ';padBusy[h.pad]=h.i});
const openPt=()=>{for(let k=0;k<40;k++){const x=rnd(-190,190),z=rnd(-70,135);if(hAt(x,z)<6)return[x,z]}return[rnd(-190,190),rnd(100,135)]};
const planHeli=h=>{const route=[],n=1+Math.floor(Math.random()*3);
for(let k=0;k<n;k++){const op=Math.random()<.5,q=op?openPt():[rnd(-70,70),rnd(-70,70)];route.push({x:q[0],z:q[1],alt:Math.max(op?rnd(14,24):rnd(28,44),hAt(q[0],q[1])+11),hov:Math.random()<.5?rnd(5,11):0})}
const free=pads.map((p,i)=>i).filter(i=>padBusy[i]<0),pi=free.length?pick(free):h.pad;padBusy[pi]=h.i;route.push({land:pi});h.route=route};
const heliStep=(h,dt)=>{h.ph+=dt;h.led.visible=Math.sin(h.ph*8+h.i)>0;h.rs+=((h.st=='idle'?0:34)-h.rs)*Math.min(1,dt*1.2);h.rot.rotation.y+=h.rs*dt;
if(h.st=='idle'){h.tm-=dt;h.vx=h.vy=h.vz=0;if(h.tm<=0){planHeli(h);padBusy[h.pad]=-1;h.st='rise'}h.g.position.set(h.x,h.y,h.z);h.g.rotation.set(0,h.hd,0);return}
if(!h.route.length)planHeli(h);
const c=h.route[0];let tx=h.x,tz=h.z,ty=h.y,vmax=14,land=false,pad=null;
if(h.st=='rise'){ty=hAt(h.x,h.z)+11;if(h.y>ty-1.5)h.st='fly'}
else if(c.land!==undefined){pad=pads[c.land];tx=pad.x;tz=pad.z;land=true;vmax=12}
else{tx=c.x;tz=c.z;ty=c.alt;if(h.st=='hover'){tx+=Math.sin(h.ph*.6)*1.4;tz+=Math.cos(h.ph*.5)*1.1;ty+=Math.sin(h.ph*.9)*.5}}
const dx=tx-h.x,dz=tz-h.z,d=Math.hypot(dx,dz)||1;let sp=h.st=='rise'?0:Math.min(vmax,1+d*.6);
if(land)ty=pad.y+Math.min(14,Math.max(0,(d-3)*2));
if(h.st!='rise'&&!(land&&d<8)){let need=Math.max(14,hAt(h.x,h.z)+11);for(const L of[10,24,40]){const k=Math.min(L,d);need=Math.max(need,hAt(h.x+dx/d*k,h.z+dz/d*k)+11)}if(!land||d>12)ty=Math.max(ty,need);const def=need-h.y;if(def>0)sp*=Math.max(0,1-def/10)}
if(land&&d<.6&&h.y<pad.y+.4){h.st='idle';h.pad=c.land;h.x=pad.x;h.z=pad.z;h.y=pad.y;h.route=[];h.tm=rnd(5,12);h.vx=h.vy=h.vz=0;padBusy[h.pad]=h.i;return}
h.vx+=cl(dx/d*sp-h.vx,-5*dt,5*dt);h.vz+=cl(dz/d*sp-h.vz,-5*dt,5*dt);h.vy+=cl(cl((ty-h.y)*.8,-3.5,4.5)-h.vy,-4*dt,4*dt);
h.x+=h.vx*dt;h.y+=h.vy*dt;h.z+=h.vz*dt;
const spd=Math.hypot(h.vx,h.vz);
if(h.st=='fly'&&!land&&d<2.5&&spd<3&&Math.abs(h.y-ty)<2){if(c.hov>0){h.st='hover';h.hovT=c.hov}else h.route.shift()}
else if(h.st=='hover'){h.hovT-=dt;if(h.hovT<=0){h.st='fly';h.route.shift()}}
let tyaw=h.hd;if(spd>1.5)tyaw=Math.atan2(-h.vz,h.vx);else if(h.st=='hover')tyaw=h.hd+Math.sin(h.ph*.7)*.02;
const dh=wrapA(tyaw-h.hd);h.hd=wrapA(h.hd+cl(dh,-1.1*dt,1.1*dt));h.bk+=(cl(dh*.5,-.3,.3)-h.bk)*Math.min(1,dt*3);h.pt+=(cl(-.025*spd,-.3,0)-h.pt)*Math.min(1,dt*2.5);
h.g.position.set(h.x,h.y,h.z);h.g.rotation.set(-h.bk,h.hd,h.pt)};
AIR.forEach(o=>{o.g.rotation.order='YXZ';o.x=rnd(-220,220);o.z=rnd(-160,100);o.y=o.layer;o.hd=rnd(-3,3);o.v=o.vt=32;newCruise(o);o.leg=0});
const airStep=(dt,t)=>{AIR.forEach(o=>planeStep(o,dt,t));HEL.forEach(h=>heliStep(h,dt))};airStep(.001,0);

/* sky objects + day/night */
const sprMat=c0=>new T.SpriteMaterial({map:gtex(c0),transparent:true,depthWrite:false,fog:false});
const sun=new T.Sprite(sprMat('rgba(255,244,190,1)'));sun.scale.set(170,170,1);add(sun,-650,95,60);const moon=new T.Sprite(sprMat('rgba(225,235,255,.95)'));moon.scale.set(60,60,1);add(moon,-650,95,60);
const ct=(()=>{const c=document.createElement('canvas');c.width=128;c.height=64;const x=c.getContext('2d');x.fillStyle='rgba(255,255,255,.92)';[[30,38,18],[52,30,24],[76,32,22],[98,40,16],[64,42,22]].forEach(q=>{x.beginPath();x.arc(q[0],q[1],q[2],0,6.3);x.fill()});return new T.CanvasTexture(c)})();
const clouds=[];for(let i=0;i<9;i++){const c=new T.Sprite(new T.SpriteMaterial({map:ct,transparent:true,depthWrite:false,fog:false,opacity:.9}));c.scale.set(rnd(60,100),rnd(28,44),1);add(c,rnd(-450,450),rnd(60,110),rnd(-150,300));clouds.push(c)}
const stp=[];for(let i=0;i<350;i++){const a=rnd(0,6.28),e=rnd(.1,1.1);stp.push(Math.cos(a)*Math.cos(e)*1000,Math.sin(e)*1000,Math.sin(a)*Math.cos(e)*1000)}
const stg=new T.BufferGeometry();stg.setAttribute('position',new T.Float32BufferAttribute(stp,3));const stars=new T.Points(stg,new T.PointsMaterial({color:0xffffff,size:2,fog:false,transparent:true,opacity:.8,sizeAttenuation:false}));stars.frustumCulled=false;sc.add(stars);
const fcD=[0x7bc043,0x5aa832,0x9ad24a,0xb6d94c,0x6bbf59];
const setMode=day=>{sc.fog.color.setHex(day?0xbfe0ff:0x0a0f2c);sc.fog.density=day?.0016:.0022;
amb.color.setHex(day?0xffffff:0x8899cc);amb.intensity=day?1.05:.8;dl.color.setHex(day?0xfff1d0:0xbbd4ff);dl.intensity=day?1.15:.9;
landM.color.setHex(day?0x6f8f4a:0x0a1228);beachM.color.setHex(day?0xe8d9a8:0x3a4a68);plazaM.color.setHex(day?0x3f9b4a:0x14532d);brM.color.setHex(day?0x9aa3b5:0x3a4060);mrM.color.setHex(day?0x8b94a8:0x2a3566);rlM.color.setHex(day?0x6b7280:0x4b5563);rwM.color.setHex(day?0x4a4f5a:0x151d3a);apM.color.setHex(day?0x6b7280:0x1d2547);plaza2.color.setHex(day?0x9aa3b5:0x2a3350);pitchM.color.setHex(day?0x4cb35a:0x1f7a4a);parkM.color.setHex(day?0x4caf50:0x1f7a3a);pondM.color.setHex(day?0x39a6e8:0x2b8fd6);stM.color.setHex(day?0x9aa3c8:0x3a4a80);lg2.forEach(g=>g.visible=!day);twl.visible=!day;pt.forEach((q,i)=>pkT.setColorAt(i,new T.Color(pick(day?pkD:pkN))));pkT.instanceColor.needsUpdate=true;
sea.material.color.setHex(day?0x1ea0d8:0x0b3a6b);sea.material.specular.setHex(day?0xffffff:0x7fb2ff);
rm.color.setHex(day?0x50555f:0x121a3d);lm.color.setHex(day?0xffffff:0x3b82f6);lm.opacity=day?.85:.55;wm.color.setHex(day?0x39a6e8:0x2b8fd6);hwM.color.setHex(day?0x6b7280:0x1b2447);hwL.color.setHex(day?0xffe08a:0x4dd2ff);
bm.forEach(m=>{m.map=day?m.userData.dm:null;m.color.setHex(day?0xffffff:0x2b3f86);m.emissiveIntensity=day?0:.85;m.opacity=day?.97:.72;m.metalness=day?.12:.5;m.roughness=day?.45:.25;m.needsUpdate=true});be.forEach(m=>{m.color.setHex(day?0x7f9cc0:m.userData.n);m.opacity=day?.5:.55});
cells.forEach((c,i)=>rice.setColorAt(i,new T.Color(pick(day?fcD:fc))));rice.instanceColor.needsUpdate=true;
lo.forEach((p,i)=>loM.setColorAt(i,new T.Color(pick(day?[0xe3ddd0,0xcdb89a,0xe8c9a0,0xbac6d8]:[0x7f93c9,0xb9a58a,0xffc58a,0x9aa6c4]))));loM.instanceColor.needsUpdate=true;
trs.forEach((p,i)=>forest.setColorAt(i,new T.Color(pick(day?FD:FN))));forest.instanceColor.needsUpdate=true;floorM.color.setHex(day?0x2f6b3a:0x0b2a1e);
MT.forEach(m=>{const a=m.g.attributes.color,c=new T.Color();m.ys.forEach((y,i)=>{if(day)c.setHSL(.3-.12*y,.42,.3+.28*y);else c.setHSL(.38+.22*y,.45,.1+.2*y);a.setXYZ(i,c.r,c.g,c.b)});a.needsUpdate=true});
flame.visible=volc.visible=fp.visible=stars.visible=moon.visible=aglow.visible=!day;rg.forEach(o=>o.m.visible=!day);sun.visible=day;clouds.forEach(c=>c.visible=day)};
window.cityMode=setMode;setMode(false);
/* camera + loop */
let CAMZ=1,CAMZt=1,CAME=0,CAMEt=0,CAMA=0,CAMAt=0;
window.cityCam={zoom:k=>{CAMZt=cl(CAMZt*k,.4,2.4)},tilt:d=>{CAMEt=cl(CAMEt+d,-.6,.9)},pan:d=>{CAMAt+=d},reset:()=>{CAMZt=1;CAMEt=0;CAMAt=0}};
let mx=0,my=0;addEventListener('mousemove',e=>{if(document.body.classList.contains('modal-open'))return;mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
const rs=()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};rs();addEventListener('resize',rs);
let last=performance.now();let fk=0;const lp=now=>{requestAnimationFrame(lp);if(document.hidden||HOLD)return;if(L.classList.contains('off')&&(fk^=1))return;const dt=Math.min((now-last)/1000,.05);last=now;
if(!RM){t+=dt;rkStep(t,dt);trains.forEach(o=>trStep(o,dt));rbStep(dt);stadStep(t,dt);parkStep(t);clouds.forEach(c=>{c.position.x+=3*dt;if(c.position.x>450)c.position.x=-450});
for(let i=0;i<sp.count;i++)sp.setZ(i,Math.sin(sp.getX(i)*.04+t*.9)*.5+Math.cos(sp.getY(i)*.05+t*.7)*.4);sp.needsUpdate=true;
stepTraffic(dt);
dr.forEach(o=>{o.a+=o.s*dt;o.m.position.set(Math.cos(o.a)*o.r,o.y+Math.sin(t*2+o.r)*1.5,Math.sin(o.a)*o.r)});
airStep(dt,t);
ships.forEach(o=>{o.x+=o.d*o.s*dt;if(o.boat){if(o.x>170){o.x=170;o.d=-1}if(o.x<-170){o.x=-170;o.d=1}o.g.rotation.y=o.d>0?0:Math.PI}else{if(o.x>320)o.x=-320;if(o.x<-320)o.x=320}o.g.position.x=o.x});
rg.forEach(o=>{const s=((t+o.o)%2)/2;o.m.scale.setScalar(1+s*8);o.m.material.opacity=1-s});
ft+=dt;if(ft>3.4){ft=0;fo=V(rnd(-25,25),rnd(-25,25),rnd(34,50));fm.color.setHex(pick([0xffd166,0xff6ad5,0x4dd2ff,0x6ee7b7]))}
for(let i=0;i<fn;i++){fpa[i*3]=fo.x+fv[i][0]*ft;fpa[i*3+1]=fo.y+fv[i][1]*ft-2.5*ft*ft;fpa[i*3+2]=fo.z+fv[i][2]*ft}fg.attributes.position.needsUpdate=true;fm.opacity=Math.max(0,1-ft/2.6)}
const f=Math.sin(t*.05)*.5,cx0=-10,cy0=7,cz0=36,ox=Math.cos(f)*100,oy=25-my*6,oz=-8+Math.sin(f)*70+mx*10,kd=Math.min(1,dt*5);
CAMZ+=(CAMZt-CAMZ)*kd;CAME+=(CAMEt-CAME)*kd;CAMA+=(CAMAt-CAMA)*kd;
const r0=Math.hypot(ox,oy,oz),az=Math.atan2(oz,ox)+CAMA,el=cl(Math.asin(oy/r0)+CAME,.05,1.35),rr=r0*CAMZ;
cam.position.set(cx0+rr*Math.cos(el)*Math.cos(az),Math.max(2,cy0+rr*Math.sin(el)),cz0+rr*Math.cos(el)*Math.sin(az));cam.lookAt(cx0,cy0,cz0);R.render(sc,cam)};requestAnimationFrame(lp)})()}catch(e){console.warn('3D city unavailable',e)}};
/* Three.js: the <script> in index.html normally provides it; if that CDN failed, try the backups */
const THREE_URLS=['https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js','https://unpkg.com/three@0.128.0/build/three.min.js'];
const loadThree=i=>{
  if(typeof THREE!=='undefined')return build();
  if(i>=THREE_URLS.length){console.warn('Three.js could not be loaded; showing the CSS scene');return}
  const sc=document.createElement('script');sc.src=THREE_URLS[i];sc.onload=()=>loadThree(i+1);sc.onerror=()=>loadThree(i+1);document.head.appendChild(sc)
};
loadThree(0);
});
