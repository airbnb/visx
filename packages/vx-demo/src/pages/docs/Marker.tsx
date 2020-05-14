import React from 'react';
import MarkerReadme from '!!raw-loader!../../../../vx-marker/Readme.md';
import Marker from '../../../../vx-marker/src/markers/Marker';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Marker.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={MarkerReadme} vxPackage="marker" />;
