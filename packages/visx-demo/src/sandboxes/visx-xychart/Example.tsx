import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import {
  AnimatedAnnotation,
  AnimatedAreaSeries,
  AnimatedAxis,
  AnimatedBarGroup,
  AnimatedBarSeries,
  AnimatedBarStack,
  AnimatedGlyphSeries,
  AnimatedGrid,
  AnimatedLineSeries,
  AnnotationCircleSubject,
  AnnotationConnector,
  AnnotationLabel,
  AnnotationLineSubject,
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
        annotationDataKey,
        annotationDatum,
        annotationType,
        config,
        curve,
        data,
        numTicks,
        renderAreaSeries,
        renderBarGroup,
        renderBarSeries,
        renderBarStack,
        renderGlyph,
        renderGlyphSeries,
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
        <XYChart theme={theme} xScale={config.x} yScale={config.y} height={Math.min(400, height)}>
          <CustomChartBackground />
          <AnimatedGrid
            key={`grid-${animationTrajectory}`} // force animate on update
            rows={showGridRows}
            columns={showGridColumns}
            animationTrajectory={animationTrajectory}
            numTicks={numTicks}
          />
          {renderBarStack && (
            <AnimatedBarStack>
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
            <AnimatedBarGroup>
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
            />
          )}
          {renderAreaSeries && (
            <>
              <AnimatedAreaSeries
                dataKey="Austin"
                data={data}
                xAccessor={accessors.x.Austin}
                yAccessor={accessors.y.Austin}
                fillOpacity={0.5}
                curve={curve}
              />
              <AnimatedAreaSeries
                dataKey="San Francisco"
                data={data}
                xAccessor={accessors.x['San Francisco']}
                yAccessor={accessors.y['San Francisco']}
                fillOpacity={0.5}
                curve={curve}
              />
            </>
          )}
          {renderLineSeries && (
            <>
              <AnimatedLineSeries
                dataKey="Austin"
                data={data}
                xAccessor={accessors.x.Austin}
                yAccessor={accessors.y.Austin}
                curve={curve}
              />
              <AnimatedLineSeries
                dataKey="San Francisco"
                data={data}
                xAccessor={accessors.x['San Francisco']}
                yAccessor={accessors.y['San Francisco']}
                curve={curve}
              />
            </>
          )}
          {renderGlyphSeries && (
            <AnimatedGlyphSeries
              dataKey="San Francisco"
              data={data}
              xAccessor={accessors.x['San Francisco']}
              yAccessor={accessors.y['San Francisco']}
              renderGlyph={renderGlyph}
            />
          )}
          {annotationDataKey && annotationDatum && (
            <AnimatedAnnotation
              dataKey={annotationDataKey}
              datum={annotationDatum}
              dx={-45}
              dy={-50}
            >
              <AnnotationConnector />
              {annotationType === 'circle' ? (
                <AnnotationCircleSubject />
              ) : (
                <AnnotationLineSubject />
              )}
              <AnnotationLabel
                title={annotationDataKey}
                subtitle={`${annotationDatum.date}, ${annotationDatum[annotationDataKey]}°F`}
                backgroundProps={{ stroke: theme.gridStyles.stroke, strokeOpacity: 0.5 }}
              />
            </AnimatedAnnotation>
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
      )}
    </ExampleControls>
  );
}
