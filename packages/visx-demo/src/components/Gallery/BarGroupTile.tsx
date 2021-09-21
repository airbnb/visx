import React from 'react';
import BarGroupExample, {
  BarGroupExampleProps,
  background,
  green,
} from '../../sandboxes/visx-bargroup/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-bargroup/package.json';

const tileStyles = { background };
const detailsStyles = { color: green };

export default function BarGroupTile() {
  return (
    <GalleryTile<BarGroupExampleProps>
      title="Bar Group"
      description="<Shape.BarGroup />"
      detailsStyles={detailsStyles}
      exampleRenderer={BarGroupExample}
      exampleUrl="/bargroup"
      tileStyles={tileStyles}
    />
  );
}
