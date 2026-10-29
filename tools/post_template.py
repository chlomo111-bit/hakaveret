from playwright.sync_api import sync_playwright
SP="/tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad"; F=SP+"/three3/node_modules/@fontsource/heebo/files"
css=f"""@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-hebrew-900-normal.woff2)}}@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-latin-900-normal.woff2);unicode-range:U+0000-00FF}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-hebrew-700-normal.woff2)}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-latin-700-normal.woff2);unicode-range:U+0000-00FF}}
*{{margin:0;padding:0;box-sizing:border-box}}html,body{{width:1080px;height:HHpx;overflow:hidden}}
body{{font-family:H;direction:rtl;color:#fff;background:#120c2e url(file://{SP}/bg_space.jpg) center/cover;position:relative}}
.ov{{position:absolute;inset:0;background:rgba(14,8,40,.72)}}
.wrap{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:GAPpx;padding:0 70px;text-align:center}}
.pill{{background:#FFC24B;color:#1A1108;font-weight:900;font-size:40px;padding:12px 38px;border-radius:999px}}
.h1{{font-weight:900;font-size:130px;line-height:1;text-shadow:0 8px 34px rgba(0,0,0,.6)}} .y{{color:#FFC24B}} .v{{color:#B9A8FF}}
.h2{{font-weight:900;font-size:72px;line-height:1.1}}
.box{{width:100%;border:3px solid rgba(255,194,75,.7);border-radius:30px;padding:26px 30px;background:rgba(20,12,50,.55)}}
.l1{{font-weight:900;font-size:48px;line-height:1.3}} .l2{{font-weight:700;font-size:42px;margin-top:6px}}
.sp{{display:inline-block;margin-top:18px;background:#FFC24B;color:#1A1108;font-weight:900;font-size:44px;padding:10px 34px;border-radius:999px}}
.q{{width:100%;background:#FFC24B;color:#1A1108;border-radius:30px;padding:24px 30px}}
.q1{{font-weight:900;font-size:46px;line-height:1.2}} .q2{{font-size:56px;margin:8px 0}} .q3{{font-weight:900;font-size:40px}}
.ft{{font-weight:700;font-size:38px;opacity:.95}}"""
body="""<div class=ov></div><div class=wrap>
<div class=pill>🐝 יום 3 בכוורת</div>
<div class=h1><span class=y>100</span> דבורים!</div>
<div class=h2>הכוורת עפה <span class=v>לחלל</span> 🚀</div>
<div class=box><div class=l1>נגמר הקל… <span class=y>200 אבקות</span> = כרטיס 🎟️</div><div class=l2>ב־20:00 הגרלה <b>בשידור חי</b> בכוורת · <span class=y>20 ₪</span></div><div class=sp>🌼 היום אבקה כפולה!</div></div>
<div class=q><div class=q1>איזו חיה הייתם רוצים להיות ל־24 שעות?</div><div class=q2>🐱🐶🦁🐸🐼🐷🦄🐰</div><div class=q3>כתבו חיה + תייגו חבר 👇</div></div>
<div class=ft>הקישור בביו 🔗</div></div>"""
with sync_playwright() as p:
  b=p.chromium.launch()
  for name,h,gap in [("post29",1350,26),("story29",1920,44)]:
    html="<!doctype html><html><head><meta charset=utf-8><style>"+css.replace("HH",str(h)).replace("GAP",str(gap))+"</style></head><body>"+body+"</body></html>"
    open(f"{SP}/{name}.html","w").write(html)
    pg=b.new_page(viewport={"width":1080,"height":h});pg.goto(f"file://{SP}/{name}.html");pg.wait_for_timeout(700)
    pg.screenshot(path=f"{SP}/{name}.jpg",type="jpeg",quality=92);pg.close()
  b.close()
