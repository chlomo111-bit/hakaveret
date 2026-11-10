try{localStorage.setItem('kaveret_ev50','1');localStorage.setItem('kaveret_ev100','1')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;MET.since=-100;treasure.visible=false;
try{capEl.style.display="none"}catch(e){}
try{flowers.forEach(f=>f.visible=false);petals.visible=false}catch(e){}
const css=document.createElement('style');css.textContent='@keyframes pop{0%{transform:scale(.4);opacity:0}55%{transform:scale(1.18);opacity:1}100%{transform:scale(1)}}.pop{animation:pop .28s ease-out both}@keyframes blink{50%{opacity:.35}}.blink{animation:blink .8s infinite}#jr .likes{display:none!important}';document.head.appendChild(css);
const mk=(z,s)=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;z-index:'+z+';text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 22px rgba(0,0,0,.85);padding:0 18px;'+s;document.body.appendChild(d);return d};
const T=mk(9,'top:11%'),M=mk(9,'top:34%'),B=mk(9,'bottom:12%');
mk(4,'inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,8,30,.75) 0%,rgba(10,8,30,0) 30%,rgba(10,8,30,0) 62%,rgba(10,8,30,.88) 100%)');
const dark=mk(6,'inset:0;pointer-events:none;background:#05031a;opacity:0');
const fl=mk(8,'inset:0;pointer-events:none;background:#fff;opacity:0');
const Y=s=>`<span style="color:#FFC24B">${s}</span>`;
const big=(s,sz)=>`<div style="font:900 ${sz||60}px/1.12 Heebo">${s}</div>`;
const panel=s=>`<div style="display:inline-block;background:rgba(20,14,40,.72);border-radius:26px;padding:12px 26px">${s}</div>`;
const chip=(h,sz)=>`<div style="display:inline-block;background:rgba(26,17,8,.85);border:4px solid #FFC24B;border-radius:24px;padding:10px 26px;font:900 ${sz||44}px Heebo" dir="ltr">@${h}</div>`;
const quote=s=>`<div style="display:inline-block;margin-top:12px;background:#fff;color:#1A1108;border-radius:22px;padding:10px 24px;font:900 34px/1.2 Heebo;text-shadow:none">💬 ${s}</div>`;

// reel 10.11 « מי יקבל את הכתר? » — minutage mot à mot (voix Juniper eleven_v4, 32,7 s)
const HITS=[0.08,1.76,2.78,4.96,7.04,8.38,9.96,12.48,14.28,15.04,17.76,19.98,21.56,22.88,24.66,26.32,27.8,29.52,30.68];
const BIG=new Set([0.08,8.38,21.56,24.66]);
const cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,8,0);let last='';
const bw=new THREE.Vector3(),fwd=new THREE.Vector3(-0.81,0,-0.59),side=new THREE.Vector3(0.59,0,-0.81);
const B0=new THREE.Vector3(4,-5.6,-2);
function atBear(R,Yy,sd,k,ly){BEAR.getWorldPosition(bw);cur.lerp(bw.clone().add(fwd.clone().multiplyScalar(R)).add(side.clone().multiplyScalar(sd)).add(new THREE.Vector3(0,Yy,0)),k);look.lerp(bw.clone().add(new THREE.Vector3(0,ly||4.6,0)),k)}
function orbitAt(c,t,R,Yy,sp,ly){const a=t*sp;cur.lerp(new THREE.Vector3(c.x+Math.sin(a)*R,c.y+Yy,c.z+Math.cos(a)*R),.07);look.lerp(c.clone().add(new THREE.Vector3(0,ly||3,0)),.07)}
const JD={user:'shahar_b.y',text:'אני רוצה שירד בכוורת גשם של דבש',likes:0,result:'🍯 הלילה: גשם של דבש בכוורת!',show:'מהדורת הכוורת'};
const GOLD=new THREE.MeshBasicMaterial({color:0xFFC81E});const crown=new THREE.Group();
[[0,0,0,2.4,.4,2.1],[-.95,.45,.85,.35,.6,.35],[.95,.45,.85,.35,.6,.35],[0,.55,.85,.35,.8,.35],[-.95,.45,-.85,.35,.6,.35],[.95,.45,-.85,.35,.6,.35]].forEach(c=>{const m=new THREE.Mesh(new THREE.BoxGeometry(c[3],c[4],c[5]),GOLD);m.position.set(c[0],c[1],c[2]);crown.add(m)});
const halo=new THREE.PointLight(0xffd36b,2,14,2);crown.add(halo);
hive.add(crown);
window.pickLabels=function(){shown=[];pool.forEach(s=>s.visible=false)};
BEAR.position.copy(B0);bearStatue(false);BEAR.getWorldPosition(bw);
// gros plan : la couronne flotte devant le visage de l'ours
const C0=bw.clone().add(new THREE.Vector3(0,7.4,0));
// pluie de miel : cubes dorés qui tombent
const HONEY=new THREE.MeshBasicMaterial({color:0xFF7A00}),drops=[];
for(let i=0;i<170;i++){const s=.7+Math.random()*.6;const m=new THREE.Mesh(new THREE.BoxGeometry(s,s*1.5,s),HONEY);const a=Math.random()*6.28,r=3+Math.random()*16;m.userData={x:B0.x+Math.cos(a)*r,z:B0.z+Math.sin(a)*r,y0:Math.random()*34,v:7+Math.random()*6};m.visible=false;hive.add(m);drops.push(m)}
const badge=mk(30,'top:3.2%;left:auto;right:4%;padding:0');badge.innerHTML='<div style="display:inline-block;background:rgba(14,8,30,.72);border:2px solid rgba(255,194,75,.7);border-radius:999px;padding:5px 14px;font:900 14px Heebo;color:#FFE38A;text-shadow:none">🐝 הכוורת שלנו · מרוץ הכתר</div>';
const band=mk(21,'bottom:14%;padding:0');
const SH=['שלי למלוכה','שלי למלוכה','שלי למלכות','שלי למלוכה','איימ באק 😂','שבתי 👋','שלי למלוכה'];
window.capHook=(t)=>{
  try{flowers.forEach(f=>f.visible=false)}catch(e){}
  try{pool.forEach(s=>s.visible=false);shown=[]}catch(e){}
  BEAR.visible=true;crackSt=null;bearStatue(false);BEAR.position.copy(B0);BEAR.rotation.y=-2.2+Math.sin(t*1.3)*.25;treasure.visible=false;
  // couronne : devant la caméra au début, puis au-dessus de l'ours
  if(t<2.72){crown.position.copy(C0);crown.position.y+=Math.sin(t*3)*.15;crown.rotation.y=t*1.6;crown.scale.setScalar(1.1)}
  else{BEAR.getWorldPosition(bw);crown.position.copy(bw).add(new THREE.Vector3(0,6.6+Math.sin(t*2)*.2,0));crown.rotation.y=t*.8;crown.scale.setScalar(1)}
  const rain=t>=21.4;drops.forEach(d=>{d.visible=rain;if(rain){const u=d.userData,y=u.y0+24-((t-21.4)*u.v)%34;d.position.set(u.x,y-6,u.z);d.rotation.set(t*u.v*.2,t,0)}});
  let top='',mid='',bot='',key='',bd='';
  let h=-9;for(const x of HITS)if(t>=x)h=x;const dt=t-h,kick=dt<.4?Math.exp(-dt*(BIG.has(h)?5:9)):0;
  fl.style.opacity=String(kick*(BIG.has(h)?.5:.22));fl.style.background=BIG.has(h)?'#fff':'#FFC24B';
  dark.style.opacity=String(t>=19.9?.35:0);
  // journal télé : le vœu de @shahar_b.y (19,9 → 24,4, accéléré)
  if(t>=19.9&&t<24.4){if(JOURNAL.frame((t-19.9)*6.5/4.5,JD)){T.innerHTML=M.innerHTML=B.innerHTML='';band.innerHTML='';last='j';camera.position.copy(cur);camera.lookAt(look);return}}
  else JOURNAL.frame(-1,JD);
  if(t<2.72){key='a'+(t>=1.2?1:0);cur.copy(C0.clone().add(fwd.clone().multiplyScalar(15-t*1.6)).add(side.clone().multiplyScalar(1.5)).add(new THREE.Vector3(0,1.2,0)));look.copy(C0.clone().add(new THREE.Vector3(0,-1.6,0)));
    top=`<div class="pop">${chip('shellydor20',46)}</div>`;
    if(t>=1.2)bot=`<div class="pop" style="display:inline-block;background:rgba(14,8,30,.85);border-radius:28px;padding:14px 30px;font:900 54px/1.15 Heebo">שלי חזרה…<br>והיא רוצה את ${Y('הכתר')}! 👑</div>`}
  else if(t<4.96){key='b';orbitAt(new THREE.Vector3(0,2,0),t,24,9,.25,3);
    mid=`<div class="pop" style="display:inline-block;background:#FFC24B;color:#1A1108;font:900 30px Heebo;padding:10px 30px;border-radius:999px;text-shadow:none">🐝 הכוורת שלנו</div><div style="margin-top:16px">${panel(big(`כל עוקב = ${Y('דבורה')}`,46))}</div>`}
  else if(t<8.26){key='c'+(t>=6.52?1:0);orbitAt(new THREE.Vector3(0,2,0),t,17,4,.3,4);
    top=panel(big(`אתמול: ${Y('92')} 🐝`,48))+(t>=6.52?`<div class="pop" style="margin-top:14px">${panel(big(`היום: ${Y('93')} 🐝🐝`,58))}</div>`:'')}
  else if(t<12.41){key='d'+(t>=9.96?1:0);atBear(12,5,-1.5,.07,5.8);
    top=panel(big(`🐻 פו הדב ${Y('התעורר')}…`,44));if(t>=9.96)bot=`<div class="pop" style="display:inline-block;background:rgba(14,8,30,.85);border-radius:24px;padding:12px 28px;font:900 40px/1.2 Heebo">הכוורת צריכה<br>${Y('מלך או מלכה')} 👑</div>`}
  else if(t<14.28){key='e';atBear(16,7,4,.05,4);
    top=`<div class="pop">${chip('shahar_b.y')}</div><div class="pop">${quote('אני המובילה במירוץ לכתר 😃')}</div>`}
  else if(t<17.76){const n=Math.min(7,Math.floor((t-15.0)/0.32)+1);key='f'+(t>=15?n:0);orbitAt(new THREE.Vector3(0,2,0),t,15,5,.4,4);
    top=`<div class="pop">${chip('shellydor20')}</div>`;
    if(t>=15)mid=`<div style="margin-top:6px">${SH.slice(0,n).map((s,i)=>`<div class="${i===n-1?'pop':''}" style="display:inline-block;margin:5px;background:#fff;color:#1A1108;border-radius:18px;padding:6px 16px;font:900 26px Heebo;text-shadow:none;transform:rotate(${(i%2?3:-3)}deg)">${s}</div>`).join('')}</div>`;
    if(t>=16.1)bot=`<div class="pop" style="display:inline-block;background:#FFC24B;color:#1A1108;border-radius:22px;padding:10px 28px;font:900 44px Heebo;text-shadow:none">7 פעמים! 😂</div>`}
  else if(t<19.9){key='g';atBear(10,3,-3,.06,5);
    top=`<div class="pop">${chip('ori.adin')}</div><div class="pop">${quote('תצביעו לי')}</div>`}
  else if(t<27.8){key='h'+(t>=26.32?1:0);orbitAt(new THREE.Vector3(0,2,0),t,20,7,.22,4);
    top=panel(big(`אז מי מקבל את ${Y('הכתר')}? 👑`,44));
    mid=`<div style="margin-top:10px">${['shahar_b.y','shellydor20','ori.adin'].map(h=>`<div class="pop" style="display:inline-block;margin:6px;background:rgba(26,17,8,.85);border:3px solid #FFC24B;border-radius:18px;padding:6px 16px;font:900 27px Heebo" dir="ltr">@${h}</div>`).join('')}<div class="pop" style="display:inline-block;margin:6px;background:rgba(26,17,8,.85);border:3px dashed #fff;border-radius:18px;padding:6px 16px;font:900 27px Heebo">…או אתם? 🫵</div></div>`;
    if(t>=26.32)bot=`<div class="pop" style="display:inline-block;background:#fff;color:#1A1108;border-radius:24px;padding:12px 30px;font:900 44px Heebo;text-shadow:none">כתבו את השם בתגובות 👇</div>`}
  else if(t<30.48){key='i'+(t>=29.52?1:0);atBear(9,4,1,.08,6.4);
    mid=panel(big(`הכי הרבה קולות<br>= ${Y('הכתר')} 👑`,50));if(t>=29.52)bot=`<div class="pop" style="font:900 70px Heebo;color:#FFC24B">מנצח! 🏆</div>`}
  else{key='k';atBear(14,6,2,.05,6);
    mid=panel(big(`מי יקבל את ${Y('הכתר')}? 👑`,44));
    bot=`<div class="pop" style="display:inline-block;background:#FFC24B;color:#1A1108;border-radius:24px;padding:14px 30px;font:900 40px/1.2 Heebo;text-shadow:none">📩 שלחו לחבר<br>שיצביע בשבילכם</div>`}
  if(kick>0&&key[0]!=='a'){cur.x+=(Math.random()-.5)*kick*(BIG.has(h)?1.2:.5);cur.y+=(Math.random()-.5)*kick*(BIG.has(h)?1.2:.5)}
  camera.position.copy(cur);camera.lookAt(look);
  if(key!==last){last=key;T.innerHTML=top;M.innerHTML=mid;B.innerHTML=bot;band.innerHTML=bd}
};
