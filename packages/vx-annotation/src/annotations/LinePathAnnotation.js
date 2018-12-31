import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';

const identity = x => x;

LinePathAnnotation.propTypes = {
  /**
   * A top pixel offset applied to the entire bar group.
   */
  top: PropTypes.number,
  /**
   * A left pixel offset applied to the entire bar group.
   */
  left: PropTypes.number,
  /**
   * An array of points describing the line path.
   */
  points: PropTypes.array,
  /**
   * The color of the line.
   */
  stroke: PropTypes.string,
  /**
   * The pixel width of the line.
   */
  strokeWidth: PropTypes.number,
  /**
   * Add a class name to the line path.
   */
  className: PropTypes.string,
  /**
   * The text for your label.
   */
  label: PropTypes.string,
  /**
   * The label's textAnchor.
   */
  labelAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
  /**
   * The x-coordinate shift to the label.
   */
  labelDx: PropTypes.number,
  /**
   * The y-coordinate shift to the label
   */
  labelDy: PropTypes.number,
  /**
   * The color of label. Defaults to *props*.**stroke**.
   */
  labelFill: PropTypes.string,
  /**
   * The font size of the label text.
   */
  labelFontSize: PropTypes.number,
  /**
   * The color of the label.
   */
  labelStroke: PropTypes.string,
  /**
   * The stroke width of the label text.
   */
  labelStrokeWidth: PropTypes.number,
  /**
   * The label's SVG [paint-order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/paint-order).
   */
  labelPaintOrder: PropTypes.string
};

export default function LinePathAnnotation({
  top = 0,
  left = 0,
  points = [],
  stroke = 'black',
  strokeWidth = 1,
  className,
  label,
  labelAnchor = 'middle',
  labelDx = 0,
  labelDy = 0,
  labelFill,
  labelFontSize = 10,
  labelStroke = 'white',
  labelStrokeWidth = 3,
  labelPaintOrder = 'stroke'
}) {
  const endPoint = points[points.length - 1];
  return (
    <Group className="vx-line-path-annotation-group" top={top} left={left}>
      <LinePath
        className={cx('vx-line-path-annotation', className)}
        data={points}
        x={p => p.x}
        y={p => p.y}
        xScale={identity}
        yScale={identity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && (
        <text
          x={endPoint.x}
          y={endPoint.y}
          dx={labelDx}
          dy={labelDy}
          fontSize={labelFontSize}
          fill={labelFill || stroke}
          stroke={labelStroke}
          strokeWidth={labelStrokeWidth}
          textAnchor={labelAnchor}
          paintOrder={labelPaintOrder}
        >
          {label}
        </text>
      )}
    </Group>
  );
}
