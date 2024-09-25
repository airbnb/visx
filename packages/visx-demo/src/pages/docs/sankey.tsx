import React from 'react';
import SankeyReadme from '!!raw-loader!../../../../visx-sankey/Readme.md';
import { Sankey } from '../../../../visx-sankey';
import DocPage from '../../components/DocPage';

const components = [Sankey];

const examples = [];

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
