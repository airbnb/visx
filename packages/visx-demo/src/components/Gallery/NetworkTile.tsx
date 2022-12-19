import React from 'react';
import Network, { NetworkProps, background } from '@visx/demo-network/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-network/package.json';

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
