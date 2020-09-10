import React, { useState } from 'react';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import {
  XYChart,
  LineSeries,
  DataProvider,
  darkTheme,
  XYChartTheme,
  AnimatedAxis,
} from '@vx/xychart';

import Controls from './Controls';
import CustomChartBackground from './CustomChartBackground';

type Props = {
  width: number;
  height: number;
};

const xScaleConfig = { type: 'time' } as const;
const yScaleConfig = { type: 'linear' } as const;
const data = cityTemperature.slice(50, 80);
const getDate = (d: CityTemperature) => new Date(d.date);
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);

export default function Example(_: Props) {
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');

  return (
    <>
      <DataProvider theme={theme} xScale={xScaleConfig} yScale={yScaleConfig}>
        <XYChart height={400}>
          <CustomChartBackground />
          <LineSeries dataKey="line" data={data} xAccessor={getDate} yAccessor={getSfTemperature} />
          <AnimatedAxis orientation={xAxisOrientation} numTicks={4} />
          <AnimatedAxis label="Temperature (°F)" orientation={yAxisOrientation} numTicks={5} />
        </XYChart>
      </DataProvider>
      <Controls
        theme={theme}
        setTheme={setTheme}
        xAxisOrientation={xAxisOrientation}
        setXAxisOrientation={setXAxisOrientation}
        yAxisOrientation={yAxisOrientation}
        setYAxisOrientation={setYAxisOrientation}
      />
    </>
  );
}
