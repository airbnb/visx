import React from 'react';
import ChordReadme from '!!raw-loader!../../../../visx-chord/Readme.md';
import * as ChordComponents from '../../../../visx-chord/src';
import DocPage from '../../components/DocPage';
import ChordTile from '../../components/Gallery/ChordTile';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('chord', ChordComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [ChordTile];

function ChordDocs() {
  return (
    <DocPage components={components} examples={examples} readme={ChordReadme} visxPackage="chord" />
  );
}
export default ChordDocs;
