import React from 'react';
import ReactSpringReadme from '!!raw-loader!../../../../visx-react-spring/README.md';
import * as ReactSpringComponents from '../../../../visx-react-spring/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import AxisTile from '../../components/Gallery/AxisTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('react-spring', ReactSpringComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [AxisTile];

function ReactSpringDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={ReactSpringReadme}
      visxPackage="react-spring"
    />
  );
}
export default ReactSpringDocs;
