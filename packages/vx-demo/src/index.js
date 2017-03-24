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
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };

  return (
    <div>
      <h2>vx | <a href="https://github.com/hshoff/vx">https://github.com/hshoff/vx</a></h2>
      <p>
        A collection of reusable low-level visualization components. vx combines the power of d3 to generate your visualization and react for updating the DOM.
        <br/><br/>
        Below are some simple examples of composing vx components to make reusable charts. They're responsive too.
        <br/><br/>
        Super beta. Hold off on using this in production until I shake out some of the bigger API problems (post v1.0.0+).
      </p>
      <p>
        <a href="https://github.com/hshoff/vx/tree/master/packages/vx-demo/src">
          view source
        </a>
      </p>
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
      </div>
      <br/>
      <div>
        <SimpleAreaChart
          width={width}
          height={height}
          margin={margin}
        />
      </div>
      <br/>
      <div>
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
      </div>
    </div>
  );
}
