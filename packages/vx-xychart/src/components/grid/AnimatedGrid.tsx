import React, { useContext } from 'react';
import AnimatedGridRows from '@vx/react-spring/lib/grid/AnimatedGridRows';
import AnimatedGridColumns from '@vx/react-spring/lib/grid/AnimatedGridColumns';
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
        <AnimatedGridRows
          left={margin?.left}
          lineStyle={gridLineStyles}
          width={innerWidth}
          scale={rowsScale}
          {...props}
        />
      )}
      {columns && columnsScale && innerHeight && (
        <AnimatedGridColumns
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
