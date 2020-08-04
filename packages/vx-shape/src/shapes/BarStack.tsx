import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { stack as d3stack, SeriesPoint } from 'd3-shape';

import { ScaleInput } from '@vx/scale';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import Bar from './Bar';
import { StackKey, $TSFIXME, PositionScale, AddSVGProps } from '../types';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import { BarStack, BaseBarStackProps } from '../types/stack';
import getBandwidth from '../util/getBandwidth';

export type BarStackProps<
  Datum,
  Key,
  XScale extends PositionScale = PositionScale,
  YScale extends PositionScale = PositionScale
> = BaseBarStackProps<Datum, Key> & {
  /** Returns the value mapped to the x of a bar. */
  x: (d: Datum) => ScaleInput<XScale>;
  /** Returns the value mapped to the y0 of a bar. */
  y0?: (d: SeriesPoint<Datum>) => ScaleInput<YScale>;
  /** Returns the value mapped to the y1 of a bar. */
  y1?: (d: SeriesPoint<Datum>) => ScaleInput<YScale>;
  /** @vx/scale or d3-scale that takes an x value and maps it to an x axis position. */
  xScale: XScale;
  /** @vx/scale or d3-scale that takes a y value and maps it to an y axis position. */
  yScale: YScale;
};

export default function BarStackComponent<
  Datum,
  Key extends StackKey = StackKey,
  XScale extends PositionScale = PositionScale,
  YScale extends PositionScale = PositionScale
>({
  data,
  className,
  top,
  left,
  x,
  y0 = (d: $TSFIXME) => d?.[0],
  y1 = (d: $TSFIXME) => d?.[1],
  xScale,
  yScale,
  color,
  keys,
  value,
  order,
  offset,
  children,
  ...restProps
}: AddSVGProps<BarStackProps<Datum, Key, XScale, YScale>, SVGRectElement>) {
  const stack = d3stack<Datum, Key>();
  if (keys) stack.keys(keys);
  if (value) setNumOrAccessor(stack.value, value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));

  const stacks = stack(data);
  const barWidth = getBandwidth(xScale);

  const barStacks: BarStack<Datum, Key>[] = stacks.map((barStack, i) => {
    const { key } = barStack;
    return {
      index: i,
      key,
      bars: barStack.map((bar, j) => {
        const barHeight = (yScale(y0(bar)) || 0) - (yScale(y1(bar)) || 0);
        const barY = yScale(y1(bar));
        const barX =
          'bandwidth' in xScale
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

  // eslint-disable-next-line react/jsx-no-useless-fragment
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
