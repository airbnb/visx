import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack, SeriesPoint } from 'd3-shape';

import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import Bar from './Bar';
import { BarStackProps } from './BarStack';
import { StackKey } from '../types';

export type BarStackHorizontalProps<Datum> = Pick<
  BarStackProps<Datum>,
  | 'data'
  | 'className'
  | 'top'
  | 'left'
  | 'keys'
  | 'order'
  | 'offset'
  | 'value'
  | 'xScale'
  | 'yScale'
  | 'color'
  | 'children'
> & {
  /** Returns the value mapped to the x0 of a bar. */
  x0: (d: SeriesPoint<Datum>) => number;
  /** Returns the value mapped to the x1 of a bar. */
  x1: (d: SeriesPoint<Datum>) => number;
  /** Returns the value mapped to the y of a bar. */
  y: (d: Datum) => number;
};

export default function BarStackHorizontal<Datum>({
  data,
  className,
  top,
  left,
  y,
  x0 = (d: any) => d[0],
  x1 = (d: any) => d[1],
  xScale,
  yScale,
  color,
  keys,
  value,
  order,
  offset,
  children,
  ...restProps
}: BarStackHorizontalProps<Datum> &
  Omit<React.SVGProps<SVGRectElement>, keyof BarStackHorizontalProps<Datum>>) {
  const stack = d3stack<Datum, StackKey>();
  if (keys) stack.keys(keys);
  if (value) stack.value(value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const stacks = stack(data);

  const yRange = yScale.range();
  const yDomain = yScale.domain();
  const barHeight =
    'bandwidth' in yScale && typeof yScale.bandwidth === 'function'
      ? yScale.bandwidth()
      : Math.abs(yRange[yRange.length - 1] - yRange[0]) / yDomain.length;

  const barStacks = stacks.map((barStack, i) => {
    const { key } = barStack;
    return {
      index: i,
      key,
      bars: barStack.map((bar, j) => {
        const barWidth = xScale(x1(bar)) - xScale(x0(bar));
        const barX = xScale(x0(bar));
        const barY =
          'bandwidth' in yScale && typeof yScale.bandwidth === 'function'
            ? yScale(y(bar.data))
            : Math.max(yScale(y(bar.data)) - barWidth / 2);
        return {
          bar,
          key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX,
          y: barY,
          color: color(barStack.key, j),
        };
      }),
    };
  });

  if (children) return <>{children(barStacks)}</>;

  return (
    <Group className={cx('vx-bar-stack-horizontal', className)} top={top} left={left}>
      {barStacks.map(barStack => {
        return barStack.bars.map(bar => {
          return (
            <Bar
              key={`bar-stack-${barStack.index}-${bar.index}`}
              x={bar.x}
              y={bar.y}
              height={bar.height}
              width={bar.width}
              fill={bar.color}
              {...restProps}
            />
          );
        });
      })}
    </Group>
  );
}
