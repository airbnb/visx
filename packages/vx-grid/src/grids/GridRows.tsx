import React from 'react';
import cx from 'classnames';
import Line, { LineProps } from '@vx/shape/lib/shapes/Line';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { Scale, CommonGridProps } from '../types';

export type GridRowLineProps<ScaleInput> = (
  tick: ScaleInput,
  index: number
) => React.CSSProperties;

export type GridRowsProps<ScaleInput> = CommonGridProps & {
  /** `@vx/scale` or `d3-scale` object used to map from ScaleInput to y-coordinates. */
  scale: Scale<ScaleInput, number>;
  /** Total width of the each grid row line. */
  width: number;
  /**A function that returns props for grid row line */
  gridRowLineProps?: GridRowLineProps<ScaleInput>;
};

export type AllGridRowsProps<ScaleInput> = GridRowsProps<ScaleInput> &
  Omit<
    LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>,
    keyof GridRowsProps<ScaleInput> | keyof CommonGridProps
  >;

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
  gridRowLineProps = (/** tickValue, index */) => ({
    stroke: '#eaf0f6',
    strokeWidth: 1,
  }),
  ...restProps
}: AllGridRowsProps<ScaleInput>) {
  const ticks = (tickValues ||
    (scale.ticks ? scale.ticks(numTicks) : scale.domain())) as ScaleInput[];
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
        const rowLineProps = gridRowLineProps(d, i);
        const lineStroke = rowLineProps.stroke || stroke;
        const lineWidth = rowLineProps.strokeWidth || strokeWidth;

        return (
          <Line
            key={`row-line-${d}-${i}`}
            from={fromPoint}
            to={toPoint}
            stroke={lineStroke}
            strokeWidth={lineWidth}
            strokeDasharray={strokeDasharray}
            style={lineStyle}
            {...restProps}
          />
        );
      })}
    </Group>
  );
}
