import React, { useState } from 'react';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import Axis from './src/components/Axis';
import ChartProvider from './src/components/ChartProvider';
import XYChart from './src/components/XYChart';
import LineSeries from './src/components/LineSeries';
import ChartBackground from './src/components/ChartBackground';

const data = appleStock.slice(1150);
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
  const [useCustomDomain, setUseCustomDomain] = useState(true);
  const [includeZero, setIncludeZero] = useState(false);
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');
  return (
    <>
      <ChartProvider<Date, number>
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear', domain: useCustomDomain ? [200, 800] : undefined, includeZero }}
      >
        <XYChart
          height={400}
          margin={{ left: yAxisOrientation === 'left' ? 50 : 0, bottom: 50, right: 50, top: 50 }}
        >
          <ChartBackground />
          <Axis orientation={yAxisOrientation} numTicks={4} />
          <Axis orientation={xAxisOrientation} />
          <LineSeries dataKey="1" {...lineSeriesProps1} />
          <LineSeries dataKey="2" {...lineSeriesProps2} />
        </XYChart>
      </ChartProvider>
      <br />
      <label>
        <input
          type="checkbox"
          checked={useCustomDomain}
          onChange={() => setUseCustomDomain(!useCustomDomain)}
        />
        Custom y-axis range&nbsp;
      </label>
      &nbsp;
      {!useCustomDomain && (
        <label>
          <input
            type="checkbox"
            checked={includeZero}
            onChange={() => setIncludeZero(!includeZero)}
          />
          Include zero&nbsp;
        </label>
      )}
      <div className="radio">
        x-axis orientation:
        <label>
          <input
            type="radio"
            onChange={() => setXAxisOrientation('bottom')}
            checked={xAxisOrientation === 'bottom'}
          />{' '}
          bottom
        </label>
        <label>
          <input
            type="radio"
            onChange={() => setXAxisOrientation('top')}
            checked={xAxisOrientation === 'top'}
          />{' '}
          top
        </label>
      </div>
      <div className="radio">
        y-axis orientation:
        <label>
          <input
            type="radio"
            onChange={() => setYAxisOrientation('right')}
            checked={yAxisOrientation === 'right'}
          />{' '}
          right
        </label>
        <label>
          <input
            type="radio"
            onChange={() => setYAxisOrientation('left')}
            checked={yAxisOrientation === 'left'}
          />{' '}
          left
        </label>
      </div>
      <style jsx>{`
        .radio,
        label {
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
