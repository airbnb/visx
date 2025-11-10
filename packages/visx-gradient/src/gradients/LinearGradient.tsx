import type { ReactNode, SVGProps } from 'react';

type LinearGradientOwnProps = {
  /** Unique id for the gradient. Should be unique across all page elements. */
  id: string;
  /** Start color of gradient. */
  from?: string;
  /** End color of gradient. */
  to?: string;
  /** The x coordinate of the starting point along which the linear gradient is drawn. */
  x1?: string | number;
  /** The x coordinate of the ending point along which the linear gradient is drawn. */
  x2?: string | number;
  /** The y coordinate of the starting point along which the linear gradient is drawn. */
  y1?: string | number;
  /** The y coordinate of the ending point along which the linear gradient is drawn. */
  y2?: string | number;
  /** Number or percent defining the where the 'from' starting color is placed along the gradient. */
  fromOffset?: string | number;
  /** Opacity of the 'from' starting color. */
  fromOpacity?: string | number;
  /** Number or percent defining the where the 'to' ending color is placed along the gradient. */
  toOffset?: string | number;
  /** Opacity of the 'to' ending color. */
  toOpacity?: string | number;
  /** Rotation to apply to gradient. */
  rotate?: string | number;
  /** Transform to apply to linearGradient, overrides rotate. */
  transform?: string;
  /** Override of linearGradient children. */
  children?: ReactNode;
  /** (When no x or y values are passed), will orient the gradient vertically instead of horizontally. */
  vertical?: boolean;
};

export type LinearGradientProps = LinearGradientOwnProps &
  Omit<SVGProps<SVGLinearGradientElement>, keyof LinearGradientOwnProps>;

export default function LinearGradient({
  children,
  id,
  from,
  to,
  x1: _x1,
  y1: _y1,
  x2: _x2,
  y2: _y2,
  fromOffset = '0%',
  fromOpacity = 1,
  toOffset = '100%',
  toOpacity = 1,
  rotate,
  transform,
  vertical = true,
  ...restProps
}: LinearGradientProps) {
  let x1 = _x1;
  let x2 = _x2;
  let y1 = _y1;
  let y2 = _y2;
  if (vertical && !x1 && !x2 && !y1 && !y2) {
    x1 = '0';
    x2 = '0';
    y1 = '0';
    y2 = '1';
  }
  return (
    <defs>
      <linearGradient
        id={id}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        gradientTransform={rotate ? `rotate(${rotate})` : transform}
        {...restProps}
      >
        {!!children && children}
        {!children && <stop offset={fromOffset} stopColor={from} stopOpacity={fromOpacity} />}
        {!children && <stop offset={toOffset} stopColor={to} stopOpacity={toOpacity} />}
      </linearGradient>
    </defs>
  );
}
