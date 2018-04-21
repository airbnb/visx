import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import additionalProps from '../util/additionalProps';

const propTypes = {
  polygon: PropTypes.arrayOf(PropTypes.array)
};

export default function VoronoiPolygon({ polygon, className, ...restProps }) {
  if (!polygon) return null;
  const data = polygon.data;
  return (
    <path
      className={cx('vx-voronoi-polygon', className)}
      d={`M${polygon.join('L')}Z`}
      {...additionalProps(restProps, data)}
    />
  );
}

VoronoiPolygon.propTypes = propTypes;
