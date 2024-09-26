import React from 'react';
import Sankey, { SankeyDemoProps } from '../../sandboxes/visx-sankey/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-sankey/package.json';

export default function SankeyTile() {
  return (
    <GalleryTile<SankeyDemoProps>
      title="Sankey"
      description="<Sankey.Sankey />"
      exampleRenderer={Sankey}
      exampleUrl="/sankey"
    />
  );
}
