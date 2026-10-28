try{localStorage.setItem('kaveret_ev50','1')}catch(e){}
try{capEl.style.display="none"}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;MET.since=-100;treasure.visible=false;
const css=document.createElement('style');css.textContent='@keyframes pop{0%{transform:scale(.4);opacity:0}55%{transform:scale(1.18);opacity:1}100%{transform:scale(1)}}.pop{animation:pop .28s ease-out both}';document.head.appendChild(css);
const mk=(z,s)=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;z-index:'+z+';text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 22px rgba(0,0,0,.85);padding:0 18px;'+s;document.body.appendChild(d);return d};
const T=mk(9,'top:7%'),M=mk(9,'top:40%'),B=mk(9,'bottom:9%');
const ov=mk(4,'inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.75) 0%,rgba(26,17,8,0) 30%,rgba(26,17,8,0) 64%,rgba(26,17,8,.88) 100%)');
const red=mk(5,'inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(255,0,40,0) 30%,rgba(200,0,30,.6) 100%);opacity:0');
const dark=mk(6,'inset:0;pointer-events:none;background:#000;opacity:1');
const fl=mk(8,'inset:0;pointer-events:none;background:#fff;opacity:0');
const Y=s=>`<span style="color:#FFC24B">${s}</span>`,R=s=>`<span style="color:#FF3B4E">${s}</span>`;
const big=(s,sz)=>`<div style="font:900 ${sz||60}px/1.1 Heebo">${s}</div>`;
const panel=s=>`<div style="display:inline-block;background:rgba(26,17,8,.62);border-radius:26px;padding:10px 24px">${s}</div>`;
// moments exacts (transcription mot à mot de voix_tirage.mp3)
const HITS=[3.94,8.88,11.32,13.98,16.12,21.66,22.64,23.66,24.9];
const tmp=new THREE.Vector3(),cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,10,0);let last='';
function orbit(t,r,y,sp){const a=t*sp;cur.lerp(new THREE.Vector3(Math.sin(a)*r,y,Math.cos(a)*r),.08);look.lerp(new THREE.Vector3(0,y*.45,0),.08)}
window.capHook=(t)=>{
  let top='',mid='',bot='',key='';treasure.visible=false;
  // dernier « hit » passé → secousse + flash qui décroissent
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.35?Math.exp(-dt*9):0;
  dark.style.opacity=t<1.3?String(.85-t*.35):'0';
  red.style.opacity=(t>=3.94&&t<6.6)?String(.55+.35*Math.sin(t*12)):(t>=3.94?String(.12+.1*kick):'0');
  fl.style.opacity=String(kick*.55);
  if(t<3.94){ // calme, ralenti
    const a=t*.06;cur.set(Math.sin(a)*24,14,Math.cos(a)*24);look.set(0,8,0);
    if(t<1.4){key='a';mid=big(`חבר'ה…`,72)}
    else{key='b';mid=panel(big(`עד היום היה<br>${Y('קל מדי')} 😴`,62))}
  }else if(t<6.6){ // LE DROP
    const k=Math.min(1,(t-3.94)/.5);cur.set(0,12-6*k,18-8*k);look.set(0,9,0);
    key=t<4.92?'c':'d';mid=t<4.92?big(R('מהיום…'),96):big(`זה מתחיל<br>${R('באמת')} 😈`,84);
  }else if(t<10.6){ // 200 pollens
    orbit(t,16,10,.5);
    const n=t<8.88?Math.round(200*Math.pow((t-6.66)/2.22,2)):200;
    key='e'+(t>=8.88?1:0);top=panel(big(`כדי להיכנס ל${Y('הגרלה')} 🎟️`,50));
    mid=`<div style="font:900 ${t>=8.88?190:150}px Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000">${Math.max(0,Math.min(200,n))}</div><div style="font:900 52px Heebo">אבקות 🌼</div>`;
    key+=Math.floor(n/10);
  }else if(t<13.28){ // seulement à 200
    orbit(t,14,9,.7);key='f'+(t>=11.32?1:0);
    top=panel(big(`רק מי שמגיע ל־${Y('200')}`,56));
    mid=t>=11.32?`<div class="pop" style="display:inline-block;background:#FFC24B;color:#1A1108;border-radius:24px;padding:18px 34px;font:900 64px Heebo;text-shadow:none;transform:rotate(-4deg)">🎟️ נכנס להגרלה!</div>`:'';
  }else if(t<17.54){ // chaque soir 20:00 → 20 ₪
    if(t<16.12){orbit(t,18,11,.4);key='g'+(t>=13.98?1:0)+(t>=14.94?1:0);top=panel(big(`כל ערב ב־`,52));
      mid=t>=13.98?`<div style="font:900 170px Heebo;letter-spacing:4px;color:#fff;text-shadow:0 0 30px rgba(255,80,80,.9),0 6px 24px #000">20:00</div>`:'';
      if(t>=14.94)bot=panel(big(`זוכה ${Y('אחד')} 🏆`,58))}
    else{treasure.visible=true;const P=treasure.position,D=P.clone().setY(0).normalize(),k=Math.min(1,(t-16.12)/.6);
      cur.copy(P.clone().addScaledVector(D,-(9-4.5*k)).add(new THREE.Vector3(0,.8,0)));look.copy(P);
      key='h';top=panel(big(`זוכה אחד לוקח`,50));bot=`<div style="font:900 120px Heebo;color:#FFC24B;text-shadow:0 0 30px rgba(255,190,60,.9),0 6px 24px #000">20 ₪</div>`}
  }else if(t<20.32){ // chaque jour
    orbit(t,20,12,.35);key='i'+(t>=18.86?1:0);
    top=panel(big(`מי שבא ${Y('כל יום')} 📅`,56).replace('📅','☀️'));
    if(t>=18.86)mid=`<div class="pop" style="font:900 70px Heebo">יותר ${Y('צ׳אנסים')} 🍀</div><div style="font:900 64px Heebo;margin-top:10px">🎟️🎟️🎟️</div>`;
  }else if(t<24.9){ // CTA rythmé
    orbit(t,22,13,.3);
    if(t<21.66){key='j';mid=big(`אז מה אתם<br>${Y('מחכים')}? 😏`,76)}
    else{const n=t<22.64?1:t<23.66?2:3;key='k'+n;top=panel(big(`🐝 עכשיו!`,56));
      mid=[`1️⃣ כנסו ${Y('לכוורת')}`,`2️⃣ תתחילו ${Y('לאסוף')} 🌼`,`3️⃣ תייגו ${Y('חבר')} 👇`].slice(0,n).map((s,i)=>`<div class="${i===n-1?'pop':''}" style="font:900 58px Heebo;margin:12px 0">${s}</div>`).join('')}
  }else{ // fin
    orbit(t,24,13,.25);key='l';top=panel(big(`200 🌼 = 🎟️ · ${Y('20:00')} = 20 ₪`,46));
    mid=big(`${Y('בהצלחה')}… 🐝`,90);bot=`<div style="font:900 40px Heebo">הקישור לכוורת בביו 🔗</div>`;
  }
  if(kick>0){cur.x+=(Math.random()-.5)*kick*1.6;cur.y+=(Math.random()-.5)*kick*1.6}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){const nw=key.replace(/\d+$/,'')!==last.replace(/\d+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div class="pop">${bot}</div>`:''}
};
