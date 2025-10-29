import React from 'react';
import LegendReadme from '!!raw-loader!../../../../visx-legend/Readme.md';
import * as LegendComponents from '../../../../visx-legend/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import LegendsTile from '../../components/Gallery/LegendsTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('legend', LegendComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [LegendsTile];

function LegendDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={LegendReadme}
      visxPackage="legend"
    />
  );
}
export default LegendDocs;
