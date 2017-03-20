import React from 'react';
import cx from 'classnames';
import { line } from 'd3-shape';
import Curve from '@vx/curve';

const defaultStroke = {
  color: 'steelblue',
  width: 1,
  dasharray: '',
};

const defaultPoint = {
  fill: defaultStroke.color,
  r: 4,
  stroke: {
    width: 2,
    color: 'white',
    dasharray: '',
  }
};

export default function LinePath({
  data,
  xScale,
  yScale,
  x,
  y,
  defined,
  className,
  pointClassName,
  stroke = defaultStroke,
  fill = 'none',
  curve = Curve.linear,
  points = false,
  point = defaultPoint,
}) {
  stroke = Object.assign(defaultStroke, stroke);
  point = Object.assign(defaultPoint, point);
  const path = line()
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)))
    .defined(defined || (d => y(d) && x(d)))
    .curve(curve);
  return (
    <g>
      <path
        className={cx('vx-linepath', className)}
        d={path(data)}
        stroke={stroke.color}
        strokeWidth={stroke.width}
        strokeDasharray={stroke.dasharray}
        fill={fill}
      />
      {points &&
        <g className='vx-linepath-points'>
          {data.map((d,i) => {
            return (
              <circle
                key={`point-${d}-${i}`}
                className={cx('vx-linepath-point', pointClassName)}
                cx={xScale(x(d))}
                cy={yScale(y(d))}
                r={point.r}
                fill={point.fill}
                stroke={point.stroke.color}
                strokeWidth={point.stroke.width}
                strokeDasharray={point.stroke.dasharray}
              />
            );
          })}
        </g>
      }
    </g>
  );
}
