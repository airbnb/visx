import React from 'react';
import type { DelaunayTriangulationProps } from '../../sandboxes/visx-delaunay-triangulation/Example';
import Delaunay from '../../sandboxes/visx-delaunay-triangulation/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-delaunay-triangulation/package.json';

const tileStyles = {
  background: 'black',
  borderRadius: 14,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px',
};
const detailsStyles = { background: 'white', color: '#5B247A', borderRadius: '0 0 14px 14px' };

export default function DelaunayTriangulationTile() {
  return (
    <GalleryTile<DelaunayTriangulationProps>
      title="Delaunay Triangulation"
      description="<Delaunay.Polygon />"
      exampleRenderer={Delaunay}
      exampleUrl="/delaunay-triangulation"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
