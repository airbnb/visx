import React from 'react';
import classnames from 'classnames';
import { Group } from '@vx/group';
import { scaleLinear } from '@vx/scale';
import { line, curveCardinal } from 'd3-shape';
import additionalProps from '../util/additionalProps';

export default function ViolinPlot({
  left = 0,
  top = 0,
  className,
  binData,
  stroke = 'black',
  fill = 'rgba(0,0,0,0.3)',
  opacity,
  strokeWidth,
  width,
  valueScale,
  strokeDasharray,
  horizontal,
  ...restProps
}) {
  const center = (horizontal ? top : left) + width / 2;
  const binCounts = binData.map(bin => bin.count);
  const widthScale = scaleLinear({
    rangeRound: [0, width / 2],
    domain: [0, Math.max(...binCounts)]
  });

  let path = '';
  if (horizontal) {
    const topCurve = line()
      .x(d => valueScale(d.value))
      .y(d => center - widthScale(d.count))
      .curve(curveCardinal);

    const bottomCurve = line()
      .x(d => valueScale(d.value))
      .y(d => center + widthScale(d.count))
      .curve(curveCardinal);

    const topCurvePath = topCurve(binData);
    const bottomCurvePath = bottomCurve([...binData].reverse());
    path = `${topCurvePath} ${bottomCurvePath.replace('M', 'L')} Z`;
  } else {
    const rightCurve = line()
      .x(d => center + widthScale(d.count))
      .y(d => valueScale(d.value))
      .curve(curveCardinal);

    const leftCurve = line()
      .x(d => center - widthScale(d.count))
      .y(d => valueScale(d.value))
      .curve(curveCardinal);

    const rightCurvePath = rightCurve(binData);
    const leftCurvePath = leftCurve([...binData].reverse());
    path = `${rightCurvePath} ${leftCurvePath.replace('M', 'L')} Z`;
  }
  return (
    <Group className={classnames('vx-violin', className)}>
      <path
        d={path}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        fill={fill}
        fillOpacity={opacity}
        {...additionalProps(restProps, binData)}
      />
    </Group>
  );
}
