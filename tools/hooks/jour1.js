started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
    loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;
    treasureHit=null;foundShown=true;const P=treasure.position.clone(),D=P.clone().setY(0).normalize();
    const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:5;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.85) 0%,rgba(26,17,8,.2) 30%,rgba(26,17,8,0) 50%,rgba(26,17,8,.75) 78%,rgba(26,17,8,.95) 100%)';document.body.appendChild(ov);
    const FL=document.createElement('div');FL.style.cssText='position:fixed;inset:0;z-index:8;background:#FFE7A8;opacity:0';document.body.appendChild(FL);
    const T=document.createElement('div');T.style.cssText='position:fixed;left:0;right:0;top:7%;z-index:6;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.6)';document.body.appendChild(T);
    const B=document.createElement('div');B.style.cssText='position:fixed;left:0;right:0;bottom:11%;z-index:6;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.6)';document.body.appendChild(B);
    const pill=(t)=>`<div style="display:inline-block;font:900 22px Heebo;background:#FFC24B;color:#1A1108;padding:7px 18px;border-radius:999px">${t}</div>`;
    const by=h=>bees.find(b=>b.handle===h);const fA=by('ofirrise'),fQ=by('rahelassouline'),fAd=by('hakaveret_shelanu');
    const NB=10,NQ=6;const cur=camera.position.clone(),look=new THREE.Vector3(0,16,0),tmp=new THREE.Vector3();
    window.capHook=(t)=>{
      const vis=t>=5.75;beeGroup.visible=vis;if(!vis&&angelHalo.parent){window._hp=angelHalo.parent;_hp.remove(angelHalo)}if(vis&&window._hp&&!angelHalo.parent)_hp.add(angelHalo);if(!vis)pool.forEach(s=>s.visible=false);
      FL.style.opacity=t>=5.75&&t<6.25?(1-(t-5.75)/.5)*.85:0;
      let cp,lk,k=.12;
      if(t<7.7){const a=.6+t*.05;cp=new THREE.Vector3(Math.sin(a)*(t<5.75?24:24-(t-5.75)*4),15,Math.cos(a)*(t<5.75?24:24-(t-5.75)*4));lk=new THREE.Vector3(0,14,0);k=t<.05?1:.08}
      else if(t<10.9){beeWorldPos(fA,tmp);cp=tmp.clone().add(new THREE.Vector3(4.6,1.4,4.6));lk=tmp.clone().add(new THREE.Vector3(0,.9,0));k=t<7.75?.06:.14}
      else if(t<15){beeWorldPos(fQ,tmp);cp=tmp.clone().add(new THREE.Vector3(-6,2,6));lk=tmp.clone().add(new THREE.Vector3(0,1.6,0));k=.14}
      else if(t<21.4){const e=Math.min(1,(t-15)/5),kk=e*e*(3-2*e);cp=new THREE.Vector3(0,P.y+7,0).lerp(P.clone().addScaledVector(D,-3.6).add(new THREE.Vector3(0,.6,0)),kk);lk=P.clone();k=t<15.1?.05:.2}
      else if(t<25.6){beeWorldPos(fAd,tmp);cp=tmp.clone().add(new THREE.Vector3(8,2.5,8));lk=tmp.clone().add(new THREE.Vector3(0,2.2,0));k=.1}
      else{const a=2+(t-25.6)*.12;cp=new THREE.Vector3(Math.sin(a)*(16-(t-25.6)),15,Math.cos(a)*(16-(t-25.6)));lk=new THREE.Vector3(0,14,0);k=.06}
      cur.lerp(cp,k);look.lerp(lk,k*1.3);camera.position.copy(cur);camera.lookAt(look);
      const day=pill('🐝 הכוורת שלנו · יום 1');let top=day,bot='';
      if(t<2.3)top+='<div style="font:900 56px/1.1 Heebo;margin-top:18px">לפני <span style="color:#FFC24B">24</span> שעות…</div>';
      else if(t<5.75)top+='<div style="font:900 50px/1.1 Heebo;margin-top:18px">הכוורת הייתה<br><span style="color:#FFC24B">ריקה</span></div>',bot='<div style="font:900 64px Heebo;opacity:.85">0 🐝</div>';
      else if(t<7.7){const c=Math.min(1,(t-5.9)/1.2);top+='<div style="font:900 52px/1.1 Heebo;margin-top:18px">תראו אותה<br><span style="color:#FFC24B">עכשיו</span> 🤯</div>';bot=`<div style="font:900 44px Heebo">🐝 ${Math.round(NB*Math.max(0,c))} דבורים · 👑 ${Math.round(NQ*Math.max(0,c))} מלכות</div>`}
      else if(t<10.9)top+='<div style="font:900 46px/1.15 Heebo;margin-top:18px">כל דבורה =<br><span style="color:#FFC24B">עוקב אמיתי</span> 🐝</div>';
      else if(t<15)top+='<div style="font:900 46px/1.15 Heebo;margin-top:18px">כל מלכה =<br><span style="color:#FFC24B">תגובה</span> 👑</div>';
      else if(t<18.7)top+='<div style="font:900 48px/1.1 Heebo;margin-top:18px">בתוך הכוורת מסתתר<br><span style="color:#FFC24B">50 ₪</span> 💸</div>';
      else if(t<21.4)top+='<div style="font:900 52px/1.1 Heebo;margin-top:18px">הראשון שמוצא<br><span style="color:#FFC24B">לוקח!</span> 🏆</div>';
      else if(t<25.6){top+='<div style="font:900 48px/1.15 Heebo;margin-top:18px">רוצים דבורה<br>עם <span style="color:#FFC24B">השם שלכם</span>?</div>';bot='<div style="font:900 40px/1.2 Heebo">כתבו <span style="color:#FFC24B">"דבורה"</span><br>בתגובות 👇</div>'}
      else{top+='<div style="font:900 42px/1.15 Heebo;margin-top:18px">💬 התגובה עם<br>הכי הרבה <span style="color:#FFC24B">לייקים</span></div>';bot='<div style="font:900 34px/1.2 Heebo">קובעת מה יקרה<br><span style="color:#FFC24B">מחר</span> בכוורת 🐝</div><div style="font:900 26px Heebo;color:#FFC24B;direction:ltr;margin-top:12px">hakaveret.online</div>'}
      T.innerHTML=top;B.innerHTML=bot;caption('')}