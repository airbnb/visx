import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Path from './Path';

PatternHexagons.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  size: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  strokeLinecap: PropTypes.string,
  shapeRendering: PropTypes.string,
};

export default function PatternHexagons({
  id,
  height,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap,
  shapeRendering,
  background,
  className,
  size = 3,
}) {
  const sqrtSize = Math.sqrt(size);
  return (
    <Path
      className={cx('vx-pattern-hexagon', className)}
      path={`M ${height},0 l ${height},0 l ${height / 2},${(height * sqrtSize) / 2} l ${-height /
        2},${(height * sqrtSize) / 2} l ${-height},0 l ${-height / 2},${(-height * sqrtSize) /
        2} Z M 0,${(height * sqrtSize) / 2} l ${height / 2},0 M ${3 * height},${(height *
        sqrtSize) /
        2} l ${-height / 2},0`}
      id={id}
      width={size}
      height={sqrtSize}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeLinecap={strokeLinecap}
      shapeRendering={shapeRendering}
      background={background}
    />
  );
}
