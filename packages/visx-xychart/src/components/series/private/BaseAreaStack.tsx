import React, { SVGProps, useContext, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import { SeriesPoint } from 'd3-shape';
import { LinePath, StackPathConfig } from '@visx/shape';
import Area, { AreaProps } from '@visx/shape/lib/shapes/Area';
import { coerceNumber, NumberLike } from '@visx/scale';
import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';

import { CombinedStackData, DataContextType, SeriesProps } from '../../../types';
import DataContext from '../../../context/DataContext';
import BaseAreaSeries, { BaseAreaSeriesProps } from './BaseAreaSeries';
import useStackedData from '../../../hooks/useStackedData';
import { getStackValue } from '../../../utils/combineBarStackData';
import isValidNumber from '../../../typeguards/isValidNumber';

export type BaseAreaStackProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = {
  /** `AreaSeries` elements */
  children: JSX.Element | JSX.Element[]; // React.ElementType<AreaProps<Datum>> | React.ElementType<AreaProps<Datum>>[];
  /** Rendered component which is passed path props by BaseAreaStack after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: AreaProps<Datum>['curve'];
} & Pick<StackPathConfig<Datum, string>, 'offset' | 'order'> &
  Pick<
    SeriesProps<XScale, YScale, Datum>,
    'onPointerMove' | 'onPointerOut' | 'onPointerUp' | 'onBlur' | 'onFocus' | 'enableEvents'
  >;

/**
 * should it accept x/x0/x1Accessors + y/y0/y1Accessors instead of just x/y?
 */

function BaseAreaStack<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  children,
  curve,
  order,
  offset,
  PathComponent = 'path',
  renderLine = true,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
  enableEvents = true,
}: BaseAreaStackProps<XScale, YScale, Datum>) {
  type AreaStackDatum = SeriesPoint<CombinedStackData<XScale, YScale>>;

  const { colorScale, dataRegistry, horizontal, xScale, yScale, theme } = (useContext(
    DataContext,
  ) as unknown) as DataContextType<XScale, YScale, AreaStackDatum>;

  const { seriesChildren, dataKeys, stackedData } = useStackedData<
    XScale,
    YScale,
    Datum,
    BaseAreaSeriesProps<XScale, YScale, Datum>
  >({
    children,
    order,
    offset,
  });

  const accessors = useMemo(
    () =>
      horizontal
        ? {
            y: (d: AreaStackDatum) => coerceNumber(yScale(getStackValue(d.data))) ?? 0,
            x0: (d: AreaStackDatum) => coerceNumber(xScale(getFirstItem(d))) ?? 0,
            x1: (d: AreaStackDatum) => coerceNumber(xScale(getSecondItem(d))) ?? 0,
            defined: (d: AreaStackDatum) =>
              isValidNumber(yScale(getStackValue(d.data))) &&
              isValidNumber(xScale(getSecondItem(d))),
          }
        : {
            x: (d: AreaStackDatum) => coerceNumber(xScale(getStackValue(d.data))) ?? 0,
            y0: (d: AreaStackDatum) => coerceNumber(yScale(getFirstItem(d))) ?? 0,
            y1: (d: AreaStackDatum) => coerceNumber(yScale(getSecondItem(d))) ?? 0,
            defined: (d: AreaStackDatum) =>
              isValidNumber(xScale(getStackValue(d.data))) &&
              isValidNumber(yScale(getSecondItem(d))),
          },
    [xScale, yScale, horizontal],
  );

  //
  const areas = useMemo(
    () =>
      stackedData.map((stack, stackIndex) => {
        const areaSeries:
          | React.ReactElement<BaseAreaSeriesProps<XScale, YScale, Datum>>
          | undefined = seriesChildren.find(child => child.props.dataKey === stack.key);
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

  // @TODO
  // event handlers
  // focus handlers

  return (
    <g className="visx-area-stack">
      {areas.map(area => (
        <Area key={area.key} curve={curve} {...area.accessors}>
          {({ path }) => (
            <PathComponent
              className="visx-area"
              stroke="transparent"
              d={path(area.data) || ''}
              {...area.areaProps}
              // {...eventEmitters}
            />
          )}
        </Area>
      ))}
      {renderLine &&
        areas.map(area => (
          <LinePath<AreaStackDatum>
            key={`line-${area.key}`}
            // note: this currently doesn't work well for offset=wiggle
            // because it only draws a single line. with two lines you
            // get overlap across stacks
            x={area.accessors.x || area.accessors.x1}
            y={area.accessors.y || area.accessors.y1}
            defined={area.accessors.defined}
            curve={curve}
            {...area.lineProps}
          >
            {({ path }) => (
              <PathComponent
                className="visx-line"
                fill="transparent"
                stroke={area.areaProps.fill}
                strokeWidth={2}
                pointerEvents="none"
                {...area.lineProps}
                d={path(area.data) || ''}
              />
            )}
          </LinePath>
        ))}
    </g>
  );
}

export default BaseAreaStack;
