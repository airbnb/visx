import { useContext } from 'react';
import type { FC } from 'react';
import type { CommonGridProps, AllGridRowsProps, GridColumnsProps } from '@visx/grid';
import type { AxisScale } from '@visx/axis';
import DataContext from '../../context/DataContext';

export type BaseGridProps = {
  /** Whether to render GridRows. */
  rows?: boolean;
  /** Whether to render GridColumns. */
  columns?: boolean;
  /** Rendered GridRows component which is passed GridRowProps by BaseGrid. */
  GridRowsComponent: FC<AllGridRowsProps<AxisScale>>;
  /** Rendered GridColumns component which is passed GridColumnsProps by BaseGrid. */
  GridColumnsComponent: FC<GridColumnsProps<AxisScale>>;
} & CommonGridProps;

/** Component that handles all  */
export default function BaseGrid({
  rows = true,
  columns = true,
  GridRowsComponent,
  GridColumnsComponent,
  ...props
}: BaseGridProps) {
  const {
    theme,
    xScale: columnsScale,
    yScale: rowsScale,
    margin,
    innerWidth,
    innerHeight,
  } = useContext(DataContext);

  const gridLineStyles = theme?.gridStyles;

  return (
    <>
      {rows && rowsScale && innerWidth != null && (
        <GridRowsComponent
          left={margin?.left}
          lineStyle={gridLineStyles}
          width={innerWidth}
          scale={rowsScale}
          {...props}
        />
      )}
      {columns && columnsScale && innerHeight != null && (
        <GridColumnsComponent
          top={margin?.top}
          lineStyle={gridLineStyles}
          height={innerHeight}
          scale={columnsScale}
          {...props}
        />
      )}
    </>
  );
}
