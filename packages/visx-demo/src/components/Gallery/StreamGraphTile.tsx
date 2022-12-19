import React from 'react';
import StreamGraph, {
  StreamGraphProps,
  BACKGROUND as background,
} from '@visx/demo-streamgraph/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-streamgraph/package.json';

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
