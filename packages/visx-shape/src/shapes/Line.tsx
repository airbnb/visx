import type { Ref } from 'react';
import cx from 'classnames';
import type { AddSVGProps } from '../types';

interface Point {
  x?: number;
  y?: number;
}

export type LineProps = {
  /** className to apply to line element. */
  className?: string;
  /** reference to line element. */
  innerRef?: Ref<SVGLineElement>;
  /** fill color applied to line element. */
  fill?: string;
  /** Starting x,y point of the line. */
  from?: Point;
  /** Ending x,y point of the line. */
  to?: Point;
};

export default function Line({
  from = { x: 0, y: 0 },
  to = { x: 1, y: 1 },
  fill = 'transparent',
  className,
  innerRef,
  ...restProps
}: AddSVGProps<LineProps, SVGLineElement>) {
  const isRectilinear = from.x === to.x || from.y === to.y;
  return (
    <line
      ref={innerRef}
      className={cx('visx-line', className)}
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      fill={fill}
      shapeRendering={isRectilinear ? 'crispEdges' : 'auto'}
      {...restProps}
    />
  );
}
