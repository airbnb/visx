import cx from 'classnames';
import { Group } from '@visx/group';
import type { ScaleInput } from '@visx/scale';
import type { AllGridRowsProps } from './GridRows';
import GridRows from './GridRows';
import type { AllGridColumnsProps } from './GridColumns';
import GridColumns from './GridColumns';
import type { CommonGridProps, GridScale } from '../types';

type CommonPropsToOmit =
  | 'scale'
  | 'offset'
  | 'numTicks'
  | 'lineStyle'
  | 'tickValues'
  | 'from'
  | 'to'
  | 'children';

export type GridProps<XScale extends GridScale, YScale extends GridScale> = Omit<
  AllGridRowsProps<YScale> & AllGridColumnsProps<XScale>,
  CommonPropsToOmit
> & {
  /** `@visx/scale` or `d3-scale` object used to map from ScaleInput to x-coordinates (GridColumns). */
  xScale: XScale;
  /** `@visx/scale` or `d3-scale` object used to map from ScaleInput to y-coordinates (GridRows). */
  yScale: YScale;
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
  rowTickValues?: ScaleInput<YScale>[];
  /** Exact values to be used for GridColumns lines, passed to xScale. Use this if you need precise control over GridColumns values.  */
  columnTickValues?: ScaleInput<XScale>[];
};

export default function Grid<XScale extends GridScale, YScale extends GridScale>({
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
}: GridProps<XScale, YScale>) {
  return (
    <Group className={cx('visx-grid', className)} top={top} left={left}>
      <GridRows
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
      <GridColumns
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
