import React from 'react';
import Show from '../components/Show';
import Dendrograms from '../docs-v2/examples/vx-dendrogram/Example';
import DendrogramsSource from '!!raw-loader!../docs-v2/examples/vx-dendrogram/Example';

export default () => {
  return (
    <Show
      events
      title="Dendrograms"
      codeSandboxDirectoryName="vx-dendrogram"
      component={Dendrograms}
      margin={{
        top: 80,
        left: 10,
        right: 10,
        bottom: 80,
      }}
    >
      {DendrogramsSource}
    </Show>
  );
};
