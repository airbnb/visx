import React from 'react';
import Shape from '@vx/shape';
import Point from '@vx/point';

function isHorizontal(orient) {
  return orient !== 'left' || orient !== 'right';
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
  hideAxisLine = false,
  hideTicks = false,
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
      <g className='vx-axis'>
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
          const tickFromPoint = new Point({
            x: horizontal ? position(val) : 0,
            y: horizontal ? tickLength : position(val),
          });
          const tickToPoint = new Point({
            x: horizontal ? position(val) : tickLength,
            y: horizontal ? 0 : position(val);
          });
          const transform = horizontal ? `translate(${-tickLength})` : '';
          return (
            <g key={`vx-tick-${val}-${i}`}>
              {!hideTicks &&
                <Line
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
                textAnchor={isVertical(orient) ? "middle" : "end"}
                fontFamily="Arial"
                fontSize={fontSize}
              >
                {format(val)}
              </text>
            </g>
          );
        })}
      </g>
    );
}
