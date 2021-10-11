import React from 'react';
import Show from '../components/Show';
import LinkTypes from '../sandboxes/visx-linktypes/Example';
import LinkTypesSource from '!!raw-loader!../sandboxes/visx-linktypes/Example';
import packageJson from '../sandboxes/visx-linktypes/package.json';

const LinkTypesPage = () => {
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
};
export default LinkTypesPage;
