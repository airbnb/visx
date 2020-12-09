import React from 'react';
import XYChartI, { XYChartProps } from '../../sandboxes/visx-xychart/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-xychart/package.json';

const tileStyles = { background: '#222' };
const detailsStyles = { color: '#ccc' };

export default function XYChartITile() {
  return (
    <GalleryTile<XYChartProps>
      title="XYChart"
      description="<XYChart />"
      exampleRenderer={XYChartI}
      exampleUrl="/xychart"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
      detailsHeight={0}
    />
  );
}