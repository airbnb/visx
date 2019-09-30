import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pattern from './Pattern';
import Orientation from '../constants';

function pathForOrientation({ height, orientation }) {
  let path;

  switch (orientation) {
    case Orientation.vertical:
      path = `M ${height / 2}, 0 l 0, ${height}`;
      break;
    case Orientation.horizontal:
      path = `M 0,${height / 2} l ${height},0`;
      break;
    case Orientation.diagonal:
      path = `M 0,${height} l ${height},${-height} M ${-height / 4},${height / 4} l ${height /
        2},${-height / 2}
             M ${(3 / 4) * height},${(5 / 4) * height} l ${height / 2},${-height / 2}`;
      break;
    default:
      path = `M ${height / 2}, 0 l 0, ${height}`;
  }

  return path;
}

export default function PatternLines({
  id,
  width,
  height,
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap = 'square',
  shapeRendering = 'auto',
  orientation = ['vertical'],
  background,
  className,
}) {
  const orientations = Array.isArray(orientation) ? orientation : [orientation];

  return (
    <Pattern id={id} width={width} height={height}>
      {!!background && (
        <rect
          className={cx('vx-pattern-line-background')}
          width={width}
          height={height}
          fill={background}
        />
      )}
      {orientations.map((o, i) => {
        return (
          <path
            key={`vx-${id}-line-${o}-${i}`}
            className={cx('vx-pattern-line', className)}
            d={pathForOrientation({ orientation: o, height })}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap={strokeLinecap}
            shapeRendering={shapeRendering}
          />
        );
      })}
    </Pattern>
  );
}

PatternLines.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  background: PropTypes.string,
  stroke: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  strokeDasharray: PropTypes.string,
  className: PropTypes.string,
  strokeLinecap: PropTypes.string,
  shapeRendering: PropTypes.string,
  orientation: PropTypes.array,
};
