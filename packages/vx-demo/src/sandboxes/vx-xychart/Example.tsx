import React from 'react';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import { AnimatedAxis, AnimatedGrid, DataProvider, LineSeries, XYChart } from '@vx/xychart';
import ExampleControls from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';

type Props = {
  width: number;
  height: number;
};

const xScaleConfig = { type: 'time' } as const;
const yScaleConfig = { type: 'linear' } as const;
const numTicks = 4;
const data = cityTemperature.slice(0, 100);
const getDate = (d: CityTemperature) => new Date(d.date);
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);

export default function Example({ height }: Props) {
  return (
    <ExampleControls>
      {({
        theme,
        xAxisOrientation,
        yAxisOrientation,
        showGridRows,
        showGridColumns,
        animationTrajectory,
      }) => (
        <DataProvider theme={theme} xScale={xScaleConfig} yScale={yScaleConfig}>
          <XYChart height={Math.min(400, height)}>
            <CustomChartBackground />
            <AnimatedAxis
              key={`xaxis-${animationTrajectory}`} // force animate on update
              orientation={xAxisOrientation}
              numTicks={numTicks}
              animationTrajectory={animationTrajectory}
            />
            <AnimatedAxis
              key={`yaxis-${animationTrajectory}`}
              label="Temperature (°F)"
              orientation={yAxisOrientation}
              numTicks={numTicks}
              animationTrajectory={animationTrajectory}
            />
            <AnimatedGrid
              key={`grid-${animationTrajectory}`}
              rows={showGridRows}
              columns={showGridColumns}
              animationTrajectory={animationTrajectory}
              numTicks={numTicks}
            />
            <LineSeries
              dataKey="line"
              data={data}
              xAccessor={getDate}
              yAccessor={getSfTemperature}
            />
          </XYChart>
        </DataProvider>
      )}
    </ExampleControls>
  );
}
