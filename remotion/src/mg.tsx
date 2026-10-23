import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const FadeUp: React.FC<{children: React.ReactNode; delay?: number; distance?: number; style?: React.CSSProperties}> = ({children,delay=0,distance=55,style}) => {
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const t=spring({frame:frame-delay,fps,config:{damping:18,stiffness:85}});
 return <div style={{opacity:interpolate(t,[0,1],[0,1]),transform:`translateY(${(1-t)*distance}px)`,...style}}>{children}</div>;
};
export const AnimatedBar: React.FC<{label:string;value:number;max:number;color:string;delay?:number}> = ({label,value,max,color,delay=0})=>{
 const frame=useCurrentFrame();const progress=interpolate(frame,[delay,delay+32],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <div style={{display:'flex',alignItems:'center',gap:28,marginBottom:25,fontSize:32}}><div style={{width:150}}>{label}</div><div style={{width:770,height:56,background:'#1e293b',borderRadius:16,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.max(0,Math.min(100,value/max*100*progress))}%`,background:color,borderRadius:16}}/></div><div style={{width:100,fontWeight:700}}>{Math.round(value*progress)}</div></div>;
};
export const SceneTitle:React.FC<{eyebrow:string;title:string}>=({eyebrow,title})=><div style={{textAlign:'center'}}><FadeUp><div style={{fontSize:32,color:'#67e8f9',letterSpacing:7}}>{eyebrow}</div></FadeUp><FadeUp delay={12}><div style={{fontSize:84,fontWeight:800,marginTop:24}}>{title}</div></FadeUp></div>;
