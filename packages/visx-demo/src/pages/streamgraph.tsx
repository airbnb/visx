import React from 'react';
import Streamgraph from '../sandboxes/visx-streamgraph/Example';
import packageJson from '../sandboxes/visx-streamgraph/package.json';
import Show from '../components/Show';
import StreamgraphSource from '!!raw-loader!../sandboxes/visx-streamgraph/Example';

function StreamgraphPage() {
  return (
    <Show
      component={Streamgraph}
      title="Streamgraph"
      codeSandboxDirectoryName="visx-streamgraph"
      packageJson={packageJson}
    >
      {StreamgraphSource}
    </Show>
  );
}
export default StreamgraphPage;
