import React from 'react';

type RadialGradientElementProps = React.SVGProps<SVGRadialGradientElement>;
type StopElementProps = React.SVGProps<SVGStopElement>;

export type RadialGradientProps = {
  /** Unique id for the gradient. Should be unique across all page elements. */
  id: string;
  /** Start color of gradient (inside). */
  from?: StopElementProps['stopColor'];
  /** End color of gradient (outside). */
  to?: StopElementProps['stopColor'];
  /** Number or percent defining the where the 'from' starting color is placed along the gradient. */
  fromOffset?: StopElementProps['offset'];
  /** Opacity of the 'from' starting color. */
  fromOpacity?: StopElementProps['stopOpacity'];
  /** Number or percent defining the where the 'to' ending color is placed along the gradient. */
  toOffset?: StopElementProps['offset'];
  /** Opacity of the 'to' ending color. */
  toOpacity?: StopElementProps['stopOpacity'];
  /** Rotation to apply to gradient. */
  rotate?: string | number;
  /** Transform to apply to linearGradient, overrides rotate. */
  transform?: RadialGradientElementProps['gradientTransform'];
  /** Override of radialGradient children. */
  children?: React.ReactNode;
} & RadialGradientElementProps; // passed as rest props to radialGradient

export default function RadialGradient({
  children,
  id,
  from,
  to,
  fromOffset = '0%',
  fromOpacity = 1,
  toOffset = '100%',
  toOpacity = 1,
  rotate,
  transform,
  ...restProps
}: RadialGradientProps) {
  return (
    <defs>
      <radialGradient
        id={id}
        gradientTransform={rotate ? `rotate(${rotate})` : transform}
        {...restProps}
      >
        {!!children && children}
        {!children && <stop offset={fromOffset} stopColor={from} stopOpacity={fromOpacity} />}
        {!children && <stop offset={toOffset} stopColor={to} stopOpacity={toOpacity} />}
      </radialGradient>
    </defs>
  );
}
