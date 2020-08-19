import React from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@vx/xychart';
import customTheme from './customTheme';

type ControlsProps = {
  theme: XYChartTheme;
  setTheme: (theme: XYChartTheme) => void;
};

export default function Controls({ theme, setTheme }: ControlsProps) {
  return (
    <>
      <div className="controls">
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
