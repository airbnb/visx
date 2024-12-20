import React from 'react';
import type { BrushProps } from '../../sandboxes/visx-brush/Example';
import Brush, { background, accentColor } from '../../sandboxes/visx-brush/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-brush/package.json';

const tileStyles = { border: `1px solid ${accentColor}` };
const detailsStyles = { color: background };
const exampleProps = { compact: true, margin: { top: 10, left: 50, bottom: 60, right: 20 } };

export default function BrushTile() {
  return (
    <GalleryTile<BrushProps>
      title="Brush"
      description="<Brush />"
      exampleProps={exampleProps}
      exampleRenderer={Brush}
      exampleUrl="/brush"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
