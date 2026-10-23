import React from 'react';
import {Audio,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
export type SoundCue={file:string;at:number;volume?:number;duck?:number;duckSeconds?:number};
export type AudioPlan={music?:{file:string;volume?:number;fadeIn?:number;fadeOut?:number};cues?:SoundCue[]};
export const AudioTimeline:React.FC<{plan:AudioPlan}>=({plan})=>{
 const frame=useCurrentFrame();const {fps,durationInFrames}=useVideoConfig();
 const music=plan.music;const cues=plan.cues??[];
 const duck=cues.reduce((v,c)=>{const distance=Math.abs(frame-c.at*fps);const width=(c.duckSeconds??1)*fps;return v*(1-(c.duck??.35)*Math.max(0,1-distance/width));},1);
 const fadeIn=music?.fadeIn??1;const fadeOut=music?.fadeOut??2;
 const inGain=fadeIn<=0?1:interpolate(frame,[0,fadeIn*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const outGain=fadeOut<=0?1:interpolate(frame,[durationInFrames-fadeOut*fps,durationInFrames],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <>{music&&<Audio src={staticFile(music.file)} volume={(music.volume??.5)*inGain*outGain*duck}/>}
 {cues.map((c,i)=><Sequence key={i} from={Math.round(c.at*fps)}><Audio src={staticFile(c.file)} volume={c.volume??.7}/></Sequence>)}</>;
};
