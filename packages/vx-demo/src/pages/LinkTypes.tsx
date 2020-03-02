import React from 'react';
import Show from '../components/Show';
import LinkTypes from '../components/tiles/LinkTypes';
import LinkTypesSource from '!!raw-loader!../components/tiles/LinkTypes';

export default () => {
  return (
    <Show
      events
      title="Link Types"
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
