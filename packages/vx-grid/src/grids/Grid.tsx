import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import GridRows, { AllGridRowsProps } from './GridRows';
import GridColumns, { AllGridColumnProps } from './GridColumns';
import { Scale, CommonGridProps } from '../types';

type CommonPropsToOmit =
  | 'scale'
  | 'offset'
  | 'numTicks'
  | 'lineStyle'
  | 'tickValues'
  | 'from'
  | 'to';

export type GridProps<XScaleInput, YScaleInput> = Omit<
  AllGridRowsProps<YScaleInput>,
  CommonPropsToOmit
> &
  Omit<AllGridColumnProps<XScaleInput>, CommonPropsToOmit> & {
    /** `@vx/scale` or `d3-scale` object used to map from ScaleInput to x-coordinates (GridColumns). */
    xScale: Scale<XScaleInput, number>;
    /** `@vx/scale` or `d3-scale` object used to map from ScaleInput to y-coordinates (GridRows). */
    yScale: Scale<YScaleInput, number>;
    /** Pixel offset to apply as an x-translation to each GridColumns line. */
    xOffset?: CommonGridProps['offset'];
    /** Pixel offset to apply as an y-translation to each GridRows line. */
    yOffset?: CommonGridProps['offset'];
    /** Approximate number of row gridlines. */
    numTicksRows?: CommonGridProps['numTicks'];
    /** Approximate number of column gridlines. */
    numTicksColumns?: CommonGridProps['numTicks'];
    /** Style object to apply to GridRows. */
    rowLineStyle?: CommonGridProps['lineStyle'];
    /** Style object to apply to GridColumns. */
    columnLineStyle?: CommonGridProps['lineStyle'];
    /** Exact values to be used for GridRows lines, passed to yScale. Use this if you need precise control over GridRows values.  */
    rowTickValues?: CommonGridProps['tickValues'];
    /** Exact values to be used for GridColumns lines, passed to xScale. Use this if you need precise control over GridColumns values.  */
    columnTickValues?: CommonGridProps['tickValues'];
  };

export default function Grid<XScaleInput, YScaleInput>({
  top,
  left,
  xScale,
  yScale,
  width,
  height,
  className,
  stroke,
  strokeWidth,
  strokeDasharray,
  numTicksRows,
  numTicksColumns,
  rowLineStyle,
  columnLineStyle,
  xOffset,
  yOffset,
  rowTickValues,
  columnTickValues,
  ...restProps
}: GridProps<XScaleInput, YScaleInput>) {
  return (
    <Group className={cx('vx-grid', className)} top={top} left={left}>
      <GridRows<YScaleInput>
        className={className}
        scale={yScale}
        width={width}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        numTicks={numTicksRows}
        lineStyle={rowLineStyle}
        offset={yOffset}
        tickValues={rowTickValues}
        {...restProps}
      />
      <GridColumns<XScaleInput>
        className={className}
        scale={xScale}
        height={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        numTicks={numTicksColumns}
        lineStyle={columnLineStyle}
        offset={xOffset}
        tickValues={columnTickValues}
        {...restProps}
      />
    </Group>
  );
}
