import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile} from 'remotion';
import {ThunderV2} from './thunder-v2';

/** No voice required: BGM plus precisely frame-scheduled original sound effects. */
export const ThunderMusic:React.FC=()=> <AbsoluteFill>
 <ThunderV2/>
 <Audio src={staticFile('sound/bgm-ambient.wav')} volume={0.62}/>
 <Sequence from={Math.round(8.6*30)}><Audio src={staticFile('sound/sfx-flash.wav')} volume={0.9}/></Sequence>
 <Sequence from={Math.round(10.3*30)}><Audio src={staticFile('sound/sfx-thunder.wav')} volume={0.85}/></Sequence>
 <Sequence from={Math.round(15.2*30)}><Audio src={staticFile('sound/sfx-whoosh.wav')} volume={0.7}/></Sequence>
 <Sequence from={Math.round(26.0*30)}><Audio src={staticFile('sound/sfx-ping.wav')} volume={0.6}/></Sequence>
 <Sequence from={Math.round(32.5*30)}><Audio src={staticFile('sound/sfx-ping.wav')} volume={0.5}/></Sequence>
 </AbsoluteFill>;
