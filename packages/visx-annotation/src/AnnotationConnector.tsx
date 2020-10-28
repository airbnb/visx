import React from 'react';
import cx from 'classnames';

export type AnnotationConnectorProps = {
  /** Optional className to apply to container in addition to 'visx-annotation-connector'. */
  className?: string;
  /** x position of the subject. */
  x: number;
  /** y position of the subject. */
  y: number;
  /** x delta of the label from the subject. */
  dx: number;
  /** y delta of the label from the subject. */
  dy: number;
  /** Connector type. */
  type?: 'line' | 'elbow';
  /** Color of the connector line. */
  stroke?: string;
  /** Optional additional props. */
  pathProps?: React.SVGProps<SVGPathElement>;
};

export default function AnnotationConnector({
  className,
  x,
  y,
  dx,
  dy,
  type = 'elbow',
  stroke = '#222',
  pathProps,
}: AnnotationConnectorProps) {
  const x0 = x;
  const y0 = y;
  let x1: number = x; // only used with elbow type
  let y1: number = y;
  const x2 = x + dx;
  const y2 = y + dy;

  if (type === 'elbow') {
    // if dx < dy, find the intesection of y=x or y=-x from subject, with vertical line to label
    if (Math.abs(dx) <= Math.abs(dy)) {
      // target line is vertical x = x2
      x1 = x2;
      // intersection with y=x line (if dy > 0) or y=x (if dy < 0)
      const sign = dy > 0 ? 1 : -1;
      y1 = y0 + sign * Math.abs(x1 - x0);
    }
    // if dx > dy, find the intesection of y=x or y=-x from subject, with horizontal line to label
    else {
      // target line is horizontal y = y2
      y1 = y2;
      // find intersection with y=-x line (if dx > 0) or y=x (if dx < 0)
      const sign = dx > 0 ? 1 : -1;
      x1 = x0 + sign * Math.abs(y1 - y0);
    }
  }

  return (
    <path
      className={cx('visx-annotation-connector', className)}
      strokeWidth={1}
      stroke={stroke}
      fill="transparent"
      pointerEvents="none"
      d={`M${x0},${y0}${type === 'elbow' ? `L${x1},${y1}` : ''}L${x2},${y2}`}
      {...pathProps}
    />
  );
}
