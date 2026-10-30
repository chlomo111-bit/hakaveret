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
// minutage mot à mot (transcription ElevenLabs de voix_recap.mp3, 35.2 s)
const ENTS=["rahel","aviv_ben_shlush","zoharkoresh_","sasonush","sapir","ori131312","lian_danino","nissimcohen1","shlomo_e_c","saardano11","cohennissim1","maayan_danon"];
const HITS=[4.56,10.48,11.26,13.54,14.98,16.46,17.48,18.44,20.34,21.64,23.5,26.14,27.34,30.42,34.34];
const BIG=new Set([10.48,18.44,21.64]);
const tmp=new THREE.Vector3(),cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,12,0);let last='',ri=-1;
const by=h=>bees.find(b=>b.handle===h);
function orbit(t,r,y,sp){const a=t*sp,R=Math.max(r,22)*1.15,YY=Math.max(y,14)+5;cur.lerp(new THREE.Vector3(Math.sin(a)*R,YY,Math.cos(a)*R),.08);look.lerp(new THREE.Vector3(0,YY*.45,0),.08)}
function fol(h,off,k){const b=by(h);if(!b)return false;beeWorldPos(b,tmp);cur.lerp(tmp.clone().add(off),k);look.lerp(tmp.clone().add(new THREE.Vector3(0,.6,0)),k*1.4);return true}
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  let top='',mid='',bot='',key='';treasure.visible=false;
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.75:.4));
  dark.style.opacity=t<4.4?String(Math.max(.35,.8-t*.1)):'0';
  red.style.opacity=(t>=6.28&&t<10.48)?String(.35+.3*Math.sin(t*10)):(t>=29.24&&t<31.4?'.55':'0');
  if(t<4.56){key='a'+(t>=2.26?1:0);orbit(t,26,15,.05);top=live;mid=big(`אתמול,<br>${Y('<span dir="ltr">20:00</span>')}`,84);if(t>=2.26)bot=panel(big(`כל הכוורת עצרה את הנשימה… 🤫`,44))}
  else if(t<6.28){key='b';orbit(t,20,12,.25);top=live;mid=`<div class="pop" style="font:900 220px Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000">13</div><div style="font:900 60px Heebo">כרטיסים 🎟️</div>`}
  else if(t<10.48){ // roulette qui ralentit (vrais participants)
    const e=t-6.28,sp=.07+Math.pow(e/4.2,3)*.5,idx=Math.floor(e/sp)%ENTS.length;key='c'+idx+(t>=9.26?'w':'');
    orbit(t,16,11,.6);top=live+`<div style="font:900 44px Heebo;margin-top:14px">🎰 הרולטה מסתובבת…</div>`;
    mid=(t>=9.26?big(`והזוכה היא…`,56):'')+`<div style="margin-top:16px">${chip(ENTS[idx])}</div>`}
  else if(t<13.54){ // révélation : caméra sur l'abeille de sapir
    key='d'+(t>=11.26?1:0);const k=Math.min(1,(t-10.48)/.9);
    if(!fol('sapir',new THREE.Vector3(5.5-2.5*k,1.4,5.5-2.5*k),.18))orbit(t,14,10,.5);
    top=live;mid=`<div class="pop" style="font:900 34px Heebo">🎉 הזוכה 🎉</div><div style="margin-top:8px">${chip('sapir')}</div>`;
    if(t>=11.26)bot=`<div class="pop" style="font:900 130px Heebo;color:#FFC24B;text-shadow:0 0 30px rgba(255,190,60,.9),0 6px 24px #000">20 ₪</div><div style="font:900 40px Heebo">בשידור חי 🔴</div>`}
  else if(t<20.34){ // récap 3 jours
    orbit(t,22,13,.35);
    if(t<14.98){key='e';mid=big(`רק ${Y('3 ימים')}…`,96)}
    else if(t<16.46){key='f';const n=t<15.9?Math.round(100+38*(t-14.98)/.92):138;mid=`<div style="font:900 190px Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000">${n}</div><div style="font:900 58px Heebo">דבורים 🐝</div>`;key+=n}
    else if(t<17.48){key='g';mid=big(`כוורת ${Y('זהב')} ✨`,96);fl.style.background='#FFC24B'}
    else if(t<18.44){key='h';mid=big(`${R('מטאור')} ☄️💥`,100);fl.style.background='#FF7A2E';cur.x+=(Math.random()-.5)*1.4;cur.y+=(Math.random()-.5)*1.4}
    else{key='i';fl.style.background='#fff';mid=big(`והכוורת עפה<br>${V('לחלל')} 🚀`,92)}}
  else if(t<23.5){ // samedi soir : 2 tirages
    orbit(t,20,12,.3);fl.style.background='#fff';key='j'+(t>=21.64?1:0);top=panel(big(`🕯️ ${Y('במוצאי שבת')}`,64));
    if(t>=21.64)mid=`<div class="pop" style="font:900 120px/1 Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000">2</div><div style="font:900 64px Heebo">הגרלות בשידור חי</div><div style="margin-top:16px">${live}</div><div style="font:900 44px Heebo;margin-top:14px"><span dir="ltr">18:30</span> · <span dir="ltr">20:00</span></div>`}
  else if(t<29.24){ // la nouvelle règle
    orbit(t,18,11,.25);key='k'+(t>=24.46?1:0)+(t>=26.14?1:0)+(t>=27.34?1:0);
    top=panel(big(t<24.46?`⚠️ ${Y('שימו לב')}`:`🆕 מהיום צריך ${Y('2 דברים')}`,54));
    const row=(on,s)=>on?`<div class="pop" style="display:inline-block;margin:12px 0;background:rgba(26,17,8,.8);border:4px solid #FFC24B;border-radius:24px;padding:14px 26px;font:900 46px Heebo">${s} ✅</div><br>`:'';
    mid=row(t>=26.14,`🌼 ${Y('200')} אבקות`)+row(t>=27.34,`💬 תגובה על ${Y('הפוסט של היום')}`)}
  else if(t<31.8){key='l'+(t>=30.42?1:0);orbit(t,24,13,.15);mid=big(`מי שלא הגיב…`,72)+(t>=30.42?`<div class="pop" style="font:900 62px Heebo;margin-top:16px;white-space:nowrap"><span style="display:inline-block;background:#E5484D;border-radius:22px;padding:6px 26px;text-shadow:none">❌ לא בהגרלה</span></div>`:'')}
  else{key='z';orbit(t,26,14,.2);top=panel(big(`🔗 הקישור לכוורת ${Y('בביו')}`,52));mid=big(`נתראה<br>${Y('במוצאי שבת')} 🐝`,84);
    bot=`<div style="font:900 40px Heebo">💬 הגיבו על הפוסט של היום · 🏷️ תייגו חבר</div>`}
  if(kick>0){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?2.2:1.2);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?2.2:1.2)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){const nw=key.replace(/[\dw]+$/,'')!==last.replace(/[\dw]+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw&&key[0]!=='c'?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div>${bot}</div>`:''}
};
