import React from 'react';
import DragReadme from '!!raw-loader!../../../../vx-drag/Readme.md';
import Drag from '../../../../vx-drag/src/Drag';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Drag.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={DragReadme} vxPackage="drag" />;
