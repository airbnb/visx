import React from 'react';
import BrushReadme from '!!raw-loader!../../../../vx-brush/Readme.md';
import Brush from '../../../../vx-brush/src/Brush';
import DocPage from '../../components/DocPage';
import BrushTile from '../../components/Gallery/BrushTile';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Brush.__docgenInfo,
] as DocGenInfo[];

const examples = [BrushTile];

export default () => (
  <DocPage components={components} examples={examples} readme={BrushReadme} vxPackage="brush" />
);
