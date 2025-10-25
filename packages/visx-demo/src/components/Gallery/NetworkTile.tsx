import React from 'react';
import type { NetworkProps } from '../../sandboxes/visx-network/Example';
import Network, { background } from '../../sandboxes/visx-network/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-network/package.json';

const tileStyles = { background };

export default function NetworkTile() {
  return (
    <GalleryTile<NetworkProps>
      title="Network"
      description="<Network.Graph />"
      exampleRenderer={Network}
      exampleUrl="/network"
      tileStyles={tileStyles}
    />
  );
}
