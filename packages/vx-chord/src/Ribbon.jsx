import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ribbon as d3ribbon } from 'd3-chord';

Ribbon.propTypes = {
  chord: PropTypes.object.isRequired,
  source: PropTypes.func,
  target: PropTypes.func,
  radius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  startAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  endAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  children: PropTypes.func,
  className: PropTypes.string,
};

export default function Ribbon({
  chord,
  source,
  target,
  radius,
  startAngle,
  endAngle,
  children,
  className,
  ...restProps
}) {
  const ribbon = d3ribbon();
  if (source) ribbon.source(source);
  if (target) ribbon.target(target);
  if (radius) ribbon.radius(radius);
  if (startAngle) ribbon.startAngle(startAngle);
  if (endAngle) ribbon.endAngle(endAngle);
  const path = ribbon(chord);
  if (children) return children({ path });

  return <path className={cx('vx-ribbon', className)} d={path} {...restProps} />;
}
