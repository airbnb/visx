import React, { useContext } from 'react';
import cx from 'classnames';
import { AnnotationContextType } from '../types';
import AnnotationContext from '../context/AnnotationContext';

// @TODO
// add end marker support

export type AnnotationConnectorProps = Pick<AnnotationContextType, 'x' | 'y' | 'dx' | 'dy'> & {
  /** Optional className to apply to container in addition to 'visx-annotation-connector'. */
  className?: string;
  /** Connector type. */
  type?: 'line' | 'elbow';
  /** Color of the connector line. */
  stroke?: string;
  /** Optional additional props. */
  pathProps?: React.SVGProps<SVGPathElement>;
};

export default function AnnotationConnector({
  className,
  x: propsX,
  y: propsY,
  dx: propsDx,
  dy: propsDy,
  type = 'elbow',
  stroke = '#222',
  pathProps,
}: AnnotationConnectorProps) {
  // if props are provided, they take precedence over context
  const annotationContext = useContext(AnnotationContext);
  const x0 = propsX == null ? annotationContext.x ?? 0 : propsX;
  const y0 = propsY == null ? annotationContext.y ?? 0 : propsY;
  const dx = propsDx == null ? annotationContext.dx ?? 0 : propsDx;
  const dy = propsDy == null ? annotationContext.dy ?? 0 : propsDy;
  let x1: number = x0; // only used with elbow type
  let y1: number = y0;
  const x2 = x0 + dx;
  const y2 = y0 + dy;

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
