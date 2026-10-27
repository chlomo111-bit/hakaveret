import numpy as np, wave, sys
SR=44100; D=30.6; N=int(SR*D); rng=np.random.default_rng(7)
L=np.zeros(N); R=np.zeros(N)
def env(n,att,dur):
    t=np.arange(n)/SR; a=np.clip(t/att,0,1); d=np.exp(-np.maximum(t-att,0)*(6.9/dur)); return a*d
def add(sig,t0,pan=0.0,buf=None):
    i=int(t0*SR); j=min(N,i+len(sig)); s=sig[:j-i]
    gl=np.sqrt((1-pan)/2); gr=np.sqrt((1+pan)/2); L[i:j]+=s*gl; R[i:j]+=s*gr
def tri(f,n): t=np.arange(n)/SR; return 2*np.abs(2*((t*f)%1)-1)-1
music=np.zeros(N)
beat=60/84/2
CH=[[130.81,196,246.94,329.63],[110,164.81,261.63,329.63],[87.31,174.61,220,329.63],[98,146.83,246.94,293.66]]
SC=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99]
st=0;t=0.1
while t<D:
    if st%16==0:
        n=int(beat*16*SR)
        for f in CH[(st//16)%4]:
            s=tri(f,n)*env(n,1.2,beat*16)*.07; i=int(t*SR); j=min(N,i+n); music[i:j]+=s[:j-i]
    if rng.random()<.45:
        f=SC[rng.integers(len(SC))]*(2 if rng.random()<.3 else 1); n=int(.6*SR)
        s=tri(f,n)*env(n,.01,.6)*.09; i=int(t*SR); j=min(N,i+n); music[i:j]+=s[:j-i]
    t+=beat; st+=1
# echo
d=int(.36*SR); wet=np.zeros(N); x=music.copy()
for k in range(1,6): wet[d*k:]+=x[:N-d*k]*(.35*(.38**(k-1)))
music=music+wet
tt=np.arange(N)/SR
mg=np.where(tt<29.8,.06,.16)/.16; mg=np.convolve(mg,np.ones(SR//3)/(SR//3),mode='same')
music*=mg*.16*np.clip(tt/2.5,0,1)
L+=music; R+=music
# birds
def bl(t): return .14
bt=.5
while bt<D-.3:
    base=2200+rng.random()*1800; n=2+rng.integers(4); pan=rng.random()*1.6-.8; s0=bt
    for i in range(n):
        m=int(.1*SR); tl=np.arange(m)/SR
        f=np.where(tl<.05,base*(1+ (tl/.05)*(.3+rng.random()*.5)),base*1.4*(1-(tl-.05)/.05*.35))
        ph=2*np.pi*np.cumsum(f)/SR; s=np.sin(ph)*env(m,.012,.1)*.35*bl(s0)
        add(s,s0,pan); s0+=.07+rng.random()*.05
    bt+=.4+rng.random()*(2.5)
# buzz
bz=np.zeros(N)
for f,a,lf in [(118,.35,5),(121.5,.35,6.7),(236,.15,8.4)]:
    ph=2*np.pi*np.cumsum(f+4*np.sin(2*np.pi*lf*tt))/SR; bz+=a*(2*((ph/(2*np.pi))%1)-1)
# simple lowpass
a=np.exp(-2*np.pi*420/SR); y=np.zeros(N); 
for i in range(1,N): y[i]=(1-a)*bz[i]+a*y[i-1]
bz=y*np.clip((tt+1)/1.5,0,1)*.035*2.2
L+=bz; R+=bz
fade=np.clip((D-tt)/0.8,0,1); L*=fade; R*=fade
out=np.stack([L,R],1); out=np.clip(out/max(1,np.abs(out).max()*1.05),-1,1)
with wave.open(sys.argv[1],'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype('<i2').tobytes())
