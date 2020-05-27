import React from 'react';
import GradientReadme from '!!raw-loader!../../../../vx-gradient/Readme.md';
import * as Gradients from '../../../../vx-gradient/src';

import DocPage from '../../components/DocPage';

const components = Object.values(Gradients).sort((a, b) => {
  // @ts-ignore TS doesn't know about docgenInfo
  const aName = a?.__docgenInfo?.displayName ?? '';
  // @ts-ignore TS doesn't know about docgenInfo
  const bName = b?.__docgenInfo?.displayName ?? '';
  return (
    (aName === 'LinearGradient' && -2) ||
    (bName === 'LinearGradient' && 2) ||
    (aName === 'RadialGradient' && -1) ||
    (bName === 'RadialGradient' && 1) ||
    aName.localeCompare(bName)
  );
});

export default () => (
  <DocPage components={components} readme={GradientReadme} vxPackage="gradient" />
);
