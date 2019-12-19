import React from 'react';
import cx from 'classnames';
import Line, { LineProps } from '@vx/shape/lib/shapes/Line';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { Scale, CommonGridProps } from '../types';

export type GridRowsProps<ScaleInput> = CommonGridProps & {
  /** @vx/scale or d3-scale object used to map from ScaleInput to y-coordinates. */
  scale: Scale<ScaleInput, number>;
  /** Total width of the each grid row line. */
  width: number;
};

type AllProps<ScaleInput> = GridRowsProps<ScaleInput> &
  Omit<LineProps, keyof GridRowsProps<ScaleInput>>;

export default function GridRows<ScaleInput>({
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
}: AllProps<ScaleInput>) {
  const ticks = tickValues || scale.ticks ? scale.ticks(numTicks) : scale.domain();
  return (
    <Group className={cx('vx-rows', className)} top={top} left={left}>
      {ticks.map((d, i) => {
        const y = offset ? scale(d) + offset : scale(d);
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
