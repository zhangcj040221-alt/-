import React from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)};
const C={navy:'#071326',blue:'#122f51',ink:'#eaf6ff',muted:'#9fbad2',gold:'#ffd166',cyan:'#62e9e5'};
const Cloud:React.FC<{x:number;y:number;s:number;drift:number;opacity?:number}>=({x,y,s,drift,opacity=1})=><g transform={`translate(${x+drift},${y}) scale(${s})`} opacity={opacity}><ellipse cx="0" cy="38" rx="185" ry="56" fill="#263d5d"/><circle cx="-75" cy="0" r="90" fill="#314b70"/><circle cx="35" cy="-40" r="120" fill="#314b70"/><circle cx="128" cy="18" r="75" fill="#263d5d"/></g>;
const Caption:React.FC<{step:string;title:string;subtitle:string;accent?:string}>=({step,title,subtitle,accent=C.cyan})=><div style={{position:'absolute',left:110,top:90,right:110}}><div style={{color:accent,fontSize:27,letterSpacing:6,fontWeight:700}}>{step}</div><div style={{fontSize:70,fontWeight:900,marginTop:22,letterSpacing:2}}>{title}</div><div style={{fontSize:31,color:C.muted,marginTop:20}}>{subtitle}</div></div>;
const Lightning:React.FC<{t:number}>=({t})=>{const d='M 1050 245 L 943 445 L 1030 445 L 870 758 L 937 520 L 853 520 L 965 245';return <><path d={d} fill="none" stroke={C.gold} strokeWidth={26} strokeLinejoin="round" strokeLinecap="round" strokeDasharray="950" strokeDashoffset={950*(1-smooth(t))} filter="url(#blurGlow)" opacity=".55"/><path d={d} fill="none" stroke="#fff5b4" strokeWidth={11} strokeLinejoin="round" strokeLinecap="round" strokeDasharray="950" strokeDashoffset={950*(1-smooth(t))}/></>};
const Wave:React.FC<{radius:number;opacity:number}>=({radius,opacity})=><circle cx="970" cy="555" r={Math.max(0,radius)} fill="none" stroke={C.cyan} strokeWidth="9" opacity={opacity}/>;
export const ThunderV2:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),t=f/fps;
 const opening=t<6,storm=t>=6&&t<15,waves=t>=15&&t<24,comparison=t>=24&&t<35,finale=t>=35;
 const fade=(a:number,b:number)=>smooth((t-a)/(b-a));
 const shake=storm&&t>8.5&&t<8.8?Math.sin(f*5)*7:0;
 const flash=storm&&t>8.6&&t<8.85?.27:0;
 const rain=storm||waves;
 const lightningT=(t-8.35)/.42;
 const travel=clamp((t-26)/6.5);
 const lightTravel=smooth((t-26)/.6);
 return <AbsoluteFill style={{background:C.navy,color:C.ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
 <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',transform:`translate(${shake}px,0)`}}>
 <defs><linearGradient id="night" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#071326"/><stop offset=".68" stopColor="#173b5e"/><stop offset="1" stopColor="#1c3551"/></linearGradient><filter id="blurGlow"><feGaussianBlur stdDeviation="15"/></filter><linearGradient id="ground" x1="0" x2="1"><stop stopColor="#091c35"/><stop offset="1" stopColor="#112945"/></linearGradient></defs>
 <rect width="1920" height="1080" fill="url(#night)"/>
 {Array.from({length:75},(_,i)=><circle key={i} cx={(i*431+41)%1920} cy={(i*179+37)%760} r={i%4===0?2.6:1.2} fill="#d5e7ff" opacity={.16+(i%4)*.1}/>)}
 {(opening||storm||waves)&&<g opacity={opening?.6:1}><Cloud x={450} y={285} s={1.4} drift={Math.sin(f/90)*30} opacity={.8}/><Cloud x={1130} y={230} s={1.55} drift={Math.cos(f/100)*35}/><Cloud x={1640} y={310} s={1.05} drift={Math.sin(f/85)*20} opacity={.7}/></g>}
 {rain&&Array.from({length:85},(_,i)=>{const x=(i*157+f*11)%2050-65,y=(i*271+f*27)%930;return <line key={i} x1={x} y1={y} x2={x-18} y2={y+53} stroke="#8eb6d9" strokeWidth="2.4" opacity=".24"/>})}
 <path d="M0 860 Q230 795 455 848 T910 836 T1360 842 T1920 823 L1920 1080 L0 1080Z" fill="url(#ground)"/>
 <g fill="#07182d">{Array.from({length:17},(_,i)=>{const x=i*130;return <rect key={i} x={x} y={810-(i*37)%125} width={94} height={230} rx={3}/>})}</g>
 {(storm||waves)&&<Lightning t={lightningT}/>}
 {waves&&Array.from({length:6},(_,i)=>{const radius=((t-15.5)*160-i*150);return radius>0?<Wave key={i} radius={radius} opacity={clamp(1-radius/1600)*.65}/>:null})}
 {comparison&&<><rect x="160" y="385" width="1600" height="300" rx="32" fill="#0a1b32" stroke="#335273" strokeWidth="3"/><path d="M270 480 H1650 M270 585 H1650" stroke="#294766" strokeWidth="12" strokeLinecap="round"/><path d={`M270 480 H${270+1380*lightTravel}`} stroke={C.gold} strokeWidth="18" strokeLinecap="round"/><path d={`M270 585 H${270+1380*smooth(travel)}`} stroke={C.cyan} strokeWidth="18" strokeLinecap="round"/><circle cx={270+1380*lightTravel} cy="480" r="25" fill={C.gold}/><circle cx={270+1380*smooth(travel)} cy="585" r="25" fill={C.cyan}/></>}
 </svg>
 {flash>0&&<AbsoluteFill style={{background:'#dbeafe',opacity:flash,pointerEvents:'none'}}/>}
 {opening&&<div style={{position:'absolute',inset:0,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',textAlign:'center'}}><div style={{fontSize:29,letterSpacing:9,color:C.cyan,opacity:fade(.2,1.3)}}>SCIENCE / MOTION STORY 01</div><div style={{fontSize:100,fontWeight:900,lineHeight:1.32,marginTop:38,transform:`translateY(${(1-fade(.5,1.8))*75}px)`,opacity:fade(.5,1.8)}}>为什么先看见<span style={{color:C.gold}}>闪电</span>，<br/>后听见<span style={{color:C.cyan}}>雷声</span>？</div><div style={{marginTop:56,fontSize:32,color:C.muted,opacity:fade(2.2,3.3)}}>同一场雷暴，两种不同的传播速度</div></div>}
 {storm&&<><Caption step="01 / LIGHTNING" title="闪电：几乎瞬间抵达" subtitle="强烈放电，照亮了整片天空" accent={C.gold}/><div style={{position:'absolute',bottom:105,right:110,fontSize:32,color:C.gold,opacity:fade(9,10)}}>看见！  ↗</div></>}
 {waves&&<><Caption step="02 / THUNDER" title="雷声：需要时间传播" subtitle="闪电加热空气，引发压力波向外扩散"/><div style={{position:'absolute',bottom:100,left:110,background:'#102b48',padding:'22px 38px',borderRadius:24,border:'2px solid #356a80',fontSize:29}}>声波 ≠ 光线 · 传播机制不同</div></>}
 {comparison&&<><Caption step="03 / SPEED" title="差别到底有多大？" subtitle="同样的距离，光几乎立刻到达；声音明显滞后"/><div style={{position:'absolute',left:275,top:424,color:C.gold,fontSize:26,fontWeight:800}}>光 LIGHT</div><div style={{position:'absolute',left:275,top:530,color:C.cyan,fontSize:26,fontWeight:800}}>声 SOUND</div><div style={{position:'absolute',bottom:115,left:165,fontSize:28,color:C.muted}}>光 ≈ 300,000 km/s　　声 ≈ 343 m/s（20°C 空气）</div><div style={{position:'absolute',bottom:67,left:165,fontSize:23,color:'#829bb7'}}>动画为定性示意，运动比例并非真实物理比例</div></>}
 {finale&&<div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',opacity:fade(35,36.2)}}><div style={{fontSize:33,letterSpacing:8,color:C.cyan}}>THE ANSWER</div><div style={{fontSize:100,fontWeight:900,marginTop:40,lineHeight:1.3}}>不是雷声来晚了，<br/><span style={{color:C.gold}}>是光跑得太快。</span></div><div style={{fontSize:34,color:C.muted,marginTop:75}}>下一次闪电时，试着数一数雷声晚了几秒。</div></div>}
 <div style={{position:'absolute',left:110,bottom:36,fontSize:22,letterSpacing:3,color:'#7794af'}}>MG SCIENCE LAB / REMOTION</div>
 <div style={{position:'absolute',right:110,bottom:36,fontSize:22,color:'#7794af'}}>V2 · VISUAL DEVELOPMENT</div>
 </AbsoluteFill>;
};
