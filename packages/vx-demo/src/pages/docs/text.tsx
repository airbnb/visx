import React from 'react';
import TextReadme from '!!raw-loader!../../../../vx-text/Readme.md';
import Text from '../../../../vx-text/src/Text';
import DocPage from '../../components/DocPage';
import TextTile from '../../components/Gallery/TextTile';

const components = [Text];

const examples = [TextTile];

export default () => (
  <DocPage components={components} examples={examples} readme={TextReadme} vxPackage="text" />
);
