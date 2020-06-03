import React from 'react';
import Show from '../components/Show';
import Dendrograms from '../sandboxes/vx-dendrogram/Example';
import DendrogramsSource from '!!raw-loader!../sandboxes/vx-dendrogram/Example';
import packageJson from '../sandboxes/vx-dendrogram/package.json';

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
      packageJson={packageJson}
    >
      {DendrogramsSource}
    </Show>
  );
};
