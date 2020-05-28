import React from 'react';
import Network, { NetworkProps, background } from '../../sandboxes/vx-network/Example';
import GalleryTile from '../GalleryTile';

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
