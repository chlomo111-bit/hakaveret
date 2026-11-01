# Story 1080×1920 style ruche. Usage : python3 tools/story_make.py story.json out.jpg
# story.json = {"pill":"…","h1":"…","h2":"…","box":["ligne 1","ligne 2"],"q":"question","emo":"🦈🐋","ft":"הקישור בביו 🔗"}
# Mots en jaune : *mot* ; violet : _mot_
import json, re, sys
from playwright.sync_api import sync_playwright
SP = "/tmp/claude-0/-home-claude/5aa6884f-a888-58d7-91af-e41ef083cb89/scratchpad"; F = SP + "/three3/node_modules/@fontsource/heebo/files"
d = json.load(open(sys.argv[1])); out = sys.argv[2]
def m(s): return re.sub(r"_(.+?)_", r"<span class=v>\1</span>", re.sub(r"\*(.+?)\*", r"<span class=y>\1</span>", s or ""))
css = f"""@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-hebrew-900-normal.woff2)}}@font-face{{font-family:H;font-weight:900;src:url(file://{F}/heebo-latin-900-normal.woff2);unicode-range:U+0000-00FF}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-hebrew-700-normal.woff2)}}@font-face{{font-family:H;font-weight:700;src:url(file://{F}/heebo-latin-700-normal.woff2);unicode-range:U+0000-00FF}}
*{{margin:0;padding:0;box-sizing:border-box}}html,body{{width:1080px;height:1920px;overflow:hidden}}
body{{font-family:H;direction:rtl;color:#fff;background:#120c2e url(file://{SP}/bg_space.jpg) center/cover;position:relative}}
.ov{{position:absolute;inset:0;background:rgba(14,8,40,.84)}}
.wrap{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px;padding:0 70px;text-align:center}}
.pill{{background:#FFC24B;color:#1A1108;font-weight:900;font-size:40px;padding:12px 38px;border-radius:999px}}
.h1{{font-weight:900;font-size:120px;line-height:1.05;text-shadow:0 8px 34px rgba(0,0,0,.6)}} .y{{color:#FFC24B}} .v{{color:#B9A8FF}}
.h2{{font-weight:900;font-size:68px;line-height:1.15}}
.box{{width:100%;border:3px solid rgba(255,194,75,.7);border-radius:30px;padding:26px 30px;background:rgba(20,12,50,.55)}}
.l{{font-weight:900;font-size:48px;line-height:1.35}}
.q{{width:100%;background:#FFC24B;color:#1A1108;border-radius:30px;padding:24px 30px}}
.q1{{font-weight:900;font-size:50px;line-height:1.2}} .q2{{font-size:64px;margin-top:8px}}
.ft{{font-weight:700;font-size:40px;opacity:.95}}"""
body = "<div class=ov></div><div class=wrap>"
if d.get("pill"): body += f"<div class=pill>{m(d['pill'])}</div>"
if d.get("h1"): body += f"<div class=h1>{m(d['h1'])}</div>"
if d.get("h2"): body += f"<div class=h2>{m(d['h2'])}</div>"
if d.get("box"): body += "<div class=box>" + "".join(f"<div class=l>{m(x)}</div>" for x in d["box"]) + "</div>"
if d.get("q"): body += f"<div class=q><div class=q1>{m(d['q'])}</div>" + (f"<div class=q2>{d['emo']}</div>" if d.get("emo") else "") + "</div>"
body += f"<div class=ft>{m(d.get('ft','הקישור בביו 🔗'))}</div></div>"
html = "<!doctype html><html><head><meta charset=utf-8><style>" + css + "</style></head><body>" + body + "</body></html>"
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1080, "height": 1920})
    hp=SP+"/_story.html";open(hp,"w").write(html);pg.goto("file://"+hp); pg.wait_for_timeout(700); pg.screenshot(path=out, type="jpeg", quality=92); b.close()
