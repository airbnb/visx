/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import cx from 'classnames';
import { arc as d3Arc, Arc as ArcType } from 'd3-shape';
import setNumOrAccessor, { NumberAccessor } from '../util/setNumberOrNumberAccessor';
import { $TSFIXME } from '../types';

export type ArcProps<Datum> = {
  /** className applied to path element. */
  className?: string;
  /** A Datum for which to generate an arc. */
  data?: Datum;
  /** Override render function which is passed the configured arc generator as input. */
  children?: (args: { path: ArcType<$TSFIXME, Datum> }) => React.ReactNode;
  /** React ref to the path element. */
  innerRef?: React.Ref<SVGPathElement>;
  /** Number or accessor function which returns a number, which defines the arc innerRadius. */
  innerRadius?: NumberAccessor<Datum> | number;
  /** Number or accessor function which returns a number, which defines the arc outerRadius. */
  outerRadius?: NumberAccessor<Datum> | number;
  /** Number or accessor function which returns a number, which defines the arc cornerRadius. */
  cornerRadius?: NumberAccessor<Datum> | number;
  /** Number or accessor function which returns a number, which defines the arc startAngle. */
  startAngle?: NumberAccessor<Datum> | number;
  /** Number or accessor function which returns a number, which defines the arc endAngle. */
  endAngle?: NumberAccessor<Datum> | number;
  /** Number or accessor function which returns a number, which defines the arc padAngle. */
  padAngle?: NumberAccessor<Datum> | number;
  /** Number or accessor function which returns a number, which defines the arc padRadius. */
  padRadius?: NumberAccessor<Datum> | number;
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
}: ArcProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof ArcProps<Datum>>) {
  const arc = d3Arc<Datum>();
  if (innerRadius != null) setNumOrAccessor(arc.innerRadius, innerRadius);
  if (outerRadius != null) setNumOrAccessor(arc.outerRadius, outerRadius);
  if (cornerRadius != null) setNumOrAccessor(arc.cornerRadius, cornerRadius);
  if (startAngle != null) setNumOrAccessor(arc.startAngle, startAngle);
  if (endAngle != null) setNumOrAccessor(arc.endAngle, endAngle);
  if (padAngle != null) setNumOrAccessor(arc.padAngle, padAngle);
  if (padRadius != null) setNumOrAccessor(arc.padRadius, padRadius);

  if (children) return <>{children({ path: arc })}</>;
  if (!data) return null;

  return (
    <path ref={innerRef} className={cx('vx-arc', className)} d={arc(data) || ''} {...restProps} />
  );
}
