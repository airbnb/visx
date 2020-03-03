import React from 'react';
import Show from '../components/Show';
import Radar from '../components/tiles/Radar';
import RadarSource from '!!raw-loader!../components/tiles/Radar';

export default () => {
  return (
    <Show component={Radar} title="Radar">
      {RadarSource}
    </Show>
  );
};
