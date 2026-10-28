started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;
treasureHit=null;foundShown=true;
const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:4;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.75) 0%,rgba(26,17,8,0) 28%,rgba(26,17,8,0) 70%,rgba(26,17,8,.85) 100%)';document.body.appendChild(ov);
const T=document.createElement('div');T.style.cssText='position:fixed;left:0;right:0;top:7%;z-index:9;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.7)';document.body.appendChild(T);
const B=document.createElement('div');B.style.cssText='position:fixed;left:0;right:0;bottom:10%;z-index:9;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.7)';document.body.appendChild(B);
const pill=(t)=>`<div style="display:inline-block;font:900 22px Heebo;background:#FFC24B;color:#1A1108;padding:7px 18px;border-radius:999px">${t}</div>`;
let endT=null;
window.capHook=(t)=>{
  let top=pill('🐝 הכוורת שלנו · יום 2'),bot='';
  if(!EV.done&&!EV.on){top+='<div style="font:900 54px/1.1 Heebo;margin-top:16px">משהו <span style="color:#FFC24B">מטורף</span><br>קרה בכוורת 😱</div>';bot='<div style="font:900 30px Heebo">חכו לסוף…</div>'}
  else if(EV.on){bot='<div style="font:900 30px Heebo;opacity:.9">83 דבורים אמיתיות 🐝</div>'}
  else{if(endT===null)endT=t;const a=(t-endT)*.25;camera.position.set(Math.sin(a)*22,16,Math.cos(a)*22);camera.lookAt(0,15,0);
    top+='<div style="font:900 50px/1.1 Heebo;margin-top:16px">רוצים דבורה<br>עם <span style="color:#FFC24B">השם שלכם</span>?</div>';
    bot='<div style="font:900 40px/1.2 Heebo">כתבו <span style="color:#FFC24B">"דבורה"</span> בתגובות 👇</div><div style="font:900 26px Heebo;margin-top:10px">💸 3 שטרות של 20 ₪ כל יום · הקישור בביו</div>'}
  T.innerHTML=top;B.innerHTML=bot};
