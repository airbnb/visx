import React from 'react';
import type { PolygonProps } from '../../sandboxes/visx-polygons/Example';
import Polygon, { background } from '../../sandboxes/visx-polygons/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-polygons/package.json';

const tileStyles = { background };
const detailsStyles = { color: 'white' };
const exampleProps = { margin: { top: 10, right: 0, bottom: 76, left: 0 } };

export default function PolygonsTile() {
  return (
    <GalleryTile<PolygonProps>
      title="Polygons"
      description="<Shape.Polygon />"
      exampleProps={exampleProps}
      exampleRenderer={Polygon}
      exampleUrl="/polygons"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
