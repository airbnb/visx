import React from 'react';
import Dots, { DotsProps } from '@visx/demo-dots/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-dots/package.json';

const tileStyles = { background: '#fd6e7f' };
const detailsStyles = { color: '#f6c431' };
const exampleProps = { showControls: false };

export default function DotsTile() {
  return (
    <GalleryTile<DotsProps>
      title="Dots"
      description="<Shape.Circle />"
      exampleProps={exampleProps}
      exampleRenderer={Dots}
      exampleUrl="/dots"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
