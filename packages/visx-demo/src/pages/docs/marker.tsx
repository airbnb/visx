import React from 'react';
import MarkerReadme from '!!raw-loader!../../../../visx-marker/Readme.md';
import Marker from '../../../../visx-marker/src/markers/Marker';
import DocPage from '../../components/DocPage';

const components = [Marker];

const MarkerDocs = () => (
  <DocPage components={components} readme={MarkerReadme} visxPackage="marker" />
);
export default MarkerDocs;
