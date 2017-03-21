import React from 'react';
import cx from 'classnames';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Group from '@vx/group';
import identity from '../utils/identity';
import center from '../utils/center';
import isHorizontal from '../utils/isHorizontal';

export default function Axis({
  scale,
  orient,
  tickFormat,
  top = 0,
  left = 0,
  stroke = 'black',
  strokeWidth = 1,
  strokeDasharray,
  tickStroke = 'black',
  fontSize = 10,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  className,
}) {
    const values = scale.ticks ? scale.ticks() : scale.domain();
    let format = scale.tickFormat ? scale.tickFormat() : identity;
    if (tickFormat) format = tickFormat;

    const range = scale.range();
    const range0 = range[0] + 0.5;
    const range1 = range[range.length - 1] + 0.5;

    const tickLength = 8;
    const tickPadding = 2;

    const position = (scale.bandwidth ? center : identity)(scale.copy());
    const horizontal = isHorizontal(orient);

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
        {values.map((val, i) => {
          if (hideZero && val === 0) return null;

          const transform = horizontal ? '' : `translate(${-tickLength})`;

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
                  transform={transform}
                  stroke={tickStroke || stroke}
                />
              }
              <text
                x={tickFromPoint.x}
                y={tickToPoint.y}
                dy={horizontal ? tickLength + tickPadding + fontSize : fontSize / 3}
                dx={horizontal ? 0 : -tickPadding - (hideTicks ? tickPadding : tickLength)}
                textAnchor={horizontal ? "middle" : "end"}
                fontFamily="Arial"
                fontSize={fontSize}
              >
                {format(val)}
              </text>
            </Group>
          );
        })}
      </Group>
    );
}
