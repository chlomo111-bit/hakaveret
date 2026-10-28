from playwright.sync_api import sync_playwright
F="/tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad/three3/node_modules/@fontsource/heebo/files"; BG="/tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad/bg/f0560.jpg"
css=f"""@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-hebrew-900-normal.woff2)}}@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-latin-900-normal.woff2);unicode-range:U+0000-00FF}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-hebrew-700-normal.woff2)}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-latin-700-normal.woff2);unicode-range:U+0000-00FF}}
*{{margin:0;box-sizing:border-box}}body{{width:1080px;height:HHpx;overflow:hidden;font-family:H;direction:rtl;color:#fff;background:url(file://{BG}) center/cover}}
.ov{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,17,8,.9) 0%,rgba(26,17,8,.35) 34%,rgba(26,17,8,0) 48%,rgba(26,17,8,.35) 62%,rgba(26,17,8,.92) 100%)}}
.c{{position:absolute;left:0;right:0;text-align:center;text-shadow:0 6px 30px rgba(0,0,0,.55)}}
.pill{{display:inline-block;background:#FFC24B;color:#1A1108;font-weight:900;border-radius:999px;text-shadow:none}}
.y{{color:#FFC24B}}"""
def page(h,body):
    return "<!doctype html><html><head><meta charset=utf-8><style>"+css.replace("HH",str(h))+"</style></head><body><div class=ov></div>"+body+"</body></html>"
story=page(1920,"""<div class=c style="top:120px"><span class=pill style="font-size:44px;padding:14px 40px">⏰ התראה</span></div>
<div class=c style="top:240px;font-weight:900;font-size:120px;line-height:1.05">בעוד <span class=y>10 דקות</span></div>
<div class=c style="top:390px;font-weight:900;font-size:110px;line-height:1.05">שטר חדש בכוורת 💸</div>
<div class=c style="top:1250px;font-weight:900;font-size:110px;direction:ltr"><span class=y>20 ₪</span></div>
<div class=c style="top:1420px"><span class=pill style="font-size:52px;padding:18px 48px">הראשון שמוצא – לוקח 🏆</span></div>
<div class=c style="top:1580px;font-weight:700;font-size:44px;line-height:1.35">תייגו חבר שצריך 20 ₪ 👇<br>הקישור בביו 🔗</div>""")
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,html,h in [("countdown_story",story,1920)]:
        open(f"/tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad/{name}.html","w").write(html)
        pg=b.new_page(viewport={"width":1080,"height":h});pg.goto(f"file:///tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad/{name}.html");pg.wait_for_timeout(800)
        pg.screenshot(path=f"/tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad/{name}.jpg",type="jpeg",quality=92);pg.close()
    b.close()
