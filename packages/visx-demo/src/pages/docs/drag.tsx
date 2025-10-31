import React from 'react';
import DragReadme from '!!raw-loader!../../../../visx-drag/Readme.md';
import * as DragComponents from '../../../../visx-drag/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import DragITile from '../../components/Gallery/DragITile';
import DragIITile from '../../components/Gallery/DragIITile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('drag', DragComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [DragITile, DragIITile];

function DragDocs() {
  return (
    <DocPage components={components} examples={examples} readme={DragReadme} visxPackage="drag" />
  );
}
export default DragDocs;
