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
// reel 3.11 « פרק 1: מסיבה בכוורת » — minutage mot à mot (voix_ep1.mp3, 40.1 s) + journal au milieu (15.9 → 22.4)
window.PARTY_FORCE=true;
const HITS=[0.24,2.68,3.54,5.16,6.06,7.02,7.92,10.12,11.18,12.76,13.58,14.82,15.9,22.4,22.96,24.62,26.12,27.9,29.7,31.66,33.38,34.68,35.98,38.08];
const BIG=new Set([2.68,13.58,15.9,26.12,33.38]);
const cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,8,0);let last='';
const bw=new THREE.Vector3(),fwd=new THREE.Vector3(-0.81,0,-0.59);
function atBear(R,Yy,side,k){BEAR.getWorldPosition(bw);const sd=new THREE.Vector3(-fwd.z,0,fwd.x).multiplyScalar(side);cur.lerp(bw.clone().add(fwd.clone().multiplyScalar(R)).add(sd).add(new THREE.Vector3(0,Yy,0)),k);look.lerp(bw.clone().add(new THREE.Vector3(0,4.6,0)),k)}
function orbitAt(c,t,R,Yy,sp,ly){const a=t*sp;cur.lerp(new THREE.Vector3(c.x+Math.sin(a)*R,c.y+Yy,c.z+Math.cos(a)*R),.07);look.lerp(c.clone().add(new THREE.Vector3(0,ly||3,0)),.07)}
const JD={user:'shellydor20',text:'מחר יש מסיבה לכל חברי הכוורת ❤️',likes:1,result:'🎉 המסיבה יצאה לדרך!',show:'מהדורת הכוורת'};
const eye=new THREE.Mesh(new THREE.BoxGeometry(.55,.55,.3),new THREE.MeshBasicMaterial({color:0xff1a2e}));eye.position.set(-.6,5.6,1.22);eye.visible=false;BEAR.add(eye);
const eyeL=new THREE.PointLight(0xff2030,0,12,1.6);eyeL.position.set(-.6,5.6,2);BEAR.add(eyeL);
const pchip=(h,pre)=>`<div class="pop" style="display:inline-block;margin:8px;background:rgba(26,17,8,.82);border:4px solid #FFC24B;border-radius:22px;padding:10px 24px;font:900 50px Heebo" dir="ltr">${pre} @${h}</div>`;
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  let top='',mid='',bot='',key='';treasure.visible=false;
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.6:.3));fl.style.background=h===33.38?'#FF1A2E':(h===15.9?'#fff':'#FF7ACB');
  const sus=t<2.6?1:(t>=29.5&&t<34.6?Math.min(1,(t-29.5)/1.2):0);
  dark.style.background='#0a0420';dark.style.opacity=String(t<0.24?1:sus*.55);
  red.style.opacity=t>=33.38&&t<34.6?String(.5+.3*Math.sin(t*14)):'0';
  const eyeOn=t>=33.38;eye.visible=eyeOn;eyeL.intensity=eyeOn?3:0;
  if(t>=15.9&&t<22.4){if(JOURNAL.frame(t-15.9,JD)){T.innerHTML=M.innerHTML=B.innerHTML='';last='j';camera.position.copy(cur);camera.lookAt(look);return}}
  else JOURNAL.frame(-1,JD);
  if(t<2.6){key='a'+(t>=1.14?1:0);atBear(16-2.2*t,5,1.5,.1);
    if(t>=0.24)mid=`<div style="font:900 74px/1.15 Heebo;color:#B9A8FF;text-shadow:0 0 30px rgba(120,90,255,.8),0 6px 24px #000">משהו מוזר${t>=1.14?'<br>קורה בכוורת…':''}</div>`}
  else if(t<5.1){key='b'+(t>=3.54?1:0);orbitAt(new THREE.Vector3(0,6,0),t,24,4,.35,8);
    mid=`<div class="pop" style="font:900 150px/1 Heebo;color:#FFC24B;text-shadow:0 0 40px rgba(255,190,60,.8),0 6px 24px #000">פרק 1</div>`+(t>=3.54?big(`🪩 מסיבה בכוורת!`,84):'')}
  else if(t<10.0){key='c'+(t>=6.06?1:0)+(t>=7.02?1:0)+(t>=7.92?1:0);orbitAt(new THREE.Vector3(0,2,0),t,18,3,.3,4);
    top=panel(big(`👋 חדשים פה?`,58));
    const L=[];if(t>=6.06)L.push(`🐝 כל עוקב = ${Y('דבורה')}`);if(t>=7.02)L.push(`🌼 אוספים ${Y('אבקה')}`);if(t>=7.92)L.push(`🎟️ כל ערב ב־<span dir="ltr">${Y('20:00')}</span> הגרלה`);
    mid=L.map((s,i)=>`<div class="${i===L.length-1?'pop':''}" style="font:900 64px/1.5 Heebo">${s}</div>`).join('')}
  else if(t<15.85){key='d'+(t>=11.18?1:0)+(t>=12.76?1:0)+(t>=13.58?1:0)+(t>=14.82?1:0);orbitAt(new THREE.Vector3(0,4,0),t,22+(t-10)*.6,2+(t-10)*1.4,.2,6);
    top=panel(big(`📈 הכוורת ${Y('גדלה')}`,58));
    mid=`<div style="font:900 52px Heebo">יום ראשון</div>`+(t>=11.18?`<div class="pop" style="font:900 96px Heebo">4,705 🌼</div>`:'');
    if(t>=12.76)mid+=`<div style="font:900 52px Heebo;margin-top:18px">אתמול</div>`;
    if(t>=13.58)mid+=`<div class="pop" style="font:900 130px/1.05 Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000">15,160 🌼</div>`;
    if(t>=14.82)bot=`<div class="pop" style="font:900 110px Heebo;color:#FF7ACB">×3 🚀</div>`}
  else if(t<26.0){key='f'+(t>=22.96?1:0)+(t>=24.62?1:0);atBear(13,4,-2,.08);
    if(t>=22.96)mid=`<div class="pop" style="font:900 92px/1.12 Heebo">🐻 פו הדב<br>הפך ל${Y('פסל')} 🗿</div>`;
    if(t>=24.62)bot=pchip('shellydor20','👑')+big(`זכתה בהגרלה 🎉`,60)}
  else if(t<29.5){key='g'+(t>=27.9?1:0);orbitAt(new THREE.Vector3(0,6,0),t,20,2,.55,9);
    mid=t<27.9?`<div class="pop" style="font:900 100px/1.1 Heebo">🪩 כל הדבורים<br>${Y('רוקדות!')}</div>`:`<div class="pop" style="font:900 84px/1.15 Heebo">🦁 אפילו<br>${Y('האריה של רחל')}!</div>`;
    if(t>=27.9)bot=pchip('rahelassouline','🦁')}
  else if(t<34.6){key='h'+(t>=31.66?1:0)+(t>=33.38?1:0);atBear(t<33.38?17-(t-29.5)*2.4:7.5,t<33.38?5:5.2,.6,t<33.38?.06:.25);
    mid=t<33.38?`<div style="font:900 64px/1.2 Heebo;color:#B9A8FF">אבל בזמן שכולם רוקדים…</div>`+(t>=31.66?big(`הפסל של פו הדב…`,70):''):big(`הפסל של פו הדב…`,66);
    if(t>=33.38)bot=`<div class="pop" style="font:900 86px/1 Heebo;color:#FF4B5C;text-shadow:0 0 40px rgba(255,40,60,.95),0 6px 24px #000">👁️ פקח עין!</div>`}
  else{key='i'+(t>=35.98?1:0)+(t>=38.08?1:0);atBear(9+(t-34.6)*2.5,5+(t-34.6)*1.2,1,.05);
    mid=`<div class="pop" style="font:900 104px/1.1 Heebo">מה יקרה<br>ב${Y('פרק 2')}? 👀</div>`;
    if(t>=35.98)bot=`<div style="font:900 46px Heebo">💬 התגובה עם הכי הרבה לייקים קובעת</div>`;
    if(t>=38.08)bot+=`<div class="pop" style="font:900 50px Heebo;margin-top:14px;color:#FFC24B">📲 שלחו לחבר שחייב לראות</div><div style="font:900 40px Heebo;margin-top:10px">🔗 הקישור לכוורת בביו</div>`}
  if(kick>0){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?1.4:.7);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?1.4:.7)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){const nw=key.replace(/\d+$/,'')!==last.replace(/\d+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div>${bot}</div>`:''}
};
bearTick();
