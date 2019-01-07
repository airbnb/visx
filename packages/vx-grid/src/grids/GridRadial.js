import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { curveCardinal } from '@vx/curve';
import { LineRadial } from '@vx/shape';
import { Group } from '@vx/group';

const propTypes = {
  /**
   * A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
   * scale function whose domain determines the start and end points of generated radial arc lines.
   * e.g., domains of [-Math.PI, Math.PI] or [0, 2 * Math.PI] would generate full arcs whereas a
   * domain of [0, Math.PI] would generate a half arc
   */
  arcScale: PropTypes.func.isRequired,
  /**
   * The class name applied to the entire grid group.
   */
  className: PropTypes.string,
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
   * Number of points used for the radial line interpolation
   */
  numRadialPoints: PropTypes.number,
  /**
   * The number of ticks wanted for the grid (note this is approximate due to d3's algorithm)
   */
  numTicks: PropTypes.number,
  /**
   * A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
   * scale function used to generate the radius of radial lines.
   */
  radialScale: PropTypes.func.isRequired,
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
  arcScale,
  className,
  fill = 'transparent',
  left = 0,
  lineClassName,
  lineStyle,
  numTicks = 10,
  numRadialPoints = 50,
  radialScale,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  tickValues,
  top = 0,
  ...restProps
}) {
  let radii = radialScale.ticks ? radialScale.ticks(numTicks) : radialScale.domain();
  if (tickValues) radii = tickValues;

  const arcPathData = arcScale.ticks ? arcScale.ticks(numRadialPoints) : arcScale.domain();

  return (
    <Group className={cx('vx-grid-radial', className)} top={top} left={left}>
      {radii.map((radius, i) => (
        <LineRadial
          key={`radial-grid-${radius}-${i}`}
          className={lineClassName}
          curve={curveCardinal}
          data={arcPathData}
          angle={d => arcScale(d)}
          radius={() => radialScale(radius)}
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
