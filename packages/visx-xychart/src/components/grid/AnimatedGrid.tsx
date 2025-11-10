/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { AnimatedGridRows, AnimatedGridColumns } from '@visx/react-spring';
import type { AnimationTrajectory } from '@visx/react-spring';
import type { GridRowsProps, GridColumnsProps } from '@visx/grid';
import type { AxisScale } from '@visx/axis';
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
