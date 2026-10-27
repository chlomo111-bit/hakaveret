import sys,time
from playwright.sync_api import sync_playwright
SP=sys.argv[1]; T=SP+"/three3/node_modules/three/"; F=SP+"/three3/node_modules/@fontsource/heebo/files/"
import os,re
src=open(os.environ.get("GAME","index.html")).read()
html=src.split("<body>",1)[1].rsplit("</body>",1)[0] if "<body>" in src else src
fonts="<style>@font-face{font-family:Heebo;font-weight:900;src:url(http://test/h900.woff2);unicode-range:U+0590-05FF,U+20AA}@font-face{font-family:Heebo;font-weight:900;src:url(http://test/l900.woff2);unicode-range:U+0000-00FF}@font-face{font-family:Heebo;font-weight:700;src:url(http://test/h700.woff2)}</style>"
page_html="<!doctype html><html><head><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>"+fonts+"</head><body>"+html+"</body></html>"
import os
SAMP=set(map(int,os.environ['SAMP'].split(','))) if os.environ.get('SAMP') else None
N=int(sys.argv[2]) if len(sys.argv)>2 else 450
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-webgl","--ignore-gpu-blocklist"])
    pg=b.new_page(viewport={"width":540,"height":960},device_scale_factor=2)
    pg.add_init_script("window.CAP=true")
    errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
    def route(r):
        u=r.request.url
        if "three.min.js" in u: r.fulfill(path=T+"build/three.min.js",content_type="text/javascript")
        elif "OrbitControls" in u: r.fulfill(path=T+"examples/js/controls/OrbitControls.js",content_type="text/javascript")
        elif u.endswith("h900.woff2"): r.fulfill(path=F+"heebo-hebrew-900-normal.woff2",content_type="font/woff2")
        elif u.endswith("l900.woff2"): r.fulfill(path=F+"heebo-latin-900-normal.woff2",content_type="font/woff2")
        elif u.endswith("h700.woff2"): r.fulfill(path=F+"heebo-hebrew-700-normal.woff2",content_type="font/woff2")
        elif "/rest/v1/bees" in u:
            r.fulfill(status=200,body=open(os.environ["BEES"]).read(),content_type="application/json")
        elif "supabase.co" in u: r.fulfill(status=200,body="[]",content_type="application/json")
        elif u.startswith("http://test/"): r.fulfill(body=page_html,content_type="text/html")
        else: r.abort()
    pg.route("**/*",route); pg.goto("http://test/"); time.sleep(3)
    pg.evaluate(open(os.environ["HOOK"]).read())


    for i in range(N):
        pg.evaluate("loop()")
        if SAMP is None or i in SAMP: pg.screenshot(path=os.environ["OUT"]+f"/f{i:04d}.jpg",type="jpeg",quality=90)
    print("errs",errs); b.close()
