/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useState } from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import customTheme from './customTheme';

const dateScaleConfig = { type: 'band', paddingInner: 0.3 } as const;
const temperatureScaleConfig = { type: 'linear' } as const;
const numTicks = 4;
const data = cityTemperature.slice(200, 275);
const dataSmall = data.slice(0, 20);
const getDate = (d: CityTemperature) => d.date;
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNegativeSfTemperature = (d: CityTemperature) => -getSfTemperature(d);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);

type Accessor = (d: CityTemperature) => number | string;

interface Accessors {
  'San Francisco': Accessor;
  'New York': Accessor;
  Austin: Accessor;
}

type SimpleScaleConfig = { type: 'band' | 'linear'; paddingInner?: number };

type ProvidedProps = {
  accessors: {
    x: Accessors;
    y: Accessors;
    date: Accessor;
  };
  config: {
    x: SimpleScaleConfig;
    y: SimpleScaleConfig;
  };
  animationTrajectory: AnimationTrajectory;
  data: CityTemperature[];
  numTicks: number;
  renderHorizontally: boolean;
  renderBarSeries: boolean;
  renderBarStack: boolean;
  renderBarGroup: boolean;
  renderLineSeries: boolean;
  sharedTooltip: boolean;
  showGridColumns: boolean;
  showGridRows: boolean;
  showHorizontalCrosshair: boolean;
  showTooltip: boolean;
  showVerticalCrosshair: boolean;
  snapTooltipToDatumX: boolean;
  snapTooltipToDatumY: boolean;
  theme: XYChartTheme;
  xAxisOrientation: 'top' | 'bottom';
  yAxisOrientation: 'left' | 'right';
};

type ControlsProps = {
  children: (props: ProvidedProps) => React.ReactNode;
};

export default function ExampleControls({ children }: ControlsProps) {
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
  const [animationTrajectory, setAnimationTrajectory] = useState<AnimationTrajectory>('center');
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([false, false]);
  const [showGridRows, showGridColumns] = gridProps;
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showVerticalCrosshair, setShowVerticalCrosshair] = useState(true);
  const [showHorizontalCrosshair, setShowHorizontalCrosshair] = useState(false);
  const [snapTooltipToDatumX, setSnapTooltipToDatumX] = useState(true);
  const [snapTooltipToDatumY, setSnapTooltipToDatumY] = useState(true);
  const [sharedTooltip, setSharedTooltip] = useState(true);
  const [renderBarStackOrGroup, setRenderBarStackOrGroup] = useState<'bar' | 'stack' | 'group'>(
    'bar',
  );
  const [renderLineSeries, setRenderLineSeries] = useState(false);
  const [negativeValues, setNegativeValues] = useState(false);

  const accessors = useMemo(
    () => ({
      x: {
        'San Francisco': renderHorizontally
          ? negativeValues
            ? getNegativeSfTemperature
            : getSfTemperature
          : getDate,
        'New York': renderHorizontally ? getNyTemperature : getDate,
        Austin: renderHorizontally ? getAustinTemperature : getDate,
      },
      y: {
        'San Francisco': renderHorizontally
          ? getDate
          : negativeValues
          ? getNegativeSfTemperature
          : getSfTemperature,
        'New York': renderHorizontally ? getDate : getNyTemperature,
        Austin: renderHorizontally ? getDate : getAustinTemperature,
      },
      date: getDate,
    }),
    [renderHorizontally, negativeValues],
  );

  const config = useMemo(
    () => ({
      x: renderHorizontally ? temperatureScaleConfig : dateScaleConfig,
      y: renderHorizontally ? dateScaleConfig : temperatureScaleConfig,
    }),
    [renderHorizontally],
  );

  return (
    <>
      {children({
        accessors,
        animationTrajectory,
        config,
        data: renderBarStackOrGroup === 'bar' ? data : dataSmall,
        numTicks,
        renderBarGroup: renderBarStackOrGroup === 'group',
        renderBarSeries: renderBarStackOrGroup === 'bar',
        renderBarStack: renderBarStackOrGroup === 'stack',
        renderHorizontally,
        renderLineSeries: renderBarStackOrGroup === 'bar' && renderLineSeries,
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX: renderBarStackOrGroup !== 'stack' && snapTooltipToDatumX,
        snapTooltipToDatumY: renderBarStackOrGroup !== 'stack' && snapTooltipToDatumY,
        theme,
        xAxisOrientation,
        yAxisOrientation,
      })}
      <div className="controls">
        {/** theme */}
        <div>
          <strong>theme</strong>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(lightTheme)}
              checked={theme === lightTheme}
            />{' '}
            light
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(darkTheme)}
              checked={theme === darkTheme}
            />{' '}
            dark
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(customTheme)}
              checked={theme === customTheme}
            />{' '}
            custom
          </label>
        </div>

        {/** series orientation */}
        <div>
          <strong>series orientation</strong>
          <label>
            <input
              type="radio"
              onChange={() => setRenderHorizontally(false)}
              checked={!renderHorizontally}
            />{' '}
            vertical
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderHorizontally(true)}
              checked={renderHorizontally}
            />{' '}
            horizontal
          </label>
        </div>

        {/** axes */}
        <div>
          <strong>axes</strong>
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
        </div>

        {/** grid */}
        <div>
          <strong>grid</strong>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([true, false])}
              checked={showGridRows && !showGridColumns}
            />{' '}
            rows
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([false, true])}
              checked={!showGridRows && showGridColumns}
            />{' '}
            columns
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([true, true])}
              checked={showGridRows && showGridColumns}
            />{' '}
            both
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setGridProps([false, false])}
              checked={!showGridRows && !showGridColumns}
            />{' '}
            none
          </label>
        </div>
        {/** animation trajectory */}
        <div>
          <strong>axis + grid animation</strong>
          <label>
            <input
              type="radio"
              onChange={() => setAnimationTrajectory('center')}
              checked={animationTrajectory === 'center'}
            />{' '}
            from center
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnimationTrajectory('outside')}
              checked={animationTrajectory === 'outside'}
            />{' '}
            from outside
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnimationTrajectory('min')}
              checked={animationTrajectory === 'min'}
            />{' '}
            from min
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setAnimationTrajectory('max')}
              checked={animationTrajectory === 'max'}
            />{' '}
            from max
          </label>
        </div>
        {/** tooltip */}
        <div>
          <strong>tooltip</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setShowTooltip(!showTooltip)}
              checked={showTooltip}
            />{' '}
            show tooltip
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip || renderBarStackOrGroup === 'stack'}
              onChange={() => setSnapTooltipToDatumX(!snapTooltipToDatumX)}
              checked={showTooltip && snapTooltipToDatumX}
            />{' '}
            snap tooltip to datum x
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip || renderBarStackOrGroup === 'stack'}
              onChange={() => setSnapTooltipToDatumY(!snapTooltipToDatumY)}
              checked={showTooltip && snapTooltipToDatumY}
            />{' '}
            snap tooltip to datum y
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip}
              onChange={() => setShowVerticalCrosshair(!showVerticalCrosshair)}
              checked={showTooltip && showVerticalCrosshair}
            />{' '}
            vertical crosshair
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip}
              onChange={() => setShowHorizontalCrosshair(!showHorizontalCrosshair)}
              checked={showTooltip && showHorizontalCrosshair}
            />{' '}
            horizontal crosshair
          </label>
          <label>
            <input
              type="checkbox"
              disabled={!showTooltip}
              onChange={() => setSharedTooltip(!sharedTooltip)}
              checked={showTooltip && sharedTooltip}
            />{' '}
            shared tooltip
          </label>
        </div>
        {/** series */}
        <div>
          <strong>series</strong>
          <label>
            <input
              type="checkbox"
              disabled={renderBarStackOrGroup !== 'bar'}
              onChange={() => setRenderLineSeries(!renderLineSeries)}
              checked={renderLineSeries}
            />{' '}
            line
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              onChange={() => setRenderBarStackOrGroup('bar')}
              checked={renderBarStackOrGroup === 'bar'}
            />{' '}
            bar
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderBarStackOrGroup('stack')}
              checked={renderBarStackOrGroup === 'stack'}
            />{' '}
            bar stack
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setRenderBarStackOrGroup('group')}
              checked={renderBarStackOrGroup === 'group'}
            />{' '}
            bar group
          </label>
        </div>
        {/** data */}
        <div>
          <strong>data</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setNegativeValues(!negativeValues)}
              checked={negativeValues}
            />{' '}
            negative values (SF)
          </label>
        </div>
      </div>
      <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        label {
          font-size: 11px;
        }
        input[type='radio'] {
          height: 10px;
        }
      `}</style>
    </>
  );
}
