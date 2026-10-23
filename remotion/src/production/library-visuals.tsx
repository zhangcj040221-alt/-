import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {Sun,Cloud,CloudRain,Waves,Droplets,Wind,Leaf,Atom} from 'lucide-react';
import {Icon} from '@iconify/react';
import {Lottie} from '@remotion/lottie';
import type {LottieAnimationData} from '@remotion/lottie';
import animationManifest from '../assets/lottie/manifest.json';
export type LibrarySpec={type:'library-icon'|'library-sequence'|'library-lottie';icon?:string;icons?:string[];labels?:string[];animation?:string};
const icons:Record<string,React.ElementType>={sun:Sun,cloud:Cloud,rain:CloudRain,waves:Waves,water:Droplets,wind:Wind,leaf:Leaf,atom:Atom};
const library=animationManifest as Record<string,LottieAnimationData>;
export const LibraryVisual:React.FC<{visual:LibrarySpec;accent:string}>=({visual,accent})=>{
 const frame=useCurrentFrame();
 if(visual.type==='library-lottie'){
  const data=library[visual.animation??''];
  return data?<div style={{width:440,height:360,margin:'auto'}}><Lottie animationData={data}/></div>:<div style={{fontSize:30}}>动画尚未导入：{visual.animation}</div>;
 }
 const names=visual.type==='library-icon'?[visual.icon??'water']:(visual.icons??[]).slice(0,5);
 return <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:24,minHeight:340}}>
 {names.map((name,i)=>{const Component=icons[name]??Droplets;const opacity=interpolate(frame,[i*9,i*9+15],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <React.Fragment key={i}><div style={{width:230,minHeight:230,borderRadius:30,border:'2px solid rgba(255,255,255,.2)',background:'rgba(255,255,255,.06)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:20,opacity}}>
 {name.startsWith('iconify:')?<Icon icon={name.slice(8)} width={100} height={100} color={accent}/>:<Component size={100} color={accent} strokeWidth={2.5}/>}
 <span style={{fontSize:30,fontWeight:800}}>{visual.labels?.[i]??name}</span></div>{i<names.length-1&&<span style={{fontSize:45,color:accent}}>→</span>}</React.Fragment>})}
 </div>;
};
