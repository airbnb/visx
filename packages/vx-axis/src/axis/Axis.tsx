import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import { Group } from '@vx/group';
import { Text } from '@vx/text';
import center from '../utils/center';
import identity from '../utils/identity';
import getLabelTransform from '../utils/labelTransform';
import ORIENT from '../constants/orientation';
import toString from '../utils/toString';
import { SharedAxisProps, AxisOrientation, TickFormatter } from '../types';

export type AxisProps<Input> = SharedAxisProps<Input> & {
  orientation: AxisOrientation;
};

export default function Axis<Input>({
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
}: AxisProps<Input>) {
  let values = scale.ticks ? scale.ticks(numTicks) : scale.domain();
  if (tickValues) values = tickValues;
  let format: TickFormatter<Input> = scale.tickFormat ? scale.tickFormat() : toString;
  if (tickFormat) format = tickFormat;

  const range = scale.range();
  const range0 = range[0] + 0.5 - rangePadding;
  const range1 = range[range.length - 1] + 0.5 + rangePadding;

  const horizontal = orientation !== ORIENT.left && orientation !== ORIENT.right;
  const isLeft = orientation === ORIENT.left;
  const isTop = orientation === ORIENT.top;
  const tickSign = isLeft || isTop ? -1 : 1;

  const position = (scale.bandwidth ? center : identity)(scale.copy());

  const axisFromPoint = new Point({
    x: horizontal ? range0 : 0,
    y: horizontal ? 0 : range0,
  });
  const axisToPoint = new Point({
    x: horizontal ? range1 : 0,
    y: horizontal ? 0 : range1,
  });

  let tickLabelFontSize = 10; // track the max tick label size to compute label offset

  if (children) {
    return (
      <Group className={cx('vx-axis', axisClassName)} top={top} left={left}>
        {children({
          axisFromPoint,
          axisToPoint,
          horizontal,
          tickSign,
          numTicks,
          label,
          rangePadding,
          tickLength,
          tickFormat: format,
          tickPosition: position,
          ticks: values.map((value, index) => {
            const from = new Point({
              x: horizontal ? position(value) : 0,
              y: horizontal ? 0 : position(value),
            });
            const to = new Point({
              x: horizontal ? position(value) : tickSign * tickLength,
              y: horizontal ? tickLength * tickSign : position(value),
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
        const tickFromPoint = new Point({
          x: horizontal ? position(val) : 0,
          y: horizontal ? 0 : position(val),
        });
        const tickToPoint = new Point({
          x: horizontal ? position(val) : tickSign * tickLength,
          y: horizontal ? tickLength * tickSign : position(val),
        });

        const tickLabelPropsObj = tickLabelProps(val, index);
        tickLabelFontSize = Math.max(
          tickLabelFontSize,
          (typeof tickLabelPropsObj.fontSize === 'number' && tickLabelPropsObj.fontSize) || 0,
        );

        const tickYCoord = tickToPoint.y + (horizontal && !isTop ? tickLabelFontSize : 0);
        const formattedValue = format(val, index);
        return (
          <Group
            key={`vx-tick-${val}-${index}`}
            className={cx('vx-axis-tick', tickClassName)}
            transform={tickTransform}
          >
            {!hideTicks && <Line from={tickFromPoint} to={tickToPoint} stroke={tickStroke} />}
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
