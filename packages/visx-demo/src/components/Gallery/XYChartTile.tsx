import React from 'react';
import dynamic from 'next/dynamic';
import { XYChartProps } from '../../sandboxes/visx-xychart/Example';
import GalleryTile from '../GalleryTile';

const XYChart = dynamic(() => import('../../sandboxes/visx-xychart/Example'), { ssr: false });

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
