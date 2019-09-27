// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
import cx from 'classnames';
import { ribbon as d3ribbon } from 'd3-chord';

type Props = {
  chord: any;
  source?: (...args: any[]) => any;
  target?: (...args: any[]) => any;
  radius?: ((...args: any[]) => any) | number;
  startAngle?: ((...args: any[]) => any) | number;
  endAngle?: ((...args: any[]) => any) | number;
  children?: (...args: any[]) => any;
  className?: string;
};

export default function Ribbon({
  chord,
  source,
  target,
  radius,
  startAngle,
  endAngle,
  children,
  className,
  ...restProps
}: Props) {
  const ribbon = d3ribbon();
  if (source) ribbon.source(source);
  if (target) ribbon.target(target);
  if (radius) ribbon.radius(radius);
  if (startAngle) ribbon.startAngle(startAngle);
  if (endAngle) ribbon.endAngle(endAngle);
  const path = ribbon(chord);
  if (children) return children({ path });

  // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <path className={cx('vx-ribbon', className)} d={path} {...restProps} />;
}
