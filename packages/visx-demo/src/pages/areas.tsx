import React from 'react';
import Area from '@visx/demo-area/Example';
import packageJson from '@visx/demo-area/package.json';
import Show from '../components/Show';
import AreaSource from '!!raw-loader!../sandboxes/visx-area/Example';

function AreasPage() {
  return (
    <Show
      component={Area}
      title="Areas"
      codeSandboxDirectoryName="visx-area"
      packageJson={packageJson}
    >
      {AreaSource}
    </Show>
  );
}
export default AreasPage;
