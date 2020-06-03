import React from 'react';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import Axis from './src/components/Axis';
import ChartProvider from './src/components/ChartProvider';
import XYChart from './src/components/XYChart';
import LineSeries from './src/components/LineSeries';
import ChartBackground from './src/components/ChartBackground';

const data = appleStock.slice(1100);
const data2 = data.map((d, i) => ({ ...d, close: data[data.length - i - 1].close }));
const lineSeriesProps1 = {
  data,
  xAccessor: (d: AppleStock) => new Date(d.date),
  yAccessor: (d: AppleStock) => d.close,
  stroke: '#562349',
  strokeWidth: 1.5,
};
const lineSeriesProps2 = {
  ...lineSeriesProps1,
  stroke: '#ad6989',
  data: data2,
};

export default function Example() {
  return (
    <ChartProvider xScale={{ type: 'time' }} yScale={{ type: 'linear', domain: [200, 800] }}>
      <XYChart height={400} margin={{ left: 10, bottom: 50, right: 50, top: 10 }}>
        <ChartBackground />
        <Axis orientation="right" numTicks={4} />
        <Axis orientation="bottom" />
        <LineSeries dataKey="1" {...lineSeriesProps1} />
        <LineSeries dataKey="2" {...lineSeriesProps2} />
      </XYChart>
    </ChartProvider>
  );
}
