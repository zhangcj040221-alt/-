import React from 'react';
import {Composition} from 'remotion';
import {Intro} from './scene';
import {MGShowcase} from './showcase';
import {ThunderExplainer} from './thunder';
export const Root: React.FC = () => <>
 <Composition id="Intro" component={Intro} durationInFrames={150} fps={30} width={1920} height={1080} />
 <Composition id="MGShowcase" component={MGShowcase} durationInFrames={360} fps={30} width={1920} height={1080} />
 <Composition id="ThunderExplainer" component={ThunderExplainer} durationInFrames={1200} fps={30} width={1920} height={1080} />
</>;
