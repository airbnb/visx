import React from 'react';
import ShapeReadme from '!!raw-loader!../../../../vx-shape/Readme.md';
import * as Shapes from '../../../../vx-shape/src';
import DocPage from '../../components/DocPage';

const components = Object.values(Shapes).sort((a, b) =>
  // @ts-ignore TS doesn't know about docgenInfo
  (a?.__docgenInfo?.displayName ?? '').localeCompare(
    // @ts-ignore TS doesn't know about docgenInfo
    b?.__docgenInfo?.displayName ?? '',
  ),
);

export default () => <DocPage components={components} readme={ShapeReadme} vxPackage="shape" />;
