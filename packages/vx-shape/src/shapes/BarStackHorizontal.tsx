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
  y: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x0?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x1?: $TSFixMeFunction;
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
  order?: $TSFixMeFunction | $TSFixMe[] | string;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  offset?: $TSFixMeFunction | $TSFixMe[] | string;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  value?: $TSFixMeFunction | number;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
};

// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function BarStackHorizontal({
  data,
  className,
  top,
  left,
  y,
  x0 = (d: $TSFixMe) => d[0],
  x1 = (d: $TSFixMe) => d[1],
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

  const yRange = yScale.range();
  const yDomain = yScale.domain();
  const barHeight = objHasMethod(yScale, 'bandwidth')
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
        const barY = objHasMethod(yScale, 'bandwidth')
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

  if (children) return children(barStacks);

  return (
    <Group className={cx('vx-bar-stack-horizontal', className)} top={top} left={left}>
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
