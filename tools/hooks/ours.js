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
// reel 2.11 « ניצחנו את פו הדב » — minutage mot à mot (voix_ours.mp3, 29.7 s) + journal מהדורת הכוורת au milieu
const HITS=[0.06,0.9,2.84,4.84,6.02,8.0,14.5,17.2,17.92,18.42,19.1,19.46,20.38,23.48,26.16];
const BIG=new Set([0.06,8.0,14.5,23.48]);
const cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,8,0);let last='';
const bw=new THREE.Vector3(),fwd=new THREE.Vector3(-0.81,0,-0.59);
function atBear(R,Y,side,k){BEAR.getWorldPosition(bw);const sd=new THREE.Vector3(-fwd.z,0,fwd.x).multiplyScalar(side);cur.lerp(bw.clone().add(fwd.clone().multiplyScalar(R)).add(sd).add(new THREE.Vector3(0,Y,0)),k);look.lerp(bw.clone().add(new THREE.Vector3(0,3.2,0)),k)}
function orbitAt(c,t,R,Y,sp){const a=t*sp;cur.lerp(new THREE.Vector3(c.x+Math.sin(a)*R,c.y+Y,c.z+Math.cos(a)*R),.07);look.lerp(c.clone().add(new THREE.Vector3(0,3,0)),.07)}
const JD={user:'maayan_danon',text:'שהכוורת תעלה באש 🔥',likes:1,result:'🛡️ חומת הדבש הושלמה – 9,881 🌼!',show:'מהדורת הכוורת'};
const G=[['rahel',17.2],['zoharkoresh_',17.92],['yakirtal1',18.42],['shellydor20',19.1],['aviv_ben_shlush',19.46]];
const gchip=h=>`<div class="pop" style="display:inline-block;margin:8px;background:rgba(26,17,8,.82);border:4px solid #FFC24B;border-radius:22px;padding:10px 22px;font:900 44px Heebo" dir="ltr">🛡️ @${h}</div>`;
let stoned=false;
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  if(!stoned&&t>=13.9&&bearSt){stoned=true;bearSt.won=true;bearSt.statue=true;bearStatue(true)}
  let top='',mid='',bot='',key='';treasure.visible=false;
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.7:.35));fl.style.background=h===14.5?'#fff':'#FF7A2E';
  dark.style.opacity=t<.06?'1':'0';
  red.style.opacity=t<2.84?String(.35+.3*Math.sin(t*12)):(t<7.94?'.25':'0');
  if(t>=8.0&&t<14.5){if(JOURNAL.frame(t-8.0,JD)){T.innerHTML=M.innerHTML=B.innerHTML='';last='j';camera.position.copy(cur);camera.lookAt(look);return}}
  else JOURNAL.frame(-1,JD);
  if(t<2.84){key='a'+(t>=0.9?1:0);atBear(14-2*t,4,0,.12);top=live;
    mid=`<div class="pop" style="font:900 150px Heebo;color:#FF4B5C;text-shadow:0 0 40px rgba(255,60,80,.9),0 6px 24px #000">🚨 אזעקה!</div>`+(t>=0.9?big(`🐻 פו הדב ${Y('פרץ')} לכוורת!`,70):'')}
  else if(t<7.94){key='b'+(t>=4.84?1:0)+(t>=6.02?1:0);
    if(t<6.02)orbitAt(new THREE.Vector3(0,-2,0),t,26,10,.22);else atBear(12,3.5,2,.1);
    top=panel(big(`🔥 הכוורת ${R('בוערת')}!`,64));
    if(t>=4.84)mid=`<div style="font:900 40px Heebo;margin-bottom:10px">בדיוק כמו שביקשה…</div>${chip('maayan_danon')}`;
    if(t>=6.02)bot=`<div class="pop" style="font:900 72px Heebo;color:#FFC24B">🍯 והוא אוכל את כל הדבש!</div>`}
  else if(t<15.66){key='c';atBear(13,4,-2,.08);
    mid=`<div class="pop" style="font:900 120px/1.05 Heebo">🗿 ${Y('לפסל')}!</div>`+big(`לתמיד 🛡️`,72)}
  else if(t<20.38){key='d'+G.filter(g=>t>=g[1]).length;orbitAt((BEAR.getWorldPosition(bw),bw.clone()),t,15,7,.3);
    top=panel(big(`👑 תודה ל${Y('שומרי הכוורת')}`,54));mid=G.filter(g=>t>=g[1]).map(g=>gchip(g[0])).join('<br>')}
  else if(t<26.16){orbitAt(new THREE.Vector3(0,0,0),t,24,13,.18);key='e'+(t>=21.26?1:0)+(t>=23.48?1:0)+(t>=24.38?1:0);
    top=live+`<div style="font:900 64px Heebo;margin-top:14px">🎟️ הערב ב־<span dir="ltr">${Y('20:00')}</span></div>`;
    if(t>=21.26)mid=big(`הגרלה בשידור חי 🔴`,64);
    if(t>=23.48)mid+=`<div class="pop" style="font:900 130px/1 Heebo;color:#FFE45C;text-shadow:0 0 40px rgba(255,200,60,.9),0 6px 24px #000;margin-top:14px">2000 🌼</div>`;
    if(t>=24.38)bot=panel(big(`✨ והזוכה בוחר/ת מה יקרה מחר!`,50))}
  else{orbitAt(new THREE.Vector3(0,0,0),t,28,15,.12);key='f'+(t>=27.48?1:0);
    mid=`<div class="pop" style="font:900 110px/1.1 Heebo">מה יקרה<br>${Y('מחר')}? 👀</div>`;
    if(t>=27.48)bot=`<div style="font:900 44px Heebo">💬 התגובה עם הכי הרבה לייקים קובעת</div><div style="font:900 40px Heebo;margin-top:14px">🔗 הקישור לכוורת בביו</div>`}
  if(kick>0){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?1.4:.7);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?1.4:.7)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){const nw=key.replace(/\d+$/,'')!==last.replace(/\d+$/,'');last=key;
    T.innerHTML=top?`<div class="${nw?'pop':''}">${top}</div>`:'';M.innerHTML=mid?`<div class="${nw?'pop':''}">${mid}</div>`:'';B.innerHTML=bot?`<div>${bot}</div>`:''}
};
bearTick();
