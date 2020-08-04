import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack, SeriesPoint } from 'd3-shape';

import { ScaleInput } from '@vx/scale';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import Bar from './Bar';
import { StackKey, $TSFIXME, AddSVGProps, PositionScale } from '../types';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import { BaseBarStackProps } from '../types/stack';
import getBandwidth from '../util/getBandwidth';

export type BarStackHorizontalProps<
  Datum,
  Key,
  XScale extends PositionScale = PositionScale,
  YScale extends PositionScale = PositionScale
> = BaseBarStackProps<Datum, Key> & {
  /** Returns the value mapped to the x0 of a bar. */
  x0?: (d: SeriesPoint<Datum>) => ScaleInput<XScale>;
  /** Returns the value mapped to the x1 of a bar. */
  x1?: (d: SeriesPoint<Datum>) => ScaleInput<XScale>;
  /** Returns the value mapped to the y of a bar. */
  y: (d: Datum) => ScaleInput<YScale>;
  /** @vx/scale or d3-scale that takes an x value and maps it to an x axis position. */
  xScale: XScale;
  /** @vx/scale or d3-scale that takes a y value and maps it to an y axis position. */
  yScale: YScale;
};

export default function BarStackHorizontal<
  Datum,
  Key extends StackKey = StackKey,
  XScale extends PositionScale = PositionScale,
  YScale extends PositionScale = PositionScale
>({
  data,
  className,
  top,
  left,
  y,
  x0 = (d: $TSFIXME) => d?.[0],
  x1 = (d: $TSFIXME) => d?.[1],
  xScale,
  yScale,
  color,
  keys,
  value,
  order,
  offset,
  children,
  ...restProps
}: AddSVGProps<BarStackHorizontalProps<Datum, Key, XScale, YScale>, SVGRectElement>) {
  const stack = d3stack<Datum, Key>();
  if (keys) stack.keys(keys);
  if (value) setNumOrAccessor(stack.value, value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const stacks = stack(data);
  const barHeight = getBandwidth(yScale);

  const barStacks = stacks.map((barStack, i) => {
    const { key } = barStack;
    return {
      index: i,
      key,
      bars: barStack.map((bar, j) => {
        const barWidth = (xScale(x1(bar)) || 0) - (xScale(x0(bar)) || 0);
        const barX = xScale(x0(bar));
        const barY =
          'bandwidth' in yScale
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

  // eslint-disable-next-line react/jsx-no-useless-fragment
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
