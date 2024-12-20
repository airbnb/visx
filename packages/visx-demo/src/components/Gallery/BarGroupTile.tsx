import React from 'react';
import type { BarGroupProps } from '../../sandboxes/visx-bargroup/Example';
import BarGroup, { background, green } from '../../sandboxes/visx-bargroup/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-bargroup/package.json';

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
