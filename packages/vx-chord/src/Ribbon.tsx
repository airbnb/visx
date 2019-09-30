import React from 'react';
import cx from 'classnames';
import { ribbon as d3ribbon, Chord, ChordSubgroup } from 'd3-chord';

export type RibbonProps = {
  chord: Chord;
  source?: (d: Chord) => ChordSubgroup;
  target?: (d: Chord) => ChordSubgroup;
  radius?: (d: ChordSubgroup) => number;
  startAngle?: (d: ChordSubgroup) => number;
  endAngle?: (d: ChordSubgroup) => number;
  children?: ({ path }: { path: string | null }) => string | undefined;
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
}: RibbonProps & Omit<React.SVGProps<SVGPathElement>, keyof RibbonProps>) {
  const ribbon = d3ribbon<any, Chord, ChordSubgroup>();
  if (source) ribbon.source(source);
  if (target) ribbon.target(target);
  if (radius) ribbon.radius(radius);
  if (startAngle) ribbon.startAngle(startAngle);
  if (endAngle) ribbon.endAngle(endAngle);
  const path = ribbon(chord) as any;
  if (children) return children({ path });

  return <path className={cx('vx-ribbon', className)} d={path} {...restProps} />;
}
