/* eslint-disable unicorn/consistent-function-scoping */
import React, { useState, useMemo, useCallback } from 'react';
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
import Legend from './src/components/Legend';
import CustomLegendShape from './src/components/CustomLegendShape';

type DataKeys = 'austin' | 'sf' | 'ny';

const data = cityTemperature.slice(200, 200 + 72).map(({ date, ...d }) => ({
  ...d,
  // current format is like `20200105` which you can't form a valid date from
  // @TODO PR soon!
  date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
  key: date,
})) as CityTemperature[];

const halfData = data.slice(0, Math.floor(data.length / 2));

const numDateTicks = 5;

const getDate = (d: CityTemperature) => new Date(d.date);
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);

const axisTopMargin = { top: 40, right: 50, bottom: 5, left: 50 };
const axisBottomMargin = { top: 5, right: 50, bottom: 40, left: 50 };

const colorScaleConfig: { domain: DataKeys[] } = { domain: ['austin', 'sf', 'ny'] };
const legendLabelFormat = (d: DataKeys) =>
  d === 'sf' ? 'San Francisco' : d === 'ny' ? 'New York' : d === 'austin' ? 'Austin' : d;

const renderTooltip = ({
  closestData,
  closestDatum,
  colorScale,
}: RenderTooltipArgs<CityTemperature, DataKeys>) => (
  <>
    <div>{closestDatum.datum.date}</div>
    <br />
    {closestData?.sf && (
      <div
        style={{
          color: colorScale('sf'),
          textDecoration: closestDatum.key === 'sf' ? 'underline solid currentColor' : 'none',
        }}
      >
        San Francisco {closestData.sf.datum['San Francisco']}°F
      </div>
    )}
    {closestData?.ny && (
      <div
        style={{
          color: colorScale('ny'),
          textDecoration: closestDatum.key === 'ny' ? 'underline solid currentColor' : 'none',
        }}
      >
        New York {closestData.ny.datum['New York']}°F
      </div>
    )}
    {closestData?.austin && (
      <div
        style={{
          color: colorScale('austin'),
          textDecoration: closestDatum.key === 'austin' ? 'underline solid currentColor' : 'none',
        }}
      >
        Austin {closestData.austin.datum.Austin}°F
      </div>
    )}
  </>
);

function useAccessors(
  temperatureAccessor: (d: CityTemperature) => number,
  dataMultiplier: number,
  renderHorizontally: boolean,
  negativeValues: boolean,
) {
  return useMemo(
    () => ({
      xAccessor: (d: CityTemperature) =>
        renderHorizontally
          ? (negativeValues ? -1 : 1) * dataMultiplier * temperatureAccessor(d)
          : getDate(d),
      yAccessor: (d: CityTemperature) =>
        renderHorizontally
          ? getDate(d)
          : (negativeValues ? -1 : 1) * dataMultiplier * temperatureAccessor(d),
    }),
    [renderHorizontally, negativeValues, dataMultiplier, temperatureAccessor],
  );
}

export default function Example() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'none'>('light');
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [currData, setCurrData] = useState(data);
  const [useAnimatedAxes, setUseAnimatedAxes] = useState(false);
  const [autoWidth, setAutoWidth] = useState(false);
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [negativeValues, setNegativeValues] = useState(false);
  const [includeZero, setIncludeZero] = useState(false);
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('left');
  const [legendLeftRight, setLegendLeftRight] = useState<'left' | 'right'>('right');
  const [legendTopBottom, setLegendTopBottom] = useState<'top' | 'bottom'>('top');
  const [legendDirection, setLegendDirection] = useState<'column' | 'row'>('row');
  const [legendShape, setLegendShape] = useState<'auto' | 'rect' | 'line' | 'circle' | 'custom'>(
    'auto',
  );
  const [snapTooltipToDataX, setSnapTooltipToDataX] = useState(true);
  const [snapTooltipToDataY, setSnapTooltipToDataY] = useState(true);
  const [dataMultiplier, setDataMultiplier] = useState(2);
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
  const austinAccessors = useAccessors(
    getAustinTemperature,
    dataMultiplier,
    renderHorizontally,
    negativeValues,
  );
  const sfAccessors = useAccessors(getSfTemperature, 1, renderHorizontally, negativeValues);
  const nyAccessors = useAccessors(
    getNyTemperature,
    dataMultiplier,
    renderHorizontally,
    negativeValues,
  );
  const themeObj = useMemo(
    () =>
      theme === 'light'
        ? { ...defaultTheme, colors: ['#fbd46d', '#ff9c71', '#654062'] }
        : theme === 'dark'
        ? { ...darkTheme, colors: ['#916dd5', '#f8615a', '#ffd868'] }
        : // @ts-ignore {} is not a valid theme
          { colors: ['#222', '#767676', '#bbb'] },
    [theme],
  );

  const AxisComponent = useAnimatedAxes ? AnimatedAxis : Axis;
  const legend = (
    <Legend
      labelFormat={legendLabelFormat}
      alignLeft={legendLeftRight === 'left'}
      direction={legendDirection}
      shape={
        legendShape === 'auto'
          ? undefined
          : legendShape === 'custom'
          ? CustomLegendShape
          : legendShape
      }
    />
  );

  return (
    <div className="container">
      {/** @ts-ignore */}
      <ChartProvider
        theme={themeObj}
        xScale={renderHorizontally ? temperatureScaleConfig : dateScaleConfig}
        yScale={renderHorizontally ? dateScaleConfig : temperatureScaleConfig}
        colorScale={colorScaleConfig}
      >
        <EventProvider>
          {legendTopBottom === 'top' && legend}
          <div className="container">
            <XYChart
              height={400}
              width={autoWidth ? undefined : 800}
              margin={xAxisOrientation === 'top' ? axisTopMargin : axisBottomMargin}
            >
              <ChartBackground />
              <BarSeries
                dataKey="austin"
                data={currData}
                {...austinAccessors}
                horizontal={renderHorizontally}
              />
              <LineSeries dataKey="sf" data={currData} {...sfAccessors} strokeWidth={1.5} />
              <LineSeries
                dataKey="ny"
                data={currData}
                {...nyAccessors}
                strokeWidth={1.5}
                strokeDasharray="5,3"
              />

              {/** Temperature axis */}
              <AxisComponent
                label="Temperature (°F)"
                orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
                numTicks={5}
              />
              {/** Date axis */}
              <AxisComponent
                orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation}
                tickValues={currData
                  .filter((d, i, arr) => i % Math.round((arr.length - 1) / numDateTicks) === 0)
                  .map(d => new Date(d.date))}
                tickFormat={(d: Date) => d.toISOString?.().split?.('T')[0] ?? d.toString()}
              />
            </XYChart>
            <Tooltip
              snapToDataX={snapTooltipToDataX}
              snapToDataY={snapTooltipToDataY}
              renderTooltip={renderTooltip}
              renderInPortal={renderTooltipInPortal}
            />
          </div>
          {legendTopBottom === 'bottom' && legend}
        </EventProvider>
      </ChartProvider>
      <br />
      <br />
      <div className="controls">
        <div>
          <strong>data</strong>
          &nbsp;&nbsp;&nbsp;
          <button
            onClick={() => {
              setDataMultiplier(5 * Math.random());
              // setCurrData(currData === data ? halfData : data);
            }}
          >
            Update data
          </button>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="checkbox"
              checked={useCustomDomain}
              onChange={() => setUseCustomDomain(!useCustomDomain)}
            />
            Custom y-axis range
          </label>
          &nbsp;&nbsp;&nbsp;
          {!useCustomDomain && (
            <label>
              <input
                type="checkbox"
                checked={includeZero}
                onChange={() => setIncludeZero(!includeZero)}
              />
              Include zero&nbsp;&nbsp;&nbsp;
            </label>
          )}
          <label>
            <input
              type="checkbox"
              checked={renderHorizontally}
              onChange={() => setRenderHorizontally(!renderHorizontally)}
            />
            Render horizontally
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="checkbox"
              checked={negativeValues}
              onChange={() => setNegativeValues(!negativeValues)}
            />
            Negative values&nbsp;
          </label>
        </div>
        <div>
          <strong>theme</strong>
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
          <strong>tooltip</strong>&nbsp;&nbsp;&nbsp;
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
        <div>
          <strong>legend</strong>
          <label>
            <input
              type="radio"
              onChange={() => setLegendLeftRight('left')}
              checked={legendLeftRight === 'left'}
            />{' '}
            left
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setLegendLeftRight('right')}
              checked={legendLeftRight === 'right'}
            />{' '}
            right
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              onChange={() => setLegendTopBottom('top')}
              checked={legendTopBottom === 'top'}
            />{' '}
            top
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setLegendTopBottom('bottom')}
              checked={legendTopBottom === 'bottom'}
            />{' '}
            bottom
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              onChange={() => setLegendDirection('row')}
              checked={legendDirection === 'row'}
            />{' '}
            horizontal
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setLegendDirection('column')}
              checked={legendDirection === 'column'}
            />{' '}
            vertical
          </label>
        </div>
        <div>
          <strong>legend shape</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              onChange={() => setLegendShape('auto')}
              checked={legendShape === 'auto'}
            />{' '}
            auto
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setLegendShape('rect')}
              checked={legendShape === 'rect'}
            />{' '}
            rect
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setLegendShape('line')}
              checked={legendShape === 'line'}
            />{' '}
            line
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setLegendShape('circle')}
              checked={legendShape === 'circle'}
            />{' '}
            circle
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setLegendShape('custom')}
              checked={legendShape === 'custom'}
            />{' '}
            custom
          </label>
        </div>
        <div>
          <strong>axis</strong>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="checkbox"
              checked={useAnimatedAxes}
              onChange={() => setUseAnimatedAxes(!useAnimatedAxes)}
            />
            animated axes
          </label>
          &nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;
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
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .controls {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
