// Reel « יום 2 » (28.10) : voix de Shlomo (50 abeilles / ruche dorée / Ron / 3×20 ₪ / CTA) puis le météore du jour.
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;
lstore(EV_KEY,"1");lstore(MET_KEY,"1");capEl.style.display='none';
{const ts=document.getElementById('toast');if(ts)ts.style.display='none'}
const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:5;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.8) 0%,rgba(26,17,8,.15) 28%,rgba(26,17,8,0) 50%,rgba(26,17,8,.6) 80%,rgba(26,17,8,.9) 100%)';document.body.appendChild(ov);
const FL=document.createElement('div');FL.style.cssText='position:fixed;inset:0;z-index:8;background:#fff;opacity:0;pointer-events:none';document.body.appendChild(FL);
const T=document.createElement('div');T.style.cssText='position:fixed;left:0;right:0;top:6%;z-index:6;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.7)';document.body.appendChild(T);
const B=document.createElement('div');B.style.cssText='position:fixed;left:0;right:0;bottom:10%;z-index:6;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.7)';document.body.appendChild(B);
const pill=(t,bg)=>`<div style="display:inline-block;font:900 22px Heebo;background:${bg||'#FFC24B'};color:#1A1108;padding:7px 18px;border-radius:999px">${t}</div>`;
const big=(h,s)=>`<div style="font:900 ${s||54}px/1.1 Heebo;margin-top:14px">${h}</div>`;
const Y=s=>`<span style="color:#FFC24B">${s}</span>`;
const pop=(t,a)=>{const k=Math.max(0,Math.min(1,(t-a)/.18));return `transform:scale(${(1.25-.25*k).toFixed(3)});display:inline-block`};
const by=h=>bees.find(b=>b.handle===h);const fR=by('ronen18');
const cur=new THREE.Vector3(0,14,26),look=new THREE.Vector3(0,14,0),tmp=new THREE.Vector3();
// remappage du temps de l'événement 50 (16 s) sur 7,5 s de reel
const evE=t=>t<.5?5.2+t*2.8:t<2.9?6.6+(t-.5)/2.4*4.3:10.9+(t-2.9);
const N=Math.round(29.2*30);
window.capHook=(t)=>{
  if(t<1/29&&!EV.done)evStart(t);
  if(EV.on)EV.t0=t-evE(t);
  if(t>=22.5&&!MET.done){metStart(t);MET.t0=t-1.1}
  FL.style.opacity=t<.25?(1-t/.25):(t>=7.5&&t<7.8)?(1-(t-7.5)/.3)*.7:(t>=9.9&&t<10.2)?(1-(t-9.9)/.3)*.6:0;
  if(!EV.on&&!MET.on){let cp,lk,k=.12,sh=0;
    if(t<9.95){const u=(t-7.5)/2.45;const a=.4+u*1.2;cp=new THREE.Vector3(Math.sin(a)*(24-u*12),14+u*4,Math.cos(a)*(24-u*12));lk=new THREE.Vector3(0,16,0);sh=t>8.4?.25:0;k=.1}
    else if(t<15.2){beeWorldPos(fR,tmp);cp=tmp.clone().add(new THREE.Vector3(4.2,1.3,4.2));lk=tmp.clone().add(new THREE.Vector3(0,.8,0));k=t<10.05?.5:.16}
    else if(t<19.1){const a=-1+(t-15.2)*.5;cp=new THREE.Vector3(Math.sin(a)*8,22-(t-15.2)*2,Math.cos(a)*8);lk=new THREE.Vector3(0,8,0);k=t<15.3?.5:.12}
    else{const a=2+(t-19.1)*.25;cp=new THREE.Vector3(Math.sin(a)*(20-(t-19.1)),12,Math.cos(a)*(20-(t-19.1)));lk=new THREE.Vector3(0,13,0);k=t<19.2?.4:.08}
    cur.lerp(cp,k);look.lerp(lk,k*1.3);camera.position.copy(cur).add(new THREE.Vector3(Math.sin(t*41)*sh,Math.cos(t*33)*sh,0));camera.lookAt(look)}
  else{cur.copy(camera.position);look.set(0,14,0)}
  
  const day=pill('🐝 הכוורת שלנו · יום 2');let top=day,bot='';
  if(t<1.7){top=pill('😱 חכו לסוף…','#FF4D4D')+big(`<span style="${pop(t,0)}">${Y('50')} דבורים!!!</span>`,64)}
  else if(t<4.1)top+=big(`הכוורת הפכה<br><span style="${pop(t,1.7)}">${Y('לזהב')} ✨</span>`,58);
  else if(t<7.5){top+=big(`תוך ${Y('יום אחד')} ⏱️`,52);bot=big(`<span style="${pop(t,5.1)}">${Y('50')} אנשים אמיתיים 🐝</span>`,46)}
  else if(t<9.95)top+=big(`ואז קרה<br><span style="${pop(t,8.4)}">משהו ${Y('מטורף')} 🤯</span>`,60);
  else if(t<13.05){top+=big(`${Y('@ronen18')} מצא שטר`,48);bot=big(`<span style="${pop(t,11.5)}">תוך ${Y('63')} שניות ⏱️</span>`,46)}
  else if(t<15.2){top+=big(`וביקש <span style="${pop(t,13.4)}">${Y('להכפיל')}</span> אותו<br>לבן אדם הבא 💜`,48)}
  else if(t<19.1){top+=big('מהיום, כל יום 💸',50);bot=big(`<span style="${pop(t,16.2)}">${Y('3')} שטרות × ${Y('20 ₪')}</span>`,58)}
  else if(t<22.5){top+=big(`רוצים דבורה<br>עם ${Y('השם שלכם')}?`,50);bot=big(`<span style="${pop(t,20.8)}">כתבו ${Y('"דבורה"')} 👇</span>`,52)}
  else if(t<24.9){top=pill('🚨 ועכשיו… מהתגובות שלכם','#FF4D4D')+big(`<span style="${pop(t,23.3)}">☄️ ${Y('מטאור')}?!</span>`,70)}
  else if(t<27.3){top=pill('💥 בום','#FF4D4D')+big(`<span style="${pop(t,25)}">המטאור ${Y('פגע')}<br>בכוורת!!!</span>`,62);bot=big('ביקשתם… וזה קרה 🔥',40)}
  else{top=day+big(`ומה יקרה ${Y('מחר')}? 🤔`,52);bot=big(`התגובה עם הכי הרבה<br>${Y('לייקים')} קובעת 👇`,40)+`<div style="font:900 24px Heebo;color:#FFC24B;margin-top:10px">🔗 הקישור בביו</div>`}
  T.innerHTML=top;B.innerHTML=bot;
};
