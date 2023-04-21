import React from 'react';
import Wordcloud from '../sandboxes/visx-wordcloud/Example';
import packageJson from '../sandboxes/visx-wordcloud/package.json';
import WordcloudSource from '!!raw-loader!../sandboxes/visx-wordcloud/Example';
import Show from '../components/Show';
var component = function (_a) {
    var width = _a.width, height = _a.height;
    return (<Wordcloud width={width} height={height} showControls/>);
};
function WordcloudPage() {
    return (<Show component={component} title="Wordcloud" codeSandboxDirectoryName="visx-wordcloud" packageJson={packageJson}>
      {WordcloudSource}
    </Show>);
}
export default WordcloudPage;
