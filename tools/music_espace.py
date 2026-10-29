import numpy as np, wave, sys
SR=44100; D=24.9; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(3)
out=np.zeros(N)
def add(sig,at,g=1.0):
    i=int(at*SR); j=min(N,i+len(sig)); out[i:j]+=g*sig[:j-i]
def env(n,a,d): x=np.arange(n)/SR; return np.clip(x/a,0,1)*np.exp(-x/d)
def boom(dur=1.6,f0=70,f1=28):
    n=int(dur*SR); x=np.arange(n)/SR; f=f1+(f0-f1)*np.exp(-x*6); ph=2*np.pi*np.cumsum(f)/SR
    s=np.sin(ph)*env(n,.002,.45)+0.5*rng.standard_normal(n)*env(n,.001,.06)
    return np.tanh(1.8*s)
def kick(): n=int(.35*SR); x=np.arange(n)/SR; f=40+110*np.exp(-x*30); return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.001,.12)
def hat(): n=int(.06*SR); s=rng.standard_normal(n); s=np.diff(s,prepend=0); return s*env(n,.0005,.015)*.35
def tick(): n=int(.03*SR); x=np.arange(n)/SR; return np.sin(2*np.pi*2400*x)*env(n,.0005,.008)
# 0–3.94 : drone sombre + tic-tac qui accélère + riser
drone=(np.sin(2*np.pi*55*t)+.5*np.sin(2*np.pi*82.4*t))*.18
out+=drone*np.clip(t/1.0,0,1)*np.where(t<10.1,1,.55)
x=.35
while x<10.0: add(tick(),x,.35 if x<7 else .6); x+= .5 if x<7 else .25
n=int(1.1*SR); nz=rng.standard_normal(n); k=np.linspace(0,1,n)**2
sw=np.convolve(nz,np.ones(8)/8,'same')*k*.5; add(sw,8.9)
# 3.94 → beat 125 BPM avec ostinato mineur
bt=60/128; cnt=0; x=10.1
notes=[110,110,130.8,116.5]
while x<23.9:
    add(kick(),x,.9 if cnt%2==0 else .6); add(hat(),x+bt/2)
    f=notes[(cnt//2)%4]; n=int(bt*SR); xx=np.arange(n)/SR
    saw=(2*((xx*f)%1)-1)+.5*(2*((xx*f*2.003)%1)-1); add(saw*env(n,.01,.25)*.09,x)
    x+=bt; cnt+=1
# impacts sur les mots-clés
for h,g in [(2.2,.5),(4.96,.6),(7.46,.5),(8.6,.6),(9.62,.7),(10.1,1.2),(12.46,.7),(15.9,.6),(18.62,.8),(20.9,.6),(24.0,1.0)]: add(boom(),h,g)
# fin : réverbe/queue
tail=np.clip((D-t)/1.2,0,1); out*=tail
L=out; Rr=np.roll(out,int(.012*SR))
s=np.stack([L,Rr],1); s=s/np.abs(s).max()*.9
with wave.open(sys.argv[1],'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((s*32767).astype('<i2').tobytes())
