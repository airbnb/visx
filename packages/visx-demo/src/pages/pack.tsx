import React from 'react';
import Pack from '@visx/demo-pack/Example';
import packageJson from '@visx/demo-pack/package.json';
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
