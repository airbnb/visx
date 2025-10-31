import React from 'react';
import TooltipReadme from '!!raw-loader!../../../../visx-tooltip/Readme.md';
import * as TooltipComponents from '../../../../visx-tooltip/src';

import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import TooltipTile from '../../components/Gallery/TooltipTile';
import DotsTile from '../../components/Gallery/DotsTile';
import BarStackHorizontalTile from '../../components/Gallery/BarStackHorizontalTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';
import AreaTile from '../../components/Gallery/AreaTile';

const examples = [TooltipTile, DotsTile, BarStackHorizontalTile, StatsPlotTile, AreaTile];

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('tooltip', TooltipComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

function TooltipDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={TooltipReadme}
      visxPackage="tooltip"
    />
  );
}
export default TooltipDocs;
