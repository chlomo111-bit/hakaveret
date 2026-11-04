try{localStorage.setItem('kaveret_ev50','1');localStorage.setItem('kaveret_ev100','1')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;MET.since=-100;treasure.visible=false;
try{capEl.style.display="none"}catch(e){}
try{flowers.forEach(f=>f.visible=false);petals.visible=false}catch(e){}
const css=document.createElement('style');css.textContent='@keyframes pop{0%{transform:scale(.4);opacity:0}55%{transform:scale(1.18);opacity:1}100%{transform:scale(1)}}.pop{animation:pop .28s ease-out both}@keyframes blink{50%{opacity:.35}}.blink{animation:blink .8s infinite}';document.head.appendChild(css);
const mk=(z,s)=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;z-index:'+z+';text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 22px rgba(0,0,0,.85);padding:0 18px;'+s;document.body.appendChild(d);return d};
const T=mk(9,'top:7%'),M=mk(9,'top:36%'),B=mk(9,'bottom:10%');
mk(4,'inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,8,30,.75) 0%,rgba(10,8,30,0) 30%,rgba(10,8,30,0) 62%,rgba(10,8,30,.88) 100%)');
const dark=mk(6,'inset:0;pointer-events:none;background:#000;opacity:1');
const red=mk(5,'inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(255,0,40,0) 35%,rgba(200,0,30,.6) 100%);opacity:0');
const fl=mk(8,'inset:0;pointer-events:none;background:#fff;opacity:0');
const Y=s=>`<span style="color:#FFC24B">${s}</span>`,V=s=>`<span style="color:#B9A8FF">${s}</span>`,R=s=>`<span style="color:#FF4B5C">${s}</span>`;
const big=(s,sz)=>`<div style="font:900 ${sz||60}px/1.12 Heebo">${s}</div>`;
const panel=s=>`<div style="display:inline-block;background:rgba(20,14,40,.66);border-radius:26px;padding:10px 24px">${s}</div>`;
const live=`<span class="blink" style="display:inline-block;background:#E5484D;color:#fff;font:900 30px Heebo;padding:8px 22px;border-radius:999px;text-shadow:none">🔴 LIVE</span>`;
const chip=h=>`<div style="display:inline-block;background:rgba(26,17,8,.8);border:4px solid #FFC24B;border-radius:26px;padding:14px 30px;font:900 56px Heebo" dir="ltr">@${h}</div>`;
// reel 5.11 « פרק 2: פו הדב התעורר » — minutage mot à mot (voix_ep2.mp3, 31.6 s) + journal 16.04 → 22.54 + concours מלך הכוורת
const HITS=[0.24,1.04,2.96,3.88,4.82,6.28,7.1,8.18,10.18,11.7,12.3,13.56,14.74,16.04,22.54,23.56,24.74,26.52,28.78];
const BIG=new Set([2.96,3.88,14.74,16.04,24.74]);
const cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,8,0);let last='';
const bw=new THREE.Vector3(),fwd=new THREE.Vector3(-0.81,0,-0.59);
function atBear(R,Yy,side,k,ly){BEAR.getWorldPosition(bw);const sd=new THREE.Vector3(-fwd.z,0,fwd.x).multiplyScalar(side);cur.lerp(bw.clone().add(fwd.clone().multiplyScalar(R)).add(sd).add(new THREE.Vector3(0,Yy,0)),k);look.lerp(bw.clone().add(new THREE.Vector3(0,ly||4.6,0)),k)}
function orbitAt(c,t,R,Yy,sp,ly){const a=t*sp;cur.lerp(new THREE.Vector3(c.x+Math.sin(a)*R,c.y+Yy,c.z+Math.cos(a)*R),.07);look.lerp(c.clone().add(new THREE.Vector3(0,ly||3,0)),.07)}
const JD={user:'yahli12349',text:'תעשו אותי המלך של הכוורת 👑',likes:1,result:'👑 התחרות על הכתר התחילה!',show:'מהדורת הכוורת'};
const GOLD=new THREE.MeshBasicMaterial({color:0xFFC81E});const crown=new THREE.Group();
[[0,0,0,2.4,.4,2.1],[-.95,.45,.85,.35,.6,.35],[.95,.45,.85,.35,.6,.35],[0,.55,.85,.35,.8,.35],[-.95,.45,-.85,.35,.6,.35],[.95,.45,-.85,.35,.6,.35]].forEach(c=>{const m=new THREE.Mesh(new THREE.BoxGeometry(c[3],c[4],c[5]),GOLD);m.position.set(c[0],c[1],c[2]);m.userData.keep=true;crown.add(m)});
crown.position.set(0,6.55,0);crown.visible=false;BEAR.add(crown);
const pchip=(h,pre)=>`<div class="pop" style="display:inline-block;margin:6px;background:rgba(26,17,8,.82);border:4px solid #FFC24B;border-radius:22px;padding:8px 20px;font:900 40px Heebo" dir="ltr">${pre} @${h}</div>`;
let woke=false;const B0=new THREE.Vector3(6.5,-5.6,-3.5);
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  BEAR.visible=true;
  if(!woke&&t>=3.34){woke=true;crackSt=null;bearStatue(false)}
  if(!woke&&t<3.34){bearStatue(true);if(t>=2.96)BEAR.position.x=6.5+Math.sin(t*60)*.12}
  if(woke){crackSt=null;bearStatue(false);const k=Math.min(1,(t-3.34)/10);BEAR.position.set(B0.x-2.5*k,B0.y,B0.z+1.5*k);BEAR.rotation.y=-2.2+Math.sin(t*1.3)*.25}
  crown.visible=t>=23.56;if(crown.visible)crown.rotation.y=t*.8;
  let top='',mid='',bot='',key='';treasure.visible=false;
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.6:.3));fl.style.background=(h===3.88||h===14.74)?'#fff':'#FFC24B';
  dark.style.background='#0a0420';dark.style.opacity=String(t<0.24?1:(t<3.34?.45:0));
  red.style.opacity=t>=2.96&&t<3.88?String(.5+.3*Math.sin(t*20)):'0';
  if(t>=16.04&&t<22.54){if(JOURNAL.frame(t-16.04,JD)){T.innerHTML=M.innerHTML=B.innerHTML='';last='j';camera.position.copy(cur);camera.lookAt(look);return}}
  else JOURNAL.frame(-1,JD);
  if(t<3.88){key='a'+(t>=1.04?1:0)+(t>=2.96?1:0);atBear(12-1.2*t,5,.6,.12);
    top=`<div style="font:900 70px/1.2 Heebo;color:#B9A8FF;text-shadow:0 0 30px rgba(120,90,255,.8),0 6px 24px #000">רגע…${t>=1.04?'<br>הפסל של פו הדב…':''}</div>`;
    if(t>=2.96)bot=`<div class="pop" style="font:900 150px/1 Heebo;color:#FF4B5C;text-shadow:0 0 40px rgba(255,40,60,.95),0 6px 24px #000">זז!</div>`}
  else if(t<6.2){key='b'+(t>=4.82?1:0);atBear(15,6,-2,.06,5);
    mid=`<div class="pop" style="font:900 150px/1 Heebo;color:#FFC24B;text-shadow:0 0 40px rgba(255,190,60,.8),0 6px 24px #000">פרק 2</div>`+(t>=4.82?big(`🐻 פו הדב ${R('התעורר!')}`,80):'')}
  else if(t<10.1){key='c'+(t>=7.1?1:0)+(t>=8.18?1:0);orbitAt(new THREE.Vector3(0,2,0),t,18,3,.3,4);
    top=panel(big(`👋 חדשים פה?`,58));const L=[];if(t>=7.1)L.push(`🐝 כל עוקב = ${Y('דבורה')}`);if(t>=8.18)L.push(`🗳️ ${Y('אתם')} מחליטים מה קורה`);
    mid=L.map((s,i)=>`<div class="${i===L.length-1?'pop':''}" style="font:900 54px/1.5 Heebo">${s}</div>`).join('')}
  else if(t<16.0){key='d'+(t>=11.7?1:0)+(t>=13.56?1:0)+(t>=14.74?1:0);atBear(20,9,3,.05,4);
    top=pchip('shellydor20','💂')+big(`שמרה עליו אתמול`,50);
    if(t>=11.7)mid=`<div style="font:900 52px Heebo">אספנו רק</div><div class="pop" style="font:900 110px Heebo" dir="ltr">2,149 🌼</div>`;
    if(t>=13.56)mid+=`<div style="font:900 56px Heebo;color:#B9A8FF">מתוך 5,000…</div>`;
    if(t>=14.74)bot=`<div class="pop" style="font:900 70px Heebo;color:#FF4B5C;text-shadow:0 0 30px rgba(255,40,60,.9),0 6px 24px #000">💥 האבן נשברה!</div>`}
  else if(t<24.7){key='f'+(t>=23.56?1:0);atBear(13,5,-1.5,.08,5.5);
    top=big(`🐻 ופו הדב?`,72)+(t>=23.56?`<div class="pop" style="font:900 64px/1.15 Heebo">רוצה את ${Y('הכתר')} 👑</div>`:'')}
  else{key='g'+(t>=26.52?1:0)+(t>=28.78?1:0);orbitAt((BEAR.getWorldPosition(bw),bw.clone()),t,20,7,.35,5);
    top=`<div>${pchip('yahli12349','🐝')}</div><div style="font:900 40px Heebo">או</div><div>${pchip('ori.adin','🐻')}</div>`;
    mid=`<div class="pop" style="font:900 72px/1.15 Heebo">👑 מי יהיה<br>${Y('מלך הכוורת')}?</div>`;
    if(t>=26.52)bot=`<div class="pop" style="font:900 46px Heebo;color:#FFC24B">📲 שלחו לחברים שיצביעו לכם</div>`;
    if(t>=28.78)bot+=`<div style="font:900 38px Heebo;margin-top:12px">💬 הכי הרבה לייקים = 👑</div>`}
  if(kick>0){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?1.4:.7);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?1.4:.7)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){const nw=key.replace(/\d+$/,'')!==last.replace(/\d+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div>${bot}</div>`:''}
};
bearTick();crackTick();
