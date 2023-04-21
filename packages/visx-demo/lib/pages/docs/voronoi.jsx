import React from 'react';
import VoronoiReadme from '!!raw-loader!../../../../visx-voronoi/Readme.md';
import VoronoiPolygon from '../../../../visx-voronoi/src/components/VoronoiPolygon';
import voronoi from '../../../../visx-voronoi/src/voronoi';
import DocPage from '../../components/DocPage';
import VoronoiTile from '../../components/Gallery/VoronoiTile';
var components = [voronoi, VoronoiPolygon];
var examples = [VoronoiTile];
function VoronoiDocs() {
    return (<DocPage components={components} examples={examples} readme={VoronoiReadme} visxPackage="voronoi"/>);
}
export default VoronoiDocs;
