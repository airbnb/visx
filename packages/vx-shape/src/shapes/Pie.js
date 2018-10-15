import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';

Pie.propTypes = {
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  data: PropTypes.array,
  centroid: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  innerRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  outerRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  cornerRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  startAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  endAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  padRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  pieValue: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  pieSort: PropTypes.func,
  pieSortValues: PropTypes.func,
  children: PropTypes.func
};

export default function Pie({
  className,
  top,
  left,
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
  pieSortValues,
  pieValue,
  children,
  ...restProps
}) {
  const path = d3Arc();
  if (innerRadius) path.innerRadius(innerRadius);
  if (outerRadius) path.outerRadius(outerRadius);
  if (cornerRadius) path.cornerRadius(cornerRadius);
  if (padRadius) path.padRadius(padRadius);

  const pie = d3Pie();
  if (pieSort !== undefined) pie.sort(pieSort);
  if (pieSortValues !== undefined) pie.sortValues(pieSortValues);
  if (pieValue) pie.value(pieValue);
  if (padAngle != null) pie.padAngle(padAngle);
  if (startAngle != null) pie.startAngle(startAngle);
  if (endAngle != null) pie.endAngle(endAngle);

  const arcs = pie(data);

  if (children) return children({ arcs, path, pie });

  return (
    <Group className="vx-pie-arcs-group" top={top} left={left}>
      {arcs.map((arc, i) => {
        return (
          <g key={`pie-arc-${i}`}>
            <path className={cx('vx-pie-arc', className)} d={path(arc)} {...restProps} />
            {centroid && centroid(path.centroid(arc), arc)}
          </g>
        );
      })}
    </Group>
  );
}
