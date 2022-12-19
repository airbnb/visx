import React from 'react';
import BarStack, { BarStackProps, background, purple3 } from '@visx/demo-barstack/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-barstack/package.json';

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
