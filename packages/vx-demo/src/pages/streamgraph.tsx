import React from 'react';
import Show from '../components/Show';
import Streamgraph from '../sandboxes/vx-streamgraph/Example';
import StreamgraphSource from '!!raw-loader!../sandboxes/vx-streamgraph/Example';
import packageJson from '../sandboxes/vx-streamgraph/package.json';

export default () => (
  <Show
    component={Streamgraph}
    title="Streamgraph"
    codeSandboxDirectoryName="vx-streamgraph"
    packageJson={packageJson}
  >
    {StreamgraphSource}
  </Show>
);
