import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ribbon as d3ribbon } from 'd3-chord';

Ribbon.propTypes = {
  chord: PropTypes.object.isRequired,
  source: PropTypes.func,
  target: PropTypes.func,
  radius: PropTypes.func,
  startAngle: PropTypes.func,
  endAngle: PropTypes.func,
  children: PropTypes.func
};

export default function Ribbon({
  chord,
  source,
  target,
  radius,
  startAngle,
  endAngle,
  children,
  ...restProps
}) {
  const ribbon = d3ribbon();
  if (source) ribbon.source(source);
  if (target) ribbon.target(target);
  if (radius) ribbon.radius(radius);
  if (startAngle) ribbon.startAngle(startAngle);
  if (endAngle) ribbon.endAngle(endAngle);
  const path = ribbon(chord);
  if (!!children) return children({ path });
  return <path className={cx('vx-ribbon', className)} d={path} {...restProps} />;
}
