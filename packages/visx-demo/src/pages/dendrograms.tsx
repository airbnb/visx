import React from 'react';
import Dendrograms from '../sandboxes/visx-dendrogram/Example';
import packageJson from '../sandboxes/visx-dendrogram/package.json';
import Show from '../components/Show';
import DendrogramsSource from '!!raw-loader!../sandboxes/visx-dendrogram/Example';

function DendrogramsPage() {
  return (
    <Show
      events
      title="Dendrograms"
      codeSandboxDirectoryName="visx-dendrogram"
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
}
export default DendrogramsPage;
