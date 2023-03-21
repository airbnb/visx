import React from 'react';
import DelaunayReadme from '!!raw-loader!../../../../visx-delaunay/Readme.md';
import Polygon from '../../../../visx-delaunay/src/components/Polygon';
import voronoi from '../../../../visx-delaunay/src/voronoi';
import DocPage from '../../components/DocPage';
import DelaunayTile from '../../components/Gallery/DelaunayTile';
import DelaunayVoronoiTile from '../../components/Gallery/DelaunayVoronoiTile';

const components = [voronoi, Polygon];

const examples = [DelaunayTile, DelaunayVoronoiTile];

function DelaunayDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={DelaunayReadme}
      visxPackage="delaunay"
    />
  );
}
export default DelaunayDocs;