import React from 'react';
import Wordcloud from '../../sandboxes/visx-wordcloud/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-wordcloud/package.json';
var tileStyles = { background: '#e4e3d8' };
var detailsStyles = { color: '#111' };
var renderer = function (size) { return <Wordcloud width={size.width} height={size.height}/>; };
export default function WordcloudTile() {
    return (<GalleryTile title="Wordcloud" description="<Wordcloud />" exampleRenderer={renderer} exampleUrl="/wordcloud" tileStyles={tileStyles} detailsStyles={detailsStyles} detailsHeight={0}/>);
}
