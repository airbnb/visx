import React from 'react';
import cx from 'classnames';
import { Point } from '@visx/point';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';

interface SimplePoint {
  x: number;
  y: number;
}

export type LinePathAnnotationProps = {
  /**
   * A top pixel offset applied to the entire bar group.
   */
  top?: number;
  /**
   * A left pixel offset applied to the entire bar group.
   */
  left?: number;
  /**
   * An array of points describing the line path.
   */
  points?: (Point | SimplePoint)[];
  /**
   * The color of the line.
   */
  stroke?: string;
  /**
   * The pixel width of the line.
   */
  strokeWidth?: number;
  /**
   * Add a class name to the line path.
   */
  className?: string;
  /**
   * The text for your label.
   */
  label?: string;
  /**
   * The label's textAnchor.
   */
  labelAnchor?: 'start' | 'middle' | 'end';
  /**
   * The x-coordinate shift to the label.
   */
  labelDx?: number;
  /**
   * The y-coordinate shift to the label
   */
  labelDy?: number;
  /**
   * The color of label. Defaults to *props*.**stroke**.
   */
  labelFill?: string;
  /**
   * The font size of the label text.
   */
  labelFontSize?: number;
  /**
   * The color of the label.
   */
  labelStroke?: string;
  /**
   * The stroke width of the label text.
   */
  labelStrokeWidth?: number;
  /**
   * The label's SVG [paint-order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/paint-order).
   */
  labelPaintOrder?: string;
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
  labelPaintOrder = 'stroke',
}: LinePathAnnotationProps) {
  const endPoint = points[points.length - 1];
  return (
    <Group className="visx-line-path-annotation-group" top={top} left={left}>
      <LinePath<Point | SimplePoint>
        className={cx('visx-line-path-annotation', className)}
        data={points}
        x={(p) => p.x}
        y={(p) => p.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && endPoint && (
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
