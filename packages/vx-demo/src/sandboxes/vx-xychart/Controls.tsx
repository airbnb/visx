/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@vx/xychart';
import customTheme from './customTheme';

type ControlsProps = {
  theme: XYChartTheme;
  setTheme: (theme: XYChartTheme) => void;
  xAxisOrientation: 'top' | 'bottom';
  setXAxisOrientation: (orient: 'top' | 'bottom') => void;
  yAxisOrientation: 'left' | 'right';
  setYAxisOrientation: (orient: 'left' | 'right') => void;
};

export default function Controls({
  theme,
  setTheme,
  xAxisOrientation,
  setXAxisOrientation,
  yAxisOrientation,
  setYAxisOrientation,
}: ControlsProps) {
  return (
    <>
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
      </div>
      <style jsx>{`
        .controls {
          font-size: 13px;
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
