import React from 'react';
import WordcloudReadme from '!!raw-loader!../../../../visx-wordcloud/Readme.md';
import Wordcloud from '../../../../visx-wordcloud/src/Wordcloud';
import DocPage from '../../components/DocPage';
import WordcloudTile from '../../components/Gallery/WordcloudTile';

const components = [Wordcloud];

const examples = [WordcloudTile];

const WordcloudDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={WordcloudReadme}
    visxPackage="wordcloud"
  />
);
export default WordcloudDocs;
