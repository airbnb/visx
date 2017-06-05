import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import additionalProps from '../util/additionalProps';

const data = [
  {"age":"<5","population":2704659},
  {"age":"5-13","population":4499890},
  {"age":"14-17","population":2159981},
  {"age":"18-24","population":3853788},
  {"age":"25-44","population":14106543},
  {"age":"45-64","population":8819342},
  {"age":"≥65","population":612463}
];

export default function Arc({
  className = '',
  top = 0,
  left = 0,
  data,
  centroid,
  innerRadius = 0,
  outerRadius,
  cornerRadius,
  startAngle = 0,
  endAngle,
  padAngle,
  padRadius,
  pieSort,
  pieValue,
  ...restProps
}) {
  const path = d3Arc();
  path.innerRadius(innerRadius);
  if (outerRadius) path.outerRadius(outerRadius);
  if (cornerRadius) path.cornerRadius(cornerRadius);
  if (padRadius) path.padRadius(padRadius);
  const pie = d3Pie();
  if (pieSort) pie.sort(pieSort);
  if (pieValue) pie.value(pieValue);
  if (padAngle) pie.padAngle(padAngle);
  const arcs = pie(data);
  return (
    <Group className="vx-arcs-group" top={top} left={left}>
      {arcs.map((arc, i) => {
        return (
          <g key={`arc-${i}`}>
            <path
              className={cx('vx-arc', className)}
              d={path(arc)}
              {...additionalProps(restProps, arc)}
            />
            {centroid &&
              centroid(path.centroid(arc), arc)
            }
          </g>
        );
      })}
    </Group>
  );
}