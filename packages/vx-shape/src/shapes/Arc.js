import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { arc as d3Arc } from 'd3-shape';

Arc.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
  children: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  centroid: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  innerRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  outerRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  cornerRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  startAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  endAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  padRadius: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
};

const isDefined = _ => typeof _ !== 'undefined';

export default function Arc({
  className,
  data,
  centroid,
  innerRadius,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  children,
  innerRef,
  ...restProps
}) {
  const arc = d3Arc();
  if (isDefined(centroid)) arc.centroid(centroid);
  if (isDefined(innerRadius)) arc.innerRadius(innerRadius);
  if (isDefined(outerRadius)) arc.outerRadius(outerRadius);
  if (isDefined(cornerRadius)) arc.cornerRadius(cornerRadius);
  if (isDefined(startAngle)) arc.startAngle(startAngle);
  if (isDefined(endAngle)) arc.endAngle(endAngle);
  if (isDefined(padAngle)) arc.padAngle(padAngle);
  if (isDefined(padRadius)) arc.padRadius(padRadius);
  if (children) return children({ path: arc });
  return <path ref={innerRef} className={cx('vx-arc', className)} d={arc(data)} {...restProps} />;
}
