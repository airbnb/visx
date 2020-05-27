import React from 'react';
import ZoomReadme from '!!raw-loader!../../../../vx-zoom/Readme.md';
import Zoom from '../../../../vx-zoom/src/Zoom';
import DocPage from '../../components/DocPage';

const components = [Zoom];

export default () => <DocPage components={components} readme={ZoomReadme} vxPackage="zoom" />;
