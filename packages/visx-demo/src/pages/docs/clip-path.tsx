import React from 'react';
import ClipPathReadme from '!!raw-loader!../../../../visx-clip-path/Readme.md';
import * as ClipPathComponents from '../../../../visx-clip-path/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('clip-path', ClipPathComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

function ClipPathDocs() {
  return <DocPage components={components} readme={ClipPathReadme} visxPackage="clip-path" />;
}
export default ClipPathDocs;
