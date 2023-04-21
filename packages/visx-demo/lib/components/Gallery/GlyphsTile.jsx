import React from 'react';
import Glyph, { primaryColor, secondaryColor, } from '../../sandboxes/visx-glyph/Example';
import GalleryTile from '../GalleryTile';
export { default as packageJson } from '../../sandboxes/visx-glyph/package.json';
var tileStyles = { background: secondaryColor };
var detailsStyles = { color: primaryColor };
var exampleProps = { margin: { top: 30, left: 10, right: 10, bottom: 80 } };
export default function GlyphsTile() {
    return (<GalleryTile title="Glyphs" description="<Glyph.GlyphDot />" exampleProps={exampleProps} exampleRenderer={Glyph} exampleUrl="/glyphs" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
