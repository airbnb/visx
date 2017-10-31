import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import { Group } from '@vx/group';
import center from '../utils/center';
import identity from '../utils/identity';
import getLabelTransform from '../utils/labelTransform';
import ORIENT from '../constants/orientation';

const propTypes = {
  axisClassName: PropTypes.string,
  axisLineClassName: PropTypes.string,
  hideAxisLine: PropTypes.bool,
  hideTicks: PropTypes.bool,
  hideZero: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelOffset: PropTypes.number,
  labelProps: PropTypes.object,
  left: PropTypes.number,
  numTicks: PropTypes.number,
  orientation: PropTypes.oneOf([
    ORIENT.top,
    ORIENT.right,
    ORIENT.bottom,
    ORIENT.left,
  ]),
  rangePadding: PropTypes.number,
  scale: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  tickClassName: PropTypes.string,
  tickFormat: PropTypes.func,
  tickLabelProps: PropTypes.func,
  tickLength: PropTypes.number,
  tickStroke: PropTypes.string,
  tickTransform: PropTypes.string,
  tickValues: PropTypes.array,
  top: PropTypes.number,
  children: PropTypes.func,
};

export default function Axis({
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
    fill: 'black',
  },
  left = 0,
  numTicks = 10,
  orientation = ORIENT.bottom,
  rangePadding = 0,
  scale,
  stroke = 'black',
  strokeWidth = 1,
  strokeDasharray,
  tickClassName,
  tickFormat,
  tickLabelProps = (tickValue, index) => ({
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: 'black',
  }),
  tickLength = 8,
  tickStroke = 'black',
  tickTransform,
  tickValues,
  top = 0,
}) {
  let values = scale.ticks ? scale.ticks(numTicks) : scale.domain();
  if (tickValues) values = tickValues;
  let format = scale.tickFormat ? scale.tickFormat() : identity;
  if (tickFormat) format = tickFormat;

  const range = scale.range();
  const range0 = range[0] + 0.5 - rangePadding;
  const range1 = range[range.length - 1] + 0.5 + rangePadding;

  const horizontal =
    orientation !== ORIENT.left && orientation !== ORIENT.right;
  const isLeft = orientation === ORIENT.left;
  const isTop = orientation === ORIENT.top;
  const tickSign = isLeft || isTop ? -1 : 1;

  const position = (scale.bandwidth ? center : identity)(
    scale.copy(),
  );

  const axisFromPoint = new Point({
    x: horizontal ? range0 : 0,
    y: horizontal ? 0 : range0,
  });
  const axisToPoint = new Point({
    x: horizontal ? range1 : 0,
    y: horizontal ? 0 : range1,
  });

  let tickLabelFontSize = 10; // track the max tick label size to compute label offset

  if (!!children) {
    return (
      <Group
        className={cx('vx-axis', axisClassName)}
        top={top}
        left={left}
      >
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
    <Group
      className={cx('vx-axis', axisClassName)}
      top={top}
      left={left}
    >
      {values.map((val, index) => {
        if (hideZero && val === 0) return null;

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
          tickLabelPropsObj.fontSize || 0,
        );

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
                stroke={tickStroke || stroke}
              />
            )}
            <text
              x={tickToPoint.x}
              y={
                tickToPoint.y +
                (horizontal && !isTop ? tickLabelFontSize : 0)
              }
              {...tickLabelPropsObj}
            >
              {format(val, index)}
            </text>
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
        <text
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
        </text>
      )}
    </Group>
  );
}

Axis.propTypes = propTypes;
