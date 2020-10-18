import React from 'react';
import Show from '../components/Show';
import Streamgraph from '../sandboxes/visx-streamgraph/Example';
import StreamgraphSource from '!!raw-loader!../sandboxes/visx-streamgraph/Example';
import packageJson from '../sandboxes/visx-streamgraph/package.json';

const StreamgraphPage = () => (
  <Show
    component={Streamgraph}
    title="Streamgraph"
    codeSandboxDirectoryName="visx-streamgraph"
    packageJson={packageJson}
  >
    {StreamgraphSource}
  </Show>
);
export default StreamgraphPage;
