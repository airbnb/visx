/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack, SeriesPoint } from 'd3-shape';

import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import Bar from './Bar';
import { BarStackProps } from './BarStack';
import { StackKey, $TSFIXME } from '../types';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';

type PickProps =
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
  | 'children';

export type BarStackHorizontalProps<Datum, Key> = Pick<BarStackProps<Datum, Key>, PickProps> & {
  /** Returns the value mapped to the x0 of a bar. */
  x0?: (d: SeriesPoint<Datum>) => $TSFIXME;
  /** Returns the value mapped to the x1 of a bar. */
  x1?: (d: SeriesPoint<Datum>) => $TSFIXME;
  /** Returns the value mapped to the y of a bar. */
  y: (d: Datum) => $TSFIXME;
};

export default function BarStackHorizontal<Datum, Key extends StackKey = StackKey>({
  data,
  className,
  top,
  left,
  y,
  x0 = (d: $TSFIXME) => d && d[0],
  x1 = (d: $TSFIXME) => d && d[1],
  xScale,
  yScale,
  color,
  keys,
  value,
  order,
  offset,
  children,
  ...restProps
}: BarStackHorizontalProps<Datum, Key> &
  Omit<React.SVGProps<SVGRectElement>, keyof BarStackHorizontalProps<Datum, Key> | PickProps>) {
  const stack = d3stack<Datum, Key>();
  if (keys) stack.keys(keys);
  if (value) setNumOrAccessor(stack.value, value);
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
        const barWidth = (xScale(x1(bar)) || 0) - (xScale(x0(bar)) || 0);
        const barX = xScale(x0(bar));
        const barY =
          'bandwidth' in yScale && typeof yScale.bandwidth === 'function'
            ? yScale(y(bar.data))
            : Math.max((yScale(y(bar.data)) || 0) - barWidth / 2);
        return {
          bar,
          key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX || 0,
          y: barY || 0,
          color: color(barStack.key, j),
        };
      }),
    };
  });

  if (children) return <>{children(barStacks)}</>;

  return (
    <Group className={cx('vx-bar-stack-horizontal', className)} top={top} left={left}>
      {barStacks.map(barStack =>
        barStack.bars.map(bar => (
          <Bar
            key={`bar-stack-${barStack.index}-${bar.index}`}
            x={bar.x}
            y={bar.y}
            height={bar.height}
            width={bar.width}
            fill={bar.color}
            {...restProps}
          />
        )),
      )}
    </Group>
  );
}
