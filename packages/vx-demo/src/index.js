import React from 'react';
import Mock from '@vx/mock-data';
import Curve from '@vx/curve';
import SimpleLineChart from './demos/charts/SimpleLineChart';
import SimpleAreaChart from './demos/charts/SimpleAreaChart';
import SimpleLineWithGlyphsChart from './demos/charts/SimpleLineWithGlyphsChart';

export default function Demo() {
  const data1 = Mock.genDateValue(20);
  const data2 = Mock.genDateValue(20);

  const width = 800;
  const height = 400;
  const margin = {
    top: 20,
    bottom: 30,
    left: 50,
    right: 50,
  };

  return (
    <div>
      <SimpleLineChart
        width={width}
        height={height}
        margin={margin}
        dataset={[{
          data: data1,
          chart: {
            stroke: '#6A7DD3',
            strokeWidth: 4,
            backgroundColor: 'white',
          }
        }]}
      />

      <SimpleLineWithGlyphsChart
        width={width}
        height={height}
        margin={margin}
        dataset={[{
          data: data2,
          chart: {
            stroke: '#b531ce',
            strokeWidth: 4,
            backgroundColor: 'white',
          }
        }]}
      />

      <SimpleAreaChart
        width={width}
        height={height}
        margin={margin}
      />
    </div>
  );
}
