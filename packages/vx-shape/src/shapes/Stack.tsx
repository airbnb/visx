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
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import { StackKey, $TSFIXME, AddSVGProps } from '../types';
import { AccessorForArrayItem } from '../types/accessor';
import { BaseStackProps } from '../types/stack';

export type StackProps<Datum, Key> = BaseStackProps<Datum, Key> & {
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory;
  /** Returns a color for a given stack key and index. */
  color?: (key: Key, index: number) => string;
  /** Override render function which is passed the configured arc generator as input. */
  children?: (args: {
    stacks: Series<Datum, Key>[];
    path: AreaType<SeriesPoint<Datum>>;
    stack: StackType<$TSFIXME, Datum, Key>;
  }) => React.ReactNode;
  /** Sets the x0 accessor function, and sets x1 to null. */
  x?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
  /** Specifies the x0 accessor function which defaults to d => d[0]. */
  x0?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
  /** Specifies the x1 accessor function which defaults to null. */
  x1?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
  /** Specifies the y0 accessor function which defaults to d => 0. */
  y0?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
  /** Specifies the y1 accessor function which defaults to d => d[1]. */
  y1?: AccessorForArrayItem<SeriesPoint<Datum>, number>;
  /** The defined accessor for the shape. The final area shape includes all points for which this function returns true. By default all points are defined. */
  defined?: AccessorForArrayItem<SeriesPoint<Datum>, boolean>;
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
}: AddSVGProps<StackProps<Datum, Key>, SVGPathElement>) {
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

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (children) return <>{children({ stacks, path, stack })}</>;

  return (
    <Group top={top} left={left}>
      {stacks.map((series, i) => (
        <path
          className={cx('vx-stack', className)}
          key={`stack-${i}-${series.key || ''}`}
          d={path(series) || ''}
          fill={color?.(series.key, i)}
          {...restProps}
        />
      ))}
    </Group>
  );
}
