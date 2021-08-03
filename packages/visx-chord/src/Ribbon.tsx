import React from 'react';
import cx from 'classnames';
import { ribbon as d3ribbon, Chord, ChordSubgroup } from 'd3-chord';

type NumAccessor = (d: ChordSubgroup) => number;

export type RibbonProps = {
  /** Chord for which to render a ribbon. */
  chord: Chord;
  /** Sets the source accessor (defaults to chord.source). */
  source?: (d: Chord) => ChordSubgroup;
  /** Sets the target accessor (defaults to chord.source). */
  target?: (d: Chord) => ChordSubgroup;
  /** Sets the radius or radius accessor for the ribbon generator. */
  radius?: number | NumAccessor;
  /** Sets the start angle or start angle accessor for the ribbon generator. */
  startAngle?: number | NumAccessor;
  /** Sets the end angle or end angle accessor for the ribbon generator. */
  endAngle?: number | NumAccessor;
  /** Override the default rendering of a chord `<path />`. */
  children?: ({ path }: { path: string | null }) => string | undefined;
  /** Classname to apply to the rendered `<path />`. */
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
}: Omit<React.SVGProps<SVGPathElement>, keyof RibbonProps> & RibbonProps) {
  const ribbon = d3ribbon<unknown, Chord, ChordSubgroup>();
  if (source) ribbon.source(source);
  if (target) ribbon.target(target);
  if (radius) setNumberOrNumberAccessor(ribbon.radius, radius);
  if (startAngle) setNumberOrNumberAccessor(ribbon.startAngle, startAngle);
  if (endAngle) setNumberOrNumberAccessor(ribbon.endAngle, endAngle);
  const path = ribbon(chord) as unknown as string | null;
  if (children) return <>{children({ path })}</>;

  return <path className={cx('visx-ribbon', className)} d={path || ''} {...restProps} />;
}
