import React from 'react';
import VisxReadme from '!!raw-loader!../../../../visx-visx/Readme.md';
import DocPage from '../../components/DocPage';

function VisxDocs() {
  return <DocPage readme={VisxReadme} visxPackage="visx" />;
}
export default VisxDocs;
