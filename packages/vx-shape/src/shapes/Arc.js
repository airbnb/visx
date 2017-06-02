import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import additionalProps from '../util/additionalProps';

export default function Arc({
  className = '',
  top = 0,
  left = 0,
  data,
  centroid,
  innerRadius,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  pieSort,
  pieValue,
  ...restProps
}) {
  const path = d3Arc();
  if (centroid) path.centroid(centroid);
  if (innerRadius) path.innerRadius(innerRadius);
  if (outerRadius) path.outerRadius(outerRadius);
  if (cornerRadius) path.cornerRadius(cornerRadius);
  if (startAngle) path.startAngle(startAngle);
  if (endAngle) path.endAngle(endAngle);
  if (padAngle) path.padAngle(padAngle);
  if (padRadius) path.padRadius(padRadius);
  const pie = d3Pie();
  if (pieSort) pie.sort(pieSort);
  if (pieValue) pie.value(pieValue);
  const arcs = pie(data);
  return (
    <Group className="vx-arcs-group" top={top} left={left}>
      {arcs.map((arc, i) => {
        const d = path(arc);
        return (
          <path
            key={`arc-${i}`}
            className={cx('vx-arc', className)}
            d={d.includes('NaN') ? '' : d}
            {...additionalProps(restProps, i)}
          />
        );
      })}
    </Group>
  );
}