import React from 'react';
import cx from 'classnames';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Group from '@vx/group';
import ORIENT from '../constants/orientation';

function isHorizontal(orient) {
  return orient !== ORIENT.left && orient !== ORIENT.right;
}

function center(scale) {
  var offset = scale.bandwidth() / 2;
  if (scale.round()) offset = Math.round(offset);
  return function(d) {
    return scale(d) + offset;
  };
}

function identity(x) {
  return x;
}

export default function Axis({
  scale,
  orient,
  tickFormat,
  top = 0,
  left = 0,
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
    const fontSize = 10;

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
            stroke={{
              color: 'black',
            }}
          />
        }
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
          const transform = horizontal ? '' : `translate(${-tickLength})`;

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
