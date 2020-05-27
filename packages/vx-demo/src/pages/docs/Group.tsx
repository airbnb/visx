import React from 'react';
import GroupReadme from '!!raw-loader!../../../../vx-group/Readme.md';
import Group from '../../../../vx-group/src/Group';
import DocPage from '../../components/DocPage';

const components = [Group];

export default () => <DocPage components={components} readme={GroupReadme} vxPackage="group" />;
