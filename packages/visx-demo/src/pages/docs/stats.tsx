import React from 'react';
import StatsReadme from '!!raw-loader!../../../../visx-stats/Readme.md';
import * as StatsComponents from '../../../../visx-stats/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('stats', StatsComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [StatsPlotTile];

function StatsDocs() {
  return (
    <DocPage components={components} examples={examples} readme={StatsReadme} visxPackage="stats" />
  );
}
export default StatsDocs;
