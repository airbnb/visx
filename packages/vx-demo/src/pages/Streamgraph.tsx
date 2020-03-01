import React from 'react';
import Show from '../components/Show';
import Streamgraph from '../components/tiles/Streamgraph';
import StreamgraphSource from '!!raw-loader!../components/tiles/Streamgraph';

export default () => {
  return (
    <Show
      component={Streamgraph}
      title="Streamgraph"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
      }}
    >
      {StreamgraphSource}
    </Show>
  );
};
