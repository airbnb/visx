import React from 'react';
import Chord from '../../sandboxes/visx-chord/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-chord/package.json';
var tileStyles = { background: '#e4e3d8' };
var detailsStyles = { color: '#111' };
export default function ChordTile() {
    return (<GalleryTile title="Chord" description="<Chord.Chord /> & <Chord.Ribbon />" exampleRenderer={Chord} exampleUrl="/chord" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
