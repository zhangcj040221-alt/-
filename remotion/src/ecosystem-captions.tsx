import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {parseSrt} from '@remotion/captions';

// Reusable SRT-driven captions. Timing is in milliseconds, independent of FPS.
const srt=`1
00:00:00,500 --> 00:00:03,000
看见闪电，是光先到达眼睛。

2
00:00:03,000 --> 00:00:06,000
听见雷声，是声音随后到达耳朵。

3
00:00:06,000 --> 00:00:09,000
字幕来自标准 SRT，可换成任何科普脚本。
`;
const {captions}=parseSrt({input:srt});
export const EcosystemCaptions:React.FC=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),ms=frame/fps*1000;
 const active=captions.find(c=>ms>=c.startMs&&ms<c.endMs);
 const enter=active?interpolate(ms,[active.startMs,active.startMs+260],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):0;
 return <AbsoluteFill style={{background:'linear-gradient(145deg,#0c1c32,#173e55)',color:'#eaf7ff',fontFamily:'Noto Sans CJK SC, Noto Sans CJK JP, sans-serif'}}>
  <div style={{position:'absolute',top:100,left:140,color:'#67e8f9',fontSize:35,letterSpacing:7}}>ECOSYSTEM / CAPTIONS + AUDIO CUE</div>
  <div style={{position:'absolute',top:215,left:140,fontSize:90,fontWeight:800}}>同一套字幕系统</div>
  <div style={{position:'absolute',top:340,left:140,fontSize:48,color:'#cbd5e1'}}>SRT 时间轴 → 自动切换字幕 → 独立音频轨道</div>
  <div style={{position:'absolute',left:140,right:140,top:485,height:4,background:'#355c71'}}>
   <div style={{height:'100%',width:`${Math.min(100,frame/300*100)}%`,background:'#67e8f9'}}/>
  </div>
  <div style={{position:'absolute',bottom:160,left:130,right:130,minHeight:160,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.52)',borderRadius:24}}>
   <div style={{fontSize:56,fontWeight:700,textAlign:'center',opacity:enter,transform:`translateY(${(1-enter)*16}px)`}}>{active?.text??'字幕演示即将开始'}</div>
  </div>
  <div style={{position:'absolute',bottom:60,left:140,color:'#93aebd',fontSize:25}}>官方 @remotion/captions · parseSrt · 可替换为真实配音时间戳</div>
 </AbsoluteFill>;
};
