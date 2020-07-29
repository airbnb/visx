import React from 'react';
import cx from 'classnames';
import { Point } from '@vx/point';
import { Group } from '@vx/group';
import ORIENT from '../constants/orientation';
import { SharedAxisProps, AxisOrientation, ChildRenderProps, AxisScale } from '../types';
import AxisRenderer from './AxisRenderer';
import getTickPosition from '../utils/getTickPosition';
import toNumberOrUndefined from '../utils/toNumberOrUndefined';
import getTicks from '../utils/getTicks';
import getTickFormatter from '../utils/getTickFormatter';

export type AxisProps<Scale extends AxisScale> = SharedAxisProps<Scale> & {
  orientation?: AxisOrientation;
};

export default function Axis<Scale extends AxisScale>({
  children,
  axisClassName,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  left = 0,
  numTicks = 10,
  orientation = ORIENT.bottom,
  rangePadding = 0,
  scale,
  tickFormat,
  tickLength = 8,
  tickValues,
  top = 0,
  ...restProps
}: AxisProps<Scale>) {
  const format = tickFormat ?? getTickFormatter(scale);

  const range = scale.range();
  const range0 = Number(range[0]) + 0.5 - rangePadding;
  const range1 = Number(range[range.length - 1]) + 0.5 + rangePadding;

  const isLeft = orientation === ORIENT.left;
  const isTop = orientation === ORIENT.top;
  const horizontal = isTop || orientation === ORIENT.bottom;

  const tickPosition = getTickPosition(scale);
  const tickSign = isLeft || isTop ? -1 : 1;

  const axisFromPoint = new Point({
    x: horizontal ? range0 : 0,
    y: horizontal ? 0 : range0,
  });
  const axisToPoint = new Point({
    x: horizontal ? range1 : 0,
    y: horizontal ? 0 : range1,
  });

  const ticks = (tickValues ?? getTicks(scale, numTicks))
    .filter(value => !hideZero || value !== 0 || value !== '0')
    .map((value, index) => {
      const scaledValue = toNumberOrUndefined(tickPosition(value));
      const from = new Point({
        x: horizontal ? scaledValue : 0,
        y: horizontal ? 0 : scaledValue,
      });
      const to = new Point({
        x: horizontal ? scaledValue : tickSign * tickLength,
        y: horizontal ? tickLength * tickSign : scaledValue,
      });
      return {
        value,
        index,
        from,
        to,
        formattedValue: format(value, index),
      };
    });

  const childProps: ChildRenderProps<Scale> = {
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
  };

  return (
    <Group className={cx('vx-axis', axisClassName)} top={top} left={left}>
      {children ? children(childProps) : <AxisRenderer {...childProps} />}
    </Group>
  );
}
