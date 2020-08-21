import React from 'react';
import cx from 'classnames';
import Line, { LineProps } from '@vx/shape/lib/shapes/Line';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { getTicks, ScaleInput, coerceNumber } from '@vx/scale';
import { CommonGridProps, GridScale } from '../types';

export type GridColumnsProps<Scale extends GridScale> = CommonGridProps & {
  /** `@vx/scale` or `d3-scale` object used to convert value to position. */
  scale: Scale;
  /**
   * Exact values used to generate grid lines using `scale`.
   * Overrides `numTicks` if specified.
   */
  tickValues?: ScaleInput<Scale>[];
  /** Total height of each grid column line. */
  height: number;
};

export type AllGridColumnsProps<Scale extends GridScale> = GridColumnsProps<Scale> &
  Omit<
    LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>,
    keyof GridColumnsProps<Scale>
  >;

export default function GridColumns<Scale extends GridScale>({
  top = 0,
  left = 0,
  scale,
  height,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  className,
  numTicks = 10,
  lineStyle,
  offset,
  tickValues,
  children,
  ...restProps
}: AllGridColumnsProps<Scale>) {
  const ticks = tickValues ?? getTicks(scale, numTicks);
  const tickLines = ticks.map(d => {
    const x = offset ? (coerceNumber(scale(d)) || 0) + offset : coerceNumber(scale(d)) || 0;
    return {
      from: new Point({
        x,
        y: 0,
      }),
      to: new Point({
        x,
        y: height,
      }),
    };
  });
  return (
    <Group className={cx('vx-columns', className)} top={top} left={left}>
      {children
        ? children({ lines: tickLines })
        : tickLines.map(({ from, to }, i) => (
            <Line
              key={`column-line-${i}`}
              from={from}
              to={to}
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
