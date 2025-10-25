import React from 'react';
import type { AreaProps } from '../../sandboxes/visx-area/Example';
import Area, { accentColor, background } from '../../sandboxes/visx-area/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-area/package.json';

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
