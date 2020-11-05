import React from 'react';
import ChordReadme from '!!raw-loader!../../../../visx-chord/Readme.md';
import Chord from '../../../../visx-chord/src/Chord';
import DocPage from '../../components/DocPage';
import Ribbon from '../../../../visx-chord/src/Ribbon';
import ChordTile from '../../components/Gallery/ChordTile';

const components = [Chord, Ribbon];

const examples = [ChordTile];

const ChordDocs = () => (
  <DocPage components={components} examples={examples} readme={ChordReadme} visxPackage="chord" />
);
export default ChordDocs;
