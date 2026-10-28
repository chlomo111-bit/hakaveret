from playwright.sync_api import sync_playwright
SP="/tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad"; F=SP+"/three3/node_modules/@fontsource/heebo/files"
css=f"""@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-hebrew-900-normal.woff2)}}@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-latin-900-normal.woff2);unicode-range:U+0000-00FF}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-hebrew-700-normal.woff2)}}
*{{margin:0;box-sizing:border-box}}body{{width:1080px;height:1920px;overflow:hidden;font-family:H;direction:rtl;color:#fff;background:#1A1108}}
.bg{{position:absolute;inset:0;background-size:cover;background-position:center}}
.ov{{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(26,17,8,.35) 0%,rgba(26,17,8,.82) 75%)}}
.box{{position:absolute;left:60px;right:60px;top:50%;transform:translateY(-50%);text-align:center;text-shadow:0 8px 34px rgba(0,0,0,.7)}}
.pill{{display:inline-block;background:#FFC24B;color:#1A1108;font-weight:900;font-size:54px;padding:16px 44px;border-radius:999px;text-shadow:none}}
.t{{font-weight:900;font-size:150px;line-height:1.02;margin-top:40px}} .y{{color:#FFC24B}}
.s{{font-weight:700;font-size:58px;margin-top:36px}} .n{{position:absolute;top:240px;left:0;right:0;text-align:center;font-weight:900;font-size:44px;opacity:.9}}"""
C=[("cover_regles","f0240","▶️ מתחילים כאן","איך <span class=y>משחקים</span>?","כל החוקים ב־60 שניות 🐝"),
("cover_recap","f0390","☄️ אתם החלטתם","ביקשתם… <span class=y>וזה קרה!</span>","התגובה שלכם קובעת מה יקרה"),
("cover_50","f0530","✨ 50 דבורים","כוורת <span class=y>הזהב</span>","83 דבורים אמיתיות בכוורת"),
("cover_ron","f0150","🏆 זוכה אמיתי","<span class=y>20 ₪</span><br>תוך 63 שניות","<span dir=ltr>@ronen18</span> מצא את השטר"),
("cover_welcome","f0060","🐝 ההתחלה","ברוכים הבאים <span class=y>לכוורת</span>","כל עוקב = דבורה עם השם שלו")]
with sync_playwright() as p:
  b=p.chromium.launch()
  for name,bg,pl,t,s in C:
    html=f"<!doctype html><html><head><meta charset=utf-8><style>{css}</style></head><body><div class=bg style=\"background-image:url(file://{SP}/cov/fr/{bg}.jpg)\"></div><div class=ov></div><div class=n>הכוורת שלנו 🐝</div><div class=box><span class=pill>{pl}</span><div class=t>{t}</div><div class=s>{s}</div></div></body></html>"
    open(f"{SP}/cov/{name}.html","w").write(html)
    pg=b.new_page(viewport={"width":1080,"height":1920});pg.goto(f"file://{SP}/cov/{name}.html");pg.wait_for_timeout(600)
    pg.screenshot(path=f"{SP}/cov/{name}.jpg",type="jpeg",quality=92);pg.close()
  b.close()
