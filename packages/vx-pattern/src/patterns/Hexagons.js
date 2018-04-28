import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Path from './Path';

export default function PatternHexagons({
  id,
  width,
  height,
  path,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap,
  shapeRendering,
  background,
  className,
  size = 3
}) {
  const s = Math.sqrt(size);
  return (
    <Path
      className={cx('vx-pattern-hexagon', className)}
      path={`M ${height},0 l ${height},0 l ${height / 2},${height * s / 2} l ${-height /
        2},${height * s / 2} l ${-height},0 l ${-height / 2},${-height * s / 2} Z M 0,${height *
        s /
        2} l ${height / 2},0 M ${3 * height},${height * s / 2} l ${-height / 2},0`}
      id={id}
      width={size}
      height={s}
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

PatternHexagons.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  size: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string
};
