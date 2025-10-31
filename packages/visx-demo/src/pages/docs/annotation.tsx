import React from 'react';
import AnnotationReadme from '!!raw-loader!../../../../visx-annotation/Readme.md';
import * as AnnotationComponents from '../../../../visx-annotation/src';
import DocPage from '../../components/DocPage';
import AnnotationTile from '../../components/Gallery/AnnotationTile';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('annotation', AnnotationComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [AnnotationTile];

function AnnotationDocs() {
  return (
    <DocPage
      examples={examples}
      components={components}
      readme={AnnotationReadme}
      visxPackage="annotation"
    />
  );
}

export default AnnotationDocs;
