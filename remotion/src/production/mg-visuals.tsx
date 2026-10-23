import React from 'react';
import {interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

export type VisualSpec={
 type:'process'|'cycle'|'compare'|'stat';
 items?:string[];
 value?:number;
 unit?:string;
 caption?:string;
};
export const MGVisual:React.FC<{visual:VisualSpec;accent:string}>=({visual,accent})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const reveal=(i:number)=>spring({frame:frame-i*8,fps,config:{damping:18,stiffness:90}});
 const card:React.CSSProperties={background:'rgba(255,255,255,.07)',border:'2px solid rgba(255,255,255,.18)',borderRadius:28,padding:'32px 26px',textAlign:'center',boxShadow:'0 12px 50px rgba(0,0,0,.12)'};
 const items=(visual.items??[]).slice(0,6);
 if(visual.type==='stat'){
  const value=visual.value??0;
  return <div style={{...card,width:650,margin:'auto',transform:`scale(${.8+.2*reveal(0)})`}}>
   <div style={{fontSize:145,fontWeight:900,color:accent}}>{Math.round(value*interpolate(frame,[0,45],[0,1],{extrapolateRight:'clamp'}))}<span style={{fontSize:55}}>{visual.unit??''}</span></div>
   <div style={{fontSize:36,color:'#c7dfed'}}>{visual.caption??''}</div>
  </div>;
 }
 if(visual.type==='compare')return <div style={{display:'flex',gap:34,justifyContent:'center'}}>
  {items.slice(0,2).map((item,i)=><div key={i} style={{...card,width:380,opacity:reveal(i),transform:`translateY(${(1-reveal(i))*55}px)`,fontSize:46,fontWeight:800,borderColor:i===0?accent:'#9cb6d3'}}>{item}</div>)}
 </div>;
 if(visual.type==='cycle')return <div style={{position:'relative',width:700,height:430,margin:'auto'}}>
  <svg width="700" height="430" style={{position:'absolute',inset:0}}><circle cx="350" cy="215" r="155" stroke={accent} strokeWidth="8" strokeDasharray="18 12" opacity=".55" fill="none" strokeDashoffset={-frame*2}/></svg>
  {items.slice(0,4).map((item,i,arr)=>{const angle=(i/arr.length)*Math.PI*2-Math.PI/2;const x=350+185*Math.cos(angle),y=215+185*Math.sin(angle);return <div key={i} style={{...card,position:'absolute',left:x-105,top:y-48,width:210,padding:'24px 8px',fontSize:30,fontWeight:800,opacity:reveal(i),transform:`scale(${.7+.3*reveal(i)})`,borderColor:accent}}>{item}</div>})}
 </div>;
 return <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14}}>
  {items.map((item,i)=><React.Fragment key={i}><div style={{...card,minWidth:180,maxWidth:290,fontSize:31,fontWeight:800,opacity:reveal(i),transform:`translateY(${(1-reveal(i))*45}px)`,borderColor:accent}}>{item}</div>{i<items.length-1&&<div style={{fontSize:58,color:accent,opacity:reveal(i+1)}}>→</div>}</React.Fragment>)}
 </div>;
};
