import React from 'react';
import TooltipReadme from '!!raw-loader!../../../../vx-tooltip/Readme.md';
import Tooltip from '../../../../vx-tooltip/src/tooltips/Tooltip';
import TooltipWithBounds from '../../../../vx-tooltip/src/tooltips/TooltipWithBounds';
import useTooltip from '../../../../vx-tooltip/src/hooks/useTooltip';
import useTooltipInPortal from '../../../../vx-tooltip/src/hooks/useTooltipInPortal';
import Portal from '../../../../vx-tooltip/src/Portal';

import DocPage from '../../components/DocPage';
import TooltipTile from '../../components/Gallery/TooltipTile';
import DotsTile from '../../components/Gallery/DotsTile';
import BarStackHorizontalTile from '../../components/Gallery/BarStackHorizontalTile';
import StatsPlotTile from '../../components/Gallery/StatsPlotTile';
import AreaTile from '../../components/Gallery/AreaTile';

const examples = [TooltipTile, DotsTile, BarStackHorizontalTile, StatsPlotTile, AreaTile];

const components = [TooltipWithBounds, Tooltip, Portal, useTooltip, useTooltipInPortal];

export default () => (
  <DocPage components={components} examples={examples} readme={TooltipReadme} vxPackage="tooltip" />
);
