import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import {
  Annotation,
  AnnotationCircleSubject,
  AnnotationConnector,
  AnnotationLabel,
  AnnotationLineSubject,
  AreaSeries,
  Axis,
  BarGroup,
  BarSeries,
  BarStack,
  GlyphSeries,
  Grid,
  LineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart/animated';
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
        config,
        curve,
        data,
        editAnnotationLabelPosition,
        numTicks,
        renderAreaSeries,
        renderBarGroup,
        renderBarSeries,
        renderBarStack,
        renderGlyph,
        renderGlyphSeries,
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
        theme,
        xAxisOrientation,
        yAxisOrientation,
      }) => (
        <XYChart
          theme={theme}
          xScale={config.x}
          yScale={config.y}
          height={Math.min(400, height)}
          captureEvents={!editAnnotationLabelPosition}
          onPointerUp={d => {
            setAnnotationDataKey(d.key as 'New York' | 'San Francisco' | 'Austin');
            setAnnotationDataIndex(d.index);
          }}
        >
          <CustomChartBackground />
          <Grid
            key={`grid-${animationTrajectory}`} // force animate on update
            rows={showGridRows}
            columns={showGridColumns}
            animationTrajectory={animationTrajectory}
            numTicks={numTicks}
          />
          {renderBarStack && (
            <BarStack>
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
          )}
          {renderBarGroup && (
            <BarGroup>
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
            </BarGroup>
          )}
          {renderBarSeries && (
            <BarSeries
              dataKey="New York"
              data={data}
              xAccessor={accessors.x['New York']}
              yAccessor={accessors.y['New York']}
            />
          )}
          {renderAreaSeries && (
            <>
              <AreaSeries
                dataKey="Austin"
                data={data}
                xAccessor={accessors.x.Austin}
                yAccessor={accessors.y.Austin}
                fillOpacity={0.4}
                curve={curve}
              />
              {!renderBarSeries && (
                <AreaSeries
                  dataKey="New York"
                  data={data}
                  xAccessor={accessors.x['New York']}
                  yAccessor={accessors.y['New York']}
                  fillOpacity={0.4}
                  curve={curve}
                />
              )}
              <AreaSeries
                dataKey="San Francisco"
                data={data}
                xAccessor={accessors.x['San Francisco']}
                yAccessor={accessors.y['San Francisco']}
                fillOpacity={0.4}
                curve={curve}
              />
            </>
          )}
          {renderLineSeries && (
            <>
              <LineSeries
                dataKey="Austin"
                data={data}
                xAccessor={accessors.x.Austin}
                yAccessor={accessors.y.Austin}
                curve={curve}
              />
              {!renderBarSeries && (
                <LineSeries
                  dataKey="New York"
                  data={data}
                  xAccessor={accessors.x['New York']}
                  yAccessor={accessors.y['New York']}
                  curve={curve}
                />
              )}
              <LineSeries
                dataKey="San Francisco"
                data={data}
                xAccessor={accessors.x['San Francisco']}
                yAccessor={accessors.y['San Francisco']}
                curve={curve}
              />
            </>
          )}
          {renderGlyphSeries && (
            <GlyphSeries
              dataKey="San Francisco"
              data={data}
              xAccessor={accessors.x['San Francisco']}
              yAccessor={accessors.y['San Francisco']}
              renderGlyph={renderGlyph}
            />
          )}
          <Axis
            key={`time-axis-${animationTrajectory}-${renderHorizontally}`}
            orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation}
            numTicks={numTicks}
            animationTrajectory={animationTrajectory}
          />
          <Axis
            key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
            label="Temperature (°F)"
            orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
            numTicks={numTicks}
            animationTrajectory={animationTrajectory}
          />
          {annotationDataKey && annotationDatum && (
            <Annotation
              dataKey={annotationDataKey}
              datum={annotationDatum}
              dx={annotationLabelPosition.dx}
              dy={annotationLabelPosition.dy}
              editable={editAnnotationLabelPosition}
              canEditSubject={false}
              onDragEnd={({ dx, dy }) => setAnnotationLabelPosition({ dx, dy })}
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
                width={135}
                backgroundProps={{
                  stroke: theme.gridStyles.stroke,
                  strokeOpacity: 0.5,
                  fillOpacity: 0.8,
                }}
              />
            </Annotation>
          )}
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
