import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import GridAngle from './GridAngle';
import GridRadial from './GridRadial';

GridPolar.propTypes = {
  /**
   * If specified, the arc of each radial grid line will have this thickness, useful for fills.
   */
  arcThickness: PropTypes.number,
  /**
   * The class name applied to the entire grid group.
   */
  className: PropTypes.string,
  /**
   * The class name applied to the angle grid group.
   */
  classNameAngle: PropTypes.string,
  /**
   * The class name applied to all radial lines.
   */
  classNameRadial: PropTypes.string,
  /**
   * The end angle of the arc of radial grid lines.
   */
  endAngle: PropTypes.number,
  /**
   * The color applied to the fill of the radial lines.
   */
  fillRadial: PropTypes.string,
  /**
   * Radius which determines the start position of polar lines
   */
  innerRadius: PropTypes.number,
  /**
   * A left pixel offset applied to the entire grid group.
   */
  left: PropTypes.number,
  /**
   * Classname applied to angle line path.
   */
  lineClassNameAngle: PropTypes.string,
  /**
   * Classname applied to radial line path.
   */
  lineClassNameRadial: PropTypes.string,
  /**
   * Style object set as the angle line path style attribute.
   */
  lineStyleAngle: PropTypes.object,
  /**
   * Style object set as the radius line path style attribute.
   */
  lineStyleRadial: PropTypes.object,
  /**
   * The number of angle ticks wanted for the grid. Note this is approximate due to d3's algorithm,
   * you can use tickValues for greater control
   */
  numTicksAngle: PropTypes.number,
  /**
   * The number of radial ticks wanted for the grid. Note this is approximate due to d3's algorithm,
   * you can use tickValues for greater control
   */
  numTicksRadial: PropTypes.number,
  /**
   * Radius which determines the end position of polar lines
   */
  outerRadius: PropTypes.number.isRequired,
  /**
   * A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
   * scale function used to generate the angle of polar lines.
   */
  scaleAngle: PropTypes.func.isRequired,
  /**
   * A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
   * scale function used to generate the radius of radial lines.
   */
  scaleRadial: PropTypes.func.isRequired,
  /**
   * The start angle of the arc of radial grid lines.
   */
  startAngle: PropTypes.number,
  /**
   * The color applied to the stroke of the angle lines.
   */
  strokeAngle: PropTypes.string,
  /**
   * The color applied to the stroke of the radial lines.
   */
  strokeRadial: PropTypes.string,
  /**
   * The pattern of dashes for angle line stroke.
   */
  strokeDasharrayAngle: PropTypes.string,
  /**
   * The pattern of dashes for angle radial stroke.
   */
  strokeDasharrayRadial: PropTypes.string,
  /**
   * The pixel value for the width of the angle lines.
   */
  strokeWidthAngle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The pixel value for the width of the radial lines.
   */
  strokeWidthRadial: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * An array of values that determine the number and values of the angle ticks. Falls
   * back to `scale.ticks()` or `.domain()`.
   */
  tickValuesAngle: PropTypes.array,
  /**
   * An array of values that determine the number and values of the radial ticks. Falls
   * back to `scale.ticks()` or `.domain()`.
   */
  tickValuesRadial: PropTypes.array,
  /**
   * A top pixel offset applied to the entire grid group.
   */
  top: PropTypes.number
};

export default function GridPolar({
  arcThickness,
  className,
  classNameAngle,
  classNameRadial,
  endAngle,
  fillRadial,
  innerRadius,
  left,
  lineClassNameAngle,
  lineClassNameRadial,
  lineStyleAngle,
  lineStyleRadial,
  numTicksAngle,
  numTicksRadial,
  outerRadius,
  scaleAngle,
  scaleRadial,
  startAngle,
  strokeAngle,
  strokeRadial,
  strokeWidthAngle,
  strokeWidthRadial,
  strokeDasharrayAngle,
  strokeDasharrayRadial,
  tickValuesAngle,
  tickValuesRadial,
  top
}) {
  return (
    <Group className={cx('vx-grid-polar', className)} top={top} left={left}>
      <GridAngle
        className={classNameAngle}
        innerRadius={innerRadius}
        lineClassName={lineClassNameAngle}
        lineStyle={lineStyleAngle}
        numTicks={numTicksAngle}
        outerRadius={outerRadius}
        scale={scaleAngle}
        stroke={strokeAngle}
        strokeWidth={strokeWidthAngle}
        strokeDasharray={strokeDasharrayAngle}
        tickValues={tickValuesAngle}
      />
      <GridRadial
        arcThickness={arcThickness}
        className={classNameRadial}
        endAngle={endAngle}
        fill={fillRadial}
        lineClassName={lineClassNameRadial}
        lineStyle={lineStyleRadial}
        numTicks={numTicksRadial}
        scale={scaleRadial}
        startAngle={startAngle}
        stroke={strokeRadial}
        strokeWidth={strokeWidthRadial}
        strokeDasharray={strokeDasharrayRadial}
        tickValues={tickValuesRadial}
      />
    </Group>
  );
}
