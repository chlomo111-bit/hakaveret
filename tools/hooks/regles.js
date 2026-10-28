try{localStorage.setItem('kaveret_ev50','1')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();document.getElementById('ui').style.display='none';controls.enabled=false;treasureHit=null;foundShown=true;
MET.since=-100;treasure.visible=false;
const css=document.createElement('style');css.textContent='@keyframes pop{0%{transform:scale(.55);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:scale(1)}}.pop{animation:pop .35s ease-out both}@keyframes wob{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}.wob{display:inline-block;animation:wob .5s ease-in-out infinite}';document.head.appendChild(css);
const T=document.createElement('div');T.style.cssText='position:fixed;left:0;right:0;top:5%;z-index:9;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.8);padding:0 18px';document.body.appendChild(T);
const B=document.createElement('div');B.style.cssText='position:fixed;left:0;right:0;bottom:8%;z-index:9;text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.8);padding:0 18px';document.body.appendChild(B);
const ov=document.createElement('div');ov.style.cssText='position:fixed;inset:0;z-index:4;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.75) 0%,rgba(26,17,8,0) 30%,rgba(26,17,8,0) 64%,rgba(26,17,8,.88) 100%)';document.body.appendChild(ov);
const fl=document.createElement('div');fl.style.cssText='position:fixed;inset:0;z-index:8;pointer-events:none;background:#fff;opacity:0';document.body.appendChild(fl);
const Y=s=>`<span style="color:#FFC24B">${s}</span>`;
const pill=(t,bg)=>`<div style="display:inline-block;font:900 22px Heebo;background:${bg||'#FFC24B'};color:#1A1108;padding:7px 18px;border-radius:999px;text-shadow:none">${t}</div>`;
const big=(s,sz)=>`<div style="font:900 ${sz||54}px/1.12 Heebo;margin-top:12px">${s}</div>`;
const cmt=(h,txt,likes)=>`<div style="display:inline-block;direction:rtl;text-align:right;background:rgba(255,255,255,.95);color:#1A1108;border-radius:22px;padding:12px 20px;margin-top:12px;text-shadow:none;box-shadow:0 8px 30px rgba(0,0,0,.4)"><div style="font:700 20px Heebo;opacity:.6" dir="ltr">@${h}</div><div style="font:900 34px Heebo">${txt}</div>${likes?`<div style="font:700 20px Heebo;color:#E0245E">❤️ ${likes}</div>`:''}</div>`;
const step=(n,s)=>`<div style="display:inline-block;background:#FFC24B;color:#1A1108;font:900 40px Heebo;width:62px;height:62px;line-height:62px;border-radius:50%;text-shadow:none;margin-bottom:6px">${n}</div>`+big(s,50);
const by=h=>bees.find(b=>b.handle===h);
const tmp=new THREE.Vector3(),cur=new THREE.Vector3(0,16,26),look=new THREE.Vector3(0,14,0);
// Sections calées sur la voix (voix_regles.mp3, 78.6 s)
const S={intro:0,s1:10.7,s2:22.5,money:28.1,cond:35.2,honey:43.1,tag:52.3,vote:61.4,cta:69.3,end:78.6};
let lastKey='',metDone=false,metOn=false;
function fol(h,off,k){const b=by(h);if(!b)return;beeWorldPos(b,tmp);cur.lerp(tmp.clone().add(off),k||.1);look.lerp(tmp.clone().add(new THREE.Vector3(0,.8,0)),(k||.1)*1.3)}
function orbit(t,r,y,sp){const a=t*(sp||.25);cur.lerp(new THREE.Vector3(Math.sin(a)*r,y,Math.cos(a)*r),.06);look.lerp(new THREE.Vector3(0,y*.4,0),.06)}
window.capHook=(t)=>{
  let top='',bot='',key='';
  treasure.visible=false;
  if(t<S.s1){ // INTRO
    if(t<1.2){const k=t/1.2;cur.set(0,30-18*k,40-26*k);look.set(0,10,0)}else orbit(t,22,13,.35);
    if(t<4.4){key='i1';top=big(`<span class="wob">✋</span> רגע רגע ${Y('רגע!')}`,64)}
    else if(t<7.9){key='i2';top=big(`לא הבנתם איך<br>משחקים ${Y('בכוורת')}? 🤔`,58)}
    else{key='i3';top=big(`${Y('60 שניות')}<br>ואתם מקצוענים 😎`,60)}
  }else if(t<S.s2){ // ÉTAPE 1
    if(t<15.6){orbit(t,18,12,.3);key='a1';top=step(1,`כותבים ${Y('"דבורה"')}<br>בתגובות 💬`);bot=cmt('השם_שלכם','דבורה 🐝')}
    else if(t<17.6){key='a2';orbit(t,14,10,.6);top=big(`ובום! 💥`,90)}
    else{key='a3';fol('ronen18',new THREE.Vector3(6.5,0.6,6.5),.12);top=step(1,`יש לכם ${Y('דבורה')}<br>עם השם שלכם! 🐝`);bot=`<div style="font:900 34px Heebo">✅ באמת עם השם שלכם</div>`}
  }else if(t<S.money){ // ÉTAPE 2
    key='b';fol('noam__cahani',new THREE.Vector3(-6.5,0.6,6.5),.12);top=step(2,`כל תגובה =<br>${Y('מלכה')} 👑`);bot=`<div style="font:900 36px Heebo">עם כתר והכל 😎</div>`;
  }else if(t<S.cond){ // L'ARGENT
    treasure.visible=true;const P=treasure.position,D=P.clone().setY(0).normalize();
    if(t<30.6){key='m1';orbit(t,16,11,.4);top=big(`ועכשיו… החלק<br>${Y('הכי חשוב')} 👀`,56)}
    else{const k=Math.min(1,(t-30.6)/1.2);cur.lerp(P.clone().addScaledVector(D,-(4+3*(1-k))).add(new THREE.Vector3(0,.8,0)),.12);look.lerp(P,.18);
      if(t<32){key='m2';top=big(`${Y('כסף.')} 💸`,96)}
      else{key='m3';top=big(`כל יום ${Y('3 שטרות')}<br>של 20 ₪ בכוורת!`,52);bot=`<div style="font:900 58px Heebo;color:#FFC24B" dir="rtl">3 × 20 ₪ = 60 ₪ ביום</div><div style="font:900 30px Heebo;margin-top:6px">⏰ בשעות מפתיעות · 🏆 הראשון שמוצא לוקח</div>`}}
  }else if(t<S.honey){ // LA CONDITION
    orbit(t,20,12,.2);
    if(t<37.4){key='c1';top=big(`אבל… יש ${Y('תנאי')} 🔒`,64)}
    else{key='c2';top=big(`רק מי שמגיב על<br>הפוסט של ${Y('07:00')} ⏰`,54)+big(`רואה את השטרות 👀`,40);bot=`<div style="font:900 40px Heebo">אז ${Y('תגיבו כל בוקר!')} ☀️</div>`}
  }else if(t<S.tag){ // MIEL + RÉGULARITÉ
    orbit(t,15,9,.45);
    if(t<47.8){key='h1';top=big(`אוספים ${Y('אבקה ודבש')} 🍯`,54);bot=`<div style="font:900 38px Heebo">ועולים לטבלת ${Y('האלופים')} 🏆</div>`}
    else{const n=t<49.6?1:t<51?2:3;key='h2'+n;top=big(`באים ${Y('כל יום')}? ☀️`,58);
      bot=['🌸 פרח','✨ כנפי זהב','👑 כתר'].slice(0,n).map(s=>`<div class="pop" style="display:inline-block;margin:6px;background:rgba(26,17,8,.75);border:3px solid #FFC24B;border-radius:20px;padding:10px 18px;font:900 34px Heebo">${s}</div>`).join('')}
  }else if(t<S.vote){ // TAG D'AMIS
    fol('itaymilichenko',new THREE.Vector3(6.5,0.6,-6.5),.12);
    if(t<55.2){key='t1';top=big(`🤫 ${Y('טריק')}:`,64)+big('מתייגים חבר בתגובה',46);bot=cmt('השם_שלכם','@החבר_שלכם 👈 בוא לכוורת!')}
    else if(t<58.8){key='t2';top=big(`החבר מקבל ${Y('דבורה')} 🐝`,52);bot=`<div style="font:900 42px Heebo">ואתם מקבלים ${Y('כובע')} 🎩</div>`}
    else{key='t3';top=big(`3 חברים =<br>${Y('דבורת זהב')} ✨`,64)}
  }else if(t<S.cta){ // LE VOTE + MÉTÉORE
    if(t<64.2){key='v1';orbit(t,20,12,.25);top=big(`ובסוף… ${Y('אתם')} מחליטים<br>מה יקרה מחר! 🗳️`,50);bot=cmt('chlomo.assouline','מטאור מפוצצת את הכוורת 🤯','הכי הרבה לייקים')}
    else{ if(!metOn&&!metDone){metStart(t);metOn=true}
      key='v2';top=big(`התגובה עם הכי הרבה<br>${Y('לייקים')} מתגשמת! ☄️`,50);if(t>66.6)bot=`<div style="font:900 52px Heebo">אפילו ${Y('מטאור')}! 💥</div>`}
  }else{ // CTA
    if(metOn&&!metDone){metEnd(t);metDone=true;caption('')}
    orbit(t,24,13,.22);key='z'+(t>75.5?1:0);
    top=big(`${Y('עכשיו')} תורכם 👇`,60);
    bot=`<div style="font:900 40px/1.4 Heebo">1️⃣ כתבו ${Y('"דבורה"')} בתגובות<br>2️⃣ תייגו ${Y('חבר')}<br>3️⃣ הקישור לכוורת ${Y('בביו')} 🔗</div>`+(t>75.5?`<div style="font:900 34px Heebo;margin-top:8px">נתראה בכוורת… בזזזז 🐝</div>`:'');
  }
  if(!(metOn&&!metDone&&t>=S.vote)){camera.position.copy(cur);camera.lookAt(look)}
  if(key!==lastKey){lastKey=key;T.innerHTML='<div class="pop">'+pill('🐝 איך משחקים בכוורת?')+'<br><div style="display:inline-block;background:rgba(26,17,8,.62);border-radius:26px;padding:4px 22px 14px;margin-top:8px">'+top+'</div></div>';B.innerHTML=bot?'<div class="pop" style="display:inline-block;background:rgba(26,17,8,.62);border-radius:26px;padding:12px 22px">'+bot+'</div>':'';fl.style.opacity='.35'}
  else{fl.style.opacity=String(Math.max(0,parseFloat(fl.style.opacity)-.08));}
};
