import React from 'react';
import Show from '../components/Show';
import Pack from '../sandboxes/visx-pack/Example';
import PackSource from '!!raw-loader!../sandboxes/visx-pack/Example';
import packageJson from '../sandboxes/visx-pack/package.json';

const PackPage = () => (
  <Show
    component={Pack}
    title="Pack"
    codeSandboxDirectoryName="visx-pack"
    packageJson={packageJson}
  >
    {PackSource}
  </Show>
);
export default PackPage;
