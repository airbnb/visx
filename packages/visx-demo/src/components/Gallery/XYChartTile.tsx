import React from 'react';
import type { XYChartProps } from '../../sandboxes/visx-xychart/Example';
import XYChart from '../../sandboxes/visx-xychart/Example';
import GalleryTile from '../GalleryTile';

function XYChartWrapper(props) {
  if (typeof window === 'undefined') return null;
  return <XYChart {...props} />;
}

export { default as packageJson } from '../../sandboxes/visx-xychart/package.json';

const tileStyles = { background: '#222' };

export default function XYChartITile() {
  return (
    <GalleryTile<XYChartProps>
      title="XYChart"
      description="<XYChart />"
      exampleRenderer={XYChartWrapper}
      exampleUrl="/xychart"
      tileStyles={tileStyles}
      detailsHeight={0}
    />
  );
}
