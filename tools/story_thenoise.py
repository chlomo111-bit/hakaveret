import sys
from playwright.sync_api import sync_playwright
F=sys.argv[1]; OUT=sys.argv[2]
css=f"""@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-hebrew-900-normal.woff2)}}@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-latin-900-normal.woff2);unicode-range:U+0000-00FF}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-hebrew-700-normal.woff2)}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-latin-700-normal.woff2);unicode-range:U+0000-00FF}}
*{{margin:0;box-sizing:border-box}}
body{{width:1080px;height:1920px;overflow:hidden;font-family:H,'Noto Color Emoji';direction:rtl;color:#fff;position:relative;
background:radial-gradient(ellipse 60% 40% at 50% 58%,rgba(255,194,75,.55),rgba(255,194,75,0) 70%),
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='146'%3E%3Cpath d='M42 0l42 24v49L42 97 0 73V24zM42 97l42 24v49M42 97L0 121v49' fill='none' stroke='%23FFC24B' stroke-opacity='.13' stroke-width='3'/%3E%3C/svg%3E"),
linear-gradient(180deg,#2A1A08,#1A1108 60%,#0E0904)}}
.c{{position:absolute;left:0;right:0;text-align:center;text-shadow:0 6px 30px rgba(0,0,0,.6)}}
.pill{{display:inline-block;background:#FFC24B;color:#1A1108;font-weight:900;border-radius:999px;text-shadow:none}}
.y{{color:#FFC24B}}
.beam{{position:absolute;left:50%;top:560px;width:900px;height:900px;transform:translateX(-50%);background:linear-gradient(180deg,rgba(255,240,200,.0),rgba(255,230,170,.22));clip-path:polygon(42% 0,58% 0,100% 100%,0 100%)}}
.stage{{position:absolute;left:90px;right:90px;top:1300px;height:70px;border-radius:50%;background:radial-gradient(ellipse at center,#FFC24B,#B86E0A);box-shadow:0 0 80px rgba(255,194,75,.6)}}
.chairs{{position:absolute;left:0;right:0;top:1390px;text-align:center;font-size:96px;letter-spacing:40px;filter:brightness(.8)}}"""
body="""<div class=beam></div>
<div class=c style="top:130px"><span class=pill style="font-size:64px;padding:16px 54px">🎤 חדש! <span dir=ltr>The Noise</span></span></div>
<div class=c style="top:300px;font-weight:900;font-size:96px;line-height:1.1">הדבורה שלנו<br><span class=y>עלתה לבמה…</span></div>
<div class=c style="top:820px;font-size:300px;line-height:1">🐝</div>
<div class=c style="top:1150px;font-size:110px;line-height:1;left:560px">🎤</div>
<div class=stage></div>
<div class=chairs>🪑🪑🪑🪑</div>
<div class=c style="top:1530px;font-weight:900;font-size:76px;line-height:1.15">ואף כיסא לא הסתובב 😂</div>
<div class=c style="top:1700px"><span class=pill style="font-size:50px;padding:18px 44px">תפסו מקום בקהל – <span dir=ltr>@the_noise_2026</span></span></div>"""
html="<!doctype html><html><head><meta charset=utf-8><style>"+css+"</style></head><body>"+body+"</body></html>"
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":1080,"height":1920})
    open(OUT+".html","w").write(html);pg.goto("file://"+OUT+".html");pg.wait_for_timeout(900)
    pg.screenshot(path=OUT,type="jpeg",quality=92);b.close()
