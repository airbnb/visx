import React from 'react';
import TooltipReadme from '!!raw-loader!../../../../visx-tooltip/Readme.md';
import Tooltip from '../../../../visx-tooltip/src/tooltips/Tooltip';
import TooltipWithBounds from '../../../../visx-tooltip/src/tooltips/TooltipWithBounds';
import useTooltip from '../../../../visx-tooltip/src/hooks/useTooltip';
import useTooltipInPortal from '../../../../visx-tooltip/src/hooks/useTooltipInPortal';
import Portal from '../../../../visx-tooltip/src/Portal';

import DocPage from '../../components/DocPage';
import TooltipTile from '../../components/Gallery/TooltipTile';
import DotsTile from '../../components/Gallery/DotsTile';
import BarStackHorizontalTile from '../../components/Gallery/BarStackHorizontalTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';
import AreaTile from '../../components/Gallery/AreaTile';

const examples = [TooltipTile, DotsTile, BarStackHorizontalTile, StatsPlotTile, AreaTile];

const components = [TooltipWithBounds, Tooltip, Portal, useTooltip, useTooltipInPortal];

const TooltipDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={TooltipReadme}
    visxPackage="tooltip"
  />
);
export default TooltipDocs;
