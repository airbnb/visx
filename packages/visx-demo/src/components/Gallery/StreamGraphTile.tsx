import React from 'react';
import type { StreamGraphProps } from '../../sandboxes/visx-streamgraph/Example';
import StreamGraph, { BACKGROUND as background } from '../../sandboxes/visx-streamgraph/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-streamgraph/package.json';

const tileStyles = { background };
const detailsStyles = { color: 'rgb(93,30,91)' };
const exampleProps = { animate: false };

export default function StreamGraphTile() {
  return (
    <GalleryTile<StreamGraphProps>
      title="Streamgraph"
      description="<Shape.Stack />"
      exampleProps={exampleProps}
      exampleRenderer={StreamGraph}
      exampleUrl="/streamgraph"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
