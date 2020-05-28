import React from 'react';
import StatsPlot, { StatsPlotProps } from '../../sandboxes/vx-stats/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-stats/package.json';

const tileStyles = { background: '#8a88e3' };
const detailsStyles = { color: '#ffffff', zIndex: 1 };

export default function StatsPlotTile() {
  return (
    <GalleryTile<StatsPlotProps>
      title="Stats Plots"
      description="<BoxPlot /> & <ViolinPlot />"
      exampleRenderer={StatsPlot}
      exampleUrl="/statsplot"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
