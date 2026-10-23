import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const W = 1920;
const H = 1080;
const COUNT = 88;
const TAU = Math.PI * 2;

const smooth = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hash = (n: number) => {
  const v = Math.sin(n * 127.1 + 31.7) * 43758.5453;
  return v - Math.floor(v);
};

export const ParticlePath: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const gather = smooth((t - 1.35) / 1.65);
  const release = smooth((t - 4.05) / 1.45);
  const reassemble = smooth((t - 6.0) / 1.3);
  const flow = t * 0.68;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 48%, #132b48 0%, #071322 52%, #040a12 100%)', overflow: 'hidden'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="flow" x1="0" x2="1"><stop offset="0%" stopColor="#4fe1ff" stopOpacity=".08"/><stop offset="50%" stopColor="#6ceaff" stopOpacity=".8"/><stop offset="100%" stopColor="#b2f7ff" stopOpacity=".08"/></linearGradient>
          <radialGradient id="particle"><stop offset="0%" stopColor="#fff"/><stop offset="40%" stopColor="#a5f4ff"/><stop offset="100%" stopColor="#23b5f2" stopOpacity=".45"/></radialGradient>
        </defs>
        {Array.from({length: 5}, (_, j) => {
          const y = 280 + j * 125;
          return <path key={j} d={`M -90 ${y} C 430 ${y - 150} 560 ${y + 165} 960 540 S 1520 ${y - 110} 2010 ${y}`} fill="none" stroke="url(#flow)" strokeWidth={2.5} opacity={0.24 + 0.18 * Math.sin(t * 1.5 + j)}/>;
        })}
        {Array.from({length: COUNT}, (_, i) => {
          const lane = i % 5;
          const seed = hash(i);
          const phase = (seed + flow * (0.4 + hash(i + 19) * 0.35)) % 1;
          const x0 = -120 + phase * 2160;
          const y0 = 280 + lane * 125 + Math.sin(phase * TAU * 1.35 + lane) * 76;
          const theta = i * 2.39996;
          const radius = 14 + Math.sqrt((i + 0.5) / COUNT) * 180;
          const gx = 960 + Math.cos(theta) * radius;
          const gy = 540 + Math.sin(theta) * radius;
          const burstX = gx + Math.cos(theta + 0.3) * (260 + hash(i + 2) * 340);
          const burstY = gy + Math.sin(theta + 0.3) * (170 + hash(i + 7) * 230);
          const targetAngle = (i / COUNT) * TAU * 3;
          const tx = 960 + Math.cos(targetAngle) * (170 + 18 * Math.sin(i));
          const ty = 540 + Math.sin(targetAngle) * (170 + 18 * Math.sin(i));
          const x1 = lerp(x0, gx, gather);
          const y1 = lerp(y0, gy, gather);
          const x2 = lerp(x1, burstX, release);
          const y2 = lerp(y1, burstY, release);
          const x = lerp(x2, tx, reassemble);
          const y = lerp(y2, ty, reassemble);
          const r = 3.2 + hash(i + 3) * 5;
          const opacity = interpolate(frame, [0, 14, 225, 239], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return <g key={i} opacity={opacity}><circle cx={x} cy={y} r={r * 2.5} fill="#25caff" opacity=".10"/><circle cx={x} cy={y} r={r} fill="url(#particle)"/></g>;
        })}
        <circle cx="960" cy="540" r={205} stroke="#6ceaff" strokeWidth="1" strokeDasharray="4 16" fill="none" opacity={reassemble * .45}/>
        <text x="120" y="135" fill="#e9f8ff" fontSize="42" fontFamily="sans-serif" fontWeight="600">PARTICLE / PATH</text>
        <text x="122" y="182" fill="#8caabd" fontSize="24" fontFamily="sans-serif">FLOW  ·  CONVERGE  ·  DISPERSE  ·  REASSEMBLE</text>
        <text x="122" y="980" fill="#7c9eb0" fontSize="22" fontFamily="sans-serif">V2-P1 / EXPERIMENT A / REMOTION</text>
      </svg>
    </AbsoluteFill>
  );
};
