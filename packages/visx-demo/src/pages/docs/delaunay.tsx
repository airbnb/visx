import React from 'react';
import DelaunayReadme from '!!raw-loader!../../../../visx-delaunay/Readme.md';
import VoronoiPolygon from '../../../../visx-delaunay/src/components/VoronoiPolygon';
import voronoi from '../../../../visx-delaunay/src/voronoi';
import DocPage from '../../components/DocPage';
import DelaunayTile from '../../components/Gallery/DelaunayTile';

const components = [voronoi, VoronoiPolygon];

const examples = [DelaunayTile];

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