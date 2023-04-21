import React from 'react';
import Tooltip from '../../sandboxes/visx-tooltip/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-tooltip/package.json';
var exampleProps = { showControls: false };
var detailsStyles = {
    background: 'white',
    color: 'rgba(53,71,125,1)',
};
export default function DotsTile() {
    return (<GalleryTile title="Tooltip" description="<Tooltip /> + <Portal />" exampleProps={exampleProps} exampleRenderer={Tooltip} exampleUrl="/tooltip" detailsStyles={detailsStyles} detailsHeight={0}/>);
}
