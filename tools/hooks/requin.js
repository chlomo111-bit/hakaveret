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
// reel 1.11 « כריש בכוורת » — minutage mot à mot (voix_requin.mp3, 29.2 s) + journal מהדורת הכוורת au milieu
const HITS=[0.1,1.14,5.14,5.9,12.4,16.04,17.44,19.86,22.98,25.66];
const BIG=new Set([0.1,5.9,22.98]);
const tmp=new THREE.Vector3(),cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,8,0);let last='';
const by=h=>bees.find(b=>b.handle===h);
function orbitAt(c,t,R,Y,sp){const a=t*sp;cur.lerp(new THREE.Vector3(c.x+Math.sin(a)*R,c.y+Y,c.z+Math.cos(a)*R),.08);look.lerp(c.clone().add(new THREE.Vector3(0,Y*.35,0)),.08)}
function fol(h,off,k){const b=by(h);if(!b)return false;beeWorldPos(b,tmp);cur.lerp(tmp.clone().add(off),k);look.lerp(tmp.clone().add(new THREE.Vector3(0,.4,0)),k*1.4);return true}
const fw=new THREE.Vector3();
const JD={user:'orian7489',text:'כריש 🦈',likes:1,result:'🦈 בנינו כריש בכוורת!',show:'מהדורת הכוורת'};
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  let top='',mid='',bot='',key='';treasure.visible=false;
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.7:.35));
  dark.style.opacity=t<.1?'1':'0';
  red.style.opacity=t<2.6?String(.3+.3*Math.sin(t*12)):'0';
  if(t>=5.9&&t<12.4){if(JOURNAL.frame(t-5.9,JD)){T.innerHTML=M.innerHTML=B.innerHTML='';last='j';camera.position.copy(cur);camera.lookAt(look);return}}
  else JOURNAL.frame(-1,JD);
  if(t<2.92){key='a'+(t>=1.14?1:0);if(!fol('orian7489',new THREE.Vector3(5.5,2.2,5.5),.2))orbitAt(new THREE.Vector3(0,0,0),t,20,10,.3);
    top=live;mid=`<div class="pop" style="font:900 170px Heebo;color:#FF4B5C;text-shadow:0 0 40px rgba(255,60,80,.9),0 6px 24px #000">כריש!</div>`+(t>=1.14?big(`🦈 בתוך ${Y('הכוורת')}!`,72):'')}
  else if(t<5.9){key='b'+(t>=5.14?1:0);fol('orian7489',new THREE.Vector3(6,2.6,-4.5),.12);
    top=panel(big(`💬 ביקשתם מתחת לסרטון…`,48));
    mid=`<div style="display:inline-block;background:#fff;color:#1A1108;border-radius:26px;padding:14px 30px;text-align:right;box-shadow:0 10px 40px rgba(0,0,0,.5);text-shadow:none"><div style="font:700 34px Heebo;opacity:.6" dir="ltr">@orian7489</div><div style="font:900 70px Heebo">כריש 🦈</div></div>`;
    if(t>=5.14)bot=`<div class="pop" style="font:900 96px Heebo;color:#FFC24B">אז בנינו 🛠️</div>`}
  else if(t<14.6){key='c'+(t>=13.3?1:0);if(!fol('saardano11',new THREE.Vector3(6,2.4,6),.14))orbitAt(new THREE.Vector3(0,0,0),t,18,9,.3);
    top=panel(big(`🐋 ${V('לוויתן')} בכוורת`,60));mid=chip('saardano11');if(t>=13.3)bot=big(`שוחה בין הדבורים 🌊`,56)}
  else if(t<19.86){FOUNT.getWorldPosition(fw);orbitAt(fw,t,9,6,.35);key='d'+(t>=16.04?1:0)+(t>=17.44?1:0);
    top=t>=16.04?panel(big(`⛲ מזרקת ${Y('דבש')} 🍯`,64)):panel(big(`ובאמצע הכוורת…`,58));
    if(t>=17.44)bot=`<div class="pop" style="font:900 44px Heebo;margin-bottom:12px">💡 הרעיון של</div>${chip('shahar_b.y')}<div style="font:900 40px Heebo;margin-top:12px">👑 המגיבה של היום</div>`}
  else if(t<25.66){orbitAt(new THREE.Vector3(0,0,0),t,24,13,.18);key='e'+(t>=21.22?1:0)+(t>=22.98?1:0)+(t>=23.94?1:0);
    top=live+`<div style="font:900 64px Heebo;margin-top:14px">🎟️ הערב ב־<span dir="ltr">${Y('20:00')}</span></div>`;
    if(t>=21.22)mid=big(`הגרלה בשידור חי 🔴`,64);
    if(t>=22.98)mid+=`<div class="pop" style="font:900 130px/1 Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000;margin-top:14px">2000 🌼</div>`;
    if(t>=23.94)bot=panel(big(`✨ והזוכה בוחר/ת מה יקרה מחר!`,50))}
  else{orbitAt(new THREE.Vector3(0,0,0),t,28,15,.12);key='f'+(t>=27.02?1:0);
    mid=`<div class="pop" style="font:900 110px/1.1 Heebo">מה יקרה<br>${Y('מחר')}? 👀</div>`;
    if(t>=27.02)bot=`<div style="font:900 44px Heebo">💬 התגובה עם הכי הרבה לייקים קובעת</div><div style="font:900 40px Heebo;margin-top:14px">🔗 הקישור לכוורת בביו</div>`}
  if(kick>0){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?1.6:.8);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?1.6:.8)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){const nw=key.replace(/\d+$/,'')!==last.replace(/\d+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div>${bot}</div>`:''}
};
