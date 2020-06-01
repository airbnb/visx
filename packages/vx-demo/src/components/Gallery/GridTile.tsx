import React from 'react';
import Grid, { GridProps, accentColor, background } from '../../sandboxes/vx-grid/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-grid/package.json';

const tileStyles = { background };
const detailsStyles = { color: accentColor };

export default function GridTile() {
  return (
    <GalleryTile<GridProps>
      title="Grid"
      description="<Grid />"
      exampleRenderer={Grid}
      exampleUrl="/grid"
      detailsStyles={detailsStyles}
      tileStyles={tileStyles}
    />
  );
}
