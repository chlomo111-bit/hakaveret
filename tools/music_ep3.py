# Musique reel crossover « פרק 3 » (7.11) : mystère 0–2.1, STING de série 2.16 (bzz + carillon, identique chaque épisode), house, creux journal 12.4–17.4, nuit 17.76–22.9, fin crossover 22.9→
import numpy as np, wave, sys, subprocess
SR=44100; D=float(sys.argv[2]) if len(sys.argv)>2 else 29.4; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(13)
subprocess.run([sys.executable,"tools/music_party.py","/tmp/_pb3.wav",str(D)],check=True)
w=wave.open("/tmp/_pb3.wav"); bed=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32767; w.close(); bed=np.pad(bed,(0,max(0,N-len(bed))))[:N]
def env(n,a,d): x=np.arange(n)/SR; return np.clip(x/a,0,1)*np.exp(-x/d)
def add(s,at,g=1):
    i=int(at*SR); j=min(N,i+len(s)); out[i:j]+=g*s[:j-i]
def sm(a,b): return np.clip((t-a)/(b-a),0,1)
g=np.zeros(N)+1.0
g=np.where(t<2.16,0,g); g=np.where((t>=2.16)&(t<2.6),sm(2.16,2.6),g)
g=np.where((t>=12.4)&(t<17.4),.35,g); g=np.where((t>=17.6)&(t<22.9),.12,g); g=np.where(t>=22.9,.45,g)
out=bed*g
drone=lambda a,b,f,v=.12:np.sin(2*np.pi*f*t)*v*((t>=a)&(t<b))*np.clip((t-a)/.3,0,1)*np.clip((b-t)/.3,0,1)
out+=drone(0,2.2,55)+drone(0,2.2,82.4,.07)+drone(17.6,23,49)+drone(17.6,23,73.4,.07)+drone(22.9,D,61.7,.08)
def beat():
    n=int(.25*SR); x=np.arange(n)/SR; return np.sin(2*np.pi*(55+40*np.exp(-x*30))*x)*env(n,.002,.07)
for k in (.3,1.05,1.8): add(beat(),k,.7); add(beat(),k+.22,.45)
def sting(at):  # signature de série : bzz d'abeille + carillon 2 notes
    n=int(.45*SR); x=np.arange(n)/SR; f=210+25*np.sin(2*np.pi*9*x); s=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*.25*(1+.5*np.sin(2*np.pi*31*x))*env(n,.01,.25); add(s,at,.5)
    for d,fr in ((.18,1318.5),(.36,1975.5)):
        m=int(1.2*SR); y=np.arange(m)/SR; add((np.sin(2*np.pi*fr*y)+.3*np.sin(2*np.pi*fr*2*y))*env(m,.002,.35),at+d,.35)
sting(2.16)
def boom(at):
    n=int(1.8*SR); x=np.arange(n)/SR; f=28+50*np.exp(-x*6); s=np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.002,.5)+.4*rng.standard_normal(n)*env(n,.001,.08); add(np.tanh(1.6*s),at,.9)
for a in (18.96,22.16,23.25): boom(a)
def whoosh(at):
    n=int(.5*SR); s=rng.standard_normal(n); s=np.convolve(s,np.ones(30)/30,'same')*np.sin(np.linspace(0,np.pi,n))*.5; add(s,at-.4)
for a in (8.19,12.4,17.4,22.9): whoosh(a)
for a in (24.72,26.16):
    m=int(1.5*SR); y=np.arange(m)/SR; add(np.sin(2*np.pi*1046.5*y)*env(m,.002,.5),a,.25)
out=np.tanh(out*1.2)*.85; out*=np.clip((D-t)/.6,0,1)
w=wave.open(sys.argv[1],"wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
