import React from 'react';
import Bars, { BarsProps } from '../../sandboxes/vx-bars/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-bars/package.json';

const tileStyles = { background: '#5290e7' };
const detailsStyles = { color: 'rgba(25, 231, 217, 1)' };

export default function BarsTile() {
  return (
    <GalleryTile<BarsProps>
      title="Bars"
      description="<Shape.Bar />"
      exampleRenderer={Bars}
      exampleUrl="/bars"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
