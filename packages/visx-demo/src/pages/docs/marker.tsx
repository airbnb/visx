import React from 'react';
import MarkerReadme from '!!raw-loader!../../../../visx-marker/Readme.md';
import * as MarkerComponents from '../../../../visx-marker/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('marker', MarkerComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

function MarkerDocs() {
  return <DocPage components={components} readme={MarkerReadme} visxPackage="marker" />;
}
export default MarkerDocs;
