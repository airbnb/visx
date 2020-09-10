import React, { useContext } from 'react';
import GridRows from '@vx/grid/lib/grids/GridRows';
import GridColumns from '@vx/grid/lib/grids/GridColumns';
import { CommonGridProps } from '@vx/grid/lib/types';
import DataContext from '../../context/DataContext';

export type GridProps = {
  rows?: boolean;
  columns?: boolean;
} & CommonGridProps;

export default function Grid({ rows = true, columns = true, ...props }: GridProps) {
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
      {rows && rowsScale && innerWidth && (
        <GridRows
          left={margin?.left}
          lineStyle={gridLineStyles}
          width={innerWidth}
          scale={rowsScale}
          {...props}
        />
      )}
      {columns && columnsScale && innerHeight && (
        <GridColumns
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
