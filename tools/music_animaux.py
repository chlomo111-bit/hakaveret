# Musique du reel « החיות השתלטו על הכוורת » (31.10) — calée sur voix_animaux.mp3
import numpy as np, wave, sys
SR=44100; D=26.5; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(7)
out=np.zeros(N)
def add(sig,at,g=1.0):
    i=int(at*SR); j=min(N,i+len(sig)); out[i:j]+=g*sig[:j-i]
def env(n,a,d): x=np.arange(n)/SR; return np.clip(x/a,0,1)*np.exp(-x/d)
def boom(dur=1.4,f0=75,f1=30):
    n=int(dur*SR); x=np.arange(n)/SR; f=f1+(f0-f1)*np.exp(-x*6); ph=2*np.pi*np.cumsum(f)/SR
    return np.tanh(1.8*(np.sin(ph)*env(n,.002,.4)+.5*rng.standard_normal(n)*env(n,.001,.05)))
def kick(): n=int(.3*SR); x=np.arange(n)/SR; f=40+120*np.exp(-x*30); return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.001,.11)
def hat(): n=int(.05*SR); s=np.diff(rng.standard_normal(n),prepend=0); return s*env(n,.0005,.012)*.3
def pop(f=880): n=int(.18*SR); x=np.arange(n)/SR; ff=f*(1+1.5*np.exp(-x*40)); return np.sin(2*np.pi*np.cumsum(ff)/SR)*env(n,.001,.05)
def whoosh(d=.5): n=int(d*SR); s=np.convolve(rng.standard_normal(n),np.ones(12)/12,'same'); k=np.sin(np.linspace(0,np.pi,n))**2; return s*k*.6
def trumpet(dur=1.2,f=233): # barrissement stylisé (glissando cuivré)
    n=int(dur*SR); x=np.arange(n)/SR; ff=f*(1+.6*np.sin(np.pi*x/dur))+8*np.sin(2*np.pi*6*x); ph=2*np.pi*np.cumsum(ff)/SR
    s=np.sign(np.sin(ph))*.5+np.sin(2*ph)*.3; return np.tanh(2*s)*env(n,.05,.6)*.5
bt=60/124; notes=[98,98,123.5,110]; cnt=0; x=0.91
while x<D-1.2:
    quiet=(11.3<x<13.45)
    if not quiet:
        add(kick(),x,.9 if cnt%2==0 else .55); add(hat(),x+bt/2)
        f=notes[(cnt//2)%4]; n=int(bt*SR); xx=np.arange(n)/SR
        saw=(2*((xx*f)%1)-1)+.5*(2*((xx*f*2.003)%1)-1); add(saw*env(n,.01,.22)*.08,x)
    x+=bt; cnt+=1
# tension « ואז מישהו כתב… » : drone + tic
add((np.sin(2*np.pi*55*np.arange(int(2.2*SR))/SR)*.2)*np.linspace(0,1,int(2.2*SR)),11.25)
for k in range(5): add(pop(1800),11.35+k*.4,.25)
for h in [7.17,8.12,9.01,9.84,10.82]: add(pop(660+ (h*97)%400),h,.55); add(whoosh(.35),h-.25,.5)
for h,g in [(0.91,1.0),(12.38,1.1),(15.81,1.3),(22.93,.9)]: add(boom(),h,g)
add(trumpet(),15.95,.8)
for h in [3.01,5.90,13.45,17.17,19.91,20.94]: add(whoosh(.4),h-.3,.45)
out*=np.clip((D-t)/1.0,0,1)*np.clip(t/.15,0,1)
s=np.stack([out,np.roll(out,int(.012*SR))],1); s=s/np.abs(s).max()*.9
with wave.open(sys.argv[1],'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((s*32767).astype('<i2').tobytes())
