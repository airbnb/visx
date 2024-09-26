import React from 'react';
import SankeyReadme from '!!raw-loader!../../../../visx-sankey/Readme.md';
import Sankey from '../../../../visx-sankey/src/Sankey';
import DocPage from '../../components/DocPage';
import SankeyTile from '../../components/Gallery/SankeyTile';

const components = [Sankey];

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
