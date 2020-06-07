import React from 'react';
import Area, { AreaProps, accentColor, background } from '../../sandboxes/vx-area/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-area/package.json';

const tileStyles = { background };
const detailsStyles = { color: accentColor };

export default function AreaTile() {
  return (
    <GalleryTile<AreaProps>
      title="AreaClosed"
      description="<Shape.AreaClosed />"
      exampleRenderer={Area}
      exampleUrl="/areas"
      detailsStyles={detailsStyles}
      tileStyles={tileStyles}
    />
  );
}
