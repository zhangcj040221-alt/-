import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
export const Intro: React.FC = () => {
 const frame=useCurrentFrame(); const {fps}=useVideoConfig();
 const pop=spring({frame,fps,config:{damping:15,stiffness:90}});
 const shift=interpolate(frame,[0,150],[0,350],{extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background:'#0b1020',justifyContent:'center',alignItems:'center',fontFamily:'Arial,sans-serif',color:'#fff',overflow:'hidden'}}>
 <div style={{position:'absolute',width:600,height:600,borderRadius:'50%',background:'#1d4ed8',filter:'blur(100px)',opacity:.4,transform:`translateX(${shift-175}px)`}} />
 <div style={{fontSize:34,color:'#67e8f9',letterSpacing:8,opacity:pop}}>MOTION GRAPHICS LAB</div>
 <div style={{fontSize:120,fontWeight:800,transform:`scale(${pop})`,marginTop:32}}>从代码到动画</div>
 <div style={{fontSize:36,color:'#cbd5e1',marginTop:30,opacity:interpolate(frame,[25,55],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Remotion · 1920 × 1080 · 30 FPS</div>
 </AbsoluteFill>;
};
