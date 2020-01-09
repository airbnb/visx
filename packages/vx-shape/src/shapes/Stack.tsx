/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import {
  area,
  Area as AreaType,
  stack as d3stack,
  Stack as StackType,
  CurveFactory,
  SeriesPoint,
  Series,
} from 'd3-shape';

import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import stackOrder, { STACK_ORDERS } from '../util/stackOrder';
import stackOffset, { STACK_OFFSETS } from '../util/stackOffset';
import { StackKey, $TSFIXME } from '../types';

export type NumAccessor<Datum> = (datum: Datum, index: number, data: Datum[]) => number;

export type StackProps<Datum, Key> = {
  /** Array of data for which to generate a stack. */
  data: Datum[];
  /** className applied to path element. */
  className?: string;
  /** Top offset of rendered Stack. */
  top?: number;
  /** Left offset of rendered Stack. */
  left?: number;
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory;
  /** Returns a color for a given stack key and index. */
  color?: (key: Key, index: number) => string;
  /** Array of keys corresponding to stack layers. */
  keys?: Key[];
  /** Override render function which is passed the configured arc generator as input. */
  children?: (args: {
    stacks: Series<Datum, Key>[];
    path: AreaType<SeriesPoint<Datum>>;
    stack: StackType<$TSFIXME, Datum, Key>;
  }) => React.ReactNode;
  /** Sets the x0 accessor function, and sets x1 to null. */
  x?: NumAccessor<SeriesPoint<Datum>>;
  /** Specifies the x0 accessor function which defaults to d => d[0]. */
  x0?: NumAccessor<SeriesPoint<Datum>>;
  /** Specifies the x1 accessor function which defaults to null. */
  x1?: NumAccessor<SeriesPoint<Datum>>;
  /** Specifies the y0 accessor function which defaults to d => 0. */
  y0?: NumAccessor<SeriesPoint<Datum>>;
  /** Specifies the y1 accessor function which defaults to d => d[1]. */
  y1?: NumAccessor<SeriesPoint<Datum>>;
  /** Sets the value accessor for a Datum, which defaults to d[key]. */
  value?: number | ((d: Datum, key: Key) => number);
  /** The defined accessor for the shape. The final area shape includes all points for which this function returns true. By default all points are defined. */
  defined?: (datum: SeriesPoint<Datum>, index: number, data: SeriesPoint<Datum>[]) => boolean;
  /** Sets the stack order to the pre-defined d3 function, see https://github.com/d3/d3-shape#stack_order. */
  order?: keyof typeof STACK_ORDERS;
  /** Sets the stack offset to the pre-defined d3 offset, see https://github.com/d3/d3-shape#stack_offset. */
  offset?: keyof typeof STACK_OFFSETS;
};

export default function Stack<Datum, Key = StackKey>({
  className,
  top,
  left,
  keys,
  data,
  curve,
  defined,
  x,
  x0,
  x1,
  y0,
  y1,
  value,
  order,
  offset,
  color,
  children,
  ...restProps
}: StackProps<Datum, Key> & Omit<React.SVGProps<SVGPathElement>, keyof StackProps<Datum, Key>>) {
  const stack = d3stack<Datum, Key>();
  if (keys) stack.keys(keys);
  if (value) setNumOrAccessor(stack.value, value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const path = area<SeriesPoint<Datum>>();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y0) path.y0(y0);
  if (y1) path.y1(y1);
  if (curve) path.curve(curve);
  if (defined) path.defined(defined);

  const stacks = stack(data);

  if (children) return <>{children({ stacks, path, stack })}</>;

  return (
    <Group top={top} left={left}>
      {stacks.map((series, i) => (
        <path
          className={cx('vx-stack', className)}
          key={`stack-${i}-${series.key || ''}`}
          d={path(series) || ''}
          fill={color && color(series.key, i)}
          {...restProps}
        />
      ))}
    </Group>
  );
}
