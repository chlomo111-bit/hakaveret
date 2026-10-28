try{localStorage.setItem('kaveret_ev50','1')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;
MET.since=-100;
const T=document.createElement('div');T.style.cssText='position:fixed;left:0;right:0;top:6%;z-index:9;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.75)';document.body.appendChild(T);
const B=document.createElement('div');B.style.cssText='position:fixed;left:0;right:0;bottom:9%;z-index:9;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.75)';document.body.appendChild(B);
const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:4;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.7) 0%,rgba(26,17,8,0) 26%,rgba(26,17,8,0) 68%,rgba(26,17,8,.85) 100%)';document.body.appendChild(ov);
const pill=(t,bg)=>`<div style="display:inline-block;font:900 22px Heebo;background:${bg||'#FFC24B'};color:#1A1108;padding:7px 18px;border-radius:999px">${t}</div>`;
const card=(e,h,v,sub,col)=>`<div style="display:inline-block;background:rgba(26,17,8,.72);border:3px solid ${col};border-radius:26px;padding:16px 30px;margin-top:14px"><div style="font:900 44px Heebo">${e} <span dir="ltr">@${h}</span></div><div style="font:900 38px Heebo;color:${col}">${v}</div><div style="font:700 24px Heebo;opacity:.9">${sub}</div></div>`;
const by=h=>bees.find(b=>b.handle===h);let ended=false;const tmp=new THREE.Vector3(),cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,14,0);
window.capHook=(t)=>{if(!ended&&!MET.on&&!MET.done&&t<1)metStart(t);
  let top=pill('🐝 הכוורת שלנו · יום 2'),bot='';
  if(t>=9.2&&!ended){ended=true;if(MET.on)metEnd(t);caption('')}
  if(t<5.1){top+='<div style="font:900 52px/1.1 Heebo;margin-top:14px">ביקשתם…<br><span style="color:#FFC24B">וזה קרה!</span></div>'}
  else if(t<9.2){top+='<div style="margin-top:14px;display:inline-block;background:rgba(26,17,8,.72);border:2px solid #FFC24B;border-radius:22px;padding:12px 24px;font:900 30px/1.3 Heebo">💬 <span dir="ltr">@chlomo.assouline</span><br>"מטאור מפוצצת את הכוורת" 🤯<br><span style="color:#FFC24B">❤️ התגובה עם הכי הרבה לייקים</span></div>'}
  if(ended){let tg=null,off=null,k=.12;
    if(t<12.5){tg=by('ronen18');off=new THREE.Vector3(5,1.6,5);bot=card('❤️','ronen18','20 ₪ תוך 12 שניות','…וביקש להכפיל לבא בתור','#FF6B6B')}
    else if(t<16){tg=by('uriel_swissa');off=new THREE.Vector3(-5,1.6,5);bot=card('💜','uriel_swissa','40 ₪ תוך 22 שניות','השטר הסגול של רון','#B98CFF')}
    if(tg){beeWorldPos(tg,tmp);cur.lerp(tmp.clone().add(off),k);look.lerp(tmp.clone().add(new THREE.Vector3(0,.8,0)),k*1.3);top+='<div style="font:900 44px Heebo;margin-top:14px">🏆 הזוכים של <span style="color:#FFC24B">אתמול</span></div>'}
    else if(t<19.5){treasure.visible=true;const P=treasure.position,D=P.clone().setY(0).normalize();cur.lerp(P.clone().addScaledVector(D,-4).add(new THREE.Vector3(0,.8,0)),.1);look.lerp(P,.15);
      top+='<div style="font:900 52px/1.1 Heebo;margin-top:14px">היום מחכים<br><span style="color:#FFC24B">3 שטרות</span> 💸</div>';bot='<div style="font:900 60px Heebo;color:#FFC24B">20 ₪ × 3</div>'}
    else{treasure.visible=false;const a=(t-19.5)*.22;cur.lerp(new THREE.Vector3(Math.sin(a)*20,12,Math.cos(a)*20),.06);look.lerp(new THREE.Vector3(0,4,0),.06);
      top+='<div style="font:900 50px/1.1 Heebo;margin-top:14px">מה יקרה <span style="color:#FFC24B">מחר</span>?<br>אתם מחליטים 👇</div>';
      bot='<div style="font:900 40px/1.25 Heebo">כתבו בתגובות 💬<br><span style="color:#FFC24B">הכי הרבה לייקים = מתגשם</span></div>'}
    camera.position.copy(cur);camera.lookAt(look)}
  T.innerHTML=top;B.innerHTML=bot};
