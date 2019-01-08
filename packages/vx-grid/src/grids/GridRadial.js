import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { LineRadial, Arc } from '@vx/shape';
import { Group } from '@vx/group';

const propTypes = {
  /**
   * If specified, the arc of each radial grid line will have this thickness, useful for fills.
   */
  arcThickness: PropTypes.number,
  /**
   * The class name applied to the entire grid group.
   */
  className: PropTypes.string,
  /**
   * The end angle of the arc of radial grid lines.
   */
  endAngle: PropTypes.number,
  /**
   * The color applied to the fill of the radial lines.
   */
  fill: PropTypes.string,
  /**
   * A left pixel offset applied to the entire grid group.
   */
  left: PropTypes.number,
  /**
   * The class name applied to all radial lines.
   */
  lineClassName: PropTypes.string,
  /**
   * Style object set as the radial line path style attribute.
   */
  lineStyle: PropTypes.object,
  /**
   * The number of ticks wanted for the grid (note this is approximate due to d3's algorithm)
   */
  numTicks: PropTypes.number,
  /**
   * A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
   * scale function used to generate the radius of radial lines.
   */
  scale: PropTypes.func.isRequired,
  /**
   * The start angle of the arc of radial grid lines.
   */
  startAngle: PropTypes.number,
  /**
   * The color applied to the stroke of the radial lines.
   */
  stroke: PropTypes.string,
  /**
   * The pixel value for the width of the radial lines.
   */
  strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The pattern of dashes in the stroke.
   */
  strokeDasharray: PropTypes.string,
  /**
   * An array of values that determine the number and values of the ticks. Falls
   * back to `scale.ticks()` or `.domain()`.
   */
  tickValues: PropTypes.array,
  /**
   * A top pixel offset applied to the entire grid group.
   */
  top: PropTypes.number
};

export default function GridRadial({
  arcThickness,
  className,
  endAngle = 2 * Math.PI,
  fill = 'transparent',
  left = 0,
  lineClassName,
  lineStyle,
  numTicks = 10,
  scale,
  startAngle = 0,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  tickValues,
  top = 0,
  ...restProps
}) {
  let radii = scale.ticks ? scale.ticks(numTicks) : scale.domain();
  if (tickValues) radii = tickValues;

  const innerRadius = Math.min(...scale.domain());

  return (
    <Group className={cx('vx-grid-radial', className)} top={top} left={left}>
      {radii.map((radius, i) => (
        <Arc
          key={`radial-grid-${radius}-${i}`}
          className={lineClassName}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={scale(arcThickness ? radius - arcThickness : innerRadius)}
          outerRadius={scale(radius)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={lineStyle}
          {...restProps}
        />
      ))}
    </Group>
  );
}

GridRadial.propTypes = propTypes;
