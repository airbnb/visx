import React from 'react';
import ClipPathReadme from '!!raw-loader!../../../../vx-clip-path/Readme.md';
import ClipPath from '../../../../vx-clip-path/src/clip-paths/ClipPath';
import CircleClipPath from '../../../../vx-clip-path/src/clip-paths/CircleClipPath';
import RectClipPath from '../../../../vx-clip-path/src/clip-paths/RectClipPath';
import DocPage from '../../components/DocPage';

const components = [ClipPath, CircleClipPath, RectClipPath];

export default () => (
  <DocPage components={components} readme={ClipPathReadme} vxPackage="clip-path" />
);
