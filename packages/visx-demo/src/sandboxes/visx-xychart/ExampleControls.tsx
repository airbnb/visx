/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import customTheme from './customTheme';

type ProvidedProps = {
  animationTrajectory: AnimationTrajectory;
  renderHorizontally: boolean;
  renderBarSeries: boolean;
  renderLineSeries: boolean;
  showGridColumns: boolean;
  showGridRows: boolean;
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
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([true, true]);
  const [showGridRows, showGridColumns] = gridProps;
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [renderBarSeries, setRenderBarSeries] = useState(true);
  const [renderLineSeries, setRenderLineSeries] = useState(true);

  return (
    <>
      {children({
        animationTrajectory,
        renderBarSeries,
        renderHorizontally,
        renderLineSeries,
        showGridColumns,
        showGridRows,
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
        {/** series */}
        <div>
          <strong>series</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setRenderLineSeries(!renderLineSeries)}
              checked={renderLineSeries}
            />{' '}
            line
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setRenderBarSeries(!renderBarSeries)}
              checked={renderBarSeries}
            />{' '}
            bar
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
