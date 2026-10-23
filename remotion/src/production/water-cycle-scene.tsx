import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
/** Scene-based water cycle: one continuous landscape, phase-specific motion. */
export const WaterCycleScene:React.FC<{phase:number}>=({phase})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const rise=(i:number)=>((t*.28+i*.21)%1);
 const rain=(i:number)=>((t*.9+i*.17)%1);
 const sunPulse=1+.04*Math.sin(t*3);
 return <svg viewBox="0 0 1600 730" width="100%" height="100%" role="img" aria-label="水循环动态场景">
 <defs>
  <linearGradient id="sky" x2="0" y2="1"><stop stopColor="#11395e"/><stop offset="1" stopColor="#276a8e"/></linearGradient>
  <linearGradient id="sea" x2="0" y2="1"><stop stopColor="#35bbdb"/><stop offset="1" stopColor="#14527d"/></linearGradient>
  <filter id="glow"><feGaussianBlur stdDeviation="15"/></filter>
 </defs>
 <rect width="1600" height="730" rx="36" fill="url(#sky)"/>
 <circle cx="270" cy="130" r="92" fill="#ffd36b" opacity=".25" filter="url(#glow)"/>
 <circle cx="270" cy="130" r={65*sunPulse} fill="#ffd36b"/>
 {Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return <line key={i} x1={270+85*Math.cos(a)} y1={130+85*Math.sin(a)} x2={270+108*Math.cos(a)} y2={130+108*Math.sin(a)} stroke="#ffd36b" strokeWidth="8" strokeLinecap="round"/>})}
 <path d="M0 510 Q230 450 470 510 Q650 540 780 480 L780 730 L0 730Z" fill="url(#sea)"/>
 <path d="M710 530 L1060 215 L1240 405 L1390 310 L1600 490 L1600 730 L710 730Z" fill="#316e70"/>
 <path d="M990 275 L1060 215 L1130 305 L1085 291 L1060 315 L1030 286Z" fill="#d3eef1"/>
 <path d="M0 535 Q200 510 400 535 T800 535" stroke="#a0edff" strokeWidth="7" opacity=".7" fill="none"/>
 <path d="M1110 460 Q1040 520 950 580 Q810 630 670 570" fill="none" stroke="#79dcf3" strokeWidth="22" strokeLinecap="round"/>
 <g opacity={phase===0||phase===1?1:.3}>
 {Array.from({length:11},(_,i)=>{const y=510-rise(i)*300;const x=200+i*36+Math.sin(t*1.7+i)*18;return <g key={i} opacity={interpolate(rise(i),[0,.2,.8,1],[0,.8,.7,0])}><circle cx={x} cy={y} r={7+i%3*2} fill="#b4f4ff"/><path d={`M${x} ${y+23}q-12 15 0 30`} fill="none" stroke="#b4f4ff" strokeWidth="4"/></g>})}
 </g>
 <g opacity={phase===0||phase===2||phase===3?1:.45} transform={`translate(${Math.sin(t*.6)*18},0)`}>
 <ellipse cx="965" cy="185" rx="175" ry="64" fill="#d7edf4"/>
 <circle cx="875" cy="160" r="68" fill="#f1f8fb"/><circle cx="965" cy="129" r="92" fill="#f1f8fb"/><circle cx="1060" cy="161" r="73" fill="#f1f8fb"/>
 </g>
 {(phase===0||phase===3)&&Array.from({length:18},(_,i)=>{const y=250+rain(i)*310;const x=835+(i%9)*34;return <line key={i} x1={x} y1={y} x2={x-13} y2={y+34} stroke="#9ce9ff" strokeWidth="6" strokeLinecap="round" opacity={.35+.5*Math.sin(Math.PI*rain(i))}/>})}
 <g fontFamily="Noto Sans CJK SC, sans-serif" fontWeight="bold" fontSize="35">
 <rect x="140" y="600" width="220" height="64" rx="25" fill="#0b324f" opacity=".92"/><text x="250" y="644" fill="#e8fbff" textAnchor="middle">海洋 · 蒸发</text>
 <rect x="845" y="55" width="240" height="64" rx="25" fill="#0b324f" opacity=".92"/><text x="965" y="99" fill="#e8fbff" textAnchor="middle">云层 · 凝结</text>
 <rect x="1240" y="560" width="240" height="64" rx="25" fill="#0b324f" opacity=".92"/><text x="1360" y="604" fill="#e8fbff" textAnchor="middle">山地 · 降水</text>
 </g>
 </svg>;
};
