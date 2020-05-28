import React from 'react';
import TextReadme from '!!raw-loader!../../../../vx-text/Readme.md';
import Text from '../../../../vx-text/src/Text';
import DocPage from '../../components/DocPage';

const components = [Text];

export default () => <DocPage components={components} readme={TextReadme} vxPackage="text" />;
