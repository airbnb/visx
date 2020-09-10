import React, { useContext } from 'react';
import AnimatedGridRows from '@vx/react-spring/lib/grid/AnimatedGridRows';
import AnimatedGridColumns from '@vx/react-spring/lib/grid/AnimatedGridColumns';
import { AnimationTrajectory } from '@vx/react-spring/lib/types';
import { CommonGridProps } from '@vx/grid/lib/types';
import DataContext from '../../context/DataContext';

export type AnimatedGridProps = {
  rows?: boolean;
  columns?: boolean;
  animationTrajectory?: AnimationTrajectory;
} & CommonGridProps;

export default function AnimatedGrid({ rows = true, columns = true, ...props }: AnimatedGridProps) {
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
