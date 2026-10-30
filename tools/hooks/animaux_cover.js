try{localStorage.setItem('kaveret_ev50','1');localStorage.setItem('kaveret_ev100','1')}catch(e){}
started=true;introT=END;document.getElementById('gate').hidden=true;document.getElementById('skip').hidden=true;
loop();endIntro();treasureHit=null;foundShown=true;try{treasure.visible=false}catch(e){}
const by=h=>bees.find(b=>b.handle===h);let cur=null;
const mk=(z,s)=>{const d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;z-index:'+z+';text-align:center;direction:rtl;font-family:Heebo;color:#fff;text-shadow:0 4px 22px rgba(0,0,0,.85);padding:0 18px;'+s;document.body.appendChild(d);return d};
mk(4,'inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(26,17,8,.85) 0%,rgba(26,17,8,0) 34%,rgba(26,17,8,0) 64%,rgba(26,17,8,.9) 100%)');
const T=mk(9,'top:8%'),B=mk(9,'bottom:9%');
T.innerHTML='<div style="display:inline-block;font:900 24px Heebo;background:#FFC24B;color:#1A1108;padding:7px 20px;border-radius:999px;text-shadow:none">🐝 הכוורת שלנו</div><div style="font:900 64px/1.08 Heebo;margin-top:16px">החיות <span style="color:#FFC24B">השתלטו</span><br>על הכוורת! 😱</div>';
B.innerHTML='<div style="font:900 64px Heebo">🐘🦄🦁🐶🐼🐱</div><div style="font:900 34px/1.2 Heebo;margin-top:10px">ביקשתם פיל? <span style="color:#FFC24B">בנינו פיל.</span></div>';
window.capHook=(t)=>{if(cur!==window.TARGET){cur=window.TARGET;const b=by(cur);if(b)select(b)};['beeSheet','ui','bottom'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none'});try{pool.forEach(s=>s.visible=false)}catch(e){}};
