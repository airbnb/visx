import React from 'react';
import BrushReadme from '!!raw-loader!../../../../vx-brush/Readme.md';
import Brush from '../../../../vx-brush/src/Brush';
import DocPage from '../../components/DocPage';

const components = [Brush];

export default () => <DocPage components={components} readme={BrushReadme} vxPackage="brush" />;
