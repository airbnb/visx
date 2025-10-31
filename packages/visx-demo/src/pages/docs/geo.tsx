import React from 'react';
import GeoReadme from '!!raw-loader!../../../../visx-geo/Readme.md';
import * as GeoComponents from '../../../../visx-geo/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import GeoMercatorTile from '../../components/Gallery/GeoMercatorTile';
import GeoCustomTile from '../../components/Gallery/GeoCustomTile';
import GeoAlbersUsaTile from '../../components/Gallery/GeoAlbersUsaTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('geo', GeoComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [GeoMercatorTile, GeoCustomTile, GeoAlbersUsaTile];

function GeoDocs() {
  return (
    <DocPage components={components} examples={examples} readme={GeoReadme} visxPackage="geo" />
  );
}
export default GeoDocs;
