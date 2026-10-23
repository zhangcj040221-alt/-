import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';

const W=1920,H=1080,FPS=30;
const ease=(t:number)=>Math.max(0,Math.min(1,t));
const appear=(f:number,start:number,duration=18)=>ease((f-start)/duration);
const sky='#09142d',white='#f4f8ff',yellow='#facc15',cyan='#67e8f9';
const Star:React.FC<{x:number;y:number;r?:number}>=({x,y,r=3})=><circle cx={x} cy={y} r={r} fill="#bcd9ff" opacity={0.6}/>;
const Bolt:React.FC<{progress:number}>=({progress})=>{const points=[[1070,135],[950,350],[1050,350],[850,680],[930,470],[840,470],[990,135]];const p=points.slice(0,Math.max(2,Math.floor(progress*(points.length-1))+1)).map(v=>v.join(',')).join(' ');return <polyline points={p} fill="none" stroke={yellow} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>};
const Tag:React.FC<{children:React.ReactNode;top:number;color?:string}>=({children,top,color=white})=><div style={{position:'absolute',top,left:115,fontSize:40,fontWeight:700,color,letterSpacing:3}}>{children}</div>;
export const ThunderExplainer:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const sec=f/fps;
 const title=sec<6,flash=sec>=6&&sec<14,wave=sec>=14&&sec<24,compare=sec>=24&&sec<34,ending=sec>=34;
 const camera=spring({frame:f,fps,config:{damping:20,stiffness:70}});
 const boltProgress=ease((sec-6.8)/0.45);const waveRadius=(sec-14.8)*110;
 const beamProgress=ease((sec-25)/1.2);const soundProgress=ease((sec-25)/6);
 return <AbsoluteFill style={{background:sky,fontFamily:'Arial, sans-serif',color:white,overflow:'hidden'}}>
 <svg width={W} height={H} viewBox="0 0 1920 1080" style={{position:'absolute'}}>
  <defs><radialGradient id="bg"><stop offset="0" stopColor="#173767"/><stop offset="1" stopColor={sky}/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width={W} height={H} fill="url(#bg)"/>
  {Array.from({length:36},(_,i)=><Star key={i} x={(i*347+93)%W} y={(i*191+47)%850} r={i%3+1}/>)}
  <path d="M0 850 Q260 770 510 840 T1030 830 T1550 840 T1920 820 L1920 1080 L0 1080Z" fill="#112544"/>
  {(flash||wave)&&<><g opacity={appear(f,165)}><ellipse cx="950" cy="235" rx="260" ry="90" fill="#2e456a"/><ellipse cx="1130" cy="220" rx="220" ry="95" fill="#3a4d70"/><ellipse cx="790" cy="255" rx="190" ry="72" fill="#3a4d70"/></g>{flash&&<Bolt progress={boltProgress}/>}</>}
  {wave&&Array.from({length:5},(_,i)=>{const radius=waveRadius-i*110;return radius>0?<circle key={i} cx="960" cy="485" r={radius} stroke={cyan} strokeWidth={8} opacity={Math.max(0,.7-radius/1300)} fill="none"/>:null})}
  {compare&&<><line x1="220" y1="460" x2="1700" y2="460" stroke="#496080" strokeWidth="8" strokeDasharray="20 25"/><circle cx="220" cy="460" r="35" fill={yellow}/><circle cx="1700" cy="460" r="35" fill="#e2e8f0"/><line x1="220" y1="380" x2={220+1480*beamProgress} y2="380" stroke={yellow} strokeWidth="25" strokeLinecap="round"/><line x1="220" y1="540" x2={220+1480*soundProgress} y2="540" stroke={cyan} strokeWidth="25" strokeLinecap="round"/></>}
 </svg>
 {title&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center'}}><div style={{fontSize:40,color:cyan,letterSpacing:8,opacity:appear(f,8)}}>40 秒科学动画 · 第一集</div><div style={{fontSize:94,fontWeight:900,marginTop:35,transform:`scale(${.88+.12*camera})`,opacity:appear(f,12)}}>为什么先看见闪电，<br/><span style={{color:yellow}}>后听见雷声？</span></div><div style={{fontSize:33,marginTop:55,color:'#b8c7df',opacity:appear(f,65)}}>答案藏在光与声音的速度里</div></div>}
 {flash&&<><Tag top={115} color={yellow}>01 · 闪电瞬间照亮天空</Tag><div style={{position:'absolute',right:125,bottom:160,fontSize:44,fontWeight:700,opacity:appear(f,210)}}>光，几乎立刻到达眼睛</div></>}
 {wave&&<><Tag top={115} color={cyan}>02 · 雷声是一圈圈传播的声波</Tag><div style={{position:'absolute',right:130,bottom:130,fontSize:42,fontWeight:700}}>声音需要时间穿过空气</div></>}
 {compare&&<><Tag top={110}>03 · 速度差异，决定了先后顺序</Tag><div style={{position:'absolute',left:230,top:280,fontSize:42,color:yellow,fontWeight:700}}>光：约 30 万千米/秒</div><div style={{position:'absolute',left:230,top:625,fontSize:42,color:cyan,fontWeight:700}}>声：约 343 米/秒</div><div style={{position:'absolute',left:230,bottom:115,fontSize:29,color:'#b8c7df'}}>示意图：两条进度线不按真实速度比例绘制</div></>}
 {ending&&<div style={{position:'absolute',inset:0,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',opacity:appear(f,1020)}}><div style={{fontSize:83,fontWeight:900,textAlign:'center'}}>先看见闪电，<br/><span style={{color:cyan}}>再听见雷声。</span></div><div style={{fontSize:35,marginTop:65,color:'#c5d6f2'}}>因为光比声音传播得快得多。</div><div style={{fontSize:25,marginTop:100,color:'#94a3b8'}}>声速按约 20°C 空气估算 · 科学动画示意</div></div>}
 </AbsoluteFill>;
};
