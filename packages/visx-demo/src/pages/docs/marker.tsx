import React from 'react';
import MarkerReadme from '!!raw-loader!../../../../vx-marker/Readme.md';
import Marker from '../../../../vx-marker/src/markers/Marker';
import DocPage from '../../components/DocPage';

const components = [Marker];

export default () => <DocPage components={components} readme={MarkerReadme} vxPackage="marker" />;
