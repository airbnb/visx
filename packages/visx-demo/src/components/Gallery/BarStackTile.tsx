import React from 'react';
import type { BarStackProps } from '../../sandboxes/visx-barstack/Example';
import BarStack, { background, purple3 } from '../../sandboxes/visx-barstack/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-barstack/package.json';

const tileStyles = { background };
const detailsStyles = { color: purple3, zIndex: 1 };

export default function BarStackTile() {
  return (
    <GalleryTile<BarStackProps>
      title="Bar Stack"
      description="<Shape.BarStack />"
      detailsStyles={detailsStyles}
      exampleRenderer={BarStack}
      exampleUrl="/barstack"
      tileStyles={tileStyles}
    />
  );
}
