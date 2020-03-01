import React from 'react';
import Show from '../components/Show';
import Network from '../components/tiles/Network';
import NetworkSource from '!!raw-loader!../components/tiles/Network';

export default () => {
  return (
    <Show component={Network} title="Network">
      {NetworkSource}
    </Show>
  );
};
