import React from 'react';
import {interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';

export type VisualSpec={
 type:'process'|'cycle'|'compare'|'stat'|'water-cycle';
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
 if(visual.type==='water-cycle'){
  const phase=(frame/Math.max(1,fps*5))*Math.PI*2;
  const nodes=[{x:210,y:310,label:'蒸发',icon:'↑'},{x:500,y:95,label:'凝结',icon:'☁'},{x:790,y:310,label:'降水',icon:'↓'},{x:500,y:410,label:'回流',icon:'≈'}];
  const orbit=nodes.map(n=>[n.x,n.y]);
  const dropX=500+290*Math.cos(phase-Math.PI/2),dropY=270+150*Math.sin(phase-Math.PI/2);
  return <svg viewBox="0 0 1000 530" style={{width:'100%',height:450,overflow:'visible'}}>
   <defs><marker id="mg-arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L0 6 L8 3 Z" fill={accent}/></marker></defs>
   <path d="M210 310 Q270 105 500 95 Q740 95 790 310 Q720 450 500 410 Q280 450 210 310" fill="none" stroke={accent} strokeWidth="8" opacity=".65" strokeDasharray="18 10" strokeDashoffset={-frame*2} markerEnd="url(#mg-arrow)"/>
   <path d="M130 370 Q500 300 870 370 L870 500 L130 500 Z" fill="#176da4" opacity=".4"/>
   <path d="M130 375 Q500 305 870 375" stroke="#74d9fa" strokeWidth="7" fill="none"/>
   <circle cx="130" cy="100" r="53" fill="#ffd166" opacity=".95"/>
   {Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return <line key={i} x1={130+67*Math.cos(a)} y1={100+67*Math.sin(a)} x2={130+86*Math.cos(a)} y2={100+86*Math.sin(a)} stroke="#ffd166" strokeWidth="8" strokeLinecap="round"/>})}
   <g transform={`translate(${dropX} ${dropY})`}><path d="M0 -22 C-12 -3 -19 5 -19 15 A19 19 0 0 0 19 15 C19 5 12 -3 0 -22Z" fill="#83e3ff" stroke="#fff" strokeWidth="3"/></g>
   {nodes.map((n,i)=><g key={i} opacity={reveal(i)} transform={`translate(${n.x} ${n.y}) scale(${.8+.2*reveal(i)})`}>
    <rect x="-90" y="-45" width="180" height="90" rx="28" fill="#103654" stroke={accent} strokeWidth="4"/>
    <text x="-50" y="14" fill={accent} fontSize="42" fontWeight="bold">{n.icon}</text>
    <text x="8" y="12" fill="#fff" fontSize="30" fontWeight="bold">{n.label}</text>
   </g>)}
  </svg>;
 }
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
