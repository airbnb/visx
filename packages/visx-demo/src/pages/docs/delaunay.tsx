import React from 'react';
import DelaunayReadme from '!!raw-loader!../../../../visx-delaunay/Readme.md';
import Polygon from '../../../../visx-delaunay/src/components/Polygon';
import delaunay from '../../../../visx-delaunay/src/delaunay';
import voronoi from '../../../../visx-delaunay/src/voronoi';
import DocPage from '../../components/DocPage';
import DelaunayTriangulationTile from '../../components/Gallery/DelaunayTriangulationTile';
import DelaunayVoronoiTile from '../../components/Gallery/DelaunayVoronoiTile';

const components = [delaunay, voronoi, Polygon];

const examples = [DelaunayVoronoiTile, DelaunayTriangulationTile];

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
