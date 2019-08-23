import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

VoronoiPolygon.propTypes = {
  polygon: PropTypes.arrayOf(PropTypes.array),
  className: PropTypes.string,
  children: PropTypes.func,
};

export default function VoronoiPolygon({ polygon, className, children, ...restProps }) {
  if (!polygon) return null;
  const path = `M${polygon.join('L')}Z`;
  if (children) return children({ path, polygon });
  return <path className={cx('vx-voronoi-polygon', className)} d={path} {...restProps} />;
}
