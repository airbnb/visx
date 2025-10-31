import React from 'react';
import NetworkReadme from '!!raw-loader!../../../../visx-network/Readme.md';
import * as NetworkComponents from '../../../../visx-network/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import NetworkTile from '../../components/Gallery/NetworkTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('network', NetworkComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [NetworkTile];

function NetworkDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={NetworkReadme}
      visxPackage="network"
    />
  );
}
export default NetworkDocs;
