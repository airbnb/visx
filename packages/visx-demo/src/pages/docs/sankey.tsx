import React from 'react';
import SankeyReadme from '!!raw-loader!../../../../visx-sankey/Readme.md';
import * as SankeyComponents from '../../../../visx-sankey/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import SankeyTile from '../../components/Gallery/SankeyTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('sankey', SankeyComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [SankeyTile];

function SankeyDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={SankeyReadme}
      visxPackage="sankey"
    />
  );
}
export default SankeyDocs;
