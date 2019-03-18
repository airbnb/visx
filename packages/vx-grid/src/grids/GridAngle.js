import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';
import { Point } from '@vx/point';

import polarToCartesian from '../utils/polarToCartesian';

const propTypes = {
  /**
   * The class name applied to the entire grid group.
   */
  className: PropTypes.string,
  /**
   * Radius which determines the start position of polar lines
   */
  innerRadius: PropTypes.number,
  /**
   * A left pixel offset applied to the entire grid group.
   */
  left: PropTypes.number,
  /**
   * The class name applied to all polar lines.
   */
  lineClassName: PropTypes.string,
  /**
   * Style object set as the polar line path style attribute.
   */
  lineStyle: PropTypes.object,
  /**
   * The number of ticks wanted for the grid. Note this is approximate due to d3's algorithm,
   * you can use tickValues for greater control
   */
  numTicks: PropTypes.number,
  /**
   * Radius which determines the end position of polar lines
   */
  outerRadius: PropTypes.number.isRequired,
  /**
   * A [d3](https://github.com/d3/d3-scale) or [vx](https://github.com/hshoff/vx/tree/master/packages/vx-scale)
   * scale function used to generate the angle of polar lines.
   */
  scale: PropTypes.func.isRequired,
  /**
   * The color applied to the stroke of the polar lines.
   */
  stroke: PropTypes.string,
  /**
   * The pixel value for the width of the polar lines.
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

export default function GridAngle({
  className,
  innerRadius = 0,
  left = 0,
  lineClassName,
  lineStyle,
  numTicks = 10,
  outerRadius,
  scale,
  stroke = '#eaf0f6',
  strokeDasharray,
  strokeWidth = 1,
  tickValues,
  top = 0,
  ...restProps
}) {
  let ticks = scale.ticks ? scale.ticks(numTicks) : scale.domain();
  if (tickValues) ticks = tickValues;
  return (
    <Group className={cx('vx-grid-angle', className)} top={top} left={left}>
      {ticks.map((tick, i) => {
        const angle = scale(tick) - Math.PI / 2;
        const fromPoint = new Point(polarToCartesian({ angle, radius: innerRadius }));
        const toPoint = new Point(polarToCartesian({ angle, radius: outerRadius }));
        return (
          <Line
            key={`polar-grid-${tick}-${i}`}
            className={lineClassName}
            from={fromPoint}
            to={toPoint}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={lineStyle}
            {...restProps}
          />
        );
      })}
    </Group>
  );
}

GridAngle.propTypes = propTypes;
