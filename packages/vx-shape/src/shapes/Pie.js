import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import additionalProps from '../util/additionalProps';

export default function Pie({
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
  pieSortValues,
  pieValue,
  children,
  ...restProps
}) {
  const path = d3Arc();
  path.innerRadius(innerRadius);
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
  const renderFunctionArg = {
    arcs,
    generatePathProps: (arc, index) => ({
      className: cx('vx-pie-arc', className),
      d: path(arc),
      ...additionalProps(restProps, {
        ...arc,
        index,
        centroid: centroid ? path.centroid(arc) : undefined
      })
    }),
    generateCentroid: arc => centroid && centroid(path.centroid(arc), arc)
  };
  return (
    <Group className="vx-pie-arcs-group" top={top} left={left}>
      {children
        ? children(renderFunctionArg)
        : arcs.map((arc, i) => {
            const pathProps = renderFunctionArg.generatePathProps(arc, i);
            return (
              <g key={`pie-arc-${i}`}>
                <path {...pathProps} />
                {renderFunctionArg.generateCentroid(arc)}
              </g>
            );
          })}
    </Group>
  );
}
