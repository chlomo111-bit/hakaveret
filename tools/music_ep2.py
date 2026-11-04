# Musique reel 5.11 « פרק 2 » : suspense 0–3.88, boom « זז » 2.96 + « פרק 2 » 3.88, house, creux journal 16.04–22.54, boom 14.74, reprise CTA
import numpy as np, wave, sys, subprocess
SR=44100; D=32.0; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(11)
subprocess.run([sys.executable,"tools/music_party.py","/tmp/_pb.wav",str(D)],check=True)
w=wave.open("/tmp/_pb.wav"); bed=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32767; w.close(); bed=np.pad(bed,(0,max(0,N-len(bed))))[:N]
def env(n,a,d): x=np.arange(n)/SR; return np.clip(x/a,0,1)*np.exp(-x/d)
def add(s,at,g=1):
    i=int(at*SR); j=min(N,i+len(s)); out[i:j]+=g*s[:j-i]
def ramp(a,b,v0,v1): return np.clip((t-a)/(b-a),0,1)*(v1-v0)+v0
g=np.ones(N)
g[t<3.88]=0.0; g=np.where((t>=3.88)&(t<4.2),ramp(3.88,4.2,0,1),g)
g=np.where((t>=16.04)&(t<22.54),0.35,g)

out=bed*g
drone=lambda a,b,f:np.sin(2*np.pi*f*t)*.12*((t>=a)&(t<b))*np.clip((t-a)/.4,0,1)*np.clip((b-t)/.3,0,1)
out+=drone(0,3.9,55)+drone(0,3.9,82.4)*.6
def beat():
    n=int(.25*SR); x=np.arange(n)/SR; return np.sin(2*np.pi*(55+40*np.exp(-x*30))*x)*env(n,.002,.07)
k=0.3
while k<2.9: add(beat(),k,.7); add(beat(),k+.22,.45); k+=.75
def boom(at):
    n=int(1.8*SR); x=np.arange(n)/SR; f=28+50*np.exp(-x*6); s=np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.002,.5)+.4*rng.standard_normal(n)*env(n,.001,.08); add(np.tanh(1.6*s),at,.9)
for a in (2.96,3.88,14.74,24.74): boom(a)
def whoosh(at):
    n=int(.5*SR); s=rng.standard_normal(n); s=np.convolve(s,np.ones(30)/30,'same')*np.sin(np.linspace(0,np.pi,n))*.5; add(s,at-.4)
whoosh(16.04); whoosh(22.54)
out=np.tanh(out*1.2)*.85; out*=np.clip((D-t)/.6,0,1)
w=wave.open(sys.argv[1],"wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
