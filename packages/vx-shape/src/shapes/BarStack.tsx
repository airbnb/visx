/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack, SeriesPoint } from 'd3-shape';

import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import Bar from './Bar';
import { StackProps, NumAccessor as StackNumAccessor } from './Stack';
import { ScaleType, StackKey, BarStack, $TSFIXME } from '../types';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';

type PickProps = 'data' | 'className' | 'top' | 'left' | 'keys' | 'order' | 'offset' | 'value';

export type NumAccessor<Datum> = StackNumAccessor<Datum>;

export type BarStackProps<Datum, Key> = Pick<StackProps<Datum, Key>, PickProps> & {
  /** Returns the value mapped to the x of a bar. */
  x: (d: Datum) => $TSFIXME;
  /** Returns the value mapped to the y0 of a bar. */
  y0?: (d: SeriesPoint<Datum>) => $TSFIXME;
  /** Returns the value mapped to the y1 of a bar. */
  y1?: (d: SeriesPoint<Datum>) => $TSFIXME;
  /** @vx/scale or d3-scale that takes an x value and maps it to an x axis position. */
  xScale: ScaleType;
  /** @vx/scale or d3-scale that takes a y value and maps it to an y axis position. */
  yScale: ScaleType;
  /** Returns the desired color for a bar with a given key and index. */
  color: (key: Key, index: number) => string;
  /** Override render function which is passed the configured arc generator as input. */
  children?: (stacks: BarStack<Datum, Key>[]) => React.ReactNode;
};

export default function BarStackComponent<Datum, Key extends StackKey = StackKey>({
  data,
  className,
  top,
  left,
  x,
  y0 = (d: $TSFIXME) => d && d[0],
  y1 = (d: $TSFIXME) => d && d[1],
  xScale,
  yScale,
  color,
  keys,
  value,
  order,
  offset,
  children,
  ...restProps
}: BarStackProps<Datum, Key> &
  Omit<React.SVGProps<SVGRectElement>, keyof BarStackProps<Datum, Key> | PickProps>) {
  const stack = d3stack<Datum, Key>();
  if (keys) stack.keys(keys);
  if (value) setNumOrAccessor(stack.value, value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const stacks = stack(data);

  const xRange = xScale.range();
  const xDomain = xScale.domain();
  const barWidth =
    'bandwidth' in xScale && typeof xScale.bandwidth === 'function'
      ? xScale.bandwidth()
      : Math.abs(xRange[xRange.length - 1] - xRange[0]) / xDomain.length;

  const barStacks: BarStack<Datum, Key>[] = stacks.map((barStack, i) => {
    const { key } = barStack;
    return {
      index: i,
      key,
      bars: barStack.map((bar, j) => {
        const barHeight = (yScale(y0(bar)) || 0) - (yScale(y1(bar)) || 0);
        const barY = yScale(y1(bar));
        const barX =
          'bandwidth' in xScale && typeof xScale.bandwidth === 'function'
            ? xScale(x(bar.data))
            : Math.max((xScale(x(bar.data)) || 0) - barWidth / 2);

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
    <Group className={cx('vx-bar-stack', className)} top={top} left={left}>
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
