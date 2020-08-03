import React from 'react';
import cx from 'classnames';
import Line, { LineProps } from '@vx/shape/lib/shapes/Line';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { getTicks, ScaleInput } from '@vx/scale';
import { CommonGridProps, GridScale } from '../types';

export type GridColumnProps<Scale extends GridScale> = CommonGridProps & {
  /** `@vx/scale` or `d3-scale` object used to map from ScaleInput to x-coordinates. */
  scale: Scale;
  /** Exact values used to generate grid coordinates (y- for Rows, x- for Columns) lines using `scale`. Overrides `numTicks` if specified. */
  tickValues?: ScaleInput<Scale>[];
  /** Total height of the each grid column line. */
  height: number;
};

export type AllGridColumnProps<Scale extends GridScale> = GridColumnProps<Scale> &
  Omit<
    LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>,
    keyof GridColumnProps<Scale>
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
  ...restProps
}: AllGridColumnProps<Scale>) {
  const ticks = tickValues ?? getTicks(scale, numTicks);
  return (
    <Group className={cx('vx-columns', className)} top={top} left={left}>
      {ticks.map((d, i) => {
        const x = offset ? (scale(d) || 0) + offset : scale(d) || 0;
        const fromPoint = new Point({
          x,
          y: 0,
        });
        const toPoint = new Point({
          x,
          y: height,
        });
        return (
          <Line
            key={`column-line-${d}-${i}`}
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
