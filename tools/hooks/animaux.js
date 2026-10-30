// Reel « החיות השתלטו על הכוורת » (31.10) — calé sur voix_animaux.mp3 (Juniper, 25.2 s, pauses silencedetect)
try{localStorage.setItem('kaveret_ev50','1');localStorage.setItem('kaveret_ev100','1')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;try{MET.since=-100}catch(e){}try{treasure.visible=false}catch(e){}
try{capEl.style.display="none"}catch(e){}
window.capT=0;
const css=document.createElement('style');css.textContent='@keyframes pop{0%{transform:scale(.4);opacity:0}55%{transform:scale(1.18);opacity:1}100%{transform:scale(1)}}.pop{animation:pop .28s ease-out both}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}.shake{animation:shake .25s 2}';document.head.appendChild(css);
const mk=(z,s)=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;z-index:'+z+';text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 22px rgba(0,0,0,.85);padding:0 18px;'+s;document.body.appendChild(d);return d};
const T=mk(9,'top:7%'),M=mk(9,'top:34%'),B=mk(9,'bottom:12%');
mk(4,'inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.8) 0%,rgba(26,17,8,0) 30%,rgba(26,17,8,0) 62%,rgba(26,17,8,.88) 100%)');
const dark=mk(6,'inset:0;pointer-events:none;background:#000;opacity:0');
const red=mk(5,'inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(255,0,40,0) 35%,rgba(200,0,30,.6) 100%);opacity:0');
const fl=mk(8,'inset:0;pointer-events:none;background:#fff;opacity:0');
const Y=s=>`<span style="color:#FFC24B">${s}</span>`;
const big=(s,sz)=>`<div style="font:900 ${sz||60}px/1.12 Heebo">${s}</div>`;
const panel=s=>`<div style="display:inline-block;background:rgba(26,17,8,.72);border-radius:26px;padding:10px 24px">${s}</div>`;
const chip=h=>`<div style="display:inline-block;background:rgba(26,17,8,.82);border:4px solid #FFC24B;border-radius:26px;padding:12px 28px;font:900 50px Heebo" dir="ltr">@${h}</div>`;
const ANI=[[7.17,'shahar_b.y','🦄','חד־קרן'],[8.12,'rahelassouline','🦁','אריה'],[9.01,'saardano11','🐶','כלב'],[9.84,'shlomo_e_c','🐼','פנדה'],[10.82,'sac24244','🐱','חתול']];
const HITS=[0.10,0.91,3.01,5.90,7.17,8.12,9.01,9.84,10.82,12.38,13.45,15.81,17.17,19.91,20.94,22.93];
const BIG=new Set([0.91,12.38,15.81,22.93]);
const tmp=new THREE.Vector3(),cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,12,0);let last='';
const by=h=>bees.find(b=>b.handle===h);
function orbit(t,r,y,sp,k){const a=t*sp,R=r,YY=y;cur.lerp(new THREE.Vector3(Math.sin(a)*R,YY,Math.cos(a)*R),k||.08);look.lerp(new THREE.Vector3(0,YY*.5,0),k||.08)}
function fol(h,d,k){const b=by(h);if(!b)return false;beeWorldPos(b,tmp);d=d*Math.max(1,beeScale(b)/1.1);const yw=yawArr[b.i];
  const f=new THREE.Vector3(Math.cos(yw),0,-Math.sin(yw));let sd=new THREE.Vector3(Math.sin(yw),0,Math.cos(yw));const rin=new THREE.Vector3(-tmp.x,0,-tmp.z).normalize();const rb0=Math.hypot(tmp.x,tmp.z),inw=rb0>=13;if((sd.dot(rin)<0)===inw)sd.multiplyScalar(-1);
  const to=tmp.clone().add(f.multiplyScalar(d*.85)).add(sd.multiplyScalar(d*.55)).add(new THREE.Vector3(0,d*.22,0));{const rb=Math.hypot(tmp.x,tmp.z),rt=Math.hypot(to.x,to.z);const lim=inw?rb-.3:rb+4;if(rt>lim){const q=lim/rt;to.x*=q;to.z*=q}}cur.lerp(to,k);look.lerp(tmp,Math.min(1,k*1.6));return true}
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  try{treasure.visible=false}catch(e){}
  let top='',mid='',bot='',key='';
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.7:.35));
  dark.style.opacity=t<0.9?String(.75-t*.6):(t>=11.3&&t<12.38?'.55':'0');
  red.style.opacity=(t>=13.45&&t<15.81)?String(.35+.25*Math.sin(t*9)):'0';
  if(t<3.01){key='a'+(t>=0.91?1:0);orbit(t,30,17,.12);
    top=`<div style="display:inline-block;font:900 26px Heebo;background:#FFC24B;color:#1A1108;padding:7px 20px;border-radius:999px;text-shadow:none">🐝 הכוורת שלנו</div>`;
    mid=t<0.91?big('רגע… 😳',96):big(`החיות ${Y('השתלטו')}<br>על הכוורת! 😱`,78);
    bot='<div style="font:900 70px Heebo">🐘🦄🦁🐶🐼🐱</div>'}
  else if(t<7.17){key='b'+(t>=5.90?1:0);orbit(t,30,17,.22);
    mid=t<5.90?panel(big(`שאלנו:<br>איזו ${Y('חיה')} הייתם<br>רוצים להיות? 🐾`,62)):big(`…ואתם ${Y('עניתם')} 👇`,76)}
  else if(t<11.3){let i=0;for(let j=0;j<ANI.length;j++)if(t>=ANI[j][0])i=j;const [t0,hd,em,nm]=ANI[i];key='c'+i;
    const k=Math.min(1,(t-t0)/.35);if(!fol(hd,5.6-1.2*k,dt<.12?.35:.16))orbit(t,18,12,.4);
    top=`<div class="pop" style="font:900 150px Heebo;text-shadow:0 0 30px rgba(255,190,60,.7)">${em}</div><div style="font:900 70px Heebo;color:#FFC24B">${nm}!</div>`;
    bot=chip(hd)}
  else if(t<12.38){key='d';orbit(t,26,16,.5,.05);mid=big('ואז מישהו<br>כתב… 🤔',84)}
  else if(t<13.45){key='e';orbit(t,26,16,.5,.05);
    mid=`<div style="display:inline-block;direction:rtl;text-align:right;background:#fff;color:#111;text-shadow:none;border-radius:28px;padding:20px 30px;box-shadow:0 10px 40px rgba(0,0,0,.5)"><div dir="ltr" style="font:700 30px Heebo;color:#666">@the_noise_2026</div><div style="font:900 110px Heebo">פיל 🐘</div></div>`}
  else if(t<15.81){key='f';orbit(t,28,16,.3);
    mid=big(`אמרנו לו:<br>${'<span style="color:#FF5A6A">אין פיל בכוורת</span>'} ❌`,72)}
  else if(t<17.17){key='g';if(!fol('the_noise_2026',8,.12))orbit(t,18,12,.4);
    mid=`<div class="shake">${big(`אז ${Y('בנינו')}<br>לו פיל!! 🐘`,104)}</div>`}
  else if(t<19.91){key='h'+(t>=17.80?1:0);const k=Math.min(1,(t-17.17)/2.2);fol('the_noise_2026',6.5-1.5*k,.1);
    top=chip('the_noise_2026');
    bot=t<17.80?big(`עם ${Y('חדק')} 🐘`,70):big(`${Y('חדק')} + ${Y('אוזניים ענקיות')}<br>והכול! 🤯`,60)}
  else{key='i'+(t>=20.94?1:0)+(t>=22.93?1:0);orbit(t,30,17,.16,.06);
    top=panel(big(`עכשיו ${Y('תורכם')} 👇`,58));
    if(t>=20.94)mid=big(`איזו חיה ${Y('נוסיף')}<br>לכוורת מחר?`,76)+'<div style="font:900 64px Heebo;margin-top:10px">🐵🐧🦒🐯❓</div>';
    if(t>=22.93)bot=`<div style="display:inline-block;background:#FFC24B;color:#1A1108;text-shadow:none;border-radius:24px;padding:14px 26px;font:900 44px/1.2 Heebo">התגובה עם הכי הרבה<br>לייקים קובעת 👇</div><div style="font:900 30px Heebo;margin-top:14px">🔗 הקישור לכוורת בביו</div>`}
  if(t>=7.17&&t<11.3||t>=15.81&&t<19.91){try{pool.forEach(x=>x.visible=false)}catch(e){}}
  if(kick>0){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?2.0:1.0);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?2.0:1.0)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){last=key;T.innerHTML=top?`<div class="pop">${top}</div>`:'';M.innerHTML=mid?`<div class="pop">${mid}</div>`:'';B.innerHTML=bot?`<div class="pop">${bot}</div>`:''}
};
