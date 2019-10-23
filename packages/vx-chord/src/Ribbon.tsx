import React from 'react';
import cx from 'classnames';
import { ribbon as d3ribbon, Chord, ChordSubgroup } from 'd3-chord';

type NumAccessor = (d: ChordSubgroup) => number;

export type RibbonProps = {
  chord: Chord;
  source?: (d: Chord) => ChordSubgroup;
  target?: (d: Chord) => ChordSubgroup;
  radius?: number | NumAccessor;
  startAngle?: number | NumAccessor;
  endAngle?: number | NumAccessor;
  children?: ({ path }: { path: string | null }) => string | undefined;
  className?: string;
};

/** This is a workaround for TypeScript not inferring the correct method overload */
function setNumberOrNumberAccessor(
  func: (d: number | NumAccessor) => void,
  value: number | NumAccessor,
) {
  if (typeof value === 'number') func(value);
  else func(value);
}

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
  if (radius) setNumberOrNumberAccessor(ribbon.radius, radius);
  if (startAngle) setNumberOrNumberAccessor(ribbon.startAngle, startAngle);
  if (endAngle) setNumberOrNumberAccessor(ribbon.endAngle, endAngle);
  const path = ribbon(chord) as any;
  if (children) return <>{children({ path })}</>;

  return <path className={cx('vx-ribbon', className)} d={path} {...restProps} />;
}
