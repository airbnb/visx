import React from 'react';
import Show from '../components/Show';
import VoronoiChart from '../components/tiles/Voronoi';
import VoronoiChartSource from '!!raw-loader!../components/tiles/Voronoi';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      component={VoronoiChart}
      title="Voronoi"
    >
      {VoronoiChartSource}
    </Show>
  );
};
