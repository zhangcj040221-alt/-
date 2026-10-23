import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile,interpolate,useCurrentFrame} from 'remotion';
import {ThunderV2} from './thunder-v2';

/** P1: reuse Remotion audio timeline, fade and duck music for transient sound effects. */
export const ThunderMusic:React.FC=()=>{
 const frame=useCurrentFrame();
 const bgmFade=interpolate(frame,[0,45,1080,1200],[0,0.48,0.48,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const duck=(center:number,width:number,depth:number)=>Math.max(0,1-Math.abs(frame-center)/width)*depth;
 const bgmVolume=bgmFade*(1-duck(309,85,.55)-duck(456,45,.28)-duck(780,32,.25)-duck(975,32,.25));
 return <AbsoluteFill>
  <ThunderV2/>
  <Audio src={staticFile('sound/bgm-ambient.wav')} volume={bgmVolume}/>
  <Sequence from={258}><Audio src={staticFile('sound/sfx-flash.wav')} volume={0.7}/></Sequence>
  <Sequence from={309}><Audio src={staticFile('sound/sfx-thunder.wav')} volume={0.85}/></Sequence>
  <Sequence from={456}><Audio src={staticFile('sound/sfx-whoosh.wav')} volume={0.55}/></Sequence>
  <Sequence from={780}><Audio src={staticFile('sound/sfx-ping.wav')} volume={0.45}/></Sequence>
  <Sequence from={975}><Audio src={staticFile('sound/sfx-ping.wav')} volume={0.4}/></Sequence>
 </AbsoluteFill>;
};
