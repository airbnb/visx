import React from 'react';
import Show from '../components/Show';
import Streamgraph from '../sandboxes/vx-streamgraph/Example';
import StreamgraphSource from '!!raw-loader!../sandboxes/vx-streamgraph/Example';

export default () => {
  return (
    <Show component={Streamgraph} title="Streamgraph" codeSandboxDirectoryName="vx-streamgraph">
      {StreamgraphSource}
    </Show>
  );
};
