import React from 'react';
import type { RadialBarsProps } from '../../sandboxes/visx-radial-bars/Example';
import RadialBars from '../../sandboxes/visx-radial-bars/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-radial-bars/package.json';

const tileStyles = { background: '#3dbdb1' };
const detailsStyles = { color: '#93F9B9' };
const exampleProps = { showControls: false };

export default function BarsTile() {
  return (
    <GalleryTile<RadialBarsProps>
      title="Radial Bars"
      description="<Shape.Arc />"
      exampleProps={exampleProps}
      exampleRenderer={RadialBars}
      exampleUrl="/radial-bars"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
