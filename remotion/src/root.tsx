import React from 'react';
import {Composition} from 'remotion';
import {Intro} from './scene';
import {MGShowcase} from './showcase';
import {ThunderExplainer} from './thunder';
import {ThunderV2} from './thunder-v2';
import {EcosystemTransitions} from './ecosystem-transitions';
import {EcosystemGraphics} from './ecosystem-graphics';
import {EcosystemCaptions} from './ecosystem-captions';
import {ThunderMusic} from './thunder-music';
export const Root: React.FC = () => <>
 <Composition id="Intro" component={Intro} durationInFrames={150} fps={30} width={1920} height={1080} />
 <Composition id="MGShowcase" component={MGShowcase} durationInFrames={360} fps={30} width={1920} height={1080} />
 <Composition id="ThunderExplainer" component={ThunderExplainer} durationInFrames={1200} fps={30} width={1920} height={1080} />
 <Composition id="ThunderMusic" component={ThunderMusic} durationInFrames={1200} fps={30} width={1920} height={1080} />
 <Composition id="ThunderV2" component={ThunderV2} durationInFrames={1200} fps={30} width={1920} height={1080} />
 <Composition id="EcosystemTransitions" component={EcosystemTransitions} durationInFrames={390} fps={30} width={1920} height={1080} />
 <Composition id="EcosystemGraphics" component={EcosystemGraphics} durationInFrames={270} fps={30} width={1920} height={1080} />
 <Composition id="EcosystemCaptions" component={EcosystemCaptions} durationInFrames={300} fps={30} width={1920} height={1080} />
</>;
