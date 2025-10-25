import React from 'react';
import type { HeatmapProps } from '../../sandboxes/visx-heatmap/Example';
import Heatmap, { background } from '../../sandboxes/visx-heatmap/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-heatmap/package.json';

const tileStyles = { background };
const detailsStyles = { color: 'rgba(255,255,255,0.3)' };

export default function HeatmapsTile() {
  return (
    <GalleryTile<HeatmapProps>
      title="Heatmaps"
      description="<HeatmapCircle /> & <HeatmapRect />"
      exampleRenderer={Heatmap}
      exampleUrl="/heatmaps"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
