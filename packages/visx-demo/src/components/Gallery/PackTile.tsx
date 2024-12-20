import React from 'react';
import type { PackProps } from '../../sandboxes/visx-pack/Example';
import Pack from '../../sandboxes/visx-pack/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-pack/package.json';

const tileStyles = { background: 'white', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px' };
const detailsStyles = { color: '#fd6c6f' };

export default function PackTile() {
  return (
    <GalleryTile<PackProps>
      title="Pack"
      description="<Hierarchy.Pack />"
      exampleRenderer={Pack}
      exampleUrl="/pack"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
