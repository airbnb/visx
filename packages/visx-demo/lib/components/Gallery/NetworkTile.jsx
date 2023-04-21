import React from 'react';
import Network, { background } from '../../sandboxes/visx-network/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-network/package.json';
var tileStyles = { background: background };
export default function NetworkTile() {
    return (<GalleryTile title="Network" description="<Network.Graph />" exampleRenderer={Network} exampleUrl="/network" tileStyles={tileStyles}/>);
}
