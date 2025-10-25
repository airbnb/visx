import React from 'react';
import type { DotsProps } from '../../sandboxes/visx-dots/Example';
import Dots from '../../sandboxes/visx-dots/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-dots/package.json';

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
