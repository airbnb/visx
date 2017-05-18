import React from 'react';
import cx from 'classnames';
import Shape from '@vx/shape';
import Point from '@vx/point';
import { Group } from '@vx/group';
import identity from '../utils/identity';
import center from '../utils/center';
import isHorizontal from '../utils/isHorizontal';
import isLeft from '../utils/isLeft';

export default function Axis({
  scale,
  orient,
  top = 0,
  left = 0,
  stroke = 'black',
  strokeWidth = 1,
  strokeDasharray,
  fontSize = 10,
  numTicks = 10,
  tickFormat,
  tickStroke = 'black',
  tickLength = 8,
  tickPadding = 2,
  tickOffset = 0,
  tickK = 1,
  tickTransform,
  tickTextAnchor = "start",
  tickTextFontFamily = 'Arial',
  tickTextFontSize = 10,
  tickTextFill = 'black',
  tickTextDx,
  tickTextDy,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  className,
  label = 'default label',
}) {
    const values = scale.ticks ? scale.ticks(numTicks) : scale.domain();
    let format = scale.tickFormat ? scale.tickFormat() : identity;
    if (tickFormat) format = tickFormat;

    const range = scale.range();
    const range0 = range[0] + 0.5;
    const range1 = range[range.length - 1] + 0.5;

    const horizontal = isHorizontal(orient);
    const transform = horizontal ? '' : `translate(${tickOffset})`;
    const position = (scale.bandwidth ? center : identity)(scale.copy());

    const axisFromPoint = new Point({
      x: horizontal ? range0 : 0,
      y: horizontal ? 0 : range0,
    });
    const axisToPoint = new Point({
      x: horizontal ? range1 : 0,
      y: horizontal ? 0 : range1,
    });

    return (
      <Group
        className={cx('vx-axis', className)}
        top={top}
        left={left}
      >
        {!hideAxisLine &&
          <Shape.Line
            from={axisFromPoint}
            to={axisToPoint}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
          />
        }
        {/** TODO: pass label props in */}
        <text
          textAnchor="middle"
          fontSize={tickTextFontSize}
          fill={tickTextFill}
          transform={horizontal ?  '' : `rotate(${tickK * 90})`}
          x={horizontal ? range1 / 2 : tickK * (range0 / 2)}
          y={horizontal ? tickK * (tickLength + tickOffset + fontSize + 14) : (orient == 'left' ? 1 : -1) * tickK * (tickLength + tickOffset + fontSize + 30)}
        >
          {label}
        </text>
        {values.map((val, i) => {
          if (hideZero && val === 0) return null;

          const tickFromPoint = new Point({
            x: horizontal ? position(val) : 0,
            y: horizontal ? tickLength : position(val),
          });
          const tickToPoint = new Point({
            x: horizontal ? position(val) : tickLength,
            y: horizontal ? 0 : position(val),
          });

          return (
            <Group
              key={`vx-tick-${val}-${i}`}
              className='vx-axis-ticks'
            >
              {!hideTicks &&
                <Shape.Line
                  from={tickFromPoint}
                  to={tickToPoint}
                  transform={tickTransform || transform}
                  stroke={tickStroke || stroke}
                />
              }
              <text
                x={tickFromPoint.x}
                y={tickToPoint.y}
                dy={tickTextDy}
                dx={tickTextDx}
                textAnchor={tickTextAnchor}
                fontFamily={tickTextFontFamily}
                fontSize={tickTextFontSize || fontSize}
                fill={tickTextFill}
              >
                {format(val)}
              </text>
            </Group>
          );
        })}
      </Group>
    );
}
