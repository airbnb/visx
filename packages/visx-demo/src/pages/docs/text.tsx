import React from 'react';
import TextReadme from '!!raw-loader!../../../../visx-text/Readme.md';
import * as TextComponents from '../../../../visx-text/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import TextTile from '../../components/Gallery/TextTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('text', TextComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [TextTile];

function TextDocs() {
  return (
    <DocPage components={components} examples={examples} readme={TextReadme} visxPackage="text" />
  );
}
export default TextDocs;
