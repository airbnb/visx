import React from 'react';
import WordcloudReadme from '!!raw-loader!../../../../visx-wordcloud/Readme.md';
import * as WordcloudComponents from '../../../../visx-wordcloud/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import WordcloudTile from '../../components/Gallery/WordcloudTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('wordcloud', WordcloudComponents);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  (a?.__docgenInfo?.displayName ?? '').localeCompare(b?.__docgenInfo?.displayName ?? ''),
);

const examples = [WordcloudTile];

function WordcloudDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={WordcloudReadme}
      visxPackage="wordcloud"
    />
  );
}
export default WordcloudDocs;
