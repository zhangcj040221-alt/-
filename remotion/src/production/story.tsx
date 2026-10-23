import React from 'react';
import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {AudioPlan,AudioTimeline} from './audio-timeline';
import {MGVisual,VisualSpec} from './mg-visuals';
import {LibraryVisual,LibrarySpec} from './library-visuals';
export type StoryScene={title:string;body:string;seconds:number;accent?:string;label?:string;visual?:VisualSpec|LibrarySpec};
export type StoryPlan={scenes:StoryScene[];audio?:AudioPlan};
export const storyDuration=(plan:StoryPlan,fps=30)=>plan.scenes.reduce((sum,s)=>sum+Math.round(s.seconds*fps),0);
export const StoryVideo:React.FC<{plan:StoryPlan}>=({plan})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 let start=0;let active=plan.scenes[plan.scenes.length-1];
 for(const scene of plan.scenes){const length=Math.round(scene.seconds*fps);if(frame<start+length){active=scene;break;}start+=length;}
 const local=frame-start;const progress=spring({frame:local,fps,config:{damping:200,mass:1}});
 const opacity=interpolate(local,[0,12,Math.max(13,Math.round(active.seconds*fps)-14),Math.round(active.seconds*fps)],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const accent=active.accent??'#62e9e5';
 return <AbsoluteFill style={{background:'linear-gradient(145deg,#071326,#153753)',color:'#eff8ff',fontFamily:'Noto Sans CJK SC, sans-serif',overflow:'hidden'}}>
  <div style={{position:'absolute',left:110,top:92,fontSize:27,letterSpacing:5,color:accent}}>{active.label??'MG SCIENCE / EXPLAINER'}</div>
  <div style={{position:'absolute',left:110,top:active.visual?165:240,right:110,opacity,transform:`translateY(${(1-progress)*45}px)`}}>
   <div style={{height:8,width:170,background:accent,borderRadius:8,marginBottom:55}}/>
   <div style={{fontSize:active.visual?76:98,fontWeight:900,lineHeight:1.32}}>{active.title}</div>
   <div style={{fontSize:active.visual?33:43,color:'#b8cee1',marginTop:active.visual?20:65,lineHeight:1.65}}>{active.body}</div>
  </div>
  {active.visual&&<div style={{position:'absolute',left:100,right:100,top:535}}>(('type' in active.visual && active.visual.type.startsWith('library-')) ? <LibraryVisual visual={active.visual as LibrarySpec} accent={accent}/> : <MGVisual visual={active.visual as VisualSpec} accent={accent}/>)</div>}
  <div style={{position:'absolute',left:110,right:110,bottom:85,height:5,background:'#34536d'}}>
   <div style={{height:5,width:`${100*(frame+1)/storyDuration(plan,fps)}%`,background:accent}}/>
  </div>
  {plan.audio&&<AudioTimeline plan={plan.audio}/>}
 </AbsoluteFill>;
};
