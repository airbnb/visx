/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import AnimatedGridRows from '@visx/react-spring/lib/grid/AnimatedGridRows';
import AnimatedGridColumns from '@visx/react-spring/lib/grid/AnimatedGridColumns';
import type { AnimationTrajectory } from '@visx/react-spring';
import type { GridRowsProps } from '@visx/grid/lib/grids/GridRows';
import type { AxisScale } from '@visx/axis';
import type { GridColumnsProps } from '@visx/grid/lib/grids/GridColumns';
import type { BaseGridProps } from './BaseGrid';
import BaseGrid from './BaseGrid';

export type AnimatedGridProps = Omit<
  BaseGridProps,
  'GridRowsComponent' | 'GridColumnsComponent'
> & {
  /** Animation trajectory of grid lines. */
  animationTrajectory?: AnimationTrajectory;
};

export default function AnimatedGrid({ animationTrajectory, ...props }: AnimatedGridProps) {
  const RowsComponent = useMemo(
    () =>
      function RowsFC(rowProps: GridRowsProps<AxisScale>) {
        return <AnimatedGridRows {...rowProps} animationTrajectory={animationTrajectory} />;
      },
    [animationTrajectory],
  );
  const ColumnsComponent = useMemo(
    () =>
      function ColumnsFC(rowProps: GridColumnsProps<AxisScale>) {
        return <AnimatedGridColumns {...rowProps} animationTrajectory={animationTrajectory} />;
      },
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
