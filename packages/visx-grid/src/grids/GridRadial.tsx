import type { ReactNode, SVGProps } from 'react';
import cx from 'classnames';
import { Arc } from '@visx/shape';
import type { ArcProps } from '@visx/shape';
import { Group } from '@visx/group';
import type { ScaleInput } from '@visx/scale';
import { getTicks } from '@visx/scale';

import type { CommonGridProps, GridScale } from '../types';

export type GridRadialProps<Scale extends GridScale> = CommonGridProps & {
  /** `@visx/scale` or `d3-scale` object used to convert value to position. */
  scale: Scale;
  /**
   * Exact values used to generate grid lines using `scale`.
   * Overrides `numTicks` if specified.
   */
  tickValues?: ScaleInput<Scale>[];
  /**
   * If specified, the arc of each radial grid line will have this thickness, useful for fills.
   */
  arcThickness?: number;
  /**
   * The end angle of the arc of radial grid lines in radians.
   */
  endAngle?: number;
  /**
   * The class name applied to all radial lines.
   */
  lineClassName?: string;
  /**
   * The color applied to the fill of the radial lines.
   */
  fill?: string;
  /**
   * The fill opacity applied to the fill of the radial lines.
   */
  fillOpacity?: number;
  /**
   * The start angle of the arc of radial grid lines in radians.
   */
  startAngle?: number;
  /**
   * Child components to the Arc.
   */
  children?: () => ReactNode;
};

export type AllGridRadialProps<Scale extends GridScale, Datum> = GridRadialProps<Scale> &
  Omit<
    ArcProps<Datum> & Omit<SVGProps<SVGPathElement>, keyof ArcProps<Datum>>,
    keyof GridRadialProps<Scale>
  >;

export default function GridRadial<Scale extends GridScale, Datum>({
  arcThickness,
  className,
  endAngle = 2 * Math.PI,
  fill = 'transparent',
  fillOpacity = 1,
  left = 0,
  lineClassName,
  lineStyle,
  numTicks = 10,
  scale,
  startAngle = 0,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  tickValues,
  top = 0,
  ...restProps
}: AllGridRadialProps<Scale, Datum>) {
  const radii = tickValues ?? getTicks(scale, numTicks);
  const innerRadius = Math.min(...scale.domain());

  return (
    <Group className={cx('visx-grid-radial', className)} top={top} left={left}>
      {radii.map((radius, i) => (
        <Arc
          key={`radial-grid-${radius}-${i}`}
          className={lineClassName}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={scale(arcThickness ? radius - arcThickness : innerRadius) as number}
          outerRadius={scale(radius) as number}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={lineStyle}
          {...restProps}
        />
      ))}
    </Group>
  );
}
