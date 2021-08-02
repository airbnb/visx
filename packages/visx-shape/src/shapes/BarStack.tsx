import React from 'react';
import cx from 'classnames';
import { stack as d3stack, SeriesPoint } from 'd3-shape';
import { Group } from '@visx/group';
import { ScaleInput } from '@visx/scale';
import {
  PositionScale,
  AddSVGProps,
  BarStack as BarStackType,
  BaseBarStackProps,
  StackKey,
  Accessor,
} from '../types';
import { getFirstItem, getSecondItem } from '../util/accessors';
import getBandwidth from '../util/getBandwidth';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import stackOrder from '../util/stackOrder';
import stackOffset from '../util/stackOffset';
import Bar from './Bar';

export type BarStackProps<
  Datum,
  Key extends StackKey = StackKey,
  XScale extends PositionScale = PositionScale,
  YScale extends PositionScale = PositionScale,
> = BaseBarStackProps<Datum, Key, XScale, YScale> & {
  /** Returns the value mapped to the x of a bar. */
  x: Accessor<Datum, ScaleInput<XScale>>;
  /** Returns the value mapped to the y0 of a bar. */
  y0?: Accessor<SeriesPoint<Datum>, ScaleInput<YScale>>;
  /** Returns the value mapped to the y1 of a bar. */
  y1?: Accessor<SeriesPoint<Datum>, ScaleInput<YScale>>;
};

export default function BarStack<
  Datum,
  Key extends StackKey = StackKey,
  XScale extends PositionScale = PositionScale,
  YScale extends PositionScale = PositionScale,
>({
  data,
  className,
  top,
  left,
  x,
  y0 = getFirstItem,
  y1 = getSecondItem,
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

  const barStacks: BarStackType<Datum, Key>[] = stacks.map((barStack, i) => {
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
    <Group className={cx('visx-bar-stack', className)} top={top} left={left}>
      {barStacks.map((barStack) =>
        barStack.bars.map((bar) => (
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
