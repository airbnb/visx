import React from 'react';
import Show from '../components/Show';
import LinkTypes from '../docs-v2/examples/vx-linktypes/Example';
import LinkTypesSource from '!!raw-loader!../docs-v2/examples/vx-linktypes/Example';

export default () => {
  return (
    <Show
      events
      title="Link Types"
      codeSandboxDirectoryName="vx-linktypes"
      component={LinkTypes}
      margin={{
        top: 40,
        left: 40,
        right: 40,
        bottom: 40,
      }}
    >
      {LinkTypesSource}
    </Show>
  );
};
