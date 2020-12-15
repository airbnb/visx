import React from 'react';
import XYChart, { XYChartProps } from '../../sandboxes/visx-xychart/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-xychart/package.json';

const tileStyles = { background: '#222' };

export default function XYChartITile() {
  return (
    <GalleryTile<XYChartProps>
      title="XYChart"
      description="<XYChart />"
      exampleRenderer={XYChart}
      exampleUrl="/xychart"
      tileStyles={tileStyles}
      detailsHeight={0}
    />
  );
}
