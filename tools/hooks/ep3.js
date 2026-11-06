try{localStorage.setItem('kaveret_ev50','1');localStorage.setItem('kaveret_ev100','1')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;MET.since=-100;treasure.visible=false;
try{capEl.style.display="none"}catch(e){}
try{flowers.forEach(f=>f.visible=false);petals.visible=false}catch(e){}
const css=document.createElement('style');css.textContent='@keyframes pop{0%{transform:scale(.4);opacity:0}55%{transform:scale(1.18);opacity:1}100%{transform:scale(1)}}.pop{animation:pop .28s ease-out both}@keyframes blink{50%{opacity:.35}}.blink{animation:blink .8s infinite}';document.head.appendChild(css);
const mk=(z,s)=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;z-index:'+z+';text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 22px rgba(0,0,0,.85);padding:0 18px;'+s;document.body.appendChild(d);return d};
const T=mk(9,'top:11%'),M=mk(9,'top:36%'),B=mk(9,'bottom:10%');
mk(4,'inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,8,30,.75) 0%,rgba(10,8,30,0) 30%,rgba(10,8,30,0) 62%,rgba(10,8,30,.88) 100%)');
const dark=mk(6,'inset:0;pointer-events:none;background:#000;opacity:1');
const red=mk(5,'inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(255,0,40,0) 35%,rgba(200,0,30,.6) 100%);opacity:0');
const fl=mk(8,'inset:0;pointer-events:none;background:#fff;opacity:0');
const Y=s=>`<span style="color:#FFC24B">${s}</span>`,V=s=>`<span style="color:#B9A8FF">${s}</span>`,R=s=>`<span style="color:#FF4B5C">${s}</span>`;
const big=(s,sz)=>`<div style="font:900 ${sz||60}px/1.12 Heebo">${s}</div>`;
const panel=s=>`<div style="display:inline-block;background:rgba(20,14,40,.66);border-radius:26px;padding:10px 24px">${s}</div>`;
const live=`<span class="blink" style="display:inline-block;background:#E5484D;color:#fff;font:900 30px Heebo;padding:8px 22px;border-radius:999px;text-shadow:none">🔴 LIVE</span>`;
const chip=h=>`<div style="display:inline-block;background:rgba(26,17,8,.8);border:4px solid #FFC24B;border-radius:26px;padding:14px 30px;font:900 56px Heebo" dir="ltr">@${h}</div>`;

// reel 7.11 « פרק 3 » CROSSOVER « L'ENVELOPPE » — minutage mot à mot (voix_ep3.mp3, 28.2 s) ; générique 5.11 ; fin commune 22.9→29.4
const HITS=[0.21,2.16,3.44,4.59,5.88,6.84,8.19,9.08,10.04,11.52,12.4,14.48,15.12,17.96,18.96,20.24,21.56,22.16,23.25,24.72,25.5,26.16];
const BIG=new Set([2.16,18.96,22.16,23.25]);
const cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,8,0);let last='';
const bw=new THREE.Vector3(),fwd=new THREE.Vector3(-0.81,0,-0.59),side=new THREE.Vector3(0.59,0,-0.81);
const B0=new THREE.Vector3(4,-5.6,-2);
function atBear(R,Yy,sd,k,ly){BEAR.getWorldPosition(bw);cur.lerp(bw.clone().add(fwd.clone().multiplyScalar(R)).add(side.clone().multiplyScalar(sd)).add(new THREE.Vector3(0,Yy,0)),k);look.lerp(bw.clone().add(new THREE.Vector3(0,ly||4.6,0)),k)}
function orbitAt(c,t,R,Yy,sp,ly){const a=t*sp;cur.lerp(new THREE.Vector3(c.x+Math.sin(a)*R,c.y+Yy,c.z+Math.cos(a)*R),.07);look.lerp(c.clone().add(new THREE.Vector3(0,ly||3,0)),.07)}
const JD={user:'shahar_b.y',text:'אני',likes:3,result:'👑 מובילה במרוץ לכתר!',show:'מהדורת הכוורת'};
const K=m=>{m.userData.keep=true;return m};
const GOLD=new THREE.MeshBasicMaterial({color:0xFFC81E});const crown=new THREE.Group();
[[0,0,0,2.4,.4,2.1],[-.95,.45,.85,.35,.6,.35],[.95,.45,.85,.35,.6,.35],[0,.55,.85,.35,.8,.35],[-.95,.45,-.85,.35,.6,.35],[.95,.45,-.85,.35,.6,.35]].forEach(c=>{const m=K(new THREE.Mesh(new THREE.BoxGeometry(c[3],c[4],c[5]),GOLD));m.position.set(c[0],c[1],c[2]);crown.add(m)});
crown.position.set(0,6.55,0);BEAR.add(crown);
BEAR.position.copy(B0);bearStatue(false);BEAR.getWorldPosition(bw);
// enveloppe crème + cachet rouge
const ENV=new THREE.Group();const cream=new THREE.MeshBasicMaterial({color:0xF3E6C8}),cream2=new THREE.MeshBasicMaterial({color:0xDCCBA6}),wax=new THREE.MeshBasicMaterial({color:0xC4122F});
ENV.add(new THREE.Mesh(new THREE.BoxGeometry(2.6,.1,1.8),cream));
[-1,1].forEach(s=>{const f=new THREE.Mesh(new THREE.BoxGeometry(1.75,.02,.12),cream2);f.position.set(s*.62,.06,-.32);f.rotation.y=s*.6;ENV.add(f)});
const seal=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.1,20),wax);seal.position.set(0,.09,.05);ENV.add(seal);
const halo=new THREE.PointLight(0xffe7b0,1.4,10,2);halo.position.set(0,1.5,0);ENV.add(halo);
const E0=bw.clone().add(fwd.clone().multiplyScalar(6.5)).add(new THREE.Vector3(0,.9,0));hive.add(ENV);
// morceaux de la statue
const stone=new THREE.MeshBasicMaterial({color:0xa9a9b4});const rocks=new THREE.Group();
[[0,0,0,1.6],[1.4,.0,.6,1.1],[-1.3,0,.4,1.2],[.5,.0,-1.2,.9],[-.6,.6,-.3,.8],[1.9,0,-.8,.7],[-2,0,-.9,.6]].forEach(r=>{const m=new THREE.Mesh(new THREE.BoxGeometry(r[3],r[3]*.7,r[3]),stone);m.position.set(r[0],r[1]+r[3]*.3-.4,r[2]);m.rotation.set(r[0],r[2],r[1]);rocks.add(m)});
rocks.position.copy(E0).add(new THREE.Vector3(0,-.9,0));hive.add(rocks);
// portail + silhouette de lapin blanc
const P=bw.clone().add(fwd.clone().multiplyScalar(4)).add(side.clone().multiplyScalar(-9)).add(new THREE.Vector3(0,4.2,0));
const portal=new THREE.Group();const pm=new THREE.MeshBasicMaterial({color:0xB14BFF});
portal.add(new THREE.Mesh(new THREE.TorusGeometry(3,.32,12,48),pm));
const disc=new THREE.Mesh(new THREE.CircleGeometry(2.75,40),new THREE.MeshBasicMaterial({color:0x2a0a5e,transparent:true,opacity:.85,side:THREE.DoubleSide}));portal.add(disc);
portal.add(new THREE.PointLight(0xb14bff,2.2,18,2));portal.position.copy(P);portal.lookAt(P.clone().add(fwd));hive.add(portal);
const W=new THREE.MeshBasicMaterial({color:0xffffff});const rab=new THREE.Group();rab.userData.s=1.6;
[[0,0,0,1.3,1,.9],[.75,.55,0,.75,.7,.7],[.65,1.25,.17,.2,.9,.15],[.9,1.2,-.17,.2,.85,.15],[-.75,.15,0,.35,.35,.35]].forEach(c=>{const m=new THREE.Mesh(new THREE.BoxGeometry(c[3],c[4],c[5]),W);m.position.set(c[0],c[1],c[2]);rab.add(m)});
hive.add(rab);const R0=P.clone().add(side.clone().multiplyScalar(-4.2)).add(new THREE.Vector3(0,-3.6,0));
const pchip=(h,pre)=>`<div class="pop" style="display:inline-block;margin:6px;background:rgba(26,17,8,.82);border:4px solid #FFC24B;border-radius:22px;padding:8px 20px;font:900 25px Heebo" dir="ltr">${pre} @${h}</div>`;
const badge=mk(30,'top:3.2%;left:auto;right:4%;padding:0');badge.innerHTML='<div style="display:inline-block;background:rgba(14,8,30,.72);border:2px solid rgba(255,194,75,.7);border-radius:999px;padding:5px 14px;font:900 14px Heebo;color:#FFE38A;text-shadow:none">🐝 הכוורת שלנו · פרק 3</div>';
const card=mk(20,'inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;background:rgba(10,6,24,.86);opacity:0');
const band=mk(21,'bottom:14%;padding:0');
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  BEAR.visible=true;crackSt=null;bearStatue(false);BEAR.position.copy(B0);BEAR.rotation.y=-2.2+Math.sin(t*1.3)*.25;
  crown.visible=true;crown.rotation.y=t*.8;treasure.visible=false;
  const labOn=t>=4.59&&t<12.4;try{pool.forEach(s=>{if(!labOn)s.visible=false})}catch(e){}
  // enveloppe : posée (hook) → cachée → tombe à 18.96 → posée sur les pierres
  ENV.visible=t<2.16||t>=18.6;ENV.scale.setScalar(t<2.16?1:1.7);
  if(t<2.16){ENV.position.copy(E0);ENV.rotation.set(0,t*.25,0)}
  else if(t<19.8){const k=Math.min(1,Math.max(0,(t-18.6)/1.2)),e=k*k;ENV.position.copy(E0).add(new THREE.Vector3(0,12*(1-e),0));ENV.rotation.set((1-k)*4,t*2*(1-k)+.3,(1-k)*2)}
  else{ENV.position.copy(E0);ENV.rotation.set(0,.3,0)}
  rocks.visible=t>=17.6;
  portal.visible=t>=22.9;disc.material.opacity=.7+.2*Math.sin(t*6);portal.children[0].material.color.setHSL(.78+.03*Math.sin(t*3),1,.6);
  rab.visible=t>=22.9&&t<24.95;if(rab.visible){const k=Math.min(1,(t-22.9)/2),a=R0.clone().lerp(P,k);a.y+=Math.sin(k*Math.PI)*3.2;rab.position.copy(a);rab.lookAt(P.clone().add(new THREE.Vector3(0,a.y-P.y,0)));rab.rotateY(-Math.PI/2);rab.scale.setScalar(1.6*(k>.82?Math.max(.01,(1-k)/.18):1))}
  let top='',mid='',bot='',key='',cd='',bd='';
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.55:.25));fl.style.background=(h===18.96||h===22.16)?'#fff':'#FFC24B';
  dark.style.background='#05031a';dark.style.opacity=String(t>=17.6&&t<22.9?.42:(t>=22.9?.28:0));
  red.style.background='radial-gradient(ellipse at center,rgba(150,60,255,0) 35%,rgba(120,40,255,.55) 100%)';red.style.opacity=t>=21.2&&t<22.9?String(.55+.25*Math.sin(t*14)):'0';
  if(t>=12.4&&t<17.4){if(JOURNAL.frame(t-12.4,JD)){T.innerHTML=M.innerHTML=B.innerHTML='';card.style.opacity='0';band.innerHTML='';last='j';camera.position.copy(cur);camera.lookAt(look);return}}
  else JOURNAL.frame(-1,JD);
  if(t<2.16){key='a';cur.copy(E0.clone().add(fwd.clone().multiplyScalar(2.6-.3*t)).add(new THREE.Vector3(0,6.2-.6*t,0)));look.copy(E0.clone().add(new THREE.Vector3(0,-.6,0)));
    top=`<div style="display:inline-block;background:rgba(14,8,30,.8);border-radius:28px;padding:16px 30px;font:900 52px/1.15 Heebo">המכתב הגיע<br>${Y('גם אלינו…')} ✉️</div>`}
  else if(t<4.4){key='s';orbitAt(new THREE.Vector3(0,2,0),t,22,8,.25,3);
    cd=`<div class="pop" style="display:inline-block;background:#FFC24B;color:#1A1108;font:900 29px Heebo;padding:10px 30px;border-radius:999px;text-shadow:none">🐝 הכוורת שלנו</div><div class="pop" style="font:900 105px/1.1 Heebo;margin-top:14px;color:#fff;text-shadow:0 0 40px rgba(255,194,75,.7)">פרק 3</div><div style="font:900 25px Heebo;color:#B9A8FF">✉️ ערב המעטפה</div>`}
  else if(t<8.0){key='c';orbitAt(new THREE.Vector3(0,2,0),t,18,3,.3,4);
    bd=`<div class="pop" style="display:inline-block;background:rgba(14,8,30,.85);border-radius:22px;padding:14px 26px;font:900 25px Heebo">👋 כל עוקב = ${Y('דבורה')} · ${Y('אתם')} מחליטים</div>`}
  else if(t<12.4){key='d'+(t>=10.04?1:0);atBear(13,5,-1.5,.07,5.5);
    top=panel(big(`אתמול: פו הדב ${Y('התעורר')} 🐻`,35))+(t>=10.04?`<div class="pop" style="margin-top:14px">${panel(big(`היום: כולם רוצים את ${Y('הכתר')} 👑`,30))}</div>`:'')}
  else if(t<21.2){key='f'+(t>=18.96?1:0);if(t<18.96)atBear(20,8,4,.05,3);else{cur.lerp(E0.clone().add(fwd.clone().multiplyScalar(8)).add(side.clone().multiplyScalar(2)).add(new THREE.Vector3(0,5,0)),.06);look.lerp(E0.clone().add(new THREE.Vector3(0,1.5,0)),.08)}
    top=panel(big(`🌙 אבל הלילה…`,40));if(t>=18.96)bot=`<div class="pop" style="display:inline-block;background:rgba(14,8,30,.82);border-radius:24px;padding:12px 28px;font:900 36px/1.2 Heebo">✉️ נפלה מעטפה<br>על ${Y('שברי הפסל')}</div>`}
  else if(t<22.9){key='g';atBear(7,4.5,-.6,.09,5.6);
    mid=`<div class="pop" style="display:inline-block;background:rgba(14,8,30,.8);border-radius:28px;padding:16px 30px;font:900 43px/1.15 Heebo;color:#E3D4FF;text-shadow:0 0 30px rgba(160,90,255,.9)">הוא לא היחיד<br>שמתעורר…</div>`}
  else{key='e'+(t>=23.25?1:0)+(t>=24.72?1:0)+(t>=25.5?1:0)+(t>=26.16?1:0);cur.lerp(P.clone().add(fwd.clone().multiplyScalar(19)).add(side.clone().multiplyScalar(-1.6)).add(new THREE.Vector3(0,.5,0)),.1);look.lerp(P.clone().add(side.clone().multiplyScalar(-1.6)).add(new THREE.Vector3(0,-.8,0)),.1);
    if(t>=23.25)top=`<div class="pop" style="display:inline-block;background:#F3E6C8;color:#2a1a08;border:6px solid #C4122F;border-radius:26px;padding:12px 34px;text-shadow:none"><div style="font:900 24px Heebo">אות 1 מתוך 5</div><div style="font:900 74px/1 Heebo">« ה »</div></div>`;
    if(t>=24.72)mid=`<div class="pop" style="display:inline-block;background:rgba(14,8,30,.85);border-radius:24px;padding:12px 26px;font:900 31px/1.25 Heebo">מי שולח את המכתבים?<br>${Y('5 עולמות, 5 אותיות')} 🔎</div>`;
    if(t>=25.5)bot=`<div class="pop" style="display:inline-block;background:rgba(14,8,30,.85);border-radius:22px;padding:10px 24px;font:900 25px Heebo">האות הבאה אצל <bdi dir=ltr>@tovim_beyachad</bdi></div>`;
    if(t>=26.16)bot+=`<div class="pop" style="margin-top:12px;display:inline-block;background:#FFC24B;color:#1A1108;border-radius:22px;padding:10px 24px;font:900 27px Heebo;text-shadow:none">📩 שלחו לחבר שיעזור לכם לפתור</div>`}
  card.style.opacity=key==='s'?'1':'0';
  if(kick>0&&key!=='a'){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?1.2:.6);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?1.2:.6)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){const nw=key.replace(/\d+$/,'')!==last.replace(/\d+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw&&key!=='a'?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div>${bot}</div>`:'';card.innerHTML=cd;band.innerHTML=bd}
};
