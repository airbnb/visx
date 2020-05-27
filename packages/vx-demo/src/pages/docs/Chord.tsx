import React from 'react';
import ChordReadme from '!!raw-loader!../../../../vx-chord/Readme.md';
import Chord from '../../../../vx-chord/src/Chord';
import DocPage from '../../components/DocPage';
import Ribbon from '../../../../vx-chord/src/Ribbon';

const components = [Chord, Ribbon];

export default () => <DocPage components={components} readme={ChordReadme} vxPackage="chord" />;
