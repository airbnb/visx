import React, { useContext, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import { SeriesPoint } from 'd3-shape';
import { StackPathConfig } from '@visx/shape';
import Area, { AreaProps } from '@visx/shape/lib/shapes/Area';
import { CombinedStackData, DataContextType, SeriesProps } from '../../../types';

import DataContext from '../../../context/DataContext';
import { BaseAreaSeriesProps } from './BaseAreaSeries';
import useStackedData from '../../../hooks/useStackedData';
import { getStackValue } from '../../../utils/combineBarStackData';
import { NumberLike } from '@visx/scale';
import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';

// type AreaProps<X, Y, D> = any; // @TODO fix me

export type BaseAreaStackProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = {
  /** `AreaSeries` elements */
  children: JSX.Element | JSX.Element[];
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

  //
  const areas = stackedData.map((stack, stackIndex) => {
    const accessors: {
      [key: string]: (d: AreaStackDatum) => NumberLike | undefined;
    } = {};
    if (horizontal) {
      accessors.y = d => yScale(getStackValue(d.data));
      accessors.x0 = d => xScale(getFirstItem(d));
      accessors.x1 = d => xScale(getSecondItem(d));
    } else {
      accessors.x = d => xScale(getStackValue(d.data));
      accessors.y0 = d => yScale(getFirstItem(d));
      accessors.y1 = d => yScale(getSecondItem(d));
    }
    return {
      key: `${stackIndex}-${stack.key}`,
      accessors,
      data: stack,
      areaProps: {
        fill: colorScale?.(stack.key) ?? theme?.colors?.[0] ?? '#222',
        // take from seriesChildren?
      },
    };
  });

  // @TODO
  // event handlers
  // focus handlers

  return (
    <g className="visx-area-stack">
      {areas.map(area => (
        <Area
          key={area.key}
          {...area.accessors}
          curve={curve}
          // defined={isDefined}
        >
          {({ path }) => (
            <PathComponent
              className="visx-area"
              stroke="transparent"
              {...area.areaProps}
              d={path(area.data) || ''}
              // {...eventEmitters}
            />
          )}
        </Area>
      ))}
    </g>
  );
}

export default BaseAreaStack;
