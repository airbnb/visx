import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';

import ExampleControls from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';

export type XYChartProps = {
  width: number;
  height: number;
};

type City = 'San Francisco' | 'New York' | 'Austin';

export default function Example({ height }: XYChartProps) {
  return (
    <ExampleControls>
      {({
        accessors,
        animationTrajectory,
        annotationDataKey,
        annotationDatum,
        annotationLabelPosition,
        annotationType,
        colorAccessorFactory,
        config,
        curve,
        data,
        editAnnotationLabelPosition,
        numTicks,
        renderAreaSeries,
        renderAreaStack,
        renderBarGroup,
        renderBarSeries,
        renderBarStack,
        renderGlyph,
        renderGlyphSeries,
        enableTooltipGlyph,
        renderTooltipGlyph,
        renderHorizontally,
        renderLineSeries,
        setAnnotationDataIndex,
        setAnnotationDataKey,
        setAnnotationLabelPosition,
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX,
        snapTooltipToDatumY,
        stackOffset,
        theme,
        xAxisOrientation,
        yAxisOrientation,

        // components are animated or not depending on selection
        Annotation,
        AreaSeries,
        AreaStack,
        Axis,
        BarGroup,
        BarSeries,
        BarStack,
        GlyphSeries,
        Grid,
        LineSeries,
        AnnotationCircleSubject,
        AnnotationConnector,
        AnnotationLabel,
        AnnotationLineSubject,
        Tooltip,
        XYChart,
      }) => (
        <XYChart
          theme={theme}
          xScale={config.x}
          yScale={config.y}
          height={Math.min(400, height)}

        >
           <BarStack offset={stackOffset}>
              <BarSeries
                dataKey="New York"
                data={data}
                xAccessor={accessors.x['New York']}
                yAccessor={accessors.y['New York']}
              />
              <BarSeries
                dataKey="San Francisco"
                data={data}
                xAccessor={accessors.x['San Francisco']}
                yAccessor={accessors.y['San Francisco']}
              />
              <BarSeries
                dataKey="Austin"
                data={data}
                xAccessor={accessors.x.Austin}
                yAccessor={accessors.y.Austin}
              />
            </BarStack>




          {showTooltip && (
            <Tooltip<CityTemperature>
              showHorizontalCrosshair={showHorizontalCrosshair}
              showVerticalCrosshair={showVerticalCrosshair}
              snapTooltipToDatumX={snapTooltipToDatumX}
              snapTooltipToDatumY={snapTooltipToDatumY}
              showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup}
              showSeriesGlyphs={sharedTooltip && !renderBarGroup}
              renderGlyph={enableTooltipGlyph ? renderTooltipGlyph : undefined}
              renderTooltip={({ tooltipData, colorScale }) => (
                <>
                  {/** date */}
                  {(tooltipData?.nearestDatum?.datum &&
                    accessors.date(tooltipData?.nearestDatum?.datum)) ||
                    'No date'}
                  <br />
                  <br />
                  {/** temperatures */}
                  {(
                    (sharedTooltip
                      ? Object.keys(tooltipData?.datumByKey ?? {})
                      : [tooltipData?.nearestDatum?.key]
                    ).filter((city) => city) as City[]
                  ).map((city) => {
                    const temperature =
                      tooltipData?.nearestDatum?.datum &&
                      accessors[renderHorizontally ? 'x' : 'y'][city](
                        tooltipData?.nearestDatum?.datum,
                      );

                    return (
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
                        {temperature == null || Number.isNaN(temperature)
                          ? '–'
                          : `${temperature}° F`}
                      </div>
                    );
                  })}
                </>
              )}
            />
          )}
        </XYChart>
      )}
    </ExampleControls>
  );
}
