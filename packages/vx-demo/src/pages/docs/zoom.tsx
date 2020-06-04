import React from 'react';
import ZoomReadme from '!!raw-loader!../../../../vx-zoom/Readme.md';
import Zoom from '../../../../vx-zoom/src/Zoom';
import DocPage from '../../components/DocPage';
import ZoomITile from '../../components/Gallery/ZoomITile';

const components = [Zoom];

const examples = [ZoomITile];

export default () => (
  <DocPage components={components} examples={examples} readme={ZoomReadme} vxPackage="zoom" />
);
