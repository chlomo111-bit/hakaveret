// 📺 « מהדורת הכוורת » — journal télé du jour au milieu de chaque vidéo (règle de Shlomo, 30.10)
// Usage dans un hook : JOURNAL.frame(e, D) avec e = secondes depuis le début du journal (0 → JOURNAL.DUR),
// D = {user:'pseudo', text:'commentaire', likes:12, result:'ce qui est arrivé dans le jeu', show:'מהדורת הכוורת', host:'bee'}.
// Déroulé (6,5 s) : 0–1,1 flash rouge « 🔴 מבזק » (glitch) → 1,1–6,0 studio (présentatrice + écran + likes qui montent + bandeau) → 6,0–6,5 sortie.
(function(){
const css=document.createElement('style');css.textContent=`
#jr{position:fixed;left:0;top:0;width:1080px;height:1920px;transform-origin:0 0;z-index:40;display:none;direction:rtl;font-family:Heebo,sans-serif;color:#fff;overflow:hidden;background:#0b0f2a}
#jr .bgw{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,#2a3a9e 0%,#121848 45%,#070a1f 100%)}
#jr .beam{position:absolute;top:-10%;width:34%;height:80%;background:linear-gradient(180deg,rgba(255,230,160,.35),rgba(255,230,160,0));filter:blur(6px);transform-origin:top center}
#jr .led{position:absolute;left:6%;right:6%;top:13%;height:42%;border-radius:22px;background:linear-gradient(135deg,#1b2470,#0e1446);box-shadow:0 0 0 6px #FFC24B,0 0 60px rgba(255,194,75,.55);overflow:hidden}
#jr .led:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 2px,transparent 2px 5px)}
#jr .tag{position:absolute;top:4.5%;right:6%;display:flex;gap:18px;align-items:center}
#jr .live{background:#E5484D;font:900 52px Heebo;padding:8px 26px;border-radius:14px}
#jr .logo{background:#FFC24B;color:#1A1108;font:900 56px Heebo;padding:8px 28px;border-radius:14px}
#jr .clock{position:absolute;top:6.2%;left:6%;font:900 30px Heebo;opacity:.9;direction:ltr}
#jr .bubble{position:absolute;left:6%;right:6%;top:9%;background:#fff;color:#1A1108;border-radius:26px;padding:18px 26px;text-align:right;box-shadow:0 10px 40px rgba(0,0,0,.45)}
#jr .bubble .u{font:700 42px Heebo;opacity:.6;direction:ltr;text-align:right}
#jr .bubble .t{font:900 78px/1.15 Heebo;margin-top:4px}
#jr .likes{position:absolute;left:7%;top:47%;font:900 96px Heebo;color:#FF4B6E;text-shadow:0 4px 18px rgba(0,0,0,.6);direction:ltr}
#jr .ttl{position:absolute;right:7%;top:50%;font:900 56px Heebo;color:#FFC24B}
#jr .desk{position:absolute;left:-2%;right:-2%;bottom:13%;height:17%;background:linear-gradient(180deg,#FFC24B,#E89B1E);clip-path:polygon(8% 0,92% 0,100% 100%,0 100%);box-shadow:0 -6px 30px rgba(0,0,0,.4)}
#jr .desk span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 88px Heebo;color:#1A1108;letter-spacing:1px}
#jr .host{position:absolute;left:50%;bottom:25%;width:0;height:0}
#jr .host i{position:absolute;display:block}
#jr .res{position:absolute;left:5%;right:5%;top:70%;text-align:center;font:900 58px/1.2 Heebo;background:rgba(255,194,75,.16);border:3px solid #FFC24B;border-radius:18px;padding:12px 10px;text-shadow:0 4px 18px rgba(0,0,0,.8)}
#jr .tick{position:absolute;left:0;right:0;bottom:0;height:10%;background:#E5484D;display:flex;align-items:center;overflow:hidden;white-space:nowrap}
#jr .tick b{background:#1A1108;color:#FFC24B;font:900 56px Heebo;padding:0 22px;height:100%;display:flex;align-items:center;z-index:2}
#jr .tick span{font:900 56px Heebo;padding-right:40px;display:inline-block}
#jr .flash{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#C8102E}
#jr .flash .big{font:900 300px/1 Heebo;text-shadow:0 0 40px rgba(255,255,255,.6)}
#jr .flash .sm{font:900 76px Heebo;margin-top:14px;background:#1A1108;color:#FFC24B;padding:6px 26px;border-radius:12px}
#jr .scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.25) 0 3px,transparent 3px 6px);mix-blend-mode:multiply}
`;document.head.appendChild(css);
const el=document.createElement('div');el.id='jr';document.body.appendChild(el);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// présentatrice : abeille en cubes (même style que le jeu), cravate + micro
function bee(e){
  const bob=Math.sin(e*5)*6, wing=Math.sin(e*40)*12, mouth=(Math.sin(e*14)>0)?12:5;
  const b=(x,y,w,h,c,r,ex)=>`<i style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${c};border-radius:${r||8}px;${ex||''}"></i>`;
  return `<div class="host" style="transform:translateY(${bob}px) scale(1.55)">`+
    b(-150,-250,120,70,'rgba(220,240,255,.8)',40,`transform:rotate(${-20+wing}deg);transform-origin:right bottom`)+
    b(30,-250,120,70,'rgba(220,240,255,.8)',40,`transform:rotate(${20-wing}deg);transform-origin:left bottom`)+
    b(-110,-200,220,190,'#FFD23F',26)+b(-110,-140,220,30,'#1A1108',2)+b(-110,-80,220,30,'#1A1108',2)+
    b(-70,-175,40,40,'#fff',10)+b(30,-175,40,40,'#fff',10)+b(-58,-163,20,24,'#1A1108',6)+b(42,-163,20,24,'#1A1108',6)+
    b(-26,-120+0,52,mouth,'#7A2E1A',6)+
    b(-60,-262,10,50,'#1A1108',4,'transform:rotate(-20deg)')+b(50,-262,10,50,'#1A1108',4,'transform:rotate(20deg)')+
    b(-18,-30,36,60,'#E5484D',6,'clip-path:polygon(0 0,100% 0,70% 100%,30% 100%)')+
    b(130,-120,16,90,'#333',6,'transform:rotate(25deg)')+b(150,-150,34,40,'#555',14,'transform:rotate(25deg)')+
  `</div>`;
}
window.JOURNAL={DUR:6.5,
 frame(e,D){
  if(e<0||e>=this.DUR){el.style.display='none';return false}
  el.style.display='block';el.style.transform='scale('+(innerWidth/1080)+')';
  const show=D.show||'מהדורת הכוורת';
  if(e<1.1){ // FLASH
    const g=(Math.floor(e*30)%4===0)?`transform:translate(${(Math.random()-.5)*30}px,${(Math.random()-.5)*14}px)`:'';
    el.innerHTML=`<div class="flash" style="${g}"><div style="font:900 90px Heebo;margin-bottom:10px">🔴</div><div class="big">מבזק</div><div class="sm">${esc(show)}</div><div class="scan"></div></div>`;
    return true}
  const s=e-1.1, k=Math.min(1,s/.35), out=e>6.0?Math.min(1,(e-6.0)/.5):0;
  const n=Math.round((D.likes||0)*Math.min(1,Math.max(0,(s-.9)/1.2)));
  const tk=`🐝 ${esc(D.user)} כתב/ה את התגובה של היום · ❤️ ${D.likes} לייקים · ${esc(D.result||'')} · הקישור לכוורת בביו 🔗 · `;
  const off=(s*220)%2000;
  el.innerHTML=`<div class="bgw"></div>
   <div class="beam" style="left:4%;transform:rotate(${18+Math.sin(e*2)*4}deg)"></div><div class="beam" style="right:4%;transform:rotate(${-18-Math.sin(e*2)*4}deg)"></div>
   <div class="tag"><span class="live">🔴 LIVE</span><span class="logo">${esc(show)}</span></div>
   <div class="led" style="transform:scale(${.9+.1*k});opacity:${k}">
     <div class="bubble" style="transform:scale(${s>.4?1:.6});opacity:${s>.4?1:0};transition:none"><div class="u">@${esc(D.user)}</div><div class="t">${esc(D.text).replace(/@([A-Za-z0-9._]+)/g,'<bdi dir="ltr">@$1</bdi>')}</div></div>
     <div class="ttl">🏆 התגובה של היום</div><div class="likes">❤️ ${n}</div>${s>2.6?`<div class="res">✅ ${esc(D.result||'')}</div>`:''}</div>
      ${bee(e)}
   <div class="desk"><span>📺 ${esc(show)}</span></div>
   <div class="tick"><b>מבזק</b><span style="transform:translateX(${off}px)">${tk+tk+tk}</span></div>
   <div style="position:absolute;inset:0;background:#000;opacity:${out}"></div>`;
  return true}
};
})();
