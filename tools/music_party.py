# Boucle « מסיבה » pour stories vidéo (sans voix) : house 124 BPM, accords + basse + kick/clap/hat. Usage : python3 tools/music_party.py out.wav [durée]
import numpy as np, wave, sys
SR=44100; D=float(sys.argv[2]) if len(sys.argv)>2 else 12; N=int(SR*D); out=np.zeros(N); rng=np.random.default_rng(7)
def add(s,at,g=1):
    i=int(at*SR)
    if i>=N: return
    j=min(N,i+len(s)); out[i:j]+=g*s[:j-i]
def env(n,a,d): x=np.arange(n)/SR; return np.clip(x/a,0,1)*np.exp(-x/d)
def kick(): n=int(.3*SR); x=np.arange(n)/SR; f=45+120*np.exp(-x*32); return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.001,.11)
def clap(): n=int(.18*SR); return rng.standard_normal(n)*env(n,.001,.05)*.5
def hat(): n=int(.05*SR); s=np.diff(rng.standard_normal(n),prepend=0); return s*env(n,.0005,.012)*.3
def note(f,dur,g=1,saw=True):
    n=int(dur*SR); x=np.arange(n)/SR; s=sum(np.sin(2*np.pi*f*k*x)/k for k in range(1,7)) if saw else np.sin(2*np.pi*f*x)
    return s*env(n,.01,dur*.6)*g
B=60/124; chords=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]]
hz=lambda m:440*2**((m-69)/12)
k=0; t=0.0
while t<D:
    add(kick(),t,.9)
    if k%2==1: add(clap(),t,.6)
    add(hat(),t+B/2,.8)
    bar=(k//4)%4
    if k%4==0:
        for m in chords[bar]: add(note(hz(m),B*4,.05),t)
    add(note(hz(chords[bar][0]-24),B*.45,.25,False),t+B/2)
    t+=B; k+=1
x=np.arange(N)/SR; out*=np.clip(x/.3,0,1)*np.clip((D-x)/.8,0,1)
out=np.tanh(out*1.4)*.8
w=wave.open(sys.argv[1],"wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
