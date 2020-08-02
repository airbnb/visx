import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { getTicks, coerceNumber } from '@vx/scale';
import { SharedAxisProps, AxisScale } from '../types';
import AxisRenderer from './AxisRenderer';
import getTickPosition from '../utils/getTickPosition';
import getTickFormatter from '../utils/getTickFormatter';
import createPoint from '../utils/createPoint';
import Orientation from '../constants/orientation';

export type AxisProps<Scale extends AxisScale> = SharedAxisProps<Scale> & {
  orientation?: Orientation;
};

export default function Axis<Scale extends AxisScale>({
  children = AxisRenderer,
  axisClassName,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  left = 0,
  numTicks = 10,
  orientation = Orientation.bottom,
  rangePadding = 0,
  scale,
  tickFormat,
  tickLength = 8,
  tickValues,
  top = 0,
  ...restProps
}: AxisProps<Scale>) {
  const format = tickFormat ?? getTickFormatter(scale);

  const isLeft = orientation === Orientation.left;
  const isTop = orientation === Orientation.top;
  const horizontal = isTop || orientation === Orientation.bottom;

  const tickPosition = getTickPosition(scale);
  const tickSign = isLeft || isTop ? -1 : 1;

  const range = scale.range();
  const axisFromPoint = createPoint({ x: Number(range[0]) + 0.5 - rangePadding, y: 0 }, horizontal);
  const axisToPoint = createPoint(
    { x: Number(range[range.length - 1]) + 0.5 + rangePadding, y: 0 },
    horizontal,
  );

  const ticks = (tickValues ?? getTicks(scale, numTicks))
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => !hideZero || (value !== 0 && value !== '0'))
    .map(({ value, index }) => {
      const scaledValue = coerceNumber(tickPosition(value));

      return {
        value,
        index,
        from: createPoint({ x: scaledValue, y: 0 }, horizontal),
        to: createPoint({ x: scaledValue, y: tickLength * tickSign }, horizontal),
        formattedValue: format(value, index),
      };
    });

  return (
    <Group className={cx('vx-axis', axisClassName)} top={top} left={left}>
      {children({
        ...restProps,
        axisFromPoint,
        axisToPoint,
        hideAxisLine,
        hideTicks,
        hideZero,
        horizontal,
        numTicks,
        orientation,
        rangePadding,
        scale,
        tickFormat: format,
        tickLength,
        tickPosition,
        tickSign,
        ticks,
      })}
    </Group>
  );
}
