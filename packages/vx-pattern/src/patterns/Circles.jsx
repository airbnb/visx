import React from 'react';
import PropTypes from 'prop-types';
import cxx from 'classnames';
import Pattern from './Pattern';

/**
 * Creates an array of cirlces for a list of corners
 * in the format [[cornerX, cornerY], ...]
 */
export function createCircles({
  corners,
  id,
  radius,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  className,
}) {
  return corners.map(([cornerX, cornerY]) => (
    <circle
      key={`${id}-complement-${cornerX}-${cornerY}`}
      className={cxx('vx-pattern-circle vx-pattern-circle-complement', className)}
      cx={cornerX}
      cy={cornerY}
      r={radius}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
    />
  ));
}

PatternCircles.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  radius: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
  complement: PropTypes.bool,
  background: PropTypes.string,
};

export default function PatternCircles({
  id,
  width,
  height,
  radius = 2,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  background,
  complement = false,
  className,
}) {
  let corners;
  if (complement) {
    corners = [[0, 0], [0, height], [width, 0], [width, height]];
  }
  return (
    <Pattern id={id} width={width} height={height}>
      {!!background && <rect width={width} height={height} fill={background} />}
      <circle
        className={cxx('vx-pattern-circle', className)}
        cx={width / 2}
        cy={height / 2}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {complement &&
        createCircles({
          corners,
          id,
          radius,
          fill,
          stroke,
          strokeWidth,
          strokeDasharray,
        })}
    </Pattern>
  );
}
