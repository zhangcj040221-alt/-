import React from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {parseSrt} from '@remotion/captions';
import {narrationSrt} from './generated-narration';

const {captions}=parseSrt({input:narrationSrt});
export const ChineseNarration:React.FC=()=>{
 const frame=useCurrentFrame();
 const {fps}=useVideoConfig();
 const ms=frame*1000/fps;
 const active=captions.find(c=>ms>=c.startMs&&ms<c.endMs);
 return <AbsoluteFill style={{background:'linear-gradient(145deg,#0c1c32,#173e55)',color:'#eaf7ff',fontFamily:'Noto Sans CJK SC, Noto Sans CJK JP, sans-serif'}}>
  <Audio src={staticFile('narration.mp3')} volume={1} />
  <div style={{position:'absolute',top:110,left:130,fontSize:34,color:'#67e8f9',letterSpacing:5}}>CHINESE NARRATION / AUTOMATIC CAPTIONS</div>
  <div style={{position:'absolute',top:240,left:130,fontSize:88,fontWeight:800}}>中文旁白与字幕同步</div>
  <div style={{position:'absolute',top:380,left:130,fontSize:43,color:'#cbd5e1'}}>edge-tts 语音时间戳 → SRT → Remotion</div>
  <div style={{position:'absolute',left:130,right:130,bottom:175,minHeight:155,background:'rgba(0,0,0,.55)',borderRadius:25,display:'flex',justifyContent:'center',alignItems:'center',padding:25}}>
   <div style={{fontSize:54,fontWeight:700,textAlign:'center'}}>{active?.text??'正在播放中文旁白……'}</div>
  </div>
 </AbsoluteFill>;
};
