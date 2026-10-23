import React from 'react';
import {Composition} from 'remotion';
import {ParticlePath} from './scene';

export const Root: React.FC = () => (
  <Composition id="ParticlePath" component={ParticlePath} durationInFrames={240} fps={30} width={1920} height={1080}/>
);
