import React from 'react';
import ExampleControls from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';
export default function Example(_a) {
    var height = _a.height;
    return (<ExampleControls>
      {function (_a) {
        var accessors = _a.accessors, animationTrajectory = _a.animationTrajectory, annotationDataKey = _a.annotationDataKey, annotationDatum = _a.annotationDatum, annotationLabelPosition = _a.annotationLabelPosition, annotationType = _a.annotationType, colorAccessorFactory = _a.colorAccessorFactory, config = _a.config, curve = _a.curve, data = _a.data, editAnnotationLabelPosition = _a.editAnnotationLabelPosition, numTicks = _a.numTicks, renderAreaSeries = _a.renderAreaSeries, renderAreaStack = _a.renderAreaStack, renderBarGroup = _a.renderBarGroup, renderBarSeries = _a.renderBarSeries, renderBarStack = _a.renderBarStack, renderGlyph = _a.renderGlyph, renderGlyphSeries = _a.renderGlyphSeries, enableTooltipGlyph = _a.enableTooltipGlyph, renderTooltipGlyph = _a.renderTooltipGlyph, renderHorizontally = _a.renderHorizontally, renderLineSeries = _a.renderLineSeries, setAnnotationDataIndex = _a.setAnnotationDataIndex, setAnnotationDataKey = _a.setAnnotationDataKey, setAnnotationLabelPosition = _a.setAnnotationLabelPosition, sharedTooltip = _a.sharedTooltip, showGridColumns = _a.showGridColumns, showGridRows = _a.showGridRows, showHorizontalCrosshair = _a.showHorizontalCrosshair, showTooltip = _a.showTooltip, showVerticalCrosshair = _a.showVerticalCrosshair, snapTooltipToDatumX = _a.snapTooltipToDatumX, snapTooltipToDatumY = _a.snapTooltipToDatumY, stackOffset = _a.stackOffset, theme = _a.theme, xAxisOrientation = _a.xAxisOrientation, yAxisOrientation = _a.yAxisOrientation, 
        // components are animated or not depending on selection
        Annotation = _a.Annotation, AreaSeries = _a.AreaSeries, AreaStack = _a.AreaStack, Axis = _a.Axis, BarGroup = _a.BarGroup, BarSeries = _a.BarSeries, BarStack = _a.BarStack, GlyphSeries = _a.GlyphSeries, Grid = _a.Grid, LineSeries = _a.LineSeries, AnnotationCircleSubject = _a.AnnotationCircleSubject, AnnotationConnector = _a.AnnotationConnector, AnnotationLabel = _a.AnnotationLabel, AnnotationLineSubject = _a.AnnotationLineSubject, Tooltip = _a.Tooltip, XYChart = _a.XYChart;
        return (<XYChart theme={theme} xScale={config.x} yScale={config.y} height={Math.min(400, height)} captureEvents={!editAnnotationLabelPosition} onPointerUp={function (d) {
            setAnnotationDataKey(d.key);
            setAnnotationDataIndex(d.index);
        }}>
          <CustomChartBackground />
          <Grid key={"grid-" + animationTrajectory} // force animate on update
         rows={showGridRows} columns={showGridColumns} animationTrajectory={animationTrajectory} numTicks={numTicks}/>
          {renderBarStack && (<BarStack offset={stackOffset}>
              <BarSeries dataKey="New York" data={data} xAccessor={accessors.x['New York']} yAccessor={accessors.y['New York']}/>
              <BarSeries dataKey="San Francisco" data={data} xAccessor={accessors.x['San Francisco']} yAccessor={accessors.y['San Francisco']}/>
              <BarSeries dataKey="Austin" data={data} xAccessor={accessors.x.Austin} yAccessor={accessors.y.Austin}/>
            </BarStack>)}
          {renderBarGroup && (<BarGroup>
              <BarSeries dataKey="New York" data={data} xAccessor={accessors.x['New York']} yAccessor={accessors.y['New York']} colorAccessor={colorAccessorFactory('New York')}/>
              <BarSeries dataKey="San Francisco" data={data} xAccessor={accessors.x['San Francisco']} yAccessor={accessors.y['San Francisco']} colorAccessor={colorAccessorFactory('San Francisco')}/>
              <BarSeries dataKey="Austin" data={data} xAccessor={accessors.x.Austin} yAccessor={accessors.y.Austin} colorAccessor={colorAccessorFactory('Austin')}/>
            </BarGroup>)}
          {renderBarSeries && (<BarSeries dataKey="New York" data={data} xAccessor={accessors.x['New York']} yAccessor={accessors.y['New York']} colorAccessor={colorAccessorFactory('New York')}/>)}
          {renderAreaSeries && (<>
              <AreaSeries dataKey="Austin" data={data} xAccessor={accessors.x.Austin} yAccessor={accessors.y.Austin} fillOpacity={0.4} curve={curve}/>
              <AreaSeries dataKey="New York" data={data} xAccessor={accessors.x['New York']} yAccessor={accessors.y['New York']} fillOpacity={0.4} curve={curve}/>
              <AreaSeries dataKey="San Francisco" data={data} xAccessor={accessors.x['San Francisco']} yAccessor={accessors.y['San Francisco']} fillOpacity={0.4} curve={curve}/>
            </>)}
          {renderAreaStack && (<AreaStack curve={curve} offset={stackOffset} renderLine={stackOffset !== 'wiggle'}>
              <AreaSeries dataKey="Austin" data={data} xAccessor={accessors.x.Austin} yAccessor={accessors.y.Austin} fillOpacity={0.4}/>
              <AreaSeries dataKey="New York" data={data} xAccessor={accessors.x['New York']} yAccessor={accessors.y['New York']} fillOpacity={0.4}/>
              <AreaSeries dataKey="San Francisco" data={data} xAccessor={accessors.x['San Francisco']} yAccessor={accessors.y['San Francisco']} fillOpacity={0.4}/>
            </AreaStack>)}
          {renderLineSeries && (<>
              <LineSeries dataKey="Austin" data={data} xAccessor={accessors.x.Austin} yAccessor={accessors.y.Austin} curve={curve}/>
              {!renderBarSeries && (<LineSeries dataKey="New York" data={data} xAccessor={accessors.x['New York']} yAccessor={accessors.y['New York']} curve={curve}/>)}
              <LineSeries dataKey="San Francisco" data={data} xAccessor={accessors.x['San Francisco']} yAccessor={accessors.y['San Francisco']} curve={curve}/>
            </>)}
          {renderGlyphSeries && (<GlyphSeries dataKey="San Francisco" data={data} xAccessor={accessors.x['San Francisco']} yAccessor={accessors.y['San Francisco']} renderGlyph={renderGlyph} colorAccessor={colorAccessorFactory('San Francisco')}/>)}
          <Axis key={"time-axis-" + animationTrajectory + "-" + renderHorizontally} orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation} numTicks={numTicks} animationTrajectory={animationTrajectory}/>
          <Axis key={"temp-axis-" + animationTrajectory + "-" + renderHorizontally} label={stackOffset == null
            ? 'Temperature (°F)'
            : stackOffset === 'expand'
                ? 'Fraction of total temperature'
                : ''} orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation} numTicks={numTicks} animationTrajectory={animationTrajectory} 
        // values don't make sense in stream graph
        tickFormat={stackOffset === 'wiggle' ? function () { return ''; } : undefined}/>
          {annotationDataKey && annotationDatum && (<Annotation dataKey={annotationDataKey} datum={annotationDatum} dx={annotationLabelPosition.dx} dy={annotationLabelPosition.dy} editable={editAnnotationLabelPosition} canEditSubject={false} onDragEnd={function (_a) {
            var dx = _a.dx, dy = _a.dy;
            return setAnnotationLabelPosition({ dx: dx, dy: dy });
        }}>
              <AnnotationConnector />
              {annotationType === 'circle' ? (<AnnotationCircleSubject />) : (<AnnotationLineSubject />)}
              <AnnotationLabel title={annotationDataKey} subtitle={annotationDatum.date + ", " + annotationDatum[annotationDataKey] + "\u00B0F"} width={135} backgroundProps={{
            stroke: theme.gridStyles.stroke,
            strokeOpacity: 0.5,
            fillOpacity: 0.8,
        }}/>
            </Annotation>)}
          {showTooltip && (<Tooltip showHorizontalCrosshair={showHorizontalCrosshair} showVerticalCrosshair={showVerticalCrosshair} snapTooltipToDatumX={snapTooltipToDatumX} snapTooltipToDatumY={snapTooltipToDatumY} showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup} showSeriesGlyphs={sharedTooltip && !renderBarGroup} renderGlyph={enableTooltipGlyph ? renderTooltipGlyph : undefined} renderTooltip={function (_a) {
            var _b, _c, _d, _e;
            var tooltipData = _a.tooltipData, colorScale = _a.colorScale;
            return (<>
                  
                  {(((_b = tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.nearestDatum) === null || _b === void 0 ? void 0 : _b.datum) &&
                accessors.date((_c = tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.nearestDatum) === null || _c === void 0 ? void 0 : _c.datum)) ||
                'No date'}
                  <br />
                  <br />
                  
                  {(sharedTooltip
                ? Object.keys((_d = tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.datumByKey) !== null && _d !== void 0 ? _d : {})
                : [(_e = tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.nearestDatum) === null || _e === void 0 ? void 0 : _e.key]).filter(function (city) { return city; }).map(function (city) {
                var _a, _b, _c;
                var temperature = ((_a = tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.nearestDatum) === null || _a === void 0 ? void 0 : _a.datum) &&
                    accessors[renderHorizontally ? 'x' : 'y'][city]((_b = tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.nearestDatum) === null || _b === void 0 ? void 0 : _b.datum);
                return (<div key={city}>
                        <em style={{
                    color: colorScale === null || colorScale === void 0 ? void 0 : colorScale(city),
                    textDecoration: ((_c = tooltipData === null || tooltipData === void 0 ? void 0 : tooltipData.nearestDatum) === null || _c === void 0 ? void 0 : _c.key) === city ? 'underline' : undefined,
                }}>
                          {city}
                        </em>{' '}
                        {temperature == null || Number.isNaN(temperature)
                    ? '–'
                    : temperature + "\u00B0 F"}
                      </div>);
            })}
                </>);
        }}/>)}
        </XYChart>);
    }}
    </ExampleControls>);
}
