import React from 'react';
import cx from 'classnames';
import { arc as d3Arc, Arc as ArcType } from 'd3-shape';

export type ArcProps<Datum> = {
  /** className applied to path element. */
  className?: string;
  /** A Datum for which to generate an arc. */
  data?: Datum;
  /** Override render function override which is passed the configured arc generator as input. */
  children?: (args: { path: ArcType<any, Datum> }) => React.ReactNode;
  /** React RefObject passed to the path element. */
  innerRef?: React.Ref<SVGPathElement>;
  /** Number or accessor function which returns a number, which defines the arc innerRadius. */
  innerRadius?: (d: Datum) => number | number;
  /** Number or accessor function which returns a number, which defines the arc outerRadius. */
  outerRadius?: (d: Datum) => number | number;
  /** Number or accessor function which returns a number, which defines the arc cornerRadius. */
  cornerRadius?: (d: Datum) => number | number;
  /** Number or accessor function which returns a number, which defines the arc startAngle. */
  startAngle?: (d: Datum) => number | number;
  /** Number or accessor function which returns a number, which defines the arc endAngle. */
  endAngle?: (d: Datum) => number | number;
  /** Number or accessor function which returns a number, which defines the arc padAngle. */
  padAngle?: (d: Datum) => number | number;
  /** Number or accessor function which returns a number, which defines the arc padRadius. */
  padRadius?: (d: Datum) => number | number;
};

export default function Arc<Datum>({
  className,
  data,
  innerRadius,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  children,
  innerRef,
  ...restProps
}: ArcProps<Datum> & React.SVGProps<SVGPathElement>) {
  const arc = d3Arc<Datum>();
  if (innerRadius != null) arc.innerRadius(innerRadius);
  if (outerRadius != null) arc.outerRadius(outerRadius);
  if (cornerRadius != null) arc.cornerRadius(cornerRadius);
  if (startAngle != null) arc.startAngle(startAngle);
  if (endAngle != null) arc.endAngle(endAngle);
  if (padAngle != null) arc.padAngle(padAngle);
  if (padRadius != null) arc.padRadius(padRadius);
  if (children) return children({ path: arc });

  return (
    data && (
      <path ref={innerRef} className={cx('vx-arc', className)} d={arc(data) || ''} {...restProps} />
    )
  );
}
