import React from 'react';
import { lightTheme, darkTheme, XYChartTheme } from '@vx/xychart';

type ControlsProps = {
  theme: XYChartTheme | null;
  setTheme: (theme: XYChartTheme | null) => void;
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
            <input type="radio" onChange={() => setTheme(null)} checked={theme == null} /> none
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
