import React from 'react';
import ThresholdReadme from '!!raw-loader!../../../../visx-threshold/Readme.md';
import * as ThresholdComponents from '../../../../visx-threshold/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('threshold', ThresholdComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [ThresholdTile];

function ThresholdDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={ThresholdReadme}
      visxPackage="threshold"
    />
  );
}
export default ThresholdDocs;
