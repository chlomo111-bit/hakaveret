try{localStorage.setItem('kaveret_ev50','1');localStorage.removeItem('kaveret_ev100')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;MET.since=-100;treasure.visible=false;
try{capEl.style.display="none"}catch(e){}
const css=document.createElement('style');css.textContent='@keyframes pop{0%{transform:scale(.4);opacity:0}55%{transform:scale(1.18);opacity:1}100%{transform:scale(1)}}.pop{animation:pop .28s ease-out both}';document.head.appendChild(css);
const mk=(z,s)=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;z-index:'+z+';text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 22px rgba(0,0,0,.85);padding:0 18px;'+s;document.body.appendChild(d);return d};
const T=mk(9,'top:7%'),M=mk(9,'top:38%'),B=mk(9,'bottom:9%');
mk(4,'inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,8,30,.7) 0%,rgba(10,8,30,0) 30%,rgba(10,8,30,0) 64%,rgba(10,8,30,.85) 100%)');
const fl=mk(8,'inset:0;pointer-events:none;background:#fff;opacity:0');
const Y=s=>`<span style="color:#FFC24B">${s}</span>`;
const big=(s,sz)=>`<div style="font:900 ${sz||60}px/1.1 Heebo">${s}</div>`;
const panel=s=>`<div style="display:inline-block;background:rgba(20,14,40,.62);border-radius:26px;padding:10px 24px">${s}</div>`;
// minutage mot à mot (transcription de voix_espace.mp3)
const START=4.6; // départ de l'événement du jeu → décollage à 10.1 (juste après « אחת »)
const HITS=[2.2,4.96,7.46,8.6,9.62,10.1,12.46,15.9,18.62,20.9,24.0];
let started2=false,last='';const cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,12,0);
function orbit(t,r,y,sp){const a=t*sp;cur.lerp(new THREE.Vector3(Math.sin(a)*r,y,Math.cos(a)*r),.08);look.lerp(new THREE.Vector3(0,y*.5,0),.08)}
window.capHook=(t)=>{
  let top='',mid='',bot='',key='';treasure.visible=false;
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.35?Math.exp(-dt*9):0;fl.style.opacity=String(kick*.45);
  if(t>=START&&!started2){started2=true;E2.on=true;E2.done=true;E2.t0=t;E2.step=0;E2.hud=[];E2.side=false;EV.form={k:0,tg:formTargets(bees.length,"100")}}
  if(t<1.38){key='a';mid=big(`חבר'ה… 🤫`,74)}
  else if(t<3.24){key='b';const n=t<2.2?Math.round(97+3*(t-1.38)/.82):100;mid=`<div style="font:900 ${t>=2.2?200:160}px Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000">${n}</div><div style="font:900 56px Heebo">דבורים 🐝</div>`;key+=n}
  else if(t<6.64){key='c'+(t>=4.96?1:0);top=panel(big(`ומישהי כתבה בתגובות…`,46));
    mid=`<div class="pop" style="display:inline-block;direction:rtl;text-align:right;background:rgba(255,255,255,.95);color:#1A1108;border-radius:22px;padding:12px 22px;text-shadow:none"><div style="font:700 22px Heebo;opacity:.6" dir="ltr">@rahelassouline</div><div style="font:900 ${t>=4.96?64:40}px Heebo">טילל 🚀</div></div>`}
  else if(t<10.1){const n=t<7.46?'':t<8.6?'3':t<9.62?'2':'1';key='d'+n;mid=n?`<div class="pop" style="font:900 260px Heebo;color:#FF5A3C;text-shadow:0 0 50px rgba(255,90,60,.9),0 8px 30px #000">${n}</div>`:big(`אז…`,90)}
  else if(t<12.46){key='e';mid=big(`הכוורת<br>${Y('ממריאה')}!!! 🚀`,84)}
  else if(t<14.4){key='f';top=panel(big(`${Y('100')} דבורים <span style="color:#B9A8FF">בחלל</span> 🌌`,54))}
  else if(t<16.68){key='g';mid=`<div class="pop" style="font:900 120px Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000">×2</div>`;top=panel(big(`היום כל ${Y('אבקה')} שווה כפול 🌼`,48))}
  else if(t<19.86){key='h'+(t>=17.5?1:0)+(t>=18.62?1:0);top=panel(big(`אספו ${Y('200')} 🌼`,58));
    if(t>=17.5)mid=`<div style="font:900 150px Heebo;text-shadow:0 0 30px rgba(255,80,80,.9),0 6px 24px #000">20:00</div>`;
    if(t>=18.62)bot=`<div class="pop" style="font:900 110px Heebo;color:#FFC24B;text-shadow:0 0 30px rgba(255,190,60,.9),0 6px 24px #000">20 ₪</div>`}
  else if(t<24.02){key='i'+(t>=20.9?1:0)+(t>=22.12?1:0);top=panel(big(`ואם נגיע ל…`,52));
    if(t>=20.9)mid=`<div class="pop" style="font:900 200px Heebo;color:#B9A8FF;text-shadow:0 0 40px rgba(160,140,255,.9),0 6px 24px #000">150</div>`;
    if(t>=22.12)bot=panel(big(`משהו עוד יותר ${Y('משוגע')} 🤯`,50))}
  else{key='z';mid=big(`בזזזז 🐝`,90);bot=`<div style="font:900 40px Heebo">הקישור לכוורת בביו 🔗 · תייגו חבר 👇</div>`}
  if(!E2.on){orbit(t,22,13,.3);if(kick>0){cur.x+=(Math.random()-.5)*kick*1.2;cur.y+=(Math.random()-.5)*kick*1.2}camera.position.copy(cur);camera.lookAt(look)}
  else{cur.copy(camera.position);look.set(0,14,0)}
  if(key!==last){const nw=key.replace(/\d+$/,'')!==last.replace(/\d+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div>${bot}</div>`:''}
};
