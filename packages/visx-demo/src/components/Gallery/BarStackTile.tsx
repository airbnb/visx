import React from 'react';
import Example, { ExampleProps, background, purple3 } from '../../sandboxes/visx-barstack/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-barstack/package.json';

const tileStyles = { background };
const detailsStyles = { color: purple3, zIndex: 1 };

export default function BarStackTile() {
  return (
    <GalleryTile<ExampleProps>
      title="Bar Stack"
      description="<Shape.BarStack />"
      detailsStyles={detailsStyles}
      exampleRenderer={Example}
      exampleUrl="/barstack"
      tileStyles={tileStyles}
    />
  );
}
