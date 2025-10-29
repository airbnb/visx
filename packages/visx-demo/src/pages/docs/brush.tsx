import React from 'react';
import BrushReadme from '!!raw-loader!../../../../visx-brush/Readme.md';
import * as BrushComponents from '../../../../visx-brush/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import BrushTile from '../../components/Gallery/BrushTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('brush', BrushComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [BrushTile];

function BrushDocs() {
  return (
    <DocPage components={components} examples={examples} readme={BrushReadme} visxPackage="brush" />
  );
}
export default BrushDocs;
