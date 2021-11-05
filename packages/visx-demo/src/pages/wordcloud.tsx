import React from 'react';
import WordcloudSource from '!!raw-loader!../sandboxes/visx-wordcloud/Example';
import Show from '../components/Show';
import Wordcloud from '../sandboxes/visx-wordcloud/Example';
import packageJson from '../sandboxes/visx-wordcloud/package.json';

const WordcloudPage = () => {
  return (
    <Show
      component={({ width, height }) => <Wordcloud width={width} height={height} showControls />}
      title="Wordcloud"
      codeSandboxDirectoryName="visx-wordcloud"
      packageJson={packageJson}
    >
      {WordcloudSource}
    </Show>
  );
};
export default WordcloudPage;
