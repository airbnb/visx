import React from 'react';
import ZoomReadme from '!!raw-loader!../../../../vx-zoom/Readme.md';
import Zoom from '../../../../vx-zoom/src/Zoom';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Zoom.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={ZoomReadme} vxPackage="zoom" />;
