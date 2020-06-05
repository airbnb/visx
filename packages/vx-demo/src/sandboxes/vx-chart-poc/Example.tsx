import React, { useState } from 'react';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import Axis from './src/components/Axis';
import ChartProvider from './src/components/providers/ChartProvider';
import XYChart from './src/components/XYChart';
import LineSeries from './src/components/LineSeries';
import ChartBackground from './src/components/ChartBackground';
import EventProvider from './src/components/providers/EventProvider';
import Tooltip from './src/components/Tooltip';
import Brush from './src/components/Brush';

const data = appleStock.slice(1100);
const data2 = data.map((d, i) => ({ ...d, close: data[data.length - i - 1].close }));
const xAccessor = (d: AppleStock) => new Date(d.date);
const yAccessor = (d: AppleStock) => d.close;
const lineSeriesProps1 = {
  data,
  xAccessor,
  yAccessor,
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
  const [brush, setBrush] = useState<null | 'chart' | 'yAxis' | 'xAxis'>(null);
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');
  const [snapTooltipToDataX, setSnapTooltipToDataX] = useState(false);
  const [snapTooltipToDataY, setSnapTooltipToDataY] = useState(true);
  return (
    <div className="container">
      <ChartProvider<Date, number>
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear', domain: useCustomDomain ? [200, 800] : undefined, includeZero }}
      >
        <EventProvider>
          <XYChart
            captureEvents={brush == null}
            height={400}
            width={800}
            margin={{
              left: yAxisOrientation === 'left' ? 50 : 0,
              bottom: 50,
              right: 50,
              top: 50,
            }}
          >
            <ChartBackground />
            <Axis orientation={yAxisOrientation} numTicks={4} />
            <Axis orientation={xAxisOrientation} />
            <LineSeries dataKey="1" {...lineSeriesProps1} />
            <LineSeries mouseEvents={false} dataKey="2" {...lineSeriesProps2} />
            {brush && (
              <Brush
                initialBrushPosition={({ xScale, yScale }) => ({
                  start:
                    brush === 'yAxis'
                      ? { y: yScale(yAccessor(data[40])) }
                      : { x: xScale(xAccessor(data[40])) },
                  end:
                    brush === 'yAxis'
                      ? { y: yScale(yAccessor(data[80])) }
                      : { x: xScale(xAccessor(data[60])) },
                })}
                selectedBoxStyle={{
                  fill: 'purple',
                  stroke: 'purple',
                  fillOpacity: 0.2,
                }}
                brushRegion={brush}
                brushDirection={brush === 'yAxis' ? 'vertical' : 'horizontal'}
                xAxisOrientation={xAxisOrientation}
                yAxisOrientation={yAxisOrientation}
              />
            )}
          </XYChart>
          <Tooltip snapToDataX={snapTooltipToDataX} snapToDataY={snapTooltipToDataY} />
        </EventProvider>
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
      <br />
      <label>
        <input
          type="checkbox"
          checked={snapTooltipToDataX}
          onChange={() => setSnapTooltipToDataX(!snapTooltipToDataX)}
        />
        Snap tooltip to data <code>x</code>&nbsp;
      </label>
      <label>
        <input
          type="checkbox"
          checked={snapTooltipToDataY}
          onChange={() => setSnapTooltipToDataY(!snapTooltipToDataY)}
        />
        Snap tooltip to data <code>y</code>&nbsp;
      </label>
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
      <div className="radio">
        brush:
        <label>
          <input type="radio" onChange={() => setBrush(null)} checked={brush === null} /> none
        </label>
        <label>
          <input type="radio" onChange={() => setBrush('chart')} checked={brush === 'chart'} />{' '}
          chart
        </label>
        <label>
          <input type="radio" onChange={() => setBrush('xAxis')} checked={brush === 'xAxis'} />{' '}
          xAxis
        </label>
        <label>
          <input type="radio" onChange={() => setBrush('yAxis')} checked={brush === 'yAxis'} />{' '}
          yAxis
        </label>
      </div>
      <style jsx>{`
        .container {
          position: relative;
        }
        .radio,
        label {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
