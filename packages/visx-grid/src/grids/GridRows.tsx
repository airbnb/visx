import React from 'react';
import cx from 'classnames';
import Line, { LineProps } from '@visx/shape/lib/shapes/Line';
import { Group } from '@visx/group';
import { Point } from '@visx/point';
import { getTicks, ScaleInput, coerceNumber } from '@visx/scale';
import { CommonGridProps, GridScale } from '../types';
import getScaleBandwidth from '../utils/getScaleBandwidth';

export type GridRowsProps<Scale extends GridScale> = CommonGridProps & {
  /** `@visx/scale` or `d3-scale` object used to convert value to position. */
  scale: Scale;
  /**
   * Exact values used to generate grid lines using `scale`.
   * Overrides `numTicks` if specified.
   */
  tickValues?: ScaleInput<Scale>[];
  /** Total width of each grid row line. */
  width: number;
};

export type AllGridRowsProps<Scale extends GridScale> = GridRowsProps<Scale> &
  Omit<
    LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>,
    keyof GridRowsProps<Scale>
  >;

export default function GridRows<Scale extends GridScale>({
  top = 0,
  left = 0,
  scale,
  width,
  stroke = '#eaf0f6',
  strokeWidth = 1,
  strokeDasharray,
  className,
  children,
  numTicks = 10,
  lineStyle,
  offset,
  tickValues,
  ...restProps
}: AllGridRowsProps<Scale>) {
  const ticks = tickValues ?? getTicks(scale, numTicks);
  const scaleOffset = (offset ?? 0) + getScaleBandwidth(scale) / 2;
  const tickLines = ticks.map((d) => {
    const y = (coerceNumber(scale(d)) ?? 0) + scaleOffset;
    return {
      from: new Point({
        x: 0,
        y,
      }),
      to: new Point({
        x: width,
        y,
      }),
    };
  });
  return (
    <Group className={cx('visx-rows', className)} top={top} left={left}>
      {children
        ? children({ lines: tickLines })
        : tickLines.map(({ from, to }, i) => (
            <Line
              key={`row-line-${i}`}
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
