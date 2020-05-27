import React from 'react';
import PatternReadme from '!!raw-loader!../../../../vx-pattern/Readme.md';
import Circles from '../../../../vx-pattern/src/patterns/Circles';
import Hexagons from '../../../../vx-pattern/src/patterns/Hexagons';
import Lines from '../../../../vx-pattern/src/patterns/Lines';
import Path from '../../../../vx-pattern/src/patterns/Path';
import Pattern from '../../../../vx-pattern/src/patterns/Pattern';
import Waves from '../../../../vx-pattern/src/patterns/Waves';
import DocPage from '../../components/DocPage';

const components = [Pattern, Circles, Hexagons, Lines, Path, Waves];

export default () => <DocPage components={components} readme={PatternReadme} vxPackage="pattern" />;
