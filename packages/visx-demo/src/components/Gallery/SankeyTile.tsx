import React from 'react';
import type { SankeyDemoProps } from '../../sandboxes/visx-sankey/Example';
import Sankey, { background, color } from '../../sandboxes/visx-sankey/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-sankey/package.json';

const tileStyles = { background };
const detailsStyles = { color };
const exampleProps = { showControls: false };

export default function SankeyTile() {
  return (
    <GalleryTile<SankeyDemoProps>
      title="Sankey"
      description="<Sankey.Sankey />"
      exampleProps={exampleProps}
      exampleRenderer={Sankey}
      exampleUrl="/sankey"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
