import React from 'react';
import ResponsiveReadme from '!!raw-loader!../../../../visx-responsive/Readme.md';
import * as ResponsiveComponents from '../../../../visx-responsive/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import ResponsiveTile from '../../components/Gallery/ResponsiveTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('responsive', ResponsiveComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [ResponsiveTile];

function ResponsiveDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={ResponsiveReadme}
      visxPackage="responsive"
    />
  );
}
export default ResponsiveDocs;
