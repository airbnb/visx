import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import { Group } from '@vx/group';
import { Text } from '@vx/text';
import center from '../utils/center';
import getLabelTransform from '../utils/labelTransform';
import ORIENT from '../constants/orientation';
import toString from '../utils/toString';
import toNumberOrUndefined from '../utils/toNumberOrUndefined';
import { SharedAxisProps, AxisOrientation } from '../types';

export type AxisProps<ScaleInput> = SharedAxisProps<ScaleInput> & {
  orientation?: AxisOrientation;
};

export default function Axis<ScaleInput>({
  children,
  axisClassName,
  axisLineClassName,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  label = '',
  labelClassName,
  labelOffset = 14,
  labelProps = {
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: '#222',
  },
  left = 0,
  numTicks = 10,
  orientation = ORIENT.bottom,
  rangePadding = 0,
  scale,
  stroke = '#222',
  strokeWidth = 1,
  strokeDasharray,
  tickClassName,
  tickFormat,
  tickLabelProps = (/** tickValue, index */) => ({
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: '#222',
  }),
  tickLength = 8,
  tickStroke = '#222',
  tickTransform,
  tickValues,
  tickComponent,
  top = 0,
}: AxisProps<ScaleInput>) {
  const values =
    tickValues ||
    (scale.ticks
      ? scale.ticks(numTicks)
      : scale
          .domain()
          .filter(
            (_, index, arr) =>
              numTicks == null || index % Math.round((arr.length - 1) / numTicks) === 0,
          ));
  const format = tickFormat || (scale.tickFormat ? scale.tickFormat() : toString);

  const range = scale.range();
  const range0 = Number(range[0]) + 0.5 - rangePadding;
  const range1 = Number(range[range.length - 1]) + 0.5 + rangePadding;

  const isLeft = orientation === ORIENT.left;
  const isTop = orientation === ORIENT.top;
  const axisIsHorizontal = isTop || orientation === ORIENT.bottom;
  const tickSign = isLeft || isTop ? -1 : 1;

  const position = center(scale.copy());

  const axisFromPoint = new Point({
    x: axisIsHorizontal ? range0 : 0,
    y: axisIsHorizontal ? 0 : range0,
  });
  const axisToPoint = new Point({
    x: axisIsHorizontal ? range1 : 0,
    y: axisIsHorizontal ? 0 : range1,
  });

  let tickLabelFontSize = 10; // track the max tick label size to compute label offset

  if (children) {
    return (
      <Group className={cx('vx-axis', axisClassName)} top={top} left={left}>
        {children({
          axisFromPoint,
          axisToPoint,
          horizontal: axisIsHorizontal,
          tickSign,
          numTicks,
          label,
          rangePadding,
          tickLength,
          tickFormat: format,
          tickPosition: position,
          ticks: values.map((value, index) => {
            const scaledValue = toNumberOrUndefined(position(value));
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
          }),
        })}
      </Group>
    );
  }

  return (
    <Group className={cx('vx-axis', axisClassName)} top={top} left={left}>
      {values.map((val, index) => {
        if (
          hideZero &&
          ((typeof val === 'number' && val === 0) || (typeof val === 'string' && val === '0'))
        ) {
          return null;
        }
        const scaledValue = toNumberOrUndefined(position(val));
        const tickFromPoint = new Point({
          x: axisIsHorizontal ? scaledValue : 0,
          y: axisIsHorizontal ? 0 : scaledValue,
        });
        const tickToPoint = new Point({
          x: axisIsHorizontal ? scaledValue : tickSign * tickLength,
          y: axisIsHorizontal ? tickLength * tickSign : scaledValue,
        });

        const tickLabelPropsObj = tickLabelProps(val, index);
        tickLabelFontSize = Math.max(
          tickLabelFontSize,
          (typeof tickLabelPropsObj.fontSize === 'number' && tickLabelPropsObj.fontSize) || 0,
        );

        const tickYCoord = tickToPoint.y + (axisIsHorizontal && !isTop ? tickLabelFontSize : 0);
        const formattedValue = format(val, index);
        return (
          <Group
            key={`vx-tick-${val}-${index}`}
            className={cx('vx-axis-tick', tickClassName)}
            transform={tickTransform}
          >
            {!hideTicks && (
              <Line
                from={tickFromPoint}
                to={tickToPoint}
                stroke={tickStroke}
                strokeLinecap="square"
              />
            )}
            {tickComponent ? (
              tickComponent({
                ...tickLabelPropsObj,
                x: tickToPoint.x,
                y: tickYCoord,
                formattedValue,
              })
            ) : (
              <Text x={tickToPoint.x} y={tickYCoord} {...tickLabelPropsObj}>
                {formattedValue}
              </Text>
            )}
          </Group>
        );
      })}

      {!hideAxisLine && (
        <Line
          className={cx('vx-axis-line', axisLineClassName)}
          from={axisFromPoint}
          to={axisToPoint}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
        />
      )}

      {label && (
        <Text
          className={cx('vx-axis-label', labelClassName)}
          {...getLabelTransform({
            labelOffset,
            labelProps,
            orientation,
            range,
            tickLabelFontSize,
            tickLength,
          })}
          {...labelProps}
        >
          {label}
        </Text>
      )}
    </Group>
  );
}
