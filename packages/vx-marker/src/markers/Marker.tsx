import React from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Group } from '@vx/group';

export type MarkerProps = {
  /** Top offset applied to container g element. */
  top?: number;
  /** Left offset applied to container g element. */
  left?: number;
  /** x,y coordinates of the marker line start point. If a label is passed its origin is set to this position. */
  from?: {
    x?: number;
    y?: number;
  };
  /** x,y coordinates of the marker line end point. */
  to?: {
    x?: number;
    y?: number;
  };
  /** stroke color of the marker line. */
  stroke?: string;
  /** strokeWidth of the marker line. */
  strokeWidth?: number;
  /** strokeDasharray attribute of the marker line. */
  strokeDasharray?: string;
  /** transform attribute applied to the marker line. */
  transform?: string;
  /** Label with origin at the specified `from` cordinates. */
  label?: React.ReactNode;
  /** textAnchor attribute applied to label text element. */
  labelAnchor?: string;
  /** dx attribute applied to label text element. */
  labelDx?: string | number;
  /** dy attribute applied to label text element. */
  labelDy?: string | number;
  /** fill color applied to label text element. */
  labelFill?: string;
  /** stroke color applied to label text element. */
  labelStroke?: string;
  /** strokeWidth attribute applied to label text element. */
  labelStrokeWidth?: string | number;
  /** fontSize attribute applied to label text element. */
  labelFontSize?: string | number;
  /** paintOrder attribute applied to label text element. */
  labelPaintOrder?: string;
  /** className to apply to line element. */
  className?: string;
};

export default function Marker({
  top = 0,
  left = 0,
  from,
  to,
  stroke = 'magenta',
  strokeWidth = 2,
  strokeDasharray,
  transform,
  label,
  labelAnchor = 'left',
  labelDx = 0,
  labelDy = 0,
  labelFill,
  labelFontSize = 10,
  labelStroke = 'white',
  labelStrokeWidth = 3,
  labelPaintOrder = 'stroke',
  className,
}: MarkerProps) {
  return (
    <Group top={top} left={left}>
      <Line
        className={cx('vx-marker-line', className)}
        from={from}
        to={to}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        transform={transform}
      />
      {label && (
        <text
          x={from ? from.x : 0}
          y={from ? from.y : 0}
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
