import React from 'react';
import Show from '../components/Show';
import Dendrograms from '../sandboxes/visx-dendrogram/Example';
import DendrogramsSource from '!!raw-loader!../sandboxes/visx-dendrogram/Example';
import packageJson from '../sandboxes/visx-dendrogram/package.json';

const DendrogramsPage = () => {
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
};
export default DendrogramsPage;
