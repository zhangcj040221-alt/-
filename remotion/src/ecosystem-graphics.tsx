import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Circle,Triangle} from '@remotion/shapes';
import {getLength} from '@remotion/paths';

/** Official reusable SVG primitives and path metrics. */
const route='M 220 610 C 540 240, 930 860, 1260 500 S 1560 360, 1710 540';
const routeLength=getLength(route);
export const EcosystemGraphics:React.FC=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const progress=interpolate(frame,[.6*fps,7.5*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const pulse=1+.09*Math.sin(frame/10);
 return <AbsoluteFill style={{background:'#0b1c34',color:'#eaf6ff',fontFamily:'Arial,sans-serif'}}>
 <div style={{position:'absolute',top:95,left:130,fontSize:34,color:'#67e8f9',letterSpacing:7}}>REUSABLE ECOSYSTEM / VECTOR + PATH</div>
 <div style={{position:'absolute',top:158,left:130,fontSize:76,fontWeight:900}}>一条路线，讲清传播过程</div>
 <svg width="1920" height="1080" style={{position:'absolute'}}>
 <path d={route} stroke="#234b68" strokeWidth="24" fill="none" strokeLinecap="round"/>
 <path d={route} stroke="#67e8f9" strokeWidth="17" fill="none" strokeLinecap="round" strokeDasharray={routeLength} strokeDashoffset={routeLength*(1-progress)}/>
 <circle cx="220" cy="610" r="19" fill="#facc15"/>
 <circle cx="1710" cy="540" r="19" fill="#facc15"/>
 </svg>
 <div style={{position:'absolute',left:195,top:580,transform:`scale(${pulse})`}}><Circle radius={50} fill="#facc15" stroke="#ffffff" strokeWidth={5}/></div>
 <div style={{position:'absolute',right:125,top:460}}><Triangle length={180} direction="right" fill="#facc15" stroke="#fff" strokeWidth={2}/></div>
 <div style={{position:'absolute',bottom:100,left:130,fontSize:31,color:'#a7c6dd'}}>官方组件：@remotion/shapes / Circle + Triangle　·　@remotion/paths / getLength</div>
 <div style={{position:'absolute',bottom:50,left:130,fontSize:23,color:'#6d91b2'}}>适用：物理传播、生产流程、物流路线、抽象机制讲解</div>
 </AbsoluteFill>;
};
