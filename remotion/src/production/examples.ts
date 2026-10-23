import {StoryPlan} from './story';
export const waterCycle:StoryPlan={
 scenes:[
 {title:'水为什么会循环？',body:'太阳提供能量，让地表的水不断改变形态。',seconds:5,accent:'#62e9e5',label:'01 / THE WATER CYCLE'},
 {title:'蒸发',body:'水吸收热量，变成水蒸气进入空气。',seconds:5,accent:'#ffd166',label:'02 / EVAPORATION'},
 {title:'凝结',body:'水蒸气遇冷，形成细小水滴和云。',seconds:5,accent:'#62e9e5',label:'03 / CONDENSATION'},
 {title:'降水与回流',body:'雨水回到地面、河流和海洋，循环继续。',seconds:5,accent:'#ffd166',label:'04 / PRECIPITATION'}],
 audio:{music:{file:'sound/bgm-ambient.wav',volume:.35,fadeIn:1,fadeOut:2},cues:[
 {file:'sound/sfx-whoosh.wav',at:5,volume:.4,duck:.45},
 {file:'sound/sfx-ping.wav',at:10,volume:.35,duck:.4},
 {file:'sound/sfx-whoosh.wav',at:15,volume:.4,duck:.45}
 ]}
};
