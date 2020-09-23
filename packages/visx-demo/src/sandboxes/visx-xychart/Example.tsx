import React from 'react';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import {
  AnimatedAxis,
  AnimatedGrid,
  DataProvider,
  BarSeries,
  LineSeries,
  XYChart,
} from '@visx/xychart';
import ExampleControls from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';

type Props = {
  width: number;
  height: number;
};

const xScaleConfig = { type: 'time' } as const;
const yScaleConfig = { type: 'linear' } as const;
const numTicks = 4;
const data = cityTemperature.slice(150, 225);
const getDate = (d: CityTemperature) => new Date(d.date);
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);

export default function Example({ height }: Props) {
  return (
    <ExampleControls>
      {({
        animationTrajectory,
        renderBarSeries,
        renderHorizontally,
        renderLineSeries,
        showGridColumns,
        showGridRows,
        theme,
        xAxisOrientation,
        yAxisOrientation,
      }) => (
        <DataProvider
          theme={theme}
          xScale={renderHorizontally ? yScaleConfig : xScaleConfig}
          yScale={renderHorizontally ? xScaleConfig : yScaleConfig}
        >
          <XYChart height={Math.min(400, height)}>
            <CustomChartBackground />
            <AnimatedGrid
              key={`grid-${animationTrajectory}`}
              rows={showGridRows}
              columns={showGridColumns}
              animationTrajectory={animationTrajectory}
              numTicks={numTicks}
            />
            {renderBarSeries && (
              <BarSeries
                dataKey="ny"
                data={data}
                xAccessor={renderHorizontally ? getNyTemperature : getDate}
                yAccessor={renderHorizontally ? getDate : getNyTemperature}
                barPadding={0.2}
                horizontal={renderHorizontally}
              />
            )}
            {renderLineSeries && (
              <LineSeries
                dataKey="sf"
                data={data}
                xAccessor={renderHorizontally ? getSfTemperature : getDate}
                yAccessor={renderHorizontally ? getDate : getSfTemperature}
              />
            )}
            <AnimatedAxis
              key={`time-axis-${animationTrajectory}-${renderHorizontally}`} // force animate on update
              orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation}
              numTicks={numTicks}
              animationTrajectory={animationTrajectory}
            />
            <AnimatedAxis
              key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
              label="Temperature (°F)"
              orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
              numTicks={numTicks}
              animationTrajectory={animationTrajectory}
            />
          </XYChart>
        </DataProvider>
      )}
    </ExampleControls>
  );
}
