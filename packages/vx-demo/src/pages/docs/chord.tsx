import React from 'react';
import ChordReadme from '!!raw-loader!../../../../vx-chord/Readme.md';
import Chord from '../../../../vx-chord/src/Chord';
import DocPage from '../../components/DocPage';
import Ribbon from '../../../../vx-chord/src/Ribbon';
import ChordTile from '../../components/Gallery/ChordTile';

const components = [Chord, Ribbon];

const examples = [ChordTile];

export default () => (
  <DocPage components={components} examples={examples} readme={ChordReadme} vxPackage="chord" />
);
