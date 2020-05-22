import React from 'react';
import ShapeReadme from '!!raw-loader!../../../../vx-shape/Readme.md';
import * as Shapes from '../../../../vx-shape/src';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = Object.values(Shapes)
  .map(
    componentOrFunc =>
      // @ts-ignore
      componentOrFunc.__docgenInfo,
  )
  .filter(docgen => !!docgen)
  .sort((a, b) => a.displayName.localeCompare(b.displayName)) as DocGenInfo[];

export default () => <DocPage components={components} readme={ShapeReadme} vxPackage="shape" />;
