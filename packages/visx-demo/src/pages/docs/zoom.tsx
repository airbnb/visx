import React from 'react';
import ZoomReadme from '!!raw-loader!../../../../visx-zoom/Readme.md';
import * as ZoomComponents from '../../../../visx-zoom/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import ZoomITile from '../../components/Gallery/ZoomITile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('zoom', ZoomComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [ZoomITile];

function ZoomDocs() {
  return (
    <DocPage components={components} examples={examples} readme={ZoomReadme} visxPackage="zoom" />
  );
}
export default ZoomDocs;
