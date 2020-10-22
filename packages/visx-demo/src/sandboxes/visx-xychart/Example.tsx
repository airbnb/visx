import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import {
  AnimatedAxis,
  AnimatedGrid,
  DataProvider,
  AnimatedBarGroup,
  AnimatedBarSeries,
  AnimatedBarStack,
  LineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import ExampleControls from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';

type Props = {
  width: number;
  height: number;
};

type City = 'San Francisco' | 'New York' | 'Austin';

export default function Example({ height }: Props) {
  return (
    <ExampleControls>
      {({
        accessors,
        animationTrajectory,
        config,
        data,
        numTicks,
        renderBarGroup,
        renderBarSeries,
        renderBarStack,
        renderHorizontally,
        renderLineSeries,
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX,
        snapTooltipToDatumY,
        theme,
        xAxisOrientation,
        yAxisOrientation,
      }) => (
        <DataProvider theme={theme} xScale={config.x} yScale={config.y}>
          <XYChart height={Math.min(400, height)}>
            <CustomChartBackground />
            <AnimatedGrid
              key={`grid-${animationTrajectory}`} // force animate on update
              rows={showGridRows}
              columns={showGridColumns}
              animationTrajectory={animationTrajectory}
              numTicks={numTicks}
            />
            {renderBarStack && (
              <AnimatedBarStack horizontal={renderHorizontally}>
                <AnimatedBarSeries
                  dataKey="New York"
                  data={data}
                  xAccessor={accessors.x['New York']}
                  yAccessor={accessors.y['New York']}
                />
                <AnimatedBarSeries
                  dataKey="San Francisco"
                  data={data}
                  xAccessor={accessors.x['San Francisco']}
                  yAccessor={accessors.y['San Francisco']}
                />
                <AnimatedBarSeries
                  dataKey="Austin"
                  data={data}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                />
              </AnimatedBarStack>
            )}
            {renderBarGroup && (
              <AnimatedBarGroup horizontal={renderHorizontally}>
                <AnimatedBarSeries
                  dataKey="New York"
                  data={data}
                  xAccessor={accessors.x['New York']}
                  yAccessor={accessors.y['New York']}
                />
                <AnimatedBarSeries
                  dataKey="San Francisco"
                  data={data}
                  xAccessor={accessors.x['San Francisco']}
                  yAccessor={accessors.y['San Francisco']}
                />
                <AnimatedBarSeries
                  dataKey="Austin"
                  data={data}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                />
              </AnimatedBarGroup>
            )}
            {renderBarSeries && (
              <AnimatedBarSeries
                dataKey="New York"
                data={data}
                xAccessor={accessors.x['New York']}
                yAccessor={accessors.y['New York']}
                horizontal={renderHorizontally}
              />
            )}
            {renderLineSeries && (
              <>
                <LineSeries
                  dataKey="San Francisco"
                  data={renderBarStack ? data : data}
                  xAccessor={accessors.x['San Francisco']}
                  yAccessor={accessors.y['San Francisco']}
                  horizontal={!renderHorizontally}
                />
                <LineSeries
                  dataKey="Austin"
                  data={renderBarStack ? data : data}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                  horizontal={!renderHorizontally}
                />
              </>
            )}
            <AnimatedAxis
              key={`time-axis-${animationTrajectory}-${renderHorizontally}`}
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
            {showTooltip && (
              <Tooltip<CityTemperature>
                showHorizontalCrosshair={showHorizontalCrosshair}
                showVerticalCrosshair={showVerticalCrosshair}
                snapTooltipToDatumX={snapTooltipToDatumX}
                snapTooltipToDatumY={snapTooltipToDatumY}
                showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup}
                showSeriesGlyphs={sharedTooltip && !renderBarGroup}
                renderTooltip={({ tooltipData, colorScale }) => (
                  <>
                    {/** date */}
                    {(tooltipData?.nearestDatum?.datum &&
                      accessors.date(tooltipData?.nearestDatum?.datum)) ||
                      'No date'}
                    <br />
                    <br />
                    {/** temperatures */}
                    {((sharedTooltip
                      ? Object.keys(tooltipData?.datumByKey ?? {})
                      : [tooltipData?.nearestDatum?.key]
                    ).filter(city => city) as City[]).map(city => (
                      <div key={city}>
                        <em
                          style={{
                            color: colorScale?.(city),
                            textDecoration:
                              tooltipData?.nearestDatum?.key === city ? 'underline' : undefined,
                          }}
                        >
                          {city}
                        </em>{' '}
                        {tooltipData?.nearestDatum?.datum
                          ? accessors[renderHorizontally ? 'x' : 'y'][city](
                              tooltipData?.nearestDatum?.datum,
                            )
                          : '–'}
                        ° F
                      </div>
                    ))}
                  </>
                )}
              />
            )}
          </XYChart>
        </DataProvider>
      )}
    </ExampleControls>
  );
}
