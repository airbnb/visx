import React from 'react';
import cx from 'classnames';
import Line, { LineProps } from '@vx/shape/lib/shapes/Line';
import { Group } from '@vx/group';
import { Point } from '@vx/point';
import { Scale, CommonGridProps } from '../types';

export type GridColumnLineProps<ScaleInput> = (
  tick: ScaleInput,
  index: number
) => React.CSSProperties;

export type GridColumnProps<ScaleInput> = CommonGridProps & {
  /** `@vx/scale` or `d3-scale` object used to map from ScaleInput to x-coordinates. */
  scale: Scale<ScaleInput, number>;
  /** Total height of the each grid column line. */
  height: number;
  /**A function that returns props for grid column line */
  gridColumnLineProps?: GridColumnLineProps<ScaleInput>;
};

export type AllGridColumnProps<ScaleInput> = GridColumnProps<ScaleInput> &
  Omit<
    LineProps & Omit<React.SVGProps<SVGLineElement>, keyof LineProps>,
    keyof GridColumnProps<ScaleInput> | keyof CommonGridProps
  >;

export default function GridColumns<ScaleInput>({
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
  gridColumnLineProps = (/** tickValue, index */) => ({
    stroke: '#eaf0f6',
    strokeWidth: 1,
  }),
  ...restProps
}: AllGridColumnProps<ScaleInput>) {
  const ticks = (tickValues ||
    (scale.ticks ? scale.ticks(numTicks) : scale.domain())) as ScaleInput[];
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

        const columnLineProps = gridColumnLineProps(d, i);
        const lineStroke = columnLineProps.stroke || stroke;
        const lineWidth = columnLineProps.strokeWidth || strokeWidth;

        return (
          <Line
            key={`column-line-${d}-${i}`}
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
