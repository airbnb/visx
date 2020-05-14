import React from 'react';
import GroupReadme from '!!raw-loader!../../../../vx-group/Readme.md';
import Group from '../../../../vx-group/src/Group';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Group.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={GroupReadme} vxPackage="group" />;
