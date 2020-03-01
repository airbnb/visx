import React from 'react';
import Show from '../components/Show';
import Heatmap from '../components/tiles/Heatmap';
import HeatmapSource from '!!raw-loader!../components/tiles/Heatmap';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 10,
        left: 40,
        right: 30,
        bottom: 80,
      }}
      component={Heatmap}
      title="Heatmaps"
    >
      {HeatmapSource}
    </Show>
  );
};
