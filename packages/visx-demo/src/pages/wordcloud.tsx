import React from 'react';
import Wordcloud from '@visx/demo-wordcloud/Example';
import packageJson from '@visx/demo-wordcloud/package.json';
import WordcloudSource from '!!raw-loader!../sandboxes/visx-wordcloud/Example';
import Show from '../components/Show';

function WordcloudPage() {
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
}
export default WordcloudPage;
