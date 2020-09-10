import React, { useState } from 'react';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import {
  AnimatedAxis,
  AnimatedGrid,
  DataProvider,
  LineSeries,
  XYChart,
  XYChartTheme,
  darkTheme,
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
const animationTrajectory = 'center';

export default function Example({ height }: Props) {
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([true, true]);
  const [showGridRows, showGridColumns] = gridProps;
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('right');

  return (
    <>
      <DataProvider theme={theme} xScale={xScaleConfig} yScale={yScaleConfig}>
        <XYChart height={Math.min(400, height)}>
          <CustomChartBackground />
          <AnimatedAxis
            orientation={xAxisOrientation}
            numTicks={4}
            animationTrajectory={animationTrajectory}
          />
          <AnimatedAxis
            label="Temperature (°F)"
            orientation={yAxisOrientation}
            numTicks={5}
            animationTrajectory={animationTrajectory}
          />
          <AnimatedGrid
            rows={showGridRows}
            columns={showGridColumns}
            animationTrajectory={animationTrajectory}
          />
          <LineSeries dataKey="line" data={data} xAccessor={getDate} yAccessor={getSfTemperature} />
        </XYChart>
      </DataProvider>
      <Controls
        theme={theme}
        setTheme={setTheme}
        xAxisOrientation={xAxisOrientation}
        setXAxisOrientation={setXAxisOrientation}
        yAxisOrientation={yAxisOrientation}
        setYAxisOrientation={setYAxisOrientation}
        gridProps={gridProps}
        setGridProps={setGridProps}
      />
    </>
  );
}
