/* eslint-disable unicorn/consistent-function-scoping */
import React, { useState, useMemo } from 'react';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import defaultTheme from './src/theme/default';
import darkTheme from './src/theme/darkTheme';
import Axis from './src/components/Axis';
import AnimatedAxis from './src/components/AnimatedAxis';
import ChartProvider from './src/components/providers/ChartProvider';
import XYChart from './src/components/XYChart';
import BarSeries from './src/components/series/BarSeries';
import LineSeries from './src/components/series/LineSeries';
import ChartBackground from './src/components/ChartBackground';
import EventProvider from './src/components/providers/TooltipProvider';
import Tooltip, { RenderTooltipArgs } from './src/components/Tooltip';
import { ScaleConfig } from './src/types';

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

const margin = { top: 50, right: 50, bottom: 50, left: 50 };

const renderTooltip = ({
  closestData,
  closestDatum,
  colorScale,
}: RenderTooltipArgs<CityTemperature, 'austin' | 'sf' | 'ny'>) => (
  <>
    <div>{closestDatum.datum.date}</div>
    <br />
    <div
      style={{
        color: colorScale('sf'),
        textDecoration: closestDatum.key === 'sf' ? 'underline solid currentColor' : 'none',
      }}
    >
      San Francisco {closestData.sf.datum['San Francisco']}°F
    </div>
    <div
      style={{
        color: colorScale('ny'),
        textDecoration: closestDatum.key === 'ny' ? 'underline solid currentColor' : 'none',
      }}
    >
      New York {closestData.ny.datum['New York']}°F
    </div>
    <div
      style={{
        color: colorScale('austin'),
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
  const [autoWidth, setAutoWidth] = useState(false);
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [negativeValues, setNegativeValues] = useState(false);
  const [includeZero, setIncludeZero] = useState(false);
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('left');
  const [snapTooltipToDataX, setSnapTooltipToDataX] = useState(true);
  const [snapTooltipToDataY, setSnapTooltipToDataY] = useState(true);
  const [dataMultiplier, setDataMultiplier] = useState(1);
  const [renderTooltipInPortal, setRenderTooltipInPortal] = useState(true);
  const dateScaleConfig: ScaleConfig<string> = useMemo(() => ({ type: 'band' }), []);
  const temperatureScaleConfig: ScaleConfig<number> = useMemo(
    () => ({
      type: 'linear',
      clamp: true,
      nice: true,
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
      {/** @ts-ignore */}
      <ChartProvider
        theme={
          theme === 'light'
            ? { ...defaultTheme, colors: ['#fbd46d', '#ff9c71', '#654062'] }
            : theme === 'dark'
            ? { ...darkTheme, colors: ['#916dd5', '#fbcffc', '#ffeb99'] }
            : // @ts-ignore {} is not a valid theme
              {}
        }
        xScale={renderHorizontally ? temperatureScaleConfig : dateScaleConfig}
        yScale={renderHorizontally ? dateScaleConfig : temperatureScaleConfig}
      >
        <EventProvider>
          <XYChart height={400} width={autoWidth ? undefined : 800} margin={margin}>
            <ChartBackground />
            <BarSeries
              dataKey="austin"
              data={data}
              {...getAccessors(getAustinTemperature)}
              horizontal={renderHorizontally}
            />
            <LineSeries
              dataKey="sf"
              data={data}
              {...getAccessors(getSfTemperature, false)}
              strokeWidth={1.5}
            />
            <LineSeries
              dataKey="ny"
              data={data}
              {...getAccessors(getNyTemperature)}
              strokeWidth={1.5}
              strokeDasharray="5,3"
            />
            {/** Temperature axis */}
            <AnimatedAxis
              label="Temperature (°F)"
              orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
              numTicks={5}
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
            renderInPortal={renderTooltipInPortal}
          />
        </EventProvider>
      </ChartProvider>
      <br />
      <button onClick={() => setDataMultiplier(4 * Math.random())}>Update data</button>
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
      <div>
        tooltip&nbsp;&nbsp;&nbsp;
        <label>
          <input
            type="checkbox"
            checked={renderTooltipInPortal}
            onChange={() => setRenderTooltipInPortal(!renderTooltipInPortal)}
          />
          Render tooltip in portal&nbsp;&nbsp;&nbsp;
        </label>
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
      </div>
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
        {/* <br />
        <label>
          <input type="checkbox" onChange={() => setAutoWidth(!autoWidth)} checked={autoWidth} />{' '}
          responsive width
        </label> */}
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .radio,
        label {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
