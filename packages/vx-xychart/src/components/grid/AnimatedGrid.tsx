import React, { useMemo } from 'react';
import AnimatedGridRows from '@vx/react-spring/lib/grid/AnimatedGridRows';
import AnimatedGridColumns from '@vx/react-spring/lib/grid/AnimatedGridColumns';
import { AnimationTrajectory } from '@vx/react-spring';
import { GridRowsProps } from '@vx/grid/lib/grids/GridRows';
import { AxisScale } from '@vx/axis';
import { GridColumnsProps } from '@vx/grid/lib/grids/GridColumns';
import BaseGrid, { BaseGridProps } from './BaseGrid';

export type AnimatedGridProps = Omit<
  BaseGridProps,
  'GridRowsComponent' | 'GridColumnsComponent'
> & {
  /** Animation trjectory of grid lines. */
  animationTrajectory?: AnimationTrajectory;
};

export default function AnimatedGrid({ animationTrajectory, ...props }: AnimatedGridProps) {
  const RowsComponent = useMemo(
    () => (rowProps: GridRowsProps<AxisScale>) => (
      <AnimatedGridRows {...rowProps} animationTrajectory={animationTrajectory} />
    ),
    [animationTrajectory],
  );
  const ColumnsComponent = useMemo(
    () => (rowProps: GridColumnsProps<AxisScale>) => (
      <AnimatedGridColumns {...rowProps} animationTrajectory={animationTrajectory} />
    ),
    [animationTrajectory],
  );
  return (
    <BaseGrid
      GridRowsComponent={RowsComponent}
      GridColumnsComponent={ColumnsComponent}
      {...props}
    />
  );
}
