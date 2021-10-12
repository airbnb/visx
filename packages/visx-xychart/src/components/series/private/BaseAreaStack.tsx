import React, { SVGProps, useCallback, useContext, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import { SeriesPoint } from 'd3-shape';
import { LinePath, StackPathConfig } from '@visx/shape';
import Area, { AreaProps } from '@visx/shape/lib/shapes/Area';
import { coerceNumber } from '@visx/scale';
import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';

import {
  CombinedStackData,
  DataContextType,
  GlyphsProps,
  NearestDatumArgs,
  NearestDatumReturnType,
  SeriesProps,
} from '../../../types';
import DataContext from '../../../context/DataContext';
import { BaseAreaSeriesProps } from './BaseAreaSeries';
import { BaseGlyphSeries } from './BaseGlyphSeries';
import useStackedData from '../../../hooks/useStackedData';
import { getStackValue } from '../../../utils/combineBarStackData';
import isValidNumber from '../../../typeguards/isValidNumber';
import findNearestStackDatum from '../../../utils/findNearestStackDatum';
import { AREASTACK_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';
import defaultRenderGlyph from './defaultRenderGlyph';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';

type AreaStackChildProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = Omit<BaseAreaSeriesProps<XScale, YScale, Datum>, 'PathComponent' | 'curve'>;

export type BaseAreaStackProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = {
  /** `AreaSeries` elements, note we can't strictly enforce this with TS yet. */
  children:
    | React.ReactElement<AreaStackChildProps<XScale, YScale, Datum>>
    | React.ReactElement<AreaStackChildProps<XScale, YScale, Datum>>[];
  /** Rendered component which is passed path props by BaseAreaStack after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: AreaProps<Datum>['curve'];
  /** Whether to render a Line along value of the Area shape (area is fill only). */
  renderLine?: boolean;
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'> &
  Pick<
    SeriesProps<XScale, YScale, Datum>,
    'onPointerMove' | 'onPointerOut' | 'onPointerUp' | 'onBlur' | 'onFocus' | 'enableEvents'
  >;

const identity = (_: unknown) => _;

function BaseAreaStack<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  PathComponent = 'path',
  children,
  curve,
  enableEvents = true,
  offset,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
  order,
  renderLine = true,
}: BaseAreaStackProps<XScale, YScale, Datum>) {
  type AreaStackDatum = SeriesPoint<CombinedStackData<XScale, YScale>>;

  const { colorScale, dataRegistry, horizontal, xScale, yScale, theme } = useContext(
    DataContext,
  ) as unknown as DataContextType<XScale, YScale, AreaStackDatum>;

  const { dataKeys, seriesChildren, stackedData } = useStackedData<
    XScale,
    YScale,
    Datum,
    BaseAreaSeriesProps<XScale, YScale, Datum>
  >({
    children,
    order,
    offset,
  });

  // accessor functions for the stack generator
  const accessors = useMemo(() => {
    const xOffset = getScaleBandwidth(xScale) / 2;
    const yOffset = getScaleBandwidth(yScale) / 2;

    return horizontal
      ? {
          y: (d: AreaStackDatum) => (coerceNumber(yScale(getStackValue(d.data))) ?? 0) + yOffset,
          x0: (d: AreaStackDatum) => (coerceNumber(xScale(getFirstItem(d))) ?? 0) + xOffset,
          x1: (d: AreaStackDatum) => (coerceNumber(xScale(getSecondItem(d))) ?? 0) + xOffset,
          defined: (d: AreaStackDatum) =>
            isValidNumber(yScale(getStackValue(d.data))) && isValidNumber(xScale(getSecondItem(d))),
        }
      : {
          x: (d: AreaStackDatum) => (coerceNumber(xScale(getStackValue(d.data))) ?? 0) + xOffset,
          y0: (d: AreaStackDatum) => (coerceNumber(yScale(getFirstItem(d))) ?? 0) + yOffset,
          y1: (d: AreaStackDatum) => (coerceNumber(yScale(getSecondItem(d))) ?? 0) + yOffset,
          defined: (d: AreaStackDatum) =>
            isValidNumber(xScale(getStackValue(d.data))) && isValidNumber(yScale(getSecondItem(d))),
        };
  }, [xScale, yScale, horizontal]);

  // pull out all area + line props for each dataKey
  const stacks = useMemo(
    () =>
      stackedData.map((stack, stackIndex) => {
        const areaSeries:
          | React.ReactElement<BaseAreaSeriesProps<XScale, YScale, Datum>>
          | undefined = seriesChildren.find((child) => child.props.dataKey === stack.key);
        const {
          data,
          dataKey,
          xAccessor,
          yAccessor,
          curve: _,
          PathComponent: __,
          lineProps,
          renderLine: ___,
          ...svgPathProps
        } = areaSeries?.props || {};

        const areaProps: SVGProps<SVGPathElement> = {
          fill: colorScale?.(stack.key) ?? theme?.colors?.[0] ?? '#222',
          ...svgPathProps,
        };

        return {
          key: `${stackIndex}-${stack.key}`,
          accessors,
          data: stack,
          areaProps,
          lineProps,
        };
      }),
    [stackedData, accessors, colorScale, seriesChildren, theme],
  );

  // custom logic to find the nearest AreaStackDatum (context) and return the original Datum (props)
  const findNearestDatum = useCallback(
    (params: NearestDatumArgs<XScale, YScale, AreaStackDatum>): NearestDatumReturnType<Datum> => {
      const childData = seriesChildren.find((child) => child.props.dataKey === params.dataKey)
        ?.props?.data;
      return childData ? findNearestStackDatum(params, childData, horizontal) : null;
    },
    [seriesChildren, horizontal],
  );

  const ownEventSourceKey = `${AREASTACK_EVENT_SOURCE}-${dataKeys.join('-')}`;
  const eventEmitters = useSeriesEvents<XScale, YScale, Datum>({
    dataKey: dataKeys,
    enableEvents,
    // @ts-expect-error Datum input + return type are expected to be the same type but they differ
    // for AreaStack (registry data is StackedDatum, return type is user Datum)
    findNearestDatum,
    onBlur,
    onFocus,
    onPointerMove,
    onPointerOut,
    onPointerUp,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  // render invisible glyphs for focusing if onFocus/onBlur are defined
  const captureFocusEvents = Boolean(onFocus || onBlur);
  const renderGlyphs = useCallback(
    ({ glyphs }: GlyphsProps<XScale, YScale, AreaStackDatum>) =>
      captureFocusEvents
        ? glyphs.map((glyph) => (
            <React.Fragment key={glyph.key}>
              {defaultRenderGlyph({
                ...glyph,
                color: 'transparent',
                onFocus: eventEmitters.onFocus,
                onBlur: eventEmitters.onBlur,
              })}
            </React.Fragment>
          ))
        : null,
    [captureFocusEvents, eventEmitters.onFocus, eventEmitters.onBlur],
  );

  // if scales and data are not available in the registry, bail
  if (dataKeys.some((key) => dataRegistry.get(key) == null) || !xScale || !yScale || !colorScale) {
    return null;
  }

  return (
    <g className="visx-area-stack">
      {stacks.map((stack) => (
        <Area key={stack.key} curve={curve} {...stack.accessors}>
          {({ path }) => (
            <PathComponent
              className="visx-area"
              stroke="transparent"
              d={path(stack.data) || ''}
              {...stack.areaProps}
              {...eventEmitters}
            />
          )}
        </Area>
      ))}
      {renderLine &&
        stacks.map((stack) => (
          <LinePath<AreaStackDatum>
            key={`line-${stack.key}`}
            // note: this currently doesn't work well for offset=wiggle
            // because it only draws a single line. with two lines you
            // get overlap across stacks :/
            x={stack.accessors.x || stack.accessors.x1}
            y={stack.accessors.y || stack.accessors.y1}
            defined={stack.accessors.defined}
            curve={curve}
            {...stack.lineProps}
          >
            {({ path }) => (
              <PathComponent
                className="visx-line"
                fill="transparent"
                stroke={stack.areaProps.fill}
                strokeWidth={2}
                pointerEvents="none"
                {...stack.lineProps}
                d={path(stack.data) || ''}
              />
            )}
          </LinePath>
        ))}
      {captureFocusEvents &&
        stacks.map((_, i) => {
          // render in reverse stack order tab to top-values first
          const stack: typeof stacks[number] = stacks[stacks.length - i - 1];
          return (
            // @ts-expect-error doesn't like unknown, identity functions aren't typical scales
            <BaseGlyphSeries<unknown, unknown, AreaStackDatum>
              key={`glyphs-${stack.key}`}
              dataKey={stack.key}
              data={stack.data}
              xAccessor={stack.accessors.x || stack.accessors.x1}
              yAccessor={stack.accessors.y || stack.accessors.y1}
              // accessors include scaling, so just return the scaled value
              xScale={identity}
              yScale={identity}
              renderGlyphs={renderGlyphs}
            />
          );
        })}
    </g>
  );
}

export default BaseAreaStack;
