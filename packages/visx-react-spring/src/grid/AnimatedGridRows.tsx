import React from 'react';
import GridRows, { GridRowsProps } from '@visx/grid/lib/grids/GridRows';
import { GridScale } from '@visx/grid/lib/types';
import AnimatedGridLines from './AnimatedGridLines';
import { AnimationTrajectory } from '../types';

export default function AnimatedGridRows<Scale extends GridScale>({
  scale,
  width,
  numTicks,
  tickValues,
  offset,
  className,
  animationTrajectory,
  top,
  left,
  ...lineProps
}: Omit<GridRowsProps<Scale>, 'children'> & { animationTrajectory?: AnimationTrajectory }) {
  return (
    <GridRows
      scale={scale}
      width={width}
      numTicks={numTicks}
      tickValues={tickValues}
      className={className}
      top={top}
      left={left}
    >
      {({ lines }) => (
        <AnimatedGridLines
          scale={scale}
          lines={lines}
          animationTrajectory={animationTrajectory}
          animateXOrY="y"
          lineKey={(line) => String(line?.from?.y ?? '')}
          {...lineProps}
        />
      )}
    </GridRows>
  );
}
