"""Deterministic original procedural BGM and SFX using Python stdlib; no licenses or downloads."""
import math, random, wave, struct
from pathlib import Path
RATE=16000
OUT=Path(__file__).resolve().parents[1]/"public"/"sound"
OUT.mkdir(parents=True,exist_ok=True)
rng=random.Random(20261023)
def write(name,seconds,fn):
    n=int(seconds*RATE)
    with wave.open(str(OUT/name),"wb") as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(RATE)
        buf=bytearray()
        for i in range(n):
            t=i/RATE
            v=max(-.95,min(.95,fn(t,seconds)))
            buf.extend(struct.pack("<h",int(v*32767)))
        w.writeframes(buf)
    print(name,n/RATE,flush=True)
def env(t,d):return min(1,t/.08,(d-t)/.25)
# Original minimalist ambient pulse: three gentle chords and rhythmic low plucks.
notes=[(130.81,164.81,196.00),(146.83,185.00,220.00),(110.00,146.83,174.61),(130.81,164.81,196.00)]
def bgm(t,d):
    chord=notes[int(t//8)%len(notes)]
    pad=sum(math.sin(2*math.pi*f*t+0.15*math.sin(t*.5)) for f in chord)/3
    beat=t%1.0
    pluck=math.sin(2*math.pi*chord[0]*2*t)*math.exp(-beat*9)
    return env(t,d)*(.11*pad+.045*pluck)
write("bgm-ambient.wav",42,bgm)
write("sfx-flash.wav",.55,lambda t,d:(rng.random()*2-1)*.42*math.exp(-t*19)+.14*math.sin(2*math.pi*(850-650*t)*t)*math.exp(-t*8))
write("sfx-thunder.wav",5.4,lambda t,d:(rng.random()*2-1)*.52*math.exp(-t*.75)*(.5+.5*math.sin(t*7)**2)+.12*math.sin(2*math.pi*55*t)*math.exp(-t*.55))
write("sfx-whoosh.wav",1.0,lambda t,d:(rng.random()*2-1)*.17*math.sin(math.pi*t/d)**2)
write("sfx-ping.wav",1.2,lambda t,d:.27*math.sin(2*math.pi*740*t)*math.exp(-t*5)+.13*math.sin(2*math.pi*1110*t)*math.exp(-t*7))
