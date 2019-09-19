import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack } from 'd3-shape';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import objHasMethod from '../util/objHasMethod';
import Bar from './Bar';

type Props = {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  data: $TSFixMe[];
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  xScale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  yScale: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  color: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  keys: $TSFixMe[];
  className?: string;
  top?: number;
  left?: number;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  y0?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  y1?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  order?: $TSFixMeFunction | $TSFixMe[] | string;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  offset?: $TSFixMeFunction | $TSFixMe[] | string;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  value?: $TSFixMeFunction | number;
};

// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function BarStack({
  data,
  className,
  top,
  left,
  x,
  y0 = (d: $TSFixMe) => d[0],
  y1 = (d: $TSFixMe) => d[1],
  xScale,
  yScale,
  color,
  keys,
  value,
  order,
  offset,
  children,
  ...restProps
}: Props) {
  const stack = d3stack();
  if (keys) stack.keys(keys);
  if (value) stack.value(value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const stacks = stack(data);

  const xRange = xScale.range();
  const xDomain = xScale.domain();
  const barWidth = objHasMethod(xScale, 'bandwidth')
    ? xScale.bandwidth()
    : Math.abs(xRange[xRange.length - 1] - xRange[0]) / xDomain.length;

  const barStacks = stacks.map((barStack, i) => {
    const { key } = barStack;
    return {
      index: i,
      key,
      bars: barStack.map((bar, j) => {
        const barHeight = yScale(y0(bar)) - yScale(y1(bar));
        const barY = yScale(y1(bar));
        const barX = objHasMethod(xScale, 'bandwidth')
          ? xScale(x(bar.data))
          : Math.max(xScale(x(bar.data)) - barWidth / 2);
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

  if (children) return children(barStacks);

  return (
    <Group className={cx('vx-bar-stack', className)} top={top} left={left}>
      {barStacks.map(barStack => {
        return barStack.bars.map(bar => {
          return (
            // @ts-ignore ts-migrate(2322) FIXME: Property 'x' does not exist on type 'IntrinsicAttr... Remove this comment to see the full error message
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
