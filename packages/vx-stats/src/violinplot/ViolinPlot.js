import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { scaleLinear } from '@vx/scale';
import { line, curveCardinal } from 'd3-shape';

ViolinPlot.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  count: PropTypes.func,
  value: PropTypes.func,
  valueScale: PropTypes.func,
  horizontal: PropTypes.bool,
  children: PropTypes.func
};

export default function ViolinPlot({
  left = 0,
  top = 0,
  className,
  data,
  width,
  count = d => d.count,
  value = d => d.value,
  valueScale,
  horizontal,
  children,
  ...restProps
}) {
  const center = (horizontal ? top : left) + width / 2;
  const binCounts = data.map(bin => bin.count);
  const widthScale = scaleLinear({
    rangeRound: [0, width / 2],
    domain: [0, Math.max(...binCounts)]
  });

  let path = '';

  if (horizontal) {
    const topCurve = line()
      .x(d => valueScale(value(d)))
      .y(d => center - widthScale(count(d)))
      .curve(curveCardinal);

    const bottomCurve = line()
      .x(d => valueScale(value(d)))
      .y(d => center + widthScale(count(d)))
      .curve(curveCardinal);

    const topCurvePath = topCurve(data);
    const bottomCurvePath = bottomCurve([...data].reverse());
    path = `${topCurvePath} ${bottomCurvePath.replace('M', 'L')} Z`;
  } else {
    const rightCurve = line()
      .x(d => center + widthScale(count(d)))
      .y(d => valueScale(value(d)))
      .curve(curveCardinal);

    const leftCurve = line()
      .x(d => center - widthScale(count(d)))
      .y(d => valueScale(value(d)))
      .curve(curveCardinal);

    const rightCurvePath = rightCurve(data);
    const leftCurvePath = leftCurve([...data].reverse());
    path = `${rightCurvePath} ${leftCurvePath.replace('M', 'L')} Z`;
  }
  if (children) return children({ path });
  return <path className={cx('vx-violin', className)} d={path} {...restProps} />;
}
