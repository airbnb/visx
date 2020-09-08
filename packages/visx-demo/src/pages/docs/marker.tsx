import React from 'react';
import MarkerReadme from '!!raw-loader!../../../../visx-marker/Readme.md';
import Marker from '../../../../visx-marker/src/markers/Marker';
import DocPage from '../../components/DocPage';

const components = [Marker];

export default () => <DocPage components={components} readme={MarkerReadme} visxPackage="marker" />;
