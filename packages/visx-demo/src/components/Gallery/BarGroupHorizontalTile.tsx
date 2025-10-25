import React from 'react';
import type { BarGroupHorizontalProps } from '../../sandboxes/visx-bargroup-horizontal/Example';
import BarGroupHorizontal, {
  background,
  green,
} from '../../sandboxes/visx-bargroup-horizontal/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-bargroup-horizontal/package.json';

const tileStyles = { background };
const detailsStyles = { color: green };
const exampleProps = { margin: { top: 20, bottom: 70, left: 50, right: 20 } };

export default function BarGroupHorizontalTile() {
  return (
    <GalleryTile<BarGroupHorizontalProps>
      title="Bar Group Horizontal"
      description="<Shape.BarGroupHorizontal />"
      detailsStyles={detailsStyles}
      exampleProps={exampleProps}
      exampleRenderer={BarGroupHorizontal}
      exampleUrl="/bargrouphorizontal"
      tileStyles={tileStyles}
    />
  );
}
