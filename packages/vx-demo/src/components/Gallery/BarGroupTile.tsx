import React from 'react';
import BarGroup, { BarGroupProps, background, green } from '../../sandboxes/vx-bargroup/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-bargroup/package.json';

const tileStyles = { background };
const detailsStyles = { color: green };

export default function BarGroupTile() {
  return (
    <GalleryTile<BarGroupProps>
      title="Bar Group"
      description="<Shape.BarGroup />"
      detailsStyles={detailsStyles}
      exampleRenderer={BarGroup}
      exampleUrl="/bargroup"
      tileStyles={tileStyles}
    />
  );
}
