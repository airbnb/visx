import React from 'react';
import type { TreemapProps } from '../../sandboxes/visx-treemap/Example';
import Treemap, { background, color1 } from '../../sandboxes/visx-treemap/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-treemap/package.json';

const tileStyles = { background };
const detailsStyles = { color: color1 };
const exampleProps = { margin: { top: 0, left: 10, right: 10, bottom: 76 } };

export default function TreemapTile() {
  return (
    <GalleryTile<TreemapProps>
      title="Treemap"
      description="<Hierarchy.Treemap />"
      exampleProps={exampleProps}
      exampleRenderer={Treemap}
      exampleUrl="/treemap"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
