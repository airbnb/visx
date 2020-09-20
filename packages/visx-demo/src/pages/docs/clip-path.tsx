import React from 'react';
import ClipPathReadme from '!!raw-loader!../../../../visx-clip-path/Readme.md';
import ClipPath from '../../../../visx-clip-path/src/clip-paths/ClipPath';
import CircleClipPath from '../../../../visx-clip-path/src/clip-paths/CircleClipPath';
import RectClipPath from '../../../../visx-clip-path/src/clip-paths/RectClipPath';
import DocPage from '../../components/DocPage';

const components = [ClipPath, CircleClipPath, RectClipPath];

export default () => (
  <DocPage components={components} readme={ClipPathReadme} visxPackage="clip-path" />
);
