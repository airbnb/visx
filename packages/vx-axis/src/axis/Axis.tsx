import React from 'react';
import cx from 'classnames';
import { Point } from '@vx/point';
import { Group } from '@vx/group';
import ORIENT from '../constants/orientation';
import { SharedAxisProps, AxisOrientation, ChildRenderProps } from '../types';
import AxisRenderer from './AxisRenderer';
import center from '../utils/center';
import toString from '../utils/toString';
import toNumberOrUndefined from '../utils/toNumberOrUndefined';

export type AxisProps<Datum> = SharedAxisProps<Datum> & {
  orientation?: AxisOrientation;
};

export default function Axis<Datum>({
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
}: AxisProps<Datum>) {
  const format = tickFormat || ('tickFormat' in scale ? scale.tickFormat() : toString);

  const range = scale.range();
  const range0 = Number(range[0]) + 0.5 - rangePadding;
  const range1 = Number(range[range.length - 1]) + 0.5 + rangePadding;

  const isLeft = orientation === ORIENT.left;
  const isTop = orientation === ORIENT.top;
  const axisIsHorizontal = isTop || orientation === ORIENT.bottom;

  const tickPosition = center(scale.copy());
  const tickSign = isLeft || isTop ? -1 : 1;

  const axisFromPoint = new Point({
    x: axisIsHorizontal ? range0 : 0,
    y: axisIsHorizontal ? 0 : range0,
  });
  const axisToPoint = new Point({
    x: axisIsHorizontal ? range1 : 0,
    y: axisIsHorizontal ? 0 : range1,
  });

  const values =
    tickValues ||
    ('ticks' in scale
      ? scale.ticks(numTicks)
      : scale
          .domain()
          .filter(
            (_, index, arr) =>
              numTicks == null ||
              arr.length <= numTicks ||
              index % Math.round((arr.length - 1) / numTicks) === 0,
          ));

  const ticks = values
    .filter(value => !hideZero || value !== 0 || value !== '0')
    .map((value, index) => {
      const scaledValue = toNumberOrUndefined(tickPosition(value));
      const from = new Point({
        x: axisIsHorizontal ? scaledValue : 0,
        y: axisIsHorizontal ? 0 : scaledValue,
      });
      const to = new Point({
        x: axisIsHorizontal ? scaledValue : tickSign * tickLength,
        y: axisIsHorizontal ? tickLength * tickSign : scaledValue,
      });
      return {
        value,
        index,
        from,
        to,
        formattedValue: format(value, index),
      };
    });

  const childProps: ChildRenderProps<Datum> = {
    ...restProps,
    axisFromPoint,
    axisToPoint,
    hideAxisLine,
    hideTicks,
    hideZero,
    horizontal: axisIsHorizontal,
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
