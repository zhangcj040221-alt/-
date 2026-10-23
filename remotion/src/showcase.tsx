import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {AnimatedBar,FadeUp,SceneTitle} from './mg';
export const MGShowcase:React.FC=()=>{
 const frame=useCurrentFrame();const intro=frame<105;const chart=frame>=105&&frame<280;const closing=frame>=280;
 return <AbsoluteFill style={{background:'#090f22',color:'#f8fafc',fontFamily:'Arial,sans-serif',justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
 <div style={{position:'absolute',width:1000,height:1000,borderRadius:'50%',border:'3px solid #1e3a8a',opacity:.35,transform:`rotate(${frame*.5}deg) translateX(350px)`}}/>
 {intro&&<SceneTitle eyebrow="CODE-DRIVEN EXPLAINER" title="数据如何讲故事？"/>}
 {chart&&<div style={{width:1200}}><FadeUp delay={105}><div style={{fontSize:68,fontWeight:800,marginBottom:60}}>三组示例数据</div></FadeUp><AnimatedBar label="探索" value={78} max={100} color="#22d3ee" delay={125}/><AnimatedBar label="发现" value={55} max={100} color="#a78bfa" delay={145}/><AnimatedBar label="理解" value={92} max={100} color="#34d399" delay={165}/><div style={{fontSize:25,color:'#94a3b8',marginTop:40}}>示例数据，仅用于测试 MG 动画组件</div></div>}
 {closing&&<div style={{textAlign:'center',opacity:interpolate(frame,[280,310],[0,1],{extrapolateRight:'clamp'})}}><div style={{fontSize:88,fontWeight:800}}>让知识动起来</div><div style={{fontSize:35,color:'#67e8f9',marginTop:35}}>Remotion MG Component Lab</div></div>}
 </AbsoluteFill>;
};
