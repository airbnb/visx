import React from 'react';
import type { VoronoiProps } from '../../sandboxes/visx-delaunay-voronoi/Example';
import Voronoi from '../../sandboxes/visx-delaunay-voronoi/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-delaunay-voronoi/package.json';

const tileStyles = {
  background: '#eb6d88',
  borderRadius: 14,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 6px',
};
const detailsStyles = { background: 'white', color: '#eb6d88', borderRadius: '0 0 14px 14px' };

export default function DelaunayTile() {
  return (
    <GalleryTile<VoronoiProps>
      title="Voronoi Overlay"
      description="<Delaunay.Polygon />"
      exampleRenderer={Voronoi}
      exampleUrl="/delaunay-voronoi"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
