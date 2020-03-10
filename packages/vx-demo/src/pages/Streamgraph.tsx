import React from 'react';
import Show from '../components/Show';
import Streamgraph from '../docs-v2/examples/vx-streamgraph/Example';
import StreamgraphSource from '!!raw-loader!../docs-v2/examples/vx-streamgraph/Example';

export default () => {
  return (
    <Show component={Streamgraph} title="Streamgraph" codeSandboxDirectoryName="vx-streamgraph">
      {StreamgraphSource}
    </Show>
  );
};
