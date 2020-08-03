import React from 'react';
import cx from 'classnames';
import Line, { LineProps } from '@vx/shape/lib/shapes/Line';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { getTicks, ScaleInput } from '@vx/scale';
import { CommonGridProps, GridScale } from '../types';

export type GridRowsProps<Scale extends GridScale> = CommonGridProps & {
  /** `@vx/scale` or `d3-scale` object used to map from ScaleInput to y-coordinates. */
  scale: Scale;
  /** Exact values used to generate grid coordinates (y- for Rows, x- for Columns) lines using `scale`. Overrides `numTicks` if specified. */
  tickValues?: ScaleInput<Scale>[];
  /** Total width of the each grid row line. */
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
  numTicks = 10,
  lineStyle,
  offset,
  tickValues,
  ...restProps
}: AllGridRowsProps<Scale>) {
  const ticks = tickValues ?? getTicks(scale, numTicks);
  return (
    <Group className={cx('vx-rows', className)} top={top} left={left}>
      {ticks.map((d, i) => {
        const y = offset ? (scale(d) || 0) + offset : scale(d) || 0;
        const fromPoint = new Point({
          x: 0,
          y,
        });
        const toPoint = new Point({
          x: width,
          y,
        });
        return (
          <Line
            key={`row-line-${d}-${i}`}
            from={fromPoint}
            to={toPoint}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={lineStyle}
            {...restProps}
          />
        );
      })}
    </Group>
  );
}
