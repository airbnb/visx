import React from 'react';
import Show from '../components/Show';
import LinkTypes from '../sandboxes/vx-linktypes/Example';
import LinkTypesSource from '!!raw-loader!../sandboxes/vx-linktypes/Example';

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
