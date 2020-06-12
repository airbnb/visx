/* eslint-disable unicorn/consistent-function-scoping */
import React, { useState, useMemo } from 'react';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import defaultTheme from './src/theme/default';
import darkTheme from './src/theme/darkTheme';
import Axis from './src/components/Axis';
import ChartProvider from './src/components/providers/ChartProvider';
import XYChart from './src/components/XYChart';
import BarSeries from './src/components/series/BarSeries';
import LineSeries from './src/components/series/LineSeries';
import ChartBackground from './src/components/ChartBackground';
import EventProvider from './src/components/providers/TooltipProvider';
import Tooltip from './src/components/Tooltip';
import { TooltipData, ScaleConfig } from './src/types';

const data = cityTemperature.slice(200, 200 + 72).map(({ date, ...d }) => ({
  ...d,
  // current format is like `20200105` which you can't form a valid date from
  // @TODO PR soon!
  date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
})) as CityTemperature[];

// @TODO fix this limitation in Axis
const numDateTicks = 5;
const dateTickValues = data
  .filter((d, i, arr) => i % Math.round((arr.length - 1) / numDateTicks) === 0)
  .map(d => new Date(d.date));

const getDate = (d: CityTemperature) => new Date(d.date);
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);

const nyColor = '#654062';
const austinColor = '#fbd46d';
const sfColor = '#ff9c71';
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

const renderTooltip = ({
  closestData,
  closestDatum,
}: TooltipData<CityTemperature, 'austin' | 'sf' | 'ny'>) => (
  <>
    <div>{closestDatum.datum.date}</div>
    <br />
    <div
      style={{
        color: sfColor,
        textDecoration: closestDatum.key === 'sf' ? 'underline solid currentColor' : 'none',
      }}
    >
      San Francisco {closestData.sf.datum['San Francisco']}°F
    </div>
    <div
      style={{
        color: nyColor,
        textDecoration: closestDatum.key === 'ny' ? 'underline solid currentColor' : 'none',
      }}
    >
      New York {closestData.ny.datum['New York']}°F
    </div>
    <div
      style={{
        color: austinColor,
        textDecoration: closestDatum.key === 'austin' ? 'underline solid currentColor' : 'none',
      }}
    >
      Austin {closestData.austin.datum.Austin}°F
    </div>
  </>
);

export default function Example() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'none'>('light');
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [negativeValues, setNegativeValues] = useState(false);
  const [includeZero, setIncludeZero] = useState(false);
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('left');
  const [snapTooltipToDataX, setSnapTooltipToDataX] = useState(true);
  const [snapTooltipToDataY, setSnapTooltipToDataY] = useState(true);
  const [dataMultiplier, setDataMultiplier] = useState(1);
  const dateScaleConfig: ScaleConfig<string> = useMemo(() => ({ type: 'band' }), []);
  const temperatureScaleConfig: ScaleConfig<number> = useMemo(
    () => ({
      type: 'linear',
      clamp: true,
      domain: useCustomDomain ? (negativeValues ? [-100, 50] : [-50, 100]) : undefined,
      includeZero,
    }),
    [useCustomDomain, includeZero, negativeValues],
  );
  const getAccessors = (
    temperatureAccessor: (d: CityTemperature) => number,
    useDataMultiplier = true,
  ) => ({
    xAccessor: (d: CityTemperature) =>
      renderHorizontally
        ? (negativeValues ? -1 : 1) *
          (useDataMultiplier ? dataMultiplier : 1) *
          temperatureAccessor(d)
        : getDate(d),
    yAccessor: (d: CityTemperature) =>
      renderHorizontally
        ? getDate(d)
        : (negativeValues ? -1 : 1) *
          (useDataMultiplier ? dataMultiplier : 1) *
          temperatureAccessor(d),
  });

  return (
    <div className="container">
      <ChartProvider
        // @ts-ignore {} is not a valid theme
        theme={theme === 'light' ? defaultTheme : theme === 'dark' ? darkTheme : {}}
        xScale={renderHorizontally ? temperatureScaleConfig : dateScaleConfig}
        yScale={renderHorizontally ? dateScaleConfig : temperatureScaleConfig}
      >
        <EventProvider>
          <XYChart height={400} width={800} margin={margin}>
            <ChartBackground />
            <BarSeries
              dataKey="austin"
              data={data}
              fill={austinColor}
              stroke="white"
              {...getAccessors(getAustinTemperature)}
              horizontal={renderHorizontally}
            />
            <LineSeries
              dataKey="sf"
              data={data}
              {...getAccessors(getSfTemperature, false)}
              stroke={sfColor}
              strokeWidth={1.5}
            />
            <LineSeries
              dataKey="ny"
              data={data}
              {...getAccessors(getNyTemperature)}
              stroke={nyColor}
              strokeWidth={1.5}
              strokeDasharray="5,3"
            />
            {/** Temperature axis */}
            <Axis
              label="Temperature (°F)"
              orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
              numTicks={4}
            />
            {/** Date axis */}
            <Axis
              orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation}
              tickValues={dateTickValues}
              tickFormat={(d: Date) => d.toISOString?.().split?.('T')[0] ?? d.toString()}
            />
          </XYChart>
          <Tooltip
            snapToDataX={snapTooltipToDataX}
            snapToDataY={snapTooltipToDataY}
            renderTooltip={renderTooltip}
          />
        </EventProvider>
      </ChartProvider>
      <br />
      <button onClick={() => setDataMultiplier(2 * Math.random())}>Update data</button>
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
      <label>
        <input
          type="checkbox"
          checked={renderHorizontally}
          onChange={() => setRenderHorizontally(!renderHorizontally)}
        />
        Render horizontally&nbsp;
      </label>
      <label>
        <input
          type="checkbox"
          checked={negativeValues}
          onChange={() => setNegativeValues(!negativeValues)}
        />
        Negative values&nbsp;
      </label>
      <br />
      <div className="radio">
        theme
        <label>
          <input type="radio" onChange={() => setTheme('light')} checked={theme === 'light'} />{' '}
          light
        </label>
        <label>
          <input type="radio" onChange={() => setTheme('dark')} checked={theme === 'dark'} /> dark
        </label>
        <label>
          <input type="radio" onChange={() => setTheme('none')} checked={theme === 'none'} /> none
        </label>
      </div>
      <label>
        <input
          type="checkbox"
          checked={snapTooltipToDataX}
          onChange={() => setSnapTooltipToDataX(!snapTooltipToDataX)}
        />
        Snap tooltip to data <code>x</code>&nbsp;&nbsp;&nbsp;
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
            onChange={() => setYAxisOrientation('left')}
            checked={yAxisOrientation === 'left'}
          />{' '}
          left
        </label>
        <label>
          <input
            type="radio"
            onChange={() => setYAxisOrientation('right')}
            checked={yAxisOrientation === 'right'}
          />{' '}
          right
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
