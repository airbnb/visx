import { Fragment, useContext, useCallback, useMemo, useEffect } from 'react';
import type { FC, SVGProps } from 'react';
import type { AxisScale } from '@visx/axis';
import type { AreaProps, LinePathProps } from '@visx/shape';
import { Area, LinePath } from '@visx/shape';
import DataContext from '../../../context/DataContext';
import type { DataContextType, GlyphsProps, SeriesProps } from '../../../types';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import isValidNumber from '../../../typeguards/isValidNumber';
import { AREASERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import { BaseGlyphSeries } from './BaseGlyphSeries';
import defaultRenderGlyph from './defaultRenderGlyph';
import useSeriesEvents from '../../../hooks/useSeriesEvents';

export type BaseAreaSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = SeriesProps<XScale, YScale, Datum> & {
  /** Optional accessor to override the baseline value of Area shapes per datum (useful to generate band shapes) when chart is rendered horizontally (vertical line). Defaults to the scale zero value, not compatible with AreaStack. */
  x0Accessor?: SeriesProps<XScale, YScale, Datum>['xAccessor'];
  /** Optional accessor to override the baseline value of Area shapes per datum (useful to generate band shapes). Defaults to the scale zero value, not compatible with AreaStack. */
  y0Accessor?: SeriesProps<XScale, YScale, Datum>['yAccessor'];
  /** Whether to render a Line along value of the Area shape (area is fill only). */
  renderLine?: boolean;
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: AreaProps<Datum>['curve'];
  /** Props to be passed to the Line, if rendered. */
  lineProps?: Omit<
    LinePathProps<Datum> & SVGProps<SVGPathElement>,
    'data' | 'x' | 'y' | 'children' | 'defined'
  >;
  /** Rendered component which is passed path props by BaseAreaSeries after processing. */
  PathComponent?: FC<Omit<SVGProps<SVGPathElement>, 'ref'>> | 'path';
} & Omit<SVGProps<SVGPathElement>, 'x' | 'y' | 'x0' | 'x1' | 'y0' | 'y1' | 'ref'>;

function BaseAreaSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  PathComponent = 'path',
  curve,
  data,
  dataKey,
  lineProps,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
  onPointerDown,
  enableEvents = true,
  renderLine = true,
  xAccessor,
  x0Accessor,
  xScale,
  yAccessor,
  y0Accessor,
  yScale,
  ...areaProps
}: BaseAreaSeriesProps<XScale, YScale, Datum> &
  Pick<DataContextType<XScale, YScale, Datum>, 'xScale' | 'yScale'>) {
  const { colorScale, theme, horizontal } = useContext(DataContext);
  const getScaledX0 = useMemo(
    () => (x0Accessor ? getScaledValueFactory(xScale, x0Accessor) : undefined),
    [xScale, x0Accessor],
  );
  const getScaledX = useMemo(() => getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY0 = useMemo(
    () => (y0Accessor ? getScaledValueFactory(yScale, y0Accessor) : undefined),
    [yScale, y0Accessor],
  );
  const getScaledY = useMemo(() => getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const isDefined = useCallback(
    (d: Datum) => isValidNumber(xScale(xAccessor(d))) && isValidNumber(yScale(yAccessor(d))),
    [xScale, xAccessor, yScale, yAccessor],
  );
  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const ownEventSourceKey = `${AREASERIES_EVENT_SOURCE}-${dataKey}`;
  const eventEmitters = useSeriesEvents<XScale, YScale, Datum>({
    dataKey,
    enableEvents,
    onBlur,
    onFocus,
    onPointerMove,
    onPointerOut,
    onPointerUp,
    onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  // accessor functions for the area generator
  const accessors = useMemo(() => {
    const numericScaleBaseline = getScaleBaseline(horizontal ? xScale : yScale);
    return horizontal
      ? {
          x0: getScaledX0 ?? numericScaleBaseline,
          x1: getScaledX,
          y: getScaledY,
        }
      : {
          x: getScaledX,
          y0: getScaledY0 ?? numericScaleBaseline,
          y1: getScaledY,
        };
  }, [xScale, yScale, horizontal, getScaledX, getScaledY, getScaledX0, getScaledY0]);

  // render invisible glyphs for focusing if onFocus/onBlur are defined
  const captureFocusEvents = Boolean(onFocus || onBlur);
  const renderGlyphs = useCallback(
    ({ glyphs }: GlyphsProps<XScale, YScale, Datum>) =>
      captureFocusEvents
        ? glyphs.map((glyph) => (
            <Fragment key={glyph.key}>
              {defaultRenderGlyph({
                ...glyph,
                color: 'transparent',
                onFocus: eventEmitters.onFocus,
                onBlur: eventEmitters.onBlur,
              })}
            </Fragment>
          ))
        : null,
    [captureFocusEvents, eventEmitters.onFocus, eventEmitters.onBlur],
  );

  return (
    <>
      <Area {...accessors} {...areaProps} curve={curve} defined={isDefined}>
        {({ path }) => (
          <PathComponent
            className="visx-area"
            stroke="transparent"
            fill={color}
            strokeLinecap="round" // without this a datum surrounded by nulls will not be visible
            {...areaProps}
            d={path(data) || ''}
            {...eventEmitters}
          />
        )}
      </Area>
      {renderLine && (
        <LinePath<Datum>
          x={getScaledX}
          y={getScaledY}
          defined={isDefined}
          curve={curve}
          {...lineProps}
        >
          {({ path }) => (
            <PathComponent
              className="visx-line"
              fill="transparent"
              stroke={color}
              strokeWidth={2}
              pointerEvents="none"
              strokeLinecap="round" // without this a datum surrounded by nulls will not be visible
              {...lineProps}
              d={path(data) || ''}
            />
          )}
        </LinePath>
      )}
      {captureFocusEvents && (
        <BaseGlyphSeries
          dataKey={dataKey}
          data={data}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          xScale={xScale}
          yScale={yScale}
          renderGlyphs={renderGlyphs}
        />
      )}
    </>
  );
}

export default function BaseAreaSeriesWithRegisteredData<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: BaseAreaSeriesProps<XScale, YScale, Datum>) {
  const { dataKey, data, xAccessor, yAccessor } = props;
  const { xScale, yScale, dataRegistry } = useContext(DataContext) as unknown as DataContextType<
    XScale,
    YScale,
    Datum
  >;

  useEffect(() => {
    if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
    return () => dataRegistry?.unregisterData(dataKey);
  }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);

  const registryEntry = dataRegistry?.get(dataKey);

  // if scales or data are not available in context, render nothing
  if (!xScale || !yScale || !registryEntry) return null;

  // otherwise pass props + over-write data/accessors
  return (
    <BaseAreaSeries
      {...props}
      xScale={xScale}
      yScale={yScale}
      data={registryEntry.data}
      xAccessor={registryEntry.xAccessor}
      yAccessor={registryEntry.yAccessor}
    />
  );
}
