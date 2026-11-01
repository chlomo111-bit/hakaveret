import numpy as np, wave, sys
SR=44100; D=30.5; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(3)
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
# reel 1.11 requin : alarme 0–2.6, beat 128 BPM partout sauf pendant le journal (5.9–12.4 : jingle TV)
alarm=np.sin(2*np.pi*(660+220*np.sign(np.sin(2*np.pi*3*t)))*t)*.12*(t<2.6)
out+=alarm
bt=60/128; cnt=0; x=2.92
notes=[110,110,130.8,98]
while x<29.6:
    if not (5.8<x<12.4):
        add(kick(),x,.9 if cnt%2==0 else .6); add(hat(),x+bt/2)
        f=notes[(cnt//2)%4]; n=int(bt*SR); xx=np.arange(n)/SR
        saw=(2*((xx*f)%1)-1)+.5*(2*((xx*f*2.003)%1)-1); add(saw*env(n,.01,.25)*.09,x)
    x+=bt; cnt+=1
# jingle journal : 3 notes + nappe douce
for i,f in enumerate([523.25,659.25,783.99,1046.5]):
    n=int(.35*SR); xx=np.arange(n)/SR; add(np.sin(2*np.pi*f*xx)*env(n,.005,.2)*.35,6.0+i*.18)
pad=(np.sin(2*np.pi*220*t)+np.sin(2*np.pi*277.2*t)+np.sin(2*np.pi*329.6*t))*.05*((t>7)&(t<12.4))
out+=pad
for h,g in [(0.1,1.3),(1.14,.7),(5.14,.8),(12.4,.7),(16.04,.7),(17.44,.6),(19.86,.8),(22.98,1.2),(25.66,.9)]: add(boom(),h,g)
# fin : réverbe/queue
tail=np.clip((D-t)/1.2,0,1); out*=tail
L=out; Rr=np.roll(out,int(.012*SR))
s=np.stack([L,Rr],1); s=s/np.abs(s).max()*.9
with wave.open(sys.argv[1],'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((s*32767).astype('<i2').tobytes())
