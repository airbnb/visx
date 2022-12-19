import React from 'react';
import Area from '../sandboxes/visx-area/Example';
import packageJson from '../sandboxes/visx-area/package.json';
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
