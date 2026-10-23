import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';

/** Reusable official Remotion transitions, not a per-film bespoke animation. */
const Panel:React.FC<{number:string;heading:string;description:string;background:string;accent:string}>=({number,heading,description,background,accent})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const lift=interpolate(frame,[0,.8*fps],[70,0],{extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Arial,sans-serif',color:'#f8fafc'}}>
 <div style={{fontSize:36,letterSpacing:12,color:accent}}>{number}</div>
 <div style={{fontSize:100,fontWeight:900,marginTop:35,transform:`translateY(${lift}px)`}}>{heading}</div>
 <div style={{fontSize:39,color:'#cbd5e1',marginTop:40}}>{description}</div>
 <div style={{position:'absolute',bottom:80,fontSize:27,opacity:.65}}>OFFICIAL @remotion/transitions · REUSABLE DEMO</div>
 </AbsoluteFill>;
};
export const EcosystemTransitions:React.FC=()=>{const {fps}=useVideoConfig();return <TransitionSeries>
 <TransitionSeries.Sequence durationInFrames={5*fps}><Panel number="01 / CONCEPT" heading="看见闪电" description="光迅速传播" background="#102744" accent="#facc15"/></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={slide({direction:'from-right'})} timing={linearTiming({durationInFrames:1*fps})}/>
 <TransitionSeries.Sequence durationInFrames={5*fps}><Panel number="02 / MECHANISM" heading="听见雷声" description="声音在空气中传播" background="#123b49" accent="#67e8f9"/></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:1*fps})}/>
 <TransitionSeries.Sequence durationInFrames={5*fps}><Panel number="03 / TAKEAWAY" heading="速度决定先后" description="转场可用于其他任何科普主题" background="#302744" accent="#c4b5fd"/></TransitionSeries.Sequence>
 </TransitionSeries>};
