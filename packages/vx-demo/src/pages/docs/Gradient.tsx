import React from 'react';
import GradientReadme from '!!raw-loader!../../../../vx-gradient/Readme.md';
import * as Gradients from '../../../../vx-gradient/src';

import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = (Object.values(Gradients).map(
  component =>
    // @ts-ignore
    component.__docgenInfo,
) as DocGenInfo[]).sort(
  (a, b) =>
    (a.displayName === 'LinearGradient' && -2) ||
    (b.displayName === 'LinearGradient' && 2) ||
    (a.displayName === 'RadialGradient' && -1) ||
    (b.displayName === 'RadialGradient' && 1) ||
    a.displayName.localeCompare(b.displayName),
);

export default () => (
  <DocPage components={components} readme={GradientReadme} vxPackage="gradient" />
);
