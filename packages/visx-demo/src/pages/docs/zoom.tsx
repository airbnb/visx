import React from 'react';
import ZoomReadme from '!!raw-loader!../../../../visx-zoom/Readme.md';
import Zoom from '../../../../visx-zoom/src/Zoom';
import DocPage from '../../components/DocPage';
import ZoomITile from '../../components/Gallery/ZoomITile';

const components = [Zoom];

const examples = [ZoomITile];

const ZoomDocs = () => (
  <DocPage components={components} examples={examples} readme={ZoomReadme} visxPackage="zoom" />
);
export default ZoomDocs;
