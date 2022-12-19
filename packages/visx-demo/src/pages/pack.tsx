import React from 'react';
import Pack from '../sandboxes/visx-pack/Example';
import packageJson from '../sandboxes/visx-pack/package.json';
import Show from '../components/Show';
import PackSource from '!!raw-loader!../sandboxes/visx-pack/Example';

function PackPage() {
  return (
    <Show
      component={Pack}
      title="Pack"
      codeSandboxDirectoryName="visx-pack"
      packageJson={packageJson}
    >
      {PackSource}
    </Show>
  );
}
export default PackPage;
