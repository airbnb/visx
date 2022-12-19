import React from 'react';
import LinkTypes from '../sandboxes/visx-linktypes/Example';
import packageJson from '../sandboxes/visx-linktypes/package.json';
import Show from '../components/Show';
import LinkTypesSource from '!!raw-loader!../sandboxes/visx-linktypes/Example';

function LinkTypesPage() {
  return (
    <Show
      events
      title="Link Types"
      codeSandboxDirectoryName="visx-linktypes"
      component={LinkTypes}
      margin={{
        top: 40,
        left: 40,
        right: 40,
        bottom: 40,
      }}
      packageJson={packageJson}
    >
      {LinkTypesSource}
    </Show>
  );
}
export default LinkTypesPage;
