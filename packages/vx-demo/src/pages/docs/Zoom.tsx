import React from 'react';
import ZoomReadme from '!!raw-loader!../../../../vx-zoom/Readme.md';
import Zoom from '../../../../vx-zoom/src/Zoom';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';
import ZoomITile from '../../components/Gallery/ZoomITile';

const components = [
  // @ts-ignore
  Zoom.__docgenInfo,
] as DocGenInfo[];

const examples = [ZoomITile];

export default () => (
  <DocPage components={components} examples={examples} readme={ZoomReadme} vxPackage="zoom" />
);
