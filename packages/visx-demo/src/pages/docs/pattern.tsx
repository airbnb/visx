import React from 'react';
import PatternReadme from '!!raw-loader!../../../../visx-pattern/Readme.md';
import Circles from '../../../../visx-pattern/src/patterns/Circles';
import Hexagons from '../../../../visx-pattern/src/patterns/Hexagons';
import Lines from '../../../../visx-pattern/src/patterns/Lines';
import Path from '../../../../visx-pattern/src/patterns/Path';
import Pattern from '../../../../visx-pattern/src/patterns/Pattern';
import Waves from '../../../../visx-pattern/src/patterns/Waves';
import DocPage from '../../components/DocPage';
import PatternsTile from '../../components/Gallery/PatternsTile';
import StreamGraphTile from '../../components/Gallery/StreamGraphTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';

const components = [Pattern, Circles, Hexagons, Lines, Path, Waves];

const examples = [PatternsTile, StreamGraphTile, StatsPlotTile];

const PatternDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={PatternReadme}
    visxPackage="pattern"
  />
);
export default PatternDocs;
