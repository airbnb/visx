import React from 'react';
import PatternReadme from '!!raw-loader!../../../../visx-pattern/Readme.md';
import * as PatternComponents from '../../../../visx-pattern/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import PatternsTile from '../../components/Gallery/PatternsTile';
import StreamGraphTile from '../../components/Gallery/StreamGraphTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('pattern', PatternComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [PatternsTile, StreamGraphTile, StatsPlotTile];

function PatternDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={PatternReadme}
      visxPackage="pattern"
    />
  );
}
export default PatternDocs;
