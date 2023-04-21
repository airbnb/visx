import React from 'react';
import Annotation, { greens } from '../../sandboxes/visx-annotation/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-annotation/package.json';
var tileStyles = { background: greens[0] };
var detailsStyles = {
    color: greens[2],
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
};
var exampleProps = { compact: true };
var exampleRenderer = function (props) {
    return props.width > 0 && props.height > 0 ? <Annotation {...props}/> : null;
};
export default function AnnotationTile() {
    return (<GalleryTile title="Annotation" description="<Annotation />" exampleRenderer={exampleRenderer} exampleUrl="/annotation" detailsStyles={detailsStyles} tileStyles={tileStyles} exampleProps={exampleProps}/>);
}
