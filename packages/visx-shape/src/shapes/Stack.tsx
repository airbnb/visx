import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import { Area as AreaType, Stack as StackType, SeriesPoint, Series } from 'd3-shape';
import {
  $TSFIXME,
  AddSVGProps,
  AccessorForArrayItem,
  StackKey,
  BaseStackProps,
  AreaPathConfig,
} from '../types';
import { area, stack as stackPath } from '../util/D3ShapeFactories';

export type StackProps<Datum, Key> = BaseStackProps<Datum, Key> & {
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
} & Pick<AreaPathConfig<SeriesPoint<Datum>>, 'defined' | 'curve'>;

export default function Stack<Datum, Key extends StackKey = StackKey>({
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
  const stack = stackPath<Datum, Key>({ keys, value, order, offset });
  const path = area<SeriesPoint<Datum>>({
    x,
    x0,
    x1,
    y0,
    y1,
    curve,
    defined,
  });

  const stacks = stack(data);

  if (children) return <>{children({ stacks, path, stack })}</>;

  return (
    <Group top={top} left={left}>
      {stacks.map((series, i) => (
        <path
          className={cx('visx-stack', className)}
          key={`stack-${i}-${series.key || ''}`}
          d={path(series) || ''}
          fill={color?.(series.key, i)}
          {...restProps}
        />
      ))}
    </Group>
  );
}
