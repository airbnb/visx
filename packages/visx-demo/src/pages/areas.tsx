import React from 'react';
import Show from '../components/Show';
import Area from '../sandboxes/visx-area/Example';
import AreaSource from '!!raw-loader!../sandboxes/visx-area/Example';
import packageJson from '../sandboxes/visx-area/package.json';

const AreasPage = () => (
  <Show
    component={Area}
    title="Areas"
    codeSandboxDirectoryName="visx-area"
    packageJson={packageJson}
  >
    {AreaSource}
  </Show>
);
export default AreasPage;
