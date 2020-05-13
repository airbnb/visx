import React from 'react';
import BrushReadme from '!!raw-loader!../../../../vx-brush/Readme.md';
import Brush from '../../../../vx-brush/src/Brush';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Brush.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={BrushReadme} vxPackage="brush" />;
