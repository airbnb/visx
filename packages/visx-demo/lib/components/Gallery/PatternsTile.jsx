import React from 'react';
import Patterns from '../../sandboxes/visx-pattern/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-pattern/package.json';
var tileStyles = { background: '#f5f2e3' };
var detailsStyles = { color: '#333' };
export default function PatternsTile() {
    return (<GalleryTile title="Patterns" description="<Pattern />" exampleRenderer={Patterns} exampleUrl="/patterns" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
