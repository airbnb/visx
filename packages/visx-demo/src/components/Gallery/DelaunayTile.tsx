import React from 'react';
import Delaunay, { VoronoiProps } from '../../sandboxes/visx-delaunay/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-delaunay/package.json';

const tileStyles = {
  background: '#eb6d88',
  borderRadius: 14,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px',
};
const detailsStyles = { background: 'white', color: '#eb6d88', borderRadius: '0 0 14px 14px' };

export default function DelaunayTile() {
  return (
    <GalleryTile<VoronoiProps>
      title="Delaunay Triangulation"
      description="<Delaunay.Polygon />"
      exampleRenderer={Delaunay}
      exampleUrl="/delaunay"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
